import { Router } from 'express'
import { decodeUserFromToken, checkAuth } from '../middleware/auth.js'
import * as profilesCtrl from '../controllers/profiles.js'

const router = Router()

/*---------- Public Routes ----------*/


/*---------- Protected Routes ----------*/
router.use(decodeUserFromToken)
// GET api/profile
router.get('/', checkAuth, profilesCtrl.show)
router.put('/:id/add-photo', checkAuth, profilesCtrl.addPhoto)

export { router }
