import mongoose from "../connection.js";
import { SchemaTypes } from "mongoose";
const schema = mongoose.Schema;
const taskSchema = new schema({
  id: { type: SchemaTypes.String, required: true },
  tasks: [
    {
      id: { type: SchemaTypes.String, required: true },
      title: { type: SchemaTypes.String, required: true },
      description: { type: SchemaTypes.String, required: true },
      duedate: { type: SchemaTypes.String, required: true },
      priority: { type: SchemaTypes.String, required: true },
      status: { type: SchemaTypes.String, default: "pending", required: true },
    }
  ],
});

export const taskModel =
  mongoose.models.tasks || mongoose.model("task", taskSchema);
