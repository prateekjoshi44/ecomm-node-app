import { Post, Route, Tags, UploadedFile } from "tsoa";
import { BaseController, MsgRes } from "./BaseController";
import fs from 'fs';
import path from 'path';
import { imagekit } from "../config/imagekit";


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

        const filePath = destinationPath
        const fileBuffer = fs.readFileSync(filePath);
        const base64 = fileBuffer.toString('base64');
        const result = await imagekit.upload({
            file: base64,
            fileName: `${Date.now()}-${file.originalname}`,
            folder: '/ecomm-assets/images'
        });
        console.log("File uploaded:", result.url);
        if (!result) return this.internalServerRes('Something Went wrong while uploading Image')
        return this.createRes(`${result.url}`);


    }
}