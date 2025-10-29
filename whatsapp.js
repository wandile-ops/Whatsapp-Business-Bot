// whatsapp.js - FIXED VERSION
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
        recipient_type: 'individual',
        to: to,
        type: 'text',
        text: { body: text }
      };

      console.log('📤 Sending text message to:', to);
      const response = await axios.post(this.baseURL, data, { headers: this.headers });
      return response.data;
    } catch (error) {
      console.error('❌ Error sending WhatsApp message:', error.response?.data || error.message);
      throw error;
    }
  }

  // Send interactive buttons - FIXED
  async sendButtons(to, text, buttons) {
    try {
      const buttonArray = buttons.map((btn, index) => ({
        type: 'reply',
        reply: {
          id: `btn_${index}`,
          title: btn.title.length > 20 ? btn.title.substring(0, 20) : btn.title
        }
      }));

      const data = {
        messaging_product: 'whatsapp',
        recipient_type: 'individual',
        to: to,
        type: 'interactive',
        interactive: {
          type: 'button',
          body: {
            text: text
          },
          action: {
            buttons: buttonArray
          }
        }
      };

      console.log('📤 Sending buttons to:', to);
      console.log('Button options:', buttons.map(b => b.title));
      
      const response = await axios.post(this.baseURL, data, { headers: this.headers });
      return response.data;
    } catch (error) {
      console.error('❌ Error sending buttons:', error.response?.data || error.message);
      
      // Fallback to text message if buttons fail
      console.log('🔄 Falling back to text message...');
      const buttonText = buttons.map((btn, index) => `${index + 1}. ${btn.title}`).join('\n');
      return await this.sendTextMessage(to, `${text}\n\n${buttonText}\n\nPlease reply with the number (e.g., "1")`);
    }
  }

  // Send list/menu - FIXED
  async sendList(to, header, body, buttonText, sections) {
    try {
      const data = {
        messaging_product: 'whatsapp',
        recipient_type: 'individual',
        to: to,
        type: 'interactive',
        interactive: {
          type: 'list',
          header: {
            type: 'text',
            text: header.substring(0, 60) // Header has character limit
          },
          body: {
            text: body.length > 60 ? body.substring(0, 300) : body // Body limit
          },
          action: {
            button: buttonText.substring(0, 20), // Button text limit
            sections: sections.map(section => ({
              ...section,
              rows: section.rows.map(row => ({
                ...row,
                title: row.title.substring(0, 24), // Title limit
                description: row.description ? row.description.substring(0, 72) : undefined
              }))
            }))
          }
        }
      };

      console.log('📤 Sending list to:', to);
      console.log('List sections:', sections.length);
      
      const response = await axios.post(this.baseURL, data, { headers: this.headers });
      return response.data;
    } catch (error) {
      console.error('❌ Error sending list:', error.response?.data || error.message);
      
      // Fallback to text message if list fails
      console.log('🔄 Falling back to text message...');
      let optionsText = '';
      sections.forEach(section => {
        optionsText += `\n${section.title}:\n`;
        section.rows.forEach((row, index) => {
          optionsText += `  ${index + 1}. ${row.title}\n`;
        });
      });
      
      return await this.sendTextMessage(to, `${header}\n\n${body}\n\nOptions:${optionsText}\n\nPlease reply with the number (e.g., "1")`);
    }
  }

  // Simple list helper for common cases
  async sendSimpleList(to, text, buttonText, options) {
    const section = {
      title: 'Options',
      rows: options.map((option, index) => ({
        id: `opt_${index}`,
        title: option.title,
        description: option.description || ''
      }))
    };

    return await this.sendList(to, 'Select an option', text, buttonText, [section]);
  }
}

module.exports = new WhatsAppService();