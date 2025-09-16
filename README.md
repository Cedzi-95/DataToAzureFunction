DataToAzureFunction

A simple web form project where users can submit their Name and Email, which are then stored in an Azure PostgreSQL database via an Azure Function backend.

✨ Features

📋 Minimal registration form collecting Name and Email

🌐 Frontend: HTML + JavaScript (static)

⚡ Backend: Azure Function handling POST requests

🗄️ Data persistence in Azure PostgreSQL

⚙️ Configuration

Before running the project, configure the following:

Database connection string for the PostgreSQL instance:
host, port, database name, username, password

Azure Function settings (environment variables) to connect to the database

Frontend form: update the endpoint URL of the Azure Function

🚀 Usage

Open the form in your browser (index.html).

Enter your Name and Email.

Click Submit.

The frontend sends a POST request to the Azure Function backend.

The Azure Function processes the request and saves the data to PostgreSQL.

Verify in the database that a new row has been inserted.

📦 Deployment

To deploy on Azure:

Deploy the Azure Function (via Azure CLI, Portal, or GitHub Actions).

Host the frontend (e.g., Azure Static Web Apps, GitHub Pages, or any static hosting service).

Configure connection strings and environment variables in the Function’s Application Settings.

Ensure network/firewall settings allow the Function to reach the PostgreSQL database.
