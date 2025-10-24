// debug-env.js
require('dotenv').config();

console.log('🔍 Debugging Environment Variables\n');

console.log('1. Checking if .env file exists...');
const fs = require('fs');
if (fs.existsSync('.env')) {
  console.log('   ✅ .env file exists');
  console.log('   📄 Contents:');
  console.log(fs.readFileSync('.env', 'utf8'));
} else {
  console.log('   ❌ .env file not found');
}

console.log('\n2. Checking loaded environment variables:');
console.log('   AIRTABLE_API_KEY:', process.env.AIRTABLE_API_KEY ? `"${process.env.AIRTABLE_API_KEY.substring(0, 10)}..."` : '❌ UNDEFINED');
console.log('   AIRTABLE_BASE_ID:', process.env.AIRTABLE_BASE_ID ? `"${process.env.AIRTABLE_BASE_ID}"` : '❌ UNDEFINED');
console.log('   AIRTABLE_TABLE_NAME:', process.env.AIRTABLE_TABLE_NAME ? `"${process.env.AIRTABLE_TABLE_NAME}"` : '❌ UNDEFINED');

console.log('\n3. Checking variable types:');
console.log('   AIRTABLE_TABLE_NAME type:', typeof process.env.AIRTABLE_TABLE_NAME);
console.log('   AIRTABLE_TABLE_NAME length:', process.env.AIRTABLE_TABLE_NAME ? process.env.AIRTABLE_TABLE_NAME.length : 0);
console.log('   AIRTABLE_TABLE_NAME trimmed:', process.env.AIRTABLE_TABLE_NAME ? `"${process.env.AIRTABLE_TABLE_NAME.trim()}"` : 'N/A');

// Test if the variable is actually being used
console.log('\n4. Testing direct Airtable access...');
const Airtable = require('airtable');

if (process.env.AIRTABLE_API_KEY && process.env.AIRTABLE_BASE_ID && process.env.AIRTABLE_TABLE_NAME) {
  const base = new Airtable({ 
    apiKey: process.env.AIRTABLE_API_KEY 
  }).base(process.env.AIRTABLE_BASE_ID);

  console.log('   Using table name:', `"${process.env.AIRTABLE_TABLE_NAME}"`);
  
  // Test the exact same call that's failing
  const table = base(process.env.AIRTABLE_TABLE_NAME);
  table.select({ maxRecords: 1 }).firstPage()
    .then(records => {
      console.log('   ✅ SUCCESS! Table accessed successfully');
    })
    .catch(error => {
      console.log('   ❌ ERROR:', error.message);
      console.log('   Error details:', error);
    });
} else {
  console.log('   ❌ Missing required environment variables');
}