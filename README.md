# Rick and Morty Resident Details App

This is a web application built with React and Next.js that allows users to view details about residents from the Rick and Morty universe. Users can see information such as the resident's name, status, species, gender, origin, location, and the episodes they appeared in. Additionally, users can add notes about each resident, which are persisted using IndexedDB.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [Design Decisions](#design-decisions)
- [Future Improvements](#future-improvements)

## Features

- View details about a resident, including name, status, species, gender, origin, location, and episodes.
- Add notes about a resident, which are persisted locally using IndexedDB.
- Navigate back to the home page using the back button.

## Technologies Used

- React: Used for building the user interface components.
- Next.js: Used for server-side rendering and routing.
- Tailwind CSS: Used for styling the user interface.
- Axios: Used for making HTTP requests to fetch data from the Rick and Morty API.
- IndexedDB: Used for local storage and persistence of notes.

## Installation

1. Clone the repository:
2. Navigate to the project directory:
3. Install dependencies:

## Usage

1. Start the development server:

2. Open your web browser and navigate to `http://localhost:3000`.

## Design Decisions

### Styling

- Tailwind CSS was chosen for styling due to its utility-first approach, which provides flexibility and ease of use.
- The design follows a simple and intuitive layout to ensure a user-friendly experience.
- Colors and typography were chosen to match the aesthetic of the Rick and Morty universe.

### Data Fetching

- Axios was chosen for making HTTP requests due to its simplicity and flexibility.
- Resident details and episode data are fetched from the Rick and Morty API.
- Notes are stored locally using IndexedDB to provide offline functionality and persistence.

### Routing

- Next.js was chosen for server-side rendering and routing to improve performance and SEO.
- Dynamic routing is used to handle resident details pages with dynamic IDs.

## Future Improvements

- Implement authentication and user accounts to allow users to save notes across devices.
- Add search functionality to filter residents by name, species, or location.
- Improve error handling and add loading indicators to provide better feedback to users.
- Implement pagination for residents and episodes to improve performance with large datasets.
