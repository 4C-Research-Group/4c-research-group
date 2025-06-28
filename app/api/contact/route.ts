import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

// Initialize Resend
const resend = new Resend(process.env.RESEND_API_KEY);

// Email configuration
const TO_EMAIL =
  process.env.NODE_ENV === "production"
    ? "rishi.ganesan@lhsc.on.ca"
    : "pranav.jha@mail.concordia.ca";

// Use Resend's test domain for easier setup
const FROM_EMAIL = "onboarding@resend.dev";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { firstName, lastName, email, subject, message } = body;

    // Validate required fields
    if (!firstName || !lastName || !email || !subject || !message) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    // Create email content
    const emailContent = `
New Contact Form Submission

Name: ${firstName} ${lastName}
Email: ${email}
Subject: ${subject}

Message:
${message}

---
This message was sent from the 4C Research Lab contact form.
    `.trim();

    // Send email using Resend
    if (process.env.RESEND_API_KEY) {
      const { data, error } = await resend.emails.send({
        from: FROM_EMAIL,
        to: [TO_EMAIL],
        subject: `Contact Form: ${subject}`,
        text: emailContent,
        replyTo: email,
      });

      if (error) {
        console.error("Resend error:", error);
        return NextResponse.json(
          { error: "Failed to send email. Please try again later." },
          { status: 500 }
        );
      }

      console.log("Email sent successfully:", data);
    } else {
      // Fallback to console log if no API key
      console.log("=== CONTACT FORM EMAIL ===");
      console.log(`To: ${TO_EMAIL}`);
      console.log(`From: ${email}`);
      console.log(`Subject: Contact Form: ${subject}`);
      console.log("Content:");
      console.log(emailContent);
      console.log("========================");
      console.log(
        "Note: RESEND_API_KEY not found. Add it to your environment variables to send real emails."
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Thank you for your message! We will get back to you soon.",
        debug:
          process.env.NODE_ENV === "development" ? { to: TO_EMAIL } : undefined,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Failed to send message. Please try again later." },
      { status: 500 }
    );
  }
}
