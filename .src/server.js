import express from 'express'
import {prisma} from "./lib/prisma.ts"
const PORT = 3000

const app = express();
app.use (express.json())

app.post('/escuderias', async (req, res) => {
  try {
    const { nome, nacionalidade } = req.body;
 
    const escuderia = await prisma.escuderia.create({
      data: { nome, nacionalidade }
    });
 
    res.status(200).json(escuderia);
  } catch (error) {
    res.status(500).json("Erro ao cadastrar esuderia");
  }
});
 
app.get('/escuderias', async (req, res) => {
  try {
    const escuderias = await prisma.escuderia.findMany({
    });
 
    res.json(escuderias);
  } catch (error) {
    res.status(500).json("Erro ao listar escuderias");
  }
});
 
app.get('/escuderias/:id/pilotos', async (req, res) => {
  try {
    const { id } = req.params;
 
    const escuderia = await prisma.escuderia.findUnique({
      where: { id: Number(id) },
      include: { pilotos: true }
    });
 
    if (!escuderia) {
      return res.status(404).json("Escuderia não encontrada");
    }
 
    res.json(escuderia.pilotos);
  } catch (error) {
    res.status(500).json("Erro ao listar pilotos da escuderia");
  }
});
 
app.put('/escuderia', async (req, res) => {
  try {
    const { id, nome, nacionalidade } = req.body;
 
    const escuderia = await prisma.escuderia.update({
      where: { id: Number(id) },
      data: { nome, nacionalidade }
    });
 
    res.json(escuderia);
  } catch (error) {
    res.status(500).json("Erro ao atualizar escuderia");
  }
});
 
app.delete('/escuderia/:id', async (req, res) => {
  try {
    const { id } = req.params;
 
    await prisma.escuderia.delete({
      where: { id: Number(id) }
    });
 
    res.status(204).send();
  } catch (error) {
    res.status(500).json("Erro ao deletar escuderia");
  }
});
 
app.post('/pilotos', async (req, res) => {
  try {
    const { nome, numero, escuderiaId } = req.body;
 
    const escuderiaExiste = await prisma.escuderia.findUnique({
      where: { id: Number(escuderiaId) }
    });
 
    if (!escuderiaExiste) {
      return res.status(404).json("Escuderia não encontrada");
    }
 
    const piloto = await prisma.piloto.create({
      data: {
        nome,
        numero,
        escuderiaId: Number(escuderiaId)
      }
    });
 
    res.status(201).json(piloto);
  } catch (error) {
    res.status(500).json("Erro ao cadatrar piloto");
  }
});
 
app.put('/pilotos', async (req, res) => {
  try {
    const { id, nome, numero, escuderiaId } = req.body;
 
    const piloto = await prisma.piloto.update({
      where: { id: Number(id) },
      data: {
        nome,
        numero,
        ...(escuderiaId && { escuderiaId: Number(escuderiaId) })
      }
    });
 
    res.json(piloto);
  } catch (error) {
    res.status(500).json("Erro ao atualizar piloto");
  }
});
 
app.delete('/pilotos/:id', async (req, res) => {
  try {
    const { id } = req.params;
 
    await prisma.piloto.delete({
      where: { id: Number(id) }
    });
 
    res.status(200).send();
  } catch (error) {
    res.status(500).json("Erro ao deleetar piloto");
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta: ${PORT}`);
});

