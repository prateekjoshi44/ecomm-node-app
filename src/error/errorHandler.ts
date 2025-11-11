import { ErrorRequestHandler } from "express";
import { ValidateError } from "tsoa";
import { ApiError } from "./ApiError";

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
    // Check if headers have already been sent
    if (res.headersSent) {
        return next(err);
    }

    console.error(req, err);
    
    if (err instanceof ValidateError) {
        let message = "Validation Error"
        if (err?.fields['body']?.message) message = err?.fields['body']?.message
        res.status(422).json({ message, details: err?.fields, });
        return;
    }

    if (err?.code === "P2025" && err?.meta?.cause === "Expected a record, found none.") {
        res.status(404).send({ message: `${err?.meta?.modelName} not found.` });
        return;
    }

    if (err instanceof ApiError) {
        res.status(err.status).send(err.body);
        return
    }

    // Handle multer/busboy errors
    if (err && (err.name === 'MulterError' || err.message?.includes('Unexpected end of form'))) {
        res.status(400).send({ message: 'File upload error', error: err.message || 'Invalid file upload' });
        return;
    }

    if (err) {
        res.status(err.status || 500).send(err);
        return;
    }
    next();
};
