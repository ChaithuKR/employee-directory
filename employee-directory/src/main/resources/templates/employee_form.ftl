<#-- employee_form.ftl - Freemarker template for Add/Edit Employee form -->
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Add Employee</title>
  <link rel="stylesheet" href="/static/css/styles.css">
</head>
<body>
  <div class="form-modal">
    <form id="employeeForm" class="employee-form">
      <h1>Add Employee</h1>
      <div class="form-group">
        <label for="firstName">First name</label>
        <input type="text" id="firstName" name="firstName" required>
      </div>
      <div class="form-group">
        <label for="lastName">Last name</label>
        <input type="text" id="lastName" name="lastName" required>
      </div>
      <div class="form-row">
        <div class="form-group">
          <label for="email">Email</label>
          <input type="email" id="email" name="email" required>
        </div>
        <div class="form-group">
          <label for="department">Department</label>
          <select id="department" name="department" required>
            <option value="">Select...</option>
            <option value="HR">HR</option>
            <option value="IT">IT</option>
            <option value="Finance">Finance</option>
            <option value="Engineering">Engineering</option>
            <option value="Marketing">Marketing</option>
          </select>
        </div>
      </div>
      <div class="form-group">
        <label for="role">Role</label>
        <select id="role" name="role" required>
          <option value="">Select...</option>
          <option value="Manager">Manager</option>
          <option value="Developer">Developer</option>
          <option value="Analyst">Analyst</option>
          <option value="Designer">Designer</option>
          <option value="Other">Other</option>
        </select>
      </div>
      <div class="form-actions">
        <button type="button" id="cancelBtn" class="cancel-btn">Cancel</button>
        <button type="submit" class="add-btn">Add</button>
      </div>
      <div id="formErrors"></div>
    </form>
  </div>
  <script src="/static/js/main.js"></script>
</body>
</html> 