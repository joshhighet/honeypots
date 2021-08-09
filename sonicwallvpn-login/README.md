## SonicWall VPN - CVE-2020-5135 Honeypot

Container image running an Apache Web-Server used to emulate a SonicWall device with the use of Apache's ModSecurity plugins.

The az setup script will configure this within an internal VNET, fronting it with an Azure Application Gateway.

Using an App Gateway provides a simplified means of gaining a static, outbound IPv4 address to be indexed by the likes of Shodan to improve potential susceptibility to emerging attacks by broadcasting the running service in the same manor as a vulnerable device or service.

HTTP Headers, Certificate Parameters and HTML Source should resemble a device vulnerable to CVE-2020-5135 to scanners

Shodan Search: [`product:"SonicWALL firewall http config"`](https://www.shodan.io/search?query=product%3A%22SonicWALL+firewall+http+config%22)

[Tripwire Disclosure](https://www.tripwire.com/state-of-security/vert/sonicwall-vpn-portal-critical-flaw-cve-2020-5135/)

[SANS ISC Article](https://isc.sans.edu/diary/rss/26692)

[Vendor PSIRT](https://psirt.global.sonicwall.com/vuln-detail/SNWLID-2020-0010)

[MITRE CVE](https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2020-5135)

clone this repo
```shell
cd 'honeypots/sonicwallvpn-login'
```
recreate the self-signed cerficiates and build the image
```shell
./setup_pki.sh
docker build . msexchange
docker run -p443:443 msexchange
```

once running, check the headers and cert are in order with and browse to it
```shell
curl https://localhost:443 --insecure -I
curl --insecure -vvI https://localhost:443 2>&1 | awk 'BEGIN { cert=0 } /^\* SSL connection/ { cert=1 } /^\*/ { if (cert) print }'
open https://localhost:443
```

> An arbitrary, class A IP address was initially assigned across the solution. This can be changed with the below

    grep -ilr 'OLD_IP' * | xargs -I@ sed -i '' 's/OLD_IP/NEW_IP/g' @

### campaign notes

The Application Gateway was submitted to Shodan at 18:22:37 - Sun 18 Oct 2020 NZDT

    20.193.62.210
      Country                  Australia
      City                     Sydney
      Organization             Microsoft Corporation

      Open Ports:
        80/tcp
        443/tcp
        |-- SSL Versions: TLSv1, TLSv1.1, TLSv1.2

---
***Remote Debugging***

> Trail logs in realtime with the below

    az container attach \
    --name $your-ci-name \
    --resource-group $your-rg

> Gain a shell within the runtime

    az container exec \
    --exec-command "/bin/bash" \
    --name $your-ci-name \
    --resource-group $your-resource-group

> The CI will restart upon failures, but a manual restart can be initiated with

    az container restart \
    --name $your-ci-name \
    --resource-group $your-resource-group

***Container Registry***

> This container is hosted in Azure Container Registry.
> If building or developing locally the following commands may come in handy.

    docker build -t sonicwall5135 .
    docker tag sonicwall5135 $your-cr-url.azurecr.io/pots/sonicwall5135
    docker push thetahoneypots.azurecr.io/pots/sonicwall5135

***PKI for Application Gateway***

> The following commands may help as a reference when rolling certificates.

    az network application-gateway root-cert list \
    --resource-group $your-resource-group \
    --gateway-name $your-appgateway-name

    az network application-gateway ssl-cert list \
    --resource-group $your-resource-group \
    --gateway-name $your-appgateway-name
