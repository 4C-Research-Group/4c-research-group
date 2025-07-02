import { NextRequest, NextResponse } from "next/server";
import { getContactPage, updateContactPage } from "@/lib/supabase/contact-page";
// import { isUserAdmin } from "@/lib/utils/role-check"; // TODO: Use for admin check

export async function GET() {
  const data = await getContactPage();
  if (!data) {
    return NextResponse.json(
      { error: "Contact page not found" },
      { status: 404 }
    );
  }
  return NextResponse.json(data);
}

export async function PATCH(request: NextRequest) {
  // TODO: Check if user is admin
  // const user = ...;
  // if (!await isUserAdmin(user)) return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  const updates = await request.json();
  const data = await updateContactPage(updates);
  if (!data) {
    return NextResponse.json(
      { error: "Failed to update contact page" },
      { status: 500 }
    );
  }
  return NextResponse.json(data);
}
