import  {getTodosPosts, criarPost, atualizarPost}  from "../model/postModel.js";
import fs from "fs";
import gerarDescricaoComGemini from "../services/gemini.Service.js";


export  async function listarPosts(req, res) {
    // Busca todos os posts
    const posts = await getTodosPosts();

    // Envia os posts como resposta JSON com status 200 (OK)
    res.status(200).json(posts);
}

export async function postarNovoPost(req, res) {
    const novoPost = req.body;
    try {
        const postCriado = await criarPost(novoPost);
        res.status(200).json(postCriado);
    } catch(erro) {
        console.error(erro.message);
        res.status(500).json({"Error":"Falha na requisição."});
    }
}

export async function uploadImagem(req, res) {
    const novoPost = {
        descricao: "",
        imgUrl: req.file.originalname,
        alt: ""
    }
    try {
        const postCriado = await criarPost(novoPost);
        const imgAtualizada = `uploads/${postCriado.insertedId}.png`
        fs.renameSync(req.file.path, imgAtualizada);
        res.status(200).json(postCriado);
    } catch(erro) {
        console.error(erro.message);
        res.status(500).json({"Error":"Falha na requisição."});
    }
}

export async function atualizarNovoPost(req, res) {
    const id = req.params.id
    const urlImagem = `http:localhost:3000/${id}.png`
    
    
    try {
      
        const imgBugger = fs.readFileSync(`uploads/${id}.png`)
        const descricao = await gerarDescricaoComGemini(imgBugger)

        const postAtualizado = {
            imgUrl: urlImagem,
            descricao: descricao,
            alt: req.body.alt
        }

        const postCriado = await atualizarPost(id, postAtualizado);
     
        res.status(200).json(postCriado);
    } catch(erro) {
        console.error(erro.message);
        res.status(500).json({"Error":"Falha na requisição."});
    }
}
