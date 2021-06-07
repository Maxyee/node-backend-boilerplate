import {Router} from 'express';

const user = require('../controllers/user.controller');
const router = Router();


// Routes go here
router.get('/:id', user.getUser );
router.post('/createUser', user.createUser);
router.put('/updateUser/:id', user.updateUser);
router.delete('/deleteUser', user.deleteUser);


export default router;