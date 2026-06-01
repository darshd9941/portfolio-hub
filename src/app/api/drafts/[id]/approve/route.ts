import { getSql } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const sql = getSql();
    const { id } = await params;

    const result = await sql`
      UPDATE drafts SET status = 'approved', updated_at = NOW()
      WHERE id = ${id} AND status = 'draft'
      RETURNING *
    `;

    if (result.length === 0) {
      return NextResponse.json(
        { error: "Draft not found or already approved/posted" },
        { status: 404 },
      );
    }

    return NextResponse.json(result[0]);
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 },
    );
  }
}
