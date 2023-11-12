import mongoose from 'mongoose';
import { Schema, Document } from 'mongoose';
import { IRobotTypePersistence } from '../../dataschema/IRobotTypePersistence';

const RobotTypeSchema = new mongoose.Schema(
    {
        domainId: { 
            type: String, 
            unique: true 
        },

        code: { 
            type: String, 
            unique: true,
            required: [true, 'Please enter RobotType Code']
        },

        brand: { 
            type: String,
            required: [true, 'Please enter RobotType Brand'] 
        },

        model: { 
            type: String,
            required: [true, 'Please enter RobotType Model'] 
        },

        taskTypes: [
            {
                type: String,
                ref: 'TaskType',
                required: [true, 'Please enter TaskTypes'] 
            }
        ]

    },
    {
        timestamps: true
    }
);

export default mongoose.model<IRobotTypePersistence & mongoose.Document>('RobotType', RobotTypeSchema);