// import http from "../http-common";

// const upload = (file: File, onUploadProgress: any): Promise<any> => {
//   let formData = new FormData();

//   formData.append("file", file);

//   return http.post("/upload", formData, {
//     headers: {
//       "Content-Type": "multipart/form-data",
//     },
//     onUploadProgress,
//   });
// };

// const getFiles = () : Promise<any> => {
//   return http.get("/files");
// };

// const FileUploadService = {
//   upload,
//   getFiles,
// };

// export default FileUploadService;
// import express, { Request, Response } from 'express';
// import multer from 'multer';
// const app = express();
// const upload = multer({ dest: 'uploads/' });
// app.post('/upload', upload.array('files', 10), (req: Request, res: Response) => {
//     // Handle the uploaded files here
//     console.log(req.files);
//     res.send('Files uploaded successfully');
//   });
import multer from 'multer';
import { Request } from 'express';
import path from 'path';

const storage = multer.diskStorage({
  destination: './upload',
  filename: (req: Request, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const extension = path.extname(file.originalname);
    const filename = file.fieldname + '-' + uniqueSuffix + extension;
    cb(null, filename);
  },
});

const upload = multer({ storage });

export const imageHandler = (req, res, next) => {
  upload.fields([
    { name: 'path', maxCount: 1 },
    { name: 'profile_url', maxCount: 1 },
  ])(req, res, err => {
    if (err) {
      // Handle the error
      return res.status(400).json({ error: 'File upload failed' });
    }
    next();
  });
};


