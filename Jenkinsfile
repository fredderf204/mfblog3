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
                withCredentials([usernamePassword(credentialsId: '12964816-c552-4356-a99b-439e5f0688b5', passwordVariable: 'sak', usernameVariable: 'san')]) {
                    sh 'azcopy --source $WORKSPACE/public --destination https://mfblog3.blob.core.windows.net/staging --dest-key $sak --recursive --quiet --set-content-type'
                    }
                withCredentials([usernamePassword(credentialsId: '12964816-c552-4356-a99b-439e5f0688b5', passwordVariable: 'sak', usernameVariable: 'san')]) {    
                    sh 'az storage blob list --account-name mfblog3 --account-key $sak -c staging --query "[].{name:name}" -o table | tail -n +3 | xargs -I % az storage blob update --account-name mfblog3 --account-key $sak --container-name staging --content-cache-control "max-age=3600, must-revalidate" --name %'
                }
            }
        }

        stage('test') {
            steps {
                timeout(time:30, unit:'MINUTES') {
                    input message:'http://mfblog3.blob.core.windows.net/staging/index.html Approve deployment?'
                }
            }
        }

        stage('backup') {
            steps {
                sh 'echo backup'
            }
        }

        stage('deploy') {
            steps {
                sh 'rm -rf public'
                sh 'hugo --baseURL https://cdn.mfriedrich.cloud/'
                sh 'npm install --dev-only'
                sh './node_modules/.bin/grunt --gruntfile gruntfilenew.js -v'
                withCredentials([usernamePassword(credentialsId: '12964816-c552-4356-a99b-439e5f0688b5', passwordVariable: 'sak', usernameVariable: 'san')]) {
                    sh 'azcopy --source $WORKSPACE/public --destination https://mfblog3.blob.core.windows.net/blog --dest-key $sak --recursive --quiet --set-content-type'
                    }
                withCredentials([usernamePassword(credentialsId: '12964816-c552-4356-a99b-439e5f0688b5', passwordVariable: 'sak', usernameVariable: 'san')]) {    
                    azureCLI commands: [[exportVariablesString: '', script: 'az storage blob list --account-name mfblog3 --account-key $sak -c blog --query "[].{name:name}" -o table | tail -n +3 | xargs -I % az storage blob update --account-name mfblog3 --account-key $sak --container-name blog --content-cache-control "max-age=3600, must-revalidate" --name %']], principalCredentialId: '7f122f04-9592-4782-a3f3-822196987cd8'
                }
            }
        }

        stage('cdn') {
            steps {
                azureCLI commands: [[exportVariablesString: '', script: 'az cdn endpoint purge -g hugo --profile-name mf -n mfblog --content-paths "/*"']], principalCredentialId: '7f122f04-9592-4782-a3f3-822196987cd8'
            }
        }
    }
}