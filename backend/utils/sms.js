const twilio = require('twilio');

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

// Send SMS notification
exports.sendSMS = async (phone, message) => {
  try {
    const result = await client.messages.create({
      body: message,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: phone
    });
    return { success: true, messageId: result.sid };
  } catch (error) {
    console.error('SMS Error:', error);
    return { success: false, error: error.message };
  }
};

// USSD Handler for offline access
exports.handleUSSD = (sessionId, phoneNumber, text) => {
  let response = '';

  if (text === '') {
    // Main menu
    response = `CON Welcome to LernBase Nigeria
1. View My Courses
2. Check Progress
3. Find Jobs
4. Help`;
  } else if (text === '1') {
    response = `CON My Courses:
1. Basic Welding (45% complete)
2. Phone Repair (70% complete)
0. Back`;
  } else if (text === '2') {
    response = `END Your Progress:
- Courses: 2 active
- Avg Progress: 57%
- Certificates: 1`;
  } else if (text === '3') {
    response = `CON Available Jobs:
1. Welder - Lagos
2. Phone Tech - Ikeja
0. Back`;
  } else if (text === '4') {
    response = `END LernBase Help:
Call: 0800-LERNBASE
WhatsApp: +234 800 000 0000
Visit: www.lernbase.ng`;
  } else {
    response = 'END Invalid option';
  }

  return response;
};


