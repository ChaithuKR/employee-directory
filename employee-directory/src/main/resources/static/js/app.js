// Employee Directory Application - Main JavaScript File
// Handles all client-side functionality including CRUD operations, filtering, sorting, and pagination

// Initialize employee data from server-side (Freemarker) or use mock data
window.mockEmployees = window.initialEmployees || [
  { id: 1, firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com', department: 'HR', role: 'Manager' },
  { id: 2, firstName: 'Jane', lastName: 'Smith', email: 'jane.smith@example.com', department: 'IT', role: 'Developer' },
  { id: 3, firstName: 'Alice', lastName: 'Johnson', email: 'alice.johnson@example.com', department: 'Finance', role: 'Analyst' },
  { id: 4, firstName: 'Bob', lastName: 'Williams', email: 'bob.williams@example.com', department: 'Marketing', role: 'Manager' },
  { id: 5, firstName: 'Charlie', lastName: 'Brown', email: 'charlie.brown@example.com', department: 'IT', role: 'Developer' }
];

// Application State Management
let filteredEmployees = [...mockEmployees];
let currentPage = 1;
let itemsPerPage = 10;
let currentSort = '';
let currentSearch = '';
let currentFilters = { firstName: '', department: '', role: '' };

// DOM Element References
const employeeList = document.getElementById('employeeList');
const searchBar = document.getElementById('searchBar');
const sortSelect = document.getElementById('sortSelect');
const paginationSelect = document.getElementById('paginationSelect');
const addEmployeeBtn = document.getElementById('addEmployeeBtn');
const paginationDiv = document.getElementById('pagination');

// Form Elements
const employeeFormSidebar = document.getElementById('employeeFormSidebar');
const form = document.getElementById('employeeForm');
const formTitle = document.getElementById('formTitle');
const formErrors = document.getElementById('formErrors');
const cancelBtn = document.getElementById('cancelBtn');
const employeeIdInput = document.getElementById('employeeId');
const firstNameInput = document.getElementById('firstName');
const lastNameInput = document.getElementById('lastName');
const emailInput = document.getElementById('email');
const departmentInput = document.getElementById('department');
const roleInput = document.getElementById('role');

// Filter Elements
const filterPopupBtn = document.getElementById('filterPopupBtn');
const filterPopup = document.getElementById('filterPopup');
const filterFormPopup = document.getElementById('filterFormPopup');
const cancelFilterBtn = document.getElementById('cancelFilterBtn');
const resetFilterPopupBtn = document.getElementById('resetFilterPopupBtn');
const filterFirstNameInput = document.getElementById('filterFirstName');
const filterDepartmentInput = document.getElementById('filterDepartment');
const filterRoleInput = document.getElementById('filterRole');

/**
 * Renders the employee list with current filters, search, and pagination
 */
function renderEmployeeList() {
  // Start with all employees
  let list = [...mockEmployees];
  
  // Apply filters
  if (currentFilters.firstName) {
    list = list.filter(e => e.firstName.toLowerCase().includes(currentFilters.firstName.toLowerCase()));
  }
  if (currentFilters.department) {
    list = list.filter(e => e.department.toLowerCase().includes(currentFilters.department.toLowerCase()));
  }
  if (currentFilters.role) {
    list = list.filter(e => e.role.toLowerCase().includes(currentFilters.role.toLowerCase()));
  }
  
  // Apply search
  if (currentSearch) {
    const searchTerm = currentSearch.toLowerCase();
    list = list.filter(e =>
      e.firstName.toLowerCase().includes(searchTerm) ||
      e.lastName.toLowerCase().includes(searchTerm) ||
      e.email.toLowerCase().includes(searchTerm)
    );
  }
  
  // Apply sorting
  if (currentSort === 'firstName') {
    list.sort((a, b) => a.firstName.localeCompare(b.firstName));
  } else if (currentSort === 'department') {
    list.sort((a, b) => a.department.localeCompare(b.department));
  }
  
  // Update filtered employees
  filteredEmployees = list;
  
  // Handle pagination
  const total = filteredEmployees.length;
  const totalPages = Math.ceil(total / itemsPerPage) || 1;
  if (currentPage > totalPages) currentPage = totalPages;
  const start = (currentPage - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  const pageEmployees = filteredEmployees.slice(start, end);
  
  // Render employee cards
  if (employeeList) {
    employeeList.innerHTML = pageEmployees.map(emp => `
      <div class="employee-card" data-id="${emp.id}">
        <strong>${emp.firstName} ${emp.lastName}</strong>
        <p><b>Email:</b> ${emp.email}</p>
        <p><b>Department:</b> ${emp.department}</p>
        <p><b>Role:</b> ${emp.role}</p>
        <div class="employee-actions">
          <button class="editBtn" data-id="${emp.id}" title="Edit employee">Edit</button>
          <button class="deleteBtn" data-id="${emp.id}" title="Delete employee">Delete</button>
        </div>
      </div>
    `).join('') || '<p class="no-results">No employees found matching your criteria.</p>';
  }
  
  renderPagination(totalPages);
}

/**
 * Renders pagination controls
 * @param {number} totalPages - Total number of pages
 */
function renderPagination(totalPages) {
  if (!paginationDiv) return;
  
  let html = '';
  if (totalPages > 1) {
    html += `<button ${currentPage === 1 ? 'disabled' : ''} data-page="prev" title="Previous page">Prev</button>`;
    for (let i = 1; i <= totalPages; i++) {
      html += `<button class="page-btn${i === currentPage ? ' active' : ''}" data-page="${i}" title="Page ${i}">${i}</button>`;
    }
    html += `<button ${currentPage === totalPages ? 'disabled' : ''} data-page="next" title="Next page">Next</button>`;
  }
  paginationDiv.innerHTML = html;
}

/**
 * Shows the employee form modal
 * @param {Object|null} employee - Employee object to edit, or null for new employee
 */
function showForm(employee) {
  // Hide filter popup if open
  hideFilterPopup();
  
  if (employee) {
    // Edit mode
    formTitle.textContent = 'Edit Employee';
    employeeIdInput.value = employee.id;
    firstNameInput.value = employee.firstName;
    lastNameInput.value = employee.lastName;
    emailInput.value = employee.email;
    departmentInput.value = employee.department;
    roleInput.value = employee.role;
  } else {
    // Add mode
    formTitle.textContent = 'Add Employee';
    form.reset();
    employeeIdInput.value = '';
  }
  
  if (employeeFormSidebar) {
    employeeFormSidebar.style.display = 'flex';
  }
}

/**
 * Hides the employee form modal
 */
function hideForm() {
  if (employeeFormSidebar) {
    employeeFormSidebar.style.display = 'none';
  }
  if (formErrors) {
    formErrors.textContent = '';
  }
}

/**
 * Validates the employee form
 * @returns {Array} Array of error messages
 */
function validateForm() {
  let errors = [];
  
  if (!firstNameInput.value.trim()) {
    errors.push('First name is required.');
  }
  if (!lastNameInput.value.trim()) {
    errors.push('Last name is required.');
  }
  if (!emailInput.value.trim()) {
    errors.push('Email is required.');
  } else if (!/^\S+@\S+\.\S+$/.test(emailInput.value)) {
    errors.push('Please enter a valid email address.');
  }
  if (!departmentInput.value) {
    errors.push('Department is required.');
  }
  if (!roleInput.value) {
    errors.push('Role is required.');
  }
  
  return errors;
}

/**
 * Shows the filter popup modal
 */
function showFilterPopup() {
  if (employeeFormSidebar) {
    employeeFormSidebar.style.display = 'none';
  }
  if (filterPopup) {
    filterPopup.style.display = 'flex';
  }
}

/**
 * Hides the filter popup modal
 */
function hideFilterPopup() {
  if (filterPopup) {
    filterPopup.style.display = 'none';
  }
}

// Event Listeners Setup
document.addEventListener('DOMContentLoaded', function() {
  // Search functionality
  if (searchBar) {
    searchBar.addEventListener('input', e => {
      currentSearch = e.target.value;
      currentPage = 1;
      renderEmployeeList();
    });
  }
  
  // Sorting functionality
  if (sortSelect) {
    sortSelect.addEventListener('change', e => {
      currentSort = e.target.value;
      renderEmployeeList();
    });
  }
  
  // Pagination items per page
  if (paginationSelect) {
    paginationSelect.addEventListener('change', e => {
      itemsPerPage = parseInt(e.target.value, 10);
      currentPage = 1;
      renderEmployeeList();
    });
  }
  
  // Add employee button
  if (addEmployeeBtn) {
    addEmployeeBtn.addEventListener('click', () => {
      showForm(null);
    });
  }
  
  // Filter popup controls
  if (filterPopupBtn) {
    filterPopupBtn.addEventListener('click', showFilterPopup);
  }
  if (cancelFilterBtn) {
    cancelFilterBtn.addEventListener('click', hideFilterPopup);
  }
  if (resetFilterPopupBtn) {
    resetFilterPopupBtn.addEventListener('click', function() {
      if (filterFirstNameInput) filterFirstNameInput.value = '';
      if (filterDepartmentInput) filterDepartmentInput.value = '';
      if (filterRoleInput) filterRoleInput.value = '';
      currentFilters = { firstName: '', department: '', role: '' };
      hideFilterPopup();
      renderEmployeeList();
    });
  }
  
  // Filter form submission
  if (filterFormPopup) {
    filterFormPopup.addEventListener('submit', function(e) {
      e.preventDefault();
      if (filterFirstNameInput) currentFilters.firstName = filterFirstNameInput.value;
      if (filterDepartmentInput) currentFilters.department = filterDepartmentInput.value;
      if (filterRoleInput) currentFilters.role = filterRoleInput.value;
      hideFilterPopup();
      currentPage = 1;
      renderEmployeeList();
    });
  }
  
  // Employee list actions (edit/delete)
  if (employeeList) {
    employeeList.addEventListener('click', e => {
      if (e.target.classList.contains('editBtn')) {
        const id = Number(e.target.dataset.id);
        const emp = mockEmployees.find(e => e.id === id);
        if (emp) {
          showForm(emp);
        }
      } else if (e.target.classList.contains('deleteBtn')) {
        const id = Number(e.target.dataset.id);
        if (confirm('Are you sure you want to delete this employee? This action cannot be undone.')) {
          const idx = mockEmployees.findIndex(e => e.id === id);
          if (idx !== -1) {
            mockEmployees.splice(idx, 1);
            renderEmployeeList();
          }
        }
      }
    });
  }
  
  // Pagination controls
  if (paginationDiv) {
    paginationDiv.addEventListener('click', e => {
      if (e.target.tagName === 'BUTTON') {
        const page = e.target.dataset.page;
        if (page === 'prev') {
          if (currentPage > 1) {
            currentPage--;
            renderEmployeeList();
          }
        } else if (page === 'next') {
          const totalPages = Math.ceil(filteredEmployees.length / itemsPerPage) || 1;
          if (currentPage < totalPages) {
            currentPage++;
            renderEmployeeList();
          }
        } else {
          currentPage = parseInt(page, 10);
          renderEmployeeList();
        }
      }
    });
  }
  
  // Employee form submission
  if (form) {
    form.addEventListener('submit', function(event) {
      event.preventDefault();
      if (formErrors) formErrors.textContent = '';
      
      const errors = validateForm();
      if (errors.length > 0) {
        if (formErrors) {
          formErrors.textContent = errors.join(' ');
        }
        return;
      }
      
      const employeeData = {
        id: employeeIdInput.value ? Number(employeeIdInput.value) : Date.now(),
        firstName: firstNameInput.value.trim(),
        lastName: lastNameInput.value.trim(),
        email: emailInput.value.trim(),
        department: departmentInput.value,
        role: roleInput.value
      };
      
      if (employeeIdInput.value) {
        // Edit existing employee
        const idx = mockEmployees.findIndex(e => e.id === employeeData.id);
        if (idx !== -1) {
          mockEmployees[idx] = employeeData;
        }
      } else {
        // Add new employee
        mockEmployees.push(employeeData);
      }
      
      hideForm();
      renderEmployeeList();
    });
  }
  
  // Cancel button
  if (cancelBtn) {
    cancelBtn.addEventListener('click', hideForm);
  }
  
  // Initial render
  renderEmployeeList();
});

// Expose functions for external use
window.renderEmployeeList = renderEmployeeList;
window.showEmployeeForm = showForm; 