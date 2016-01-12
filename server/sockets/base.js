module.exports = function (io) {
    'use strict';
    io.on('connection', function (socket) {
        socket.on('message', function (from, msg) {

            // console.log('recieved message from',
            //     from, 'msg', JSON.stringify(msg));

            // console.log('broadcasting message');
            // console.log('messageLoad is', msg);
            io.sockets.emit('broadcast', {
                messageLoad: msg,
                source: from
            });
            console.log('broadcast complete');
        });
    });
};