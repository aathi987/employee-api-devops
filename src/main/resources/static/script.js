const API_URL = '/api/employees';

async function checkAPI() {
  try {
    const res = await fetch(API_URL);
    const ok = res.ok;
    document.getElementById('apiStatus').innerText = ok ? 'API Online' : 'API Offline';
    document.getElementById('dashboardStatus').innerText = ok ? 'Online' : 'Offline';
  } catch (e) {
    document.getElementById('apiStatus').innerText = 'API Offline';
  }
}

async function loadEmployees() {
  const container = document.getElementById('employeeContainer');
  try {
    const res = await fetch(API_URL);
    const data = await res.json();
    document.getElementById('employeeCount').innerText = data.length;
    if (data.length === 0) {
      container.innerHTML = '<p style="text-align:center;width:100%;padding:30px">No employees found. Database is empty.</p>';
      return;
    }
    container.innerHTML = data.map(emp => 
      '<div class="employee-card"><h3>' + emp.name + '</h3><p>' + emp.email + '</p><p>' + emp.department + '</p><p>ID: ' + emp.id + '</p></div>'
    ).join('');
  } catch (err) {
    container.innerHTML = '<p style="color:red;text-align:center">Failed to load: ' + err.message + '</p>';
  }
}

function scrollToEmployees() {
  document.getElementById('employees').scrollIntoView({behavior: 'smooth'});
}

checkAPI();
loadEmployees();
