from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import pandas as pd
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.prompts import PromptTemplate
from langchain.chains import RetrievalQA
from langchain_community.vectorstores import FAISS
from langchain_community.embeddings import HuggingFaceEmbeddings
from langchain_community.document_loaders import CSVLoader
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Initialize FastAPI app
app = FastAPI(
    title="4C Research Lab Chatbot API",
    description="RAG-powered chatbot for 4C Research Lab FAQ",
    version="1.0.0"
)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, specify your domain
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Pydantic models


class ChatRequest(BaseModel):
    message: str
    chat_history: list = []


class ChatResponse(BaseModel):
    response: str
    sources: list = []


# Global variables for caching
vector_store = None
chain = None

# Paths for saving/loading
VECTOR_STORE_PATH = "vector_store"
FAQ_CSV_PATH = "data/4c_research_lab_faqs.csv"


def load_faq_data():
    """Load and prepare the FAQ data using CSVLoader"""
    try:
        # Use CSVLoader with proper source column
        loader = CSVLoader(
            file_path=FAQ_CSV_PATH,
            source_column="question"
        )
        documents = loader.load()
        return documents
    except Exception as e:
        print(f"Error loading FAQ data: {e}")
        return None


def create_vector_store(documents):
    """Create FAISS vector store from documents using instructor embeddings"""
    try:
        # Initialize instructor embeddings for better semantic understanding
        embeddings = HuggingFaceEmbeddings(
            model_name="hkunlp/instructor-large",
            model_kwargs={'device': 'cpu'}
        )

        # Create vector store
        vector_store = FAISS.from_documents(documents, embeddings)
        return vector_store
    except Exception as e:
        print(f"Error creating vector store: {e}")
        return None


def save_vector_store(vector_store, path=VECTOR_STORE_PATH):
    """Save vector store to disk"""
    try:
        vector_store.save_local(path)
        print(f"✅ Vector store saved to {path}")
        return True
    except Exception as e:
        print(f"❌ Error saving vector store: {e}")
        return False


def load_vector_store(path=VECTOR_STORE_PATH):
    """Load vector store from disk"""
    try:
        if os.path.exists(path):
            embeddings = HuggingFaceEmbeddings(
                model_name="hkunlp/instructor-large",
                model_kwargs={'device': 'cpu'}
            )
            vector_store = FAISS.load_local(path, embeddings)
            print(f"✅ Vector store loaded from {path}")
            return vector_store
        else:
            print(f"❌ Vector store not found at {path}")
            return None
    except Exception as e:
        print(f"❌ Error loading vector store: {e}")
        return None


def create_rag_chain(vector_store):
    """Create RetrievalQA chain with improved prompt template"""
    try:
        # Check if Google API key is available
        if not os.getenv("GOOGLE_API_KEY"):
            raise Exception(
                "GOOGLE_API_KEY not found in environment variables")

        # Initialize LLM
        llm = ChatGoogleGenerativeAI(
            model="gemini-1.5-flash-latest",
            temperature=0.7,
            google_api_key=os.getenv("GOOGLE_API_KEY")
        )

        # Create improved prompt template
        prompt_template = """Given the following context and a question, generate an answer based on this context only.
In the answer try to provide as much text as possible from the source document context without making much changes.
If the answer is not found in the context, kindly state "I don't know." Don't try to make up an answer.

CONTEXT: {context}

QUESTION: {question}"""

        prompt = PromptTemplate(
            template=prompt_template,
            input_variables=["context", "question"]
        )

        # Create retriever with score threshold for better quality
        retriever = vector_store.as_retriever(score_threshold=0.7)

        # Create RetrievalQA chain
        chain = RetrievalQA.from_chain_type(
            llm=llm,
            chain_type="stuff",
            retriever=retriever,
            input_key="query",
            return_source_documents=True,
            chain_type_kwargs={"prompt": prompt}
        )

        return chain
    except Exception as e:
        print(f"Error creating RAG chain: {e}")
        return None

# Initialize the RAG system on startup


@app.on_event("startup")
async def startup_event():
    global vector_store, chain

    print("🔄 Initializing RAG system...")

    # Try to load existing vector store first
    vector_store = load_vector_store()

    if vector_store is None:
        print("📚 Creating new vector store from FAQ data...")
        documents = load_faq_data()
        if documents is None:
            print("❌ Failed to load FAQ data")
            return

        print("🔧 Creating vector store...")
        vector_store = create_vector_store(documents)
        if vector_store is None:
            print("❌ Failed to create vector store")
            return

        # Save the vector store for future use
        save_vector_store(vector_store)
    else:
        print("✅ Using cached vector store")

    print("🔗 Creating RAG chain...")
    chain = create_rag_chain(vector_store)
    if chain is None:
        print("❌ Failed to create RAG chain")
        return

    print("🎉 RAG system initialized successfully!")


@app.get("/")
async def root():
    return {
        "message": "4C Research Lab Chatbot API",
        "status": "running",
        "rag_ready": chain is not None,
        "vector_store_cached": os.path.exists(VECTOR_STORE_PATH)
    }


@app.get("/health")
async def health_check():
    return {
        "status": "healthy",
        "rag_ready": chain is not None,
        "vector_store_ready": vector_store is not None,
        "vector_store_cached": os.path.exists(VECTOR_STORE_PATH)
    }


@app.post("/chat", response_model=ChatResponse)
async def chat(request: ChatRequest):
    if not chain:
        raise HTTPException(
            status_code=503,
            detail="RAG system not initialized. Please try again in a moment."
        )

    if not request.message.strip():
        raise HTTPException(
            status_code=400,
            detail="Message cannot be empty"
        )

    try:
        # Use the RAG chain to get response
        response = chain.invoke({"query": request.message})
        answer = response['result']

        # Extract sources if available
        sources = []
        if 'source_documents' in response:
            sources = [doc.page_content[:100] +
                       "..." for doc in response['source_documents']]

        return ChatResponse(
            response=answer,
            sources=sources
        )

    except Exception as e:
        print(f"Error in chat endpoint: {e}")
        raise HTTPException(
            status_code=500,
            detail=f"Error processing request: {str(e)}"
        )


@app.post("/rebuild-vectorstore")
async def rebuild_vectorstore():
    """Force rebuild the vector store (useful when FAQ data changes)"""
    global vector_store, chain

    try:
        print("🔄 Rebuilding vector store...")

        # Load fresh FAQ data
        documents = load_faq_data()
        if documents is None:
            raise HTTPException(
                status_code=500, detail="Failed to load FAQ data")

        # Create new vector store
        vector_store = create_vector_store(documents)
        if vector_store is None:
            raise HTTPException(
                status_code=500, detail="Failed to create vector store")

        # Save new vector store
        if save_vector_store(vector_store):
            # Recreate RAG chain
            chain = create_rag_chain(vector_store)
            if chain is None:
                raise HTTPException(
                    status_code=500, detail="Failed to create RAG chain")

            return {"message": "Vector store rebuilt successfully", "status": "success"}
        else:
            raise HTTPException(
                status_code=500, detail="Failed to save vector store")

    except HTTPException:
        raise
    except Exception as e:
        print(f"Error rebuilding vector store: {e}")
        raise HTTPException(
            status_code=500, detail=f"Error rebuilding vector store: {str(e)}")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
