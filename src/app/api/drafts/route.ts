import { getSql } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const sql = getSql();
    const status = request.nextUrl.searchParams.get("status");

    const drafts =
      status && status !== "all"
        ? await sql`SELECT * FROM drafts WHERE status = ${status} ORDER BY created_at DESC`
        : await sql`SELECT * FROM drafts ORDER BY created_at DESC`;

    return NextResponse.json(drafts);
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const sql = getSql();
    const body = await request.json();
    const { title, content, image_url, platforms } = body;

    if (!title || !content) {
      return NextResponse.json(
        { error: "Title and content are required" },
        { status: 400 },
      );
    }

    const result = await sql`
      INSERT INTO drafts (title, content, image_url, platforms)
      VALUES (${title}, ${content}, ${image_url || null}, ${JSON.stringify(platforms || [])}::jsonb)
      RETURNING *
    `;

    return NextResponse.json(result[0], { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 },
    );
  }
}
