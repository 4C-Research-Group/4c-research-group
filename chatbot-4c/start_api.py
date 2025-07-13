#!/usr/bin/env python3
"""
Startup script for the 4C Research Lab RAG Chatbot API
"""

import uvicorn
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

if __name__ == "__main__":
    print("🚀 Starting 4C Research Lab RAG Chatbot API...")
    print(f"📡 API will be available at: http://localhost:8000")
    print(f"🔍 Health check: http://localhost:8000/health")
    print(f"📚 API docs: http://localhost:8000/docs")
    print("=" * 50)

    # Check if Google API key is available
    if not os.getenv("GOOGLE_API_KEY"):
        print("⚠️  WARNING: GOOGLE_API_KEY not found in .env file!")
        print("   The RAG system may not work properly without it.")
        print("   Please add your Google API key to the .env file.")
        print("=" * 50)

    # Start the server
    uvicorn.run(
        "api:app",
        host="0.0.0.0",
        port=8000,
        reload=True,  # Auto-reload on code changes
        log_level="info"
    )
