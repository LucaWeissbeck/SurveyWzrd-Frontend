# Survey Wzrds Repo for the Frontend

## Frontend

### Build and run instructions:
###Dependency install with:
````npm install````
### Dev Run with
```npm start```
### Prod Build with
````npm run build````

Then, the prod-build files are located at ```./build```
You then have to configure a nginx service with the following configuration to point at the build files.
Sample configuration:
```
server {

        listen 80  default_server;
        listen [::]:80 default_server;

        server_name  _;
        root /pathtothisRepo/build;
        index index.html;

        location / {
                try_files $uri $uri/ =404;
        }
}
```

Use the docker image:  
```docker build -t frontend .```

```docker run -p8080:80 frontend```

### Remark: IP Location tracking is only working in a hosted, externally visited application

You can find a working example here:  
https://e45a7e99-a45e-4ecb-8b43-ec17337b634a.ma.bw-cloud-instance.org/