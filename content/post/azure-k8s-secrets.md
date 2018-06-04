+++
banner = "img/hexban.png"
bannerrecent = "img/hexban.png"
date = "2018-05-01T13:36:11+10:00"
description = ""
images = []
tags = ["Azure", "Kubernetes"]
title = "K8s Secrets in Azure"
+++

TLDR
---

I have always been very interested in how secrets get stored and injecting into K8s, have you :question: this article will show you one way to do it within Azure using [AKS](https://azure.microsoft.com/en-au/services/container-service/) , [Azure Key Vault](https://azure.microsoft.com/en-gb/services/key-vault/) and [Hexadite ACS Key Vault agent](https://github.com/Hexadite/acs-Key Vault-agent) :bowtie:

:bulb: PS it looks like [KMS providers](https://kubernetes.io/docs/tasks/administer-cluster/kms-provider/) might be the way forward here. But this feature is currently in alpha.

Init Containers
---

I am not sure how I haven't heard of [Init Containers](https://kubernetes.io/docs/concepts/workloads/pods/init-containers/) until now :confused: And from the K8s doco;

> A Pod can have multiple Containers running apps within it, but it can also have one or more Init Containers, which are run before the app Containers are started.
>
> Init Containers are exactly like regular Containers, except:
>
> * They always run to completion.
> * Each one must complete successfully before the next one is started.

This was the key piece of the puzzle I was missing in imaging how this could work :thought_balloon: And it looks like Init Containers are a cool solution for a variety of scenarios :heart_eyes:

Hexadite ACS Key Vault agent
---

As per the [GitHub repo](https://github.com/Hexadite/acs-Key Vault-agent), the Hexadite ACS Key Vault agent does the following;

> * It runs before any other container as an init-container
> * It connects to Azure Key Vault using the cluster's service principle
> * It then grabs the desired secrets and/or certificates from Azure Key Vault and stores them in a shared volume (memory only - tmpfs)
> * If a secret refers to a key that is backing a certificate, both private key and certificate are exported as pem
> * It terminates and let other containers run
> * Finally, other containers have access to the secrets using a shared volume

Sounds pretty cool :sunglasses: so let's give it a whirl

Prerequisites
---

* A running K8s cluster in Azure. I used AKS and instructions on setup can be found [here](https://docs.microsoft.com/en-gb/azure/aks/kubernetes-walkthrough-portal)
* Azure Container Registry (ACR) deployed. Instructions on setup can be found [here](https://docs.microsoft.com/en-gb/azure/container-registry/container-registry-get-started-portal)
* Azure Key Vault deployed. Instructions on setup can be found [here](https://docs.microsoft.com/en-gb/azure/key-vault/quick-create-portal)
* The K8s cluster's Service principal is added to the Access policies of Key Vault
* A secret in Azure Key Vault

Please see the process below I went through to give the K8s cluster's Service principal access to Azure Key Vault; :key:

1. **Get your AKS cluster service principle's Client ID by running the below command**

    `az aks show -g akstest -n mfaks-cluster --query "servicePrincipalProfile.clientId" --output tsv`

    Where *akstest* is the name of your resource group and *mfaks-cluster* is the name of your AKS cluster

2. **In the Azure portal, navigate to your Azure Key Vault service**
    * Click on the Access policies blade and select Add new.
    * Select Key and Secret Management from the template drop down
    * Click Select-principle and paste in your service principle's Client ID and select it.
    * Lastly, click OK

    Please see this screen shot below;

    ![figure 1 - Azure Key Vault settings](/img/hex.png)

    As a side note, I can never remember the names of my service principles :disappointed: so I always refer to them by their clientId

And now the process to create a secret in Azure Key Vault :key:

1. **Add the secret**
    * Click on the Secrets blade of your Azure Key Vault service
    * Click on Generate/Import
    * Add a Name and Value for your secret.
    * Mine is named *hexadite-test01* and the vaule is *shh.....itsasecret*

Ok, let's do it!
---

1. **Clone the Hexadite/acs-keyvault-agent repo** - `git clone https://github.com/Hexadite/acs-keyvault-agent.git`

2. **Build and Push the docker image to ACR** :whale:
    * cd into the folder where you cloned the repo
    * Build the docker container `docker built -t mfriedrich.azurecr.io/hexaditeacskv:0.1 .`
    * Log into ACR `az acr login -n mfriedrich`
    * Push the docker container to ACR `docker push mfriedrich.azurecr.io/hexaditeacskv:0.1`

    I have assumed some ACR knowledge here. Please see [here](https://docs.microsoft.com/en-gb/azure/container-registry/container-registry-get-started-docker-cli#push-the-image-to-your-registry) for a more in depth tutorial on how to push and pull images to and from ACR.

3. **Create a K8s deployment to use the Secret stored in Azure Key Vault**
    * Open the *examples/acs-keyvault-deployment.yaml* in your favourite editor. Mine is VSCode :heart:
    * Edit the following vaules;
        * \<IMAGE PATH\>: should be the name of the image you pushed to ACR. Mine is `mfriedrich.azurecr.io/hexaditeacskv:0.1`
        * \<VAULT_URL\>: the DNS name of your Azure Key Vault, which can be found in the Azure portal. Mine is `https://mfhexadite-test.vault.azure.net/`
        * \<SECRET_KEYS\>: the name of the Azure Key Vault secret we created ealrier. Mine is `hexadite-test01`
        * Delete lines 34 to 54. These are just examples of how to fetch other types of serects, certificates and keys from Azure Key Vault.

    So my initContainer config looks like this;

    ``` yaml
      initContainers:
      - name: Key Vault-agent
        image: mfriedrich.azurecr.io/hexaditeacskv
        env:
        - name: VAULT_BASE_URL
          value: https://mfhexadite-test.vault.azure.net/
        - name: SERVICE_PRINCIPLE_FILE_PATH
          value: /host/azure.json
        - name: SECRETS_FOLDER
          value: /secrets
        - name: SECRETS_KEYS
          value: hexadite-test01
 
        volumeMounts:
        - name: secrets
          mountPath: /secrets

        - name: host-sp
          mountPath: /host/azure.json
          readOnly: true
    ```

4. **Deploy to K8s**

    Run :runner: this command to deploy to K8s `kubectl create -f ./examples/acs-keyvault-deployment.yaml`

5. **Verify**
    * run `kubectl get pods` to get the name of your newly created pod. Mine was *test-Key Vault-b69d694d5-k7gth*
    * run `kubectl exec -it test-Key Vault-b69d694d5-k7gth -c test-app /bin/sh` to ssh into your running container
    * run `ls /secrets/secrets` to see your secret file
    * run `cat /secrets/secrets/hexadite-test01` to view the secret you created in Azure Key Vault

Boom! :boom: :boom: :boom:

:speech_balloon: *I am employed by Microsoft; however, the opinions and views expressed here are my own and do not necessarily reflect those of my employer.*