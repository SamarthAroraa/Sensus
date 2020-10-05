# Sensus
Sensus is a web based journal that is like any other journal, except that it uses Natural Language Processing to gage the sentiments of the writer and log it on a calender, mapping it with colors and emojis. The user can, look back at the entries years later and get a sense of how they felt during the time.
Depression is a leading cause of disability worldwide and is a major contributor to the overall global burden of disease. Sensus can also be used as an early detection tool for depression and stress.
Our policy  is to keep Sensus as unopinionated as possible. We provide the user with analytics and and statistics on their happiness quotient.

**We at Sensus aim to build a better, happier, more introspective future!**

Project hosted at http://sensusjournal.com

## Contribution Guidelines:- 
 **Note** : All contributions are to be made to the hackathon branch. The hackathon branch is in practice our master branch.
 - [ ] Fork this repository
 - [ ] Clone the forked repository to your sytem
 - [ ] `git branch -a` 
 - [ ] `git checkout origin/hackathon` 
 - [ ] `git checkout hackathon`
 - [ ] `git checkout -b <feature-branch-name> hackathon`
 - [ ] After committing changes to your feature branch, create a pull request. The base branch should be `SamarthAroraa/Sensus: hackathon`

## Setup and installation

- [ ] Clone the repository on your system by running the command <br/>
      `git clone https://github.com/SamarthAroraa/Sensus.git`

- [ ] `cd Sensus`

- [ ] Install dependencies <br/>
      `npm install` <br/>
      `cd client` <br/>
      `npm install`

## Install the Amazon Web Services CLI:- 
- [ ] Follow the instruction on https://docs.aws.amazon.com/cli/latest/userguide/install-cliv2-linux.html 
- [ ] Once the CLI is installed, run the command `aws configure` 
- [ ] Ask for the Access key and Secret ID from one of the project moderators. And enter the Access key and Secret ID when prompted 
## Install the following browser extensions (Recommended):-
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
    server_name ;
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
http://18.222.255.147/

/home/ubuntu/Sensus
export GOOGLE_APPLICATION_CREDENTIALS="/home/ubuntu/Sensus/config/Sensus-0f50e66c71ef.json"

