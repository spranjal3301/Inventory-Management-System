import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  console.log("OK server");

  const response = await fetch(process.env.BACKEND_URL!);
  const data = await response.json();
  console.log(response);
  return NextResponse.json({ data: data }, { status: 200 });
}
