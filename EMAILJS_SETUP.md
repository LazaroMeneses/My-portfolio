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

#### Template ID
- Go to Email Templates → Create New Template
- Design your email template with the following variables:
  - `{{from_name}}` - Sender's name
  - `{{from_email}}` - Sender's email
  - `{{message}}` - The message content
  - `{{to_name}}` - Recipient name (Lazaro Meneses)
  - `{{reply_to}}` - Reply-to email address
- Copy the Template ID

### 3. Configure in main.js

Open `main.js` and replace the placeholder values around line 8:

```javascript
const EMAILJS_PUBLIC_KEY = "YOUR_EMAILJS_PUBLIC_KEY"; // Replace with your actual public key
const EMAILJS_SERVICE_ID = "YOUR_SERVICE_ID"; // Replace with your service ID
const EMAILJS_TEMPLATE_ID = "YOUR_TEMPLATE_ID"; // Replace with your template ID
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

## Template Example

Here's a suggested email template (configured to send confirmation to the client):

**Subject:** Thank you for visiting my portfolio - {{client_name}}

**Body:**
Hi {{client_name}},

Thank you for visiting my portfolio and taking the time to reach out!

I have received your message:
{{message}}

I'll get back to you as soon as possible.

Best regards,
Lazaro Meneses

---
This is an automated confirmation from my portfolio contact form.

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