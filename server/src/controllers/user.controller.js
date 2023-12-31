import User from "../models/user.model.js";

const createUserData = async (req, res, next) => {
    try {
        const name = req.body.name;
        const sectors = req.body.sectors;

        const user = await User.create({ name, sectors });

        res.status(201).json(user);
    } catch (error) {
        res.status(500).send(error);
    }
}

const getUsersData = async (req, res, next) => {
    try {
        const usersData = await User.find().populate('sectors');

        if(!usersData) res.status(404).json({
            message: 'No users found !'
        });

        res.status(200).json(usersData);

    } catch (error) {
        res.status(500).send(error);
    }
}

const getUserDataById = async (req, res, next) => {
    try {
        const id = req.params.id;
        const user = await User.findById(id).populate('sectors');

        if(!user) return res.status(404).json({
            message: 'No users found !'
        });

        res.status(200).json(user);

    } catch (error) {
        res.status(500).send(error);
    }
}

const editUserData = async (req, res, next) => {
    try {
        const userId = req.params.id;
        const name = req.body.name;
        const sectors = req.body.sectors;

        const user = await User.findById(userId);

        if(user) {
            user.name = name || user.name;
            user.sectors = sectors || user.sectors;

            const updatedUserData = await user.save();

            res.status(200).json(updatedUserData);

        } else {
            res.status(404).json({
                status: "Fail",
                message: "Product Not Found !!"
            });
        }
        
    } catch (error) {
        res.status(500).send('Error updating user: ' + error.message);
    }
}

const deleteUserData = async (req, res, next) => {
    try {
        const userId = req.params.id;
    
        const deletedUser = await User.findByIdAndDelete(userId);
        
        if (!deletedUser) {
          return res.status(404).send('User not found');
        }
    
        res.send('User deleted successfully');
    } catch (error) {
        res.status(500).send('Error deleting user: ' + error.message);
    }
}

export {
    createUserData,
    getUsersData,
    editUserData,
    deleteUserData,
    getUserDataById
}