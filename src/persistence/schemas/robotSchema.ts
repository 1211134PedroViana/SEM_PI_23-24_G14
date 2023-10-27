import mongoose from 'mongoose';
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
            type: String
        },

        serialNumber: {
            type: Number
        },

        description: {
            type: String
        },

        status: {
            type: String
        }
    },
    {
        timestamps: true
    }
);

export default mongoose.model<IRobotPersistence & mongoose.Document>('Robot', RobotSchema);
