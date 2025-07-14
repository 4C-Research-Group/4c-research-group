#!/usr/bin/env python3
"""
Vector Store Management Script for 4C Research Lab RAG Chatbot
"""

import os
import sys
import requests
import time
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

API_BASE_URL = "http://localhost:8000"


def check_api_status():
    """Check if the API is running"""
    try:
        response = requests.get(f"{API_BASE_URL}/health", timeout=5)
        if response.status_code == 200:
            data = response.json()
            print(f"✅ API Status: {data['status']}")
            print(f"🔗 RAG Ready: {data['rag_ready']}")
            print(f"📚 Vector Store Cached: {data['vector_store_cached']}")
            return True
        else:
            print(f"❌ API returned status code: {response.status_code}")
            return False
    except requests.exceptions.ConnectionError:
        print("❌ Cannot connect to API. Is the server running?")
        return False
    except Exception as e:
        print(f"❌ Error checking API status: {e}")
        return False


def rebuild_vectorstore():
    """Rebuild the vector store via API"""
    try:
        print("🔄 Rebuilding vector store...")
        response = requests.post(
            f"{API_BASE_URL}/rebuild-vectorstore", timeout=30)

        if response.status_code == 200:
            data = response.json()
            print(f"✅ {data['message']}")
            return True
        else:
            print(f"❌ Failed to rebuild vector store: {response.status_code}")
            print(f"Error: {response.text}")
            return False
    except requests.exceptions.ConnectionError:
        print("❌ Cannot connect to API. Is the server running?")
        return False
    except Exception as e:
        print(f"❌ Error rebuilding vector store: {e}")
        return False


def wait_for_api():
    """Wait for API to be ready"""
    print("⏳ Waiting for API to be ready...")
    for i in range(30):  # Wait up to 30 seconds
        if check_api_status():
            return True
        time.sleep(1)
        print(f"   Attempt {i+1}/30...")

    print("❌ API not ready after 30 seconds")
    return False


def main():
    """Main function"""
    if len(sys.argv) < 2:
        print("Usage: python manage_vectorstore.py [status|rebuild|wait]")
        print("\nCommands:")
        print("  status  - Check API and vector store status")
        print("  rebuild - Rebuild the vector store")
        print("  wait    - Wait for API to be ready")
        return

    command = sys.argv[1].lower()

    if command == "status":
        check_api_status()
    elif command == "rebuild":
        rebuild_vectorstore()
    elif command == "wait":
        wait_for_api()
    else:
        print(f"❌ Unknown command: {command}")
        print("Available commands: status, rebuild, wait")


if __name__ == "__main__":
    main()
