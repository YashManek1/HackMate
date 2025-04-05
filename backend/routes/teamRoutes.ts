import express from 'express';
import * as teamController from '../controllers/teamController';

const router = express.Router();

router.post('/create', teamController.createTeam);
router.put('/update/:teamId', teamController.updateTeam);
router.get('/:teamId', teamController.getTeam);
router.delete('/:teamId', teamController.deleteTeam);
router.post('/join', teamController.joinTeam);

export default router;