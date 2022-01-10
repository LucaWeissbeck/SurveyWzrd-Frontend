# Survey Wzrd (Frontend)
## Installation
### Dependency Installation
````npm install````
        
### Development Run
```npm start```
        
### Production Build:
````npm run build````

The prod-build files are located at ```./build```
You have to configure a nginx service with the following configuration to point at the build files.
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

```docker run -p 80:80 frontend```

<b>Note:</b> IP Location tracking is only working in a hosted, externally visited application

## Architecture & Documentation
The project was documented thoroughly using a multitude of sequence diagrams and ER-diagrams. The business architecture of the project can be seen in the diagram below. Further diagrams can be found <a href="https://github.com/LucaWeissbeck/SurveyWzrd-Frontend/tree/master/docs">in the documentation folder</a>.

<b>Component Description: </b>[Fallstudie - Component_Diagram_Description_06052021.pdf](https://github.com/LucaWeissbeck/SurveyWzrd-Frontend/files/7839135/Fallstudie.-.Component_Diagram_Description_06052021.pdf)



![Fallstudie - Business Architecture_06052021](https://user-images.githubusercontent.com/62757957/148774071-e5791cb0-91f3-4eca-b5a8-ac9ed92376b3.png)



## Preview
<b>Admin Dashboard</b>

<img width="1792" alt="Screenshot 2022-01-10 at 13 08 39" src="https://user-images.githubusercontent.com/62757957/148770727-f91ffa25-8a88-461c-b0a8-77132380e828.png">


<b>Admin Dashboard - Indiviudal Survey Preview</b>

<img width="1284" alt="Screenshot 2022-01-10 at 14 04 15" src="https://user-images.githubusercontent.com/62757957/148771355-426ca0aa-e9ed-4201-8920-c0410941b8e5.png">


<b>Survey Creation</b>

<img width="878" alt="Screenshot 2022-01-10 at 13 04 36" src="https://user-images.githubusercontent.com/62757957/148770791-0d05e098-b4dc-45a6-b314-564b9a51206c.png">


<b>Survey Preview</b> (User is served with IFrame that can be embedded on any website)

<img width="1185" alt=" " src="https://user-images.githubusercontent.com/62757957/148770879-28944de5-d5c1-4bad-b81d-400a2420f517.png">


<b>User Results Preview<b>

<img width="1181" alt="Screenshot 2022-01-10 at 14 11 53" src="https://user-images.githubusercontent.com/62757957/148771734-5c3b3d26-3aa0-4937-af3a-9efa98270786.png">

        
        
<hr>


