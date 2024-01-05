# Improv Pal

This is a ChatGTP integrated app that lets you practice improve with a virtual improv Pal. 


## Features

- Complete ChatGTP integration for the virtual improv partner.
- Real time chat data streaming using socket.io
- After Action Evaluation using ChatGTP functions and prompt engineering.
- A selection of different improv partner/prompt.


## Run Locally

Clone the project

```bash
  git clone https://github.com/guy-jerome/Improv-Pal.git
```

Go to the project directory

```bash
  cd Improv-Pal
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  cd server npm start
  cd client npm run dev
```


## Screenshots

Pal Selection Screen:

![App Screenshot](Screenshot%202024-01-05%20162904.png)

Chatting Screen:

![App Screenshot](Screenshot%202024-01-05%20162932.png)

Evaluation Screen:

![App Screenshot](Screenshot%202024-01-05%20163018.png)




## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`CHATGPT_API_KEY`

These are optional for a future feature:

`PINECONE_API_KEY`

`PINECONE_ENVIRONMENT`

`PINECONE_INDEX`




## Tech Stack

**Client:** React, axios

**Server:** Node, Express, Pinecone, socket.io


## Lessons Learned

Prompt Engineering can be one of the hardest and more time consuming parts of any LLM based application. LLM's tend to be very weak critics, well mainly ChatGTP3-turbo, GTP-4 is a bit too slow and costly for an application like this one.


## Acknowledgements

 - [Awesome Readme Templates](https://awesomeopensource.com/project/elangosundar/awesome-README-templates)
 - [Awesome README](https://github.com/matiassingers/awesome-readme)
 - [How to write a Good readme](https://bulldogjob.com/news/449-how-to-write-a-good-readme-for-your-github-project)

- [Pal images](https://www.freepik.com/free-vector/hand-drawn-profile-icons-collection_17789166.htm#query=cartoon%20profile&position=20&from_view=keyword&track=ais&uuid=0fc6e6b1-ebdc-4771-8e32-fc405a47b4b1")

- [Background images](https://www.freepik.com/free-vector/hand-drawn-flat-groovy-psychedelic-background_17743470.htm#query=funky%20background&position=3&from_view=keyword&track=ais&uuid=860a2e23-d1b6-4f66-9ff5-d1bcb414002b")

- [Improve Rules](https://www.pantheater.com/rules-of-improv.html)
