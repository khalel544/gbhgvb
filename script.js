const scriptURL = "PUT_YOUR_SCRIPT_URL_HERE";

const form = document.getElementById("surveyForm");
const errorMessage = document.getElementById("error-message");

let count = localStorage.getItem("surveyCount") || 0;
document.getElementById("counter").innerText = count;

form.addEventListener("submit", function(e) {
    e.preventDefault();
    errorMessage.textContent = "";

    const data = {};

    for (let i = 1; i <= 8; i++) {
        const answer = document.querySelector(`input[name="q${i}"]:checked`);
        if (!answer) {
            errorMessage.textContent = "⚠️ الرجاء تعبئة جميع الأسئلة قبل الإرسال.";
            return;
        }
        data[`q${i}`] = answer.value;
    }

    const q9 = document.querySelector('textarea[name="q9"]').value.trim();
    if (q9 === "") {
        errorMessage.textContent = "⚠️ الرجاء تعبئة جميع الأسئلة قبل الإرسال.";
        return;
    }

    data.q9 = q9;

    fetch(scriptURL, {
        method: "POST",
        body: JSON.stringify(data)
    })
    .then(response => {
        count++;
        localStorage.setItem("surveyCount", count);
        document.getElementById("counter").innerText = count;

        document.getElementById("form-section").classList.add("hidden");
        document.getElementById("thankyou-section").classList.remove("hidden");
    })
    .catch(error => {
        errorMessage.textContent = "حدث خطأ أثناء الإرسال.";
    });
});
