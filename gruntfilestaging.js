module.exports = function (grunt) { 
 
    grunt.initConfig({   
        clean: { 
            //delete last backup  
            backup: {  
                src: ['backup/*'] 
            }, 
            //delete public folder 
            public: { 
                src: ['public'] 
            } 
        }, 
        //create backup 
        copy: { 
            backup: { 
                expand: true, 
                src: ['**', '!backup', '!**/node_modules/**'], 
                dest: 'backup/backup-<%=grunt.template.today("yyyy-mm-dd-hh-mm")%>/' 
            } 
        }, 
        //generate hugo public folder 
        exec: { 
            hugobuild: { 
                command: 'hugo' 
            } 
        }, 
        //string replace bad links 
        'string-replace': { 
            badlinks : { 
                files : { 
                    'public/' : 'public/*.html', 
                    'public/page/' : 'public/page/*.html', 
                    'public/tags/' : 'public/tags/*.html', 
                    'public/2017/01/02/' : 'public/2017/01/02/*.html', 
                    'public/2017/01/11/' : 'public/2017/01/11/*.html' 
                }, 
                options: { 
                    replacements: [{ 
                        //baseurl
                        pattern: '<a href="http:\/\/mfblog3.blob.core.windows.net\/staging\/"', 
                        replacement: '<a href="http://mfblog3.blob.core.windows.net/staging/index.html"' 
                    }, 
                    { 
                        //scripts (add async)
                        pattern: '<script src="http:\/\/mfblog3.blob.core.windows.net\/staging\/fancybox\/jquery.fancybox.pack.js"><\/script>', 
                        replacement: '<script src="http://mfblog3.blob.core.windows.net/staging/fancybox/jquery.fancybox.pack.js" async></script>' 
                    }, 
                    { 
                        pattern: '<script src="http:\/\/mfblog3.blob.core.windows.net\/staging\/js\/script.js"><\/script>', 
                        replacement: '<script src="http://mfblog3.blob.core.windows.net/staging/js/script.js" async></script>' 
                    }, 
                    { 
                        pattern: '<script src="https:\/\/cdnjs.cloudflare.com\/ajax\/libs\/highlight.js\/8.8.0\/highlight.min.js"><\/script>', 
                        replacement: '<script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/8.8.0/highlight.min.js" async></script>' 
                    }, 
                    { 
                        pattern: '<script src="https:\/\/cdn.mathjax.org\/mathjax\/latest\/MathJax.js?config=TeX-AMS-MML_HTMLorMML"><\/script>', 
                        replacement: '<script src="https://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS-MML_HTMLorMML" async></script>' 
                    }, 
                    { 
                        //blog articles
                        pattern: '<a href="http:\/\/mfblog3.blob.core.windows.net\/staging\/2017\/01\/02\/starting-a-blog"', 
                        replacement: '<a href="http://mfblog3.blob.core.windows.net/staging/2017/01/02/starting-a-blog.html"' 
                    },
                    {
                        pattern: '[\s\w<]+href="(http:\/\/mfblog3.blob.core.windows.net\/staging\/2017\/01\/11\/jenkins-on-azure-app-service)"[\s\w="<>\/]+',
                        replacement: 'http://mfblog3.blob.core.windows.net/staging/2017/01/11/jenkins-on-azure-app-service.html'
                    },
                    //{
                        //pattern: '<a href="http:\/\/mfblog3.blob.core.windows.net\/staging\/2017\/01\/11\/jenkins-on-azure-app-service">',
                        //replacement: '<a href="http://mfblog3.blob.core.windows.net/staging/2017/01/11/jenkins-on-azure-app-service.html">'
                    //},
                    {
                        //tags
                        pattern: 'href="http:\/\/mfblog3.blob.core.windows.net\/staging\/tags\/app-service"',
                        replacement: 'href="http://mfblog3.blob.core.windows.net/staging/tags/app-service.html"'
                    },
                    {
                        pattern: 'href="http:\/\/mfblog3.blob.core.windows.net\/staging\/tags\/azure"',
                        replacement: 'href="http://mfblog3.blob.core.windows.net/staging/tags/azure.html"'
                    },
                    {
                        pattern: 'href="http:\/\/mfblog3.blob.core.windows.net\/staging\/tags\/jenkins"',
                        replacement: 'href="http://mfblog3.blob.core.windows.net/staging/tags/jenkins.html"'
                    } 
                    ] 
                } 
            } 
        } 
    }); 
 
    // Load the plugins 
    grunt.loadNpmTasks('grunt-contrib-clean'); 
    grunt.loadNpmTasks('grunt-contrib-copy'); 
    grunt.loadNpmTasks('grunt-exec'); 
    //grunt.loadNpmTasks('grunt-processhtml') 
    grunt.loadNpmTasks('grunt-string-replace'); 
 
    // Default task(s). 
    grunt.registerTask('default', ['copy:backup', 'clean:public', 'exec:hugobuild', 'string-replace:badlinks']); 
 
}; 

