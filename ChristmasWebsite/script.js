"use strict";

// Google Apps Script web app URL. Paste the deployed /exec URL here.
const APPS_SCRIPT_URL = "";
const POSTED_CARD_DEADLINE = "2026-12-10";
const EXTRA_FLAME_FRAMES = ["images/flame-2.png", "images/flame-3.png"];

const signUp = document.querySelector(".painting-link");
const cardDialog = document.querySelector("#card-dialog");

signUp.addEventListener("click", () => cardDialog.showModal());
cardDialog.querySelector(".dialog-close").addEventListener("click", () => cardDialog.close());

const deadline = document.querySelector("#posted-card-deadline");
deadline.dateTime = POSTED_CARD_DEADLINE;
deadline.textContent = new Intl.DateTimeFormat("en-IE", {
  day: "numeric",
  month: "long",
  timeZone: "UTC",
}).format(new Date(POSTED_CARD_DEADLINE));

const postboxes = [...document.querySelectorAll(".postbox")];

for (const postbox of postboxes) {
  postbox.addEventListener("click", () => {
    const opening = postbox.getAttribute("aria-expanded") === "false";

    for (const choice of postboxes) {
      const open = choice === postbox && opening;
      choice.setAttribute("aria-expanded", String(open));
      const panel = document.getElementById(choice.getAttribute("aria-controls"));
      panel.hidden = !open;
      if (open) {
        const target = panel.querySelector("form").hidden
          ? panel.querySelector(".thanks")
          : panel.querySelector("h2");
        target.focus();
      }
    }
  });
}

function validateField(input) {
  const error = document.getElementById(input.id + "-error");
  let message = "";

  if (input.required && !input.value.trim()) {
    const requiredMessages = {
      name: "Please enter your name(s).",
      address1: "Please enter the first line of your address.",
      town: "Please enter your town or city.",
      email: "Please enter your email address.",
    };
    message = requiredMessages[input.name];
  } else if (input.validity.typeMismatch) {
    message = "Please enter a valid email address.";
  }

  error.textContent = message;
  if (message) input.setAttribute("aria-invalid", "true");
  else input.removeAttribute("aria-invalid");
  return !message;
}

for (const form of document.querySelectorAll(".card-panel form")) {
  const fields = [...form.querySelectorAll("input[required], input[type='email']")];
  const button = form.querySelector(".submit");
  const status = form.querySelector(".submit-status");
  const thanks = form.parentElement.querySelector(".thanks");

  for (const input of fields) {
    input.addEventListener("input", () => {
      if (input.hasAttribute("aria-invalid")) validateField(input);
    });
  }

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (button.disabled || form.hidden) return;

    const data = new FormData(form);
    if (data.get("website")) return;

    status.textContent = "";
    const invalidFields = fields.filter((input) => !validateField(input));
    if (invalidFields.length) {
      invalidFields[0].focus();
      return;
    }

    if (!APPS_SCRIPT_URL) {
      status.textContent = "Sign-ups aren’t open yet. Please check back soon.";
      return;
    }

    button.disabled = true;
    form.setAttribute("aria-busy", "true");
    status.textContent = "Sending your request…";

    try {
      const response = await fetch(APPS_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        body: data,
        credentials: "omit",
      });
      if (response.type !== "opaque" && !response.ok) throw new Error("Request failed");
      form.reset();
      form.hidden = true;
      thanks.hidden = false;
      if (!form.parentElement.hidden) thanks.focus();
    } catch {
      status.textContent = "We couldn’t send your request. Please try again.";
    } finally {
      form.removeAttribute("aria-busy");
      button.disabled = false;
      if (form.hidden) status.textContent = "";
    }
  });
}

const fire = document.querySelector(".fire");
const stillFlame = fire.querySelector(".flame");
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
const flameFrames = [stillFlame];
let activeFrame = 0;
let flameTimer;
let requestedFrames = false;

function advanceFlame() {
  const next = (activeFrame + 1) % flameFrames.length;
  flameFrames[activeFrame].classList.remove("is-lit");
  flameFrames[next].classList.add("is-lit");
  activeFrame = next;
  flameTimer = setTimeout(advanceFlame, 120 + Math.random() * 60);
}

function updateFire() {
  clearTimeout(flameTimer);
  if (reducedMotion.matches || document.hidden) {
    flameFrames[activeFrame].classList.remove("is-lit");
    stillFlame.classList.add("is-lit");
    activeFrame = 0;
    return;
  }

  if (!requestedFrames) {
    requestedFrames = true;
    Promise.all(EXTRA_FLAME_FRAMES.map(async (src) => {
      const frame = new Image(stillFlame.width, stillFlame.height);
      frame.className = "flame";
      frame.alt = "";
      frame.src = src;
      try {
        await frame.decode();
        return frame;
      } catch {
        return null;
      }
    })).then((frames) => {
      for (const frame of frames.filter(Boolean)) {
        fire.append(frame);
        flameFrames.push(frame);
      }
      updateFire();
    });
  }

  if (flameFrames.length > 1) flameTimer = setTimeout(advanceFlame, 150);
}

reducedMotion.addEventListener("change", updateFire);
document.addEventListener("visibilitychange", updateFire);
updateFire();
