domain=127.0.0.1
commonname=172.0.0.1
country=NZ
state=SouthPacific
locality=MiddleEarth
organization='Staff Webmail'
organizationalunit='Staff Webmail'
openssl genrsa -des3 \
-passout pass:msexchcrtkey \
-out pki/keypair.key 2048
openssl rsa -passin pass:msexchcrtkey \
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
