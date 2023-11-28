
const express = require('express');
const axios = require('axios');
const app = express();
const PORT = process.env.PORT || 3000;
const API_KEY = 'http://api.football-data.org/v4/competitions/'; 

app.use(express.json());

app.get('/resultados', async (req, res) => {
  try {
    const response = await axios.get('http://api.football-data.org/v4/competitions/', {
      headers: {
        'X-Auth-Token': API_KEY,
      },
    });

    const resultados = response.data.matches.map(match => ({
      homeTeam: match.homeTeam.name,
      awayTeam: match.awayTeam.name,
      score: `${match.score.fullTime.homeTeam} - ${match.score.fullTime.awayTeam}`,
    }));

    res.json(resultados);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao obter resultados de jogos.' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
