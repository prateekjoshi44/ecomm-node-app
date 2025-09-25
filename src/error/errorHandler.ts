import { ErrorRequestHandler } from "express";
import { ValidateError } from "tsoa";
import { ApiError } from "./ApiError";

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
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

    if (err) {
        res.status(err.status || 500).send(err);
        return;
    }
    next();
};
