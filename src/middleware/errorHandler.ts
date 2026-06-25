import { ApiError } from "../utils/ApiError";

import { ErrorRequestHandler } from "express";


export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
    console.error(err.stack)


    if(err instanceof ApiError ) {
        return res.status(err.statusCode).json({
            message: err.message,
            statusCode:err.statusCode,
            details: err.details
        })
    }else {
        res.status(500).json({message: 'Internal Server Error.'})
    }
}