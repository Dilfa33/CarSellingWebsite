// Validation rules
const rules = {
    username: /^[a-zA-Z0-9]{3,16}$/, // Alphanumeric username, 3–16 characters
    password: /^.{6,}$/, // At least 6 characters
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, // Valid email format
};

// Validate a single field
function validateField(id, value) {
    const rule = rules[id];
    return rule ? rule.test(value) : true; // If rule exists, validate; otherwise, always valid
}

// Show or clear error messages
function toggleError(id, message) {
    const errorElement = document.getElementById(`${id}Error`);
    if (errorElement) {
        errorElement.textContent = message || "";
    }
}

// Add event listener for form submission
document.getElementById("registerForm")?.addEventListener("submit", async (e) => {
    e.preventDefault(); // Prevent default form submission
    let isValid = true;

    // Validate fields
    ["username", "email", "password"].forEach((id) => {
        const input = document.getElementById(id);
        if (!input || !validateField(id, input.value)) {
            toggleError(id, `Invalid ${id}`);
            isValid = false;
        } else {
            toggleError(id, "");
        }
    });

    // Validate password confirmation
    const password = document.getElementById("password")?.value;
    const confirmPassword = document.getElementById("confirm-password")?.value;
    if (password !== confirmPassword) {
        toggleError("confirm-password", "Passwords do not match");
        isValid = false;
    } else {
        toggleError("confirm-password", "");
    }

    // If validation fails, do not proceed
    if (!isValid) return;

    // Prepare form data
    const formData = {
        username: document.getElementById("username")?.value,
        email: document.getElementById("email")?.value,
        password: document.getElementById("password")?.value,
    };

    try {
        // Make async POST request
        const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        });

        if (response.ok) {
            const result = await response.json();
            console.log("Form submitted successfully:", result);
            alert("Form submitted successfully! Your data has been saved.");

            // Reset the form
            document.getElementById("registerForm").reset();
        } else {
            new Error("Failed to submit form");
        }
    } catch (error) {
        console.error("An error occurred:", error);
        alert("An error occurred while submitting the form.");
    }
});
