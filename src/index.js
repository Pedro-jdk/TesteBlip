const express = require('express');
const axios = require('axios');

const app = express();
const PORT = 3000;

app.get('/repos', async (req, res) => {
    try {
        const response = await axios.get('https://api.github.com/orgs/takenet/repos');
        const repos = response.data.filter(repo => repo.language === 'C#');

        repos.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));

        const oldestRepos = repos.slice(0, 5).map(repo => ({
            name: repo.name,
            url: repo.html_url,
            created_at: repo.created_at,
            description: repo.description,
        }));

        res.json(oldestRepos);
    } catch (error) {
        console.error(error);
        res.status(500).send('Erro ao buscar repositórios');
    }
});

app.listen(PORT, () => {
    console.log(`API rodando na porta ${PORT}`);
});
