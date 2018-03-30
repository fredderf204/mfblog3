module.exports = function (grunt) { 
 
    grunt.initConfig({   
        //javascript minification
        uglify: {
            options: {
                drop_console: true
            },
            main: {
                files: [{
                    expand: true,
                    src: ['public/**/*.js'],
                    dest: ''
                }]
            }
        },
        //css minification
        cssmin: {
            target: {
                files: [{
                    expand: true,
                    src: ['public/**/*.css'],
                    dest: ''
                }]
            }
        },
        //html minification
        htmlmin: {
            dist: {                                      
                options: {                                
                    removeComments: true,
                    collapseWhitespace: true,
                    minifyJS: true
                },
                files: [{
                    expand: true,
                    src: ['public/**/*.html'],
                    dest: ''
                }]
            }
        },
        imagemin: {
            png: {
              options: {
                optimizationLevel: 7
              },
              files: [{
                expand: true,
                src: ['public/**/*.png'],
                dest: ''
                }]
            },
            jpg: {
                options: {
                  progressive: false
                },
                files: [{
                    expand: true,
                    src: ['public/**/*.jpeg'],
                    dest: ''
                }]
            }
        } 
    }); 
 
    // Load the plugins 
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-imagemin');

    // Default task(s). 
    grunt.registerTask('default', ['uglify', 'cssmin:target', 'htmlmin:dist', 'imagemin']);

};

