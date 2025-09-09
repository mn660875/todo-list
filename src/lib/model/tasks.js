const { default: mongoose } = require("mongoose");

const TaskSchema= new mongoose.Schema(
    {
        title: {type:String, required: true},
        category: {
            type:String,
            required: true,
            enum: ["Work", "Personal", "Shopping", "Study", "Information"],
            required: true
        },
        completed: {type: Boolean, default: false},
        createdAt: {type: Date, default: Date.now}
    }
)
export const Task= mongoose.models.tasks || mongoose.model("tasks", TaskSchema)