import { NextRequest, NextResponse } from "next/server";

// Configuration for the RAG API
const RAG_API_URL = process.env.RAG_API_URL || "http://localhost:8000";

export async function POST(request: NextRequest) {
  try {
    const { message, chatHistory = [] } = await request.json();

    if (!message) {
      return NextResponse.json(
        { error: "Message is required" },
        { status: 400 }
      );
    }

    // Call the RAG API
    const response = await fetch(`${RAG_API_URL}/chat`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: message,
        chat_history: chatHistory,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error("RAG API error:", response.status, errorData);

      // Fallback to simple response if RAG API is down
      return NextResponse.json({
        response:
          "I'm sorry, I'm having trouble connecting to my knowledge base right now. Please try again later or contact Dr. Rishi Ganesan at rishi.ganesan@lhsc.on.ca for assistance.",
        sources: [],
      });
    }

    const data = await response.json();

    return NextResponse.json({
      response: data.response,
      sources: data.sources || [],
    });
  } catch (error) {
    console.error("Chat API error:", error);

    // Fallback response if there's a network error
    return NextResponse.json({
      response:
        "I'm sorry, I'm experiencing technical difficulties. Please try again later or contact us directly at rishi.ganesan@lhsc.on.ca",
      sources: [],
    });
  }
}
