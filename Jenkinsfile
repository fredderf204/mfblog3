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
                sh 'hugo --baseURL https://stagingblog.mfriedrich.cloud/'
                sh 'npm install --dev-only'
                sh './node_modules/.bin/grunt --gruntfile gruntfilestaging.js -v'
                withCredentials([usernamePassword(credentialsId: '12964816-c552-4356-a99b-439e5f0688b5', passwordVariable: 'sak', usernameVariable: 'san')]) {
                    sh 'azcopy --source $WORKSPACE/public --destination https://mfblog3.blob.core.windows.net/staging --dest-key $sak --recursive --quiet --set-content-type'
                    }
                withCredentials([usernamePassword(credentialsId: '12964816-c552-4356-a99b-439e5f0688b5', passwordVariable: 'sak', usernameVariable: 'san')]) {    
                    sh 'az storage blob list --account-name mfblog3 --account-key $sak -c staging --query "[].{name:name}" -o table | tail -n +3 | xargs -I % az storage blob update --account-name mfblog3 --account-key $sak --container-name staging --content-cache-control "max-age=86400, must-revalidate" --name %'
                }
            }
        }

        stage('test') {
            steps {
                withCredentials([azureServicePrincipal('df5b41bf-d227-4c5f-bd28-1552d07c0d60')]) {
                    withEnv(['azurerg=hugo', 'cdnprofile=mfabprem', 'cdnendpoint=mfblobpremstg']) {
                        sh 'node ./buildscripts/purgecdn.js'
                    }
                }
                timeout(time:30, unit:'MINUTES') {
                    input message:'http://mfblobpremstg.azureedge.net/ Approve deployment?'
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
                sh 'hugo --baseURL https://blog.mfriedrich.cloud/'
                sh 'npm install --dev-only'
                sh './node_modules/.bin/grunt --gruntfile gruntfilesnew.js -v'
                withCredentials([usernamePassword(credentialsId: '12964816-c552-4356-a99b-439e5f0688b5', passwordVariable: 'sak', usernameVariable: 'san')]) {
                    sh 'azcopy --source $WORKSPACE/public --destination https://mfblog3.blob.core.windows.net/blog --dest-key $sak --recursive --quiet --set-content-type'
                    }
                withCredentials([usernamePassword(credentialsId: '12964816-c552-4356-a99b-439e5f0688b5', passwordVariable: 'sak', usernameVariable: 'san')]) {    
                    sh 'az storage blob list --account-name mfblog3 --account-key $sak -c blog --query "[].{name:name}" -o table | tail -n +3 | xargs -I % az storage blob update --account-name mfblog3 --account-key $sak --container-name blog --content-cache-control "max-age=86400, must-revalidate" --name %'
                }
            }
        }

        stage('cdn') {
            steps {
                withCredentials([azureServicePrincipal('df5b41bf-d227-4c5f-bd28-1552d07c0d60')]) {
                    withEnv(['azurerg=hugo', 'cdnprofile=mfabprem', 'cdnendpoint=mfblobprem']) {
                        sh 'node ./scripts/purgecdn.js'
                    }
                }
            }
        }
    }
}