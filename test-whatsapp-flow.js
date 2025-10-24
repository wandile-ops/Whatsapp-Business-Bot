// test-whatsapp-flow.js (place in main directory, not tests folder)
require('dotenv').config();
const formFlow = require('./form-flow');

console.log('🎭 WhatsApp Flow Terminal Simulator\n');
console.log('This simulates a user going through the entire WhatsApp form flow');
console.log('=========================================\n');

// Test user data
const testUsers = [
  {
    name: 'Sarah Tech Entrepreneur',
    phone: '+27711234567',
    responses: [
      'Sarah Johnson',
      '0712345678',
      'sarah@techsolutions.co.za',
      '1985-06-15',
      '8506150085081',
      'Tech Solutions SA',
      '2023/123456/07',
      'Private Company (Pty Ltd)',
      '2023',
      'Startup (0–3 years)',
      '1', // Women Majority-Owned
      '6–20 employees',
      'Technology',
      'Software Development & FinTech',
      'We develop custom software solutions for small to medium businesses in South Africa. Our team creates affordable, locally-relevant software for accounting and inventory management that helps businesses digitize their operations efficiently.',
      'Small to medium enterprises in Gauteng and Western Cape, specifically retail businesses with 5-50 employees. Business owners aged 30-55 who need customized solutions.',
      'We offer locally-developed software with South African tax compliance built-in, 24/7 customer support in local languages, and pricing that is 40% cheaper than international alternatives.',
      'Skip',
      '1', // Social Media
      '2' // Term Loan
    ]
  }
];

async function simulateUserFlow(userIndex = 0) {
  const user = testUsers[userIndex];
  const phone = user.phone;
  
  console.log(`👤 Testing with: ${user.name}`);
  console.log(`📱 Phone: ${user.phone}`);
  console.log('=' .repeat(50));
  
  // Start the form
  await formFlow.handleMessage(phone, 'start');
  
  // Simulate each response with delays
  for (let i = 0; i < user.responses.length; i++) {
    const response = user.responses[i];
    
    // Add delay to simulate real user typing
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    console.log(`\n📤 User response ${i + 1}: "${response}"`);
    console.log('-'.repeat(30));
    
    await formFlow.handleMessage(phone, response);
    
    // Add longer delay after interactive elements
    if (response.includes('employees') || response.includes('Technology') || response.includes('Sole Proprietorship')) {
      await new Promise(resolve => setTimeout(resolve, 2000));
    }
  }
  
  console.log('\n🎉 User flow simulation completed!');
  console.log('📊 Check your Airtable to verify the data was saved.');
}

// Run the simulation
simulateUserFlow(0);