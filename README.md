# Customer Payments Dashboard

A frontend web application for managing and viewing vendor payment records. Built with React and Vite.

## Overview

Key features include:

- Paginated payments table (12 per page on desktop, 5 on mobile)
- Date range filtering via Start Date and End Date
- Customer name search filter
- Payment detail modal with full transaction information
- Responsive layout — card view on mobile, table view on desktop
- Loading and error states throughout

## Tech Stack

- React
- Vite
- Vanilla CSS

## Live URL

[Customer Payment App](https://customer-payment-app.vercel.app/)

## Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm

### Installation

1. Clone the repository:

```bash
git clone https://github.com/missbaah/customer-payment-app.git
cd customer-payment-app
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open your browser at `http://localhost:5173`

## Project Structure

```
src/
├── api/
│   ├── get-payments.js         # Fetches paginated payments list
│   └── get-payment-details.js  # Fetches single payment by ID
├── components/
│   ├── table.jsx               # Payments table with pagination
│   ├── modal.jsx               # Payment detail modal
│   ├── loading.jsx             # Loading spinner
│   ├── filters.jsx             # Filters table by customer name & dates
│   └── detailrow.jsx           # Reusable label/value row for modal
├── utils/
│   ├── formatDate.js           # Date formatting utility
│   └── useIsMobile.js          # Custom hook for responsive logic
├── App.jsx
└── App.css
```

## API

Base URL: `https://spes.pscgh.com:442/sales-api/api`

| Endpoint            | Description                                                                   |
| ------------------- | ----------------------------------------------------------------------------- |
| `GET /Payments`     | Returns all payments. Accepts optional `StartDate` and `EndDate` query params |
| `GET /Payments/:id` | Returns details for a single payment by ID                                    |

## Known Issues

- The modal width on tablet (`60%`) may feel narrow on some screen sizes — this can be adjusted in the `.modal-content` media query.
- The sidebar is hidden on mobile and tablet. There is currently no alternative navigation for smaller screens.
- No empty state is shown when the date filter or search returns zero results — the table renders blank.
