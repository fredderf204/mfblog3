+++
banner = ""
categories = []
date = "2017-05-01T16:23:18+10:00"
keywords = ["Azure", "Terraform"]
description = ""
images = []
menu = ""
tags = ["Azure", "Terraform"]
title = "Getting Started with Terraform on Azure"

+++

## TLDR

Terraform is easy to get started with Azure :+1: and provides some additional benefits for Infrastructure as Code when compared with Azure Resource Manager (ARM) and Templates (which we will go into in a moment).

But it's not all rainbows :rainbow: and unicorns :horse: It doesn't yet support all of the resource types available in Azure and you may have to supplement you Terraform code with ARM JSON for those missing resource types.

But overall

* If you are currently using Terraform in you environment, you can rest assured it works really well in Azure and you can continue to use it
* If you are new to Azure, I would look at ARM and Templates first
* If you have a specific requirement that ARM and Templates cannot fulfil, then look at Terraform as a great alternative

## Infrastructure as Code

Terraform enables you to Write, Plan, and Create [Infrastructure as Code](https://en.wikipedia.org/wiki/Infrastructure_as_Code). Infrastructure as Code or IaC in my opinion is the only way to manage your Infrastructure in the cloud. IaC is all about writing `code` (yes `code!`) to manage and provision your infrastructure and services in an declarative manner. I.e. I want my servers to look like this, may it so Azure.

Now that you have your infrastructure as code, you can do :one: great thing straight away which will make your Ops and Dev teams work more efficiently and with greater success

#### You can store you IaC in Source Control!

But why is this so good :question: because.....

* It will give you a full history :books: of your code. No more issues like what change, when and why. Because with every commit you can see who committed the code and through messages/notes you can see why they did it.
* It will be far easier to roll back changes, because you have a record of exactly (line by line) what changed with there previous and new values.
* You can branch your IaC (branching is like taking a full copy of the code :memo: ) and start adding to it without affecting production. And even better, you can test it before you merge it back into production.
* You can easily integrate code in Source control into Software Delivery Pipelines and taken advantages of DevOps principles like Continuos Integration, Automated Testing and Continuos Deployment.

## Terraform

One of the reason I really like Terraform is that when writing your IaC, you are using [HashiCorp Configuration Language](https://github.com/hashicorp/hcl) or HCL. And the reason I like HCL is because it is so easy to write and read. For example. The below code will create a storage account in Azure

    resource "azurerm_resource_group" "testrg" {
        name     = "resourceGroupName"
        location = "westus"
    }

    resource "azurerm_storage_account" "testsa" {
        name                = "storageaccountname"
        resource_group_name = "${azurerm_resource_group.testrg.name}"

        location     = "westus"
        account_type = "Standard_GRS"

        tags {
            environment = "staging"
        }
    }

See... nice and simple :yum:

## Why Terraform?

We already have a great language for writing and provision infrastructure and services in Azure using ARM Templates, why do I need another way? Well Terraform offers the following advantages over ARM Templates

* It's very very very easy to read and write. I.e. in the above example it took us 16 lines to create a new Storage account in Azure. In this sample [here](https://github.com/Azure/azure-quickstart-templates/blob/master/101-storage-account-create/azuredeploy.json) it takes 42 lines using and ARM Template to do that same thing and is not as easy to read.
* You can write, plan and create resources in Azure that ARM Templates cannot. I.e. Storage Queues, Tables, Files, Blobs and Containers.
* You can `plan` your deployment before you hit `apply` and you will get a summary of what resources will be changed. I.e. Resource C will be added and Resource B will be deleted. Very nice
* You can configure multiple environments with it, not just Azure. If you look at the HashiCorp doco [here](https://www.terraform.io/docs/providers/index.html) you can see a full list of all the Providers you can write, plan and create with.

## Is there anything Terraform can't do?

Yes, Terraform doesn't support all of the Azure Resource types. It supports the important resources to get your cloud infrastructure up and running including container based deployments, but doesn't support the full gamut of services.

So as part of your Terraform code, you may have to supplement it with ARM Template JSON to get the job done. I have an example of this below and in this [Github Repo](https://github.com/fredderf204/custpipe/blob/master/azuredeploy.tf)

## Getting Started with Terraform and Azure

### Step 1 - Create an Azure SP

The first thing I would recommend you do before deploy any code to Azure is to create a Service Principle (SP). Azure Service Principles are security identities used by user-created apps, services, and automation tools to access specific Azure resources. You can do this by running the below 2 commands

`az ad app create --display-name terraform --homepage http://mfterra.form --identifier-uris http://mfterra.form`

The above command will create and Azure AD App in Azure with the display name of terraform. The --homepage and --identifier-uris are required arguments and because we won't use them, they can point to non-existent URLs.

`az ad sp create-for-rbac --name {appId} --password "{strong password}"`

The above command will create the Terraform SP in Azure. You will need the id that gets returned from the first command to be used as the appId in this command.

:bulb: This command will automatically give you Azure Terraform SP contributor access to your subscription. You can add and remove roles using the `az role assignment` command and the instructions found [here](https://docs.microsoft.com/en-us/cli/azure/create-an-azure-service-principal-azure-cli#managing-roles)

### Step 2 - Install Terraform

Now install Terraform, by using the instruction [here](https://www.terraform.io/intro/getting-started/install.html).

:bulb: Be sure to add the Terraform folder to your PATH enviroment variable or you would have any joy like I did the first time.

### Step 3 - Set up your variables

Now you will need the following information about you Azure Terraform SP and Azure enviroment to allow Terraform to write/read to/from Azure;

* subscription_id
* client_id
* client_secret
* tenant_id

You can get the subscription\_id and the tenant\_id by running the `az account list` command and get the client\_id and client\_secret values that get returned when you ran the `az ad sp create` command above.

Once you have the above 4 pieces of information, you have a couple of ways to pass them into to Terraform, which is described [here](https://www.terraform.io/docs/configuration/variables.html).

:bulb: My favourite way is to set them as the as environment variables; ARM_SUBSCRIPTION_ID, ARM_CLIENT_ID, ARM_CLIENT_SECRET and ARM_TENANT_ID. Please see below;

#### Bash

    export ARM_SUBSCRIPTION_ID="aaaa"
    export ARM_CLIENT_ID="bbbb"
    export ARM_CLIENT_SECRET="password"
    export ARM_TENANT_ID="cccc"

:bulb: or just edit your ~/.bashrc file

#### PowerShell

    [Environment]::SetEnvironmentVariable("ARM_subscription_id", "aaaa", "User")
    [Environment]::SetEnvironmentVariable("ARM_client_id", "bbbb", "User")
    [Environment]::SetEnvironmentVariable("ARM_client_secret", "password", "User")
    [Environment]::SetEnvironmentVariable("ARM_tenant_id", "cccc", "User")

:bulb: I found the environment variables names to be case sensitive when using PowerShell. So watch out for that

This way you keep your Azure Terraform SP client secrets out of your Terrafrom files and reduce the risk of them ending up on GitHub :cry:

### Step 4 - Build something in Azure

Now you can start build cool stuff in Azure. The below file will create a new storage account

    # Configure the Microsoft Azure Provider
    provider "azurerm" {}

    resource "azurerm_resource_group" "testrg" {
    name     = "terraTestRGroup"
    location = "westus"
    }

    resource "azurerm_storage_account" "testsa" {
    name                = "terratestsaname"
    resource_group_name = "${azurerm_resource_group.testrg.name}"

    location     = "westus"
    account_type = "Standard_GRS"

    tags {
        environment = "staging"
    }
    }

Simply copy and paste it into a file called _something_.tf, then run `terraform plan` and you should get results like the below;

    + azurerm_resource_group.testrg
        location: "westus"
        name:     "terraTestRGroup"
        tags.%:   "<computed>"

    + azurerm_storage_account.testsa
        access_tier:              "<computed>"
        account_kind:             "Storage"
        account_type:             "Standard_GRS"
        location:                 "westus"
        name:                     "terratestsan"
        primary_access_key:       "<computed>"
        primary_blob_endpoint:    "<computed>"
        primary_file_endpoint:    "<computed>"
        primary_location:         "<computed>"
        primary_queue_endpoint:   "<computed>"
        primary_table_endpoint:   "<computed>"
        resource_group_name:      "terraTestRGroup"
        secondary_access_key:     "<computed>"
        secondary_blob_endpoint:  "<computed>"
        secondary_location:       "<computed>"
        secondary_queue_endpoint: "<computed>"
        secondary_table_endpoint: "<computed>"
        tags.%:                   "1"
        tags.environment:         "staging"


    Plan: 2 to add, 0 to change, 0 to destroy.

Now run `terraform apply` and you should get results like the below;

    azurerm_resource_group.testrg: Creating...
    location: "" => "westus"
    name:     "" => "terraTestRGroup"
    tags.%:   "" => "<computed>"
    azurerm_resource_group.testrg: Creation complete (ID: /subscriptions/d7eecaa8-9609-4f06-95bf-...c8397fb/resourceGroups/terraTestRGroup)
    azurerm_storage_account.testsa: Creating...
    access_tier:              "" => "<computed>"
    account_kind:             "" => "Storage"
    account_type:             "" => "Standard_GRS"
    location:                 "" => "westus"
    name:                     "" => "terratestsaname"
    primary_access_key:       "" => "<computed>"
    primary_blob_endpoint:    "" => "<computed>"
    primary_file_endpoint:    "" => "<computed>"
    primary_location:         "" => "<computed>"
    primary_queue_endpoint:   "" => "<computed>"
    primary_table_endpoint:   "" => "<computed>"
    resource_group_name:      "" => "terraTestRGroup"
    secondary_access_key:     "" => "<computed>"
    secondary_blob_endpoint:  "" => "<computed>"
    secondary_location:       "" => "<computed>"
    secondary_queue_endpoint: "" => "<computed>"
    secondary_table_endpoint: "" => "<computed>"
    tags.%:                   "" => "1"
    tags.environment:         "" => "staging"
    azurerm_storage_account.testsa: Still creating... (10s elapsed)
    azurerm_storage_account.testsa: Still creating... (20s elapsed)
    azurerm_storage_account.testsa: Creation complete (ID: /subscriptions/d7eecaa8-9609-4f06-95bf-...torage/storageAccounts/terratestsaname)

    Apply complete! Resources: 2 added, 0 changed, 0 destroyed.

And there you go. the storage account has been created in Azure.

I know that a Storage Account is a very simple example, but once you have the basics nailed you can started building some really cool stuff :tophat:

:speech_balloon: *I am employed by Microsoft; however, the opinions and views expressed here are my own and do not necessarily reflect those of my employer.*