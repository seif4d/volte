# <p align="center">⚡ VOLT RECOVERY</p>

<p align="center">
  <strong>A Premium, Motion-Heavy Landing Page Built for Elite Athletic Recovery & Bespoke Wellness Services.</strong>
</p>

<p align="center">
  <em>Where minimalist luxury aesthetics meet high-performance vanilla web mechanics.</em>
</p>

<p align="center">
  <img src="https://img.shields.io/github/stars/seif4d/volte?style=for-the-badge&color=C8A45D" alt="Stars" />
  <img src="https://img.shields.io/github/forks/seif4d/volte?style=for-the-badge&color=grey" alt="Forks" />
  <img src="https://img.shields.io/badge/Aesthetic-Glassmorphic-C8A45D?style=for-the-badge" alt="Aesthetics" />
  <img src="https://img.shields.io/badge/UX-Mobile--First-25D366?style=for-the-badge" alt="Mobile First" />
</p>

---

## 🌌 The Vibe Check (Visual & Motion Design)

This platform isn't just a static layout—it’s designed as an interactive, motion-rich experience that mirrors the smooth, physical sensation of muscular release.

```text
  [ Canvas Particles ]  💨 Floating stardust reacts subtly to screen scroll.
         │
         ├───► [ 3D Tilt Cards ] 🏷️ Elements rotate dynamically on mouse coordinates.
         │
         ├───► [ Magnetic CTAs ] 🧲 Buttons gently pull toward the cursor.
         │
         └───► [ Active Scrollspy ] 📱 Custom mobile app-like bottom navigation.
```

---

## ✨ Features Breakdown

### 🎨 Premium Aesthetics
* **Glassmorphism Layouts:** Modern frosted-glass cards with elegant custom-shaded glow borders (`--glass-border`).
* **Fluid Typography:** Seamless scaling between Arabic (Tajawal) and English (Outfit) typographies for global premium appeal.
* **Golden Gradient Accents:** Custom metallic gradients designed to capture luxury and elite branding.

### ⚙️ Interactive Micro-Interactions
* **HTML5 Canvas Particle Physics:** A performance-optimized background animation loop using native `requestAnimationFrame` (it pauses automatically when the tab is inactive to preserve user CPU/battery).
* **3D Dynamic Tilt:** Cards dynamically calculate mouse offsets and translate them into custom 3D rotations on hover.
* **Magnetic Physics Hook:** Interactive action buttons pull toward the cursor within a small radius, adding tactile weight to click actions.
* **Smart Bottom-Nav Scrollspy:** Automatically highlights the active section in view, mimicking a native mobile application.

---

## 🛠️ The Tech Behind the Motion

We bypassed heavy JS frameworks and external animation libraries to maintain instant load times and peak performance.

| Stack | Technology | Core Purpose |
| :---: | :--- | :--- |
| <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/html5/html5-original.svg" width="28" height="28" /> | **HTML5 Semantic Structure** | Native markup, SEO metadata, and JSON-LD Rich Structured Data. |
| <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/css3/css3-original.svg" width="28" height="28" /> | **CSS3 Architecture** | Custom CSS properties, Grid, Flexbox, and complex cubic-bezier keyframe states. |
| <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg" width="28" height="28" /> | **Vanilla JavaScript** | Custom Canvas rendering, pointer glow tracking, and intersection observers. |

---

## 📁 Repository Structure

```text
volte/
├── img/                       # Highly optimized graphic assets
│   ├── me.jpg                 # Elite team/expert headshot
│   ├── cove.png               # Social graph sharing card preview (1200x630)
│   └── ico.jpg                # Clean high-contrast favicon asset
├── index.html                 # Complete single-page layout (Structure, Styles, Logic)
└── README.md                  # Beautiful platform documentation
```

---

## 🚀 Setting Up Locally

Get your development sandbox running in under 60 seconds:

### 1. Clone the project files:
```bash
git clone https://github.com/seif4d/volte.git
```

### 2. Move into the directories:
```bash
cd volte
```

### 3. Live Preview:
Open `index.html` directly in your browser, or spin it up on a local server using VS Code's **Live Server** extension for real-time asset changes.

---

## 🎨 Customizing the Vibe

You can easily repurpose the design to match other luxury-centric services. 

### Edit the Global Palette
Update these primary root variables in `index.html` to adapt the colors:

```css
:root {
    --bg-black: #050505;          /* Sleek black foundation */
    --gold-main: #C8A45D;         /* Signature premium gold */
    --gold-glow: rgba(200, 164, 93, 0.4); /* Glow accents */
}
```

### Update Contact & Scheduling Endpoints
Search for the template phone number `201070954997` in `index.html` and replace it with your phone number and country code to route booking CTAs directly to your business channel.

---

<p align="center">
  <em>Designed and engineered with attention to detail. Pull requests and design suggestions are always welcome.</em>
</p>
