# 🎨 Zero Trust Viewer

A single-page React app built with **TypeScript** and **Material‑UI**, designed to display key Zero Trust Platform data – Policies, Assets, and Events – with search, filtering, pagination, and responsive layout.

---



## 🧩 Features

- **Three distinct pages**: Policies, Assets, Events  
- **Search** with debounce for efficient filtering  
- **Client-side pagination**  
- **Styled data tables** with chips, icons, action buttons  
- **Mock loading state** and spinner  
- **Material‑UI theming** and consistent design  



---

## 🚀 Quickstart

1. Clone the repo  
   ```bash
   git clone https://github.com/Rohan-Kumar-Gupta/zero-trust-viewer.git
   cd zero-trust-viewer
   ```
2. Install dependencies
  ```bash
  npm install
  ```

3. Run the app
  ```bash
  npm start
  ```
4. Open your browser to http://localhost:3000



---

## 🧠 Architecture & Key Decisions
- React 18 + TypeScript for component safety

- Material‑UI:

- AppBar, Drawer, Table, Chip etc.

- Responsive Drawer (temporary on mobile, permanent on desktop)

- Routing with react-router-dom for SPA navigation

- Reusable Loader component with CircularProgress

- Debounced search using setTimeout hooks for each page

- Mock data under src/data/*.ts and loading via client-side delays


---

## 🎯 Assumptions & Trade-offs
- All data is mock, loaded locally with delays — no backend integration

- Simple pagination/filtering done in-browser; no need for server-side logic

- Fixed rows per page (6)

- Basic table layout, without advanced grid features like reordering or resizing

---

## 🛠️ Future Improvements
- Add sorting, and dynamic rows‑per‑page selection

- Integrate Zustand to share pagination/search state across pages

- Use MUI Data Grid for advanced table features

- Add dark mode toggle and theme customization

- Replace mock data with backend API integration (GraphQL/REST)

---
## 📁 Project Structure

```bash
src/
├── components/
│   └── Loader.tsx
|   ├── Header.tsx
│   └── Sidebar.tsx
├── data/
│   ├── policies.ts
│   ├── assets.ts
│   └── events.ts
├── layout/
│   └── AppLayout.tsx
├── pages/
│   ├── Policies.tsx
│   ├── Assets.tsx
│   └── Events.tsx
├── utils/
│   ├── index.tsx
│   └── constants.tsx
├── App.tsx
├── index.tsx

```
## ✅ Usage Summary
|     Page      |       Search Field        |                     Table Columns & Highlights                  |
|---------------|---------------------------|-----------------------------------------------------------------|
|    Policies   |  filters on anyThing      | Name, Criteria (colored chips), Description, Score, Edit/Delete |
|    Assets     |  filters on anyThing      | Type icon, Name, Tags, OS Family, Impact (color-coded), Status  |
|    Events     |  filters on anyThing      | Timestamp, Event Type, Source IP, User, Status (chips)          |


```

Let me know how you’d like to enhance it further!

```
