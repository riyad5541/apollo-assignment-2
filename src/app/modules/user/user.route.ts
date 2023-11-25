import  express  from 'express';
import { UserControllers } from './user.controller';

const router = express.Router()

router.post('/',UserControllers.createUser)

router.get('/',UserControllers.getAllUsers)

router.get('/:userId', UserControllers.getSingleUser)

router.put('/:userId',UserControllers.updateAUser)

router.delete('/:userId', UserControllers.deleteUser)

router.put('/:userId/orders',UserControllers.addANewProductOrder)

router.get('/:userId/orders',UserControllers.retriveOrdersSpecificUser)

router.get('/:userId/orders/total-price',UserControllers.calculateTotalPriceForAUserOrder)

export const UserRoutes = router;