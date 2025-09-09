import { connectionStr } from "@/lib/db";
import { Task } from "@/lib/model/tasks";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function DELETE(request, {params}){
    const taksId= params.id;
    const record= {_id: taksId};
    await mongoose.connect(connectionStr);
    const result= await Task.deleteOne(record);
    return NextResponse.json({result, success: true}) 
}
export async function PUT(req, { params }) {
  try {
    const { id } = params;
    const body = await req.json();

    // Build update object dynamically
    const updateData = {};
    if (body.title !== undefined) updateData.title = body.title;
    if (body.completed !== undefined) updateData.completed = body.completed;
    if (body.category !== undefined) updateData.category = body.category;

    // Ensure DB connection
    await mongoose.connect(connectionStr);

    const updatedTask = await Task.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    if (!updatedTask) {
      return NextResponse.json({ error: "Task not found" }, { status: 404 });
    }

    return NextResponse.json(updatedTask);
  } catch (err) {
    console.error("Error updating task:", err);
    return NextResponse.json({ error: "Update failed" }, { status: 500 });
  }
}

export async function GET(request, {params}){
    const productId =params.id;
    const filter = {_id: productId}
    await mongoose.connect(connectionStr)
    const result= await Post.findById(filter);
    return NextResponse.json({result , success:true})

}