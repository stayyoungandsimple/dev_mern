import { Router } from 'express'
const router = Router()
import userController from '../controllers/userController.js'
const { registerUser, loginUser, getMe }  = userController
import authMiddleware  from '../middleware/authMiddleware.js'
const { protect} = authMiddleware

router.post('/register', registerUser)
router.post('/login', loginUser)
router.get('/me', protect, getMe)

export default router
