import conectarAoBanco from "../config/dbConfig.js";


// Conecta ao banco de dados usando a string de conexão do ambiente
const conexao = await conectarAoBanco(process.env.STRING_CONEXAO);

export default async function getTodosPosts() {
    // Seleciona o banco de dados "Projeto-Back-End-Alura"
    const db = conexao.db("Projeto-Back-End-Alura");
  
    // Seleciona a coleção "posts"
    const colecao = db.collection("posts");
  
    // Busca todos os documentos da coleção e retorna como um array
    return colecao.find().toArray();
}
  