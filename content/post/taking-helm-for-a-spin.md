+++
banner = "img/helmban.png"
bannerrecent = "img/helmban.png"
categories = []
date = "2017-05-30T15:59:58+10:00"
keywords = ["Azure", "Kubernetes", "Helm"]
description = ""
images = []
menu = ""
tags = ["Azure", "Kubernetes", "Helm"]
title = "Taking Helm for a spin"

+++

## TLDR

I have found Helm to be extremely useful :+1: I am someone who is somewhat familiar with Kubernetes (but not really) and found Helm great for both getting started and deploying custom application to Kubernetes :trophy:

In the below article I will go through my experiences with Helm, Kubernetes and Azure and show you some tips and tricks along the way.

Also, Draft was announced while I was writing this blog. I will do another post about Draft shortly.

## My Setup

My setup is pretty straight forward. I have provision a new Kubernetes cluster on Azure using [Azure Container Service (ACS)](https://azure.microsoft.com/en-us/services/container-service/) with the below 2 commands;

*Create a new resource group*

`az group create -n acsdemo1 -l 'Australia East'`

*Create the ACS Cluster*

`az acs create -n acs-cluster -g acsdemo1 -d ccacsdemo1 -t Kubernetes --generate-ssh-key`

:bulb: I have created a series of demos for people getting started with Kubernetes and containers on Azure, which can be found [here](https://github.com/fredderf204/containercamp07demos). Which includes full instructions on how to install Kubernetes on Azure.

And I have created an [Azure Container Registry](https://azure.microsoft.com/en-au/services/container-registry/) to store my docker images with the below command;

*Create Azure Container Registry*

:bulb: Note the the -n value must be globally unique. Therefore you will need to use another value other than ccdemo3.

`az acr create -n ccdemo3 -g acsdemo1 -l 'Australia East' --admin-enabled --sku Basic`

## Installing Helm

[Helm](https://helm.sh) is an open-source packaging tool that helps you install and manage the lifecycle of Kubernetes applications. Similar to Linux package managers such as apt-get and yum, Helm is used to manage Kubernetes charts, which are packages of preconfigured Kubernetes resources.

Helm has two components:

- The **Helm CLI** is a client that runs on your machine locally or in the cloud
- **Tiller** is a server that runs on the Kubernetes cluster and manages the lifecycle of your Kubernetes applications

*Install the Helm CLI*

Some great instructions on how to install the Helm CLI can be found [here](https://github.com/kubernetes/helm/blob/master/docs/install.md).

*Install Tiller on cluster*

To install Tiller, simply run the below command after the Helm CLI has been installed;

`helm init`

## Lets install Jenkins

Helm has a lot of good features, but one of the best ones when you are starting out is the ability to install a wide variety of applications from a prebuilt catalogue. You can either type in `helm search` to get the list, or you can go [here](https://kubeapps.com/).

Now based on the subtitle, you can guess which one we are about to install...... yes, Jenkins. To install simply type in `helm install --name my-release stable/jenkins`.

:bulb: To see a full list of Chart details and configuration options for Jenkins, please go [here](https://kubeapps.com/charts/stable/jenkins)

In a few moments you will have Jenkins up and running and you can follow the onscreen on how to access and log into it :star:

Now there a couple of cool things that happen when you use the defaults to install Jenkins via Helm;

1. It uses the Jenkins master and slave cluster utilizing the Jenkins Kubernetes plugin, and more information can be found [here](https://wiki.jenkins-ci.org/display/JENKINS/Kubernetes+Plugin). What's cool about this feature is that the Kubernetes cluster will dynamically provision a Jenkins agent container (using Kubernetes scheduling mechanisms to optimize the loads), run a single build, then tear-down that slave. You can watch this in action as when you kick of a Jenkins build, if you type in `kubectl get pods -w` in your terminal you will see a pod being created, then torn down. Very cool :tophat:

2. A dynamically managed Persistent Volume Claim is used to persistent the data across deployments. So if the pod running the jenkins master dies you don't lose your Jenkins configuration. You can read more about persistent volumes in Kubernetes [here](https://kubernetes.io/docs/concepts/storage/persistent-volumes/)

I won't be using Jenkins for the rest of this article, but you can see how easy it is to get an automation/software delivery platform up and running with Helm and Kubernetes in no time at all :zap:

## Lets deploy a custom app using Helm

*Create a sample Node.js app*

Please install Node.js if you don't already have it. Node.js can be installed 2 ways, the first way is to download an installer and those instructions are [here](https://nodejs.org/en/download/). The second way is to install it via a Package Manager and those instructions are [here](https://nodejs.org/en/download/package-manager/).

Now we are going to use [Express](http://expressjs.com) and it's well known generator to create a demo app. Open your terminal and please type in the below

`npm install express-generator -g`

`express --view=ejs --git myapp`

`cd myapp`

`npm install`

Excellent, we have created a demo Node.js app using the Express Generator and ejs as the view engine. To test the demo app is working, type in `npm start` then browse to http://localhost:3000. You will see the default express web app. Press Ctrl + C in you terminal to stop the app.

[VS Code](https://code.visualstudio.com/) is a Free, Open Source Code editor from Microsoft. I do all of my dev in it and really like it :loudspeaker: and will be using some of it's cool features below.

Now open the myapp folder inside of VS Code.

Then go to the *views/index.ejs* file and change h1 and p tags to look like the below

    <!DOCTYPE html>
    <html>
    <head>
        <title><%= title %></title>
        <link rel='stylesheet' href='/stylesheets/style.css' />
    </head>
    <body>
        <h1>Node.js Demo App</h1>
        <p>This is our new awesome demo app</p>
    </body>
    </html>

Now go back to your terminal and type in `npm start` then browse to http://localhost:3000 again. This time you should see the changes we have just made :rocket:

*Docker enable your App*

First we will need to install the Docker extension for VS Code. This can be done inside VS Code by pressing Ctrl + P and typing in `ext install vscode-docker`. You will need to reload VS Code so you can start using the extension.

Inside of VS Code with your project folder open, press Ctrl + Shift + P and type in Docker and select 'Add docker file to workspace'. Then select 'Node.js' and then enter in 3000 for the port.

The command will add a few files to your project, but the one we are most interested in is the 'Dockerfile'.

*Create a Docker Image for myapp*

Navigate to your myapp folder, mine is under ~\Documents\Code\node\myapp but your may be somewhere else. Make sure that the Dockerfile exists in the folder.

Run the below command to create a Docker Image

`sudo docker build -t ccdemo3.azurecr.io/myapp .`

Next you can verify the image has been created by running

`sudo docker images`

*Push myapp docker image to ACR*

First we need to log into our ACR instance, so lets get our credentials

`az acr credential show -g acsdemo1 -n ccdemo3 --query '{loginUserName:username,password:passwords[0].value}' -o table`

Now let's use our serverName from above combined with our loginUserName and password to login

`sudo docker login ccdemo3.azurecr.io -u xxxx -p yyyy`

Excellent. Now let's push up our docker image

`sudo docker push ccdemo3.azurecr.io/myapp`

To confirm the image has been pushed, run the below command

`az acr repository list -n ccdemo3`

*Create a Kubernetes secret*

To pull out our docker image from our private repo we are going to need to authenticate. And the best way to do this in Kubernetes is to create a Secret and pass it in during the deployment.

Run the below command to create the Secret

`kubectl create secret docker-registry acr --docker-server=ccdemo3.azurecr.io --docker-username=xxxx --docker-password=yyyy --docker-email=example@test.com`

### Create our first helm chart

Helm is used to manage Kubernetes charts. Charts are packages of preconfigured Kubernetes resources that can be created and installed very easily. Below we will create our first Helm chart (based on our sample Node.js app) and install in on our Kubernetes cluster.

Create a new Helm chart be running the following command.

`helm create demo-chart`

This will create a new folder called demo-chart, which is a organised collection of files and folders

*Edit values.yaml file*

Now edit the demo-chart\values.yaml file so it looks like the below; The values.yaml file lets you define values that can be used be the template files to create the Helm chart.

:bulb: Here we are telling Helm to create a new container from the ccdemo3.azurecr.io/myapp repo with some other configuration. For a full explanation of the Helm chart package layout and files, please go [here](https://docs.helm.sh/developing-charts/)

:bulb: :bulb: The most important configuration below is adding the `imagePullSecrets: acr` line. This tells Helm which credentials to use which pulling the image from my private docker repo.

    # Default values for demo-chart3.
    # This is a YAML-formatted file.
    # Declare variables to be passed into your templates.
    replicaCount: 1
    image:
        repository: ccdemo3.azurecr.io/myapp
        tag: latest
        pullPolicy: IfNotPresent
    service:
        name: demoapp3
        type: ClusterIP
        externalPort: 3000
        internalPort: 3000
    ingress:
        enabled: false
        # Used to create Ingress record (should used with service.type: ClusterIP).
        hosts:
            - chart-example.local
        annotations:
            # kubernetes.io/ingress.class: nginx
            # kubernetes.io/tls-acme: "true"
        tls:
            # Secrets must be manually created in the namespace.
            # - secretName: chart-example-tls
            #   hosts:
            #     - chart-example.local
    resources:
        limits:
            cpu: 100m
            memory: 128Mi
        requests:
            cpu: 100m
            memory: 128Mi
    imagePullSecrets: acr

Next edit the demo-chart\templates\deployment.yaml file and add the below code at the end;

      imagePullSecrets:
        - name: "{{ .Values.imagePullSecrets }}"

:bulb: Here we are updating the deployment template to look for the imagePullSecrets value in values.yaml file.

Now run the below command to confirm the above Helm configuration is valid and ok.

`helm lint`

*Package the Helm Chart*

Now move 1 folder up so you can see the demo-chart folder and run the below command to package the Helm chart. This will create a *.tgz file we can install on Kubernetes.

`helm package demo-chart`

*Deploy the new app using Helm*

To deploy our new custom Helm chart, simply run the below command;

`helm install demo-chart-0.1.0.tgz`

Now follow the on screen instructions to access your custom app.

:bulb: The on screen instructions come from \templates\NOTES.txt file. You may customise this if you like :rainbow:

## Helm Chart Repositories

Simply put, Chart Repositories are a location where packaged charts can be stored and shared. So....... let's create our own :crown:

Firstly lets create a new Azure Storage account to house our charts. Run the below command

`az storage account create -n mfazurecharts -g acsdemo1 -l 'Australia East' --sku Standard_LRS --access-tier Hot --encryption blob --kind BlobStorage`

Next create a container called Helm to store our files.

`az storage container create -n helm --public-access container --account-key xxxyyyzzz --account-name mfazurecharts`

:bulb: I have not included my real storage account key above, but you can get yours by running the `az storage account keys list -n mfazurecharts -g acsdemo1` command or going to the Azure portal.

Next in your terminal, make sure you are 2 folders above the demo-chart folder and run

`helm repo index --url https://mfazurecharts.blob.core.windows.net/helm ./helm`

:bulb: My file structure is `/mnt/c/Users/mifrie/Documents/code/helm/demo-chart` and I ran the helm repo index command from the /mnt/c/Users/mifrie/Documents/code folder.

Now upload the index.yaml and demo-chart-0.1.0.tgz files to your azure storage container. I prefer to use the [Azure Storage Explorer](http://storageexplorer.com/) app, but you can choose the way you are most comfortable with.

Now add the Chart Repository to your Helm CLI

`helm repo add mfazurecharts https://mfazurecharts.blob.core.windows.net/helm`

Now run a `helm repo list` to make sure our repo is there. You should see something like the below

    NAME            URL
    stable          https://kubernetes-charts.storage.googleapis.com
    local           http://127.0.0.1:8879/charts
    mfazurecharts   https://mfazurecharts.blob.core.windows.net/helm

And lastly, you can search for our demo app with the below command `helm search node` and you should see our app in the list like below

    NAME                            VERSION DESCRIPTION
    mfazurecharts/demo-chart        0.1.0   My awesome node.js demo app
    stable/aws-cluster-autoscaler   0.2.1   Scales worker nodes within autoscaling groups.
    stable/ghost                    0.4.9   A simple, powerful publishing platform that all...

Lastly you can install our custom demo-chart just like we installed Jenkins before :tada:

Now for bonus points .... :guitar: you can even add my Chart Repo I just created above to your Helm CLI if you like :dizzy: You just won't be able to pull the ccdemo3.azurecr.io/myapp image from my private container registry, because there's a password :metal:

:speech_balloon: *I am employed by Microsoft; however, the opinions and views expressed here are my own and do not necessarily reflect those of my employer.*