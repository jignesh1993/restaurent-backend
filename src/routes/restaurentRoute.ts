import express, { Router } from 'express';
import { getAllRestaurants, getRestaurantById, createRestaurant, updateRestaurantById, deleteRestaurantById } from '../controllers/restaurantController';

const router: Router = express.Router();

router.post('/create-restaurent', createRestaurant);
router.get('/get-all-restaurents', getAllRestaurants);
router.get('/get-restaurent/:id', getRestaurantById);
router.delete('/delete-restaurent/:id', deleteRestaurantById);
router.put('/update-restaurent/:id', updateRestaurantById)

export default router;
