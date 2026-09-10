* =====================================================
   DEVOPS EMPLOYEE HUB
   JAVASCRIPT
===================================================== */


/* ================= API CONFIGURATION ================= */
const API_URL = '/api/employees';

async function checkAPI() {
  const statusEl = document.getElementById('apiStatus');
  const dashStatus = document.getElementById('dashboardStatus');
  try {
    const res = await fetch(API_URL);
    if (res.ok) {
      statusEl.innerText = '● API Online';
      statusEl.style.color = '#22c55e';
      if(dashStatus) dashStatus.innerText = 'Online';
      return true;
    } else throw new Error();
  } catch (e) {
    statusEl.innerText = '● API Offline';
    statusEl.style.color = '#ef4444';
    if(dashStatus) dashStatus.innerText = 'Offline';
    return false;
  }
}

async function loadEmployees() {
  const container = document.getElementById('employeeContainer');
  const countEl = document.getElementById('employeeCount');
  
  container.innerHTML = `<div class="loading"><div class="spinner"></div>Loading employees...</div>`;
  
  try {
    const res = await fetch(API_URL);
    const employees = await res.json();
    console.log('Employees:', employees);

    if(countEl) countEl.innerText = employees.length;

    if (employees.length === 0) {
      container.innerHTML = `
        <div style="text-align:center; padding:40px; grid-column: 1/-1;">
          <p>No employees yet. Database is empty.</p>
          <button class="primary-btn" onclick="addSample()">+ Add Sample Employee</button>
        </div>`;
      return;
    }

    container.innerHTML = employees.map(emp => `
      <div class="employee-card">
        <div class="employee-header">
          <div class="employee-avatar">${emp.name ? emp.name.charAt(0).toUpperCase() : 'E'}</div>
          <div>
            <h3>${emp.name || 'No Name'}</h3>
            <p>${emp.department || 'General'}</p>
          </div>
        </div>
        <div class="employee-details">
          <p>📧 ${emp.email || 'No email'}</p>
          <p>🆔 ID: ${emp.id}</p>
        </div>
      </div>
    `).join('');

    // search filter
    const searchInput = document.getElementById('search');
    if(searchInput){
      searchInput.addEventListener('input', (e) => {
        const term = e.target.value.toLowerCase();
        const filtered = employees.filter(emp => 
          emp.name.toLowerCase().includes(term) || 
          emp.email.toLowerCase().includes(term) ||
          emp.department.toLowerCase().includes(term)
        );
        if(filtered.length === 0){
          container.innerHTML = '<p style="text-align:center; width:100%">No match found</p>';
        } else {
          container.innerHTML = filtered.map(emp => `
            <div class="employee-card">
              <div class="employee-header">
                <div class="employee-avatar">${emp.name.charAt(0).toUpperCase()}</div>
                <div><h3>${emp.name}</h3><p>${emp.department}</p></div>
              </div>
              <div class="employee-details">
                <p>📧 ${emp.email}</p><p>🆔 ID: ${emp.id}</p>
              </div>
            </div>`).join('');
        }
      });
    }

  } catch (err) {
    console.error(err);
    container.innerHTML = `<div style="color:red; text-align:center; grid-column:1/-1;">
      Failed to load employees<br><small>${err.message}</small><br>
      <button class="refresh-btn" onclick="loadEmployees()">Retry</button>
    </div>`;
  }
}

async function addSample(){
  await fetch(API_URL, {
    method: 'POST',
    headers: {'Content-Type':'application/json'},
    body: JSON.stringify({name: 'Aathi Kesava', email: 'aathi@test.com', department: 'DevOps'})
  });
  loadEmployees();
}

function scrollToEmployees(){
  document.getElementById('employees').scrollIntoView({behavior:'smooth'});
}

// init
checkAPI();
loadEmployees();
