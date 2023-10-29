import mongoose from 'mongoose';
import { Schema, Document } from 'mongoose';
import { IElevatorPersistence } from '../../dataschema/IElevatorPersistence';

const ElevatorSchema = new mongoose.Schema(
    {
        domainId: { 
            type: String, 
            unique: true 
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

        buildingId: {
          type: Schema.Types.ObjectId,
          ref:"Building",
          required: true
        },
        
        floorList: [{
          type: String,
          required: true
        }],
        
        brand: {
          type: String,
          required: true
        },
        
        model: {
          type: String,
          required: true
        },
        
        serialNumber: {
          type: String,
          required: true
        },
    
        description: {
          type: String,
          required: true
        }

    },
    {
        timestamps: true
    }
);

export default mongoose.model<IElevatorPersistence & mongoose.Document>('Elevator', ElevatorSchema);