# 🌦️ Weather Comparison App

A modern weather comparison application built with **Next.js 14 (App Router)**, **TypeScript**, **Jotai**, and **Ant Design**.

## 🚀 Features

- **Compare Cities**: Add multiple cities to compare current weather conditions side-by-side.
- **5-Day Forecast**: Visualize temperature trends with an interactive chart.
- **Favorites**: Save your favorite cities for quick access (persisted locally).
- **Theme System**: Toggle between Light and Dark modes.
- **Clean Architecture**: Atomic state management with Jotai and Server-Side API routes.

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **State Management**: Jotai (Atoms, Atom Families, Persistence, Loadables)
- **UI Component Library**: Ant Design
- **Charts**: Recharts
- **API**: OpenWeatherMap
- **Styling**: CSS-in-JS (Ant Design v5)

## 📦 Installation

1. **Clone the repository:**

   ```bash
   git clone <repository-url>
   cd weather-comparision-with-jotai
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   - Copy `.env.local.example` to `.env.local`
   - Add your OpenWeather API key:
     ```env
     OPENWEATHER_API_KEY=your_api_key_here
     ```
     _(Note: The app includes a mock mode if no API key is provided, returning simulated data.)_

4. **Run the development server:**

   ```bash
   npm run dev
   ```

5. **Open:** [http://localhost:3000](http://localhost:3000)

## 🏗️ Architecture Overview

### Jotai State Management

The application uses **Jotai** for atomic state management, located in `atoms/weatherAtoms.ts`.

- **`selectedCitiesAtom`**: Tracks the list of cities currently being viewed.
- **`weatherFamily` & `forecastFamily`**: `atomFamily` factories that fetch and cache data per city.
- **`favoriteCitiesAtom`**: Uses `atomWithStorage` to persist favorites to `localStorage`.
- **Derived Atoms**: `allWeatherAtom` and `allForecastAtom` aggregate data for table/chart views.
- **Loadables**: `weatherFamilyLoadable` handles async states (loading/error) for granular UI feedback.

### Next.js API Routes

To keep the client lightweight and secure the API key, all external requests are proxied through Next.js Route Handlers:

- `/api/weather?city=London`
- `/api/forecast?city=London`

These endpoints also normalize the data structure before sending it to the client.

## 📝 Deployment

This project is optimized for deployment on **Vercel**.

1. Push your code to GitHub.
2. Import the project in Vercel.
3. Add the `OPENWEATHER_API_KEY` environment variable in Vercel settings.
4. Deploy!

---

Built with ❤️ using Next.js and Jotai.
