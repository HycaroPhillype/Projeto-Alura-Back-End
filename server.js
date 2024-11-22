import express from "express";

const posts = [
  {
    id: 1,
    descricao: "Um gato adorável",
    imagem: "https://picsum.photos/200/300",
  },

  {
    id: 2,
    descricao: "Uma paisagem montanhosa",
    imagem: "https://picsum.photos/200/300",
  },

  {
    id: 3,
    descricao: "Uma foto de comida deliciosa",
    imagem: "https://picsum.photos/200/300",
  },

  {
    id: 4,
    descricao: "Um cachorro brincando no parque",
    imagem: "https://picsum.photos/200/300",
  },

  {
    id: 5,
    descricao: "Uma pintura abstrata",
    imagem: "https://picsum.photos/200/300",
  },
];

const app = express();
app.use(express.json());

app.listen(3000, () => {
  console.log("Servidor escutando...! ");
});

app.get("/posts", (req, res) => {
  res.status(200).json(posts);
});

function buscaPostiId(id) {
  return posts.findIndex((post) => {
    return post.id === Number(id);
  });
}

app.get("/posts/:id", (req, res) => {
  const index = buscaPostiId(req.params.id);
  res.status(200).json(posts[index]);
});
