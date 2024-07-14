import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/db/config";
import Todo from "@/models/todos";
connect();

export async function DELETE(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { todo } = reqBody;

    await Todo.deleteOne({ todo });
    return NextResponse.json({
      message: "Todo has been removed successfully",
      status: 200,
    });
  } catch (error: any) {
    return NextResponse.json({
      error: error.message,
      status: 403,
    });
  }
}
