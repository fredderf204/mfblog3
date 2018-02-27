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
        //string replace bad links 
        'string-replace': {
            badlinks: {
                files: {
                    'public/': 'public/*.html',
                    'public/page/': 'public/page/*.html',
                    'public/tags/': 'public/tags/*.html',
                    'public/2017/01/02/': 'public/2017/01/02/*.html',
                    'public/2017/01/11/': 'public/2017/01/11/*.html',
                    'public/2017/01/21/': 'public/2017/01/21/*.html',
                    'public/2017/02/09/': 'public/2017/02/09/*.html',
                    'public/2017/02/13/': 'public/2017/02/13/*.html',
                    'public/2017/02/23/': 'public/2017/02/23/*.html',
                    'public/2017/05/01/': 'public/2017/05/01/*.html',
                    'public/2017/05/30/': 'public/2017/05/30/*.html',
                    'public/2018/02/27/': 'public/2018/02/27/*.html'
                },
                options: {
                    replacements: [{
                        //baseurl
                        pattern: '<a href="http:\/\/mfblog3.blob.core.windows.net\/staging\/"',
                        replacement: '<a href="http://mfblog3.blob.core.windows.net/staging/index.html"'
                    },
                    {
                        //Posts 
                        //starting-a-blog
                        pattern: 'href="http:\/\/mfblog3.blob.core.windows.net\/staging\/2017\/01\/02\/starting-a-blog"',
                        replacement: 'href="http://mfblog3.blob.core.windows.net/staging/2017/01/02/starting-a-blog.html"'
                    },
                    {
                        pattern: 'href="http:\/\/mfblog3.blob.core.windows.net\/staging\/2017\/01\/02\/starting-a-blog"',
                        replacement: 'href="http://mfblog3.blob.core.windows.net/staging/2017/01/02/starting-a-blog.html"'
                    },
                    {
                        pattern: 'href="http:\/\/mfblog3.blob.core.windows.net\/staging\/2017\/01\/02\/starting-a-blog"',
                        replacement: 'href="http://mfblog3.blob.core.windows.net/staging/2017/01/02/starting-a-blog.html"'
                    },
                    {
                        pattern: 'href="http:\/\/mfblog3.blob.core.windows.net\/staging\/2017\/01\/02\/starting-a-blog"',
                        replacement: 'href="http://mfblog3.blob.core.windows.net/staging/2017/01/02/starting-a-blog.html"'
                    },
                    {
                        pattern: 'href="http:\/\/mfblog3.blob.core.windows.net\/staging\/2017\/01\/02\/starting-a-blog"',
                        replacement: 'href="http://mfblog3.blob.core.windows.net/staging/2017/01/02/starting-a-blog.html"'
                    },
                    {
                        //jenkins-on-azure-app-service
                        pattern: 'href="http:\/\/mfblog3.blob.core.windows.net\/staging\/2017\/01\/11\/jenkins-on-azure-app-service"',
                        replacement: 'href="http://mfblog3.blob.core.windows.net/staging/2017/01/11/jenkins-on-azure-app-service.html"'
                    },
                    {
                        pattern: 'href="http:\/\/mfblog3.blob.core.windows.net\/staging\/2017\/01\/11\/jenkins-on-azure-app-service"',
                        replacement: 'href="http://mfblog3.blob.core.windows.net/staging/2017/01/11/jenkins-on-azure-app-service.html"'
                    },
                    {
                        pattern: 'href="http:\/\/mfblog3.blob.core.windows.net\/staging\/2017\/01\/11\/jenkins-on-azure-app-service"',
                        replacement: 'href="http://mfblog3.blob.core.windows.net/staging/2017/01/11/jenkins-on-azure-app-service.html"'
                    },
                    {
                        pattern: 'href="http:\/\/mfblog3.blob.core.windows.net\/staging\/2017\/01\/11\/jenkins-on-azure-app-service"',
                        replacement: 'href="http://mfblog3.blob.core.windows.net/staging/2017/01/11/jenkins-on-azure-app-service.html"'
                    },
                    {
                        pattern: 'href="http:\/\/mfblog3.blob.core.windows.net\/staging\/2017\/01\/11\/jenkins-on-azure-app-service"',
                        replacement: 'href="http://mfblog3.blob.core.windows.net/staging/2017/01/11/jenkins-on-azure-app-service.html"'
                    },
                    {
                        //hugo-in-azure-blog-storage
                        pattern: 'href="http:\/\/mfblog3.blob.core.windows.net\/staging\/2017\/01\/21\/hugo-in-azure-blob-storage"',
                        replacement: 'href="http://mfblog3.blob.core.windows.net/staging/2017/01/21/hugo-in-azure-blob-storage.html"'
                    },
                    {
                        pattern: 'href="http:\/\/mfblog3.blob.core.windows.net\/staging\/2017\/01\/21\/hugo-in-azure-blob-storage"',
                        replacement: 'href="http://mfblog3.blob.core.windows.net/staging/2017/01/21/hugo-in-azure-blob-storage.html"'
                    },
                    {
                        pattern: 'href="http:\/\/mfblog3.blob.core.windows.net\/staging\/2017\/01\/21\/hugo-in-azure-blob-storage"',
                        replacement: 'href="http://mfblog3.blob.core.windows.net/staging/2017/01/21/hugo-in-azure-blob-storage.html"'
                    },
                    {
                        pattern: 'href="http:\/\/mfblog3.blob.core.windows.net\/staging\/2017\/01\/21\/hugo-in-azure-blob-storage"',
                        replacement: 'href="http://mfblog3.blob.core.windows.net/staging/2017/01/21/hugo-in-azure-blob-storage.html"'
                    },
                    {
                        pattern: 'href="http:\/\/mfblog3.blob.core.windows.net\/staging\/2017\/01\/21\/hugo-in-azure-blob-storage"',
                        replacement: 'href="http://mfblog3.blob.core.windows.net/staging/2017/01/21/hugo-in-azure-blob-storage.html"'
                    },
                    {
                        //microsoft-ignite-next-week
                        pattern: 'href="http:\/\/mfblog3.blob.core.windows.net\/staging\/2017\/02\/09\/microsoft-ignite-next-week"',
                        replacement: 'href="http:\/\/mfblog3.blob.core.windows.net\/staging\/2017\/02\/09\/microsoft-ignite-next-week.html"'
                    },
                    {
                        pattern: 'href="http:\/\/mfblog3.blob.core.windows.net\/staging\/2017\/02\/09\/microsoft-ignite-next-week"',
                        replacement: 'href="http:\/\/mfblog3.blob.core.windows.net\/staging\/2017\/02\/09\/microsoft-ignite-next-week.html"'
                    },
                    {
                        pattern: 'href="http:\/\/mfblog3.blob.core.windows.net\/staging\/2017\/02\/09\/microsoft-ignite-next-week"',
                        replacement: 'href="http:\/\/mfblog3.blob.core.windows.net\/staging\/2017\/02\/09\/microsoft-ignite-next-week.html"'
                    },
                    {
                        pattern: 'href="http:\/\/mfblog3.blob.core.windows.net\/staging\/2017\/02\/09\/microsoft-ignite-next-week"',
                        replacement: 'href="http:\/\/mfblog3.blob.core.windows.net\/staging\/2017\/02\/09\/microsoft-ignite-next-week.html"'
                    },
                    {
                        pattern: 'href="http:\/\/mfblog3.blob.core.windows.net\/staging\/2017\/02\/09\/microsoft-ignite-next-week"',
                        replacement: 'href="http:\/\/mfblog3.blob.core.windows.net\/staging\/2017\/02\/09\/microsoft-ignite-next-week.html"'
                    },
                    {
                        //live-demo
                        pattern: 'href="http:\/\/mfblog3.blob.core.windows.net\/staging\/2017\/02\/13\/live-demo"',
                        replacement: 'href="http:\/\/mfblog3.blob.core.windows.net\/staging\/2017\/02\/13\/live-demo.html"'
                    },
                    {
                        pattern: 'href="http:\/\/mfblog3.blob.core.windows.net\/staging\/2017\/02\/13\/live-demo"',
                        replacement: 'href="http:\/\/mfblog3.blob.core.windows.net\/staging\/2017\/02\/13\/live-demo.html"'
                    },
                    {
                        pattern: 'href="http:\/\/mfblog3.blob.core.windows.net\/staging\/2017\/02\/13\/live-demo"',
                        replacement: 'href="http:\/\/mfblog3.blob.core.windows.net\/staging\/2017\/02\/13\/live-demo.html"'
                    },
                    {
                        pattern: 'href="http:\/\/mfblog3.blob.core.windows.net\/staging\/2017\/02\/13\/live-demo"',
                        replacement: 'href="http:\/\/mfblog3.blob.core.windows.net\/staging\/2017\/02\/13\/live-demo.html"'
                    },
                    {
                        pattern: 'href="http:\/\/mfblog3.blob.core.windows.net\/staging\/2017\/02\/13\/live-demo"',
                        replacement: 'href="http:\/\/mfblog3.blob.core.windows.net\/staging\/2017\/02\/13\/live-demo.html"'
                    },
                    {
                        //ignite wrapup
                        pattern: 'href="http:\/\/mfblog3.blob.core.windows.net\/staging\/2017\/02\/23\/ignite-wrap-up"',
                        replacement: 'href="http:\/\/mfblog3.blob.core.windows.net\/staging\/2017\/02\/23\/ignite-wrap-up.html"'
                    },
                    {
                        pattern: 'href="http:\/\/mfblog3.blob.core.windows.net\/staging\/2017\/02\/23\/ignite-wrap-up"',
                        replacement: 'href="http:\/\/mfblog3.blob.core.windows.net\/staging\/2017\/02\/23\/ignite-wrap-up.html"'
                    },
                    {
                        pattern: 'href="http:\/\/mfblog3.blob.core.windows.net\/staging\/2017\/02\/23\/ignite-wrap-up"',
                        replacement: 'href="http:\/\/mfblog3.blob.core.windows.net\/staging\/2017\/02\/23\/ignite-wrap-up.html"'
                    },
                    {
                        pattern: 'href="http:\/\/mfblog3.blob.core.windows.net\/staging\/2017\/02\/23\/ignite-wrap-up"',
                        replacement: 'href="http:\/\/mfblog3.blob.core.windows.net\/staging\/2017\/02\/23\/ignite-wrap-up.html"'
                    },
                    {
                        pattern: 'href="http:\/\/mfblog3.blob.core.windows.net\/staging\/2017\/02\/23\/ignite-wrap-up"',
                        replacement: 'href="http:\/\/mfblog3.blob.core.windows.net\/staging\/2017\/02\/23\/ignite-wrap-up.html"'
                    },
                    {
                        //getting started with Terraform
                        pattern: 'href="http:\/\/mfblog3.blob.core.windows.net\/staging\/2017\/05\/01\/getting-started-with-terraform-on-azure"',
                        replacement: 'href="http:\/\/mfblog3.blob.core.windows.net\/staging\/2017\/05\/01\/getting-started-with-terraform-on-azure.html"'
                    },
                    {
                        pattern: 'href="http:\/\/mfblog3.blob.core.windows.net\/staging\/2017\/05\/01\/getting-started-with-terraform-on-azure"',
                        replacement: 'href="http:\/\/mfblog3.blob.core.windows.net\/staging\/2017\/05\/01\/getting-started-with-terraform-on-azure.html"'
                    },
                    {
                        pattern: 'href="http:\/\/mfblog3.blob.core.windows.net\/staging\/2017\/05\/01\/getting-started-with-terraform-on-azure"',
                        replacement: 'href="http:\/\/mfblog3.blob.core.windows.net\/staging\/2017\/05\/01\/getting-started-with-terraform-on-azure.html"'
                    },
                    {
                        pattern: 'href="http:\/\/mfblog3.blob.core.windows.net\/staging\/2017\/05\/01\/getting-started-with-terraform-on-azure"',
                        replacement: 'href="http:\/\/mfblog3.blob.core.windows.net\/staging\/2017\/05\/01\/getting-started-with-terraform-on-azure.html"'
                    },
                    {
                        pattern: 'href="http:\/\/mfblog3.blob.core.windows.net\/staging\/2017\/05\/01\/getting-started-with-terraform-on-azure"',
                        replacement: 'href="http:\/\/mfblog3.blob.core.windows.net\/staging\/2017\/05\/01\/getting-started-with-terraform-on-azure.html"'
                    },
                    {
                        //talking helm for a spin
                        pattern: 'href="http:\/\/mfblog3.blob.core.windows.net\/staging\/2017\/05\/30\/taking-helm-for-a-spin"',
                        replacement: 'href="http:\/\/mfblog3.blob.core.windows.net\/staging\/2017\/05\/30\/taking-helm-for-a-spin.html"'
                    },
                    {
                        pattern: 'href="http:\/\/mfblog3.blob.core.windows.net\/staging\/2017\/05\/30\/taking-helm-for-a-spin"',
                        replacement: 'href="http:\/\/mfblog3.blob.core.windows.net\/staging\/2017\/05\/30\/taking-helm-for-a-spin.html"'
                    },
                    {
                        pattern: 'href="http:\/\/mfblog3.blob.core.windows.net\/staging\/2017\/05\/30\/taking-helm-for-a-spin"',
                        replacement: 'href="http:\/\/mfblog3.blob.core.windows.net\/staging\/2017\/05\/30\/taking-helm-for-a-spin.html"'
                    },
                    {
                        pattern: 'href="http:\/\/mfblog3.blob.core.windows.net\/staging\/2017\/05\/30\/taking-helm-for-a-spin"',
                        replacement: 'href="http:\/\/mfblog3.blob.core.windows.net\/staging\/2017\/05\/30\/taking-helm-for-a-spin.html"'
                    },
                    {
                        pattern: 'href="http:\/\/mfblog3.blob.core.windows.net\/staging\/2017\/05\/30\/taking-helm-for-a-spin"',
                        replacement: 'href="http:\/\/mfblog3.blob.core.windows.net\/staging\/2017\/05\/30\/taking-helm-for-a-spin.html"'
                    },
                    {
                        //Start using Jenkins with Azure in 5 minutes
                        pattern: 'href="http:\/\/mfblog3.blob.core.windows.net\/staging\/2018\/02\/27\/start-using-jenkins-with-azure-in-5-minutes"',
                        replacement: 'href="http:\/\/mfblog3.blob.core.windows.net\/staging\/2018\/02\/27\/start-using-jenkins-with-azure-in-5-minutes.html"'
                    },
                    {
                        pattern: 'href="http:\/\/mfblog3.blob.core.windows.net\/staging\/2018\/02\/27\/start-using-jenkins-with-azure-in-5-minutes"',
                        replacement: 'href="http:\/\/mfblog3.blob.core.windows.net\/staging\/2018\/02\/27\/start-using-jenkins-with-azure-in-5-minutes.html"'
                    },
                    {
                        pattern: 'href="http:\/\/mfblog3.blob.core.windows.net\/staging\/2018\/02\/27\/start-using-jenkins-with-azure-in-5-minutes"',
                        replacement: 'href="http:\/\/mfblog3.blob.core.windows.net\/staging\/2018\/02\/27\/start-using-jenkins-with-azure-in-5-minutes.html"'
                    },
                    {
                        pattern: 'href="http:\/\/mfblog3.blob.core.windows.net\/staging\/2018\/02\/27\/start-using-jenkins-with-azure-in-5-minutes"',
                        replacement: 'href="http:\/\/mfblog3.blob.core.windows.net\/staging\/2018\/02\/27\/start-using-jenkins-with-azure-in-5-minutes.html"'
                    },
                    {
                        pattern: 'href="http:\/\/mfblog3.blob.core.windows.net\/staging\/2018\/02\/27\/start-using-jenkins-with-azure-in-5-minutes"',
                        replacement: 'href="http:\/\/mfblog3.blob.core.windows.net\/staging\/2018\/02\/27\/start-using-jenkins-with-azure-in-5-minutes.html"'
                    },
                    {
                        //tags - 2 plus number of tags
                        //app-service
                        pattern: 'href="http:\/\/mfblog3.blob.core.windows.net\/staging\/tags\/app-service"',
                        replacement: 'href="http://mfblog3.blob.core.windows.net/staging/tags/app-service.html"'
                    },
                    {
                        pattern: 'href="http:\/\/mfblog3.blob.core.windows.net\/staging\/tags\/app-service"',
                        replacement: 'href="http://mfblog3.blob.core.windows.net/staging/tags/app-service.html"'
                    },
                    {
                        pattern: 'href="http:\/\/mfblog3.blob.core.windows.net\/staging\/tags\/app-service"',
                        replacement: 'href="http://mfblog3.blob.core.windows.net/staging/tags/app-service.html"'
                    },
                    {
                        //azure
                        pattern: 'href="http:\/\/mfblog3.blob.core.windows.net\/staging\/tags\/azure"',
                        replacement: 'href="http://mfblog3.blob.core.windows.net/staging/tags/azure.html"'
                    },
                    {
                        pattern: 'href="http:\/\/mfblog3.blob.core.windows.net\/staging\/tags\/azure"',
                        replacement: 'href="http://mfblog3.blob.core.windows.net/staging/tags/azure.html"'
                    },
                    {
                        pattern: 'href="http:\/\/mfblog3.blob.core.windows.net\/staging\/tags\/azure"',
                        replacement: 'href="http://mfblog3.blob.core.windows.net/staging/tags/azure.html"'
                    },
                    {
                        pattern: 'href="http:\/\/mfblog3.blob.core.windows.net\/staging\/tags\/azure"',
                        replacement: 'href="http://mfblog3.blob.core.windows.net/staging/tags/azure.html"'
                    },
                    {
                        pattern: 'href="http:\/\/mfblog3.blob.core.windows.net\/staging\/tags\/azure"',
                        replacement: 'href="http://mfblog3.blob.core.windows.net/staging/tags/azure.html"'
                    },
                    {
                        pattern: 'href="http:\/\/mfblog3.blob.core.windows.net\/staging\/tags\/azure"',
                        replacement: 'href="http://mfblog3.blob.core.windows.net/staging/tags/azure.html"'
                    },
                    {
                        pattern: 'href="http:\/\/mfblog3.blob.core.windows.net\/staging\/tags\/azure"',
                        replacement: 'href="http://mfblog3.blob.core.windows.net/staging/tags/azure.html"'
                    },
                    {
                        //blob
                        pattern: 'href="http:\/\/mfblog3.blob.core.windows.net\/staging\/tags\/blob"',
                        replacement: 'href="http://mfblog3.blob.core.windows.net/staging/tags/blob.html"'
                    },
                    {
                        pattern: 'href="http:\/\/mfblog3.blob.core.windows.net\/staging\/tags\/blob"',
                        replacement: 'href="http://mfblog3.blob.core.windows.net/staging/tags/blob.html"'
                    },
                    {
                        pattern: 'href="http:\/\/mfblog3.blob.core.windows.net\/staging\/tags\/blob"',
                        replacement: 'href="http://mfblog3.blob.core.windows.net/staging/tags/blob.html"'
                    },
                    {
                        //helm
                        pattern: 'href="http:\/\/mfblog3.blob.core.windows.net\/staging\/tags\/helm"',
                        replacement: 'href="http://mfblog3.blob.core.windows.net/staging/tags/helm.html"'
                    },
                    {
                        pattern: 'href="http:\/\/mfblog3.blob.core.windows.net\/staging\/tags\/helm"',
                        replacement: 'href="http://mfblog3.blob.core.windows.net/staging/tags/helm.html"'
                    },
                    {
                        pattern: 'href="http:\/\/mfblog3.blob.core.windows.net\/staging\/tags\/helm"',
                        replacement: 'href="http://mfblog3.blob.core.windows.net/staging/tags/helm.html"'
                    },
                    {
                        //hugo
                        pattern: 'href="http:\/\/mfblog3.blob.core.windows.net\/staging\/tags\/hugo"',
                        replacement: 'href="http://mfblog3.blob.core.windows.net/staging/tags/hugo.html"'
                    },
                    {
                        pattern: 'href="http:\/\/mfblog3.blob.core.windows.net\/staging\/tags\/hugo"',
                        replacement: 'href="http://mfblog3.blob.core.windows.net/staging/tags/hugo.html"'
                    },
                    {
                        pattern: 'href="http:\/\/mfblog3.blob.core.windows.net\/staging\/tags\/hugo"',
                        replacement: 'href="http://mfblog3.blob.core.windows.net/staging/tags/hugo.html"'
                    },
                    {
                        //ignite
                        pattern: 'href="http:\/\/mfblog3.blob.core.windows.net\/staging\/tags\/ignite"',
                        replacement: 'href="http://mfblog3.blob.core.windows.net/staging/tags/ignite.html"'
                    },
                    {
                        pattern: 'href="http:\/\/mfblog3.blob.core.windows.net\/staging\/tags\/ignite"',
                        replacement: 'href="http://mfblog3.blob.core.windows.net/staging/tags/ignite.html"'
                    },
                    {
                        pattern: 'href="http:\/\/mfblog3.blob.core.windows.net\/staging\/tags\/ignite"',
                        replacement: 'href="http://mfblog3.blob.core.windows.net/staging/tags/ignite.html"'
                    },
                    {
                        pattern: 'href="http:\/\/mfblog3.blob.core.windows.net\/staging\/tags\/ignite"',
                        replacement: 'href="http://mfblog3.blob.core.windows.net/staging/tags/ignite.html"'
                    },
                    {
                        pattern: 'href="http:\/\/mfblog3.blob.core.windows.net\/staging\/tags\/ignite"',
                        replacement: 'href="http://mfblog3.blob.core.windows.net/staging/tags/ignite.html"'
                    },
                    {
                        //jenkins
                        pattern: 'href="http:\/\/mfblog3.blob.core.windows.net\/staging\/tags\/jenkins"',
                        replacement: 'href="http://mfblog3.blob.core.windows.net/staging/tags/jenkins.html"'
                    },
                    {
                        pattern: 'href="http:\/\/mfblog3.blob.core.windows.net\/staging\/tags\/jenkins"',
                        replacement: 'href="http://mfblog3.blob.core.windows.net/staging/tags/jenkins.html"'
                    },                    {
                        pattern: 'href="http:\/\/mfblog3.blob.core.windows.net\/staging\/tags\/jenkins"',
                        replacement: 'href="http://mfblog3.blob.core.windows.net/staging/tags/jenkins.html"'
                    },
                    {
                        pattern: 'href="http:\/\/mfblog3.blob.core.windows.net\/staging\/tags\/jenkins"',
                        replacement: 'href="http://mfblog3.blob.core.windows.net/staging/tags/jenkins.html"'
                    },
                    {
                        //kubernetes
                        pattern: 'href="http:\/\/mfblog3.blob.core.windows.net\/staging\/tags\/kubernetes"',
                        replacement: 'href="http://mfblog3.blob.core.windows.net/staging/tags/kubernetes.html"'
                    },
                    {
                        pattern: 'href="http:\/\/mfblog3.blob.core.windows.net\/staging\/tags\/kubernetes"',
                        replacement: 'href="http://mfblog3.blob.core.windows.net/staging/tags/kubernetes.html"'
                    },
                    {
                        pattern: 'href="http:\/\/mfblog3.blob.core.windows.net\/staging\/tags\/kubernetes"',
                        replacement: 'href="http://mfblog3.blob.core.windows.net/staging/tags/kubernetes.html"'
                    },
                    {
                        //terraform
                        pattern: 'href="http:\/\/mfblog3.blob.core.windows.net\/staging\/tags\/terraform"',
                        replacement: 'href="http://mfblog3.blob.core.windows.net/staging/tags/terraform.html"'
                    },
                    {
                        pattern: 'href="http:\/\/mfblog3.blob.core.windows.net\/staging\/tags\/terraform"',
                        replacement: 'href="http://mfblog3.blob.core.windows.net/staging/tags/terraform.html"'
                    },
                    {
                        pattern: 'href="http:\/\/mfblog3.blob.core.windows.net\/staging\/tags\/terraform"',
                        replacement: 'href="http://mfblog3.blob.core.windows.net/staging/tags/terraform.html"'
                    }
                    ]
                }
            }
        }
    });

    // Load the plugins 
    grunt.loadNpmTasks('grunt-string-replace');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');

    // Default task(s). 
    grunt.registerTask('default', ['uglify', 'cssmin:target', 'string-replace:badlinks', 'htmlmin:dist']);

};

