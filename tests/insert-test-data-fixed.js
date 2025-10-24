// tests/insert-test-data-fixed.js
require('dotenv').config();
const Airtable = require('airtable');

console.log('📝 Inserting Test Data into Airtable (Fixed Field Names)\n');

const base = new Airtable({ 
  apiKey: process.env.AIRTABLE_API_KEY 
}).base(process.env.AIRTABLE_BASE_ID);

const tableName = process.env.AIRTABLE_TABLE_NAME || 'Business Plans';

// Sample business plan data that matches YOUR EXACT Airtable field names
const testBusinessPlans = [
  {
    // Personal Information
    'Full Name': 'Sarah Johnson',
    'Cellphone Number': '+27711234567',
    'Email Address': 'sarah@techsolutions.co.za',
    'Date of Birth': '1985-06-15',
    'ID Number': '8506150085081',
    
    // Business Details
    'Business Name': 'Tech Solutions SA',
    'Business Registration Number': '2023/123456/07',
    'Business Type': 'Private Company (Pty Ltd)',
    'Year Established': 2023,
    'Business Stage': 'Startup (0–3 years)',
    'Ownership & Leadership': ['Women-Led', 'Women Majority-Owned (80%+)'],
    'Number of Employees': '6–20',
    
    // Business Operations
    'Primary Sector': 'Technology',
    'Subsector': 'Software Development & FinTech',
    'Business Description': 'We develop custom software solutions for small to medium businesses in South Africa, focusing on accounting and inventory management systems. Our team of 15 developers creates affordable, locally-relevant software that helps businesses digitize their operations.',
    'Target Market': 'Small to medium enterprises in Gauteng and Western Cape, specifically retail businesses with 5-50 employees. Business owners aged 30-55 who are tech-savvy but need customized solutions. Annual revenue between R2-R20 million.',
    'Unique Value Proposition': 'We offer locally-developed software with South African tax compliance built-in, 24/7 customer support in multiple local languages, and pricing in ZAR that is 40% cheaper than international alternatives.',
    'Key Competitors': 'QuickBooks, Sage, Xero, local developers',
    'Marketing Channels': ['Social Media (Facebook, Instagram, TikTok)', 'E-commerce / Website', 'WhatsApp / Messaging Apps'],
    'Funding Type': ['Term Loan', 'Grant']
  },
  {
    // Personal Information
    'Full Name': 'David Chen',
    'Cellphone Number': '+27831234567',
    'Email Address': 'david@ecofarm.co.za',
    'Date of Birth': '1990-03-22',
    'ID Number': '9003220085082',
    
    // Business Details
    'Business Name': 'Green Valley Organic Farms',
    'Business Registration Number': 'N/A',
    'Business Type': 'Sole Proprietorship',
    'Year Established': 2021,
    'Business Stage': 'Small & Medium Enterprise (SME)',
    'Ownership & Leadership': ['Other'],
    'Number of Employees': '6–20',
    
    // Business Operations
    'Primary Sector': 'Agriculture & Agro-Processing',
    'Subsector': 'Organic Crop Farming & Food Processing',
    'Business Description': 'We operate a 50-hectare organic farm in the Western Cape, specializing in organic vegetables and fruit processing. We grow tomatoes, leafy greens, and berries, and process them into jams, sauces, and dried snacks for retail markets.',
    'Target Market': 'Health-conscious consumers in major urban areas, organic food stores, high-end restaurants in Cape Town and Johannesburg. Families with income above R600k/year who prioritize organic, locally-sourced produce.',
    'Unique Value Proposition': '100% certified organic with transparent supply chain, carbon-neutral operations using solar power, unique indigenous crop varieties, and direct farm-to-table delivery within 24 hours.',
    'Key Competitors': 'Woolworths organic range, other local organic farms',
    'Marketing Channels': ['Social Media (Facebook, Instagram, TikTok)', 'Physical Stores / Pop-ups', 'E-commerce / Website'],
    'Funding Type': ['Microloan', 'Grant']
  },
  {
    // Personal Information
    'Full Name': 'Maria Rodriguez',
    'Cellphone Number': '+27651234567',
    'Email Address': 'maria@healthwell.co.za',
    'Date of Birth': '1988-11-08',
    'ID Number': '8811080085083',
    
    // Business Details
    'Business Name': 'HealthWell Community Clinic',
    'Business Registration Number': '2022/789012/07',
    'Business Type': 'Non-Profit Organization',
    'Year Established': 2022,
    'Business Stage': 'Startup (0–3 years)',
    'Ownership & Leadership': ['Women-Led'],
    'Number of Employees': '6–20',
    
    // Business Operations
    'Primary Sector': 'Healthcare & Wellness',
    'Subsector': 'Community Health Services',
    'Business Description': 'We provide affordable healthcare services to underserved communities in township areas. Our mobile clinics offer basic health screenings, chronic medication management, and health education programs.',
    'Target Market': 'Low-income families in township communities, elderly patients with chronic conditions, uninsured individuals who cannot access private healthcare. Focus on Soweto, Alexandra, and Tembisa communities.',
    'Unique Value Proposition': 'Mobile clinics that bring healthcare directly to communities, sliding scale fees based on income, culturally-sensitive care in local languages, and partnerships with public hospitals for referrals.',
    'Key Competitors': 'Public clinics, other NGOs, private GPs',
    'Marketing Channels': ['WhatsApp / Messaging Apps', 'Physical Stores / Pop-ups', 'Other'],
    'Funding Type': ['Grant', 'Other']
  }
];

async function insertTestData() {
  try {
    console.log('📊 Target Table:', tableName);
    console.log('📝 Preparing to insert', testBusinessPlans.length, 'test records...\n');
    
    let successCount = 0;
    
    for (const businessData of testBusinessPlans) {
      try {
        console.log(`➕ Inserting: ${businessData['Business Name']}`);
        
        const record = await base(tableName).create(businessData);
        
        console.log(`   ✅ SUCCESS - Record ID: ${record.getId()}`);
        console.log(`   📧 Email: ${businessData['Email Address']}`);
        console.log(`   🏢 Sector: ${businessData['Primary Sector']}`);
        console.log(`   👥 Employees: ${businessData['Number of Employees']}\n`);
        
        successCount++;
        
      } catch (recordError) {
        console.log(`   ❌ FAILED to insert: ${businessData['Business Name']}`);
        console.log(`   Error: ${recordError.message}`);
        
        // Show which field is causing the issue
        if (recordError.message.includes('Unknown field name')) {
          const fieldMatch = recordError.message.match(/Unknown field name: "([^"]+)"/);
          if (fieldMatch) {
            console.log(`   💡 Problem field: "${fieldMatch[1]}"`);
          }
        }
      }
    }
    
    console.log('=' .repeat(50));
    console.log(`📈 INSERTION SUMMARY:`);
    console.log(`   ✅ Successful: ${successCount}/${testBusinessPlans.length}`);
    console.log(`   ❌ Failed: ${testBusinessPlans.length - successCount}/${testBusinessPlans.length}`);
    
    if (successCount > 0) {
      console.log('\n🎉 SUCCESS! Test data inserted into Airtable!');
      console.log('🔍 Check your Airtable base to see the new records:');
      console.log(`   https://airtable.com/${process.env.AIRTABLE_BASE_ID}`);
      
      // Verify by counting records
      console.log('\n🔢 Verifying record count...');
      const allRecords = await base(tableName).select({
        maxRecords: 100
      }).firstPage();
      
      console.log(`   Total records in table now: ${allRecords.length}`);
      
    } else {
      console.log('\n❌ No records were inserted. There are still field name mismatches.');
    }
    
  } catch (error) {
    console.log('❌ CRITICAL ERROR:', error.message);
    console.log('Full error:', error);
  }
}

insertTestData();