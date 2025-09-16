// Frontend JavaScript for form submission with Application Insights tracking
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('userForm');
    
    // Wait for Application Insights to be ready and track page view
    function trackPageView() {
        if (window.appInsights && window.appInsights.trackPageView) {
            window.appInsights.trackPageView({
                name: 'Registration Form',
                uri: window.location.href
            });
            console.log('Page view tracked');
        } else {
            console.warn('Application Insights not available for page view tracking');
        }
    }
    
    // Track page view with a small delay to ensure AI is loaded
    setTimeout(trackPageView, 1000);
    
    form.addEventListener('submit', async function(e) {
        e.preventDefault(); // Prevent default form submission
        
        const submitStartTime = Date.now();
        
        // Get form data
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        
        // Track form submission attempt
        if (window.appInsights && window.appInsights.trackEvent) {
            window.appInsights.trackEvent({
                name: 'FormSubmissionAttempt',
                properties: {
                    email: email,
                    name: name,
                    formType: 'registration',
                    timestamp: new Date().toISOString()
                }
            });
            console.log('Form submission attempt tracked');
        }
        
        // Prepare data to send
        const formData = {
            name: name,
            email: email
        };
        
        try {
            const response = await fetch('http://localhost:7071/api/httpTrigger1', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });
            
            const submitDuration = Date.now() - submitStartTime;
            
            if (response.ok) {
                const result = await response.json();
                console.log('Success:', result);
                alert('Registration saved successfully!');
                
                // Track successful form submission
                if (window.appInsights && window.appInsights.trackEvent) {
                    window.appInsights.trackEvent({
                        name: 'FormSubmissionSuccess',
                        properties: {
                            email: email,
                            name: name,
                            userId: result.data?.id?.toString() || 'unknown',
                            responseStatus: response.status.toString()
                        },
                        measurements: {
                            submissionDuration: submitDuration,
                            responseTime: submitDuration
                        }
                    });
                    
                    // Track custom metric
                    if (window.appInsights.trackMetric) {
                        window.appInsights.trackMetric({
                            name: 'FormSubmissionTime',
                            value: submitDuration
                        });
                    }
                    
                    console.log('Form submission success tracked');
                }
                
                form.reset();
                
            } else {
                const error = await response.json();
                console.error('Error:', error);
                alert('Error saving registration: ' + error.error);
                
                // Track form submission failure
                if (window.appInsights && window.appInsights.trackEvent) {
                    window.appInsights.trackEvent({
                        name: 'FormSubmissionFailure',
                        properties: {
                            email: email,
                            name: name,
                            errorMessage: error.error || 'Unknown error',
                            responseStatus: response.status.toString(),
                            errorDetails: error.details || 'No details'
                        },
                        measurements: {
                            submissionDuration: submitDuration
                        }
                    });
                    
                    // Track as exception
                    if (window.appInsights.trackException) {
                        window.appInsights.trackException({
                            exception: new Error(`Form submission failed: ${error.error}`),
                            properties: {
                                email: email,
                                responseStatus: response.status.toString()
                            }
                        });
                    }
                    
                    console.log('Form submission failure tracked');
                }
            }
        } catch (error) {
            console.error('Network error:', error);
            alert('Network error: ' + error.message);
            
            const submitDuration = Date.now() - submitStartTime;
            
            // Track network error
            if (window.appInsights && window.appInsights.trackException) {
                window.appInsights.trackException({
                    exception: error,
                    properties: {
                        email: email,
                        name: name,
                        errorType: 'NetworkError',
                        operation: 'FormSubmission'
                    },
                    measurements: {
                        submissionDuration: submitDuration
                    }
                });
                
                if (window.appInsights.trackEvent) {
                    window.appInsights.trackEvent({
                        name: 'NetworkError',
                        properties: {
                            email: email,
                            errorMessage: error.message,
                            operation: 'FormSubmission'
                        }
                    });
                }
                
                console.log('Network error tracked');
            }
        }
    });
    
    // // Track form field interactions (optional)
    // const nameField = document.getElementById('name');
    // const emailField = document.getElementById('email');
    
    // nameField.addEventListener('focus', function() {
    //     if (window.appInsights && window.appInsights.trackEvent) {
    //         window.appInsights.trackEvent({
    //             name: 'FormFieldFocus',
    //             properties: {
    //                 fieldName: 'name',
    //                 formType: 'registration'
    //             }
    //         });
    //     }
    // });
    
    // emailField.addEventListener('focus', function() {
    //     if (window.appInsights && window.appInsights.trackEvent) {
    //         window.appInsights.trackEvent({
    //             name: 'FormFieldFocus',
    //             properties: {
    //                 fieldName: 'email',
    //                 formType: 'registration'
    //             }
    //         });
    //     }
    // });
});