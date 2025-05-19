# Citizen Engagement System (ITRS)

A modern, open-source web platform for citizens to submit complaints and feedback on public services, with smart routing, transparent tracking, and engaging dashboards for both citizens and administrators.

---

## 🌟 Overview
ITRS (Integrated Tracking & Reporting System) empowers citizens to voice concerns and track public service issues, while enabling government agencies to efficiently manage and resolve complaints. The platform features:
- Secure authentication for citizens and admins
- Complaint submission with category, subcategory, privacy, and (coming soon) map/file attachments
- Real-time dashboards for tracking status and analytics
- Transparent feedback loops between citizens and government
- Modern, responsive UI on all devices

## ✨ Features
- **Landing Page:** Public homepage with clear calls to action
- **Authentication:** Signup/login with JWT, role-based access (citizen/admin)
- **Complaint Submission:**
  - Select category (Infrastructure, Governance, etc.)
  - Nested dropdowns for subcategory and issue
  - Privacy toggle (public/private)
  - Map picker (Leaflet integration coming soon)
  - File attachment upload (coming soon)
- **Citizen Dashboard:**
  - Track complaints, view statuses, comment, and receive notifications
  - Visual analytics (heatmaps, stats)
- **Admin Dashboard:**
  - Manage, assign, and resolve complaints
  - Bulk actions, analytics, and communication tools
- **Modern UI:** Material UI (MUI), custom theme, fully responsive and accessible

## 🛠 Tech Stack
- **Frontend:** React, TypeScript, Vite
- **UI:** Material UI (MUI)
- **Routing:** React Router
- **API Calls:** Axios
- **Map:** Leaflet (via react-leaflet)
- **State:** React hooks

## 🚀 Getting Started
1. **Clone the repository:**
   ```bash
   git clone https://github.com/ujpm/itrs.git
   cd itrs
   ```
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Start the development server:**
   ```bash
   npm run dev
   ```
4. **Open your browser:**
   Visit [http://localhost:5173](http://localhost:5173)

## 📁 Project Structure
- `src/pages/` — Main pages (Home, Login, Signup, CitizenDashboard, AdminPage, etc.)
- `src/components/` — Reusable UI components (ComplaintForm, AnalyticsWidgets, MapPicker, etc.)
- `src/data/` — Static data (categories, agencies, etc.)
- `src/theme.ts` — Custom Material UI theme
- `backend/` — (If present) Node.js/Express/MongoDB backend (see its README for setup)

## ⚙️ Configuration
- Environment variables can be managed via `.env` files (see `.env.example` if available).
- For production, set up API endpoints and authentication secrets as needed.

## 🧑‍💻 Contribution Guide
1. Fork this repository and create a new branch for your feature or fix.
2. Run `npm install` and `npm run dev` to start the development server.
3. Make your changes and ensure code quality with `npm run lint` and `npm run build`.
4. Submit a pull request with a clear description of your changes.

### Code Style
- Follow the existing code style (TypeScript, functional components, hooks)
- Use ESLint and Prettier for linting and formatting

## 🚀 Deployment
- The app can be deployed to Cloudflare Pages, Vercel, Netlify, or any static hosting supporting Vite/React builds.
- To build for production:
  ```bash
  npm run build
  ```
  The output will be in the `dist/` directory.

## 📜 License
MIT License. See [LICENSE](LICENSE) for details.

---

> Built with ❤️ for civic engagement and better public services. Contributions welcome!
