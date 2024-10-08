import express from 'express';
import messageController from '../src/controller/message.js';

const router = express.Router();

router.get('/', messageController.getAllMessages);

router.get('/:id', messageController.getMessageById);

router.post('/create', messageController.createMessage);

router.put('/update/:id', messageController.updateMessage);

router.delete('/delete/:id', messageController.deleteMessage);

export default router;