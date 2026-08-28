# EmailJS Integration Setup Guide

This portfolio now includes EmailJS integration for automated email sending through the contact form.

## Setup Instructions

### 1. Create an EmailJS Account
- Go to [https://www.emailjs.com/](https://www.emailjs.com/)
- Sign up for a free account
- The free tier allows up to 200 emails per month

### 2. Get Your Credentials

#### Public Key
- After logging in, go to the dashboard
- Navigate to Account → General
- Copy your Public Key

#### Service ID
- Go to Email Services → Add New Service
- Select Gmail (or your preferred email service)
- Follow the authentication steps (you'll need to connect your Gmail account)
- Once created, copy the Service ID

#### Template IDs
You'll need two templates:

**Template 1: Confirmation email to client**
- Go to Email Templates → Create New Template
- Design your email template with the following variables:
  - `{{name}}` - Client's name
  - `{{email}}` - Client's email (for To Email field)
  - `{{title}}` - Email title/subject
  - `{{message}}` - The message content
- Configure To Email as `{{email}}`
- Configure From Name as "Lazaro Meneses"
- Configure Reply To as your email
- Copy the Template ID

**Template 2: Message notification to you**
- Create another new template
- Design it to receive messages from clients
- Use the same variables: `{{name}}`, `{{email}}`, `{{message}}`
- Configure To Email as your email address
- Configure From Name as `{{name}}`
- Configure Reply To as `{{email}}`
- Copy the Template ID

### 3. Configure in main.js

Open `main.js` and replace the placeholder values around line 8:

```javascript
const EMAILJS_PUBLIC_KEY = "YOUR_EMAILJS_PUBLIC_KEY"; // Replace with your actual public key
const EMAILJS_SERVICE_ID = "YOUR_SERVICE_ID"; // Replace with your service ID
const EMAILJS_TEMPLATE_ID_CLIENT = "YOUR_CLIENT_TEMPLATE_ID"; // Template for confirmation to client
const EMAILJS_TEMPLATE_ID_OWNER = "YOUR_OWNER_TEMPLATE_ID"; // Template for message to you
```

### 4. Test the Integration

1. Open your portfolio in a browser
2. Navigate to the Contact section
3. Fill out the form with test information
4. Submit the form
5. Check your email for the test message

## Security Notes

- The public key is safe to include in client-side code
- Never share your private EmailJS keys
- Consider implementing rate limiting on your form to prevent abuse
- The free tier has limits, monitor your usage

## Template Examples

### Template 1: Confirmation to Client
**Subject:** Thank you for visiting my portfolio

**Body:**
Hi {{name}},

Thank you for visiting my portfolio and taking the time to reach out!

I have received your message and will get back to you as soon as possible (usually within 24-48 hours).

Best regards,
Lazaro Meneses

---
This is an automated confirmation from my portfolio contact form.

### Template 2: Message Notification to You
**Subject:** Nuevo mensaje del portafolio - {{name}}

**Body:**
Has recibido un nuevo mensaje de tu portafolio:

**Nombre:** {{name}}
**Email:** {{email}}

**Mensaje:**
{{message}}

---
Este mensaje fue enviado desde el formulario de contacto de tu portafolio.

## Troubleshooting

### "EmailJS not configured" error
- Make sure you've replaced all three placeholder values in main.js
- Check that the EmailJS SDK is loading properly

### Email not sending
- Verify your EmailJS service is properly connected to Gmail
- Check that your template variables match the form field names
- Ensure you haven't exceeded your monthly email limit
- Check the EmailJS dashboard for error logs

### Form validation issues
- The form still requires all fields to be filled before submission
- Email format validation is still enforced
- Error messages will display in both English and Spanish

## Features

- ✅ Automated email sending via EmailJS
- ✅ Multi-language support (English/Spanish)
- ✅ User-friendly success/error messages
- ✅ Form validation maintained
- ✅ Responsive design preserved
- ✅ No backend required

## Support

For EmailJS-specific issues, visit:
- [EmailJS Documentation](https://www.emailjs.com/docs/)
- [EmailJS Support](https://www.emailjs.com/support/)