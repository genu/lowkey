module.exports = function() {
  return {
    compile: {
      options: {
        data: {
          debug: false
        }
      },
      files: [{
        expand: true,
        cwd: '<%= src %>',
        src: [
          '**/*.jade'
        ],
        dest: '<%= tmp %>',
        rename: function(dest, src) {
          path = src.split('/');
          path.unshift(dest);
          path[path.length - 1] = path[path.length - 1].replace(/\.[^/.]+$/, "");
          return path.join('/') + '.html';
        }
      }]
    }
  }
};
