import { Post, Route, UploadedFile } from "tsoa";
import { BaseController } from "./BaseController";

@Route("upload")
export class FilesController extends BaseController {
    @Post("/")
    public async uploadFile(
        @UploadedFile() file: Express.Multer.File
    ): Promise<{ message: string; filename: string; path: string }> {
        return {
            message: "File uploaded successfully",
            filename: file.filename,
            path: file.path,
        };
    }
}