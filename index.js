const nodemailer = require('nodemailer');
const aws = require('@aws-sdk/client-ses');
const fs = require('fs');


// Create an SES client pointing to LocalStack
/*const ses = new aws.SES({
    region: 'us-east-1', // Replace with your desired region
    // endpoint: 'http://localhost:4566', // LocalStack SES endpoint
    endpoint: 'http://localhost:1025', // mailcatcher
    credentials: {
        accessKeyId: 'test', // Test access key
        secretAccessKey: 'test', // Test secret key
    },
});*/

// Create a Nodemailer transporter
/*const transporter = nodemailer.createTransport({
    SES: {
            ses, aws
    },
});*/

const transporter = nodemailer.createTransport({
    host: 'localhost',
    port: 1025,
    secure: false,
    tls: {
        rejectUnauthorized: false,
    },
});

// Send an email

try {
        // Read the file as a stream
        const attachmentStream = fs.createReadStream('text.txt');

const mailOptions = {
    from: 'hello@example.com', // Sender email address
    to: 'recipient@example.com', // Recipient email address
    subject: 'Test Email from Nodemailer & LocalStack',
    text: 'This email is sent using LocalStack.',
    attachments: [
        {
                filename: 'text.txt', // Your desired file name
                contentType: 'application/pdf',  // Set the MIME type for the file
                content: attachmentStream,    // Attach the stream
        }
    ]
};
        transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
           console.error('Error sending email:', error);
        } else {
           console.log('Email sent:', info.response);
        }
});
}catch(e){
 console.log(e)
}