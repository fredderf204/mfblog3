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
                    sh 'azcopy --source /public --destination https://mfblog3.blob.core.windows.net/staging --dest-key $sak --recursive --quiet --set-content-type'
                    }
                sh 'echo set caching settings placeholder'
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
                sh 'echo deploy'
            }
        }

        stage('cdn') {
            steps {
                sh 'echo purge cdn'
            }
        }
    }
}