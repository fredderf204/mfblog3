+++
title = "Hugo in Azure BLOB storage part 2"
tags = ["Azure", "Hugo", "BLOB"]
description = "Running Hugo in Azure BLOB storage part 2"
banner = ""
images = []
keywords = ["Azure", "Hugo", "BLOB"]
draft = "true"
+++

<!--more-->

TLDR
---
I have added more cloud services to make my blog even better. By using Azure CDN I have made by blog eaiser to use and more performant.

If you haven't read part one of this series, you can find it [here]()

Also I am planning a thrid post in this series where I go through how I automate my deployments into Azure using Grunt and Jenkins. Stay tuned for that!

Intro
---
After part one of this series we have a static website running in Azure BLOB storage, that is reached by going to http://blog.mfriedrich.cloud which redirects to http://b.mfriedrich.cloud/blog/index.html via a domain redirect/domain forward with my DNS provider.

But I am like interate over my blog and improve it with the below;

- Make it more performant by decreasing the load time
- Make the URL more friendly by removing the /blog portion
- Add SSL support

Azure CDN
---


I followed the instruction [here](https://docs.microsoft.com/en-us/azure/cdn/cdn-create-new-endpoint) to create a new CDN Profile.

Next I created a CDN endpoint using the storage option. Please see below;



:speech_balloon: *I am employed by Microsoft; however, the opinions and views expressed here are my own and do not necessarily reflect those of my employer.*