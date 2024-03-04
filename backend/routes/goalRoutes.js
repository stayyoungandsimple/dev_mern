import { Router } from 'express'
const router = Router()
import goalController  from '../controllers/goalController.js'
import authMiddleware from '../middleware/authMiddleware.js'
const { protect } = authMiddleware 

router.route('/').get(protect, goalController.getGoals).post(protect, goalController.setGoal)
router.route('/:id').delete(protect, goalController.deleteGoal).put(protect, goalController.updateGoal)

export default router
