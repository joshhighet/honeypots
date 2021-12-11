![](https://avatars0.githubusercontent.com/u/2897191?s=70&v=4)

# Log4j RCE [CVE-2021-44228](https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2021-44228)

| doc | link |
|---|---|
| Theta Full Advisory | https://www.theta.co.nz/news-blogs/cyber-security-blog/critical-security-advisory-log4j-vulnerability/ |\
| Exploitation Detection | https://gist.github.com/Neo23x0/e4c8b03ff8cdf1fa63b7d15db6e3860b |
| Technical Blog | https://www.lunasec.io/docs/blog/log4j-zero-day/ |
| Mitigation Advice | https://blog.cloudflare.com/cve-2021-44228-log4j-rce-0-day-mitigation/  |
| Apache Notes | https://logging.apache.org/log4j/2.x/security.html |
| CERT NZ Advisory | https://www.cert.govt.nz/it-specialists/advisories/log4j-rce-0-day-actively-exploited/ |
| CrowdStrike Hunt | https://csfalcon.thetadev.services/#/fql/misc?id=apache-log4j |
| Cloudflare Incident Timeline | https://blog.cloudflare.com/how-cloudflare-security-responded-to-log4j2-vulnerability/ |

### Known Vulnerable Applications

```
N-Able Ncentral
Vmware VSCA
Logstash
Service Now
Redis
Splunk
Confluence
Jira
Jenkins
Webex
Kafka
Steam
ManageEngine Service Desk Plus
Sonarcube
Palo Alto Panorama
IBM Qradar
Webex
Connectwise
ESET's Management Portals
Apache Struts2
Apache Solr
Apache Druid
Apache Flink
```

### View Patch Differentials

```shell
git clone https://gitbox.apache.org/repos/asf/logging-log4j2.git
cd logging-log4j2
git fetch --tags
git log -u rel/2.14.1..HEAD -- log4j-core
```
