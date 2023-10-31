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
                roomId: {
                    type: String,
                    required: true
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
                    }
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
            }
        ],
        fMapElevator: {
            elevatorId: {
                type: String,
                required: true
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
        fMapPassages: [
            {
                passageId: {
                    type: String,
                    required: true
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
            }
        ]

    },
    {
        timestamps: true
    }
);

export default mongoose.model<IFloorMapperzPersistence & mongoose.Document>('FloorMapperz', FloorMapperzSchema);