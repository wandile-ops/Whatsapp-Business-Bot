// find-tables.js
require('dotenv').config();
const Airtable = require('airtable');

async function findTables() {
  const base = new Airtable({ 
    apiKey: process.env.AIRTABLE_API_KEY 
  }).base(process.env.AIRTABLE_BASE_ID);

  try {
    console.log('🔍 Searching for tables in your base...\n');
    
    const baseInfo = await base('')._fetchJson('GET', '');
    
    console.log('📋 Base Name:', baseInfo.name);
    console.log('\n📊 Tables found:');
    console.log('----------------');
    
    if (baseInfo.tables.length === 0) {
      console.log('❌ No tables found in this base!');
      console.log('💡 Create a table first in Airtable');
      return;
    }
    
    baseInfo.tables.forEach((table, index) => {
      console.log(`${index + 1}. "${table.name}"`);
      console.log(`   ID: ${table.id}`);
      console.log(`   Primary Field: ${table.primaryField.name}`);
      console.log('');
    });

    console.log('💡 Copy EXACTLY one of these table names for your .env file');

  } catch (error) {
    console.error('❌ Error:', error.message);
    if (error.statusCode === 404) {
      console.log('💡 Base not found. Check your BASE_ID');
    } else if (error.statusCode === 401) {
      console.log('💡 Invalid API key');
    }
  }
}

findTables();