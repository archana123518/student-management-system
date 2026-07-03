let addBtn = document.getElementById("addBtn");
let studentList = document.getElementById("studentList");
let searchInput = document.getElementById("search");

let students = [];
let editIndex = -1;

/* Load from Local Storage */
window.onload = function () {
    if (localStorage.getItem("students")) {
        students = JSON.parse(localStorage.getItem("students"));
        displayStudents();
    }
};

/* Save to Local Storage */
function saveToLocalStorage() {
    localStorage.setItem("students", JSON.stringify(students));
}

/* Display Students */
function displayStudents(data = students) {
    studentList.innerHTML = "";

    data.forEach((student, index) => {
        studentList.innerHTML += `
            <tr>
                <td>${student.name}</td>
                <td>${student.department}</td>
                <td>${student.age}</td>
                <td>
                    <button class="action-btn edit-btn" onclick="editStudent(${index})">Edit</button>
                    <button class="action-btn delete-btn" onclick="deleteStudent(${index})">Delete</button>
                </td>
            </tr>
        `;
    });
}

/* Add / Update Student */
addBtn.addEventListener("click", function () {
    let name = document.getElementById("name").value;
    let department = document.getElementById("department").value;
    let age = document.getElementById("age").value;

    if (name === "" || department === "" || age === "") {
        alert("All fields are required!");
        return;
    }

    let student = { name, department, age };

    if (editIndex === -1) {
        students.push(student);
    } else {
        students[editIndex] = student;
        editIndex = -1;
        addBtn.innerText = "Add Student";
    }

    saveToLocalStorage();
    displayStudents();

    document.getElementById("name").value = "";
    document.getElementById("department").value = "";
    document.getElementById("age").value = "";
});

/* Delete Student */
function deleteStudent(index) {
    students.splice(index, 1);
    saveToLocalStorage();
    displayStudents();
}

/* Edit Student */
function editStudent(index) {
    document.getElementById("name").value = students[index].name;
    document.getElementById("department").value = students[index].department;
    document.getElementById("age").value = students[index].age;

    editIndex = index;
    addBtn.innerText = "Update Student";
}

/* Search Student */
searchInput.addEventListener("input", function () {
    let value = searchInput.value.toLowerCase();

    let filtered = students.filter(student =>
        student.name.toLowerCase().includes(value) ||
        student.department.toLowerCase().includes(value) ||
        student.age.toString().includes(value)
    );

    displayStudents(filtered);
});