## Microsoft Exchange OWA

### get going

clone this repo
```shell
cd 'honeypots/msexchange'
```
change the placeholder IP (localhost) to your external address with
```shell
grep -ilr '127.0.0.1' * | xargs -I@ sed -i '' 's/127.0.0.1/PUT_EXTIP_HERE/g' @
```
recreate the self-signed cerficiates
```shell
mkdir pki && ./setup_pki.sh
```
build the image
```shell
docker build . msexchange
docker run -p443:443 msexchange
```
once running, check the headers and cert are in order with and browse to it
```shell
curl https://localhost:443 --insecure -I
curl --insecure -vvI https://localhost:443 2>&1 | awk 'BEGIN { cert=0 } /^\* SSL connection/ { cert=1 } /^\*/ { if (cert) print }'
open https://localhost:443
```

### cloudhosting

ensure you have the gcloud cli toolkit installed authenticated before proceeding

> this runs the container image in a container compute instance (minimalos - cos)

1. create a new googlecloud project and enable the container registry api
2. run setup_gcp_host.sh

---
