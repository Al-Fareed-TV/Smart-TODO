import { NextResponse, NextRequest } from "next/server";
import { connect } from "@/db/config";
import Todo from '@/models/todos'
connect();
export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { todo, priority, isDone } = reqBody;
    const newTodo = new Todo({
      todo,
      priority,
      isDone,
    });
    await newTodo.save();
      
    return NextResponse.json({
      message: "Your todo has been added",
      status: 201,
    });
  } catch (error: any) {
      return NextResponse.json({
          error: error.message,
          status:400
    })
  }
}
