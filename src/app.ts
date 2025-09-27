// src/app.ts
import express, { json, urlencoded, Response as ExResponse, Request as ExRequest } from "express";
import swaggerUi from "swagger-ui-express";
import { RegisterRoutes } from "../build/routes";
import * as swaggerDocument from "../build/swagger.json";
import { errorHandler } from "./error/errorHandler";
import { webhookMiddleware } from "./middlewares/clerkWebhook";
import { upload } from "./middlewares/upload";



export const app = express();
// const router = express.Router();

// Use body parser to read sent json payloads
app.use(
    urlencoded({
        extended: true,
    })
);

app.post("/upload", upload.single("file"), (_req, _res, _next) => {
    console.log(_req.file)
    _res.json({ file: _req.file });
    // next(); // hand over to tsoa controller
});

app.use(json());

(swaggerDocument as any).info.title = "Ecommerce API Docs";
(swaggerDocument as any).info.description = "API documentation for the Ecommerce application.";

app.use("/docs", swaggerUi.serve, async (_req: ExRequest, res: ExResponse) => {
    const html = swaggerUi.generateHTML(swaggerDocument, {
        customSiteTitle: "Ecomm API Docs",
    });
    res.send(html);
});

app.post('/api/webhooks', express.raw({ type: 'application/json' }), webhookMiddleware)


RegisterRoutes(app);

app.use(errorHandler);