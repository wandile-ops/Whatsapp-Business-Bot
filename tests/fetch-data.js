// tests/fetch-data.js
require('dotenv').config();
const Airtable = require('airtable');

console.log('📊 Testing Connection by Fetching Data\n');

const base = new Airtable({ 
  apiKey: process.env.AIRTABLE_API_KEY 
}).base(process.env.AIRTABLE_BASE_ID);

const tableName = process.env.AIRTABLE_TABLE_NAME || 'Business Plans';

console.log('🔍 Attempting to fetch data from table:', `"${tableName}"`);

base(tableName).select({
  maxRecords: 10,
  view: 'Grid view'
}).firstPage(function(err, records) {
  if (err) {
    console.error('❌ Error fetching data:', err.message);
    console.log('Full error details:', err);
    return;
  }
  
  console.log(`✅ SUCCESS! Found ${records.length} records\n`);
  
  if (records.length === 0) {
    console.log('📭 Table is empty - no records found');
    console.log('💡 This is normal if you haven\'t added any data yet');
  } else {
    console.log('📝 Records found:');
    console.log('================');
    
    records.forEach((record, index) => {
      console.log(`\n${index + 1}. Record ID: ${record.id}`);
      console.log('   Fields:');
      
      // Show all fields in this record
      Object.keys(record.fields).forEach(fieldName => {
        const value = record.fields[fieldName];
        console.log(`   - ${fieldName}: ${JSON.stringify(value)}`);
      });
    });
  }
});