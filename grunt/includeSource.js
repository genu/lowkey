module.exports = function() {
  return {
    options: {
      basePath: '<%= tmp %>',
      templates: {
        html: {
          js: '<script src="{filePath}"></script>',
          css: '<link rel="stylesheet" href="{filePath}"/>'
        }
      }
    },
    server: {
      files: {
        '<%= tmp %>/index.html': '<%= src %>/index.tpl.html'
      }
    }
  }
};
