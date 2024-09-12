import { Router } from 'express'
import { decodeUserFromToken, checkAuth } from '../middleware/auth.js'
import * as dishesCtrl from '../controllers/dishes.js'

const router = Router()

/*---------- Public Routes ----------*/
// GET api/dishes
router.get('/', dishesCtrl.index)
// GET api/dishes/:dishId
router.get('/:dishId', dishesCtrl.show)

/*---------- Protected Routes ----------*/
router.use(decodeUserFromToken)
// dishes CUD -------------------------------
// POST api/dishes
router.post('/', checkAuth, dishesCtrl.create)
// PUT api/dishes/:dishId
router.put('/:dishId', checkAuth, dishesCtrl.update)
// DELETE api/dishes/:dishId
router.delete('/:dishId', checkAuth, dishesCtrl.delete)
// PUT api/dishes/:dishId/add-photo
router.put('/:dishId/add-photo', checkAuth, dishesCtrl.addDishPhoto)

// reviews CUD -------------------------------
// POST localhost:3001/api/restaurants/:dishId/reviews
router.post('/:dishId/reviews', checkAuth, dishesCtrl.createReview)
// PUT api/dishes/:dishId/reviews/:reviewId
router.put('/:dishId/reviews/:reviewId', checkAuth, dishesCtrl.updateReview)
// DELETE /api/dishes/:dishId/reviews/:reviewId
router.delete('/:dishId/reviews/:reviewId', checkAuth, dishesCtrl.deleteReview)

export { router }
