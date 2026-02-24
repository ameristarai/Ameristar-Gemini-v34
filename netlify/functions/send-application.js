const nodemailer = require('nodemailer');

export const handler = async (event, context) => {
  // 1. CORS SECURITY: Define who is allowed to talk to this function
  const allowedOrigins = [
    'http://localhost:3000', // For local React testing
    'http://localhost:5173', // For local Vite testing
    'https://ameristarschool.com', // Production domain
    'https://www.ameristarschool.com'
  ];

  const origin = event.headers.origin;
  let corsHeaders = {
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };

  // If the request comes from an allowed origin, grant access
  if (allowedOrigins.includes(origin)) {
    corsHeaders['Access-Control-Allow-Origin'] = origin;
  } else {
    // If a bot hits this directly from an unknown origin, reject immediately
    return {
      statusCode: 403,
      body: JSON.stringify({ error: 'Forbidden: Invalid Origin' })
    };
  }

  // Handle standard CORS preflight requests
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers: corsHeaders, body: '' };
  }

  // Ensure only POST requests are processed
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers: corsHeaders,
      body: JSON.stringify({ error: 'Method Not Allowed' })
    };
  }

  try {
    // Parse the incoming JSON from your React frontend
    const body = JSON.parse(event.body);
    const { pdfBase64, studentEmail } = body;

    if (!pdfBase64) {
      return { statusCode: 400, headers: corsHeaders, body: JSON.stringify({ error: 'Missing PDF data' }) };
    }

    // 2. STRIP PREFIX & CONVERT TO BUFFER
    // jsPDF outputs a string like "data:application/pdf;base64,JVBERi0..."
    // We only need the raw characters after the comma.
    const base64Data = pdfBase64.replace(/^data:application\/pdf;base64,/, "");
    const pdfBuffer = Buffer.from(base64Data, 'base64');

    // 3. MALWARE SAFEGUARD: FILE TYPE VERIFICATION (Magic Numbers)
    // Every true PDF file in the world begins with "%PDF-" (Hex: 25 50 44 46)
    // If an attacker disguises an executable file as a Base64 string, this catches it.
    if (
      pdfBuffer.length < 4 ||
      pdfBuffer[0] !== 0x25 ||
      pdfBuffer[1] !== 0x50 ||
      pdfBuffer[2] !== 0x44 ||
      pdfBuffer[3] !== 0x46
    ) {
      console.error("Security Alert: Invalid file signature detected.");
      return {
        statusCode: 400,
        headers: corsHeaders,
        body: JSON.stringify({ error: 'Invalid file format. Only true PDFs are permitted.' })
      };
    }

    // 4. CONFIGURE NODEMAILER (The Email Pipe)
    // Note: You must set these variables in your Netlify Dashboard settings
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER, // e.g., yourcompany@gmail.com
        pass: process.env.GMAIL_APP_PASSWORD // The 16-character Google App Password
      }
    });

    // 5. STAPLE THE PDF AND SEND
    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: process.env.DESTINATION_EMAIL, // Where you want the application sent
      replyTo: studentEmail, // Allows your team to easily hit "Reply" to the student
      subject: `New Course Enrollment Application`,
      text: 'A new enrollment application has been securely submitted from the website. Please find the attached PDF.',
      attachments: [
        {
          filename: `Ameristar_Application.pdf`,
          content: pdfBuffer,
          contentType: 'application/pdf'
        }
      ]
    };

    await transporter.sendMail(mailOptions);

    return {
      statusCode: 200,
      headers: corsHeaders,
      body: JSON.stringify({ message: 'Application securely sent successfully!' })
    };

  } catch (error) {
    console.error('Error processing application:', error);
    return {
      statusCode: 500,
      headers: corsHeaders,
      body: JSON.stringify({ error: 'Internal Server Error' })
    };
  }
};