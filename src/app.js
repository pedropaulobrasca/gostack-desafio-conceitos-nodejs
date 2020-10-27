const express = require('express');
const cors = require('cors');

const { v4: uuid } = require('uuid');

const app = express();

app.use(express.json());
app.use(cors());

function midLikeIncrement(request, response, next) {
  const { id } = request.params;

  const repositoryIndex = repositories.findIndex(
    (repository) => repository.id === id
  );

  if (repositoryIndex < 0) {
    return response.status(400).json({ error: 'Invalid repository ID' });
  }

  newLikes = ++repositories[repositoryIndex].likes;

  repositories[repositoryIndex].likes = newLikes;

  return response.json(repositories[repositoryIndex]);
}

const repositories = [];

app.get('/repositories', (request, response) => {
  const data = request.body;
  return response.json(repositories);
});

app.post('/repositories', (request, response) => {
  const { title, url, techs } = request.body;
  let likes = 0;

  const repository = {
    id: uuid(),
    title,
    url,
    techs,
    likes,
  };

  repositories.push(repository);

  return response.json(repository);
});

app.put('/repositories/:id', (request, response) => {
  const { id } = request.params;
  const { title, url, techs } = request.body;

  const repositoryIndex = repositories.findIndex(
    (repository) => repository.id === id
  );

  if (repositoryIndex < 0) {
    return response.status(400).json({ error: 'Invalid repository ID' });
  }

  repositories[repositoryIndex] = {
    id,
    title,
    url,
    techs,
    likes: repositories[repositoryIndex].likes,
  };

  return response.json(repositories[repositoryIndex]);
});

app.delete('/repositories/:id', (request, response) => {
  const { id } = request.params;

  const repositoryIndex = repositories.findIndex(
    (repository) => repository.id === id
  );

  if (repositoryIndex < 0) {
    return response.status(400).json({ error: 'Invalid repository ID' });
  }

  repositories.splice(repositoryIndex, 1);

  return response.status(204).send();
});

app.post('/repositories/:id/like', midLikeIncrement, (request, response) => {
  return response.send('Teste');
});

module.exports = app;
