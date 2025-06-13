import { NextResponse } from "next/server";
import path from "path";
import fs from "fs";
import { z } from "zod";

// Enhanced logging function
function logWithTimestamp(message: string, ...args: any[]) {
  console.log(`[${new Date().toISOString()}] ${message}`, ...args);
}

// Zod Schema for Insight Validation
const InsightSchema = z.object({
  id: z.number().positive(),
  title: z
    .string()
    .min(3, "Title must be at least 3 characters")
    .max(100, "Title cannot exceed 100 characters"),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters")
    .max(500, "Description cannot exceed 500 characters"),
  content: z.string().min(20, "Content must be at least 20 characters"),
  category: z.string().optional().default("General"),
  date: z.string(),
  image: z.string().optional(),
  tags: z.array(z.string()).optional().default([]),
});

export type Insight = z.infer<typeof InsightSchema>;

export async function GET() {
  try {
    // Extensive logging
    logWithTimestamp(" GET /api/insights - Starting insights fetch");
    logWithTimestamp(" Current working directory:", process.cwd());

    // Construct the path to insights.json
    const insightsFilePath = path.join(process.cwd(), "data", "insights.json");
    logWithTimestamp(" Insights file path:", insightsFilePath);

    // Check if file exists
    if (!fs.existsSync(insightsFilePath)) {
      logWithTimestamp(" Insights file not found");
      return NextResponse.json(
        {
          insights: [],
          error: "Insights file not found",
          filePath: insightsFilePath,
        },
        {
          status: 404,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }

    // Read file contents
    const rawData = fs.readFileSync(insightsFilePath, "utf-8");
    logWithTimestamp(" Raw insights data length:", rawData.length);

    // Parse JSON
    let insights: unknown[];
    try {
      insights = JSON.parse(rawData);
    } catch (parseError) {
      logWithTimestamp(" JSON parsing error:", parseError);
      return NextResponse.json(
        {
          insights: [],
          error: "Invalid JSON in insights file",
          rawData,
        },
        {
          status: 500,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }

    // Validate insights
    const validInsights: Insight[] = [];
    const invalidInsights: unknown[] = [];

    insights.forEach((insight, index) => {
      try {
        const validatedInsight = InsightSchema.parse(insight);
        validInsights.push(validatedInsight);
      } catch (validationError) {
        logWithTimestamp(
          ` Invalid insight at index ${index}:`,
          insight,
          validationError
        );
        invalidInsights.push(insight);
      }
    });

    logWithTimestamp(" Validation complete", {
      totalInsights: insights.length,
      validInsights: validInsights.length,
      invalidInsights: invalidInsights.length,
    });

    // Return response with insights
    return NextResponse.json(
      {
        insights: validInsights,
        total: validInsights.length,
        invalidInsights:
          invalidInsights.length > 0 ? invalidInsights : undefined,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    logWithTimestamp(" Critical error in insights fetch:", error);
    return NextResponse.json(
      {
        insights: [],
        error: "Failed to fetch insights",
        errorDetails: error instanceof Error ? error.message : "Unknown error",
      },
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}

export async function POST(request: Request) {
  try {
    // Parse request body
    const newInsight = await request.json();
    logWithTimestamp(" Received new insight:", newInsight);

    // Validate insight
    const validatedInsight = InsightSchema.parse(newInsight);
    logWithTimestamp(" Validated insight:", validatedInsight);

    // Construct the path to insights.json
    const insightsFilePath = path.join(process.cwd(), "data", "insights.json");
    logWithTimestamp(" Insights file path:", insightsFilePath);

    // Read existing insights
    let insights: Insight[] = [];
    if (fs.existsSync(insightsFilePath)) {
      const rawData = fs.readFileSync(insightsFilePath, "utf-8");
      insights = JSON.parse(rawData);
      logWithTimestamp(" Existing insights:", insights);
    }

    // Check for duplicate
    const isDuplicate = insights.some(
      (insight) => insight.title === validatedInsight.title
    );

    if (isDuplicate) {
      logWithTimestamp(" Duplicate insight detected");
      return NextResponse.json(
        {
          error: "An insight with this title already exists",
        },
        {
          status: 400,
        }
      );
    }

    // Add new insight
    insights.push(validatedInsight);

    // Write back to file
    fs.writeFileSync(insightsFilePath, JSON.stringify(insights, null, 2));
    logWithTimestamp(" Insights updated successfully");

    return NextResponse.json(
      {
        message: "Insight added successfully",
        insight: validatedInsight,
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    logWithTimestamp(" Error adding insight:", error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          error: "Invalid insight data",
          details: error.errors,
        },
        {
          status: 400,
        }
      );
    }

    return NextResponse.json(
      {
        error: "Failed to add insight",
        errorDetails: error instanceof Error ? error.message : "Unknown error",
      },
      {
        status: 500,
      }
    );
  }
}
