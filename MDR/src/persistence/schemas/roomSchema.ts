import mongoose from 'mongoose';
import { Schema, Document } from 'mongoose';
import { IRoomPersistence } from '../../dataschema/IRoomPersistence';

const RoomSchema = new mongoose.Schema(
    {
        domainId: {
            type: String,
            unique: true
        },

        code: {
            type: String,
            unique: true,
            required: true
        },

        name: {
            type: String,
            unique: true,
            required: true
        },

        description: {
            type: String
        },

        dimension: {
            pos1: {
                type: Number,
                required: true
            },
            pos2: {
                type: Number,
                required: true
            },
            pos3: {
                type: Number,
                required: true
            },
            pos4: {
                type: Number,
                required: true
            },
        },

        location: {
            positionX: {
                type: Number,
                required: true
            },
            positionY: {
                type: Number,
                required: true
            },
            direction: {
                type: String,
                required: true
            }
        },

        floorId: {
            type: Schema.Types.ObjectId,
            required: true
        }

    },
    {
        timestamps: true
    }
);

export default mongoose.model<IRoomPersistence & mongoose.Document>('Room', RoomSchema);