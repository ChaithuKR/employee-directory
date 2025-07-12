# Employee Directory Application

A modern, responsive employee directory application built with HTML, CSS, JavaScript, and Freemarker templating. The application provides a complete CRUD 
interface for managing employee data with advanced filtering, sorting, and search capabilities.

---



## 📁 Project Structure Overview

```
employee-directory/
├── src/main/resources/
│   ├── static/
│   │   ├── css/
│   │   │   └── styles.css          # Main stylesheet
│   │   └── js/
│   │       └── app.js              # Main JavaScript application
│   └── templates/
│       ├── dashboard.ftlh          # Main dashboard template (Freemarker)
│       ├── add-edit-form.ftlh      # Employee form template
│       └── employee_form.ftl       # Legacy form template
├── test.html                       # Test file for development (open directly in browser)
└── README.md                       # This file
```

**Key Files:**
- `styles.css`: All application styles, responsive and accessible.
- `app.js`: Handles all interactivity (CRUD, filter, sort, search, pagination, validation).
- `dashboard.ftlh`: Main Freemarker template for server-side rendering.
- `test.html`: Standalone HTML for quick testing and demo.

---

## 💬 Reflection

### Challenges Faced
- Handling complex UI state (filter, sort, search, pagination) in pure vanilla JS without a framework.
- Ensuring full accessibility and keyboard navigation for all interactive elements.
- Integrating Freemarker for initial server-side rendering while keeping the client-side JS in sync.

### Improvements for the Future
- Add more robust error handling and user feedback (e.g., toast notifications).
- Implement animations for modal transitions and list updates.
- Enhance the UI with avatars or profile images for employees.
- Add bulk actions (multi-select, bulk delete/export).
- Integrate with a real backend for persistent data storage.
- Add automated tests for JavaScript logic and UI components.
- Support for more advanced filtering (multi-select, date ranges, etc).
- Improve accessibility further (ARIA live regions, better focus management).

---




