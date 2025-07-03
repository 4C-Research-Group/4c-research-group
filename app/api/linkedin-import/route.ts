import { NextRequest, NextResponse } from "next/server";
import { LinkedInDataExtractor } from "@/lib/utils/linkedin-scraper";

export async function POST(request: NextRequest) {
  try {
    const { linkedinUrl } = await request.json();

    if (!linkedinUrl) {
      return NextResponse.json(
        { error: "LinkedIn URL is required" },
        { status: 400 }
      );
    }

    if (!LinkedInDataExtractor.isValidLinkedInURL(linkedinUrl)) {
      return NextResponse.json(
        { error: "Invalid LinkedIn URL format" },
        { status: 400 }
      );
    }

    // Extract data (this returns mock data for demo)
    const linkedinData =
      await LinkedInDataExtractor.extractFromURL(linkedinUrl);

    if (!linkedinData) {
      return NextResponse.json(
        { error: "Failed to extract data from LinkedIn" },
        { status: 500 }
      );
    }

    // Convert to AboutPI format
    const convertedData = LinkedInDataExtractor.convertToAboutPI(linkedinData);

    return NextResponse.json({
      success: true,
      data: convertedData,
      message: "LinkedIn data extracted successfully (demo mode)",
    });
  } catch (error) {
    console.error("LinkedIn import error:", error);
    return NextResponse.json(
      { error: "Failed to process LinkedIn data" },
      { status: 500 }
    );
  }
}
