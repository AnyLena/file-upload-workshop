import express from "express";
import multer from "multer";
// import uploadRouter from './routes/file-upload.js';

import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const app = express();
const port = 8000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(express.static('data/uploads'))

// app.use(express.json());

app.get("/upload-profile-pic", (req, res) => {
  res.sendFile(path.join(__dirname, "/index.html"));
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "data/uploads");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname + "_" + uniqueSuffix + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage: storage });

app.post(
  "/upload-profile-pic",
  upload.single("profile_pic"),
  function (req, res) {
    console.log(req.file);
    if (!req.file) {
      return res.status(401).send("Please upload a file");
    }
    res.send(`<div><h2>Here's the picture:</h2><img src="/${req.file.filename}"/></div>`)
  }
);

// const cpUpload = upload.fields([{ name: "profile_pic", maxCount: 1 }]);
// app.post("/cool-profile", cpUpload, function (req, res, next) {});


app.listen(port, () => {
  `App listening on port ${port}`;
});
