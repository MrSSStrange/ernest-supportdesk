# Ernest SupportDesk

Support desk interface for managing clinic support tickets, priorities, statuses, filters and internal workflow queues.

## Live Demo

[Open Live Demo](https://mrssstrange.github.io/ernest-supportdesk/)

## Screenshots

### Main Dashboard

<img src="./assets/supportdesk-preview.png" alt="Ernest SupportDesk dashboard" />

### Status Filter

<img src="./assets/supportdesk-status-filter.png" alt="SupportDesk status filter" />

### Priority Select

<img src="./assets/supportdesk-priority-select.png" alt="SupportDesk priority select" />

## Problem

Support teams need a clear queue where clinic requests can be filtered by priority, status and workflow context. A support interface should make urgent tickets visible, keep status updates fast and reduce unnecessary searching during the workday.

## Solution

Ernest SupportDesk is a frontend project focused on support queue logic. It provides ticket cards, priority labels, status updates, filters, local persistence and a dashboard-style layout for internal support workflows.

## Features

- Create clinic support tickets
- Manage request statuses
- Filter requests by status and priority
- Search by clinic, topic or description
- Set ticket priority
- Delete requests
- View request statistics
- Persist data in `localStorage`
- Responsive dashboard layout

## Tech Stack

- React
- TypeScript
- Vite
- CSS
- LocalStorage
- GitHub Pages

## How to Run

```bash
npm install
npm run dev
```

## Project Structure

```text
src
├── components
├── data
├── types
├── App.tsx
└── main.tsx
```

## What I Learned

- Structuring a React interface around business workflow logic
- Modeling ticket status, priority and filtering state in TypeScript
- Building reusable UI components for an internal tool layout
- Persisting frontend state without a backend prototype

## Next Improvements

- Mock API
- Ticket details page
- Comments
- SLA indicator
- Assignee field
- Clinic card
- Pagination

## Author

**Ernest Muzafarov**  
Frontend Developer

[GitHub](https://github.com/MrSSStrange) · [LinkedIn](https://www.linkedin.com/in/ernest-muzafarov-919a323a2/)
