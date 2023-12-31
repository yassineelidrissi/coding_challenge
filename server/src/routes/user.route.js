import express from 'express';

const router = express.Router();

import { createUserData, getUsersData, editUserData, deleteUserData, getUserDataById } from './../controllers/user.controller.js';

router.get('/usersData', getUsersData);

router.get('/usersData/:id', getUserDataById);

router.post('/usersData/create', createUserData);

router.put('/usersData/:id', editUserData);

router.delete('/usersData/:id', deleteUserData);

export default router;