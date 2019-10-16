const express = require('express');

const server = express();

server.use(express.json());

let numberoRequisicoes = 0;
const projetos = [];

const projetoExiste = (req, res, next) => {
  const { id } = req.params;
  const projeto = projetos.find(p => p.id == id);

  const contagemDeRequisicao = (req, res, next) => {
    numberoRequisicoes++;
  
    console.log(`Número de requisições: ${numberoRequisicoes}`);
  
    return next();
  }
  
  server.use(contagemDeRequisicao);

// Rota para chamar todos usuarios

server.get('/projects', (req, res) => {
    return res.json(projetos);
  });

  if (!projeto) {
    return res.status(400).json({ error: 'Projeto não encontrado' });
  }

  return next();
}
  
  //Rota para cadastrar usuarios
  server.post('/projects', projetoExiste, (req, res) => {
    const { id, title } = req.body;
  
    const projeto = {
      id,
      title,
      tasks: []
    };
  
    projetos.push(projeto);
  
    return res.json(projeto);
  });

  // rota para editar usuarios
  
  server.put('/projects/:id',  (req, res) => {
    const { id } = req.params;
    const { title } = req.body;
  
    const projeto = projetos.find(p => p.id == id);
  
    projetos.title = title;
  
    return res.json(projeto);
  });
  
  server.delete('/projects/:id',  (req, res) => {
    const { id } = req.params;
  
    const projectIndex = projetos.findIndex(p => p.id == id);
  
    projetos.splice(projectIndex, 1);
  
    return res.send();
  });
  
  server.post('/projects/:id/tasks', projetoExiste, (req, res) => {
    const { id } = req.params;
    const { title } = req.body;
  
    const projeto = projetos.find(p => p.id == id);
  
    projeto.tasks.push(title);
  
    return res.json(projeto);
  });

server.listen(3002);
