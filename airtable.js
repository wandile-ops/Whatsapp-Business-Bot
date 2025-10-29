// airtable.js - FIXED VERSION (Only uses existing field options)
const Airtable = require('airtable');
const config = require('./config');

// Initialize Airtable
const base = new Airtable({ apiKey: config.airtable.apiKey })
  .base(config.airtable.baseId);

class AirtableService {
  constructor() {
    this.table = base(config.airtable.tableName);
  }

  /**
   * Create a new business plan record in Airtable
   * @param {Object} data - All the business plan data collected from WhatsApp
   * @returns {Promise<string>} - The Airtable record ID
   */
  async createBusinessPlan(data) {
    try {
      console.log('📝 Creating new business plan record in Airtable...');
      
      // Map user inputs to existing Airtable field options
      const recordData = {
        // Personal Information
        'Full Name': data.fullName || '',
        'Cellphone Number': data.cellphone || '',
        'Email Address': data.email || '',
        'Date of Birth': data.dob || '',
        'ID Number': data.idNumber || '',
        
        // Business Details
        'Business Name': data.businessName || '',
        'Business Registration Number': data.businessRegNumber || 'N/A',
        'Business Type': this.mapToExistingOption(data.businessType, 'Business Type'),
        'Year Established': data.yearEstablished || null,
        'Business Stage': this.mapToExistingOption(data.businessStage, 'Business Stage'),
        
        // Multi-select fields - Use only existing options
        'Ownership & Leadership': this.mapMultiSelectToExisting(data.ownership, 'Ownership & Leadership'),
        'Number of Employees': this.mapToExistingOption(data.employees, 'Number of Employees'),
        
        // Business Operations
        'Primary Sector': this.mapToExistingOption(data.primarySector, 'Primary Sector'),
        'Subsector': data.subsector || '',
        'Business Description': data.businessDescription || '',
        'Target Market': data.targetMarket || '',
        'Unique Value Proposition': data.uniqueValue || '',
        'Key Competitors': data.competitors || '',
        
        // More multi-select fields
        'Marketing Channels': this.mapMultiSelectToExisting(data.marketingChannels, 'Marketing Channels'),
        'Funding Type': this.mapMultiSelectToExisting(data.fundingType, 'Funding Type')
      };

      console.log('📦 Formatted record data for Airtable:');
      console.log('   Employees:', recordData['Number of Employees']);
      console.log('   Ownership:', recordData['Ownership & Leadership']);
      console.log('   Marketing:', recordData['Marketing Channels']);
      console.log('   Funding:', recordData['Funding Type']);

      // Create the record
      const record = await this.table.create(recordData);
      const recordId = record.getId();
      
      console.log('✅ Successfully created Airtable record:', recordId);
      return recordId;

    } catch (error) {
      console.error('❌ ERROR creating Airtable record:');
      console.error('   Error:', error.message);
      
      if (error.statusCode === 422) {
        console.error('📋 Validation error - field options mismatch');
        console.error('   Make sure all selected options exist in your Airtable table');
      }
      
      throw new Error(`Airtable error: ${error.message}`);
    }
  }

  /**
   * Map user input to existing Airtable field options
   * This prevents creating new options that the API key doesn't have permission for
   */
  mapToExistingOption(userInput, fieldName) {
    if (!userInput) return '';
    
    const userInputStr = userInput.toString().toLowerCase().trim();
    
    // Map common inputs to existing Airtable options
    const optionMaps = {
      'Number of Employees': {
        '0-5': '0–5',
        '0–5': '0–5',
        '0-5 employees': '0–5',
        '6-20': '6–20', 
        '6–20': '6–20',
        '6-20 employees': '6–20',
        '21-50': '21–50',
        '21–50': '21–50',
        '21-50 employees': '21–50',
        '51-100': '51–100',
        '51–100': '51–100',
        '51-100 employees': '51–100',
        '100+': '100+',
        '100+ employees': '100+'
      },
      'Business Type': {
        'sole proprietorship': 'Sole Proprietorship',
        'partnership': 'Partnership',
        'private company': 'Private Company (Pty Ltd)',
        'private company (pty ltd)': 'Private Company (Pty Ltd)',
        'cooperative': 'Cooperative',
        'non-profit': 'Non-Profit Organization',
        'non-profit organization': 'Non-Profit Organization',
        'social enterprise': 'Social Enterprise',
        'other': 'Other'
      },
      'Business Stage': {
        'idea': 'Idea / Concept',
        'idea / concept': 'Idea / Concept',
        'startup': 'Startup (0–3 years)',
        'startup (0-3 years)': 'Startup (0–3 years)',
        'sme': 'Small & Medium Enterprise (SME)',
        'small business': 'Small & Medium Enterprise (SME)',
        'small & medium enterprise': 'Small & Medium Enterprise (SME)',
        'scaling': 'Scaling / Growth Stage',
        'scaling / growth stage': 'Scaling / Growth Stage',
        'growth': 'Scaling / Growth Stage',
        'other': 'Other'
      },
      'Primary Sector': {
        'agriculture': 'Agriculture & Agro-Processing',
        'agriculture & agro-processing': 'Agriculture & Agro-Processing',
        'technology': 'Technology',
        'retail': 'Retail & Wholesale',
        'retail & wholesale': 'Retail & Wholesale',
        'healthcare': 'Healthcare & Wellness',
        'healthcare & wellness': 'Healthcare & Wellness',
        'education': 'Education & Training',
        'education & training': 'Education & Training',
        'tourism': 'Tourism & Hospitality',
        'tourism & hospitality': 'Tourism & Hospitality',
        'energy': 'Energy & Renewable Energy',
        'energy & renewable energy': 'Energy & Renewable Energy',
        'construction': 'Construction & Engineering',
        'construction & engineering': 'Construction & Engineering',
        'other': 'Other'
      }
    };

    const fieldMap = optionMaps[fieldName];
    if (fieldMap && fieldMap[userInputStr]) {
      console.log(`   Mapped "${userInput}" → "${fieldMap[userInputStr]}" for ${fieldName}`);
      return fieldMap[userInputStr];
    }

    // If no mapping found, return the original (will fail if option doesn't exist)
    console.log(`   Using original: "${userInput}" for ${fieldName}`);
    return userInput;
  }

  /**
   * Map multi-select arrays to existing options
   */
  mapMultiSelectToExisting(userArray, fieldName) {
    if (!userArray || !Array.isArray(userArray)) return [];
    
    return userArray.map(item => this.mapToExistingOption(item, fieldName))
                   .filter(item => item); // Remove empty strings
  }

  /**
   * Update an existing business plan record
   */
  async updateBusinessPlan(recordId, updates) {
    try {
      console.log('🔄 Updating Airtable record:', recordId);
      const record = await this.table.update(recordId, updates);
      console.log('✅ Successfully updated record:', recordId);
      return record;

    } catch (error) {
      console.error('❌ Error updating Airtable record:', error);
      throw new Error(`Failed to update business plan record: ${error.message}`);
    }
  }

  /**
   * Find the most recent record by phone number
   */
  async findRecordByPhone(phoneNumber) {
    try {
      console.log('🔍 Searching for record by phone:', phoneNumber);
      
      const records = await this.table.select({
        filterByFormula: `{Cellphone Number} = '${this.escapeFormulaValue(phoneNumber)}'`,
        maxRecords: 1,
        sort: [{ field: 'Year Established', direction: 'desc' }]
      }).firstPage();

      if (records.length > 0) {
        const record = records[0];
        const recordData = {
          id: record.getId(),
          fields: record.fields
        };
        console.log('✅ Found existing record:', recordData.id);
        return recordData;
      } else {
        console.log('📭 No existing record found for phone:', phoneNumber);
        return null;
      }

    } catch (error) {
      console.error('❌ Error finding record by phone:', error);
      throw new Error(`Failed to find record: ${error.message}`);
    }
  }

  /**
   * Escape values for Airtable formula syntax
   */
  escapeFormulaValue(value) {
    if (typeof value !== 'string') return value;
    return value.replace(/'/g, "''");
  }

  /**
   * Test Airtable connection
   */
  async testConnection() {
    try {
      console.log('🔌 Testing Airtable connection...');
      const records = await this.table.select({ maxRecords: 1 }).firstPage();
      console.log('✅ Airtable connection successful');
      return true;

    } catch (error) {
      console.error('❌ Airtable connection failed:', error);
      return false;
    }
  }
}

// Create and export singleton instance
const airtableService = new AirtableService();
module.exports = airtableService;