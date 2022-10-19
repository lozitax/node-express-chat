const sMessage = require('../models/message');

module.exports = function(io) {
    io.on('connection', (socket) => {
        io.emit('notification', { type: 'connected', data: socket.id });

        socket.on('disconnect', () => {
            io.emit('notification', { type: 'disconnected', data: socket.id });
        });

        socket.on('message-send', (msg) => {
            const message = new sMessage({
                userId: msg.userId,
                message: msg.message,
                date: new Date(),
            });

            message.save();

            io.emit('new-message', message);
        });
    })
}