+++
title = "Start using Jenkins with Azure in 5 minutes!"
tags = ["Azure, Jenkins"]
keywords = ["Azure, Jenkins"]
description = "Have you always wanted to start using Jenkins with Azure? Do you have 5 minutes? Well...... your in luck!"
banner = "img/azjenkban.png"
images = []
date = "2018-02-27T21:10:58+11:00"
+++

TLDR
----

Have you always wanted to use [Jenkins](https://jenkins.io) with Azure :grey_question: Do you have ~5 minutes :thumbsup: Well...... maybe not exactly 5 minutes, but not very much time at all :exclamation:

I have created a docker :whale: image based on the lts Jenkins Docker image that contains the [Azure CLI](https://docs.microsoft.com/en-us/cli/azure/overview?view=azure-cli-latest), [AZCopy](https://docs.microsoft.com/en-us/azure/storage/common/storage-use-azcopy-linux?toc=%2fazure%2fstorage%2fblobs%2ftoc.json) and comes preconfigured with commonly used Jenkins plugins for Azure. So all you need to do is download the docker image and start hacking away with Jenkins and Azure :stuck_out_tongue_winking_eye:

Prereqs
----

Just a couple of things you need to do before you start

- Have an Azure Subscription. If you would like to start a free account, please see instructions [here](https://azure.microsoft.com/en-gb/free/)
- Have Docker installed on your laptop (I.e. Docker for Windows or Docker for Mac)
- Create a Service Principle to allow Jenkins to access the Azure APIs. Some great instructions can be found [here](https://docs.microsoft.com/en-us/cli/azure/create-an-azure-service-principal-azure-cli?view=azure-cli-latest#create-the-service-principal)

For my setup, I am using Docker for Windows (which you might notice in the screen shots below)

Setup Docker for Windows
----

The first thing I do is create a new folder on the root of my C: drive called dockervolumes. This is the place where I choose to persist data for my docker containers.

:bulb: This is an important step for Jenkins. Using a volume in docker will make sure you don't loose all of your Jobs, Credentials, Configurations in Jenkins when the container is recycled.

Next I configure Docker for Windows to share my C: drive by right clicking Docker in my system tray and selecting settings. Next I click on Shared Drives and select my C: Drive like below;

![figure 1 - Shared Drives](http://cdn.mfriedrich.cloud/img/jenkaz5.png)

Setup Jenkins
----

Download or clone the Dockerfile and plugins.txt files from [here](https://github.com/fredderf204/dockerimages/tree/master/azurejenkins).

Next build the Docker images by going to the folder where you downloaded the files to and running the below commands.

`docker build -t mf/azjenkins .`

:crystal_ball: I know I said that we would have Jenkins up and running in 5 minutes, but this process will take some time..... depending on your internet connection.

Once the build has completed you are ready to start your container. Next run

`docker run -p 8080:8080 -v C:/dockervolumes/jenkins:/var/jenkins_home mf/azjenkins`

What this command does is;

- starts up the docker image called mf/azjenkins
- allows port 8080 traffic through to container port 8080 (the default Jenkins admin port)
- stores the container path /var/jenkins_home onto you C:Drive

:bulb: because this is a dev Jenkins installation, I have not exposed the default JNLP port of 5000, as I will not be adding any slaves to it

Now you should be able to open the browser, go to http://localhost:8080 and run through the Jenkins installation process.

:bulb: We have already pre-installed some Azure related plugins, so you can choose "Install suggested plugins" at the Customize Jenkins screen.

Configure Jenkins
----

The first thing we need to do is enter your Jenkins Service Principle credentials into Jenkins, so we can use them with the Azure CLI Plugin. To do this;

- Select Credentials from the Jenkins Dashboard
- Now select "global" from the stores scoped to Jenkins section
- Next click on Add Credentials
- Add a new Microsoft Azure Service Principal with the credential information you created earlier. Please see screen shot below
- Click on the Verify Service Principle to confirm you are good to go
- Lastly, after pressing ok, you should see a new line for the credential you just created. Make sure you note down the Name (ID) for later use

![figure 2 - Adding Credentials](http://cdn.mfriedrich.cloud/img/jenkaz51.png)

Now you can use the Azure CLI from inside Jenkins :tada::tada::tada: As an example you can;

- Select "New Item" from the Jenkins dashboard
- Input a name for your Item, select "Pipeline" and scroll down and select OK
- Now inside your item, scroll to the bottom of the page and insert the below code into the Pipeline section. Remembering to input the Jenkins ID of the Credentials you just created.
- Click Save
- Now click on "Build Now"

```
pipeline{
    agent any
    stages {
        stage('test'){
              steps {
                azureCLI commands: [[exportVariablesString: '', script: 'az']], principalCredentialId: 'insert Jenkins Cred id'
            }
        }
    }
}
```

![figure 3 - Pipeline](http://cdn.mfriedrich.cloud/img/jenkaz52.png)

![figure 4 - Stage View](http://cdn.mfriedrich.cloud/img/jenkaz53.png)

And finally, if you look at the Stage Logs or Build #1 Console output, you can see you Jenkins Pipeline using the Azure CLI to login and run the az command. 

Next Steps
----

I am working on making the docker image smaller, as it's currently quite large (around 2.7GB)

:speech_balloon: *I am employed by Microsoft; however, the opinions and views expressed here are my own and do not necessarily reflect those of my employer.*