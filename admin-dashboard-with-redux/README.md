# Admin Dashboard with Redux

A modern, responsive Admin Dashboard built with Next.js 16 (App Router), Redux Toolkit, and Ant Design. This project demonstrates advanced state management, API integration using RTK Query, and real-time payment processing with Stripe.

## 🚀 Features

- **Authentication System**: Secure login flow using DummyJSON auth.
- **Product Management**:
  - View paginated product lists.
  - View detailed product information.
  - Create and edit products (simulated API calls).
- **User Management**:
  - View user lists and profiles.
- **Shopping Cart**:
  - Add/Remove items.
  - Persistent cart state using `redux-persist`.
  - Real-time total calculation.
- **Stripe Integration**:
  - Fully functional Stripe Checkout flow in development mode.
  - Success and Cancel payment handling.
- **Modern UI/UX**:
  - Built with Ant Design v6 components.
  - Styled with Tailwind CSS v4.
  - Responsive layout with Sidebar navigation.
- **Performance**:
  - Image optimization using `next/image`.
  - Efficient data fetching and caching with RTK Query.

## 🛠️ Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router, Turbopack)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **State Management**:
  - [Redux Toolkit](https://redux-toolkit.js.org/) (Slices, Store configuration)
  - [RTK Query](https://redux-toolkit.js.org/rtk-query/overview) (Data fetching & Caching)
  - [Redux Persist](https://github.com/rt2zz/redux-persist) (Local storage persistence)
- **UI Component Library**: [Ant Design](https://ant.design/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Payments**: [Stripe](https://stripe.com/)
- **Icons**: Ant Design Icons

## ⚙️ Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (v18 or higher)
- npm or yarn

You will also need a [Stripe](https://stripe.com/) account for the checkout functionality.

## 📦 Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd admin-dashboard-with-redux
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Environment Setup**
   Create a `.env.local` file in the root directory and add your Stripe keys:

   ```env
   # Stripe Configuration
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
   STRIPE_SECRET_KEY=sk_test_...
   ```

   > **Note**: You can get these keys from your Stripe Dashboard (Developers > API keys).

4. **Run the Development Server**

   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open the Application**
   Visit [http://localhost:3000](http://localhost:3000) in your browser.

## 📂 Project Structure

```
src/
├── app/
│   ├── api/             # Next.js API Routes (Stripe session)
│   ├── dashboard/       # Protected Dashboard Routes
│   │   ├── cart/        # Shopping Cart & Checkout
│   │   ├── products/    # Product Management
│   │   └── users/       # User Management
│   ├── login/           # Authentication Page
│   ├── providers.tsx    # Redux & Antd Providers
│   └── layout.tsx       # Root Layout
├── lib/                 # Utility functions & Redux setup
│   ├── store.ts         # Redux Store Configuration
│   ├── features/        # Redux Slices & Services
│   └── hooks.ts         # Typed Redux Hooks
└── components/          # Reusable UI Components
```

## 🔧 Key Implementations

### Redux Toolkit & RTK Query

The project uses `createSlice` for synchronous state (like auth and cart) and `createApi` (RTK Query) for asynchronous data fetching (products, users). This ensures a clean separation of concerns and efficient caching.

### Stripe Checkout

The checkout process creates a Stripe Session via a server-side API route (`/api/checkout_sessions`). The client then redirects to the secure Stripe hosted payment page.

### Ant Design Theme

Ant Design is configured with a custom theme and integrated into the Next.js App Router using `@ant-design/nextjs-registry` to ensure proper server-side rendering (SSR) of styles.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## 📝 License

This project is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).
