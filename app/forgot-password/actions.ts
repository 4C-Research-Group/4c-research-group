"use server";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function handleResetPassword(formData: FormData) {
  const email = formData.get("email") as string;
  const cookieStore = cookies();

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
      },
    }
  );

  try {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/update-password`,
    });

    if (error) {
      console.error("Error sending reset email:", error.message);
      return { error: error.message };
    }

    return { success: true };
  } catch (error: any) {
    console.error("Unexpected error:", error);
    return { error: error.message || "Unexpected error" };
  }
}
