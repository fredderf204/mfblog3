var mime = require('mime-types')
var storageManagementClient = require('azure-storage');
var MsRest = require('ms-rest-azure');

var subscriptionId = env.AZURE_SUBSCRIPTION_ID;

MsRest.loginWithServicePrincipalSecret(
    env.AZURE_CLIENT_ID,
    env.AZURE_CLIENT_SECRET,
    env.AZURE_TENANT_ID,
    (err, credentials) => {
        if (err) throw err
        let client = new CDNManagementClient(credentials, subscriptionId);
        var purgeContentPaths = [
            '/*'
        ]
        client.endpoints.purgeContent(env.azurerg, env.cdnprofile, env.cdnendpoint, purgeContentPaths, function (err, result, request, response) {
            if (err) { 
                console.log(err); 
            } else {
                console.log(JSON.stringify(result));
            }
        });
    }
);