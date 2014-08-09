module.exports = function(grunt) {

    grunt.initConfig({
        bower_concat: {
          all: {
            dest: 'app/static/js/app.js',
            include: [
              'modernizer'
            ],
            bowerOptions: {
              relative: false
            }
          }
        },

        jshint: {
            all: ['Gruntfile.js', 'app/**/*.js']
        },

        express: {
            dev: {
                options: {
                    script: './server.js'
                }
            },
        },

        watch: {
            express: {
                files: ['app/**/*.js'],
                tasks: ['jshint', 'express:dev'],
                options: {
                  spawn: false,
                },
            },
        },

    
    });

    grunt.registerTask('compile', ['jshint']);

    grunt.registerTask('serve', [
        'compile', 
        'express:dev', 
        'watch'
    ]);

    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.loadNpmTasks('grunt-contrib-jshint');

    grunt.loadNpmTasks('grunt-express-server');

    grunt.loadNpmTasks('grunt-env');

};
