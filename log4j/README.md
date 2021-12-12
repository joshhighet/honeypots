![](https://avatars0.githubusercontent.com/u/2897191?s=70&v=4)

# Log4j RCE [CVE-2021-44228](https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2021-44228)

| doc | link |
|---|---|
| Exploitation Detection Methods | https://gist.github.com/Neo23x0/e4c8b03ff8cdf1fa63b7d15db6e3860b |
| Exposure Attack Surface | https://github.com/YfryTchsGD/Log4jAttackSurface |
| Technical Blog - Lunasec | https://www.lunasec.io/docs/blog/log4j-zero-day/ |
| Mitigation Advice - Cloudflare | https://blog.cloudflare.com/cve-2021-44228-log4j-rce-0-day-mitigation/  |
| Apache Notes | https://logging.apache.org/log4j/2.x/security.html |
| CERT NZ Advisory | https://www.cert.govt.nz/it-specialists/advisories/log4j-rce-0-day-actively-exploited/ |
| Theta Advisory | https://www.theta.co.nz/news-blogs/cyber-security-blog/critical-security-advisory-log4j-vulnerability/ |
| Threat Hunting FQL - CrowdStrike | https://www.reddit.com/r/crowdstrike/comments/rda0ls/20211210_cool_query_friday_hunting_apache_log4j/ |
| Vulnerability Analysis & Mitigations - CrowdStrike | https://www.crowdstrike.com/blog/log4j2-vulnerability-analysis-and-mitigation-recommendations/ |
| Incident Timeline - Cloudfalre | https://blog.cloudflare.com/how-cloudflare-security-responded-to-log4j2-vulnerability/ |
| Log4j Dependents - Open Source Insights | https://deps.dev/maven/log4j%3Alog4j/1.2.17/dependents |
| Honeynet Analysis - Greynoise | https://www.greynoise.io/viz/query/?gnql=tags%3A%22Apache%20Log4j%20RCE%20Attempt%22 |
| SANS ISC Forum | https://isc.sans.edu/forums/diary/RCE+in+log4j+Log4Shell+or+how+things+can+get+bad+quickly/28120 |
| GitHub  Advisory | https://github.com/advisories/GHSA-jfh8-c2jp-5v3q |
| Technical Analysis - Fastly | https://www.fastly.com/blog/digging-deeper-into-log4shell-0day-rce-exploit-found-in-log4j |
| Threat Indicators - Talos | https://blog.talosintelligence.com/2021/12/apache-log4j-rce-vulnerability.html |
| Reddit Thread - Huntress Labs | https://www.reddit.com/r/msp/comments/rdba36/critical_rce_vulnerability_is_affecting_java/ |
| Hashes - Vulnerable Versions & Paths | https://github.com/mubix/CVE-2021-44228-Log4Shell-Hashes |

### Known Vulnerable Applications

> This vulnerability affects countless versions of various platforms and as such, will never be a full list of potentially affected services.

```
N-Able Ncentral
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
VMware Horizon
VMware vCenter Server
VMware HCX
VMware NSX-T Data Center
VMware Unified Access Gateway
VMware WorkspaceOne Access
VMware Identity Manager 
VMware vRealize Operations
VMware vRealize Log Insight
VMware vRealize Automation
VMware Telco Cloud Automation
VMware Site Recovery Manager
VMware Carbon Black Cloud Workload Appliance
VMware Tanzu GemFire
VMware Tanzu Greenplum
VMware Tanzu Operations Manager
VMware Tanzu Application Service for VMs
VMware Tanzu Kubernetes Grid Integrated Edition
VMware Tanzu Observability by Wavefront Nozzle
Healthwatch for Tanzu Application Service
Spring Cloud Services for VMware Tanzu
Spring Cloud Gateway for VMware Tanzu
Spring Cloud Gateway for Kubernetes
API Portal for VMware Tanzu
Single Sign-On for VMware Tanzu Application Service
```

### Basic Testing

> This is not a catch-all test!

1. Head to [canarytokens.org/generate](https://canarytokens.org/generate)
2. Under `Select your token` scroll to the bottom and select `Log4Shell`

<img width="1165" alt="Screen Shot 2021-12-13 at 9 18 18 AM" src="https://user-images.githubusercontent.com/17993143/145728091-de058b32-8f1c-4dd4-9614-ac7039c16b13.png">

3. Enter an email address along with an optional comment to remind you what this was for if it triggers.

> This is useful if you intend on testing more than one site!

<img width="769" alt="Screen Shot 2021-12-13 at 9 20 11 AM" src="https://user-images.githubusercontent.com/17993143/145728139-0777db08-8733-4cb7-bfc8-3855bffbb7a7.png">

4. Copy the output string and attempt to submit this through forms on your site. 
> An equally beneficial test is to set this as your browser's user-agent - See [how to change your user agent](https://www.howtogeek.com/113439/how-to-change-your-browsers-user-agent-without-installing-any-extensions/) 

<img width="473" alt="Screen Shot 2021-12-13 at 9 21 23 AM" src="https://user-images.githubusercontent.com/17993143/145728188-635cecb5-a5a6-4ee7-9199-202346b88be5.png">

4. In the case your test was successful, you'll find an alert has been send to them email youy listed within Step 3



### View Patch Differentials

```shell
git clone https://gitbox.apache.org/repos/asf/logging-log4j2.git
cd logging-log4j2
git fetch --tags
git log -u rel/2.14.1..HEAD -- log4j-core
```
