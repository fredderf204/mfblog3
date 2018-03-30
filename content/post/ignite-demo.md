+++
title = "Live Demo!"
banner = "img/ignitedemoban.png"
bannerrecent = "img/ignitedemobanrecent.png"
images = []
tags = ["Ignite"]
keywords = ["Azure", "Ignite", "Australia", "demo"]
description = ""
date = "2017-02-13T16:56:41+11:00"

+++

This is a blog post that I am publishing live on stage :microphone: at Microsoft Ignite Australia 2017 using Jenkins, GitHub and Grunt :smiley:

The demo includes a Jenkins Pipeline that;

1. Pulls my content and files from GitHub :octocat: into Jenkins
2. Jenkins then generates my content using the Hugo executable
3. Pushes my content to a staging container in Azure Blob Storage
4. Pauses to allow me to view my staged deployment to make sure everything is ok
5. After I have approved the staged deployment, it pushes my content to my production container in Azure Blob Storage

![figure 1 - overview](http://cdn.mfriedrich.cloud/img/ignitedemo1.png)

The point I am trying to make with this demo is that once you a well established Delivery Pipeline, you should have confidence to push to production often :thumbsup:

Thanks Again!

:speech_balloon: *I am employed by Microsoft; however, the opinions and views expressed here are my own and do not necessarily reflect those of my employer.*