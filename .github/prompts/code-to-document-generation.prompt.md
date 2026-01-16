Given a source code file, generate a README file named after it.  
The README should clearly document:

1. **File/Screen Name** – the name of the code file or screen.
2. **Primary Functionality** – the main purpose of the file.
3. **Business Logic/Rules** – analyze the code implementation and summarize the business rules being applied. (e.g., "User cannot log in if password attempts exceed 3" or "Premium is recalculated when policy term changes").
4. **Business/Screen Role** – how this file fits into the application flow.
5. **Data Flow** – describe actual data handling from the code:
    - Inputs (form fields, function arguments, API request payloads)
    - Transformations or validations applied
    - Outputs (return values, UI updates, API responses, state changes)
    - If the code includes a preview modal or similar feature, document any data transformation logic used for previewing or submitting data.
    - If there is complex validation logic (e.g., different rules for different answers), describe these rules in detail, including any conditional requirements.
    - If the user can edit sections from a preview or summary screen, document this capability and its flow.
    - List and explain any state variables used for progress tracking, UI control, or error handling.
    - Document the handling and display of error messages, including specific conditions and user feedback.
6. **Supporting Modules/Dependencies** – extract all `import` statements, list the imported items, and include their relative paths as clickable markdown links.
   Rules:
-   The README filename must follow the format `<OriginalFileNameWithoutExtension>.md`.
-   Place the file under the folder `module-details/`.
-   Ensure every imported module is listed in the README with its path.
-   Business rules and data flow must be **derived from the actual code**; avoid generic placeholders.
-   Keep explanations concise, accurate, and technical.
