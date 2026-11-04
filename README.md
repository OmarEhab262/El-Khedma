# 🎖️ El-Khedma (الخدمة)

A web app for managing the **daily duty roster** and the **daily headcount ("Tmam")** inside military units, with printable tables and PDF export. It runs entirely in the browser and stores its data locally in `localStorage` — no server or database required.

> Built by **Omar Ehab** during his military service, to speed up the daily duty work and reduce manual errors.

The interface is fully **Arabic (RTL)**; this README is in English for developers.

---

## 📑 Table of Contents

- [The Problem It Solves](#-the-problem-it-solves)
- [Features](#-features)
- [Tech Stack](#️-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [How to Use](#-how-to-use)
- [Pages and Routes](#️-pages-and-routes)
- [Data Storage](#-data-storage)
- [Login and Security](#-login-and-security)
- [Printing and PDF](#️-printing-and-pdf)
- [Developer Notes](#-developer-notes)
- [Author](#-author)

---

## 🎯 The Problem It Solves

Every unit prepares a daily duty roster (officers, NCOs, soldiers, guard shifts, and other duties) and a **daily headcount** showing total strength, who is present, who is away, and why. This was done by hand, repeatedly, and was error-prone.

**El-Khedma** addresses this with:

- **Speed:** build and print the roster in a few clicks.
- **Organization:** one system for personnel instead of paper and memory.
- **Accuracy:** automatic headcount validation that blocks saving when numbers don't match.
- **Persistence:** all data is saved and restored when the app is reopened.

---

## ✨ Features

### 1) Daily Duty Roster (Home page)
- **Date and weekday** picker, with the day shown in Arabic automatically.
- **Unit commander** selection with a rank badge (⭐ / 🦅 / ⚔️) based on rank.
- **Night password** field.
- **Officer** and **NCO** duties, based on the duty types you define in the Control page.
- **Other duties:** administration, operations deputy, canteen, driver, duty sergeant.
- **Soldier duties:** commander plus first, second and third guard shifts.
- **Rotate duty** button to automatically rotate guard shifts for the next day (the commander stays fixed).
- **Duplicate highlighting:** colors mark a person who appears in more than one shift.
- Selection lists are **sorted by rank** and filtered by duty type.
- **Auto-save** on every change.

### 2) Roster View and Printing
- Full night-duty table with **signature** boxes and the unit commander's signature.
- Printing on **A4 landscape**.
- **PDF export** on a single page.
- Choose the **number of copies/pages** (1 or an even number).
- **Auto-fit** scales the table to fit one page.
- Numbers are converted to **Arabic-Indic digits** (٠١٢٣…).

### 3) Personnel Management
- Add, edit and delete personnel with their rank/grade.
- Automatic classification into **officers / NCOs / soldiers**.
- Lists sorted by rank, with confirmation dialogs before deleting or editing.
- Back-to-top button for long lists.

### 4) Daily Headcount (Tmam)
- Pages to record each person's away status:

| Status | Status |
|---|---|
| Vacations (field, rest, annual, sick) | Sick leaves |
| Hospital | Missions |
| Training course (Band) | Outside the station |
| Outside the country | Absence |
| Prison | |

- **Officers**, **NCOs** and **Soldiers** headcount pages for entering counts.
- **Headcount review** page:
  - Compares the written strength with the actual strength.
  - Compares present and away counts for each category.
  - Detects anyone recorded in **more than one status** at the same time.
  - **Blocks saving** until every number matches.
- **Final headcount report** for printing: a summary per category, a list of present personnel with **number of days** (with a "+1 day for everyone" button), tables of the away personnel with their details, and the commander's signature.

### 5) Control and Settings
- Change the **username and password** (after entering the current password).
- Set the **unit name** and **command name** (shown on tables and reports).
- Add, edit and delete **duty types** (officers / NCOs / soldiers).

### 6) User Experience
- **Full Arabic (RTL)** interface using the Cairo font.
- Dark, mobile-responsive design.
- Instant toast notifications for success and errors.
- Custom 404 page.
- Builds into a **single HTML file** that can be opened without a server.

---

## 🛠️ Tech Stack

| Technology | Used for |
|---|---|
| [React 19](https://react.dev) | UI |
| [Vite 8](https://vitejs.dev) | Build and dev tooling |
| [React Router 7](https://reactrouter.com) | Navigation (HashRouter) |
| [Material UI](https://mui.com) | Components and icons |
| [Tailwind CSS 4](https://tailwindcss.com) | Styling |
| [react-datepicker](https://reactdatepicker.com) | Date selection |
| [react-hot-toast](https://react-hot-toast.com) | Notifications |
| [crypto-js](https://github.com/brix/crypto-js) | Encrypting login data |
| [vite-plugin-singlefile](https://github.com/richardtallent/vite-plugin-singlefile) | Single-file HTML output |
| html2canvas-pro / jsPDF / react-to-print | Printing and export tooling |
| @fontsource/cairo | Cairo font |

---

## 📁 Project Structure

```
├── public/                    # Icons (favicon, etc.)
├── src/
│   ├── App.jsx                # Routes and global layout
│   ├── main.jsx               # Entry point
│   ├── index.css              # Styles + print rules (A4)
│   ├── pages/
│   │   ├── Home.jsx           # Daily duty roster
│   │   ├── Show.jsx           # Roster view, print and PDF
│   │   ├── Add.jsx            # Personnel management
│   │   ├── Control.jsx        # Settings and duty types
│   │   ├── Tmam.jsx           # Headcount review and save
│   │   ├── PagePeople.jsx     # Final headcount report
│   │   ├── Login.jsx          # Login
│   │   ├── Signup.jsx         # Sign up (currently disabled)
│   │   └── NotFound.jsx       # 404 page
│   ├── TmamPages/             # Headcount status pages
│   │   ├── PageOffs.jsx / PageNCOs.jsx / PageSoldiers.jsx
│   │   ├── PageVacations.jsx / PageSickLeaves.jsx
│   │   ├── PageHospitals.jsx / PageMissions.jsx / PageBands.jsx
│   │   └── PageOutCenter.jsx / PageOutCountry.jsx
│   │       PageAbsence.jsx / PagePrison.jsx
│   ├── components/
│   │   ├── Nav.jsx            # Navigation bar
│   │   ├── Tables.jsx         # Printable roster table
│   │   ├── ButtonsTmam.jsx    # Headcount pages menu
│   │   ├── PersonSelect.jsx / PersonSection.jsx
│   │   ├── SoldierServices.jsx# Soldier duties and guard shifts
│   │   ├── ProtectedRoute.jsx # Guards admin-only pages
│   │   └── ArabicNumbers.jsx  # Arabic-Indic digit conversion
│   └── utils/
│       ├── storage.js         # localStorage read/write
│       ├── authCrypto.js      # Encryption and users
│       ├── unitName.js / date.js / ranks.js
├── index.html
├── vite.config.js
└── package.json
```

---

## 🚀 Getting Started

**Requirements:** Node.js `20.19` or newer.

```bash
# 1. Clone the project
git clone https://github.com/OmarEhab262/center252.git
cd center252

# 2. Install dependencies
npm install

# 3. Start the dev server
npm run dev
# Runs on http://localhost:5173

# 4. Build for production (a single HTML file in dist/)
npm run build

# 5. Preview the production build
npm run preview
```

| Command | Purpose |
|---|---|
| `npm run dev` | Start the development server |
| `npm run build` | Build the production version |
| `npm run preview` | Preview the built version |
| `npm run lint` | Lint the code with ESLint |

---

## 📖 How to Use

1. **Log in** (default account: `admin` / `123456`) or continue as a guest.
2. In **Control**, set the unit and command names and add the duty types you need. Changing the default password is recommended.
3. In **Add Names**, enter personnel and their ranks.
4. On **Home**, pick the date and unit commander, then assign personnel to duties.
5. Use **Rotate duty** to rotate guard shifts for the next day.
6. Open **Show** to review, then click **Print** or **PDF**.
7. Open the **Daily Tmam**, record away statuses (vacations, missions, hospital…), and enter the counts for each category.
8. Click **Save Tmam** (only allowed when all numbers match), then **View report** to print.

> ⚠️ **Note:** Full permissions (adding names and Control) are for the admin only; guests can see the public pages.

---

## 🗺️ Pages and Routes

Navigation uses `HashRouter` (for example `/#/tmam`).

| Route | Page | Protected |
|---|---|:---:|
| `/` | Home (duty roster) | ❌ |
| `/show` | Roster view and print | ❌ |
| `/tmam` | Daily headcount review | ❌ |
| `/tmam/pageOffs` | Officers headcount | ❌ |
| `/tmam/page-nco` | NCOs headcount | ❌ |
| `/tmam/page-soldiers` | Soldiers headcount | ❌ |
| `/tmam/pageVacations` | Vacations | ❌ |
| `/tmam/pageSickLeaves` | Sick leaves | ❌ |
| `/tmam/pageHospitals` | Hospital | ❌ |
| `/tmam/pageMissions` | Missions | ❌ |
| `/tmam/pageBands` | Training course | ❌ |
| `/tmam/pageOutCenter` | Outside the station | ❌ |
| `/tmam/pageOutCountry` | Outside the country | ❌ |
| `/tmam/pageAbsence` | Absence | ❌ |
| `/tmam/pagePrison` | Prison | ❌ |
| `/people` | Final headcount report | ❌ |
| `/add` | Add names | ✅ |
| `/control` | Control | ✅ |
| `/login` | Login | ❌ |

---

## 💾 Data Storage

All data is stored in the browser's `localStorage`:

| Key | Contents |
|---|---|
| `listNames` | Personnel list (name, rank, id) |
| `service` | Current roster data (date, commander, assignments…) |
| `serviceTypes` | Defined duty types |
| `tmam` | Vacations, missions and other status records, plus headcount counts |
| `people` | Saved headcount (present / away) used by the report |
| `account` | Admin account data (encrypted) |
| `auth` | Current login session |
| `unitName` / `commandName` | Unit name and command name |

> ⚠️ Because data is local, it is **specific to each browser and device** and will not appear on another device. Do not clear browser data without taking a backup first.

---

## 🔐 Login and Security

- The default account is created on first use: `admin` / `123456`. **Change it right away** from the Control page.
- The password is AES-encrypted with `crypto-js`, but the **key is hardcoded** in the source. This is **not a secure authentication system** against anyone who can access the app or its `localStorage`.
- The project is designed for **local, internal use** and should not be relied on to protect sensitive data.
- Do not publish real personnel data anywhere public.

---

## 🖨️ Printing and PDF

- Pages are set to **A4 landscape** with 5mm margins.
- Printing and PDF both use the browser's print dialog; for PDF, choose **"Save as PDF"** as the destination.
- Enable **Background graphics** in the print dialog so table colors show up (especially the green cells in the headcount report).

---

## 👨‍💻 Developer Notes

- The app is client-side only; `storage.js` could later be swapped for a database or API without changing the rest of the code.
- The `TmamPages` components are very similar and could be merged into one reusable component.
- `Signup.jsx` is currently disabled in `App.jsx`.
- `Edit.jsx` is incomplete and unused.
- `PersonSelect.jsx` contains a debugging `console.log` that should be removed.

---

## 👤 Author

**Omar Ehab**
[GitHub: OmarEhab262](https://github.com/OmarEhab262)

---

<p align="center">© Omar Ehab, 2026</p>
