#this script assumes the followinf pre-existing artefacts
#log analytics workspace
#virtual network & subnet
#configured application gateway & pip

ACR=#your-acr-name
ACR_URI=/vpn/sonicwall
ACR_SUFFIX=.azurecr.io
ACR_REPO=$ACR$ACR_SUFFIX$ACR_URI

VOL_MOUNT_PATH=/tmp
LOCATION=australiaeast
SHARE_NAME=#your-share-name
ACR_UNAME=#your-acr-name
CI_NAME=#your-ci-name
SUB_NAME=#your-sub-name
VNET_NAME=#your-vnet
LOG_WORKSPACE=#your-loganalytics-workspace
STOR_ACCOUNT_NAME=#your-storageaccount
RESOURCE_GROUP=#your-resourcegroup
SNET_NAME=#your-subnet

#get subscription id
SUB_ID=`az account show \
--subscription $SUB_NAME \
--query id --output tsv`

#create storage account
az storage account create \
--resource-group $RESOURCE_GROUP \
--name $STOR_ACCOUNT_NAME \
--location $LOCATION \
--sku Standard_LRS

#create fileshare on storage account
az storage share create \
--name $SHARE_NAME \
--account-name $STOR_ACCOUNT_NAME

#create blob on storage account
az storage container create \
--name $SHARE_NAME \
--account-name $STOR_ACCOUNT_NAME

#get key for storage account
STORAGE_KEY=`az storage account keys list \
--resource-group $RESOURCE_GROUP \
--account-name $STOR_ACCOUNT_NAME \
--query "[0].value" --output tsv`

#get log analytics workspace id
LA_WORKSPACE_ID=`az monitor log-analytics workspace show \
--resource-group $RESOURCE_GROUP \
--workspace-name $LOG_WORKSPACE \
--query customerId --output tsv`

#get log analytics connection string
LA_SHAREDKEY=`az monitor log-analytics workspace get-shared-keys \
--resource-group $RESOURCE_GROUP \
--workspace-name $LOG_WORKSPACE \
--query primarySharedKey --output tsv`

#get container registry key
ACR_KEY=`az acr credential show \
--name $ACR --resource-group $RESOURCE_GROUP \
--query 'passwords[0].value' --output tsv`

#create container with params
az container create --registry-password $ACR_KEY \
--cpu 1 --memory 1 --ports 80 443 \
--ip-address Private --restart-policy Always \
--azure-file-volume-mount-path $VOL_MOUNT_PATH --os-type Linux \
--location $LOCATION --vnet $VNET_NAME --subnet $SNET_NAME \
--name $CI_NAME --registry-username $ACR_UNAME \
--resource-group $RESOURCE_GROUP --image $ACR_REPO \
--log-analytics-workspace $LA_WORKSPACE_ID \
--log-analytics-workspace-key $LA_SHAREDKEY \
--azure-file-volume-account-key $STORAGE_KEY \
--azure-file-volume-share-name $SHARE_NAME \
--azure-file-volume-account-name $STOR_ACCOUNT_NAME
