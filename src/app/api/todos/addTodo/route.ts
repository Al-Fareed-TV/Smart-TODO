import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/db/config";
connect();
export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { todo, priority, done } = reqBody;
  } catch (error: any) {
    console.log(error.message);
  }
}
