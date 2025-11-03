// airtable.js - UPDATED FOR MULTILINGUAL SUPPORT
const Airtable = require('airtable');
const config = require('./config');

// Initialize Airtable
const base = new Airtable({ apiKey: config.airtable.apiKey })
  .base(config.airtable.baseId);

class AirtableService {
  constructor() {
    this.table = base(config.airtable.tableName);
  }

  async createBusinessPlan(data) {
    try {
      console.log('📝 Creating new business plan record in Airtable...');
      
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
        
        // Multi-select fields
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
        'Funding Type': this.formatMultiSelectField(data.fundingType),

        // Language information
        'Preferred Language': data.languageName || 'English',
        'Language Code': data.preferredLanguage || 'en'
      };

      console.log('📦 Record data prepared:', Object.keys(recordData).length, 'fields');
      console.log('🌍 User language:', data.preferredLanguage);

      const record = await this.table.create(recordData);
      const recordId = record.getId();
      
      console.log('✅ Successfully created Airtable record:', recordId);
      return recordId;

    } catch (error) {
      console.error('❌ Error creating Airtable record:', error);
      throw error;
    }
  }

  formatMultiSelectField(field) {
    if (!field) return [];
    if (Array.isArray(field)) return field;
    if (typeof field === 'string') return [field];
    return [];
  }

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

module.exports = new AirtableService();