// form-flow.js - COMPLETE FIXED VERSION
const whatsappService = require('./whatsapp');
const airtableService = require('./airtable');

class FormFlow {
  constructor() {
    this.userSessions = new Map();
  }

  getSession(phoneNumber) {
    if (!this.userSessions.has(phoneNumber)) {
      this.userSessions.set(phoneNumber, {
        currentSection: 'welcome',
        data: {},
        currentField: null,
        recordId: null
      });
    }
    return this.userSessions.get(phoneNumber);
  }

  updateSession(phoneNumber, updates) {
    const session = this.getSession(phoneNumber);
    Object.assign(session, updates);
    this.userSessions.set(phoneNumber, session);
    return session;
  }

  async handleMessage(phoneNumber, message) {
    const session = this.getSession(phoneNumber);
    
    // Handle special commands
    if (message.toLowerCase() === 'stop') {
      await whatsappService.sendTextMessage(phoneNumber, 
        '🛑 Form paused. You can continue anytime by sending any message.');
      this.updateSession(phoneNumber, { currentSection: 'paused' });
      return;
    }
    
    if (message.toLowerCase() === 'restart') {
      await this.startForm(phoneNumber);
      return;
    }

    if (session.currentSection === 'paused') {
      await this.startForm(phoneNumber);
      return;
    }
    
    switch (session.currentSection) {
      case 'welcome':
        await this.startForm(phoneNumber);
        break;
      
      case 'section1_personal':
        await this.handleSection1(phoneNumber, message, session);
        break;
      
      case 'section2_business':
        await this.handleSection2(phoneNumber, message, session);
        break;
      
      case 'section3_sector':
        await this.handleSection3(phoneNumber, message, session);
        break;
      
      case 'section4_market':
        await this.handleSection4(phoneNumber, message, session);
        break;
      
      case 'section5_funding':
        await this.handleSection5(phoneNumber, message, session);
        break;
      
      default:
        await this.startForm(phoneNumber);
    }
  }

  async startForm(phoneNumber) {
    const welcomeMessage = `🌟 *Welcome to the Business Plan Collection Form* 🌟

I'll guide you through the process of submitting your business plan. This form has 5 sections and will take about 10-15 minutes to complete.

*Commands:*
• Type *STOP* to pause
• Type *RESTART* to start over

Let's start with Section 1: Personal Information

*Please enter your Full Name:*`;

    await whatsappService.sendTextMessage(phoneNumber, welcomeMessage);
    this.updateSession(phoneNumber, { 
      currentSection: 'section1_personal',
      currentField: 'fullName',
      data: { phoneNumber } // Store WhatsApp number
    });
  }

  async handleSection1(phoneNumber, message, session) {
    const field = session.currentField;

    if (field === 'fullName') {
      session.data.fullName = message;
      session.currentField = 'cellphone';
      await whatsappService.sendTextMessage(phoneNumber, 
        '📱 *Cellphone Number:*\nPlease enter your cellphone number (South African format, e.g., 0712345678):');
    
    } else if (field === 'cellphone') {
      // Basic validation for SA number
      const phoneRegex = /^0[0-9]{9}$/;
      if (!phoneRegex.test(message)) {
        await whatsappService.sendTextMessage(phoneNumber, 
          '❌ Please enter a valid South African phone number (10 digits starting with 0).\nExample: 0712345678');
        return;
      }
      session.data.cellphone = message;
      session.currentField = 'email';
      await whatsappService.sendTextMessage(phoneNumber, 
        '📧 *Email Address:*\nPlease enter your email address:');
    
    } else if (field === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(message)) {
        await whatsappService.sendTextMessage(phoneNumber, 
          '❌ Please enter a valid email address.\nExample: name@example.com');
        return;
      }
      session.data.email = message;
      session.currentField = 'dob';
      await whatsappService.sendTextMessage(phoneNumber, 
        '🎂 *Date of Birth:*\nPlease enter your date of birth (YYYY-MM-DD):\n*Note: You must be at least 18 years old.*');
    
    } else if (field === 'dob') {
      const dob = new Date(message);
      const age = Math.floor((new Date() - dob) / (365.25 * 24 * 60 * 60 * 1000));
      if (isNaN(dob.getTime()) || age < 18) {
        await whatsappService.sendTextMessage(phoneNumber, 
          '❌ You must be at least 18 years old. Please enter a valid date (YYYY-MM-DD):');
        return;
      }
      session.data.dob = message;
      session.currentField = 'idNumber';
      await whatsappService.sendTextMessage(phoneNumber, 
        '🆔 *ID Number:*\nPlease enter your South African ID number:');
    
    } else if (field === 'idNumber') {
      if (!message.trim()) {
        await whatsappService.sendTextMessage(phoneNumber, 
          '❌ Please provide a valid ID number:');
        return;
      }
      session.data.idNumber = message;
      
      // Move to Section 2
      await this.startSection2(phoneNumber, session);
    }

    this.updateSession(phoneNumber, session);
  }

  async startSection2(phoneNumber, session) {
    session.currentSection = 'section2_business';
    session.currentField = 'businessName';
    
    await whatsappService.sendTextMessage(phoneNumber,
      `🏢 *Section 2: Business Details*

*Business Name:*\nPlease enter your business or project name:`);
  }

  async handleSection2(phoneNumber, message, session) {
    const field = session.currentField;

    if (field === 'businessName') {
      if (!message.trim()) {
        await whatsappService.sendTextMessage(phoneNumber,
          '❌ Please enter your business/project name:');
        return;
      }
      session.data.businessName = message;
      session.currentField = 'businessRegNumber';
      await whatsappService.sendTextMessage(phoneNumber,
        '📋 *Business Registration Number:*\nIf registered, enter your business registration number.\nIf not registered, type *N/A*:');
    
    } else if (field === 'businessRegNumber') {
      session.data.businessRegNumber = message;
      session.currentField = 'businessType';
      
      const businessTypes = [
        { title: 'Sole Proprietorship' },
        { title: 'Partnership' },
        { title: 'Private Company (Pty Ltd)' },
        { title: 'Cooperative' },
        { title: 'Non-Profit Organization' },
        { title: 'Social Enterprise' },
        { title: 'Other' }
      ];

      await whatsappService.sendList(phoneNumber,
        '*Business Type:*\nPlease select your business type from the list below:',
        'Business Types',
        [{ title: 'Business Types', rows: businessTypes }]
      );
    
    } else if (field === 'businessType') {
      session.data.businessType = message;
      session.currentField = 'yearEstablished';
      await whatsappService.sendTextMessage(phoneNumber,
        '📅 *Year Established:*\nPlease enter the year your business was established (YYYY):');
    
    } else if (field === 'yearEstablished') {
      const year = parseInt(message);
      const currentYear = new Date().getFullYear();
      if (isNaN(year) || year < 1900 || year > currentYear) {
        await whatsappService.sendTextMessage(phoneNumber,
          `❌ Please enter a valid year between 1900 and ${currentYear}:`);
        return;
      }
      session.data.yearEstablished = year;
      session.currentField = 'businessStage';
      
      const businessStages = [
        { title: 'Idea / Concept' },
        { title: 'Startup (0–3 years)' },
        { title: 'Small & Medium Enterprise (SME)' },
        { title: 'Scaling / Growth Stage' },
        { title: 'Other' }
      ];

      await whatsappService.sendList(phoneNumber,
        '*Business Stage:*\nSelect the current stage of your business:',
        'Business Stages',
        [{ title: 'Business Stages', rows: businessStages }]
      );
    
    } else if (field === 'businessStage') {
      session.data.businessStage = message;
      session.currentField = 'ownership';
      
      await whatsappService.sendButtons(phoneNumber,
        '*Ownership & Leadership:*\nSelect all that apply to your business:\n\n1. Women Majority-Owned (80%+)\n2. Women-Led\n3. Other',
        [
          { title: '1. Women Majority' },
          { title: '2. Women-Led' },
          { title: '3. Other' }
        ]
      );
    
    } else if (field === 'ownership') {
      if (!session.data.ownership) session.data.ownership = [];
      
      if (message.includes('1') || message.toLowerCase().includes('women majority')) {
        session.data.ownership.push('Women Majority-Owned (80%+)');
      }
      if (message.includes('2') || message.toLowerCase().includes('women-led')) {
        session.data.ownership.push('Women-Led');
      }
      if (message.includes('3') || message.toLowerCase().includes('other')) {
        session.data.ownership.push('Other');
      }
      
      if (session.data.ownership.length === 0) {
        await whatsappService.sendTextMessage(phoneNumber,
          '❌ You must indicate women ownership or leadership. Please select at least one option.');
        return;
      }
      
      session.currentField = 'employees';
      
      const employeeRanges = [
        { title: '0–5 employees' },
        { title: '6–20 employees' },
        { title: '21–50 employees' },
        { title: '51–100 employees' },
        { title: '100+ employees' }
      ];

      await whatsappService.sendList(phoneNumber,
        '*Number of Employees:*\nSelect the number of employees in your business:',
        'Employee Count',
        [{ title: 'Employee Ranges', rows: employeeRanges }]
      );
    
    } else if (field === 'employees') {
      session.data.employees = message;
      
      // Move to Section 3
      await this.startSection3(phoneNumber, session);
    }

    this.updateSession(phoneNumber, session);
  }

  async startSection3(phoneNumber, session) {
    session.currentSection = 'section3_sector';
    session.currentField = 'primarySector';
    
    const sectors = [
      { title: 'Agriculture & Agro-Processing' },
      { title: 'Technology' },
      { title: 'Retail & Wholesale' },
      { title: 'Healthcare & Wellness' },
      { title: 'Education & Training' },
      { title: 'Tourism & Hospitality' },
      { title: 'Energy & Renewable Energy' },
      { title: 'Construction & Engineering' },
      { title: 'Other' }
    ];

    await whatsappService.sendList(phoneNumber,
      '🏭 *Section 3: Business Sector*\n\n*Primary Sector:*\nSelect your primary business sector:',
      'Business Sectors',
      [{ title: 'Primary Sectors', rows: sectors }]
    );
  }

  async handleSection3(phoneNumber, message, session) {
    const field = session.currentField;

    if (field === 'primarySector') {
      session.data.primarySector = message;
      session.currentField = 'subsector';
      await whatsappService.sendTextMessage(phoneNumber,
        `🔍 *Subsector:*\nBased on your primary sector (${message}), please specify your subsector.\n\nExamples:\n- Agriculture: Crop Farming, Livestock, Dairy\n- Technology: Software, FinTech, E-commerce\n- Retail: FMCG, Clothing, Household Goods\n\nPlease describe your specific subsector:`);
    
    } else if (field === 'subsector') {
      if (!message.trim()) {
        await whatsappService.sendTextMessage(phoneNumber,
          '❌ Please specify a subsector:');
        return;
      }
      session.data.subsector = message;
      session.currentField = 'businessDescription';
      await whatsappService.sendTextMessage(phoneNumber,
        '📝 *Business Description:*\nPlease provide a detailed description of your business (100-300 words).\n\nInclude:\n- What products/services you offer\n- Your business model\n- Key activities and operations\n\nTake your time to write a comprehensive description:');
    
    } else if (field === 'businessDescription') {
      if (!message.trim() || message.length < 50) {
        await whatsappService.sendTextMessage(phoneNumber,
          '❌ Please provide a more detailed business description (at least 100 words):');
        return;
      }
      session.data.businessDescription = message;
      
      // Move to Section 4
      await this.startSection4(phoneNumber, session);
    }

    this.updateSession(phoneNumber, session);
  }

  async startSection4(phoneNumber, session) {
    session.currentSection = 'section4_market';
    session.currentField = 'targetMarket';
    
    await whatsappService.sendTextMessage(phoneNumber,
      `🎯 *Section 4: Market & Customers*

*Target Market:*\nPlease describe your target market (50-200 words).

Include:
- Demographic information (age, gender, income)
- Geographic location
- Customer needs and pain points

Describe your ideal customers:`);
  }

  async handleSection4(phoneNumber, message, session) {
    const field = session.currentField;

    if (field === 'targetMarket') {
      session.data.targetMarket = message;
      session.currentField = 'uniqueValue';
      await whatsappService.sendTextMessage(phoneNumber,
        `💎 *Unique Value Proposition:*
Explain what makes your business unique (50-150 words).

What makes you different from competitors?
Why should customers choose you?
What special value do you provide?

Describe your unique advantages:`);
    
    } else if (field === 'uniqueValue') {
      session.data.uniqueValue = message;
      session.currentField = 'competitors';
      await whatsappService.sendTextMessage(phoneNumber,
        `🏆 *Key Competitors:* (Optional)
If you know your main competitors, please list them here.\nIf not, type 'Skip' or 'None':`);
    
    } else if (field === 'competitors') {
      // Handle competitors response properly
      if (message.toLowerCase() === 'skip' || message.toLowerCase() === 'none') {
        session.data.competitors = '';
      } else {
        session.data.competitors = message;
      }
      
      // Move to marketing channels - send the buttons
      session.currentField = 'marketingChannels';
      
      await whatsappService.sendButtons(phoneNumber,
        `📢 *Marketing Channels:*
Select your main marketing channels (tap one button):

1. Social Media (Facebook, Instagram, TikTok)
2. WhatsApp / Messaging Apps  
3. Physical Stores / Pop-ups
4. E-commerce / Website
5. Other`,
        [
          { title: '1. Social Media' },
          { title: '2. WhatsApp' },
          { title: '3. Physical Stores' },
          { title: '4. E-commerce' },
          { title: '5. Other' }
        ]
      );
    
    } else if (field === 'marketingChannels') {
      // Handle marketing channels selection
      if (!session.data.marketingChannels) session.data.marketingChannels = [];
      
      // Clear previous selections and add the new one
      session.data.marketingChannels = [];
      
      if (message.includes('1') || message.toLowerCase().includes('social')) {
        session.data.marketingChannels.push('Social Media (Facebook, Instagram, TikTok)');
      } else if (message.includes('2') || message.toLowerCase().includes('whatsapp')) {
        session.data.marketingChannels.push('WhatsApp / Messaging Apps');
      } else if (message.includes('3') || message.toLowerCase().includes('physical')) {
        session.data.marketingChannels.push('Physical Stores / Pop-ups');
      } else if (message.includes('4') || message.toLowerCase().includes('e-commerce') || message.toLowerCase().includes('website')) {
        session.data.marketingChannels.push('E-commerce / Website');
      } else if (message.includes('5') || message.toLowerCase().includes('other')) {
        session.data.marketingChannels.push('Other');
      }
      
      if (session.data.marketingChannels.length === 0) {
        await whatsappService.sendTextMessage(phoneNumber,
          '❌ Please select a valid marketing channel. Tap one of the buttons above.');
        return;
      }
      
      console.log('✅ Marketing channels selected:', session.data.marketingChannels);
      
      // Move to Section 5 - Funding
      await this.startSection5(phoneNumber, session);
    }

    this.updateSession(phoneNumber, session);
  }

  async startSection5(phoneNumber, session) {
    session.currentSection = 'section5_funding';
    session.currentField = 'fundingType';
    
    await whatsappService.sendButtons(phoneNumber,
      `💰 *Section 5: Funding Information*

*Funding Type:*
What type of funding are you seeking? (Tap one button)

1. Microloan
2. Term Loan
3. Equity Financing
4. Grant
5. Other`,
      [
        { title: '1. Microloan' },
        { title: '2. Term Loan' },
        { title: '3. Equity' },
        { title: '4. Grant' },
        { title: '5. Other' }
      ]
    );
  }

  async handleSection5(phoneNumber, message, session) {
    const field = session.currentField;

    if (field === 'fundingType') {
      if (!session.data.fundingType) session.data.fundingType = [];
      
      // Clear previous selections and add the new one
      session.data.fundingType = [];
      
      if (message.includes('1') || message.toLowerCase().includes('microloan')) {
        session.data.fundingType.push('Microloan');
      } else if (message.includes('2') || message.toLowerCase().includes('term loan')) {
        session.data.fundingType.push('Term Loan');
      } else if (message.includes('3') || message.toLowerCase().includes('equity')) {
        session.data.fundingType.push('Equity Financing');
      } else if (message.includes('4') || message.toLowerCase().includes('grant')) {
        session.data.fundingType.push('Grant');
      } else if (message.includes('5') || message.toLowerCase().includes('other')) {
        session.data.fundingType.push('Other');
      }
      
      if (session.data.fundingType.length === 0) {
        await whatsappService.sendTextMessage(phoneNumber,
          '❌ Please select a valid funding type. Tap one of the buttons above.');
        return;
      }
      
      console.log('✅ Funding type selected:', session.data.fundingType);
      
      // FORM COMPLETE - Send to Airtable!
      await this.completeForm(phoneNumber, session);
    }

    this.updateSession(phoneNumber, session);
  }

  async completeForm(phoneNumber, session) {
    try {
      console.log('🎯 Form completed, sending to Airtable...');
      console.log('Collected data:', {
        name: session.data.fullName,
        business: session.data.businessName,
        marketing: session.data.marketingChannels,
        funding: session.data.fundingType
      });
      
      // Send data to Airtable
      const recordId = await airtableService.createBusinessPlan(session.data);
      session.recordId = recordId;
      
      const completionMessage = `🎉 *Congratulations!* 🎉

Your business plan has been successfully submitted!

*Reference Number:* BP-${recordId.substring(0, 8).toUpperCase()}

We will review your application and contact you within 5-7 business days.

Thank you for taking the time to complete this comprehensive business plan form.

For any queries, please contact our support team.

Have a great day! 🌟`;

      await whatsappService.sendTextMessage(phoneNumber, completionMessage);
      
      // Clear session after successful submission
      this.userSessions.delete(phoneNumber);
      
      console.log('✅ Form data successfully pushed to Airtable!');
      
    } catch (error) {
      console.error('❌ Error submitting form to Airtable:', error);
      await whatsappService.sendTextMessage(phoneNumber,
        '❌ Sorry, there was an error submitting your form. Please try again later or contact support.');
    }
  }
}

module.exports = new FormFlow();