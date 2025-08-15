import ApiError from "../exceptions/api-error.js";

export const errorHandler = (err, req, res, next) => {
    console.log(err);
    if(err instanceof ApiError) {
        return res.status(err.status).json({message: err.message});
    }

    return res.status(500).json({message: err.message});
}