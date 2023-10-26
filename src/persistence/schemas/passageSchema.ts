import mongoose from 'mongoose';
import { Schema, Document } from 'mongoose';
import { IPassagePersistence } from '../../dataschema/IPassagePersistence';

const PassageSchema = new mongoose.Schema(
    {
        domainId: { 
            type: String, 
            unique: true 
        },

        fromFloorId: { 
            type: Schema.Types.ObjectId,
            ref: 'Floor',
            required: [true, 'Please enter Floor ID'],
        },

        toFloorId: { 
            type: Schema.Types.ObjectId,
            ref: 'Floor',
            required: [true, 'Please enter Floor ID'],
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
        }

    },
    {
        timestamps: true
    }
);

export default mongoose.model<IPassagePersistence & mongoose.Document>('Passage', PassageSchema);