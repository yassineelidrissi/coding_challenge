import Sector from "../models/sector.model.js";

const getAllSectors = async (req, res, next) => {
    try {
        const sectors = await Sector.find();
        res.json(sectors);
    } catch (error) {
        res.status(500).send(error);
    }
}

export {
    getAllSectors
}
  