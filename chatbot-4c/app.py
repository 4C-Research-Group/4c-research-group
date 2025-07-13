import streamlit as st
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

# Page configuration
st.set_page_config(
    page_title="4C Research Lab FAQ Chatbot",
    page_icon="🧠",
    layout="wide"
)

# Custom CSS for better styling
st.markdown("""
<style>
    .main-header {
        font-size: 2.5rem;
        color: #1f77b4;
        text-align: center;
        margin-bottom: 2rem;
    }
    .chat-message {
        padding: 1rem;
        border-radius: 0.5rem;
        margin: 0.5rem 0;
    }
    .user-message {
        background-color: #e3f2fd;
        border-left: 4px solid #2196f3;
    }
    .bot-message {
        background-color: #f3e5f5;
        border-left: 4px solid #9c27b0;
    }
</style>
""", unsafe_allow_html=True)

# Title
st.markdown('<h1 class="main-header">🧠 4C Research Lab FAQ Chatbot</h1>',
            unsafe_allow_html=True)

# Check if Google API key is available
if not os.getenv("GOOGLE_API_KEY"):
    st.error(
        "⚠️ Google API key not found! Please set your GOOGLE_API_KEY in the .env file.")
    st.info("To get a Google API key, visit: https://makersuite.google.com/app/apikey")
    st.stop()


@st.cache_resource
def load_faq_data():
    """Load and prepare the FAQ data using CSVLoader"""
    try:
        # Use CSVLoader with proper source column
        loader = CSVLoader(
            file_path='data/4c_research_lab_faqs.csv',
            source_column="question"
        )
        documents = loader.load()

        # Also load as pandas for display purposes
        df = pd.read_csv('data/4c_research_lab_faqs.csv')

        return documents, df
    except Exception as e:
        st.error(f"Error loading FAQ data: {e}")
        return None, None


@st.cache_resource
def create_vector_store(_documents):
    """Create FAISS vector store from documents using instructor embeddings"""
    try:
        # Initialize instructor embeddings for better semantic understanding
        embeddings = HuggingFaceEmbeddings(
            model_name="hkunlp/instructor-large",
            model_kwargs={'device': 'cpu'}
        )

        # Create vector store
        vector_store = FAISS.from_documents(_documents, embeddings)
        return vector_store
    except Exception as e:
        st.error(f"Error creating vector store: {e}")
        return None


@st.cache_resource
def create_rag_chain(_vector_store):
    """Create RetrievalQA chain with improved prompt template"""
    try:
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
        retriever = _vector_store.as_retriever(score_threshold=0.7)

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
        st.error(f"Error creating RAG chain: {e}")
        return None


# Load data
documents, df = load_faq_data()

if documents is None:
    st.stop()

# Create vector store
vector_store = create_vector_store(documents)

if vector_store is None:
    st.stop()

# Create RAG chain
chain = create_rag_chain(vector_store)

if chain is None:
    st.stop()

# Sidebar with information
with st.sidebar:
    st.header("ℹ️ About 4C Research Lab")
    st.markdown("""
    The 4C Research Lab focuses on:
    - **Cognition** (brain function)
    - **Consciousness** (awareness states) 
    - **Critical Care** (intensive care)
    - **Comfort** (patient care)
    
    Based at Western University and London Health Sciences Centre.
    """)

    st.header("📊 FAQ Statistics")
    st.metric("Total FAQs", len(df))

    st.header("🔗 Contact")
    st.markdown("""
    **Dr. Rishi Ganesan**  
    Email: rishi.ganesan@lhsc.on.ca  
    Phone: (519) 685-8500 Ext. 74702
    """)

# Main chat interface
st.header("💬 Ask me about the 4C Research Lab")

# Initialize chat history
if "messages" not in st.session_state:
    st.session_state.messages = []

# Display chat history
for message in st.session_state.messages:
    with st.chat_message(message["role"]):
        st.markdown(message["content"])

# Chat input
if prompt := st.chat_input("Ask a question about the 4C Research Lab..."):
    # Add user message to chat history
    st.session_state.messages.append({"role": "user", "content": prompt})

    # Display user message
    with st.chat_message("user"):
        st.markdown(prompt)

    # Display assistant response
    with st.chat_message("assistant"):
        with st.spinner("Searching for answer..."):
            try:
                # Use the RAG chain to get response
                response = chain({"query": prompt})
                answer = response['result']

                st.markdown(answer)

                # Add assistant response to chat history
                st.session_state.messages.append(
                    {"role": "assistant", "content": answer})

            except Exception as e:
                error_msg = f"Sorry, I encountered an error: {str(e)}"
                st.error(error_msg)
                st.session_state.messages.append(
                    {"role": "assistant", "content": error_msg})

# Clear chat button
if st.button("Clear Chat History"):
    st.session_state.messages = []
    st.rerun()

# Display FAQ data
with st.expander("📋 View All FAQs"):
    st.dataframe(df, use_container_width=True)
