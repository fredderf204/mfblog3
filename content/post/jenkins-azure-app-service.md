+++
title = "Jenkins on Azure App Service"
images = []
tags = ["Azure", "App Service", "Jenkins"]
keywords = ["Azure", "App Service", "Jenkins"]
description = "Yes, you can have a basic Jenkins Server up and running in Azure App Service very quickly ::): You won’t get all of the features Jenkins has to offer, but if you want to get up and running quickly and you don’t want to manage a server, this could be for you!"
banner = "img/jenkban.png"
date = "2017-01-11T16:21:36+11:00"

+++

TLDR
----
Yes, you can have a basic Jenkins Server up and running in the **preview** of App Service on Linux very quickly :smiley: You won’t get all of the features Jenkins has to offer, but if you want to get up and running quickly and you don’t want to manage a server, this could be for you!

Intro
-----
In mid-November, Microsoft announced that the **preview** of App Service on Linux now supports [Containers](https://azure.microsoft.com/en-us/blog/app-service-on-linux-now-supports-containers-and-asp-net-core/)

Which means we can bring our own Docker Images or pull them directly from Docker Hub and run them in the **preview** of App Service on Linux. So being a fan of Jenkins, let's see if we can get it up and running in App Service in a container ……… which I did :thumbsup: but with limited functionality. 

Deploy Jenkins in the Preview of App Service on Linux
-----
There is a good article [here](https://docs.microsoft.com/en-us/azure/app-service-web/app-service-linux-how-to-create-a-web-app) on how to create a Web App with the **preview** of App Service on Linux. But we will need to make some minor adjustments;

- When creating the Web App, click on the configure container option

![figure 1 - configure container](http://cdn.mfriedrich.cloud/img/jenk1.png)

- Then click on Docker Hub and in the Image and optional tag section type in; `jenkinsci/jenkins`
- Click OK then Create

Now our Web App with Jenkins is going to be deployed, but we still have one issue. The main port Jenkins listens on is 8080 and Web Apps running in Azure App Service only respond to requests on ports 80 and 443. To fix this, go to the application settings of our Jenkins Web App and create a new App settings entry with key PORT and value 8080.

![figure 2 - custom port](http://cdn.mfriedrich.cloud/img/jenk2.png)

Click on Save and after a few seconds, your new Jenkins Web App will be up running and listening on port 80.

Installing Jenkins
----

Now you will be able to access your Jenkins Web App by going to the URL http://*webappname*.azurewebsites.net and you will be presented with the Unlock Jenkins screen. To find the initialAdminPassword please follow the below steps;

-  Log into your Advanced Tool site (kudu). The url will be https://*webappname*.scm.azurewebsites.net 
-  Go to Debug Console > Bash (Top of screen)
-  In the remote execution console type in;
`cd Logfiles\docker`
-  Now type in; `ls` and you should have 2 files docker_number_err.log and docker_number_out.log. *(Your files will contain actual numbers not the word number)*
-  Next type in; 
`cat docker_number_out.log`
- Now you should see the initial Admin Password. Copy this and paste it into your Jenkins Web app to unlock the installation.

Now complete the install of Jenkins as you normally would

Configuring Jenkins
----

The first thing you will need to do is to turn off Prevent Cross Site Request Forgery exploits. This will stop the No valid crumb was included in the request errors you are getting.

Go to Manage Jenkins of the left hand side of the screen then click on Manage Global Security. Now unselect Prevent Cross Site Request Forgery exploits and click on save. You may get an error message the first few times, but keep repeating the process until the updated configuration saves *(It took me 9 times)*.

:confused: **If anyone has a better solution for the above step, please let me know in the comments**

Now your Jenkins WebApp is ready to go :tada:

:speech_balloon: *I am employed by Microsoft; however, the opinions and views expressed here are my own and do not necessarily reflect those of my employer.*