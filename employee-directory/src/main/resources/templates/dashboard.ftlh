<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Employee Directory Dashboard</title>
  <link rel="stylesheet" href="../static/css/styles.css">
</head>
<body>
  <header class="main-header">
    <div class="header-content">
      <h1>Employee Directory</h1>
      <div class="search-filter-group">
        <input type="text" id="searchBar" placeholder="Search by name or email">
        <button id="filterPopupBtn" class="add-btn" style="background:#444;">Filter</button>
      </div>
    </div>
  </header>
  <section class="controls-row">
    <div class="sort-show-group">
      <label for="sortSelect">Sort:</label>
      <select id="sortSelect">
        <option value="">--Select--</option>
        <option value="firstName">First Name</option>
        <option value="department">Department</option>
      </select>
      <label for="paginationSelect">Show:</label>
      <select id="paginationSelect">
        <option value="10">10</option>
        <option value="25">25</option>
        <option value="50">50</option>
        <option value="100">100</option>
      </select>
    </div>
    <button id="addEmployeeBtn" class="add-btn">Add Employee</button>
  </section>
  <div class="main-content-flex">
    <main class="employee-list-section">
      <div id="employeeList" class="employee-card-grid">
        <#-- Initial employee list rendered by Freemarker -->
        <#if employees?? && employees?size gt 0>
          <#list employees as employee>
            <div class="employee-card" data-id="${employee.id}">
              <strong>${employee.firstName} ${employee.lastName}</strong>
              <p><b>Email:</b> ${employee.email}</p>
              <p><b>Department:</b> ${employee.department}</p>
              <p><b>Role:</b> ${employee.role}</p>
              <div class="employee-actions">
                <button class="editBtn" data-id="${employee.id}">Edit</button>
                <button class="deleteBtn" data-id="${employee.id}">Delete</button>
              </div>
            </div>
          </#list>
        <#else>
          <p>No employees found.</p>
        </#if>
      </div>
      <div id="pagination"></div>
    </main>
  </div>
  <footer class="main-footer">
    <p>&copy; 2025 Employee Directory App. All rights reserved.</p>
  </footer>

  <!-- Employee Form Sidebar Modal (hidden by default) -->
  <div id="employeeFormSidebar" class="sidebar-modal" style="display:none;">
    <form id="employeeForm" class="employee-form">
      <h1 id="formTitle">Add Employee</h1>
      <input type="hidden" name="employeeId" id="employeeId">
      <div class="form-group">
        <label for="firstName">First Name</label>
        <input type="text" id="firstName" name="firstName" required>
      </div>
      <div class="form-group">
        <label for="lastName">Last Name</label>
        <input type="text" id="lastName" name="lastName" required>
      </div>
      <div class="form-group">
        <label for="email">Email</label>
        <input type="email" id="email" name="email" required>
      </div>
      <div class="form-group">
        <label for="department">Department</label>
        <select id="department" name="department" required>
          <option value="">Select Department...</option>
          <option value="HR">HR</option>
          <option value="IT">IT</option>
          <option value="Finance">Finance</option>
          <option value="Marketing">Marketing</option>
          <option value="Engineering">Engineering</option>
        </select>
      </div>
      <div class="form-group">
        <label for="role">Role</label>
        <select id="role" name="role" required>
          <option value="">Select Role...</option>
          <option value="Manager">Manager</option>
          <option value="Developer">Developer</option>
          <option value="Analyst">Analyst</option>
          <option value="Designer">Designer</option>
          <option value="Other">Other</option>
        </select>
      </div>
      <div id="formErrors"></div>
      <div class="form-actions">
        <button type="button" id="cancelBtn" class="cancel-btn">Cancel</button>
        <button type="submit" class="add-btn">Save</button>
      </div>
    </form>
  </div>

  <!-- Filter Popup Modal (hidden by default) -->
  <div id="filterPopup" class="popup-modal" style="display:none;">
    <form id="filterFormPopup" class="employee-form">
      <h1>Filter Employees</h1>
      <div class="form-group">
        <label for="filterFirstName">First Name</label>
        <input type="text" id="filterFirstName" name="filterFirstName">
      </div>
      <div class="form-group">
        <label for="filterDepartment">Department</label>
        <select id="filterDepartment" name="filterDepartment">
          <option value="">All Departments</option>
          <option value="HR">HR</option>
          <option value="IT">IT</option>
          <option value="Finance">Finance</option>
          <option value="Marketing">Marketing</option>
          <option value="Engineering">Engineering</option>
        </select>
      </div>
      <div class="form-group">
        <label for="filterRole">Role</label>
        <select id="filterRole" name="filterRole">
          <option value="">All Roles</option>
          <option value="Manager">Manager</option>
          <option value="Developer">Developer</option>
          <option value="Analyst">Analyst</option>
          <option value="Designer">Designer</option>
          <option value="Other">Other</option>
        </select>
      </div>
      <div class="form-actions">
        <button type="button" id="cancelFilterBtn" class="cancel-btn">Cancel</button>
        <button type="submit" class="add-btn" style="background:#444;">Apply</button>
        <button type="button" id="resetFilterPopupBtn" class="cancel-btn">Reset</button>
      </div>
    </form>
  </div>
  
  <#-- Pass initial data to JavaScript -->
  <script>
    // Initialize with server-side data if available
    window.initialEmployees = [
      <#if employees?? && employees?size gt 0>
        <#list employees as employee>
          {
            id: ${employee.id},
            firstName: '${employee.firstName}',
            lastName: '${employee.lastName}',
            email: '${employee.email}',
            department: '${employee.department}',
            role: '${employee.role}'
          }<#if employee_has_next>,</#if>
        </#list>
      </#if>
    ];
  </script>
  <script src="../static/js/app.js"></script>
</body>
</html> 