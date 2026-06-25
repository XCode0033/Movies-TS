

//Error Shape
export class ApiError extends Error {
    statusCode: number;
    details?: unknown;

    constructor(statusCode:number, message:string, details?: unknown){
        super(message)

        //initialize
        this.statusCode = statusCode;
        this.details = details;

        Error.captureStackTrace(this, this.constructor);
    }
}