# Dynamic Form Builder

A dynamic, schema-driven form generator built with React, TypeScript, and Material UI.

## ✨ Features

- Render forms dynamically from JSON schemas
- Field types: `text`, `textarea`, `dropdown`, `radio`, `checkbox`, `group`
- Conditional visibility with `visibleIf`
- Validations (required, regex, dependent rules)
- Modal preview of submitted data
- Mock API integration (company lookup)

---

 1. Install dependencies
npm install

2. Run the development server
npm run dev

3. Build for production
npm run build

Example Input JSON Schemas
Basic Form:
{
  "fields": [
    {
      "type": "text",
      "label": "First Name",
      "name": "firstName",
      "validation": {
        "required": true,
        "message": "First name is required"
      }
    },
    {
      "type": "textarea",
      "label": "About",
      "name": "about",
      "validation": {
        "required": true,
        "message": "About section is required"
      }
    }
  ]
}

Conditional + Dependent Validation
{
  "fields": [
    {
      "type": "radio",
      "label": "Identification Type",
      "name": "idType",
      "options": ["PERSONAL ID", "PASSPORT"],
      "validation": {
        "required": true,
        "message": "Please select identification type"
      }
    },
    {
      "type": "text",
      "label": "Identification Number",
      "name": "idNumber",
      "validation": {
        "dependsOn": {
          "field": "idType",
          "rules": {
            "PERSONAL ID": {
              "required": true,
              "pattern": "^[0-9]{10}$",
              "message": "Must be exactly 10 digits"
            },
            "PASSPORT": {
              "required": true,
              "pattern": "^[A-Z0-9]{6,9}$",
              "message": "Must be 6–9 uppercase letters or numbers"
            }
          }
        }
      }
    }
  ]
}

Group Fields + Mock API
{
  "fields": [
    {
      "type": "dropdown",
      "label": "User Type",
      "name": "userType",
      "options": ["INDIVIDUAL", "BUSINESS"],
      "validation": {
        "required": true,
        "message": "User type is required"
      }
    },
    {
      "type": "group",
      "label": "Business Details",
      "name": "businessDetails",
      "visibleIf": {
        "field": "userType",
        "equals": "BUSINESS"
      },
      "fields": [
        {
          "type": "dropdown",
          "label": "Company Name",
          "name": "companyName"
        },
        {
          "type": "text",
          "label": "Company EIK",
          "name": "companyEIK"
        }
      ]
    }
  ]
}

How It Works
 * Paste the JSON schema into the FormLoader textarea.
 * Click Render Form.
 * The form is generated dynamically.

  On submission:
 * A spinner briefly appears.
 * Then, a modal displays the submitted JSON data.
 * Form resets after closing the modal.


Technologies:
 React 19
 TypeScript
 Material UI
 Vite

Project Structure
src/
  ├── components/
  │   ├── fields/          # All form field components
  │   ├── FormRenderer.tsx # Core form renderer logic
  │   ├── FormLoader.tsx   # Paste JSON and render
  │   └── PreviewModal.tsx # Modal for showing submitted data
  ├── api/                 # Mock API fetch for companies
  ├── types/               # Shared TypeScript types
  └── utils/               # Validation and visibility logic