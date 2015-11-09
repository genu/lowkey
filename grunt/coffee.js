module.exports = function() {
  return {
    options: {
      sourceMap: true,
      sourceRoot: '',
      bare: true
    },
    server: {
      files: [{
        expand: true,
        cwd: '<%= src %>',
        src: [
          '**/*.coffee',
          '!**/*.spec.coffee'
        ],
        dest: '<%= tmp %>',
        ext: '.js'
      }]
    }
  }
};
