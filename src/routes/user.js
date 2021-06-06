import {Router} from 'express';

const user = require('../controllers/user.controller');
const router = Router();


// Routes go here
router.get('/:id', user.getUser )


export default router;