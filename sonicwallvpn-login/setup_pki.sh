domain=172.16.2.4
commonname=172.16.2.4
country=US
state=California
locality=Sunnyvale
organization='HTTPS Management Certificate for SonicWALL (self-signed)'
organizationalunit='HTTPS Management Certificate for SonicWALL (self-signed)'
openssl genrsa -des3 \
-passout pass:sonicwallcrtkey \
-out pki/keypair.key 2048
openssl rsa -passin pass:sonicwallcrtkey \
-in pki/keypair.key \
-out pki/server.key
openssl req -new \
-subj "/\
C=$country/\
ST=$state/\
L=$locality/\
O=$organization/\
OU=$organizationalunit/\
CN=$commonname" \
-key pki/server.key \
-out pki/server.csr
openssl x509 -req \
-days 42069 \
-in pki/server.csr \
-signkey pki/server.key \
-out pki/server.crt
#openssl x509 \
#-inform PEM \
#-in pki/cacert.pem \
#-outform DER \
#-out pki/certificate.cer
#app gw requires a pfx, enter password upon request
openssl pkcs12 -export \
-out pki/server.pfx \
-inkey pki/server.key \
-in pki/server.crt
cp pki/server.crt pki/server.cer
