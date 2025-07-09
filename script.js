let btn = document.querySelector("#btn")
let content = document.querySelector("#contect")
let voice = document.querySelector("#voice")


function speak(text) {
    let text_speak = new SpeechSynthesisUtterance(text)
    text_speak.rate = 1
    text_speak.pitch = 1
    text_speak.volume = 1
    text_speak.lang = "hi-GB"
    window.speechSynthesis.speak(text_speak)
}

function wishMe() {
    let day = new Date()
    let hours = day.getHours()
    if (hours >= 0 && hours < 12) {
        speak("Good Morning Sir")
    }
    else if (hours >= 12 && hours < 16) {
        speak("Good afternoon Sir")
    } else {
        speak("Good Evening Sir")
    }
}
window.addEventListener('load', () => {
    wishMe()
})
let speechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition

let recognition = new speechRecognition()
recognition.onresult = (event) => {
    let currentIndex = event.resultIndex
    let transcript = event.results[currentIndex][0].transcript
    content.innerText = transcript
    takeCommand(transcript.toLowerCase())

}

btn.addEventListener("click", () => {
    recognition.start()
    btn.style.display = "none"
    voice.style.display = "block"
})
function takeCommand(message) {
    btn.style.display = "flex"
    voice.style.display = "none"
    if (message.includes("hello") || message.includes("hey")) {
        speak("hello sir,what can i help you?")
    }
    else if (message.includes("who are you")) {
        speak("i am virtual assistant ,created by Ganesh sir")

    } else if (message.includes("open youtube")) {
        speak("opening youtube...")
        window.open("https://www.youtube.com/", "_blank")
    }
    else if (message.includes("open youtube")) {
        speak("opening youtube...")
        window.open("https://www.youtube.com/", "_blank")
    }
    else if (message.includes("open google")) {
        speak("opening youtube...")
        window.open("https://www.google.com/", "_blank")
    }
    else if (message.includes("open github")) {
        speak("opening youtube...")
        window.open("https://www.github.com/", "_blank")
    }
    else if (message.includes("time")) {
        let date = new Date().toLocaleString(undefined, { hour: "numeric", month: "short" })
        speak(date)
    }
    else if (message.includes("date")) {
        let time = new Date().toLocaleString(undefined, { day: "numeric", minute: "numeric" })
        speak(time)
    }
    else {
        let finalText =
            "this is what is found on internet regarding" +
            message.replace("chitti", "") || message.replace("chitti", "")
        speak(finalText)
        Window.open(`https://www.google.com/search?q=${message.replace("chitti", "") || message.replace("chiti", "")}`)
    }
}