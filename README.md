# Sensus
# Branch for Hackathon
Sensus is a web based journal that is like any other journal, except that it uses Natural Language Processing to gage the sentiments of the writer and log it on a calender, mapping it with colors and emojis. The user can, look back at the entries years later and get a sense of how they felt during the time.
Depression is a leading cause of disability worldwide and is a major contributor to the overall global burden of disease. Sensus can also be used as an early detection tool for depression and stress.
Our policy  is to keep Sensus as unopinionated as possible. We provide the user with analytics and and statistics on their happiness quotient.

**We at Sensus aim to build a better, happier, more introspective future!**

## Setup and installation

- [ ] Clone the repository on your system by running the command <br/>
      `git clone https://github.com/SamarthAroraa/Sensus.git`

- [ ] `cd Sensus`

- [ ] Install dependencies <br/>
      `npm install` <br/>
      `cd client` <br/>
      `npm install`

- [ ] Modify your environment variables

  - [ ] For Windows:

    - [ ] Open Control Panel
    - [ ] Go to System Settings
    - [ ] Advanced System Settings
    - [ ] Environment Variables...
    - [ ] Add a new variable, with name GOOGLE_APPLICATION_CREDENTIALS
    - [ ] Set file path to \<path-to-the-project-directory\>/Sensus/config/Sensus-0f50e66c71ef.json
    - [ ] Restart your PC

  - [ ] For MAC:

    - [ ] Add the following at the end of your ~/.bash_profile<br/> `export GOOGLE_APPLICATION_CREDENTIALS="<path-to-the-project-directory>/Sensus/config/Sensus-0f50e66c71ef.json"`

    - [ ] Run `source ~/.bash_profile` in the terminal.

  - [ ] For Ubuntu:

    - [ ] Add the following at the end of your ~/.bashrc<br/> `export GOOGLE_APPLICATION_CREDENTIALS="<path-to-the-project-directory>/Sensus/config/Sensus-0f50e66c71ef.json"`

    - [ ] Run `source ~/.bashrc` in the terminal.
    
    
## Install the following browser extensions:-
- [ ] Redux DevTools
- [ ] React Developer Tools

## To run the frontend and backend together :-

- [ ] `npm run dev`

## To run only the server

- [ ] `npm run server`

## To run only the frontend React app:-

- [ ] `npm run client`

## Navigate to the testing route

Navigate to
`<backend-domain-name>/testing` <br/>
(For development, `<backend-domain-name>` is 127.0.0.1:5000)

server {
    listen 80;
    server_name 52.206.208.78;
    location / {
        proxy_pass http://127.0.0.1:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_redirect off;
     }
}

sudo npm install --unsafe-perm=true --allow-root
http://172.31.67.188/

/home/ubuntu/Sensus
export GOOGLE_APPLICATION_CREDENTIALS="/home/ishant/ishant_linux/Sensus/config/Sensus-0f50e66c71ef.json"