var CDNManagementClient = require('azure-arm-cdn');
var MsRest = require('ms-rest-azure');
var subscriptionId = process.env.AZURE_SUBSCRIPTION_ID;

MsRest.loginWithServicePrincipalSecret(
    process.env.AZURE_CLIENT_ID,
    process.env.AZURE_CLIENT_SECRET,
    process.env.AZURE_TENANT_ID,
    (err, credentials) => {
        if (err) throw err
        let client = new CDNManagementClient(credentials, subscriptionId);
        var purgeContentPaths = [
            '/*'
        ]
        client.endpoints.purgeContent(process.env.azurerg, process.env.cdnprofile, process.env.cdnendpoint, purgeContentPaths, function (err, result, request, response) {
            if (err) { 
                console.log(err); 
            } else {
                console.log(JSON.stringify(result));
            }
        });
    }
);