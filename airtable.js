// airtable.js - FIXED FOR MULTI-SELECT FIELDS
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

      const record = await this.table.create(recordData);
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
      }
      
      throw new Error(`Failed to create business plan record: ${error.message}`);
    }
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

      const record = await this.table.update(recordId, formattedUpdates);
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
   * Escape values for Airtable formula syntax
   * @param {string} value - Value to escape
   * @returns {string} - Escaped value
   */
  escapeFormulaValue(value) {
    if (typeof value !== 'string') return value;
    return value.replace(/'/g, "''");
  }

  /**
   * Test Airtable connection
   * @returns {Promise<boolean>} - Connection status
   */
  async testConnection() {
    try {
      console.log('🔌 Testing Airtable connection...');
      
      const records = await this.table.select({
        maxRecords: 1
      }).firstPage();

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