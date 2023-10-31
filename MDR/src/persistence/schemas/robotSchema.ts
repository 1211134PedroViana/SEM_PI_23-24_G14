import mongoose from 'mongoose';
import { Schema, Document } from 'mongoose';
import { IRobotPersistence } from '../../dataschema/IRobotPersistence';

const RobotSchema = new mongoose.Schema(
    {
        domainId: {
            type: String,
            unique: true
        },

        code: {
            type: String,
            unique: true,
            required: [true, 'Please enter robot code'],
        },

        nickname: {
            type: String
        },

        robotType: {
            type: Schema.Types.ObjectId,
            ref: 'RobotType',
            required: [true, 'Please enter RobotType']
        },

        serialNumber: {
            type: Number
        },

        description: {
            type: String
        },

        isActive: {
            type: Boolean
        }
    },
    {
        timestamps: true
    }
);

export default mongoose.model<IRobotPersistence & mongoose.Document>('Robot', RobotSchema);

