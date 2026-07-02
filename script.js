const addButton = document.querySelector("button");
const studentList = document.getElementById("studentList");

addButton.addEventListener("click", function () {
    const name = document.getElementById("name").value;
    const department = document.getElementById("department").value;
    const age = document.getElementById("age").value;

    if (name === "" || department === "" || age === "") {
        alert("Please fill all fields");
        return;
    }

    const row = document.createElement("tr");

    row.innerHTML = `
        <td>${name}</td>
        <td>${department}</td>
        <td>${age}</td>
        <td><button onclick="this.parentElement.parentElement.remove()">Delete</button></td>
    `;

    studentList.appendChild(row);

    document.getElementById("name").value = "";
    document.getElementById("department").value = "";
    document.getElementById("age").value = "";
});
const searchInput = document.getElementById("search");

searchInput.addEventListener("keyup", function () {
    const filter = searchInput.value.toLowerCase();
    const rows = document.querySelectorAll("#studentList tr");

    rows.forEach((row) => {
        const name = row.cells[0].textContent.toLowerCase();

        if (name.includes(filter)) {
            row.style.display = "";
        } else {
            row.style.display = "none";
        }
    });
});