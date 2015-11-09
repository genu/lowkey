module.exports = function() {
  return {
    server: {
      src: ['<%= tmp %>/index.html'],
      ignorePath: /\.\.\//
    }
  }
};
