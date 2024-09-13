import express from "express";
const router = express.Router()
router.get('/',(req, res) =>{
    res.send('GET rooms')
})
router.post('/create',(req, res) =>{
    res.send('POST create room')
})
router.get('/:id',(req, res) =>{
    res.send('GET room by id')
})
router.put('/update',(req, res) =>{
    res.send('PUT update room')
})

export default router