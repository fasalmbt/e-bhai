import user from "../models/user.js"

export const updateUser = async (req, res, next) => {
    try {
        const updatedUser = await user.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );
        res.status(200).json(updatedUser);
    } catch (err) {
        next(err);
    }
}