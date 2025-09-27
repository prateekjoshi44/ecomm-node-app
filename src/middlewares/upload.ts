import multer from "multer";
import path from "path";
import fs from "fs";

const tempDir = path.join(__dirname, "../temp");

if (!fs.existsSync(tempDir)) {
    fs.mkdirSync(tempDir);
}

export const upload = multer({
    storage: multer.diskStorage({
        destination: (_req, _file, cb) => {
            cb(null, tempDir);
        },
        filename: (_req, file, cb) => {
            cb(null, `${Date.now()}-${file.originalname}`);
        },
    }),
});
