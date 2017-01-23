+++
title = "Hugo in Azure BLOB storage"
banner = "img/hugoazureban.png"
images = []
tags = ["Azure", "Hugo", "BLOB"]
keywords = ["Azure", "Hugo", "BLOB"]
description = "Running Hugo in Azure BLOB storage"
date = "2017-01-21T19:16:23+11:00"

+++

TLDR
---
Hugo runs well in Azure BLOB Storage :thumbsup: It just needs a little extra setup, but we can that fix that :smiley: In fact, this blog is currently running in Azure BLOB storage :boom:

Intro
---
This was my first attempt at running a static website in Azure BLOB storage….. And it was fun :tada: I have enjoyed working with Hugo and Azure BLOB storage. I especially like Hugo's command line interface and in built web server for previewing what your content will look like.

This blog is about my experiences setting up and running a Hugo generated website on Azure BLOB storage, along with some tips and tricks along the way.

I have assumed you are somewhat familiar with Hugo and Azure BLOB storage. But if you're not, don’t worry :wink: , follow the links below to learn more;

- [Hugo](http://http://gohugo.io/) A fast and modern static website engine
- [Azure BLOB Storage](https://azure.microsoft.com/en-us/services/storage/blobs/): Massively-scalable object storage for unstructured data

You can see the complete source files for my blog in my [GitHub Repo](https://github.com/fredderf204/mfblog3) :octocat:

There are 3 main tasks we need to achieve to get your Hugo site running in Azure BLOB storage;

1. Install Hugo and configure your site for Azure
2. Fix the links in your html 
3. Create a Azure storage account and upload your content

Tools
---
I used the following tools to run Hugo in Azure BLOB storage;

- [Hugo](http://gohugo.io/): A fast and modern static website engine.
- [VS Code](https://code.visualstudio.com/): Free, Open Source Code editor.
- [AZCopy](https://docs.microsoft.com/en-us/azure/storage/storage-use-azcopy): Command-line utility for copying data to and from Microsoft Azure Blob, File, and Table storage.
- [Azure Storage Explorer Preview](http://storageexplorer.com/): Easily work with Azure Storage - from any platform, anywhere

Hugo Installation and Content Preview
---
The Hugo [website](http://gohugo.io/) has some great documentation, and you can find out more information about installing Hugo [here](http://gohugo.io/overview/installing/) and content generation [here](http://gohugo.io/overview/quickstart/).

Once you have installed Hugo and generated some sample content for testing, you can use the inbuilt web server to preview you blog. Instructions on this are [here](http://gohugo.io/overview/quickstart/). I really like this and think it's a very nice touch!

Hugo Configuration
---
The main configuration of your Hugo site is ……… the config file. These files can take on the format of toml, json or yaml. You can read more about it [here](http://gohugo.io/overview/configuration/) and below are some tips for your config file in Azure BLOB storage;

:bulb: Your baseurl needs to include the trailing slash. I.e. for this blog, my baseurl is `http://b.mfriedrich.cloud/blog/`

:bulb: Azure BLOB storage allows for custom domains. If you would like to use a custom domain, you need to make sure your baseural matches this custom domain. I will go through this in a later section.

:bulb: If you are using a menu for your blog, make sure the links go to a ***.html page**. Please see below for my params.menu config;

```
[[params.menu]]
    before = true
    label  = "About Me"
    link   = "page/aboutme.html"

[[params.menu]]
    before = false
    label  = "Tags"
    link   = "tags/index.html"
```

Themes
---
Hugo is based on Themes to control the look and feel of your website, and the theme that I used was [hugo-icarus-theme](https://github.com/digitalcraftsman/hugo-icarus-theme). The gallery of themes can be found [here](http://themes.gohugo.io/).

I didn't have to do anything specifically to the theme to make it work in Azure BLOB Storage, which was good news :raised_hands:

Content Creation and Generating the your site
---
Now let's create some content :sparkles: What I really like about Hugo is the the markdown syntax. It uses the awesome features found in the [GitHub Flavored Markdown](https://help.github.com/articles/basic-writing-and-formatting-syntax/) and you can even use emojy's :cake: :cookie: :icecream:

Once you have created some content, you will need to generate your public folder. This is the folder that will be uploaded to Azure BLOB storage. This is completed by running `hugo --ulgyURLS`

:bulb: `--ulgyURLs` in needed so it will append index.html to the files being created. You could also add `uglyurls = true` to your config file instead.

Now you will find a new folder created in your project called **public**. The contents of this folder are what we will be uploading to Azure BLOB storage. Now,  we need to make a few adjustments to make all of the links work in your newly created html files.

Depending on your theme and the html that has been created, you will need to fix the links to your content. For example, on this blog in the main index.html page, I needed to update the links to each post and change http://b.mfriedrich.cloud/blog/2017/01/02/starting-a-blog to http://b.mfriedrich.cloud/blog/2017/01/02/starting-a-blog.html. (I used find and replace in my IDE)

:pencil2: I am going to automate this process in the future and will write another blog post about it :pencil2:

Now once you have fixed up all of the links in your html files (of which you may have a few), your static web site is ready to be uploaded to Azure BLOB Storage

Prepare Azure BLOB Storage
---
Create a new Azure Storage account and container. Some great instructions can be found [here](https://docs.microsoft.com/en-us/azure/storage/storage-create-storage-account#create-a-storage-account). I created a BLOB Storage account and a container called "blog".

If you would like to use a custom domain for you storage account, you can find instructions [here](https://docs.microsoft.com/en-us/azure/storage/storage-custom-domain-name). I highly recommend doing this! I am currently using b.mfriedrich.cloud as the domain for my Storage account.

:bulb: Make sure your baseurl in your config file matches either the Storage account's default URL and container name, ir your custom domain name and container name.

:bulb: Also on your newly created container, you need to set the public access level to **public read access for container and blobs**

![figure 1 - configure container](/blog/img/hugoazure1.png)

Upload to Azure Blob Storage
---

Now you are ready to upload the contents of your public folder into your Azure Blob Storage container. There are 2 methods I would recommend using for this;

1. AZCopy, if you are using a Windows computer
2. Azure Storage Explorer Preview, if you are using a Mac or Linux

AZCopy
---

To upload my blog to Azure Blob Storage, I use the below command;

```
"C:\Program Files (x86)\Microsoft SDKs\Azure\AzCopy\AzCopy.exe" /Source:C:\Users\mifrie\Documents\Code\hugo\mfblog3\public /Dest:https://mfhugo02.blob.core.windows.net/blog /DestKey:xxxxxx /S /SetContentType
```
/Source = The folder you wish to upload to Azure BLOB storage (Remember we are uploading only the public folder).

/Dest = The Azure BLOB storage container we are uploading to.

/DestKey = The Key use to access your Azure BLOB storage account. Instructions can be found [here](https://docs.microsoft.com/en-us/azure/storage/storage-create-storage-account#manage-your-storage-account) on how to get them.

/S = Specifies recursive mode, so all files and folder inside the public folder are copied

:bulb: /SetContentType = Tells AzCopy to set each blob or file's content type according to its file extension. This is by far the most important setting in the command.

Azure Storage Explorer Preview
---

Azure Storage Explorer Preview can be installed on macOS and Linux and this is the tool I would recommend for you. Simply install it, login and upload the contents of you public folder using the GUI. More information and instructions can be found in the video [here](http://storageexplorer.com/).

:bulb: The reason I recommend this tool and process, is because the Content Type will be set correctly for all of the files you upload into Azure BLOB storage.

Domain Redirect/Domain Forward
---
Now your Hugo site will be accessible via a direct link. I.e. http://b.mfriedrich.cloud/blog/index.html.

But what is you want your user base to access your site via a more friendly link :question::question::question:

As the sub heading suggests, you can use a domain redirect/domain forward. For this blog, I wanted my user base to access it via http://blog.mfriedrich.cloud, therefore I created a domain redirect/domain forward from blog.mfriedrich.cloud to http://b.mfriedrich.cloud/blog/index.html