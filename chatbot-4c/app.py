from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Dict, Any
import pandas as pd
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.prompts import PromptTemplate
from langchain.chains import RetrievalQA
from langchain_community.vectorstores import FAISS
from langchain_community.embeddings import HuggingFaceEmbeddings
from langchain.document_loaders.csv_loader import CSVLoader
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

app = FastAPI()

# CORS middleware configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # For development, restrict this in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class ChatRequest(BaseModel):
    message: str
    history: List[Dict[str, str]] = []


class ChatResponse(BaseModel):
    response: str

# Load and prepare the FAQ data using CSVLoader


def load_faq_data():
    try:
        loader = CSVLoader(
            file_path='data/4c_research_lab_faqs.csv', source_column="question")
        documents = loader.load()
        df = pd.read_csv('data/4c_research_lab_faqs.csv')
        return documents, df
    except Exception as e:
        raise HTTPException(
            status_code=500, detail=f"Error loading FAQ data: {str(e)}")

# Create FAISS vector store from documents using instructor embeddings


def create_vector_store(_documents):
    try:
        embeddings = HuggingFaceEmbeddings(
            model_name="hkunlp/instructor-large", model_kwargs={'device': 'cpu'})
        vector_store = FAISS.from_documents(_documents, embeddings)
        return vector_store
    except Exception as e:
        raise HTTPException(
            status_code=500, detail=f"Error creating vector store: {str(e)}")

# Create RetrievalQA chain with improved prompt template


def create_rag_chain(_vector_store):
    try:
        llm = ChatGoogleGenerativeAI(
            model="gemini-1.5-flash-latest",
            temperature=0.7,
            google_api_key=os.getenv("GOOGLE_API_KEY")
        )

        prompt_template = """Given the following context and a question, generate an answer based on this context only.
In the answer try to provide as much text as possible from the source document context without making much changes.
If the answer is not found in the context, kindly state "I don't know." Don't try to make up an answer.

CONTEXT: {context}

QUESTION: {question}"""

        prompt = PromptTemplate(
            template=prompt_template,
            input_variables=["context", "question"]
        )

        retriever = _vector_store.as_retriever(score_threshold=0.7)

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
        raise HTTPException(
            status_code=500, detail=f"Error creating RAG chain: {str(e)}")


# Initialize the chain when the app starts
if not os.getenv("GOOGLE_API_KEY"):
    raise HTTPException(
        status_code=500, detail="Google API key not found! Please set your GOOGLE_API_KEY in the .env file.")

documents, df = load_faq_data()
vector_store = create_vector_store(documents)
chain = create_rag_chain(vector_store)


@app.get("/")
async def read_root():
    return {"message": "4C Research Lab FAQ API is running"}


@app.post("/chat", response_model=ChatResponse)
async def chat(chat_request: ChatRequest):
    try:
        # Process the user's message
        response = chain({"query": chat_request.message})
        return {"response": response["result"]}
    except Exception as e:
        raise HTTPException(
            status_code=500, detail=f"Error processing chat: {str(e)}")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
