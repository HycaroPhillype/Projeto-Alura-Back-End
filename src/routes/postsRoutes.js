import express from "express";
import { listarPosts } from "../controles/postsControles.js";

 const routes = (app) => {
        // Habilita o parsing de JSON no corpo das requisições
    app.use(express.json());
        // Define uma rota GET para "/posts"
    app.get("/posts", listarPosts );
}

export default routes;