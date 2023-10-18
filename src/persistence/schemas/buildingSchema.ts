import mongoose from 'mongoose';
import { IBuildingPersistence } from '../../dataschema/IBuildingPersistence';

const BuildingSchema = new mongoose.Schema(
    {
        domainId: { 
            type: String, 
            unique: true 
        },

        code: { 
            type: String, 
            unique: true,
            required: [true, 'Please enter Building Code'],

        },

        description: { 
            type: String 
        },

        name: { 
            type: String 
        }
    },
    {
        timestamps: true
    }
);

export default mongoose.model<IBuildingPersistence & mongoose.Document>('Building', BuildingSchema);