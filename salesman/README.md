# Salesman Tracker

A modern React web application for real-time and historical tracking of salesmen on a map. Built with Vite for fast development and a clean, modular codebase.

---

## Features

- **Live Tracking:** View salesmen’s current locations on an interactive map.
- **Historical Tracking:** Playback and visualize past movements with timeline controls.
- **Responsive UI:** Professional, modern design for desktop and mobile.
- **Custom Hooks:** Clean logic for geolocation, playback, and data management.
- **Centralized State:** Easy-to-maintain salesman data store.
- **Mock Data:** Simulate tracking for development and testing.

---

## Project Structure

```
salesman/
├── public/
│   ├── index.html
│   └── vite.svg
├── src/
│   ├── App.jsx, App.css, index.css, main.jsx
│   ├── assets/
│   │   └── react.svg
│   ├── components/
│   │   ├── common/
│   │   │   ├── Header.jsx
│   │   │   └── Sidebar.jsx
│   │   ├── live-tracking/
│   │   │   ├── LiveMap.jsx
│   │   │   ├── LiveTrackingPage.jsx
│   │   │   ├── SalesmanList.jsx
│   │   │   └── SalesmanMarker.jsx
│   │   ├── historical-tracking/
│   │   │   ├── HistoricalMap.jsx
│   │   │   ├── HistoricalTrackingPage.jsx
│   │   │   ├── PlaybackControls.jsx
│   │   │   ├── SpeedSelector.jsx
│   │   │   └── TimelineSlider.jsx
│   │   ├── hooks/
│   │   │   ├── useGeolocation.jsx
│   │   │   ├── usePlayback.jsx
│   │   │   └── useSalesmanData.jsx
│   │   ├── store/
│   │   │   └── salesmanStore.jsx
│   │   └── utils/
│   │       ├── dateHelpers.jsx
│   │       ├── mapHelpers.jsx
│   │       └── mockData.jsx
├── .gitignore
├── eslint.config.js
├── index.html
├── package.json
├── README.md
└── vite.config.js
```

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v16+ recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation

```sh
git clone https://github.com/<your-username>/<repo-name>.git
cd salesman
npm install
```

### Running the App

```sh
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## Scripts

- `npm run dev` — Start development server
- `npm run build` — Build for production
- `npm run preview` — Preview production build

---

## Technologies Used

- **React** — UI library
- **Vite** — Fast build tool
- **date-fns** — Date utilities
- **Custom Hooks & Context** — State management
- **CSS** — Styling

---

## Customization

- Update mock data in `src/components/utils/mockData.jsx`
- Adjust styles in `src/App.css` and component CSS files
- Add new features or pages in `src/components/`

---

## License

MIT

---

## Author
Dhruv Jani
