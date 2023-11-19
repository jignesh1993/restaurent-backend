import mongoose, { Document, Schema } from 'mongoose';

export interface IMenu extends Document {
  name: string;
  price: number;
  restaurantId: mongoose.Types.ObjectId;
  available?: boolean;
}

const menuSchema: Schema<IMenu> = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  restaurantId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Restaurant',
    required: true,
  },
  available: {
    type: Boolean,
    default: true,
  },
  // add other menu properties as needed
});

const Menu = mongoose.model<IMenu>('Menu', menuSchema);

export default Menu;
