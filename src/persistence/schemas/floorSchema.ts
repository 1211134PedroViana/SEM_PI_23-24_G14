import mongoose from 'mongoose';
import { Schema, Document } from 'mongoose';
import { IFloorPersistence } from '../../dataschema/IFloorPersistence';

const FloorSchema = new mongoose.Schema(
    {
        domainId: { 
            type: String, 
            unique: true 
        },

        buildingId: { 
            type: Schema.Types.ObjectId,
            ref: 'Building',
            required: [true, 'Please enter Building ID'],
        },

        floorNumber: { 
            type: Number,
            required: [true, 'Please enter Floor Number'],
        },

        description: { 
            type: String 
        }

    },
    {
        timestamps: true
    }
);

export default mongoose.model<IFloorPersistence & mongoose.Document>('Floor', FloorSchema);