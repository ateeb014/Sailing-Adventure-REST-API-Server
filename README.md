# Sailing-Adventure-REST-API-Server

# Overview
Imagine Sailing Adventure is a boat rental shop that needed a modern solution to manage information about sailors, boats, and reservations. The shop's management team has decided to switch from using spreadsheets to a web-based database management system. This project aims to develop a Node.js server using MySQL to handle CRUD operations for sailors, boats, and reservations. Seamlessly interact with the API using POSTMAN

# Features
1. Database Setup: The Node.js server code creates the MySQL database and tables on the first run, ensuring a seamless setup process.
2. CRUD Operations: Implements full CRUD operations for sailors, boats, and reservations.
3. Parametrized Queries: Utilizes parametrized queries for secure and efficient interactions with the MySQL database.
4. Data Validation: Ensures data integrity by validating S_Id and B_Id, and displaying relevant error messages for invalid entries.
5. Display Functionality: Displays the contents of sailors and boats tables entirely, and reservations with additional information such as sailors' and boats' names.
7. Folder Organization: Follows a recommended folder structure, with CRUD operation implementation files stored in a /lib subfolder.

# Setup and Implementation
1. Database Initialization: Checks if the database and tables exist, creating them if not.
2. Parametrized Queries: Safely interacts with the MySQL database using parametrized queries.
3. User Interface: Supports updates and deletions for sailors, boats, and reservations through a user-friendly web interface.
4. Syntax Checking: Ensures the syntax of all queries in the MySQL server is correct before integration.

# Test Cases
1.	Performs successful CRUD operations for all three tables.
2.	Validates S_Id and B_Id during reservation addition.
3.	Displays comprehensive information during reservations, including sailors' and boats' names.
4.	Allows updates for any combination of updatable fields, ensuring flexibility and usability.
5.	Considers all possible combinations for allowable updates across all tables.

# Snapshots
1.	Displays Sailors table.
2.	Displays Reservations table.
3.	Displays Boats table.
4.	Provides examples of updating values in the database tables.
5.	Provides examples of deleting values from the database tables.

# Deliverables
1.	SailingAdventureServer.js: Node.js server implementation.
2.	sailors.js: CRUD operations for the Sailors table.
3.	boats.js: CRUD operations for the Boats table.
4.	reserves.js: CRUD operations for the Reserves table.
