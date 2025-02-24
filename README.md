Task Manager
Introduction

The Laravel Task Manager is a full-featured task management application built with Next.js (frontend). It allows users to create, edit, delete, and update task statuses, ensuring efficient task tracking and organization.

Features

User Authentication (Login/Logout)

Task CRUD Operations (Create, Read, Update, Delete),

Task Status Updates (Pending/Completed),

Due Date Management,

Modern UI with TailwindCSS,

State Management using Redux,

Frontend:

Next.js (React Framework),

Redux Toolkit (State Management),

Tailwind CSS (Styling),

Axios (API Requests),

Clone the repository:

git clone https://github.com/KingNtuk/TaskManagerFrontend
cd TaskManagerFrontend
npm install
npm run dev

API Endpoints:

Method      Endpoint            Description

GET         /tasks          Fetch all tasks

POST        /tasks          Create a new task

PUT         /tasks/{id}     Update a task

DELETE      /tasks/{id}     Delete a task


Usage:

Login to the application.

Create tasks by adding a title, description, and due date.

Mark tasks as completed or pending.

Edit or delete tasks as needed.