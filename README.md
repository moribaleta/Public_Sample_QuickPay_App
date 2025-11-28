# QuickPay App

# created by Gabriel Mori Baleta

A modern payment processing application built with React, TypeScript, and Vite that integrates with external payment APIs.

## 🚀 Features

- **Fast Development**: Built with Vite for lightning-fast HMR and build times
- **Type Safety**: Full TypeScript support for better development experience
- **API Integration**: Seamless integration with external payment APIs
- **Responsive Design**: responsive user interface
- **Modern Architecture**: Clean, maintainable React component structure

## 🛠️ Tech Stack

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: CSS Modules / Styled Components / Tailwind
- **API Integration**: Fetch API
- **Routing**: Tanstack/React-Router
- **Query**: Tanstack/React-Query

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (version 16 or higher)
- npm

## 🔧 Installation FE 

1. Clone the repository:

```bash
git clone https://github.com/moribaleta/Public_Sample_QuickPay_App.git
cd Public_Sample_QuickPay_App
```

2. Install dependencies:

```bash
cd FE
npm install
```

## 🚀 Running the FE Application

### Development Mode

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## 📁 Project Structure

```
BE
* //prepopulated mock api used by the FE
FE
* public
* src
  * assets - contains the images/resources to be displayed
  * hooks - contains util hooks that are used throughout the FE folder
  * pages - contains all the page components
  * routes - contains all the routing structure using tanstack/react-router
  * services - contains all BE communication logics
App.tsx
....
```

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Installion BE

from root folder
```bash
cd BE
npm install
```

### Development Mode

```bash
npm run dev
```

## NOTES

currently to simplify access on BE it uses CORS and only fixed to localhost:5174
