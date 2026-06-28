# ⚡ VOLT Recovery

> A premium, motion-heavy landing page built for high-end mobile recovery & bespoke massage services in Cairo. Seamlessly blending minimalist luxury aesthetics with interactive micro-interactions.

---

<div align="center">

[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://html5.org)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://w3.org/Style/CSS/)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![UI/UX](https://img.shields.io/badge/Aesthetics-Glassmorphic-C8A45D?style=for-the-badge)](https://voltmsg.store)
[![Mobile-First](https://img.shields.io/badge/UX-Mobile--First-25D366?style=for-the-badge)](https://voltmsg.store)

</div>

---

## 🌌 The Vibe Check (Visual & Motion Design)

This isn't just another static landing page. It is structured around **tactile feedback** and **continuous visual harmony** to mirror the actual physical recovery experience. 

*   **HTML5 Canvas Particle Engine:** A lightweight, vanilla JavaScript stellar dust particle system that reacts subtly as users scroll.
*   **Dynamic Cursor Glow (Desktop):** A smooth radial gradient follower tracking mouse coordinate inputs, blending with dark backgrounds.
*   **3D Tilt Dynamics (`data-tilt`):** Premium pricing cards that rotate dynamically on hover based on real-time mouse offsets.
*   **Magnetic Buttons:** Micro-interaction scripts that pull primary CTAs gently toward the user's cursor for a physical, tactile feel.
*   **App-Like Mobile Navigation:** A native-feeling bottom navigation system complete with active viewport tracking (`Scrollspy`) and physical haptic-style triggers.

---

## 🛠️ Tech Blueprint

```text
volt-recovery/
├── img/                       # Optimization-ready asset directory
│   ├── me.jpg                 # Founder/Therapist visual profile
│   ├── cove.png               # High-res Open Graph card (1200x630)
│   └── ico.jpg                # Multi-platform Touch Icon / Favicon
├── index.html                 # Unified single-page build (Structure, Styles, Logic)
└── README.md                  # System documentation
```

### Pure Vanilla Implementation
To keep loading times low, the page runs entirely on zero-dependency vanilla technologies.

| System | Technology | Role |
| :--- | :--- | :--- |
| **Structure & SEO** | HTML5 / JSON-LD | Core skeleton & Schema.org Rich Snippets integration. |
| **Aesthetic Framework** | CSS3 Grid & Flexbox | Multi-layered glassmorphic interfaces & custom variable themes. |
| **Animation Loop** | RequestAnimationFrame | High-framerate rendering for canvas particles. |
| **Intersection Observer** | JavaScript API | Native asynchronous trigger for scroll-animated reveals. |

---

## ⚙️ Setting Up Locally

To experience the interactive motion loop locally, follow these steps:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/volt-recovery.git
   ```

2. **Navigate into the project directory:**
   ```bash
   cd volt-recovery
   ```

3. **Launch the project:**
   * Double-click `index.html` to open it in any modern web browser.
   * *Recommended:* Use VS Code's **Live Server** extension to observe hot-reloads and smooth interactive behaviors.

---

## ⚡ Customizing the Experience

Feel free to adapt the code block variables to match your personal branding needs.

### 1. Tailoring Your Brand Palette (CSS Variables)
To change the entire visual identity of the page, modify the root CSS variables inside `index.html`:
```css
:root {
    --bg-black: #050505;          /* Deep base color */
    --gold-main: #C8A45D;         /* Primary brand color */
    --gold-glow: rgba(200, 164, 93, 0.4); /* Glow accents */
}
```

### 2. Updating Personal Assets
* Replace `img/me.jpg` with your own profile shot.
* Update the WhatsApp endpoint links containing `201070954997` with your regional dialing code and phone number.

---

## 📈 Performance & Accessibility Metrics

*   **Zero Dependencies:** No heavy jQuery or dynamic frameworks. The page loads and renders instantly.
*   **Resource-Friendly Loop:** Particle math is throttled using the browser's native window visibility API; when users switch tabs, the render loop pauses to conserve device battery and CPU.

---

<div align="center">
  <p>Crafted to elevate local service landing pages to global aesthetic standards.</p>
</div>
