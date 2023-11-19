import { Request, Response } from 'express';
import Restaurant, { IRestaurant } from '../models/restaurantModel';

export const getAllRestaurants = async (req: Request, res: Response): Promise<void> => {
  try {
    const restaurants: IRestaurant[] = await Restaurant.find();
    res.json(restaurants);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const getRestaurantById = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  try {
    const restaurant = await Restaurant.findById(id);

    if (!restaurant) {
      res.status(404).json({ error: 'Restaurant not found' });
      return;
    }

    res.json(restaurant);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const createRestaurant = async (req: Request, res: Response): Promise<void> => {
  const { name, address, details, contactNumber }: IRestaurant = req.body;
  try {
    const newRestaurant: IRestaurant = new Restaurant({ name, address, details, contactNumber });
    await newRestaurant.save();
    res.status(201).json(newRestaurant);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const updateRestaurantById = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const { name, address, details, contactNumber }: IRestaurant = req.body;

  try {
    const updatedRestaurant = await Restaurant.findByIdAndUpdate(
      id,
      { name, address, details, contactNumber },
      { new: true } 
    );

    if (!updatedRestaurant) {
      res.status(404).json({ error: 'Restaurant not found' });
      return;
    }

    res.json(updatedRestaurant);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteRestaurantById = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  try {
    const deletedRestaurant = await Restaurant.findByIdAndDelete(id);

    if (!deletedRestaurant) {
      res.status(404).json({ error: 'Restaurant not found' });
      return;
    }

    res.json({ message: 'Restaurant deleted successfully' });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};
