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
        //html min
        htmlmin: {
            dist: {
                options: {
                    removeComments: true,
                    collapseWhitespace: true
                },
                files: {
                    'public/' : 'public/*.html', 
                    'public/page/**' : 'public/page/*.html', 
                    'public/tags/**' : 'public/tags/*.html', 
                    'public/2017/01/02/**' : 'public/2017/01/02/*.html', 
                    'public/2017/01/11/**' : 'public/2017/01/11/*.html'
                }
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
                    'public/2017/01/11/' : 'public/2017/01/11/*.html', 
                    'public/2017/01/21/' : 'public/2017/01/21/*.html',
                    'public/2017/02/09/' : 'public/2017/02/09/*.html',
                    'public/2017/02/13/' : 'public/2017/02/13/*.html',
                    'public/2017/02/23/' : 'public/2017/02/23/*.html',
                    'public/2017/05/01/' : 'public/2017/05/01/*.html',
                    'public/2017/05/30/' : 'public/2017/05/30/*.html'
                }, 
                options: { 
                    replacements: [{ 
                        //baseurl
                        pattern: '<a href="https:\/\/cdn.mfriedrich.cloud\/"', 
                        replacement: '<a href="https://cdn.mfriedrich.cloud/index.html"' 
                    }, 
                    { 
                        //Posts
                        //starting-a-blog
                        pattern: 'href="https:\/\/cdn.mfriedrich.cloud\/2017\/01\/02\/starting-a-blog"', 
                        replacement: 'href="https://cdn.mfriedrich.cloud/2017/01/02/starting-a-blog.html"' 
                    },
                    { 
                        pattern: 'href="https:\/\/cdn.mfriedrich.cloud\/2017\/01\/02\/starting-a-blog"', 
                        replacement: 'href="https://cdn.mfriedrich.cloud/2017/01/02/starting-a-blog.html"' 
                    },
                    { 
                        pattern: 'href="https:\/\/cdn.mfriedrich.cloud\/2017\/01\/02\/starting-a-blog"', 
                        replacement: 'href="https://cdn.mfriedrich.cloud/2017/01/02/starting-a-blog.html"' 
                    },
                    { 
                        pattern: 'href="https:\/\/cdn.mfriedrich.cloud\/2017\/01\/02\/starting-a-blog"', 
                        replacement: 'href="https://cdn.mfriedrich.cloud/2017/01/02/starting-a-blog.html"' 
                    },
                    {
                        pattern: 'href="https:\/\/cdn.mfriedrich.cloud\/2017\/01\/02\/starting-a-blog"', 
                        replacement: 'href="https://cdn.mfriedrich.cloud/2017/01/02/starting-a-blog.html"' 
                    },
                    {
                        //jenkins-on-azure-app-service
                        pattern: 'href="https:\/\/cdn.mfriedrich.cloud\/2017\/01\/11\/jenkins-on-azure-app-service"',
                        replacement: 'href="https://cdn.mfriedrich.cloud/2017/01/11/jenkins-on-azure-app-service.html"'
                    },
                    {
                        pattern: 'href="https:\/\/cdn.mfriedrich.cloud\/2017\/01\/11\/jenkins-on-azure-app-service"',
                        replacement: 'href="https://cdn.mfriedrich.cloud/2017/01/11/jenkins-on-azure-app-service.html"'
                    },
                    {
                        pattern: 'href="https:\/\/cdn.mfriedrich.cloud\/2017\/01\/11\/jenkins-on-azure-app-service"',
                        replacement: 'href="https://cdn.mfriedrich.cloud/2017/01/11/jenkins-on-azure-app-service.html"'
                    },
                    {
                        pattern: 'href="https:\/\/cdn.mfriedrich.cloud\/2017\/01\/11\/jenkins-on-azure-app-service"',
                        replacement: 'href="https://cdn.mfriedrich.cloud/2017/01/11/jenkins-on-azure-app-service.html"'
                    },
                    {
                        pattern: 'href="https:\/\/cdn.mfriedrich.cloud\/2017\/01\/11\/jenkins-on-azure-app-service"',
                        replacement: 'href="https://cdn.mfriedrich.cloud/2017/01/11/jenkins-on-azure-app-service.html"'
                    },
                    {
                        //hugo-in-azure-blog-storage
                        pattern: 'href="https:\/\/cdn.mfriedrich.cloud\/2017\/01\/21\/hugo-in-azure-blob-storage"',
                        replacement: 'href="https://cdn.mfriedrich.cloud/2017/01/21/hugo-in-azure-blob-storage.html"'
                    },
                    {
                        pattern: 'href="https:\/\/cdn.mfriedrich.cloud\/2017\/01\/21\/hugo-in-azure-blob-storage"',
                        replacement: 'href="https://cdn.mfriedrich.cloud/2017/01/21/hugo-in-azure-blob-storage.html"'
                    },
                    {
                        pattern: 'href="https:\/\/cdn.mfriedrich.cloud\/2017\/01\/21\/hugo-in-azure-blob-storage"',
                        replacement: 'href="https://cdn.mfriedrich.cloud/2017/01/21/hugo-in-azure-blob-storage.html"'
                    },
                    {
                        pattern: 'href="https:\/\/cdn.mfriedrich.cloud\/2017\/01\/21\/hugo-in-azure-blob-storage"',
                        replacement: 'href="https://cdn.mfriedrich.cloud/2017/01/21/hugo-in-azure-blob-storage.html"'
                    },
                    {
                        pattern: 'href="https:\/\/cdn.mfriedrich.cloud\/2017\/01\/21\/hugo-in-azure-blob-storage"',
                        replacement: 'href="https://cdn.mfriedrich.cloud/2017/01/21/hugo-in-azure-blob-storage.html"'
                    },
                    {
                        //microsoft-ignite-next-week
                        pattern: 'href="https:\/\/cdn.mfriedrich.cloud\/2017\/02\/09\/microsoft-ignite-next-week"',
                        replacement: 'href="https:\/\/cdn.mfriedrich.cloud\/2017\/02\/09\/microsoft-ignite-next-week.html"'
                    },
                    {
                        pattern: 'href="https:\/\/cdn.mfriedrich.cloud\/2017\/02\/09\/microsoft-ignite-next-week"',
                        replacement: 'href="https:\/\/cdn.mfriedrich.cloud\/2017\/02\/09\/microsoft-ignite-next-week.html"'
                    },
                    {
                        pattern: 'href="https:\/\/cdn.mfriedrich.cloud\/2017\/02\/09\/microsoft-ignite-next-week"',
                        replacement: 'href="https:\/\/cdn.mfriedrich.cloud\/2017\/02\/09\/microsoft-ignite-next-week.html"'
                    },
                    {
                        pattern: 'href="https:\/\/cdn.mfriedrich.cloud\/2017\/02\/09\/microsoft-ignite-next-week"',
                        replacement: 'href="https:\/\/cdn.mfriedrich.cloud\/2017\/02\/09\/microsoft-ignite-next-week.html"'
                    },
                    {
                        pattern: 'href="https:\/\/cdn.mfriedrich.cloud\/2017\/02\/09\/microsoft-ignite-next-week"',
                        replacement: 'href="https:\/\/cdn.mfriedrich.cloud\/2017\/02\/09\/microsoft-ignite-next-week.html"'
                    },
                    {
                        //live-demo
                        pattern: 'href="https:\/\/cdn.mfriedrich.cloud\/2017\/02\/13\/live-demo"',
                        replacement: 'href="https:\/\/cdn.mfriedrich.cloud\/2017\/02\/13\/live-demo.html"'
                    },
                    {
                        pattern: 'href="https:\/\/cdn.mfriedrich.cloud\/2017\/02\/13\/live-demo"',
                        replacement: 'href="https:\/\/cdn.mfriedrich.cloud\/2017\/02\/13\/live-demo.html"'
                    },
                    {
                        pattern: 'href="https:\/\/cdn.mfriedrich.cloud\/2017\/02\/13\/live-demo"',
                        replacement: 'href="https:\/\/cdn.mfriedrich.cloud\/2017\/02\/13\/live-demo.html"'
                    },
                    {
                        pattern: 'href="https:\/\/cdn.mfriedrich.cloud\/2017\/02\/13\/live-demo"',
                        replacement: 'href="https:\/\/cdn.mfriedrich.cloud\/2017\/02\/13\/live-demo.html"'
                    },
                    {
                        pattern: 'href="https:\/\/cdn.mfriedrich.cloud\/2017\/02\/13\/live-demo"',
                        replacement: 'href="https:\/\/cdn.mfriedrich.cloud\/2017\/02\/13\/live-demo.html"'
                    },
                    {
                        //ignite wrapup
                        pattern: 'href="https:\/\/cdn.mfriedrich.cloud\/2017\/02\/23\/ignite-wrap-up"',
                        replacement: 'href="https:\/\/cdn.mfriedrich.cloud\/2017\/02\/23\/ignite-wrap-up.html"'
                    },
                    {
                        pattern: 'href="https:\/\/cdn.mfriedrich.cloud\/2017\/02\/23\/ignite-wrap-up"',
                        replacement: 'href="https:\/\/cdn.mfriedrich.cloud\/2017\/02\/23\/ignite-wrap-up.html"'
                    },
                    {
                        pattern: 'href="https:\/\/cdn.mfriedrich.cloud\/2017\/02\/23\/ignite-wrap-up"',
                        replacement: 'href="https:\/\/cdn.mfriedrich.cloud\/2017\/02\/23\/ignite-wrap-up.html"'
                    },
                    {
                        pattern: 'href="https:\/\/cdn.mfriedrich.cloud\/2017\/02\/23\/ignite-wrap-up"',
                        replacement: 'href="https:\/\/cdn.mfriedrich.cloud\/2017\/02\/23\/ignite-wrap-up.html"'
                    },
                    {
                        pattern: 'href="https:\/\/cdn.mfriedrich.cloud\/2017\/02\/23\/ignite-wrap-up"',
                        replacement: 'href="https:\/\/cdn.mfriedrich.cloud\/2017\/02\/23\/ignite-wrap-up.html"'
                    },
                    {
                        //getting started with Terraform
                        pattern: 'href="https:\/\/cdn.mfriedrich.cloud\/2017\/05\/01\/getting-started-with-terraform-on-azure"',
                        replacement: 'href="https:\/\/cdn.mfriedrich.cloud\/2017\/05\/01\/getting-started-with-terraform-on-azure.html"'
                    },
                    {
                        pattern: 'href="https:\/\/cdn.mfriedrich.cloud\/2017\/05\/01\/getting-started-with-terraform-on-azure"',
                        replacement: 'href="https:\/\/cdn.mfriedrich.cloud\/2017\/05\/01\/getting-started-with-terraform-on-azure.html"'
                    },
                    {
                        pattern: 'href="https:\/\/cdn.mfriedrich.cloud\/2017\/05\/01\/getting-started-with-terraform-on-azure"',
                        replacement: 'href="https:\/\/cdn.mfriedrich.cloud\/2017\/05\/01\/getting-started-with-terraform-on-azure.html"'
                    },
                    {
                        pattern: 'href="https:\/\/cdn.mfriedrich.cloud\/2017\/05\/01\/getting-started-with-terraform-on-azure"',
                        replacement: 'href="https:\/\/cdn.mfriedrich.cloud\/2017\/05\/01\/getting-started-with-terraform-on-azure.html"'
                    },
                    {
                        pattern: 'href="https:\/\/cdn.mfriedrich.cloud\/2017\/05\/01\/getting-started-with-terraform-on-azure"',
                        replacement: 'href="https:\/\/cdn.mfriedrich.cloud\/2017\/05\/01\/getting-started-with-terraform-on-azure.html"'
                    },
                    {
                        //talking helm for a spin
                        pattern: 'href="https:\/\/cdn.mfriedrich.cloud\/2017\/05\/30\/taking-helm-for-a-spin"',
                        replacement: 'href="https:\/\/cdn.mfriedrich.cloud\/2017\/05\/30\/taking-helm-for-a-spin.html"'
                    },
                    {
                        pattern: 'href="https:\/\/cdn.mfriedrich.cloud\/2017\/05\/30\/taking-helm-for-a-spin"',
                        replacement: 'href="https:\/\/cdn.mfriedrich.cloud\/2017\/05\/30\/taking-helm-for-a-spin.html"'
                    },
                    {
                        pattern: 'href="https:\/\/cdn.mfriedrich.cloud\/2017\/05\/30\/taking-helm-for-a-spin"',
                        replacement: 'href="https:\/\/cdn.mfriedrich.cloud\/2017\/05\/30\/taking-helm-for-a-spin.html"'
                    },
                    {
                        pattern: 'href="https:\/\/cdn.mfriedrich.cloud\/2017\/05\/30\/taking-helm-for-a-spin"',
                        replacement: 'href="https:\/\/cdn.mfriedrich.cloud\/2017\/05\/30\/taking-helm-for-a-spin.html"'
                    },
                    {
                        pattern: 'href="https:\/\/cdn.mfriedrich.cloud\/2017\/05\/30\/taking-helm-for-a-spin"',
                        replacement: 'href="https:\/\/cdn.mfriedrich.cloud\/2017\/05\/30\/taking-helm-for-a-spin.html"'
                    },
                    {
                        //tags - 1 plus number of tags
                        //app-service
                        pattern: 'href="https:\/\/cdn.mfriedrich.cloud\/tags\/app-service"',
                        replacement: 'href="https://cdn.mfriedrich.cloud/tags/app-service.html"'
                    },
                    {
                        pattern: 'href="https:\/\/cdn.mfriedrich.cloud\/tags\/app-service"',
                        replacement: 'href="https://cdn.mfriedrich.cloud/tags/app-service.html"'
                    },
                    {
                        //azure
                        pattern: 'href="https:\/\/cdn.mfriedrich.cloud\/tags\/azure"',
                        replacement: 'href="https://cdn.mfriedrich.cloud/tags/azure.html"'
                    },
                    {
                        pattern: 'href="https:\/\/cdn.mfriedrich.cloud\/tags\/azure"',
                        replacement: 'href="https://cdn.mfriedrich.cloud/tags/azure.html"'
                    },
                    {
                        pattern: 'href="https:\/\/cdn.mfriedrich.cloud\/tags\/azure"',
                        replacement: 'href="https://cdn.mfriedrich.cloud/tags/azure.html"'
                    },
                    {
                        pattern: 'href="https:\/\/cdn.mfriedrich.cloud\/tags\/azure"',
                        replacement: 'href="https://cdn.mfriedrich.cloud/tags/azure.html"'
                    },
                    {
                        pattern: 'href="https:\/\/cdn.mfriedrich.cloud\/tags\/azure"',
                        replacement: 'href="https://cdn.mfriedrich.cloud/tags/azure.html"'
                    },
                    {
                        //blob
                        pattern: 'href="https:\/\/cdn.mfriedrich.cloud\/tags\/blob"',
                        replacement: 'href="https://cdn.mfriedrich.cloud/tags/blob.html"'
                    },
                    {
                        pattern: 'href="https:\/\/cdn.mfriedrich.cloud\/tags\/blob"',
                        replacement: 'href="https://cdn.mfriedrich.cloud/tags/blob.html"'
                    },
                    {
                        //helm
                        pattern: 'href="https:\/\/cdn.mfriedrich.cloud\/tags\/helm"',
                        replacement: 'href="https://cdn.mfriedrich.cloud/tags/hugo.helm"'
                    },
                    {
                        pattern: 'href="https:\/\/cdn.mfriedrich.cloud\/tags\/helm"',
                        replacement: 'href="https://cdn.mfriedrich.cloud/tags/hugo.helm"'
                    },
                    {
                        //hugo
                        pattern: 'href="https:\/\/cdn.mfriedrich.cloud\/tags\/hugo"',
                        replacement: 'href="https://cdn.mfriedrich.cloud/tags/hugo.html"'
                    },
                    {
                        pattern: 'href="https:\/\/cdn.mfriedrich.cloud\/tags\/hugo"',
                        replacement: 'href="https://cdn.mfriedrich.cloud/tags/hugo.html"'
                    },
                    {
                        //ignite
                        pattern: 'href="https:\/\/cdn.mfriedrich.cloud\/tags\/ignite"',
                        replacement: 'href="https://cdn.mfriedrich.cloud/tags/ignite.html"'
                    },
                    {
                        pattern: 'href="https:\/\/cdn.mfriedrich.cloud\/tags\/ignite"',
                        replacement: 'href="https://cdn.mfriedrich.cloud/tags/ignite.html"'
                    },
                    {
                        pattern: 'href="https:\/\/cdn.mfriedrich.cloud\/tags\/ignite"',
                        replacement: 'href="https://cdn.mfriedrich.cloud/tags/ignite.html"'
                    },
                                        {
                        pattern: 'href="https:\/\/cdn.mfriedrich.cloud\/tags\/ignite"',
                        replacement: 'href="https://cdn.mfriedrich.cloud/tags/ignite.html"'
                    },
                    {
                        //jenkins
                        pattern: 'href="https:\/\/cdn.mfriedrich.cloud\/tags\/jenkins"',
                        replacement: 'href="https://cdn.mfriedrich.cloud/tags/jenkins.html"'
                    },
                    {
                        pattern: 'href="https:\/\/cdn.mfriedrich.cloud\/tags\/jenkins"',
                        replacement: 'href="https://cdn.mfriedrich.cloud/tags/jenkins.html"'
                    },
                    {
                        //kubernetes
                        pattern: 'href="https:\/\/cdn.mfriedrich.cloud\/tags\/kubernetes"',
                        replacement: 'href="https://cdn.mfriedrich.cloud/tags/kubernetes.html"'
                    },
                    {
                        pattern: 'href="https:\/\/cdn.mfriedrich.cloud\/tags\/kubernetes"',
                        replacement: 'href="https://cdn.mfriedrich.cloud/tags/kubernetes.html"'
                    },
                    {
                        //terraform
                        pattern: 'href="https:\/\/cdn.mfriedrich.cloud\/tags\/terraform"',
                        replacement: 'href="https://cdn.mfriedrich.cloud/tags/terraform.html"'
                    },
                    {
                        pattern: 'href="https:\/\/cdn.mfriedrich.cloud\/tags\/terraform"',
                        replacement: 'href="https://cdn.mfriedrich.cloud/tags/terraform.html"'
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
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
 
    // Default task(s). 
    grunt.registerTask('default', ['htmlmin:dist', 'string-replace:badlinks']); 
 
}; 

