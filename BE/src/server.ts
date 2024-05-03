import bodyParser from 'body-parser';
import csvdb from  'csv-database';
import express from 'express';
import { Request, Response } from 'express'; // Add this line

const app = express();
const port = 3001;

app.use(bodyParser.json());

const tiresDB = await csvdb('./data/tires.csv', ['id', 'brand', 'model', 'size'],",");
const ownersDB = await csvdb('./data/owners.csv', ['id', 'name', 'email'],",");

app.get('/tires', async (req: Request , res : Response) => {
    const tires = await tiresDB.get();
    res.json(tires);
});

app.post('/tires', async (req: Request, res : Response) => {
    const newTire = req.body;
    await tiresDB.add(newTire);
    res.json(newTire);
});

app.put('/tires/:id', async (req: Request, res : Response) => {
    const { id } = req.params;
    const updatedTire = req.body;
    await tiresDB.edit({ id }, updatedTire);
    res.json(updatedTire);
});

app.delete('/tires/:id', async (req: Request, res : Response) => {
    const { id } = req.params;
    await tiresDB.delete({ id });
    res.send('Tire deleted successfully');
});

app.get('/owners', async (req: Request, res : Response) => {
    const owners = await ownersDB.get();
    res.json(owners);
});

app.post('/owners', async (req: Request, res : Response) => {
    const newOwner = req.body;
    await ownersDB.add(newOwner);
    res.json(newOwner);
});

app.put('/owners/:id', async (req: Request, res : Response) => {
    const { id } = req.params;
    const updatedOwner = req.body;
    await ownersDB.edit({ id }, updatedOwner);
    res.json(updatedOwner);
});

app.delete('/owners/:id', async (req: Request, res : Response) => {
    const { id } = req.params;
    await ownersDB.delete({ id });
    res.send('Owner deleted successfully');
});

app.listen(port, () => {
    console.log(`Tire server is running on http://localhost:${port}`);
});