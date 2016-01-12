module.exports = function (io) {
  'use strict';
  io.on('connection', function (socket) {
    socket.on('message', function (from, msg) {
        io.sockets.emit('broadcast', {
          messageLoad: msg,
          source: from
      });
    });
  });
};