+++
tags = ["Azure", "Hugo", "Jenkins"]
date = "2018-04-15T16:07:21+11:00"
title = "CI/CD with Hugo and Azure"
banner = "img/cicdban.png"
bannerrecent = "img/cicdban.png"
images = []
+++

TLDR
---

I use Jenkins, Grunt, bash, AZCopy, Azure CLI and Node.js code to automate the building and deploying of my blog to Azure Blog Storage and Azure CDN, through a Staging environment. Please see a diagram below;

Why do I do this :grey_question: :grey_question: :grey_question: so I can delivery my blog faster, with higher quality than I ever could before :+1: It's takes about 28 minutes for my blog to go from GitHub to my Azure Production environment and I know that once I have tested the blog in Staging, that's exactly what I will get in production :two_hearts:

![figure 1 - systems](/img/cicd.jpg)

My Setup
---

The core of my CI/CD pipeline is Jenkins and you can see my Jenkins file [here](https://github.com/fredderf204/mfblog3/blob/master/Jenkinsfile). I am running Jenkins locally in a docker container and you can see my dockerfile [here](https://github.com/fredderf204/dockerimages/blob/master/customjenkins/dockerfile) :whale: I know this isn't a production grade Jenkins installation, but it fits my needs.

I also wrote a quick blog about it how I used Jenkins with Azure [here](https://blog.mfriedrich.cloud/2018/02/27/start-using-jenkins-with-azure-in-5-minutes/).

Lastly you will see I have a Staging and Production environment. As you might expect, I used to Staging environment to test all of my changes before I push them to Production. This has become in valuable because;

1. I am able to experiment with new technology without breaking Production :microscope:
2. I am able to test changes before they go out to Production.
3. Plus, it only takes about 14 minutes :checkered_flag: to for me to push to Staging.

Point 1 above has allowed me to experiment with Progressive Web Apps (PWA) without breaking production. My PWA setup is almost where I want it to be, then I will push it into Production. Point 2 allows me to push to Production with confidence :sunglasses: and I have never had to rollback a change, because I know exactly what is going to happen. With Point 3, you might be thinking that 14 minutes seems like a long time to get this little blog into Staging :hourglass: But...... I use exactly the same process to push to Staging that I use for Production. And I mean exactly the same.

The Pipe
---

Without further adieu..... let's break down my Jenkinsfile and explain exactly what is happening.

```
pipeline {
    agent any

    tools {nodejs "node-6.11.5"}
```

This is the start of my Jenkinsfile that defines it can run on any agent and it needs a node.js runtime.

```
    stages {
        stage('source') {
            steps {
                checkout([$class: 'GitSCM', branches: [[name: '*/master']], doGenerateSubmoduleConfigurations: false, extensions: [[$class: 'SubmoduleOption', disableSubmodules: false, parentCredentials: false, recursiveSubmodules: true, reference: '', trackingSubmodules: false]], submoduleCfg: [], userRemoteConfigs: [[url: 'https://github.com/fredderf204/mfblog3']]])
            }
        }
```

As per best practices with Jenkinsfiles, I have spit up all of my CI/CD activities into stages. And this stage pulls my blog files from GitHub into my Jenkins workspace. 2 quick things on this;

1. I am not using a branching strategy with my Git source control. I.e. I am not creating a new branch every time I am making a change/bug fix/enhancement or writing a new post. If I had multiple contributors, then I think I would :couple:
2. I have installed my Hugo theme as a Git Submodule, to ensure I am getting the latest changes.

```
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
```

This is my main stage - Build. There are a few things happening there :sweat_smile: so let's have a look;

1. I am deleting my public folder (I think this is best practice???).
2. I am generating my Hugo site with my staging baseURL.
3. I am installing my Node.js devDependencies, which will allow me to run the proceeding tasks.
4. I am running my staging Grunt file, which you can find [here](https://github.com/fredderf204/mfblog3/blob/master/gruntfilestaging.js), that does;
    - javascript minification
    - css minification
    - html minification
    - image optimisation
5. I am using AZCopy to upload my static files to Azure Blog storage.
6. I then use bash and the Azure CLI to set the correct cache control settings on each file.

```
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
```

The first task purges my CDN endpoint so I can see the last files. I do this with custom node.js code that I have in my build scripts folder, which you can find [here](https://github.com/fredderf204/mfblog3/blob/master/buildscripts/purgecdn.js). Also note that this code is written in such a way I can reuse it for my production process, just by changing some environment variables :yum:

The second task pauses my pipe so I can preform manual testing. I have a stretch goal to automate more of my testing, but for now I am running [lighthouse](https://developers.google.com/web/tools/lighthouse/) locally on my laptop and manually inspecting my site.

```
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
                        sh 'node ./buildscripts/purgecdn.js'
                    }
                }
            }
        }
    }
}
```

The second half of my pipe is doing the exactly same thing it did in Staging but for Production. Again, this is important so I can have confidence when I push to Production everything will be ok :+1:

Continuing The Journey
---

Although I am fairly happy with where my CI/CD process is right now, there is more I want to work on;

1. Automate my testing! Looking at using [Selenium](https://www.seleniumhq.org/) and Lighthouse for this.
2. Actually do something in my backup step.

Also I am always looking to increase the performance of my site, so I will write another blog post on the process I am using for this.

:speech_balloon: *I am employed by Microsoft; however, the opinions and views expressed here are my own and do not necessarily reflect those of my employer.*