// DOM elements
const btn = document.querySelector("#btn");
const content = document.querySelector("#content"); // FIXED: contect → content
const voice = document.querySelector("#voice");

// ---------------- SPEAK FUNCTION ----------------
function speak(text) {
  const textSpeak = new SpeechSynthesisUtterance(text);
  textSpeak.rate = 1;
  textSpeak.pitch = 1;
  textSpeak.volume = 1;
  textSpeak.lang = "en-IN"; // FIXED: better supported language
  window.speechSynthesis.speak(textSpeak);
}

// ---------------- GREETING ----------------
function wishMe() {
  const hours = new Date().getHours();

  if (hours >= 0 && hours < 12) {
    speak("Good Morning Sir");
  } else if (hours >= 12 && hours < 16) {
    speak("Good Afternoon Sir");
  } else {
    speak("Good Evening Sir");
  }
}

window.addEventListener("load", wishMe);

// ---------------- SPEECH RECOGNITION ----------------
const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition = new SpeechRecognition();
recognition.lang = "en-IN";
recognition.interimResults = false;

recognition.onresult = (event) => {
  const transcript = event.results[0][0].transcript;
  content.innerText = transcript;
  takeCommand(transcript.toLowerCase());
};

// ---------------- BUTTON CLICK ----------------
btn.addEventListener("click", () => {
  recognition.start();
  btn.style.display = "none";
  voice.style.display = "block";
});

// ---------------- COMMAND HANDLER ----------------
function takeCommand(message) {
  btn.style.display = "flex";
  voice.style.display = "none";

  if (message.includes("hello") || message.includes("hey")) {
    speak("Hello sir, what can I help you with?");
  }

  else if (message.includes("who are you")) {
    speak("I am a virtual assistant created by Ganesh sir");
  }

  else if (message.includes("open youtube")) {
    speak("Opening YouTube");
    window.open("https://www.youtube.com", "_blank");
  }

  else if (message.includes("open google")) {
    speak("Opening Google");
    window.open("https://www.google.com", "_blank");
  }

  else if (message.includes("open github")) {
    speak("Opening GitHub");
    window.open("https://www.github.com", "_blank");
  }

  else if (message.includes("time")) {
    const time = new Date().toLocaleTimeString();
    speak(`The time is ${time}`);
  }

  else if (message.includes("date")) {
    const date = new Date().toLocaleDateString();
    speak(`Today's date is ${date}`);
  }

  else {
    const query = message.replace("chitti", "").trim();
    speak(`Here is what I found on the internet regarding ${query}`);
    window.open(
      `https://www.google.com/search?q=${encodeURIComponent(query)}`,
      "_blank"
    );
  }
}
