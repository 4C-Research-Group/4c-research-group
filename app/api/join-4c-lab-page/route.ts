import { NextRequest, NextResponse } from "next/server";
import {
  getJoin4CLabPage,
  updateJoin4CLabPage,
} from "@/lib/supabase/join-4c-lab-page";
// import { isUserAdmin } from "@/lib/utils/role-check"; // TODO: Use for admin check

export async function GET() {
  const data = await getJoin4CLabPage();
  if (!data) {
    return NextResponse.json(
      { error: "Join 4C Lab page not found" },
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
  const data = await updateJoin4CLabPage(updates);
  if (!data) {
    return NextResponse.json(
      { error: "Failed to update join 4c lab page" },
      { status: 500 }
    );
  }
  return NextResponse.json(data);
}
