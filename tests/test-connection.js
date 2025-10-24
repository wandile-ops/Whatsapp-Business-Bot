// test-connection.js - FIXED VERSION
require('dotenv').config();
const Airtable = require('airtable');

console.log('🔧 Testing Airtable Connection...\n');

// Check environment variables
const config = {
  apiKey: process.env.AIRTABLE_API_KEY,
  baseId: process.env.AIRTABLE_BASE_ID,
  tableName: process.env.AIRTABLE_TABLE_NAME
};

console.log('📋 Configuration Check:');
console.log('   AIRTABLE_API_KEY:', config.apiKey ? '✓ Set' : '❌ MISSING');
console.log('   AIRTABLE_BASE_ID:', config.baseId ? '✓ Set' : '❌ MISSING');
console.log('   AIRTABLE_TABLE_NAME:', config.tableName ? `"${config.tableName}"` : '❌ MISSING');

if (!config.apiKey || !config.baseId || !config.tableName) {
  console.log('\n❌ Missing required environment variables');
  process.exit(1);
}

async function testConnection() {
  try {
    // Initialize Airtable - FIXED: Use the config values directly
    const base = new Airtable({ apiKey: config.apiKey }).base(config.baseId);
    
    console.log('\n🔌 Testing Base Connection...');
    
    // Test 1: Get base information
    const baseInfo = await base('')._fetchJson('GET', '');
    console.log('   ✅ Base connection successful');
    console.log('   Base Name:', baseInfo.name);
    
    // Test 2: Access the specific table - FIXED: Use config.tableName directly
    console.log(`\n🎯 Testing Table: "${config.tableName}"`);
    const table = base(config.tableName); // This is the key fix!
    
    const records = await table.select({ maxRecords: 1 }).firstPage();
    console.log('   ✅ Table access successful');
    console.log('   Total records:', records.length);
    
    // Test 3: Test creating a record
    console.log('\n🧪 Testing Record Creation...');
    const testRecord = await table.create({
      'Full Name': 'Test Connection User',
      'Business Name': 'Test Business LLC',
      'Email Address': 'test@example.com',
      'Cellphone Number': '+27123456789',
      'Status': 'In Progress',
      'Submission Date': new Date().toISOString()
    });
    
    console.log('   ✅ Record creation successful');
    console.log('   Test Record ID:', testRecord.getId());
    
    // Test 4: Clean up
    console.log('\n🗑️ Cleaning up test record...');
    await table.destroy(testRecord.getId());
    console.log('   ✅ Test record deleted');
    
    console.log('\n🎉 ALL TESTS PASSED! Your Airtable connection is working perfectly!');
    
  } catch (error) {
    console.log('\n❌ Connection failed:');
    console.log('   Error:', error.message);
    
    if (error.error === 'NOT_FOUND') {
      console.log('   Table not found. Available tables:');
      // List available tables
      const base = new Airtable({ apiKey: config.apiKey }).base(config.baseId);
      const baseInfo = await base('')._fetchJson('GET', '');
      baseInfo.tables.forEach(table => {
        console.log('     -', table.name);
      });
    }
  }
}

// Run the test
testConnection();