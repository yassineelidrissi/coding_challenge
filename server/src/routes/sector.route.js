import express from 'express';

const router = express.Router();

import { getAllSectors } from './../controllers/sector.controller.js';

router.get('/sectors', getAllSectors);

export default router;