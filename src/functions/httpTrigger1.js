const { app } = require('@azure/functions');
const { Pool } = require('pg');

// Database connection configuration
const pool = new Pool({
    host: process.env.PGHOST,
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    database: process.env.PGDATABASE,
    port: process.env.PGPORT,
    ssl: {
        rejectUnauthorized: false // Required for Azure PostgreSQL
    }
});

app.http('httpTrigger1', {
    methods: ['GET', 'POST'],
    authLevel: 'anonymous',
    handler: async (request, context) => {
        context.log('Http function processed request for url "' + request.url + '"');

        // Set CORS headers
        const headers = {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization'
        };

        // Handle OPTIONS request for CORS preflight
        if (request.method === 'OPTIONS') {
            return {
                status: 200,
                headers: headers,
                body: ''
            };
        }

        try {
            let name, email;

            if (request.method === 'POST') {
                // Get data from POST request body
                const requestBody = await request.json();
                name = requestBody.name || 'No name provided';
                email = requestBody.email || 'No email provided';
            } else {
                // GET request - use query parameters or defaults
                name = request.query.get('name') || 'world';
                email = 'no email provided';
            }

            // Create table if it doesn't exist with proper timestamp column
            const createTableQuery = `
                CREATE TABLE IF NOT EXISTS registrations (
                    id SERIAL PRIMARY KEY,
                    name VARCHAR(255) NOT NULL,
                    email VARCHAR(255) NOT NULL,
                    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
                );
            `;
            
            await pool.query(createTableQuery);

            // Add created_at column if it doesn't exist (for existing tables)
            const addTimestampColumn = `
                ALTER TABLE registrations 
                ADD COLUMN IF NOT EXISTS created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP;
            `;
            
            await pool.query(addTimestampColumn);

            // Insert user data - let created_at be set automatically by DEFAULT
            const insertQuery = 'INSERT INTO registrations (name, email) VALUES ($1, $2) RETURNING id, name, email, created_at';
            const result = await pool.query(insertQuery, [name, email]);
            
            const insertedData = result.rows[0];

            // Return success response
            return {
                status: 200,
                headers: headers,
                body: JSON.stringify({
                    message: "Registration saved successfully!",
                    data: {
                        id: insertedData.id,
                        name: insertedData.name,
                        email: insertedData.email,
                        created_at: insertedData.created_at  // Changed from 'timestamp' to 'created_at'
                    }
                })
            };

        } catch (error) {
            context.log('Database error:', error);
            
            return {
                status: 500,
                headers: headers,
                body: JSON.stringify({
                    error: "Database connection failed",
                    details: error.message
                })
            };
        }
    }
});