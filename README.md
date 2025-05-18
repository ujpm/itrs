# Citizen Engagement System (ITRS)

A modern web platform for citizens to submit complaints and feedback on public services, with smart routing, transparent tracking, and engaging dashboards.

---


## ✨ Features
- **Landing Page:** Public homepage with clear CTA and navigation.
- **Authentication:** Signup/login (JWT, role-based: citizen/admin).
- **Complaint Submission:**
  - Selectable category cards (Infrastructure, Governance, etc.)
  - Nested dropdowns for subcategory and issue
  - Privacy toggle (public/private)
  - Map picker (Leaflet integration coming soon)
  - File attachment upload (coming soon)
- **Dashboards:**
  - (Planned) Citizen and Admin dashboards for tracking, analytics, and management
- **Modern UI:** Material UI, custom theme, responsive and accessible

## 🛠 Tech Stack
- **Frontend:** React + TypeScript + Vite
- **UI:** Material UI (MUI)
- **Routing:** React Router
- **API Calls:** Axios
- **Map:** Leaflet (via react-leaflet)
- **State:** React hooks

## 🚀 Getting Started
1. **Install dependencies:**
   ```bash
   npm install
   ```
2. **Start the dev server:**
   ```bash
   npm run dev
   ```
3. **Open your browser:**
   Visit [http://localhost:5173](http://localhost:5173)

## 📁 Project Structure
- `src/pages/` — Main pages (Home, Login, Signup, etc.)
- `src/components/` — Reusable UI components (ComplaintForm, MapPicker, etc.)
- `src/data/` — Static data (categories, etc.)
- `src/theme.ts` — Custom Material UI theme

## 🌍 Backend
Backend (Node.js/Express/MongoDB) is in `/backend` (see its README for setup).

---

> Built with ❤️ for civic engagement and better public services.

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config({
  extends: [
    // Remove ...tseslint.configs.recommended and replace with this
    ...tseslint.configs.recommendedTypeChecked,
    // Alternatively, use this for stricter rules
    ...tseslint.configs.strictTypeChecked,
    // Optionally, add this for stylistic rules
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config({
  plugins: {
    // Add the react-x and react-dom plugins
    'react-x': reactX,
    'react-dom': reactDom,
  },
  rules: {
    // other rules...
    // Enable its recommended typescript rules
    ...reactX.configs['recommended-typescript'].rules,
    ...reactDom.configs.recommended.rules,
  },
})
```
