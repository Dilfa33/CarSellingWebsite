// Toastr notification settings
toastr.options = {
    closeButton: true,
    debug: false,
    newestOnTop: true,
    progressBar: true,
    positionClass: "toast-top-right",
    preventDuplicates: true,
    showDuration: "300",
    hideDuration: "1000",
    timeOut: "1500",
    extendedTimeOut: "1000",
    showMethod: "fadeIn",
    hideMethod: "fadeOut"
};

// Validation rules
const rules = {
    username: /^[a-zA-Z0-9]{3,16}$/, // Alphanumeric username, 3–16 characters
    password: /^.{6,}$/ // Minimum 6 characters
};

function validateField(id, value) {
    return rules[id]?.test(value) ?? true;
}

function toggleError(id, message) {
    document.getElementById(`${id}Error`).textContent = message || "";
}

// NE RADI AUTOFILL SA BROWSERA
// RUCNO UNESITE PODATKE
// ne znam ni ja?
document.getElementById("loginForm")?.addEventListener("submit", async (e) => {
    e.preventDefault();
    const response = await fetch("assets/json_files/users.json");
    const users = await response.json();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    console.log(users, username, password);
    let isValid = true;

    // Validate inputs
    ["username", "password"].forEach((id) => {
        const input = document.getElementById(id);
        if (!input || !validateField(id, input.value)) {
            toggleError(id, `Invalid ${id}`);
            isValid = false;
        } else {
            toggleError(id, "");
        }
    });

    if (!isValid){
        console.log("not valid");
        return;
    }



    try {
        const userExists = users.some(user => user.username === username && user.password === password);

        if (userExists) {
            localStorage.setItem("isLoggedIn", "true");
            localStorage.setItem("username", username);
            toastr.success(`Welcome, ${username}!`);
            document.getElementById("welcomeMessage").innerText = `Welcome, ${username}!`;
            document.getElementById("logoutButton").style.display = "block";
            setTimeout(() => window.location.href = "index.html", 750);
        } else {
            toastr.error("Invalid username or password.");
        }
    } catch (error) {
        toastr.error("An error occurred while logging in.");
    }
});

