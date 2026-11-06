# 🎖️ El-Khedma (الخدمة)

A web and desktop application for managing the **daily duty roster** and **daily headcount (Tmam)** inside military units, with printable tables and PDF export.

Built by **Omar Ehab** during his military service to make daily administrative work faster, more organized, and less prone to manual errors.

The application runs locally, stores its data using `localStorage`, and does not require a server, database, or internet connection for its core functionality.

The interface is fully **Arabic (RTL)**, while this README is written in English for developers.

---

## 💡 The Story Behind the Project

The idea for **El-Khedma** came from a real problem I experienced during my military service.

Daily duty rosters and headcount reports were handled manually. Preparing them repeatedly took time, required a lot of paperwork, and could lead to mistakes when assigning duties or calculating personnel numbers.

I wanted to build something that could make this work easier, but there was a challenge: **the computers and technical resources available in the military environment were limited.**

So I started working on the idea during my free time and military leaves.

Whenever I had a vacation, I would:

- Research possible solutions and learn about the technologies I needed.
- Develop new features and improve the application.
- Prepare a version that I could take back and test.
- Try the application on the actual computers available inside the military unit.
- Identify compatibility and performance issues, then work on fixing them.

This meant that I wasn't developing for an ideal development environment. I had to consider older computers, limited hardware capabilities, and environments where internet access was unavailable.

### AI-Assisted Development

AI tools played a significant role throughout this journey.

I used AI as a development assistant to help me:

- Write and improve code.
- Understand unfamiliar technologies and libraries.
- Debug errors and investigate compatibility issues.
- Refactor components and improve the project structure.
- Explore different approaches when I encountered technical limitations.

I wasn't working completely alone, and I don't claim that every line of code was written manually by me. AI helped me significantly, but I was responsible for defining the idea, deciding what the application needed, integrating the solutions, testing the features, and evaluating whether they actually worked in the environment they were designed for.

For me, this project was not only about building an application. It was also an opportunity to learn how to turn a real-world problem into a working software solution under practical constraints.

---

## 🎯 The Problem It Solves

Every military unit prepares a daily duty roster and a daily headcount showing total personnel strength, who is present, who is away, and the reason for their absence.

Traditionally, this process involves repetitive manual work.

**El-Khedma** addresses these challenges through:

- **Speed:** Build and print duty rosters in a few clicks.
- **Organization:** Manage personnel and duties in one place.
- **Accuracy:** Automatically validate headcount figures and prevent saving inconsistent reports.
- **Persistence:** Save data locally and restore it when the application is reopened.
- **Accessibility:** Work without an internet connection or backend server.
- **Practical compatibility:** Explore desktop deployment for computers with limited resources.

---

## ✨ Features

### 1. Daily Duty Roster

- Date and weekday selection with automatic Arabic day display.
- Unit commander selection with rank indicators.
- Night password field.
- Configurable officer and NCO duties.
- Additional duties such as administration, operations deputy, canteen, driver, and duty sergeant.
- Soldier duties, including commander and first, second, and third guard shifts.
- Automatic guard-shift rotation for the next day.
- Duplicate-person highlighting.
- Rank-sorted personnel selection.
- Automatic saving after changes.

### 2. Roster View and Printing

- Printable night-duty table with signature fields.
- A4 landscape printing.
- Single-page PDF export.
- Configurable number of copies.
- Automatic scaling to fit the page.
- Arabic-Indic number conversion.

### 3. Personnel Management

- Add, edit, and delete personnel.
- Automatic classification into officers, NCOs, and soldiers.
- Rank-based sorting.
- Confirmation dialogs for important actions.

### 4. Daily Headcount (Tmam)

- Record personnel statuses, including:
  - Vacations (field, rest, annual, and sick).
  - Sick leaves.
  - Hospital stays.
  - Missions.
  - Training courses.
  - Outside the station.
  - Outside the country.
  - Absence.
  - Prison.
- Separate headcount pages for officers, NCOs, and soldiers.
- Compare written strength with actual personnel records.
- Validate present and away personnel counts.
- Detect duplicate or conflicting statuses.
- Prevent saving until all figures are consistent.
- Generate a final printable headcount report.
- Track the number of days for present personnel.

### 5. Control and Settings

- Change the administrator username and password.
- Configure unit and command names.
- Add, edit, and delete duty types.
- Manage application settings.

### 6. User Experience

- Full Arabic RTL interface.
- Cairo font.
- Responsive interface for different screen sizes.
- Dark-themed design.
- Toast notifications.
- Custom 404 page.
- Local data storage.

### 7. Desktop Application

In addition to the web version, I worked on packaging El-Khedma as a desktop application using **[Pake](https://github.com/tw93/Pake)**, an open-source project that uses Tauri to turn web applications into desktop applications.

The goal was to make the application easier to run on military computers without requiring users to start a development server or open a browser manually.

The desktop packaging process introduced several challenges:

- Configuring the Rust and Visual Studio build environment.
- Resolving Windows linker errors such as `LNK1104`.
- Configuring application icons and Windows packaging.
- Investigating compatibility with older Windows versions.
- Exploring support for Windows 7 32-bit systems.
- Considering offline deployment and the availability of WebView2.

Desktop packaging and compatibility are separate from the React application itself. Windows 7 32-bit compatibility still requires dedicated validation before it can be considered supported.

---

## 🛠️ Tech Stack

| Technology                               | Used for                      |
| ---------------------------------------- | ----------------------------- |
| React 19                                 | User interface                |
| Vite 8                                   | Build and development tooling |
| React Router 7                           | Navigation                    |
| Material UI                              | Components and icons          |
| Tailwind CSS 4                           | Styling                       |
| react-datepicker                         | Date selection                |
| react-hot-toast                          | Notifications                 |
| crypto-js                                | Local login-data encryption   |
| vite-plugin-singlefile                   | Single-file HTML output       |
| html2canvas-pro / jsPDF / react-to-print | Printing and PDF export       |
| @fontsource/cairo                        | Arabic typography             |
| Pake / Tauri                             | Desktop application packaging |
| Rust / Visual Studio Build Tools         | Desktop build environment     |

---

## 💾 Data Storage

All application data is stored locally using the browser's `localStorage`.

No backend server or database is required for the core application.

This approach allows the application to work offline, but data remains specific to the device and browser profile. It does not automatically synchronize between computers.

---

## 🖥️ Desktop Development and Compatibility

One of the main technical challenges was turning the existing React application into a standalone desktop application while keeping the original web project intact.

I explored Pake as a desktop packaging solution and worked through the Rust build environment, Windows installer generation, application icons, and architecture requirements.

The target environments include:

- Windows 7 (32-bit).
- Windows 10.
- Windows 11.
- Offline environments.

**Important:** A successful build on a modern Windows computer does not automatically guarantee compatibility with Windows 7 or 32-bit systems. Each target environment requires testing, especially when using modern WebView technologies.

---

## 👨‍💻 Developer Notes

- The application is client-side only.
- `localStorage` handles local persistence.
- No internet connection is needed for normal local operation after deployment.
- The web build can be generated using Vite.
- Pake was explored to package the existing web application as a desktop application.
- Desktop compatibility with older Windows systems remains an important deployment consideration.
- The project can be extended with additional features without requiring a complete rewrite.

---

## 👤 Author

**Omar Ehab**

Frontend Developer | React.js | Next.js

- GitHub: https://github.com/OmarEhab262

**Built during military service — from a real problem, with limited resources, continuous learning, AI-assisted development, and practical testing.**
