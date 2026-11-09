# MAHSA — A Journey Written in Stars ✨🌙

An interactive, cinematic birthday storytelling experience dedicated to **Mahsa**. Designed as a five-chapter fantasy journey through a midnight horizon, an enchanted rose and lily garden, a golden portal, a candlelit celebration, and a moonlit sky with a personal Persian birthday message.

---

## Folder Structure

```text
MAHSA-BIRTHDAY/
├── index.html
├── README.md
├── css/
│   ├── variables.css
│   ├── reset.css
│   ├── typography.css
│   ├── layout.css
│   ├── scenes.css
│   ├── components.css
│   ├── animations.css
│   └── responsive.css
├── js/
│   ├── main.js
│   ├── core/
│   │   ├── scene-manager.js
│   │   ├── navigation.js
│   │   ├── transitions.js
│   │   └── preloader.js
│   ├── scenes/
│   │   ├── intro.js
│   │   ├── garden.js
│   │   ├── portal.js
│   │   ├── birthday.js
│   │   └── final-scene.js
│   ├── effects/
│   │   ├── particles.js
│   │   ├── stars.js
│   │   ├── petals.js
│   │   ├── fireflies.js
│   │   └── parallax.js
│   ├── interactions/
│   │   ├── buttons.js
│   │   ├── garden-interactions.js
│   │   └── birthday-interactions.js
│   └── utils/
│       ├── device.js
│       └── helpers.js
├── assets/
│   ├── images/ (sky, garden, flowers, portal, birthday, moon)
│   ├── audio/ (music, sfx)
│   ├── fonts/ (persian, english)
│   └── icons/
└── docs/
    ├── design-spec.md
    ├── scene-flow.md
    └── asset-list.md
```

---

## Local Preview Instructions

Because `index.html` uses standard ES6 modules (`<script type="module" src="js/main.js">`), open the folder with any static local HTTP server:

### Option 1: Python (Built-in)
```bash
cd MAHSA-BIRTHDAY
python3 -m http.server 8080
```
Then visit `http://localhost:8080` in your browser.

### Option 2: VS Code Live Server
Open the `MAHSA-BIRTHDAY` folder in VS Code and click **Go Live** at the bottom right.

---

## Replacing Audio or Visual Assets

- **Background Music**: Replace `assets/audio/music/celestial-journey.wav` (or update the path in `js/interactions/buttons.js` to point to your custom `.mp3` or `.ogg` file). The audio controller is completely independent of scene animations and defaults to a muted initial state until the visitor clicks the sound toggle.
- **Visual Assets**: High-resolution `.webp` and `.svg` assets are organized by scene inside `assets/images/`. You can replace any file using the same relative filename without modifying JavaScript logic.

---

## Deploying to GitHub Pages

1. Create a new repository on GitHub (for example, `mahsa-birthday`).
2. Upload or push the contents of `MAHSA-BIRTHDAY/` to the root of your repository (`main` branch).
3. Go to **Settings → Pages** in your GitHub repository.
4. Under **Build and deployment**, select **Deploy from a branch**, choose `main` and `/ (root)`, and click **Save**.
5. Within 1–2 minutes, your site will be live at `https://<your-username>.github.io/<repo-name>/`. All asset paths are strictly relative and work seamlessly on repository subpaths.
