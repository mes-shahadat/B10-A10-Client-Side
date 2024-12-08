# Chill Gamer: A Game Review Application

Welcome to **Chill Gamer**, a user-friendly game review application designed to explore and share game reviews effortlessly. This repository contains both the client-side and server-side code of the application, along with documentation to help you understand its features and functionalities.

## Live Site URL
[Chill Gamer Live Demo](https://chill-gamer-1.netlify.app/) 

## Key Features
- **User Authentication:** Safe and secure login and registration using email/password, along with social media login options.
- **Review Management:** Users can easily add, update, or delete reviews they’ve submitted.
- **Game Watchlist:** Logged-in users can manage a personalized watchlist of games they want to explore further.
- **Responsive Design:** Works on mobile, tablet, and desktop for a seamless user experience across all devices.
- **Dynamic Sorting and Filtering:** Allows users to sort and filter reviews based on ratings and game genres.

## Table of Contents
1. [Installation](#installation)
2. [Usage](#usage)
3. [Technologies Used](#technologies-used)
4. [Features](#features)
5. [Challenges](#challenges)
6. [Contribution](#contribution)
7. [License](#license)

## Installation
To run this application locally:
1. Clone this repository:
   ```bash
   git clone https://github.com/yourusername/chill-gamer.git
   ```
2. Navigate to the project directory:
   ```bash
   cd chill-gamer
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

### Environment Variables
Make sure to create a `.env` file and add your Firebase and MongoDB credentials to hide sensitive information.

## Usage
1. Start the server:
   ```bash
   npm start
   ```
2. Open your browser and go to `http://localhost:5173`.

## Technologies Used
- **Frontend:** React.js, Bootstrap, Lottie React
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Authentication:** Firebase
- **Hosting:** Netlify (Front-end), Vercel (Back-end)

## Features
- **Navbar**: Contains links to Home, All Reviews, Add Review, My Reviews, and Watchlist, adjusting to show appropriate options based on user authentication status.
- **Home Page**: Includes a banner slider, Highest Rated Games section, and additional engaging sections.
- **Review Pages**: Interactive pages for adding, updating, viewing, and deleting reviews with clear instructions communicated through toast alerts.
- **404 Page**: User-friendly navigation to handle non-existent pages.
- **Dark/Light Theme Toggle**: Customization for user preferences.

## package used 
-	React Awesome reveal 
-	React-tooltip



client-side code: https://github.com/programming-hero-web-course2/b10-a10-client-side-mes-shahadat
server-side code: https://github.com/programming-hero-web-course2/b10-a10-server-side-mes-shahadat
live website link: https://chill-gamer-1.netlify.app/
