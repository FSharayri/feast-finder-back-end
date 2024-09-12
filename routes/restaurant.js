import { Router } from 'express'
import { decodeUserFromToken, checkAuth } from '../middleware/auth.js'
import * as restaurantsCtrl from '../controllers/restaurants.js'

const router = Router()

/*---------- Public Routes ----------*/
//GET api/restaurants
router.get('/', restaurantsCtrl.index)
// GET api/restaurants/:restaurantId
router.get('/:restaurantId', restaurantsCtrl.show)

/*---------- Protected Routes ----------*/
router.use(decodeUserFromToken)
// POST api/restaurants
router.post('/', checkAuth, restaurantsCtrl.create)
// PUT api/restaurants/:restaurantId
router.put('/:restaurantId', checkAuth, restaurantsCtrl.update)
// DELETE api/restaurants/:restaurantId
router.delete('/:restaurantId', checkAuth, restaurantsCtrl.delete )
// PUT api/restaurants/:restaurantId/add-photo
router.put('/:restaurantId/add-photo', checkAuth, restaurantsCtrl.addPhoto)

export { router }
