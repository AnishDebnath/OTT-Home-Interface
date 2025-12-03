# OTT Home Interface

A modern, responsive homepage interface for an OTT (Over-The-Top) streaming platform. This project showcases a dynamic and interactive user experience for browsing movies and TV shows, featuring a cinematic background trailer and an interactive card slider.

## 🚀 Features

*   **Cinematic Background**: Immersive background video trailer using the YouTube IFrame API.
*   **Dynamic Content**: Clicking on a movie card instantly updates the background video, title, rating, description, and other details.
*   **Interactive Slider**:
    *   **Mouse Drag**: Click and drag to scroll through movie cards on desktop.
    *   **Touch Scroll**: Smooth touch-based scrolling for tablets and mobile devices.
*   **Responsive Design**: Fully responsive layout that adapts seamlessly to laptops, tablets, and mobile screens.
*   **Smart Controls**:
    *   Mute/Unmute toggle for the background video.
    *   "Show more/less" toggle for long movie descriptions.
*   **Modern Styling**: Built with Tailwind CSS for a sleek, dark-themed aesthetic.

## 🛠️ Tech Stack

*   **HTML5**: Semantic structure.
*   **CSS3 (Tailwind CSS)**: Utility-first styling for rapid and responsive design.
*   **JavaScript (Vanilla)**: Core logic for interactivity, API integration, and state management.
*   **YouTube IFrame API**: For embedding and controlling background trailers.

## 📂 Project Structure

```
OTT-Home-Interface/
├── assets/             # Images and fonts
├── src/
│   ├── input.css       # Tailwind input file
│   └── output.css      # Compiled CSS (generated)
├── data.js             # Movie data (JSON-like structure)
├── index.html          # Main HTML file
├── script.js           # Main JavaScript logic
├── package.json        # Project metadata and scripts
└── README.md           # Project documentation
```

## ⚙️ Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/AnishDebnath/OTT-Home-Interface.git
    cd OTT-Home-Interface
    ```

2.  **Install dependencies:**
    This project uses Tailwind CSS. You need Node.js installed.
    ```bash
    npm install
    ```

3.  **Build CSS:**
    Run the Tailwind build process to generate the `output.css` file.
    ```bash
    npm run build
    ```
    *Note: You can keep this running to watch for changes.*

4.  **Run the Project:**
    Simply open `index.html` in your web browser.
    *   For the best experience, use a local server (e.g., Live Server in VS Code) to ensure all assets and APIs load correctly.

## 🎮 Usage

*   **Browse**: Scroll through the cards at the bottom to see available movies.
*   **Select**: Click on a card to view its details and watch the trailer in the background.
*   **Watch**: The background video loops automatically. Use the mute button to toggle sound.
*   **Read**: Click "Show more" on the description to read the full plot summary.

## 👨‍💻 Author

**Anish Debnath**
*   GitHub: [AnishDebnath](https://github.com/AnishDebnath)

## 📄 License

This project is licensed under the ISC License.
