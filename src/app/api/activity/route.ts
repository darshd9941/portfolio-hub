import { getSql } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    const sql = getSql();
    const rows =
      await sql`SELECT * FROM activity_log ORDER BY created_at DESC LIMIT 50`;
    return NextResponse.json(rows);
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
    const { type, title, summary, metadata } = body;

    if (!type || !title) {
      return NextResponse.json(
        { error: "Type and title are required" },
        { status: 400 },
      );
    }

    const result = await sql`
      INSERT INTO activity_log (type, title, summary, metadata)
      VALUES (${type}, ${title}, ${summary || null}, ${JSON.stringify(metadata || {})}::jsonb)
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
