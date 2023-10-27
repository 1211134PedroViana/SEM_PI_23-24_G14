import mongoose from 'mongoose';
import { ITaskTypePersistence } from '../../dataschema/ITaskTypePersistence';


const TaskTypeSchema = new mongoose.Schema(
    {
        domainId: { 
            type: String, 
            unique: true 
        },

        code: { 
            type: String, 
            unique: true,
            required: [true, 'Please enter TaskType Code']
        },

        description: { 
            type: String,
            required: [true, 'Please enter TaskType description'] 
        }
    },
    {
        timestamps: true
    }
);

export default mongoose.model<ITaskTypePersistence & mongoose.Document>('TaskType', TaskTypeSchema);