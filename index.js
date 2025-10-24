// In your index.js - Webhook handler
app.post('/webhook', async (req, res) => {
  try {
    console.log('Received webhook:', JSON.stringify(req.body, null, 2));
    
    if (req.body.object === 'whatsapp_business_account') {
      const entry = req.body.entry[0];
      const changes = entry.changes[0];
      const value = changes.value;
      
      if (value.messages && value.messages.length > 0) {
        const message = value.messages[0];
        const phoneNumber = message.from;
        let userMessage = '';
        
        // Handle different message types
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
        
        console.log(`📱 Message from ${phoneNumber}: ${userMessage}`);
        
        // Process the message through form flow
        await formFlow.handleMessage(phoneNumber, userMessage);
      }
    }
    
    res.status(200).send('EVENT_RECEIVED');
  } catch (error) {
    console.error('Webhook error:', error);
    res.status(500).send('ERROR');
  }
});