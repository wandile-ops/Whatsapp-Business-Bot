// tests/detective.js
require('dotenv').config();
const Airtable = require('airtable');

console.log('🕵️‍♂️ Airtable Connection Detective\n');

// Test configuration
const config = {
  apiKey: process.env.AIRTABLE_API_KEY,
  baseId: process.env.AIRTABLE_BASE_ID,
  tableName: process.env.AIRTABLE_TABLE_NAME
};

console.log('🔍 Configuration:');
console.log('   API Key:', config.apiKey ? config.apiKey.substring(0, 15) + '...' : 'MISSING');
console.log('   Base ID:', config.baseId);
console.log('   Table Name:', config.tableName);
console.log('   Table Name Length:', config.tableName ? config.tableName.length : 0);
console.log('   Table Name Type:', typeof config.tableName);

// Initialize Airtable
const base = new Airtable({ apiKey: config.apiKey }).base(config.baseId);

async function investigate() {
  try {
    console.log('\n🔎 Step 1: Testing base connection...');
    const baseInfo = await base('')._fetchJson('GET', '');
    console.log('   ✅ Base connection successful');
    console.log('   Base name:', baseInfo.name);
    
    console.log('\n🔎 Step 2: Listing all available tables...');
    console.log('   Available tables:');
    baseInfo.tables.forEach((table, index) => {
      console.log(`     ${index + 1}. "${table.name}"`);
    });

    console.log('\n🔎 Step 3: Checking if "Business Plans" exists...');
    const targetTable = baseInfo.tables.find(table => table.name === 'Business Plans');
    if (targetTable) {
      console.log('   ✅ Table "Business Plans" exists in base');
    } else {
      console.log('   ❌ Table "Business Plans" NOT found in base');
      console.log('   Available tables:', baseInfo.tables.map(t => `"${t.name}"`).join(', '));
    }

    console.log('\n🔎 Step 4: Testing different table name variations...');
    
    // Test 1: Exact match
    console.log('   Testing exact match: "Business Plans"');
    try {
      const table1 = base('Business Plans');
      const records1 = await table1.select({ maxRecords: 1 }).firstPage();
      console.log('     ✅ SUCCESS with exact match');
    } catch (error) {
      console.log('     ❌ FAILED with exact match:', error.message);
    }

    // Test 2: Using table ID instead of name
    if (targetTable) {
      console.log('   Testing with table ID:', targetTable.id);
      try {
        const table2 = base(targetTable.id);
        const records2 = await table2.select({ maxRecords: 1 }).firstPage();
        console.log('     ✅ SUCCESS with table ID');
      } catch (error) {
        console.log('     ❌ FAILED with table ID:', error.message);
      }
    }

    // Test 3: First available table
    if (baseInfo.tables.length > 0) {
      const firstTable = baseInfo.tables[0];
      console.log('   Testing with first table:', `"${firstTable.name}"`);
      try {
        const table3 = base(firstTable.name);
        const records3 = await table3.select({ maxRecords: 1 }).firstPage();
        console.log('     ✅ SUCCESS with first table');
      } catch (error) {
        console.log('     ❌ FAILED with first table:', error.message);
      }
    }

    console.log('\n🔎 Step 5: Testing environment variable directly...');
    console.log('   Using process.env.AIRTABLE_TABLE_NAME directly...');
    try {
      const table4 = base(process.env.AIRTABLE_TABLE_NAME);
      const records4 = await table4.select({ maxRecords: 1 }).firstPage();
      console.log('     ✅ SUCCESS with env variable directly');
    } catch (error) {
      console.log('     ❌ FAILED with env variable:', error.message);
      console.log('     Env value:', `"${process.env.AIRTABLE_TABLE_NAME}"`);
      console.log('     Env value length:', process.env.AIRTABLE_TABLE_NAME.length);
    }

  } catch (error) {
    console.log('❌ Investigation failed:', error.message);
  }
}

investigate();