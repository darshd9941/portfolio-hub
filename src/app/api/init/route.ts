import { getSql } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const sql = getSql();

    await sql`
      CREATE TABLE IF NOT EXISTS drafts (
        id SERIAL PRIMARY KEY,
        title TEXT NOT NULL,
        content TEXT NOT NULL,
        image_url TEXT,
        platforms JSONB DEFAULT '[]'::jsonb,
        status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'approved', 'posted')),
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
      )
    `;

    await sql`
      CREATE TABLE IF NOT EXISTS activity_log (
        id SERIAL PRIMARY KEY,
        type TEXT NOT NULL,
        title TEXT NOT NULL,
        summary TEXT,
        metadata JSONB DEFAULT '{}'::jsonb,
        created_at TIMESTAMP DEFAULT NOW()
      )
    `;

    await sql`
      CREATE TABLE IF NOT EXISTS daily_log (
        id SERIAL PRIMARY KEY,
        date DATE NOT NULL UNIQUE,
        summary TEXT,
        highlights JSONB DEFAULT '[]'::jsonb,
        created_at TIMESTAMP DEFAULT NOW()
      )
    `;

    return NextResponse.json({ ok: true, message: "Tables created" });
  } catch (error) {
    return NextResponse.json(
      { ok: false, error: (error as Error).message },
      { status: 500 },
    );
  }
}
