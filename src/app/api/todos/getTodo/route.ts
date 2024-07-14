import { NextResponse } from "next/server";
import { connect } from "@/db/config";
import Todo from "@/models/todos";
connect();

export async function GET() {
    try {
        const response = await Todo.find();
        console.log("Response while getting data from DB : ", response);
        
        return NextResponse.json({
            data: response,
            status:200
        })
        
  } catch (error: any) {
    return NextResponse.json({ error: error.message, status: 400 });
  }
}
