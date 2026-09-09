* =====================================================
   DEVOPS EMPLOYEE HUB
   JAVASCRIPT
===================================================== */


/* ================= API CONFIGURATION ================= */

const API_URL =
    "https://employee-api-latest-qt1q.onrender.com/api/employees";


/* Store employees globally */

let allEmployees = [];


/* ================= LOAD EMPLOYEES ================= */

async function loadEmployees() {

    const container =
        document.getElementById("employeeContainer");

    const status =
        document.getElementById("apiStatus");

    const dashboardStatus =
        document.getElementById("dashboardStatus");


    /* Loading UI */

    container.innerHTML = `
        <div class="loading">
            <div class="spinner"></div>
            Connecting to Spring Boot API...
        </div>
    `;


    try {

        const response =
            await fetch(API_URL);


        /* Check HTTP response */

        if (!response.ok) {

            throw new Error(
                "API returned HTTP " + response.status
            );

        }


        /* Convert JSON */

        const employees =
            await response.json();


        /* Store data */

        allEmployees = employees;


        /* Display employees */

        displayEmployees(employees);


        /* Update count */

        document.getElementById(
            "employeeCount"
        ).textContent = employees.length;


        /* Update API status */

        status.textContent =
            "API ONLINE";

        dashboardStatus.textContent =
            "ONLINE";


        console.log(
            "Employees loaded successfully:",
            employees
        );


    } catch (error) {

        console.error(
            "API Error:",
            error
        );


        container.innerHTML = `

            <div class="loading">

                <h3>⚠️ Unable to load employees</h3>

                <p>
                    Please check the Spring Boot API
                    or your internet connection.
                </p>

            </div>

        `;


        status.textContent =
            "API OFFLINE";

        dashboardStatus.textContent =
            "OFFLINE";


        document.getElementById(
            "employeeCount"
        ).textContent = "—";

    }

}


/* ================= DISPLAY EMPLOYEES ================= */

function displayEmployees(employees) {

    const container =
        document.getElementById(
            "employeeContainer"
        );


    /* No employees */

    if (!employees || employees.length === 0) {

        container.innerHTML = `

            <div class="loading">

                <h3>👥 No Employees Found</h3>

                <p>
                    The API returned an empty employee list.
                </p>

            </div>

        `;

        return;
    }


    /* Clear existing cards */

    container.innerHTML = "";


    /* Create employee cards */

    employees.forEach((employee, index) => {

        const card =
            document.createElement("div");


        card.className =
            "employee-card";


        /* Use available employee properties */

        const employeeName =
            employee.name ||
            employee.employeeName ||
            "Employee";


        const employeeId =
            employee.id ||
            employee.employeeId ||
            index + 1;


        card.innerHTML = `

            <div class="employee-icon">
                👤
            </div>


            <h3>
                ${escapeHTML(employeeName)}
            </h3>


            <p>
                Employee ID: #${escapeHTML(
                    String(employeeId)
                )}
            </p>


            <span class="role">
                DevOps Engineer
            </span>


            <button
                onclick="showEmployee(
                    ${employeeId},
                    '${escapeHTML(employeeName)}'
                )"
            >
                View Profile →
            </button>

        `;


        container.appendChild(card);

    });

}


/* ================= SEARCH ================= */

document
    .getElementById("search")
    .addEventListener(
        "input",
        function () {

            const searchValue =
                this.value
                    .toLowerCase()
                    .trim();


            const filtered =
                allEmployees.filter(
                    employee => {

                        const name =
                            String(
                                employee.name ||
                                employee.employeeName ||
                                ""
                            ).toLowerCase();


                        return name.includes(
                            searchValue
                        );

                    }
                );


            displayEmployees(filtered);

        }
    );


/* ================= API HEALTH CHECK ================= */

async function checkAPI() {

    const status =
        document.getElementById(
            "apiStatus"
        );

    const dashboardStatus =
        document.getElementById(
            "dashboardStatus"
        );


    status.textContent =
        "Checking...";


    dashboardStatus.textContent =
        "Checking...";


    try {

        const response =
            await fetch(API_URL);


        if (!response.ok) {

            throw new Error(
                "API unavailable"
            );

        }


        status.textContent =
            "API ONLINE";


        dashboardStatus.textContent =
            "ONLINE";


    } catch (error) {

        console.error(error);


        status.textContent =
            "API OFFLINE";


        dashboardStatus.textContent =
            "OFFLINE";

    }

}


/* ================= EMPLOYEE PROFILE ================= */

function showEmployee(id, name) {

    alert(
        "Employee Profile\n\n" +
        "Name: " + name + "\n" +
        "Employee ID: #" + id + "\n" +
        "Role: DevOps Engineer\n" +
        "Status: Active"
    );

}


/* ================= SCROLL ================= */

function scrollToEmployees() {

    document
        .getElementById("employees")
        .scrollIntoView({
            behavior: "smooth"
        });

}


/* ================= HTML SECURITY ================= */

/*
   Prevent API data containing HTML
   from being directly injected.
*/

function escapeHTML(value) {

    return value
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");

}


/* ================= INITIAL LOAD ================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        loadEmployees();

        checkAPI();

    }
);