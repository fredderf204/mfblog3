node {
    stage('source'){
        checkout scm
    }
    stage('build'){
        bat 'if exist public rmdir public /s /Q'
        bat 'hugo --baseURL http://b.mfriedrich.cloud/staging/ --uglyURLs'
        withEnv(["PATH+NODE=${tool name: 'node-6.9.4', type: 'jenkins.plugins.nodejs.tools.NodeJSInstallation'}"]) {
            bat 'npm install --dev-only'
            bat './node_modules/.bin/grunt --gruntfile gruntfilestaging.js string-replace:badlinks'
        }
        withCredentials([string(credentialsId: 'a21923e1-0cb7-41ec-9ea7-f659805ebfe3', variable: 'key')]) {
            bat '"C:\\Program Files (x86)\\Microsoft SDKs\\Azure\\AzCopy\\AzCopy.exe" /Source:"%WORKSPACE%\\public" /Dest:https://mfblog3.blob.core.windows.net/staging /DestKey:"$key" /S /Y /SetContentType'
        }
        
    }
}