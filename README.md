# Chill Gamer: A Game Review Application

Welcome to **Chill Gamer**, a user-friendly game review application designed to explore and share game reviews effortlessly. This repository contains the client-side code of the application, along with documentation to help you understand its features and functionalities.

**Live site link:** [Chill Gamer frontend](https://chill-gamer-1.netlify.app/) 

## Key Features
- **User Authentication:** Safe and secure login and registration using email/password, along with google login option.
- **Review Management:** Users can easily add, update, or delete reviews they’ve submitted.
- **Game Watchlist:** Logged-in users can manage a personalized watchlist of games they want to explore further.
- **Dynamic Sorting and Filtering:** Allows users to sort and filter reviews based on ratings and game genres.
- **Responsive Design:** Works on mobile, tablet, and desktop for a seamless user experience across all devices.

## Table of Contents
1. [Installation](#installation)
2. [Usage](#usage)
3. [Technologies Used](#technologies-used)
4. [Features](#features)

## Installation
To run this application locally:
1. Clone this repository:
   ```bash
   git clone https://github.com/programming-hero-web-course2/b10-a10-client-side-mes-shahadat.git
   ```
2. Navigate to the project directory:
   ```bash
   cd b10-a10-client-side-mes-shahadat
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

### Environment Variables
Make sure to create a `.env.local` file and add your Firebase credentials to hide sensitive information.

**Ex:**  
```plaintext
VITE_apiKey=your-api-key
VITE_authDomain=your-auth-domain
VITE_projectId=your-project-id
VITE_storageBucket=your-storage-bucket
VITE_messagingSenderId=you-sender-id
VITE_appId=1:you-app-id
```

## Usage
1. Start the server:
   ```bash
   npm start
   ```
2. Open your browser and go to `http://localhost:5173`.

## Technologies Used
- **Frontend:** React.js, Tailwind, daisyUI
- **Authentication:** Firebase
- **Hosting:** Netlify (Front-end)

## Features
- **Navbar**: Contains links to `Home`, `All Reviews`, `Add Review`, `My Reviews`, and `My Watchlist`, adjusting to show appropriate options based on user authentication status.
- **Home Page**: Includes a banner slider, Highest Rated Games section, and additional engaging sections.
- **Review Pages**: Interactive pages for adding, updating, viewing, and deleting reviews with clear instructions communicated through toast alerts.
- **404 Page**: User-friendly navigation to handle non-existent pages.
- **Dark/Light Theme Toggle**: Stored user theme preferences in browser local storage.

## package used 
-	React Awesome reveal 
-	React-tooltip
