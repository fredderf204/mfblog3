+++
title = "Hugo in Azure BLOB storage part 2"
tags = ["Azure", "Hugo", "BLOB"]
description = "Part 2 in the series of how to run Hugo in Azure BLOB storage"
banner = ""
bannerrecent = ""
images = []
keywords = ["Azure", "Hugo", "BLOB"]
date = "2018-03-31T21:16:23+11:00"
+++

<!--more-->

TLDR
---
If you haven't read part one of this series, you can find it [here]() :bowtie:

In the quest to make my blog better faster stronger :muscle: I am looking for ways to speed it up. During my experimentation and research I found [this](https://blog.lifeishao.com/2017/05/24/serving-your-static-sites-with-azure-blob-and-cdn/) blog to be very useful :tada: So useful in fact, this is how I am running my from blog from Azure Storage, with one addition. I am setting Cache-Control values in Azure Blob storage, so for pre-defined periods of time users are using the cached version of my site instead of the live version. Which is great because this is a blogging site only changes every week if I am lucky :four_leaf_clover: I found [this](https://alexandrebrisebois.wordpress.com/2013/08/11/save-money-by-setting-cache-control-on-windows-azure-blobs/) blog great in explaining cache-control values Azure Blob storage

Also I am planning a third post in this series where I go through how I automate my deployments into Azure using Jenkins, Hugo, Grunt, AZCopy, Azure CLI and Node.js. Stay tuned for that, as I have everything automated except for my testing :pencil2:

Intro
---
Basically, this blog is going to be about how I was using the wrong :cry: approach for running a Hugo generated static site on Azure Storage. For the right way to do it, please see [this](https://blog.lifeishao.com/2017/05/24/serving-your-static-sites-with-azure-blob-and-cdn/) blog by Hao Luo.

One of my main goals for running this blog was to see how cheap I could make the running costs. This is a great goal, but I found it challenging when using Azure Blob storage because it does not serve up a default file when accessed by the container name. I.e. I want my uses to access my site by going to https://blog.mfriedrich.cloud and not https://blog.mfriedrich.cloud.index.html.

What made the challenge more challenging :smile: was the fact that I was using Hugo, which I love :heart: and for more information about how I was using uglyURLs with Hugo, see my previous blog [here]().

So how do we solve the issue of Azure Blob storage running Hugo generated sites? I could think of 3 ways

1. Use Azure CDN Premium and use URL rewrites (This is the best solution in my opinion)
2. Use Azure Function and Function proxies to rewites the URLs
3. Do a whole bunch of manual work to produce index.html pages and change all of the links on those pages to include the new pages.

So with the goal of seeing how cheap I could make the running costs, I mistakenly chose option 3. I used Jenkins, Grunt, the grunt-string-replace plugin and whole bunch on regex's to do this. While this was working, it was very painful :syringe: But in the quest to make my blog better stronger faster, I was looking into push my whole site into a CDN. And if I was going to use a CDN anyway, why not just go for a Premium one and do URL rewrites :bulb:

Which is what I did and never looked back. I am very happy I made that choice :grinning: :beers: :cd:

Cache-Control
---

Now my site was humming away, but I am always looking into improving it's performance. So I started to look at the Cache-Control setting in Azure Blob Storage. For a good overview on this, please see [this](https://alexandrebrisebois.wordpress.com/2013/08/11/save-money-by-setting-cache-control-on-windows-azure-blobs/) blog.

Now, how do I do this???

I am still using Jenkins as my CI/CD tool and I use AzCopy to copy my static html files to Azure Blob Storage. This works great....... but you cannot set Cache-Control setting when moving files with AzCopy :cry:

So... using my newly found bash skills and the Azure CLI, I did this;

```
az storage blob list --account-name mfblog3 --account-key $sak -c staging --query "[].{name:name}" -o table | tail -n +3 | xargs -I % az storage blob update --account-name mfblog3 --account-key $sak --container-name staging --content-cache-control "max-age=86400, must-revalidate" --name %
```

The above command does the following;

1. Uses the Azure CLI to get a list of all blobs in a particular container and just output the name of the blobs
2. I pipe that into the tail command to get rid of the first 3 lines of the output
3. Then I pipe that into xargs which runs the an Azure CLI command again, but this one sets the Cache-Control setting to max-age=86400, must-revalidate

Boom :boom::bomb::boom: now we have the Cache-Control setting set to what we want.

:bulb: as a side note, I am looking to modify how I am caching certain assets on my site. But I will discuss that in a later blog.

Wrap up
---

And that's basically it :tophat:

Now look out for my next blog where I discus my CI/CD pipeline I am using for this blog

Thanks

:speech_balloon: *I am employed by Microsoft; however, the opinions and views expressed here are my own and do not necessarily reflect those of my employer.*