domain='westus.eastus.cloudapp.azure.com'
commonname='westus.eastus.cloudapp.azure.com'
country=US
state=Washington
locality=Redmond
organization='westus.eastus.cloudapp.azure.com'
organizationalunit='westus.eastus.cloudapp.azure.com'

openssl genrsa -des3 \
-passout pass:omipot \
-out pki/keypair.key 2048
openssl rsa -passin pass:omipot \
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

openssl pkcs12 -export \
-out pki/server.pfx \
-inkey pki/server.key \
-in pki/server.crt
cp pki/server.crt pki/server.cer