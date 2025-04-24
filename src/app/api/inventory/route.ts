import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
  console.log("OK sever");

  const response = await fetch("https://dev.electorq.com/dummy/inventory");
  const data = await response.json();
  console.log(response);
  return NextResponse.json({ data: data }, { status: 200 });
}
