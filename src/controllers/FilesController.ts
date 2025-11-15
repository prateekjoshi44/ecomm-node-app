import { FormField, Post, Route, Tags, UploadedFile } from "tsoa";
import { BaseController, MsgRes } from "./BaseController";
import fs from 'fs';
import path from 'path';
import { imagekit } from "../config/imagekit";
import { prisma } from "../../prisma/prisma";


@Route("/")
@Tags("Upload")
export class FilesController extends BaseController {
    @Post("upload")
    public async uploadFile(
        @UploadedFile('file') file: Express.Multer.File,
        @FormField() id: string,
        @FormField() type: 'USER' | 'PRODUCT',
    ): Promise<MsgRes | any> {
        // Always store file in local temp directory
        // const { type, id } = body;
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
        let uploadRes;
        switch (type) {
            case "USER":
                uploadRes = await prisma.upload.create({
                    data: { url: result.url, userId: id },
                });
                break;
            case "PRODUCT":
                uploadRes = await prisma.upload.create({
                    data: { url: result.url, productId: id },
                });
                break;
            default:
                return this.badRequestRes("Invalid upload type");
        }
        if (!uploadRes) return this.badRequestRes("Something went wrong")
        return uploadRes


    }
}