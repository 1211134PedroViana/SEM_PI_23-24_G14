import mongoose from 'mongoose';
import { Schema, Document } from 'mongoose';
import { IFloorMapperzPersistence } from '../../dataschema/IFloorMapperzPersistence';

const FloorMapperzSchema = new mongoose.Schema(
    {
        domainId: { 
            type: String, 
            unique: true 
        },

        floor: { 
            type: Schema.Types.ObjectId,
            ref: 'Floor',
            required: [true, 'Please enter Floor ID'],
        },

        map: {
            type: [
                [
                    Number
                ]
            ],
            default: [],
            required: [true, 'Please enter Map']
        },
        
        fMapRooms: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Room'
            }
        ],

        fMapPassages: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Passage',
            }
        ],

        fMapElevators: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Elevator'
            }
        ]

    },
    {
        timestamps: true
    }
);

export default mongoose.model<IFloorMapperzPersistence & mongoose.Document>('FloorMapperz', FloorMapperzSchema);