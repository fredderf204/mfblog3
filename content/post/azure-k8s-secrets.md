+++
banner = ""
bannerrecent = ""
date = "2018-05-01T13:36:11+10:00"
description = ""
draft = true
images = []
tags = []
title = "K8s Secrets in Azure"
+++

TLDR
---

I have always been very interested in how secrets get stored and injecting into K8s pods, have you? this article will show you one way to do it within Azure using [AKS](https://azure.microsoft.com/en-au/services/container-service/) and [Azure Key Vault](https://azure.microsoft.com/en-gb/services/key-vault/) using the [Hexadite ACS keyvault agent](https://github.com/Hexadite/acs-keyvault-agent).

PS Looks like [KMS providers](https://kubernetes.io/docs/tasks/administer-cluster/kms-provider/) are the way forward, but this feature is currently in alpha.

Init Containers
---

I am not sure how I haven't heard of [Init Containers](https://kubernetes.io/docs/concepts/workloads/pods/init-containers/) until now. And from the K8s doco;

> A Pod can have multiple Containers running apps within it, but it can also have one or more Init Containers, which are run before the app Containers are started.
>
> Init Containers are exactly like regular Containers, except:
>
> * They always run to completion.
> * Each one must complete successfully before the next one is started.

This was the key piece of the puzzle I was missing in imaging how this could work. And seemingly Init Containers are a cool solution for a variety of scenarios.

Hexadite ACS keyvault agent
---

As per the [GitHub repo](https://github.com/Hexadite/acs-keyvault-agent), the Hexadite ACS keyvault agent does the following;

> * It runs before any other container as an init-container
> * It connects to Azure Key Vault using the cluster's service principle
> * It then grabs the desired secrets and/or certificates from Azure Key Vault and stores them in a shared volume (memory only - tmpfs)
> * If a secret refers to a key that is backing a certificate, both private key and certificate are exported as pem
> * It terminates and let other containers run
> * Finally, other containers have access to the secrets using a shared volume

Sounds pretty cool... so let's give it a whirl

Prerequisites
---



:speech_balloon: *I am employed by Microsoft; however, the opinions and views expressed here are my own and do not necessarily reflect those of my employer.*