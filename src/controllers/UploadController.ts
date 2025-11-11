import { Post, Route, Tags, UploadedFile } from "tsoa";
import { BaseController, MsgRes } from "./BaseController";
import fs from 'fs';
import path from 'path';

@Route("/")
@Tags("Upload")
export class FilesController extends BaseController {
    @Post("upload")
    public async uploadFile(
        @UploadedFile('file') file: Express.Multer.File,
    ): Promise<MsgRes> {
        // Always store file in local temp directory
        const tempDir = path.join(__dirname, "../temp");
        if (!fs.existsSync(tempDir)) {
            fs.mkdirSync(tempDir);
        }

        const destinationPath = path.join(tempDir, `${Date.now()}-${file.originalname}`);
        const incomingPath = (file as any)?.path as string | undefined;

        if (incomingPath && fs.existsSync(incomingPath)) {
            fs.copyFileSync(incomingPath, destinationPath);
        } else {
            fs.writeFileSync(destinationPath, file.buffer);
        }

        return this.createRes(`File uploaded successfully as ${path.basename(destinationPath)}`);

    }
}