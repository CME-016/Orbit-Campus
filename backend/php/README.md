# Campus Sphere PHP Backend

This backend is designed to work with a standard XAMPP installation.

## Database Setup

1.  **Start XAMPP:** Open the XAMPP control panel and start the Apache and MySQL modules.
2.  **Open phpMyAdmin:** Click on the "Admin" button for the MySQL module. This will open phpMyAdmin in your browser.
3.  **Create Database:**
    *   Click on the "Databases" tab.
    *   In the "Create database" field, enter `campus_sphere` and click "Create".
4.  **Import SQL File:**
    *   Click on the newly created `campus_sphere` database in the left-hand menu.
    *   Click on the "Import" tab.
    *   Click "Choose File" and select the `database.sql` file located in this directory.
    *   Click "Go" to import the table structure.

## Running the Backend

1.  **Copy the `php` folder** (the one inside the `backend` folder of this project) into the `htdocs` directory of your XAMPP installation. The final path should look like `C:\xampp\htdocs\php`.
2.  **Restart Apache:** In the XAMPP control panel, stop and then start the Apache module to ensure it recognizes the new files.
3.  **Verify the backend is running** by navigating to `http://localhost/php/api/login.php` in your browser. You should see a message indicating that the login data is incomplete.
