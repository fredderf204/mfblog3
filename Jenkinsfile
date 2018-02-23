node {
    stage('source'){
        checkout([$class: 'GitSCM', branches: [[name: '*/master']], doGenerateSubmoduleConfigurations: false, extensions: [[$class: 'SubmoduleOption', disableSubmodules: false, parentCredentials: false, recursiveSubmodules: true, reference: '', trackingSubmodules: false]], submoduleCfg: [], userRemoteConfigs: [[url: 'https://github.com/fredderf204/mfblog3']]])
    }
    stage('build'){
        sh 'hugo --baseURL http://mfblog3.blob.core.windows.net/staging/ --uglyURLs'
        withEnv(["PATH+NODE=${tool name: 'node-6.11.5', type: 'jenkins.plugins.nodejs.tools.NodeJSInstallation'}"]) {
            sh 'npm install --dev-only'
            sh './node_modules/.bin/grunt --gruntfile gruntfilestaging.js -v'
        }
        azureUpload blobProperties: [cacheControl: 'max-age=3600, must-revalidate', contentEncoding: '', contentLanguage: '', contentType: '', detectContentType: true], containerName: 'staging', fileShareName: '', filesPath: '/public/**', storageCredentialId: '8ad1a96f-f51e-4a31-b326-49bbb87c895d', storageType: 'blobstorage'
    }
    stage('test'){
    echo 'http://mfblog3.blob.core.windows.net/staging/index.html'
    timeout(time:30, unit:'MINUTES') {
        input message:'Approve deployment?'
        }
    }
}