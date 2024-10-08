import Room from '../models/Room.js'; 

const findById = async (roomId) => {
    return await Room.findById(roomId);
};


export const roomRepository = {
    findById,
};