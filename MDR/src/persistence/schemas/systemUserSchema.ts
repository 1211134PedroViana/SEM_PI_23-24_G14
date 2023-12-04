import mongoose from 'mongoose';
import { ISystemUserPersistence } from '../../dataschema/ISystemUserPersistence';

const systemUserSchema = new mongoose.Schema(
  {
    domainId: {
      type: String,
      unique: true,
    },

    email: {
      type: String,
      unique: true,
      required: [true, 'Please enter Email'],
    },

    password: {
      type: String,
    },

    role: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model<ISystemUserPersistence & mongoose.Document>('SystemUser', systemUserSchema);
