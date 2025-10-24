// custom-input-test-multiselect-fixed.js
require('dotenv').config();
const readline = require('readline');
const Airtable = require('airtable');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log('🎯 Custom Input WhatsApp Flow Test - MULTI-SELECT FIXED\n');
console.log('Enter your OWN business information and push it to Airtable!');
console.log('=========================================\n');

// Initialize Airtable directly
const base = new Airtable({ 
  apiKey: process.env.AIRTABLE_API_KEY 
}).base(process.env.AIRTABLE_BASE_ID);

const tableName = process.env.AIRTABLE_TABLE_NAME || 'Business Plans';

// Store user data
const userData = {};

// Mapping for business types
const businessTypeMap = {
  '1': 'Sole Proprietorship',
  '2': 'Partnership', 
  '3': 'Private Company (Pty Ltd)',
  '4': 'Cooperative',
  '5': 'Non-Profit Organization',
  '6': 'Social Enterprise',
  '7': 'Other'
};

// Mapping for business stages
const businessStageMap = {
  '1': 'Idea / Concept',
  '2': 'Startup (0–3 years)',
  '3': 'Small & Medium Enterprise (SME)',
  '4': 'Scaling / Growth Stage', 
  '5': 'Other'
};

// Mapping for sectors
const sectorMap = {
  '1': 'Agriculture & Agro-Processing',
  '2': 'Technology',
  '3': 'Retail & Wholesale',
  '4': 'Healthcare & Wellness',
  '5': 'Education & Training',
  '6': 'Tourism & Hospitality',
  '7': 'Energy & Renewable Energy',
  '8': 'Construction & Engineering',
  '9': 'Other'
};

// Multi-select field options (must match EXACTLY what's in Airtable)
const ownershipOptions = [
  'Women Majority-Owned (80%+)',
  'Women-Led', 
  'Other'
];

const marketingOptions = [
  'Social Media (Facebook, Instagram, TikTok)',
  'WhatsApp / Messaging Apps',
  'Physical Stores / Pop-ups',
  'E-commerce / Website',
  'Other'
];

const fundingOptions = [
  'Microloan',
  'Term Loan',
  'Equity Financing',
  'Grant',
  'Other'
];

function isValidDate(dateString) {
  const regex = /^\d{4}-\d{2}-\d{2}$/;
  if (!regex.test(dateString)) return false;
  
  const date = new Date(dateString);
  return date instanceof Date && !isNaN(date) && dateString === date.toISOString().split('T')[0];
}

function isValidYear(year) {
  const currentYear = new Date().getFullYear();
  return !isNaN(year) && year >= 1900 && year <= currentYear;
}

function askQuestion(question) {
  return new Promise((resolve) => {
    rl.question(question, resolve);
  });
}

function formatForAirtable() {
  // Convert data for Airtable with proper multi-select formatting
  return {
    // Personal Information
    'Full Name': userData.fullName || '',
    'Cellphone Number': userData.cellphone || '',
    'Email Address': userData.email || '',
    'Date of Birth': userData.dob || '',
    'ID Number': userData.idNumber || '',
    
    // Business Details
    'Business Name': userData.businessName || '',
    'Business Registration Number': userData.businessRegNumber || 'N/A',
    'Business Type': userData.businessType || '',
    'Year Established': userData.yearEstablished || null,
    'Business Stage': userData.businessStage || '',
    
    // Multi-select fields - Airtable expects array of exact strings
    'Ownership & Leadership': Array.isArray(userData.ownership) ? userData.ownership : [],
    'Number of Employees': userData.employees || '',
    
    // Business Operations
    'Primary Sector': userData.primarySector || '',
    'Subsector': userData.subsector || '',
    'Business Description': userData.businessDescription || '',
    'Target Market': userData.targetMarket || '',
    'Unique Value Proposition': userData.uniqueValue || '',
    'Key Competitors': userData.competitors || '',
    
    // More multi-select fields
    'Marketing Channels': Array.isArray(userData.marketingChannels) ? userData.marketingChannels : [],
    'Funding Type': Array.isArray(userData.fundingType) ? userData.fundingType : []
  };
}

async function collectUserData() {
  console.log('📝 Please enter your business information:\n');

  // Personal Information with validation
  userData.fullName = await askQuestion('👤 Full Name: ');
  
  let validPhone = false;
  while (!validPhone) {
    userData.cellphone = await askQuestion('📱 Cellphone Number (e.g., 0712345678): ');
    const phoneRegex = /^0[0-9]{9}$/;
    if (phoneRegex.test(userData.cellphone)) {
      validPhone = true;
    } else {
      console.log('❌ Please enter a valid 10-digit SA number starting with 0');
    }
  }

  let validEmail = false;
  while (!validEmail) {
    userData.email = await askQuestion('📧 Email Address: ');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailRegex.test(userData.email)) {
      validEmail = true;
    } else {
      console.log('❌ Please enter a valid email address');
    }
  }

  let validDOB = false;
  while (!validDOB) {
    userData.dob = await askQuestion('🎂 Date of Birth (YYYY-MM-DD, e.g., 1990-05-15): ');
    if (isValidDate(userData.dob)) {
      const dob = new Date(userData.dob);
      const age = Math.floor((new Date() - dob) / (365.25 * 24 * 60 * 60 * 1000));
      if (age >= 18) {
        validDOB = true;
      } else {
        console.log('❌ You must be at least 18 years old');
      }
    } else {
      console.log('❌ Please enter a valid date in YYYY-MM-DD format');
    }
  }

  userData.idNumber = await askQuestion('🆔 ID Number: ');

  // Business Details
  console.log('\n🏢 Business Details:');
  userData.businessName = await askQuestion('Business Name: ');
  userData.businessRegNumber = await askQuestion('Business Registration Number (or N/A): ');
  
  console.log('\n📋 Business Type Options:');
  Object.keys(businessTypeMap).forEach(key => {
    console.log(`${key}. ${businessTypeMap[key]}`);
  });
  
  let businessTypeValid = false;
  while (!businessTypeValid) {
    const businessTypeInput = await askQuestion('Select business type (enter number 1-7): ');
    if (businessTypeMap[businessTypeInput]) {
      userData.businessType = businessTypeMap[businessTypeInput];
      businessTypeValid = true;
    } else {
      console.log('❌ Please enter a valid number (1-7)');
    }
  }

  let validYear = false;
  while (!validYear) {
    const yearInput = await askQuestion('📅 Year Established (YYYY): ');
    const year = parseInt(yearInput);
    if (isValidYear(year)) {
      userData.yearEstablished = year;
      validYear = true;
    } else {
      console.log(`❌ Please enter a valid year between 1900 and ${new Date().getFullYear()}`);
    }
  }
  
  console.log('\n🚀 Business Stage Options:');
  Object.keys(businessStageMap).forEach(key => {
    console.log(`${key}. ${businessStageMap[key]}`);
  });
  
  let businessStageValid = false;
  while (!businessStageValid) {
    const stageInput = await askQuestion('Select business stage (enter number 1-5): ');
    if (businessStageMap[stageInput]) {
      userData.businessStage = businessStageMap[stageInput];
      businessStageValid = true;
    } else {
      console.log('❌ Please enter a valid number (1-5)');
    }
  }

  console.log('\n👩‍💼 Ownership & Leadership:');
  ownershipOptions.forEach((option, index) => {
    console.log(`${index + 1}. ${option}`);
  });
  
  let ownershipValid = false;
  while (!ownershipValid) {
    const ownershipChoice = await askQuestion('Select ownership type (enter numbers, e.g., "1 2" for multiple): ');
    userData.ownership = [];
    
    // Process each number in the input
    for (let char of ownershipChoice) {
      const index = parseInt(char) - 1;
      if (index >= 0 && index < ownershipOptions.length) {
        userData.ownership.push(ownershipOptions[index]);
      }
    }
    
    if (userData.ownership.length > 0) {
      ownershipValid = true;
    } else {
      console.log('❌ Please select at least one ownership type');
    }
  }

  console.log('\n👥 Number of Employees:');
  console.log('1. 0–5');
  console.log('2. 6–20');
  console.log('3. 21–50');
  console.log('4. 51–100');
  console.log('5. 100+');
  
  const employeeRanges = ['0–5', '6–20', '21–50', '51–100', '100+'];
  let employeesValid = false;
  while (!employeesValid) {
    const employeeChoice = await askQuestion('Select employee range (enter number 1-5): ');
    const choiceNum = parseInt(employeeChoice);
    if (choiceNum >= 1 && choiceNum <= 5) {
      userData.employees = employeeRanges[choiceNum - 1];
      employeesValid = true;
    } else {
      console.log('❌ Please enter a valid number (1-5)');
    }
  }

  // Business Operations
  console.log('\n🏭 Business Operations:');
  Object.keys(sectorMap).forEach(key => {
    console.log(`${key}. ${sectorMap[key]}`);
  });
  
  let sectorValid = false;
  while (!sectorValid) {
    const sectorChoice = await askQuestion('Select primary sector (enter number 1-9): ');
    if (sectorMap[sectorChoice]) {
      userData.primarySector = sectorMap[sectorChoice];
      sectorValid = true;
    } else {
      console.log('❌ Please enter a valid number (1-9)');
    }
  }

  userData.subsector = await askQuestion('🔍 Subsector (e.g., "Software Development", "Organic Farming"): ');
  userData.businessDescription = await askQuestion('📝 Business Description (2-3 sentences): ');
  userData.targetMarket = await askQuestion('🎯 Target Market (describe your customers): ');
  userData.uniqueValue = await askQuestion('💎 Unique Value Proposition (what makes you different): ');
  
  const competitors = await askQuestion('🏆 Key Competitors (or type "skip"): ');
  userData.competitors = competitors.toLowerCase() === 'skip' ? '' : competitors;

  console.log('\n📢 Marketing Channels:');
  marketingOptions.forEach((option, index) => {
    console.log(`${index + 1}. ${option}`);
  });
  
  let marketingValid = false;
  while (!marketingValid) {
    const marketingChoice = await askQuestion('Select marketing channels (enter numbers, e.g., "1 3"): ');
    userData.marketingChannels = [];
    
    for (let char of marketingChoice) {
      const index = parseInt(char) - 1;
      if (index >= 0 && index < marketingOptions.length) {
        userData.marketingChannels.push(marketingOptions[index]);
      }
    }
    
    if (userData.marketingChannels.length > 0) {
      marketingValid = true;
    } else {
      console.log('❌ Please select at least one marketing channel');
    }
  }

  console.log('\n💰 Funding Information:');
  fundingOptions.forEach((option, index) => {
    console.log(`${index + 1}. ${option}`);
  });
  
  let fundingValid = false;
  while (!fundingValid) {
    const fundingChoice = await askQuestion('Select funding types needed (enter numbers, e.g., "1 2"): ');
    userData.fundingType = [];
    
    for (let char of fundingChoice) {
      const index = parseInt(char) - 1;
      if (index >= 0 && index < fundingOptions.length) {
        userData.fundingType.push(fundingOptions[index]);
      }
    }
    
    if (userData.fundingType.length > 0) {
      fundingValid = true;
    } else {
      console.log('❌ Please select at least one funding type');
    }
  }

  return userData;
}

async function pushToAirtable() {
  console.log('\n🚀 Pushing your data to Airtable...');
  console.log('-'.repeat(50));

  try {
    // Test Airtable connection first
    console.log('🔌 Testing Airtable connection...');
    const table = base(tableName);
    const records = await table.select({ maxRecords: 1 }).firstPage();
    console.log('✅ Airtable connection successful');

    // Format data for Airtable
    const airtableData = formatForAirtable();
    
    console.log('\n📦 Prepared data for Airtable:');
    console.log(`   Ownership & Leadership: ${JSON.stringify(airtableData['Ownership & Leadership'])}`);
    console.log(`   Marketing Channels: ${JSON.stringify(airtableData['Marketing Channels'])}`);
    console.log(`   Funding Type: ${JSON.stringify(airtableData['Funding Type'])}`);

    // Create the record in Airtable
    console.log('\n📝 Creating your business plan record...');
    const record = await table.create(airtableData);
    
    console.log('\n🎉 SUCCESS! Your data has been pushed to Airtable!');
    console.log('📋 Record Details:');
    console.log(`   Record ID: ${record.getId()}`);
    console.log(`   Business Name: ${userData.businessName}`);
    console.log(`   Contact: ${userData.fullName} (${userData.email})`);
    console.log(`   Sector: ${userData.primarySector}`);
    console.log(`   Employees: ${userData.employees}`);
    
    console.log('\n🔗 View your record in Airtable:');
    console.log(`   https://airtable.com/${process.env.AIRTABLE_BASE_ID}`);

  } catch (error) {
    console.log('\n❌ ERROR pushing to Airtable:');
    console.log(`   ${error.message}`);
    
    if (error.message.includes('INVALID_VALUE_FOR_COLUMN')) {
      console.log('\n💡 Multi-select field issue detected.');
      console.log('   The field options in Airtable might not match our expected values.');
      console.log('   Please check the exact field options in your Airtable table.');
    }
    
    console.log('\n🔍 Debug info:');
    console.log('   Ownership data:', JSON.stringify(userData.ownership));
    console.log('   Marketing data:', JSON.stringify(userData.marketingChannels));
    console.log('   Funding data:', JSON.stringify(userData.fundingType));
  }
}

async function showSummary() {
  console.log('\n📊 YOUR DATA SUMMARY:');
  console.log('=' .repeat(50));
  console.log('👤 PERSONAL INFORMATION:');
  console.log(`   Name: ${userData.fullName}`);
  console.log(`   Phone: ${userData.cellphone}`);
  console.log(`   Email: ${userData.email}`);
  console.log(`   DOB: ${userData.dob}`);
  console.log(`   ID: ${userData.idNumber}`);
  
  console.log('\n🏢 BUSINESS DETAILS:');
  console.log(`   Business Name: ${userData.businessName}`);
  console.log(`   Registration: ${userData.businessRegNumber}`);
  console.log(`   Type: ${userData.businessType}`);
  console.log(`   Established: ${userData.yearEstablished}`);
  console.log(`   Stage: ${userData.businessStage}`);
  console.log(`   Ownership: ${userData.ownership.join(', ')}`);
  console.log(`   Employees: ${userData.employees}`);
  
  console.log('\n🏭 BUSINESS OPERATIONS:');
  console.log(`   Sector: ${userData.primarySector}`);
  console.log(`   Subsector: ${userData.subsector}`);
  console.log(`   Description: ${userData.businessDescription.substring(0, 100)}...`);
  console.log(`   Target Market: ${userData.targetMarket.substring(0, 100)}...`);
  console.log(`   Unique Value: ${userData.uniqueValue.substring(0, 100)}...`);
  console.log(`   Competitors: ${userData.competitors || 'None specified'}`);
  console.log(`   Marketing: ${userData.marketingChannels.join(', ')}`);
  console.log(`   Funding Needed: ${userData.fundingType.join(', ')}`);
}

async function main() {
  try {
    // Collect user data
    await collectUserData();
    
    // Show summary
    await showSummary();
    
    // Ask for confirmation
    console.log('\n' + '=' .repeat(50));
    const confirm = await askQuestion('✅ Ready to push this data to Airtable? (yes/no): ');
    
    if (confirm.toLowerCase() === 'yes' || confirm.toLowerCase() === 'y') {
      await pushToAirtable();
    } else {
      console.log('\n❌ Data not sent to Airtable.');
      console.log('💡 You can run this test again to enter different data.');
    }
    
  } catch (error) {
    console.log('\n❌ Error during data collection:', error.message);
  } finally {
    rl.close();
  }
}

// Start the interactive test
main();