// Configure toastr options
toastr.options = {
    closeButton: true,
    debug: false,
    newestOnTop: true,
    progressBar: true,
    positionClass: "toast-top-right",
    preventDuplicates: true,
    onclick: null,
    showDuration: "300",
    hideDuration: "1000",
    timeOut: "5000",
    extendedTimeOut: "1000",
    showEasing: "swing",
    hideEasing: "linear",
    showMethod: "fadeIn",
    hideMethod: "fadeOut"
};

// Test Toastr Notification
window.onload = () => {
    toastr.success("Toastr is successfully set up!");
};

// Validation rules
const rules = {
    username: /^[a-zA-Z0-9]{3,16}$/, // Alphanumeric username, 3–16 characters
    password: /^.{6,}$/, // At least 6 characters
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, // Valid email format
};

// Password strength levels
const strengthLevels = {
    weak: "Weak",
    moderate: "Moderate",
    strong: "Strong",
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

// Calculate password strength
function calculatePasswordStrength(password) {
    let strength = 0;
    if (password.length >= 6) strength++; // Length check
    if (/[A-Z]/.test(password)) strength++; // Uppercase letter
    if (/[a-z]/.test(password)) strength++; // Lowercase letter
    if (/[0-9]/.test(password)) strength++; // Numeric digit
    if (/[@$!%*?&#]/.test(password)) strength++; // Special character

    if (strength <= 2) return strengthLevels.weak;
    if (strength <= 4) return strengthLevels.moderate;
    return strengthLevels.strong;
}

// Update password strength display
function updatePasswordStrength(password) {
    const strengthText = calculatePasswordStrength(password);
    const strengthElement = document.getElementById("passwordStrength");
    strengthElement.textContent = `Strength: ${strengthText}`;
    strengthElement.className = `password-strength ${strengthText.toLowerCase()}`;
}

// Add event listener for password input
document.getElementById("password")?.addEventListener("input", (e) => {
    updatePasswordStrength(e.target.value);
});

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

    // Validate date of birth
    const dob = document.getElementById("dob")?.value;
    if (!dob) {
        toggleError("dob", "Date of Birth is required");
        isValid = false;
    } else {
        toggleError("dob", "");
    }

    // If validation fails, do not proceed
    if (!isValid) return;

    // Prepare form data
    const formData = {
        username: document.getElementById("username")?.value,
        email: document.getElementById("email")?.value,
        password: document.getElementById("password")?.value,
        dob: dob,
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
            toastr.success("Registration successful!");

            // Reset the form
            document.getElementById("registerForm").reset();
        } else {
            new Error("Failed to submit form");

        }
    } catch (error) {
        toastr.error("An error occurred while submitting the form.");
    }
});
