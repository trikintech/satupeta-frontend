import { mapsets as mockMapsets } from "@/shared/utils/mapsets";

import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json(mockMapsets);
}

export async function POST(req: Request) {
  const body = await req.json();
  const newMapset = {
    id: Date.now().toString(),
    ...body,
  };
  mockMapsets.push(newMapset);
  return NextResponse.json(newMapset, { status: 201 });
}
