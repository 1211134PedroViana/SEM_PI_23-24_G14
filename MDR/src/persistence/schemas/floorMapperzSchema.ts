import mongoose from 'mongoose';
import { Schema, Document } from 'mongoose';
import { IFloorMapperzPersistence } from '../../dataschema/IFloorMapperzPersistence';

const FloorMapperzSchema = new mongoose.Schema(
    {
        domainId: { 
            type: String, 
            unique: true 
        },

        floorId: { 
            type: String,
            ref: 'Floor',
            required: [true, 'Please enter Floor ID'],
        },

        fileUrl: {
            type: String,
            required: [true, 'Please enter File URL']
        }
    },
    {
        timestamps: true
    }
);

export default mongoose.model<IFloorMapperzPersistence & mongoose.Document>('FloorMapperz', FloorMapperzSchema);