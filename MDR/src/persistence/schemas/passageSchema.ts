import mongoose from 'mongoose';
import { IPassagePersistence } from '../../dataschema/IPassagePersistence';

const PassageSchema = new mongoose.Schema(
  {
    domainId: {
      type: String,
      unique: true,
    },

    fromBuildingId: {
        type: String,
        ref: 'Building',
        required: [true, 'Please enter Building ID'],
      },

    toBuildingId: {
        type: String,
        ref: 'Building',
        required: [true, 'Please enter Building ID'],
      },

    fromFloorId: {
      type: String,
      ref: 'Floor',
      required: [true, 'Please enter Floor ID'],
    },

    toFloorId: {
      type: String,
      ref: 'Floor',
      required: [true, 'Please enter Floor ID'],
    },

    location: {
      positionX: {
        type: Number,
        required: true,
      },
      positionY: {
        type: Number,
        required: true,
      },
      direction: {
        type: String,
        required: true,
      },
    },

    description: {
      type: String
    }
  },
  {
    timestamps: true,
  },
);

export default mongoose.model<IPassagePersistence & mongoose.Document>('Passage', PassageSchema);
