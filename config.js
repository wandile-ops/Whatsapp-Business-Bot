require('dotenv').config();

module.exports = {
  // WhatsApp Meta Configuration
  whatsapp: {
    accessToken: process.env.WHATSAPP_ACCESS_TOKEN,
    phoneNumberId: process.env.WHATSAPP_PHONE_NUMBER_ID,
    webhookVerifyToken: process.env.WHATSAPP_WEBHOOK_VERIFY_TOKEN,
    apiVersion: 'v18.0'
  },
  
  // Airtable Configuration
  airtable: {
    apiKey: process.env.AIRTABLE_API_KEY,
    baseId: process.env.AIRTABLE_BASE_ID,
    tableName: process.env.AIRTABLE_TABLE_NAME || 'Business Plans'
  },
  
  // Server Configuration
  server: {
    port: process.env.PORT || 3000
  },

  // Supported Languages
  languages: {
    'en': 'English',
    'zu': 'isiZulu',
    'xh': 'isiXhosa',
    'af': 'Afrikaans',
    'nso': 'Sesotho sa Leboa',
    'tn': 'Setswana',
    'st': 'Sesotho',
    'ts': 'Xitsonga',
    'ss': 'siSwati',
    've': 'Tshivenda',
    'nr': 'isiNdebele'
  }
};