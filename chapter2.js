function checkPuzzle() {

    const devA = Number(document.getElementById("devA").value);
    const devB = Number(document.getElementById("devB").value);
    const left = Number(document.getElementById("leftPart").value);
    const right = Number(document.getElementById("rightPart").value);
    const finalAnswer = Number(document.getElementById("finalAnswer").value);

    const message = document.getElementById("puzzleMessage");

    // Actual values
    const base = 100;
    const numA = 105;
    const numB = 107;

    const correctDevA = numA - base;
    const correctDevB = numB - base;

    const correctLeft = numA + correctDevB;
    const correctRight = correctDevA * correctDevB;

    const correctFinal = Number(
        `${correctLeft}${correctRight.toString().padStart(2, "0")}`
    );

    if (
        devA === correctDevA &&
        devB === correctDevB &&
        left === correctLeft &&
        right === correctRight &&
        finalAnswer === correctFinal
    ) {
        message.textContent = "✔ Sutra integrity confirmed.";
        message.className = "log-message success-log";
        document.getElementById("successPanel").classList.remove("hidden");
    } else {
        message.textContent = "✖ Decomposition failed. Recheck your steps.";
        message.className = "log-message error-log";
    }
}
