import { Workbox } from "workbox-window";
import Editor from "./editor";
import { initDb } from "./database";
import "../css/style.css";

// Images
import Logo from "../images/logo.png";

// Stylesheets
import "../css/style.css";

if ("serviceWorker" in navigator) {
  // Use the window load event to keep the page load performant
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./service-worker.js");

    document.getElementById("logo-icon").src = Logo;

    const buttonInstall = document.getElementById(buttonInstall);
  });
}

window.addEventListener("beforeinstallprompt", (event) => {
  event.preventDefault();
  buttonInstall.style.visibility = "visible";

  // install button event
  buttonInstall.addEventListener("click", () => {
    event.prompt();
    buttonInstall.setAttribute("disabled", true);
    buttonInstall.textContent = "Installed!";
  });

  window.addEventListener("appinstalled", (event) => {
    console.log("👍", "appinstalled", event);
  });
});

const main = document.querySelector("#main");
main.innerHTML = "";

const loadSpinner = () => {
  const spinner = document.createElement("div");
  spinner.classList.add("spinner");
  spinner.innerHTML = `
  <div class="loading-container">
  <div class="loading-spinner" />
  </div>
  `;
  main.appendChild(spinner);
};

const editor = new Editor();

if (typeof editor === "undefined") {
  loadSpinner();
}

// Check if service workers are supported
if ("serviceWorker" in navigator) {
  // register workbox service worker
  const workboxSW = new Workbox("/src-sw.js");
  workboxSW.register();
} else {
  console.error("Service workers are not supported in this browser.");
}

window.addEventListener("load", function () {
  initDb();
});
