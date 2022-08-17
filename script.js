class RealTimeWatch {

    constructor() {
        RealTimeWatch.setThemeToDOM()
    }

    // 12 hour watch 
    static run12HourWatch() {
        let timeObject = {
            hour: new Date().getHours() > 12 ? new Date().getHours() - 12 : new Date().getHours(),
            minute: new Date().getMinutes() < 10 ? "0" + new Date().getMinutes() : new Date().getMinutes(),
            second: new Date().getSeconds() < 10 ? "0" + new Date().getSeconds() : new Date().getSeconds(),
            amPM: (new Date().getHours() > 12) ? "PM" : "AM",
        }

        if (timeObject.hour === 0) {
            timeObject.hour = 12
        }

        if (timeObject.hour < 10) {
            timeObject.hour = "0" + timeObject.hour
        }

        let { hour, minute, second, amPM } = timeObject

        document.querySelector("#hour").innerText = hour
        document.querySelector("#minute").innerText = minute
        document.querySelector("#second").innerText = second
        document.querySelector("#ampm").innerText = amPM
    }

    // 24 hour watch
    static run24HourWatch() {
        let timeObject = {
            hour: new Date().getHours(),
            minute: new Date().getMinutes(),
            second: new Date().getSeconds(),
        }

        let { hour, minute, second, amPM } = timeObject

        document.querySelector("#hour").innerText = hour
        document.querySelector("#minute").innerText = minute
        document.querySelector("#second").innerText = second
    }


    static themeHandler(clickedElement) {
        // console.log(clickedElement.target.innerText)
        switch (clickedElement.target.innerText) {

            case "Dark":
                clickedElement.target.innerText = "Light"
                let darkTheme = { background: "#313131", color: "gray", buttonName: "Light" }
                localStorage.setItem("theme", JSON.stringify(darkTheme))

                RealTimeWatch.setThemeToDOM()
                break;

            case "Light":
                clickedElement.target.innerText = "Dark"
                let lightTheme = { background: "#eee", color: "black", buttonName: "Dark" }
                localStorage.setItem("theme", JSON.stringify(lightTheme))

                RealTimeWatch.setThemeToDOM()
                break;

            default:
                break;
        }
    }

    static setThemeToDOM() {
        if (localStorage.getItem("theme") === null) {
            return;
        } else {
            let localStorageParsedData = JSON.parse(localStorage.getItem("theme"))
            document.querySelector("#theme").innerText = localStorageParsedData.buttonName
            document.body.style.background = localStorageParsedData.background
            document.body.style.color = localStorageParsedData.color
        }
    }
}

let firstInstance_RealTimeWatch = new RealTimeWatch()

let twelve_hour_interval = setInterval(() => RealTimeWatch.run12HourWatch(), 1000)

document.querySelector("#theme").addEventListener("click", (clickedElement) => {
    return RealTimeWatch.themeHandler(clickedElement)
})
