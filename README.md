# 🚌 Student Transport Complaint Dashboard

A **full-stack web app** where students can submit transport complaints and track their status, while admins can manage and resolve them.  
This is my **first project built with React + Supabase** 🎉 — I focused on building clean UI components with **styled-components** and managing state/data fetching with **React Query**.

---

## 🚀 Features

### 👩‍🎓 Student View
- Submit new transport complaints through a form
- View list of submitted complaints with live status updates (Pending, Resolved, etc.)
- Soft-delete complaints (visible only to student but still available to admin)
- Receive instant toast notifications when complaint status changes

### 👨‍💼 Admin View
- View all student complaints from a shared Supabase table
- Update complaint statuses (e.g. mark as Resolved, In Progress)
- Manage student feedback and notifications
- Role-based access (student vs. admin)

### 🎨 UI & Styling
- Component-based styling with `styled-components`
- Responsive and modern design
- Interactive navigation and sidebar

---

## 🛠️ Tech Stack

- **Frontend**
  - React (functional components, hooks)
  - Styled-components (scoped component styling)
  - React Query (server state management, pagination, filtering)
  - React Hook Form (form handling & validation)
  - React Hot Toast (beautiful notifications)

- **Backend**
  - Supabase (PostgreSQL + Authentication + Row Level Security)
  - Supabase Client SDK (real-time subscriptions for notifications)
 
## ⚙️ Getting Started

1. Clone the repository  
   ```bash
   git clone https://github.com/BanksOnOpps/Transport-Complaint.git
   cd Transport-Complaint
   
## Install Dependencies
npm install

## Start the development server (Vite)
npm run dev
