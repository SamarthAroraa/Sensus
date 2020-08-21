# Sensus

Sensus is a web based journal that is like any other journal, except that it uses Natural Language Processing to gage the sentiments of the writer and log it on a calender, mapping it with colors and emojis. The user can, look back at the entries years later and get a sense of how they felt during the time.
Depression is a leading cause of disability worldwide and is a major contributor to the overall global burden of disease. Sensus can also be used as an early detection tool for depression and stress.
Our policy is to keep Sensus as unopinionated as possible. We provide the user with analytics and and statistics on their happiness quotient.

**We at Sensus aim to build a better, happier, more introspective future!**

## Setup and installation

- [ ] Clone the repository on your system by running the command <br/>
      `git clone https://github.com/SamarthAroraa/Sensus.git`

- [ ] `cd Sensus`

- [ ] Install dependencies <br/>
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

- [ ] Run the server <br/>
      `npm start`

## Navigate to the testing route

Navigate to
`<domain-name>/testing` <br/>
(For development, `<domain-name>` is localhost:5000)
