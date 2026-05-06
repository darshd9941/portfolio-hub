import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json(
    { error: "Social API not connected yet. This will post to connected platforms once integrated." },
    { status: 501 },
  );
}
