const axios = require('axios');
const config = require('./config');

class WhatsAppService {
  constructor() {
    this.baseURL = `https://graph.facebook.com/${config.whatsapp.apiVersion}/${config.whatsapp.phoneNumberId}/messages`;
    this.headers = {
      'Authorization': `Bearer ${config.whatsapp.accessToken}`,
      'Content-Type': 'application/json'
    };
  }

  // Send text message
  async sendTextMessage(to, text) {
    try {
      const data = {
        messaging_product: 'whatsapp',
        to: to,
        text: { body: text }
      };

      const response = await axios.post(this.baseURL, data, { headers: this.headers });
      return response.data;
    } catch (error) {
      console.error('Error sending WhatsApp message:', error.response?.data || error.message);
      throw error;
    }
  }

  // Send interactive buttons
  async sendButtons(to, text, buttons) {
    try {
      const data = {
        messaging_product: 'whatsapp',
        to: to,
        type: 'interactive',
        interactive: {
          type: 'button',
          body: {
            text: text
          },
          action: {
            buttons: buttons.map((btn, index) => ({
              type: 'reply',
              reply: {
                id: `btn_${index}`,
                title: btn.title
              }
            }))
          }
        }
      };

      const response = await axios.post(this.baseURL, data, { headers: this.headers });
      return response.data;
    } catch (error) {
      console.error('Error sending buttons:', error.response?.data || error.message);
      throw error;
    }
  }

  // Send list/menu
  async sendList(to, text, buttonText, sections) {
    try {
      const data = {
        messaging_product: 'whatsapp',
        to: to,
        type: 'interactive',
        interactive: {
          type: 'list',
          header: {
            type: 'text',
            text: text.substring(0, 60) // Header has character limit
          },
          body: {
            text: text.length > 60 ? text : 'Please select an option:'
          },
          footer: {
            text: 'Select from the list below'
          },
          action: {
            button: buttonText,
            sections: sections
          }
        }
      };

      const response = await axios.post(this.baseURL, data, { headers: this.headers });
      return response.data;
    } catch (error) {
      console.error('Error sending list:', error.response?.data || error.message);
      throw error;
    }
  }
}

module.exports = new WhatsAppService();