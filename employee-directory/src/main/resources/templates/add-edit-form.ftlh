<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Add/Edit Employee</title>
  <link rel="stylesheet" href="/static/css/styles.css">
</head>
<body>
  <div class="form-modal">
    <form id="employeeForm" class="employee-form">
      <h1 id="formTitle">Add Employee</h1>
      <input type="hidden" id="employeeId" name="employeeId" value="${employee?if_exists.id!}">
      <div class="form-group">
        <label for="firstName">First name</label>
        <input type="text" id="firstName" name="firstName" required value="${employee?if_exists.firstName!}">
      </div>
      <div class="form-group">
        <label for="lastName">Last name</label>
        <input type="text" id="lastName" name="lastName" required value="${employee?if_exists.lastName!}">
      </div>
      <div class="form-row">
        <div class="form-group">
          <label for="email">Email</label>
          <input type="email" id="email" name="email" required value="${employee?if_exists.email!}">
        </div>
        <div class="form-group">
          <label for="department">Department</label>
          <select id="department" name="department" required>
            <option value="">Select...</option>
            <option value="HR" <#if employee?? && employee.department=="HR">selected</#if>>HR</option>
            <option value="IT" <#if employee?? && employee.department=="IT">selected</#if>>IT</option>
            <option value="Finance" <#if employee?? && employee.department=="Finance">selected</#if>>Finance</option>
            <option value="Engineering" <#if employee?? && employee.department=="Engineering">selected</#if>>Engineering</option>
            <option value="Marketing" <#if employee?? && employee.department=="Marketing">selected</#if>>Marketing</option>
          </select>
        </div>
      </div>
      <div class="form-group">
        <label for="role">Role</label>
        <select id="role" name="role" required>
          <option value="">Select...</option>
          <option value="Manager" <#if employee?? && employee.role=="Manager">selected</#if>>Manager</option>
          <option value="Developer" <#if employee?? && employee.role=="Developer">selected</#if>>Developer</option>
          <option value="Analyst" <#if employee?? && employee.role=="Analyst">selected</#if>>Analyst</option>
          <option value="Designer" <#if employee?? && employee.role=="Designer">selected</#if>>Designer</option>
          <option value="Other" <#if employee?? && employee.role=="Other">selected</#if>>Other</option>
        </select>
      </div>
      <div class="form-actions">
        <button type="button" id="cancelBtn" class="cancel-btn">Cancel</button>
        <button type="submit" class="add-btn" id="saveBtn">Save</button>
      </div>
      <div id="formErrors"></div>
    </form>
  </div>
  <script src="/static/js/form.js"></script>
</body>
</html> 