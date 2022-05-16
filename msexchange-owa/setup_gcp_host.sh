#!/bin/bash

set -e

if [[ -z "${1}" ]] ; then
    printf 'container registry name: ' && read GCPPROJECTNAME
else
    GCPPROJECTNAME="${1}"
fi

gcloud auth configure-docker gcr.io

GCRPROJECT='gcr.io/'${GCPPROJECTNAME}'/msexchenge'
docker build . -t ${GCRPROJECT}
docker push ${GCRPROJECT}

gcloud compute instances create-with-container \
msexchangepot \
--project ${GCPPROJECTNAME} \
--container-restart-policy always \
--container-image ${GCRPROJECT} \
--boot-disk-auto-delete \
--boot-disk-size 24GB \
--boot-disk-type pd-ssd \
--description 'https://github.com/joshhighet/honeypots' \
--machine-type e2-micro \
--no-restart-on-failure \
--zone australia-southeast1-b

gcloud compute firewall-rules delete default-allow-icmp --project ${GCPPROJECTNAME}
gcloud compute firewall-rules delete default-allow-rdp --project ${GCPPROJECTNAME}
gcloud compute firewall-rules delete default-allow-ssh --project ${GCPPROJECTNAME}

gcloud compute firewall-rules create 'msexch-webservice' \
--project ${GCPPROJECTNAME} \
--allow=tcp:443 \
--description="allow web service traff" \
--direction=INGRESS