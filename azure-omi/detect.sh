#!/bin/bash
# sweep for open omi ports across virtual machines within an azure account across all subscriptions
# only checks virtual machines for omi service ports - this does not cover all vectors !
# see output omi.scan.vmip

# set -x
# set -e
# set -o pipefail

# proc mangling
trap "trap - SIGTERM && kill -- -$$" SIGINT SIGTERM EXIT

#fetch public ips from vm's
AZ_FETCH_PIP="az network public-ip list --query '[].ipAddress' --output tsv"

# list of az subscriptions
SUBSCRIPTIONS=`az account list --query "[].id" -o tsv`
# count of subscriptions
SUBSCRIPTIONS_COUNT=`echo $SUBSCRIPTIONS | wc -w | sed 's/^ *//g'`
echo "found $SUBSCRIPTIONS_COUNT subscriptions"
COUNTER=0

while read SUBSCRIPTION ; do
    COUNTER=$((COUNTER+1))
    echo "processing subscription $COUNTER of $SUBSCRIPTIONS_COUNT"
    SUBSCRIPTION_NAME=`az account show --subscription ${SUBSCRIPTION} --query name -o tsv`
    echo "subscription name: ${SUBSCRIPTION_NAME}"
    az account set --subscription ${SUBSCRIPTION}
    eval ${AZ_FETCH_PIP} >> omi.target.vmip
done <<< "${SUBSCRIPTIONS}"

echo "found `cat omi.target.vmip | wc -l | sed 's/^ *//g'` ip's"

sudo masscan -p1270,5985,5986 -iL omi.target.vmip -oG omi.scan.vmip