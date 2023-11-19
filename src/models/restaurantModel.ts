import mongoose, { Document, Schema } from 'mongoose';

export interface IRestaurant extends Document {
  name: string;
  address: string;
  details?: string;
  contactNumber: string;
}

const restaurantSchema: Schema<IRestaurant> = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  details: {
    type: String,
  },
  contactNumber: {
    type: String,
    required: true,
  },
  // add other restaurant properties as needed
});

const Restaurant = mongoose.model<IRestaurant>('Restaurant', restaurantSchema);

export default Restaurant;
