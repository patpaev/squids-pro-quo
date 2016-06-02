module.exports = function (grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    jshint: {
      files: ['Gruntfile.js', 'src/**/*.js'],
      options: {
        // options here to override JSHint defaults
        globals: {
          jQuery: false,
          console: true,
          module: true,
          document: true
        }
      }
    },

    concat: {
      css: {
        src: ['src/css/*.css'],
        dest: 'dist/style.css'
      },
      js: {
        src: ['src/js/*.js'],
        dest: 'dist/script.js'
      }
    },

    uglify: {
      dist: {
        files: {
          'dist/script.min.js': ['<%= concat.js.dest %>']
        }
      }
    },

    cssmin: {
      target: {
        files: [{
          expand: true,
          cwd: 'dist',
          src: ['style.css', '!*.min.css'],
          dest: 'dist',
          ext: '.min.css'
        }]
      }
    },

    clean: {
      js: ['dist/*', '!dist/<%= pkg.name %>*', '!dist/latest*']
    }

  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-clean');

  grunt.registerTask('outputInjection', 'Outputs the final injection code to a file', function () {
    style = injectStyleIntoDocument( grunt.file.read('dist/style.min.css') );
    script = injectScriptIntoDocument( grunt.file.read('dist/script.min.js') );
    filecontents = '';
    filecontents += style;
    filecontents += script;
    filename = 'dist/' + grunt.config('pkg.name') + '-v' + grunt.config('pkg.version') + '.js';
    grunt.log.writeln('writing file: ', filename);
    grunt.file.write(filename, filecontents);
    grunt.file.write('dist/latest.js', filecontents);
  });

  grunt.registerTask('default', ['jshint', 'concat', 'uglify', 'cssmin', 'outputInjection', 'clean']);

  function injectScriptIntoDocument ( code ) {
    /*jshint multistr: true */
    return ( "window.SQPloadInjection = function() { \
'use strict'; \
" + code + " \
}; \
if (window.attachEvent) { \
  window.attachEvent('onload', window.SQPloadInjection); \
} else { \
  document.addEventListener('DOMContentLoaded', window.SQPloadInjection, false); \
  document.addEventListener('page:load', window.SQPloadInjection, false); \
  document.addEventListener('page:restore', window.SQPloadInjection, false); \
}");
  }

  function injectStyleIntoDocument ( code ) {
    /*jshint multistr: true */
    return ( "\
var css = document.createElement('style'); \
css.type = 'text/css'; \
css.innerHTML = '" + code + "'; \
document.body.appendChild(css);" );
  }

};