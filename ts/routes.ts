import express, { Request, Response } from 'express';
import events from 'events';
import path from 'path';

import connect, { addClient, close, selectAll } from './db';

const router = express.Router();
const myEmissor = new events.EventEmitter();

// Middleware para servir arquivos estáticos
router.use('/styles', express.static(path.join(__dirname, '..', 'templates', 'styles')));
router.use('/js', express.static(path.join(__dirname, '..', 'templates', 'dist')));
router.use('/dependences', express.static(path.join(__dirname, '..', 'templates', 'dependences')));

router.get('/', (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, '..', 'templates', 'index.html'));
});



// User Management
router.get('/users', (req: Request, res: Response) => {
    res.status(404).redirect('/users/add');
})

router.get('/users/add', (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, '..', 'templates', 'addUsers.html'));
});

router.post('/users/add', (req: Request, res: Response) => {
    const params = req.body;
    if (params) {
        const connection = connect(path.join(__dirname, '..', 'db.sqlite'));
        addClient(connection, { name: params.name, age: Number(params.age) });
        close(connection);
    }
    res.redirect('/');
});

router.get('/users/view', (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, '..', 'templates', 'viewUsers.html'));
});

router.get('/users/api', async (req: Request, res: Response) => {
    try {
        const connection = connect(path.join(__dirname, '..', 'db.sqlite'));
        const users = await selectAll(connection, '*', 'client_node'); // Supondo que selectAll é uma função que retorna os usuários do banco de dados
        close(connection);
        res.json({ users });
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).send('Error fetching users');
    }
});



router.get('*', (req: Request, res: Response) => {
    res.send("Path not found!");
});

export default router;
