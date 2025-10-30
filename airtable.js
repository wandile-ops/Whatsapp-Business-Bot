// airtable.js - COMPLETE FIXED VERSION
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
      
      // Format data for Airtable with proper multi-select handling
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
        'Business Type': data.businessType || '',
        'Year Established': data.yearEstablished || null,
        'Business Stage': data.businessStage || '',
        
        // Multi-select fields - Airtable expects arrays
        'Ownership & Leadership': this.formatMultiSelectField(data.ownership),
        'Number of Employees': data.employees || '',
        
        // Business Operations
        'Primary Sector': data.primarySector || '',
        'Subsector': data.subsector || '',
        'Business Description': data.businessDescription || '',
        'Target Market': data.targetMarket || '',
        'Unique Value Proposition': data.uniqueValue || '',
        'Key Competitors': data.competitors || '',
        
        // More multi-select fields
        'Marketing Channels': this.formatMultiSelectField(data.marketingChannels),
        'Funding Type': this.formatMultiSelectField(data.fundingType)
      };

      console.log('📦 Record data prepared:', Object.keys(recordData).length, 'fields');
      
      // Debug multi-select fields
      console.log('🔍 Multi-select fields:');
      console.log('   Ownership:', JSON.stringify(recordData['Ownership & Leadership']));
      console.log('   Marketing:', JSON.stringify(recordData['Marketing Channels']));
      console.log('   Funding:', JSON.stringify(recordData['Funding Type']));

      // Clean the data to fix any option mismatches
      const cleanedData = this.cleanAirtableData(recordData);

      const record = await this.table.create(cleanedData);
      const recordId = record.getId();
      
      console.log('✅ Successfully created Airtable record:', recordId);
      return recordId;

    } catch (error) {
      console.error('❌ Error creating Airtable record:', error);
      
      // Enhanced error logging
      if (error.error === 'NOT_FOUND') {
        console.error('🔍 Airtable base or table not found. Check your base ID and table name.');
      } else if (error.statusCode === 401) {
        console.error('🔑 Airtable authentication failed. Check your API key.');
      } else if (error.statusCode === 422) {
        console.error('📋 Airtable validation error. Check field types and required fields.');
        console.error('Validation message:', error.message);
        
        // Specific handling for option creation errors
        if (error.message.includes('Insufficient permissions to create new select option')) {
          console.error('💡 Field option mismatch detected.');
          console.error('   The selected options do not exist in your Airtable table.');
          console.error('   Please check the field options in your Airtable base.');
        }
      }
      
      throw new Error(`Failed to create business plan record: ${error.message}`);
    }
  }

  /**
   * Clean Airtable data to fix option mismatches
   * @param {Object} data - The data to clean
   * @returns {Object} - Cleaned data
   */
  cleanAirtableData(data) {
    const cleaned = { ...data };
    
    // Fix common option mismatches
    if (cleaned['Business Stage']) {
      cleaned['Business Stage'] = this.fixBusinessStage(cleaned['Business Stage']);
    }
    
    // Clean multi-select fields to match exact Airtable options
    if (cleaned['Ownership & Leadership']) {
      cleaned['Ownership & Leadership'] = this.cleanMultiSelectOptions(cleaned['Ownership & Leadership'], [
        'Women Majority-Owned (80%+)',
        'Women-Led',
        'Other'
      ]);
    }
    
    if (cleaned['Marketing Channels']) {
      cleaned['Marketing Channels'] = this.cleanMultiSelectOptions(cleaned['Marketing Channels'], [
        'Social Media (Facebook, Instagram, TikTok)',
        'WhatsApp / Messaging Apps',
        'Physical Stores / Pop-ups',
        'E-commerce / Website',
        'Other'
      ]);
    }
    
    if (cleaned['Funding Type']) {
      cleaned['Funding Type'] = this.cleanMultiSelectOptions(cleaned['Funding Type'], [
        'Microloan',
        'Term Loan',
        'Equity Financing',
        'Grant',
        'Other'
      ]);
    }
    
    // Clean single select fields
    if (cleaned['Number of Employees']) {
      cleaned['Number of Employees'] = this.fixEmployeeRange(cleaned['Number of Employees']);
    }
    
    console.log('🧹 Cleaned Airtable data:', Object.keys(cleaned).length, 'fields');
    return cleaned;
  }

  /**
   * Fix business stage options
   * @param {string} businessStage - The business stage to fix
   * @returns {string} - Fixed business stage
   */
  fixBusinessStage(businessStage) {
    const stage = businessStage.toString();
    
    // Fix the truncated option
    if (stage.includes('Small & Medium Enterpris')) {
      return 'Small & Medium Enterprise (SME)';
    }
    
    // Map common variations to standard options
    const stageMap = {
      'idea': 'Idea / Concept',
      'concept': 'Idea / Concept',
      'startup': 'Startup (0–3 years)',
      'sme': 'Small & Medium Enterprise (SME)',
      'small business': 'Small & Medium Enterprise (SME)',
      'medium business': 'Small & Medium Enterprise (SME)',
      'growth': 'Scaling / Growth Stage',
      'scaling': 'Scaling / Growth Stage',
      'scale': 'Scaling / Growth Stage'
    };
    
    const lowerStage = stage.toLowerCase();
    for (const [key, value] of Object.entries(stageMap)) {
      if (lowerStage.includes(key)) {
        return value;
      }
    }
    
    return stage;
  }

  /**
   * Fix employee range options
   * @param {string} employees - The employee range to fix
   * @returns {string} - Fixed employee range
   */
  fixEmployeeRange(employees) {
    const range = employees.toString();
    
    // Map common variations to standard options
    const rangeMap = {
      '0-5': '0–5',
      '1-5': '0–5',
      '6-20': '6–20',
      '21-50': '21–50',
      '51-100': '51–100',
      '100+': '100+',
      '100 plus': '100+'
    };
    
    return rangeMap[range] || range;
  }

  /**
   * Clean multi-select options to match Airtable field options
   * @param {Array} options - The options to clean
   * @param {Array} validOptions - Valid options for the field
   * @returns {Array} - Cleaned options
   */
  cleanMultiSelectOptions(options, validOptions) {
    if (!Array.isArray(options)) {
      return this.formatMultiSelectField(options);
    }
    
    const cleaned = options.map(option => {
      const optionStr = option.toString();
      
      // Try exact match first
      if (validOptions.includes(optionStr)) {
        return optionStr;
      }
      
      // Try partial match
      for (const validOption of validOptions) {
        if (optionStr.includes(validOption) || validOption.includes(optionStr)) {
          return validOption;
        }
      }
      
      // Try common variations
      const variationMap = {
        'Social Media': 'Social Media (Facebook, Instagram, TikTok)',
        'Facebook': 'Social Media (Facebook, Instagram, TikTok)',
        'Instagram': 'Social Media (Facebook, Instagram, TikTok)',
        'TikTok': 'Social Media (Facebook, Instagram, TikTok)',
        'WhatsApp': 'WhatsApp / Messaging Apps',
        'Messaging': 'WhatsApp / Messaging Apps',
        'Physical Store': 'Physical Stores / Pop-ups',
        'Store': 'Physical Stores / Pop-ups',
        'E-commerce': 'E-commerce / Website',
        'Website': 'E-commerce / Website',
        'Online': 'E-commerce / Website',
        'Microloan': 'Microloan',
        'Term Loan': 'Term Loan',
        'Equity': 'Equity Financing',
        'Equity Financing': 'Equity Financing',
        'Grant': 'Grant',
        'Women Majority': 'Women Majority-Owned (80%+)',
        'Women Majority Owned': 'Women Majority-Owned (80%+)',
        'Women Led': 'Women-Led'
      };
      
      if (variationMap[optionStr]) {
        return variationMap[optionStr];
      }
      
      // If no match found, return the original and let Airtable handle the error
      console.log(`⚠️  Could not match option: "${optionStr}" to valid options`);
      return optionStr;
    }).filter(option => option !== ''); // Remove empty strings
    
    console.log(`🔄 Cleaned multi-select: ${JSON.stringify(options)} → ${JSON.stringify(cleaned)}`);
    return cleaned;
  }

  /**
   * Format multi-select fields for Airtable (convert to array)
   * @param {Array|string} field - Field data to format
   * @returns {Array} - Formatted field value as array
   */
  formatMultiSelectField(field) {
    if (!field) return [];
    
    if (Array.isArray(field)) {
      return field;
    }
    
    // If it's a string, try to split by comma or return as single item array
    if (typeof field === 'string') {
      return field.split(',').map(item => item.trim()).filter(item => item);
    }
    
    return [];
  }

  /**
   * Update an existing business plan record
   * @param {string} recordId - The Airtable record ID to update
   * @param {Object} updates - Fields to update
   * @returns {Promise<Object>} - The updated record
   */
  async updateBusinessPlan(recordId, updates) {
    try {
      console.log('🔄 Updating Airtable record:', recordId);
      
      // Format multi-select fields in updates
      const formattedUpdates = { ...updates };
      if (updates.ownership) {
        formattedUpdates['Ownership & Leadership'] = this.formatMultiSelectField(updates.ownership);
      }
      if (updates.marketingChannels) {
        formattedUpdates['Marketing Channels'] = this.formatMultiSelectField(updates.marketingChannels);
      }
      if (updates.fundingType) {
        formattedUpdates['Funding Type'] = this.formatMultiSelectField(updates.fundingType);
      }

      // Clean the data before sending
      const cleanedUpdates = this.cleanAirtableData(formattedUpdates);

      const record = await this.table.update(recordId, cleanedUpdates);
      console.log('✅ Successfully updated record:', recordId);
      return record;

    } catch (error) {
      console.error('❌ Error updating Airtable record:', error);
      throw new Error(`Failed to update business plan record: ${error.message}`);
    }
  }

  /**
   * Find the most recent record by phone number
   * @param {string} phoneNumber - WhatsApp phone number
   * @returns {Promise<Object|null>} - Record data or null if not found
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
   * Get record by ID
   * @param {string} recordId - Airtable record ID
   * @returns {Promise<Object|null>} - Record data
   */
  async getRecordById(recordId) {
    try {
      console.log('🔍 Getting record by ID:', recordId);
      
      const record = await this.table.find(recordId);
      const recordData = {
        id: record.getId(),
        fields: record.fields
      };
      
      console.log('✅ Retrieved record:', recordId);
      return recordData;

    } catch (error) {
      console.error('❌ Error getting record by ID:', error);
      if (error.error === 'NOT_FOUND') {
        return null;
      }
      throw new Error(`Failed to get record: ${error.message}`);
    }
  }

  /**
   * Escape values for Airtable formula syntax
   * @param {string} value - Value to escape
   * @returns {string} - Escaped value
   */
  escapeFormulaValue(value) {
    if (typeof value !== 'string') return value;
    
    // Escape single quotes by doubling them
    return value.replace(/'/g, "''");
  }

  /**
   * Test Airtable connection
   * @returns {Promise<boolean>} - Connection status
   */
  async testConnection() {
    try {
      console.log('🔌 Testing Airtable connection...');
      
      // Try to fetch the first record to test connection
      const records = await this.table.select({
        maxRecords: 1
      }).firstPage();

      console.log('✅ Airtable connection successful');
      return true;

    } catch (error) {
      console.error('❌ Airtable connection failed:', error);
      
      if (error.error === 'NOT_FOUND') {
        console.error('Please check:');
        console.error('1. Base ID:', config.airtable.baseId);
        console.error('2. Table Name:', config.airtable.tableName);
        console.error('3. API Key: [hidden]');
      } else if (error.statusCode === 401) {
        console.error('Authentication failed. Please check your API key.');
      }
      
      return false;
    }
  }

  /**
   * Get table schema information
   * @returns {Promise<Object>} - Table schema
   */
  async getTableSchema() {
    try {
      console.log('📋 Fetching table schema...');
      
      // Airtable doesn't have a direct schema API, so we'll get sample data
      const records = await this.table.select({
        maxRecords: 1
      }).firstPage();

      if (records.length > 0) {
        const fields = Object.keys(records[0].fields);
        console.log('✅ Table fields:', fields);
        return {
          fieldCount: fields.length,
          fields: fields
        };
      } else {
        console.log('📭 Table is empty, no schema information available');
        return {
          fieldCount: 0,
          fields: []
        };
      }

    } catch (error) {
      console.error('❌ Error fetching table schema:', error);
      throw new Error(`Failed to get table schema: ${error.message}`);
    }
  }
}

// Create and export singleton instance
const airtableService = new AirtableService();
module.exports = airtableService;