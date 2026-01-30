# 🌦️ Weather Comparison App 

Tech Stack:

* Next.js (App Router)
* TypeScript
* Jotai (+ jotai/utils)
* Ant Design
* OpenWeather Public API

---

## 🧠 SYSTEM CONTEXT

```txt
You are a senior frontend engineer.
You specialize in Next.js App Router, Jotai state management, Ant Design, and clean architecture.
You write production-ready, well-structured, and readable code.
Always explain architectural decisions briefly before coding.
Prefer simplicity, atomic state design, and good separation of concerns.
```

---

## 🚀 PROJECT GOAL

Build a **Weather Comparison App** that allows users to:

* Compare weather across multiple cities
* View current weather and 5-day forecast
* Manage favorites
* Toggle light/dark theme

The project must demonstrate **proper Jotai state architecture**, performance awareness, and clean Next.js App Router usage.

---

## 🧩 STEP 1 – Project Setup

```txt
Create a new Next.js 14 project using the App Router with TypeScript.

Requirements:
- Use Next.js App Router
- Use TypeScript
- Install and configure:
  - jotai
  - jotai/utils
  - antd
- Configure Ant Design styles properly for App Router
- Prepare a basic layout with Ant Design Layout component
- Use a clean folder structure

Output:
- Project structure
- layout.tsx
- page.tsx (landing page)
- Ant Design setup
```

---

## 🧩 STEP 2 – Global Theme System (Jotai)

```txt
Implement a global Light/Dark theme system.

Requirements:
- Use Jotai for global theme state
- Persist theme using localStorage
- Integrate theme with Ant Design ConfigProvider
- Add a theme toggle (Switch component) in the header

Output:
- themeAtom using atomWithStorage
- Header component with theme switch
- ConfigProvider integration
```

---

## 🧩 STEP 3 – Weather State Architecture (Jotai)

```txt
Design the Jotai state architecture for the weather domain.

Requirements:
- Atom for selected cities (array of city names)
- Atom family for current weather per city (async atom)
- Atom family for 5-day forecast per city (async atom)
- Atom for favorite cities (persisted)
- Derived atom for comparison data

Rules:
- Use atomFamily where appropriate
- Do NOT put UI logic inside atoms
- Keep atoms colocated in a weather/atoms folder

Output:
- atoms/weatherAtoms.ts
- atoms/uiAtoms.ts
- Explanation of state relationships
```

---

## 🧩 STEP 4 – API Layer (Next.js Route Handlers)

```txt
Create API routes to communicate with OpenWeather API.

Requirements:
- Use Next.js Route Handlers (app/api)
- Create:
  - /api/weather?city=
  - /api/forecast?city=
- Store API key in environment variables
- Handle errors and invalid city names gracefully
- Always return normalized JSON data (only required fields)

Output:
- Route handler files
- Example response structure
```

---

## 🧩 STEP 5 – City Search & Selection UI

```txt
Build a city search and selection feature.

Requirements:
- Input for city name
- Button to add city to comparison list
- Prevent duplicate cities
- Show selected cities as removable tags
- Use Ant Design components only

State rules:
- Use Jotai selectedCitiesAtom
- UI components must not fetch data directly

Output:
- CitySearch component
- SelectedCities component
```

---

## 🧩 STEP 6 – Weather Display Components

```txt
Create weather display components for comparison.

Requirements:
- WeatherCard component for a single city
- CompareTable component for multi-city comparison
- Show:
  - Temperature
  - Humidity
  - Wind speed
  - Weather condition
- Use Jotai async atoms for data
- Use React Suspense and fallback loading

Output:
- WeatherCard.tsx
- CompareTable.tsx
- Suspense integration
```

---

## 🧩 STEP 7 – Forecast Chart

```txt
Implement a 5-day weather forecast chart.

Requirements:
- Fetch forecast data using Jotai atomFamily
- Display temperature trends for selected cities
- Use a chart library (Recharts or Chart.js)
- Keep chart logic separate from state logic

Output:
- ForecastChart component
- Data transformation logic
```

---

## 🧩 STEP 8 – Favorites Feature

```txt
Implement a favorite cities feature.

Requirements:
- Users can mark/unmark cities as favorites
- Favorites persist in localStorage
- Favorite cities are highlighted in UI
- Favorites can be quickly re-added to comparison

State rules:
- Use atomWithStorage
- Do not duplicate weather data in favorites

Output:
- Favorite button UI
- Favorite cities list
```

---

## 🧩 STEP 9 – Error & Loading Handling

```txt
Improve UX with proper loading and error handling.

Requirements:
- Use jotai/utils loadable for async atoms
- Show loading spinners (Ant Design Spin)
- Display friendly error messages
- App should not crash on API failure

Output:
- loadable atoms
- Error UI states
```

---

## 🧩 STEP 10 – Performance & Cleanup

```txt
Optimize performance and code quality.

Requirements:
- Ensure minimal re-rendering
- Use atomic subscriptions correctly
- Clean up unused atoms
- Ensure components are reusable
- Add comments where architectural decisions matter

Output:
- Final optimized code
- Brief explanation of performance considerations
```

---

## 🧩 STEP 11 – Production & Portfolio Ready

```txt
Prepare the project for production and portfolio use.

Requirements:
- Add README.md explaining:
  - Project overview
  - Tech stack
  - Jotai architecture
  - How to run locally
- Ensure environment variables are documented
- Confirm project is deployable to Vercel

Output:
- README.md
- Final project checklist
```
---

✨ End of Prompt
