import { NextResponse, NextRequest } from "next/server";
import { connect } from "@/db/config";
import Todo from "@/models/todos";
connect();

export async function PATCH(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { todo, isDone } = reqBody;

    await Todo.updateOne({ todo }, { $set: { isDone } });

    return NextResponse.json({
      message: "Todo updated successfully",
      status: 200,
    });
  } catch (error: any) {
    return NextResponse.json({
      error: error.message,
      status: 403,
    });
  }
}
