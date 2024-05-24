import MessagesRepository from '../repositories/messages.repository.js';

const repository = new MessagesRepository();

class MessagesController {

        async getAll(req, res) {
            console.log('getAll', req);
            try {
                const messages = await repository.getAll();
                res.status(200).render('chat', {messages})
            } catch {
                res.status(500).json({error: 'Error getting messages'})
            }
        }

        async save(req, res) {
            try {
                const saveResult = await repository.save(req.body);
                res.status(201).send(saveResult);
            } catch {
                res.status(500).json({error: 'Error adding message'})
            }
        }
}

export default MessagesController;