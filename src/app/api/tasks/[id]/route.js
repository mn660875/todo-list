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
      const { completed } = await req.json();
  
      const updatedTask = await Task.findByIdAndUpdate(
        id,
        { completed },
        { new: true }
      );
  
      return NextResponse.json(updatedTask); // ✅ always return JSON
    } catch (err) {
      return NextResponse.json({ error: "Update failed" }, { status: 500 });
    }
  }
  