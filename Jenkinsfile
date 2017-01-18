node {
    stage('build'){
        bat 'if exist public rmdir public /s /Q'
        bat 'hugo --baseURL http://b.mfriedrich.cloud/staging/ --uglyURLs'
        withEnv(["PATH+NODE=${tool name: 'node-6.9.4', type: 'jenkins.plugins.nodejs.tools.NodeJSInstallation'}"]) {
        bat 'npm install --dev-only'
        bat './node_modules/.bin/grunt --gruntfile gruntfilestaging.js string-replace:badlinks'
    }
        bat '"C:\\Program Files (x86)\\Microsoft SDKs\\Azure\\AzCopy\\AzCopy.exe" /Source:"%WORKSPACE%\\public" /Dest:https://mfblog3.blob.core.windows.net/staging /DestKey:pQdKF/nVYUhKZgnkwadhwYj333bttPBZH0QxM2KlqoYNcaW+TyTXoLpNF9iVZLkE1ECvNiaHwSkZSFmv3QRT1g== /S /Y /SetContentType'
    }
}