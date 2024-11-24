import express from "express";
import multer from "multer";
import cors from "cors";
import { listarPosts, postarNovoPost, uploadImagem, atualizarNovoPost } from "../controles/postsControles.js";


const corsOption = {
    origin:"http://localhost:8000",
    optionsSuccessStatus: 200
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
})

const upload = multer({ dest: "./uploads" , storage})

// linux ou mac
//const upload = multer({ dest: "./uploads"})


 const routes = (app) => {
        // Habilita o parsing de JSON no corpo das requisições
    app.use(express.json());
    app.use(cors(corsOption))
        // Define uma rota GET para "/posts"
    app.get("/posts", listarPosts );
        // Rota para criar um post
    app.post("/posts", postarNovoPost)

    app.post("/upload", upload.single("imagem"), uploadImagem)

    app.put("/upload/:id", atualizarNovoPost )
}

export default routes;