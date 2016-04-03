module.exports = function(grunt) {
  require('jit-grunt')(grunt);
  grunt.loadNpmTasks('grunt-bower-concat');

  grunt.initConfig({
    less: {
      development: {
        options: {
          compress: true,
          yuicompress: true,
          optimization: 2
        },
        files: {
          "public/stylesheets/style.css": "assets/stylesheets/main.less"
        }
      }
    },
    watch: {
      styles: {
        files: ['assets/stylesheets/*.less', 'assets/stylesheets/*/*.less'],
        tasks: ['less'],
        options: {
          nospawn: true
        }
      }
    },
    bower_concat: {
      all: {
        dest: 'public/javascripts/bower.js'
      }
    },
    uglify: {
      bower: {
        options: {
          mangle: true,
          compress: true
        },
        files: {
          'public/javascripts/bower.min.js': 'public/javascripts/bower.js'
        }
      }
    }

  });

  grunt.registerTask('default', ['less', 'watch']);
  grunt.registerTask('buildbower', ['bower_concat', 'uglify:bower']);
};