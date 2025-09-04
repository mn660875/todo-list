
import { connectionStr } from "@/lib/db";
import { Task } from "@/lib/model/tasks";

import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET() {
 await mongoose.connect(connectionStr)
  const tasks = await Task.find().sort({ createdAt: -1 });
  return NextResponse.json(tasks)
}

export async function POST(request){
    const payload= await request.json()
    await mongoose.connect(connectionStr);
    let task = new Task(payload)
    const result= await task.save()
    return NextResponse.json({result, success: true})
}