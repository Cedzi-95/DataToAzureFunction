DataToAzureFunction

A small web form project where users submit their Name and Email and the data gets stored in an Azure PostgreSQL database via an Azure Function backend.

Features

Simple registration form collecting Name and Email.

Frontend in HTML, JavaScript (static).

Backend is an Azure Function that accepts POST requests and writes to an Azure PostgreSQL database.

Configuration

You will need to set up/configure:

Database connection string for the PostgreSQL instance (host, port, database name, username, password).

Azure Function settings (e.g. environment variables) so that it can connect to the database.

Front-end form URL: it needs to know the URL of the Azure Function endpoint to send the data.

Usage

Open the form in your browser (e.g. index.html).

Enter Name and Email.

Submit the form.

The front-end sends a POST request to the Azure Function backend.

The Azure Function processes the request and saves the data to the PostgreSQL database.

Verify in the database that a new row has been inserted.

Deployment

To deploy to Azure:

Deploy the Azure Function (e.g. via Azure CLI / Azure Portal / GitHub Actions).

Deploy / host your frontend (could be static hosting, e.g. Azure Static Web Apps or any hosting service).

Ensure the function’s connection strings and settings are configured in the Function’s Application Settings in Azure.

Ensure network/firewall settings allow access (if needed) between your function and the database.
