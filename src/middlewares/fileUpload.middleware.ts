import { Request, Response, NextFunction } from 'express';
import formidable from 'formidable';
import ErrorLib from "../libs/Error.Lib";

export const uploadFileMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const form = formidable({ multiples: false });

    form.parse(req, (err, fields, files) => {
        if (err) {
            throw new ErrorLib('Error parsing file data', 400)
        }

        // Retrieve the file from the Formidable parsed files
        const file: any = Array.isArray(files['file']) ? files['file'][0] : files['file'];

        if (!file) {
            throw new ErrorLib('No file uploaded', 400)
        }

        // Attach the parsed form data to the request object
        req.file = file; // Attach uploaded file
        next();
    });
};
