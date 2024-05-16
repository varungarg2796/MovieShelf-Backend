# MovieShelf!

Movie Shelf is a web application designed to enhance your movie watching experience. 
It allows users to track the movies they've watched, create watchlists for future viewing, and optionally, record details about their experiences, including who they watched with, where they watched it, and how they felt about the movie. 
Additionally, users can rate and review movies and potentially receive recommendations for new movies to watch.

## Installation

First, make sure you have [Node.js](https://nodejs.org/) and [npm](https://www.npmjs.com/) installed.

1. Clone the repository:

```sh
git clone https://github.com/varungarg2796/MovieShelf.git
```

2. Install the dependencies

```sh
cd MovieShelf
npm install
```

3. Postgres setup

Install postgres locally (through docker) and run 

```sh
npm run db-setup
```

4. Start the application
  
```sh
npm run start:dev
```
The application will start running at http://localhost:3000.

API Endpoints
Here are some example cURL commands for the API endpoints:


