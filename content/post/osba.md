+++
banner = ""
date = "2018-06-17T19:08:08+10:00"
description = ""
draft = true
images = []
menu = ""
tags = ["Azure", "Kubernetes"]
title = "Open Service Broker for Azure"
+++

TLDR
---

What is the [Open Service Broker for Azure](https://osba.sh/) (OSBA) and why do we care? Because is allows you create a use Azure-managed services from within Kubernetes. So let's pause and think about this for a moment.....

Do you want to deploy and run a highly available MySQL cluster in containers on K8s? or use OSBA with [Azure Database for MySQL](https://azure.microsoft.com/en-us/services/mysql/) and have Azure of the heavy lifting for you?

Or do you want to deploy and run a highly available PostgreSQL or SQL or MongoDB cluster in containers on K8s? or use OSBA and Azure?

And lastly, if you use OSBA and Azure Services, you can package up your entire application in a tool like [Helm](https://helm.sh/). Which will allow you too;

- Manage Complexity
- Have Easy Updates
- Simple Sharing
- Easy Rollbacks

Open Service Broker for Azure (OSBA)
---

From [GitHub](https://github.com/Azure/open-service-broker-azure);

> Open Service Broker for Azure is the open source, Open Service Broker-compatible API server that provisions managed services in the Microsoft Azure public cloud.

It works directly with the [Kubernetes Service Catalog](https://svc-cat.io/), which;

> Service Catalog lets you provision cloud services directly from the comfort of native Kubernetes tooling. Service Catalog speaks the language of the Open Service Broker API, letting you connect any brokers from any cloud to your cluster.

And even has a [CLI](https://github.com/Azure/service-catalog-cli)

Taking it for a test Drive
---

There is a really fantastic tutorial [here](https://docs.microsoft.com/en-us/azure/aks/integrate-azure) which goes through and;

1. Installs the K8s Service Catalouge
2. Installs the OSBA
3. Install the K8s Service Catalouge CLI
4. Install WordPress from Helm chart using Azure Database for MySQL

And at the end you get Wordpress, which is pretty cool. Now it didn't want re-write a great tutorial. So my guide follows the same steps for 1,2 and 3 (With the expection of installing the OSBA with the EXPERIMENTAL modules) and provisions a [Azure Cosmos DB with the Mongo API](https://docs.microsoft.com/en-us/azure/cosmos-db/mongodb-introduction). So it can be used as the data store for apps written for MongoDB, which is the goal of a follow up post where I write a custom 3 tier application using Cosmos DB with the Mongo API as the data store.

OSBA and Azure Cosmos DB with the Mongo API
---

So my tutorial start by going [here](https://docs.microsoft.com/en-us/azure/aks/integrate-azure) and following the below sections;

- Prerequisites
- Install Service Catalog

And when you get to the Install Open Service Broker for Azure section, follow the instrcutions until you get to the point where you are installing the OSBA with Helm. And instead of the instructions, run the below command;

``` bash
helm install azure/open-service-broker-azure --name osba --namespace osba \
    --set azure.subscriptionId=$AZURE_SUBSCRIPTION_ID \
    --set azure.tenantId=$AZURE_TENANT_ID \
    --set azure.clientId=$AZURE_CLIENT_ID \
    --set azure.clientSecret=$AZURE_CLIENT_SECRET \
    --set modules.minStability="EXPERIMENTAL"
```

The above command achieves the same result as the tutorial, but with 1 big difference..... We have enabled the ability to deploy the experimental services, which include;

- Azure Cosmos DB
- Azure Key Vault
- Azure Redis Cache
- Azure Event Hubs
- Azure Service Bus
- Azure Storage
- Azure Container Instances (ACI)
- Azure Search

And the one we are going to deploy is Azure Cosmos DB.

Next continue with the reference [tutorial](https://docs.microsoft.com/en-us/azure/aks/integrate-azure) and install the Service Catalog CLI.

At this point, you should be able to run `svcat get brokers` and check on the status. When the status equals "ready", you are good to go!

Next, let's create a Azure resource Group called "demo". This can be complete throiugh the Azure Portal or in the Azure cli by running `az group create --name demo --location "Australia East"

Now let's create our Azure Cosmos DB Service instalce by running the this command `kubectl create -f https://raw.githubusercontent.com/Azure/open-service-broker-azure/master/contrib/k8s/examples/cosmosdb/mongodb-instance.yaml`. Then we can confirm it was successful be running `svcat get instance my-mongodb-instance` , which should give you the below result;

insert image

And once the status is in a "ready" state, you can check the Azure Portal a see your freshly create your Azure Cosmos DB database.

Now even through we have already created the Azure Cosmos DB database, there is one last thing we need to do to mkae it really useful in K8s, Bind to it. Run this command `kubectl create -f https://raw.githubusercontent.com/Azure/open-service-broker-azure/master/contrib/k8s/examples/cosmosdb/mongodb-bindings.yaml`. Then we can confirm it was successful be running `svcat get binding my-mongodb-binding`, which should give you the below result;

insert image.

Now this is really cool. What we have done is pulled out some key information from the Azure Azure Cosmos DB service and create a K8s secret object, which includes the following information;

- host
- password
- port
- uri
- username
- connectionstring

And to  kae sure I am not lying, you can even run `kubectl describe secret my-mongodb-secret` to check.

Hi dean

:speech_balloon: *I am employed by Microsoft; however, the opinions and views expressed here are my own and do not necessarily reflect those of my employer.*
