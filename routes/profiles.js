import { Router } from 'express'
import { decodeUserFromToken, checkAuth } from '../middleware/auth.js'
import * as profilesCtrl from '../controllers/profiles.js'

const router = Router()

/*---------- Protected Routes ----------*/
router.use(decodeUserFromToken)
// GET api/profile
router.get('/', checkAuth, profilesCtrl.show)
// PUT api/profile/:profileId/add-photo
router.put('/:id/add-photo', checkAuth, profilesCtrl.addPhoto)

export { router }
