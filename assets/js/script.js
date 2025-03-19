let timer; // intializing the time...
let totalSecond = 0;
let runningState = false; // initialy the running state of time is false
let runningTime;
document.getElementById("start").addEventListener("click", () => { // when we click on start if the timer is already running then it will prevent
    if (runningState) return; // it will prevent from running setTime() function twice....
    setTime(); // calling the function (if the running state is false then it will runn the code)....
})

function setTime() {
    let hour = parseInt(document.getElementById("hour").value) || 0; // get the value from input and store it in variable....
    let minute = parseInt(document.getElementById("min").value) || 0; // get the value from input and store it in variable....
    let second = parseInt(document.getElementById("sec").value) || 0; // get the value from input and store it in variable....

    if (hour == "" && minute == "" && second == "") {
        Swal.fire({
            title: "Please Enter Time",
            showClass: {
                popup: `
                animate__animated
                animate__fadeInUp
                animate__faster
              `
            },
            hideClass: {
                popup: `
                animate__animated
                animate__fadeOutDown
                animate__faster
              `
            },
            backdrop: false
        });
        return;
    }

    runningState = true;
    totalSecond = (hour * 3600) + (minute * 60) + (second); // get the total time..
    // did running state true to run the code....

    timer = setInterval(displayTimer, 1000)
}

function displayTimer() {
    if (totalSecond >= 0) {
        let hrs = Math.floor(totalSecond / 3600);
        let min = Math.floor((totalSecond % 3600) / 60);
        let sec = totalSecond % 60;

        document.querySelector(".timer-display").innerHTML = `${hrs.toString().padStart(2, "0")} : ${min.toString().padStart(2, "0")} : ${sec.toString().padStart(2, "0")}`
        totalSecond--;

        if (totalSecond < 0) {
            document.getElementById("hour").value = "";
            document.getElementById("min").value = "";
            document.getElementById("sec").value = "";
            runningState = false;
            clearInterval(timer);

            // Confetti js

            const duration = 5 * 1000,
                animationEnd = Date.now() + duration,
                defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

            function randomInRange(min, max) {
                return Math.random() * (max - min) + min;
            }

            const interval = setInterval(function () {
                const timeLeft = animationEnd - Date.now();

                if (timeLeft <= 0) {
                    return clearInterval(interval);
                }

                const particleCount = 50 * (timeLeft / duration);

                // since particles fall down, start a bit higher than random

                confetti(
                    Object.assign({}, defaults, {
                        particleCount,
                        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
                    })
                );
                confetti(
                    Object.assign({}, defaults, {
                        particleCount,
                        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
                    })
                );
            }, 250);
            // Confetti js

            document.getElementById("sound").currentTime = 0;
            document.getElementById("sound").play();
        }
    }
}


document.getElementById("reset").addEventListener("click", () => {
    clearInterval(timer);
    runningState = false;
    document.getElementById("hour").value = "";
    document.getElementById("min").value = "";
    document.getElementById("sec").value = "";
    document.querySelector(".timer-display").innerHTML = "00 : 00 : 00"

})

document.getElementById("pause").addEventListener("click", () => {
    if (timer) {
        clearInterval(timer)
        runningState = false
        timer = null;
    } else {
        timer = setInterval(displayTimer, 1000);
        runningState = true;
    }
});