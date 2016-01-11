module.exports = function (io) {
    'use strict';
    io.on('connection', function (socket) {
        socket.on('message', function (username, msg) {

            console.log('recieved message username',
                username, 'msg', JSON.stringify(msg));

            console.log('broadcasting message');
            console.log('payload is', msg);
            io.sockets.emit('broadcast', {
                payload: msg,
                username: username
            });
            console.log('broadcast complete');
        });
    });
};