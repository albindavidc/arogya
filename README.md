# Arogya - Yoga & Wellness Application

**Arogya** is a compassionate, comprehensive guide to yoga poses scientifically known to improve metabolism, energy, hormonal balance, and digestive power. Designed for modern wellness, this application helps users find their inner fire and revitalize their body and mind through structured asanas (poses) and pranayama (breathing exercises).

---

## 🌟 Key Features

- **Comprehensive Asana Library**: Organized into 7 distinct phases, from "Warm-Up & Ignition" to "Balance & Grounding", allowing users to build a well-rounded practice.
- **Dynamic Gender Toggle**: The application dynamically updates visual demonstrations and instructions tailored for male and female practitioners using a localized asset delivery system.
- **Detailed Pose Breakdowns**: Interactive modals for every pose, featuring:
  - Step-by-step instructions ("How to do it")
  - Sanskrit names and pronunciations
  - Suggested Pranayama and Mudra pairings
  - Tiered frequency & duration guidelines (Beginner, Intermediate, Advanced)
- **Dedicated Pranayama Section**: A structured breathing guide covering foundational techniques (Ujjayi, Diaphragmatic) to advanced retentions.
- **"Top 5" Routine**: A quick-access module for daily metabolic and energetic maintenance.
- **Modern, Responsive UI**: Built with a mobile-first approach, featuring a clean, serene, and intuitive user interface optimized for all devices.

---

## 🚀 Tech Stack

Arogya is built using modern web development standards and frameworks:

- **Framework**: [Angular 21](https://angular.dev/) (Zoneless, Standalone Components, Signals for state management)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) for fast, utility-first, responsive design
- **Language**: [TypeScript](https://www.typescriptlang.org/) for strict type safety and robust architecture
- **Build Tool**: Angular CLI / Vite

---

## 📂 Project Structure

```text
arogya/
├── src/
│   ├── app.component.ts               # Main dashboard, state logic, and layout shell
│   ├── warm-up.component.ts           # Dedicated component for warm-up sequences
│   ├── pose-detail-modal.component.ts # Reusable UI modal for detailed pose data
│   ├── models/                        # TypeScript interfaces & types (e.g., Pose, Category)
│   └── assets/                        # Local static assets
│       └── images/                    # Categorized by gender and phase (e.g., /female/core/)
├── angular.json                       # Angular workspace & build configuration
├── tailwind.config.js / postcss       # Tailwind CSS configuration
├── package.json                       # Project dependencies and NPM scripts
└── index.html                         # Application HTML entry point
```

---

## 🛠️ Setup & Installation

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) (v18 or higher) and `npm` installed on your local machine.

### 1. Clone the repository
```bash
git clone https://github.com/yourusername/arogya.git
cd arogya
```

### 2. Install dependencies
```bash
npm install
```

### 3. Run the Development Server
```bash
npm run dev
```
Navigate to `http://localhost:3000/` in your browser. The application will automatically reload if you change any of the source files.

---

## 📦 Asset Management & Git LFS

Due to the rich media nature of this application, large image assets (`.webp`, `.png`, `.jpg`) are managed via **Git Large File Storage (LFS)**. 

To ensure images load properly and are not corrupted during commits:
1. Ensure Git LFS is installed on your local machine (`git lfs install`).
2. The project's `.gitattributes` file is pre-configured to treat all media assets as binary. 
3. Always upload media assets directly to the `src/assets/images/...` directories. **Never paste image data into a text editor.**

---

## 🤝 Usage Guidelines

- **State Management**: The application heavily relies on Angular's modern `Signal` API for reactive state management (e.g., toggling between male/female images, opening/closing modals).
- **Adding New Poses**: To add a new pose, simply append it to the `poseCategories` signal array inside `src/app.component.ts`, adhering to the `Pose` interface defined in the `models` directory. Ensure the corresponding image is placed in the correct `assets/images/` subfolder.

---

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).
