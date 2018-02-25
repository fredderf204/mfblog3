pipeline {
    agent any

    tools {nodejs "node-6.11.5"}

    stages {
        stage('source') {
            steps {
                checkout([$class: 'GitSCM', branches: [[name: '*/master']], doGenerateSubmoduleConfigurations: false, extensions: [[$class: 'SubmoduleOption', disableSubmodules: false, parentCredentials: false, recursiveSubmodules: true, reference: '', trackingSubmodules: false]], submoduleCfg: [], userRemoteConfigs: [[url: 'https://github.com/fredderf204/mfblog3']]])
            }
        }

        stage('build') {
            steps {
                sh 'rm -rf public'
                sh 'hugo --baseURL http://mfblog3.blob.core.windows.net/staging/'
                sh 'npm install --dev-only'
                sh './node_modules/.bin/grunt --gruntfile gruntfilestaging.js -v'
                sh 'cd public'
                azureUpload blobProperties: [cacheControl: 'max-age=3600, must-revalidate', contentEncoding: '', contentLanguage: '', contentType: '', detectContentType: true], cleanUpContainerOrShare: true, containerName: 'staging', excludeFilesPath: '', fileShareName: '', filesPath: '**/**', storageCredentialId: '8ad1a96f-f51e-4a31-b326-49bbb87c895d', storageType: 'blobstorage'
            }
        }

        stage('test') {
            steps {
                echo 'http://mfblog3.blob.core.windows.net/staging/index.html'
                timeout(time:30, unit:'MINUTES') {
                    input message:'Approve deployment?'
                }
            }
        }
    }
}