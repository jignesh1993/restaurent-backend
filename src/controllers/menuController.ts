import { Request, Response } from 'express';
import Menu, { IMenu } from '../models/menuModel';
import Restaurant, { IRestaurant } from '../models/restaurantModel';

export const createMenu = async (req: Request, res: Response): Promise<void> => {
  const { name, price, restaurantId, available }: IMenu = req.body;  

  try {
    // Check if the restaurant exists
    const existingRestaurant = await Restaurant.findById(restaurantId);

    if (!existingRestaurant) {
      res.status(404).json({ error: 'Restaurant not found' });
      return;
    }

    // Create the menu
    const newMenu: IMenu = new Menu({ name, price, restaurantId, available });
    await newMenu.save();

    res.json(newMenu);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const getMenusByRestaurantId = async (req: Request, res: Response): Promise<void> => {
  const { restaurantId } = req.params;

  try {
    const menus = await Menu.find({ restaurantId });

    if (menus.length === 0) {
      res.status(404).json({ error: 'Menus not found for the specified restaurant ID' });
      return;
    }

    res.json(menus);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const getMenuByMenuId = async (req: Request, res: Response): Promise<void> => {
  const { menuId } = req.params;

  try {
    const menu = await Menu.find({_id: menuId });

    if (menu.length === 0) {
      res.status(404).json({ error: 'Menus not found' });
      return;
    }

    res.json(menu);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const editMenuById = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const { name, price, available }: IMenu = req.body;

  try {
    const updatedMenu = await Menu.findByIdAndUpdate(
      id,
      { name, price, available },
      { new: true }
    );

    if (!updatedMenu) {
      res.status(404).json({ error: 'Menu not found' });
      return;
    }

    res.json(updatedMenu);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteMenuById = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  try {
    const deletedMenu = await Menu.findByIdAndDelete(id);

    if (!deletedMenu) {
      res.status(404).json({ error: 'Menu not found' });
      return;
    }

    res.json({ message: 'Menu deleted successfully' });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

