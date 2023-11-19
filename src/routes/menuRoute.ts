// src/routes/indexRoute.ts
import express, { Router } from 'express';
import { createMenu, getMenusByRestaurantId, editMenuById, deleteMenuById, getMenuByMenuId } from '../controllers/menuController';

const router: Router = express.Router();

router.put('/update-menu/:id', editMenuById)
router.post('/create-menu', createMenu);
router.get('/get-menu/:restaurantId', getMenusByRestaurantId);
router.get('/get-menu-by-id/:menuId', getMenuByMenuId);
router.delete('/delete-menu/:id', deleteMenuById);

export default router;
