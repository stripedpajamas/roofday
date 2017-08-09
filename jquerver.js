module.exports = {
  jquerate: (server, $) => {
    const oldEmit = server.emit;
    function emit(type, ...data) {
      $(server).trigger(type, data);
      oldEmit.apply(server, [type, ...data]);
    };

    server.emit = emit;    
  }
};
