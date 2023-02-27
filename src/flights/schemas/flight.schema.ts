import mongoose from 'mongoose';
import { PASSENGER } from 'src/common/models/models';

export const FlightSchema = new mongoose.Schema({
    pilot: { type: String, required: true },
    airplane: { type: String, required: true },
    cityDestination: { type: String, required: true },
    flightDate: { type: Date, required: true },
    passengers: [{ type: mongoose.Schema.Types.ObjectId, ref: PASSENGER.name }]
}, { timestamps: true });

FlightSchema.index({ email: 1 }, { unique: true });
