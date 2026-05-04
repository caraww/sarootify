Sarootify 🎧
Sarootify is a small experimental music mixer app.

You add a few songs, the app “mixes” them visually, and then suggests a new song using AI.

Features
Add songs to a list
Automatic cover art fetching
Animated mixing interface
AI-powered song recommendation
Progressive Web App (installable)
Tech Stack
React
Node.js (Express proxy)
GPT API
CSS animations
PWA (Service Worker + Manifest)
Installation
Clone the repository:

git clone https://github.com/caraww/sarootify.git

cd sarootify

Install dependencies:

npm install

Run the app
Start the React frontend:

npm start

In another terminal start the proxy server:

node server.js

Frontend will run on:

http://localhost:3000

Proxy server runs on:

http://localhost:3001

How it works
User adds songs.
Covers are fetched from Deezer.
When mixing starts, covers animate.
The list of songs is sent to GPT through the proxy server.
GPT returns a recommended track.