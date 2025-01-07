document.addEventListener("DOMContentLoaded", () => {
    let employeeData = [];

    // Fetch data from JSON file
    fetch("employees.json")
        .then(response => response.json())
        .then(data => {
            employeeData = data;
            renderTable(employeeData);
        })
        .catch(error => console.error("Error loading employee data:", error));

    // Function to render the table
    function renderTable(data) {
        const tableBody = document.getElementById("employee-table-body");
        tableBody.innerHTML = ""; // Clear existing rows

        data.forEach(employee => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <th scope="row">${employee.id}</th>
                <td>${employee.name}</td>
                <td>${employee.email}</td>
                <td>${employee.phone}</td>
                <td>
                    <button class="btn btn-primary btn-sm edit-btn" data-id="${employee.id}">Edit</button>
                    <button class="btn btn-danger btn-sm delete-btn" data-id="${employee.id}">Delete</button>
                </td>
            `;
            tableBody.appendChild(row);
        });

        // Attach event listeners for edit and delete buttons
        document.querySelectorAll(".edit-btn").forEach(button =>
            button.addEventListener("click", handleEdit)
        );
        document.querySelectorAll(".delete-btn").forEach(button =>
            button.addEventListener("click", handleDelete)
        );
    }

    // Handle Delete
    function handleDelete(event) {
        const id = parseInt(event.target.getAttribute("data-id"));
        const confirmDelete = confirm("Are you sure you want to delete this employee?");
        if (confirmDelete) {
            employeeData = employeeData.filter(employee => employee.id !== id);
            renderTable(employeeData);
            toastr.success("Employee deleted successfully!");
        }
    }

    // Handle Edit
    function handleEdit(event) {
        const id = parseInt(event.target.getAttribute("data-id"));
        const employee = employeeData.find(employee => employee.id === id);

        const newName = prompt("Edit Name:", employee.name);
        const newEmail = prompt("Edit Email:", employee.email);
        const newPhone = prompt("Edit Phone Number:", employee.phone);

        if (newName && newEmail && newPhone) {
            employee.name = newName;
            employee.email = newEmail;
            employee.phone = newPhone;

            renderTable(employeeData);
            toastr.success("Employee updated successfully!");
        } else {
            toastr.error("Edit canceled or invalid input.");
        }
    }
});
