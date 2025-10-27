// index.js - COMPLETE WORKING VERSION
const express = require('express');
const config = require('./config');
const formFlow = require('./form-flow');

const app = express();
app.use(express.json());

// Webhook verification endpoint
app.get('/webhook', (req, res) => {
  const mode = req.query['hub.mode'];
  const token = req.query['hub.verify_token'];
  const challenge = req.query['hub.challenge'];

  console.log('🔐 Webhook verification attempt:');
  console.log('   Mode:', mode);
  console.log('   Token:', token);
  console.log('   Challenge:', challenge);

  if (mode === 'subscribe' && token === config.whatsapp.webhookVerifyToken) {
    console.log('✅ Webhook verified successfully!');
    res.status(200).send(challenge);
  } else {
    console.log('❌ Webhook verification failed');
    res.sendStatus(403);
  }
});

// Webhook handler for incoming messages
app.post('/webhook', async (req, res) => {
  try {
    console.log('📨 Received webhook');
    
    if (req.body.object === 'whatsapp_business_account') {
      const entry = req.body.entry[0];
      const changes = entry.changes[0];
      const value = changes.value;
      
      if (value.messages && value.messages.length > 0) {
        const message = value.messages[0];
        const phoneNumber = message.from;
        let userMessage = '';
        
        console.log(`📱 Message from ${phoneNumber}`);
        
        if (message.type === 'text') {
          userMessage = message.text.body;
        } else if (message.type === 'interactive') {
          const interactiveType = message.interactive.type;
          if (interactiveType === 'button_reply') {
            userMessage = message.interactive.button_reply.title;
          } else if (interactiveType === 'list_reply') {
            userMessage = message.interactive.list_reply.title;
          }
        }
        
        if (userMessage) {
          console.log(`   Processing: "${userMessage}"`);
          await formFlow.handleMessage(phoneNumber, userMessage);
        }
      }
    }
    
    res.status(200).send('EVENT_RECEIVED');
  } catch (error) {
    console.error('❌ Webhook error:', error);
    res.status(500).send('ERROR');
  }
});

// Health check endpoint
app.get('/', (req, res) => {
  res.json({ 
    status: 'WhatsApp Business Bot is running!',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'production'
  });
});

// Handle all other routes
app.get('*', (req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

const PORT = process.env.PORT || 10000;

app.listen(PORT, () => {
  console.log(`🚀 WhatsApp Business Bot running on port ${PORT}`);
  console.log(`🌐 Webhook URL: https://your-app.onrender.com/webhook`);
  console.log(`🔐 Verify Token: ${config.whatsapp.webhookVerifyToken}`);
});