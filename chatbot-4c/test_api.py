#!/usr/bin/env python3
"""
Simple test script to verify Google API key is working
"""

import os
from dotenv import load_dotenv
from langchain_google_genai import ChatGoogleGenerativeAI


def test_api_key():
    """Test if the Google API key is valid"""

    # Load environment variables
    load_dotenv()

    # Get API key
    api_key = os.getenv("GOOGLE_API_KEY")

    if not api_key:
        print("❌ No API key found!")
        print("Please set your GOOGLE_API_KEY in the .env file")
        print("Get your API key from: https://makersuite.google.com/app/apikey")
        return False

    if api_key == "your_api_key_here":
        print("❌ Please replace 'your_api_key_here' with your actual API key!")
        return False

    try:
        # Test the API key
        llm = ChatGoogleGenerativeAI(
            model="gemini-1.5-flash-latest",
            google_api_key=api_key,
            temperature=0.1
        )

        # Simple test query
        response = llm.invoke(
            "Say 'Hello, API key is working!' in one sentence.")
        print("✅ API key is valid!")
        print(f"Response: {response.content}")
        return True

    except Exception as e:
        print(f"❌ API key test failed: {e}")
        return False


if __name__ == "__main__":
    test_api_key()
