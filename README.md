# Injury Tracking System

## Overview

The Injury Tracking System is a web application designed for organizations, such as the police, to record and track injuries reported by individuals. It offers features for creating, viewing, updating, and deleting injury reports, along with a unique functionality of pinpointing injuries on a body map. The application aims to provide a user-friendly interface for efficient injury management.

## Features Implemented

### Report Management:

- Users can create, view, update, and delete injury reports.
- Injury reports include the reporter's name, date & time of injury.
- Body map functionality allows users to select different areas of injury with automatic labeling.
- Users can provide details of injuries for each selected area.

### List of Reports:

- A table displays injury reports with information such as name, date & time of injury, and date of the report.
- Users can sort reports by various fields.
- Searching through the reports is supported.
- Filtering by start and end dates for report is available.

### User Authentication:

- Users can register with a username and password.
- Authentication options include Google login and email login using Auth0.
- Users can log in, log out of the application.

### UI/UX:

- The application has a clean and responsive interface.
- Ant design libraries are used for a visually appealing design.
- The design is optimized for both desktop and mobile devices.

## Bonus Features Attempted

### Progressive Web App (PWA):

- The application is built as a fully responsive PWA.
- Offline functionality is enabled for a seamless user experience.

### Automatic Location Detection:

- Injury areas on the body map are automatically labeled based on detection.

### Analytics Dashboard:

- An analytics dashboard with visualizations of relevant metrics has been implemented.

## Tech Stack

### Front-end:

- Next.js with Ant design library.

### Back-end:

- Prisma as the ORM.
- PostgreSQL database.

### Authentication:

- Auth0 for user authentication, Google login, and email login.

### Analytics:

- Chart.js for data visualization.

### Progressive Web App (PWA):

- Service workers and other PWA features are implemented.

## Setup Instructions

1. Clone the repository: `git clone https://github.com/deeksharungta/injury-tracking-system.git`
2. Navigate to the project directory: `cd injury-tracking-system`
3. Install dependencies: `npm install`
4. Set up environment variables.
   - DATABASE_URL
   - AUTH0_SECRET
   - AUTH0_BASE_URL
   - AUTH0_ISSUER_BASE_URL
   - AUTH0_CLIENT_ID
   - AUTH0_CLIENT_SECRET
5. Run the application: `npm run dev`

## Deployment

The application is deployed on [Vercel](https://injury-tracking-system-one.vercel.app/).

## Code Structure

The codebase is organized as follows:

- **/components:** React components used throughout the application.

  - BarGraph.tsx
  - Form.tsx
  - Header.tsx
  - InjuriesReported.tsx
  - Layout.tsx
  - PieChart.tsx
  - SideBar.tsx
  - Table.tsx
  - Modal.tsx

- **/pages:** Next.js pages for different routes.

  - **/api:** Backend APIs
  - **/dashboard:**
    - index.tsx
  - **/reports:**
    - index.tsx
    - [id].tsx
    - create.tsx
    - update/[id].tsx

- **/prisma:** Schema model and migrations files.

- **/public:** Public assets.

- **/styles:** Stylesheets for styling components.

- **.env:** Environment configuration file
