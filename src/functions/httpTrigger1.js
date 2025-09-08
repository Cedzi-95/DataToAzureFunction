const { app } = require('@azure/functions');

app.http('httpTrigger1', {
    methods: ['GET', 'POST'],
    authLevel: 'anonymous',
    handler: async (request, context) => {
        context.log(`Http function processed request for url "${request.url}"`);

       let name;
       let email;

       if (request.method == 'GET') {
        name = request.query.get('name') || 'world';
        email = request.query.get('email') || 'no email provided';
       }
       else if (request.method == 'POST') {
        try{
            const body = await request.json();
            name = body.name || 'world';
            email = body.email || 'no email provided';
        }
        catch (error) {
            return {
                status: 400,
                body: JSON.stringify({
                    error: 'Invalid JSON in request body'
                }),
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
                    'ACCESS-Control-Allow-Headers': 'Content-Type'
                }
            };
        }
       }

       //log the received data
       context.log(`Received registration: Name=${name}, Email=${email}`);

       //add logic for soving to the database
       return {
        status: 200,
        body: JSON.stringify({
            message: `Hello, ${name}! Registration successful.`,
            data: {
                name: name,
                email: email,
                timestamp: new Date().toISOString()
            }
        }),
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type'
        }
       };
    }
});
