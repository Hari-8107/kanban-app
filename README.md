# React + Vite

# Kanban Task Management App

This is a simple Kanban board project built using React and Tailwind CSS.  
The app allows users to add tasks, move them between columns, and delete them.
The project was built within a limited time frame and focuses on clean UI and optimistic updates.

## Live Demo

https://kanban-app-drab-five.vercel.app/board

## How to Run the Project Locally

1. Clone the repository:
   https://github.com/Hari-8107/kanban-app.git

2. Go inside the project folder:
   cd kanban-app

3. Install dependencies:
   npm install

4. Start the development server:
   npm run dev

Then open the local server link shown in the terminal.

## Optimistic UI Explanation

When a task is moved from one column to another:

- The UI updates immediately without waiting for the API.
- A simulated API call is made in the background.
- If the API call succeeds, nothing changes.
- If it fails, the task is moved back to its previous state.

This approach improves user experience by making the app feel faster.

## Trade-offs & Decisions

- Used a fake API call instead of a real backend to simulate real-world behavior.
- Managed state using React's useState for simplicity.
- Did not add database persistence to keep the focus on UI logic.
- Styling was done using Tailwind CSS for faster development.

## Tech Stack
- React
- Vite
- Tailwind CSS
- React Router
- React Hot Toast

