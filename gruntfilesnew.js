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
        } 
    }); 
 
    // Load the plugins 
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
 
    // Default task(s). 
    grunt.registerTask('default', ['uglify', 'cssmin:target', 'htmlmin:dist']);
 
}; 

