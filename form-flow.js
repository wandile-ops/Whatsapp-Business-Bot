// form-flow.js - COMPLETE FIXED VERSION WITH PROPER FLOW
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
    
    console.log(`📱 Handling message from ${phoneNumber}: "${message}"`);
    console.log(`   Current section: ${session.currentSection}, field: ${session.currentField}`);
    
    // Handle special commands
    if (message.toLowerCase() === 'stop') {
      await whatsappService.sendTextMessage(phoneNumber, 
        '🛑 Form paused. You can continue anytime by sending any message.');
      this.updateSession(phoneNumber, { currentSection: 'paused' });
      return;
    }
    
    if (message.toLowerCase() === 'restart') {
      this.userSessions.delete(phoneNumber); // Clear session completely
      await this.startForm(phoneNumber);
      return;
    }

    if (session.currentSection === 'paused') {
      await this.startForm(phoneNumber);
      return;
    }
    
    // Handle confirmation separately
    if (session.currentField === 'confirmation') {
      await this.handleConfirmation(phoneNumber, message, session);
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
    console.log(`   Processing section1, field: ${field}, message: "${message}"`);

    if (field === 'fullName') {
      if (!message.trim()) {
        await whatsappService.sendTextMessage(phoneNumber, 
          '❌ Please enter your full name:');
        return;
      }
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
    console.log(`   Processing section2, field: ${field}, message: "${message}"`);

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

      await this.sendListWithFallback(phoneNumber,
        '*Business Type:*\nPlease select your business type:',
        'Business Types',
        businessTypes
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

      await this.sendListWithFallback(phoneNumber,
        '*Business Stage:*\nSelect the current stage of your business:',
        'Business Stages',
        businessStages
      );
    
    } else if (field === 'businessStage') {
      session.data.businessStage = message;
      session.currentField = 'ownership';
      
      await this.sendButtonsWithFallback(phoneNumber,
        '*Ownership & Leadership:*\nSelect all that apply to your business:',
        [
          { title: '1. Women Majority' },
          { title: '2. Women-Led' },
          { title: '3. Other' }
        ],
        `1. Women Majority-Owned (80%+)\n2. Women-Led\n3. Other\n\nType the numbers (e.g., "1 2" for multiple):`
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

      await this.sendListWithFallback(phoneNumber,
        '*Number of Employees:*\nSelect the number of employees in your business:',
        'Employee Count',
        employeeRanges
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

    await this.sendListWithFallback(phoneNumber,
      '🏭 *Section 3: Business Sector*\n\n*Primary Sector:*\nSelect your primary business sector:',
      'Business Sectors',
      sectors
    );
  }

  async handleSection3(phoneNumber, message, session) {
    const field = session.currentField;
    console.log(`   Processing section3, field: ${field}, message: "${message}"`);

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
    console.log(`   Processing section4, field: ${field}, message: "${message}"`);

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
If you know your main competitors, please list them here.\nIf not, type 'Skip':`);
    
    } else if (field === 'competitors') {
      if (message.toLowerCase() !== 'skip') {
        session.data.competitors = message;
      }
      
      // PROPERLY transition to marketing channels
      session.currentField = 'marketingChannels';
      await this.showMarketingChannels(phoneNumber, session);
    
    } else if (field === 'marketingChannels') {
      if (!session.data.marketingChannels) session.data.marketingChannels = [];
      
      // Handle the response
      if (message.includes('1') || message.toLowerCase().includes('social')) {
        session.data.marketingChannels.push('Social Media (Facebook, Instagram, TikTok)');
      }
      if (message.includes('2') || message.toLowerCase().includes('whatsapp')) {
        session.data.marketingChannels.push('WhatsApp / Messaging Apps');
      }
      if (message.includes('3') || message.toLowerCase().includes('physical')) {
        session.data.marketingChannels.push('Physical Stores / Pop-ups');
      }
      if (message.includes('4') || message.toLowerCase().includes('e-commerce')) {
        session.data.marketingChannels.push('E-commerce / Website');
      }
      if (message.includes('5') || message.toLowerCase().includes('other')) {
        session.data.marketingChannels.push('Other');
      }
      
      if (session.data.marketingChannels.length === 0) {
        await whatsappService.sendTextMessage(phoneNumber,
          '❌ Please select at least one marketing channel. Tap one of the buttons above or type the number (1-5).');
        return;
      }
      
      console.log('✅ Marketing channels selected:', session.data.marketingChannels);
      
      // Move to funding section
      await this.startSection5(phoneNumber, session);
    }

    this.updateSession(phoneNumber, session);
  }

  // Helper function to show marketing channels
  async showMarketingChannels(phoneNumber, session) {
    await whatsappService.sendTextMessage(phoneNumber,
      `📢 *Marketing Channels:*
How do you reach your customers? Select your main marketing channels:`);

    await this.sendButtonsWithFallback(phoneNumber,
      `Choose your marketing channels:`,
      [
        { title: '1. Social Media' },
        { title: '2. WhatsApp' },
        { title: '3. Physical Stores' },
        { title: '4. E-commerce' },
        { title: '5. Other' }
      ],
      `Please type the number for your marketing channels:
1. Social Media (Facebook, Instagram, TikTok)
2. WhatsApp / Messaging Apps  
3. Physical Stores / Pop-ups
4. E-commerce / Website
5. Other

Type the numbers (e.g., "1 3" for multiple):`
    );
  }

  async startSection5(phoneNumber, session) {
    session.currentSection = 'section5_funding';
    session.currentField = 'fundingType';
    
    await whatsappService.sendTextMessage(phoneNumber,
      `💰 *Section 5: Funding Information*`);

    await this.sendButtonsWithFallback(phoneNumber,
      `What type of funding are you seeking?`,
      [
        { title: '1. Microloan' },
        { title: '2. Term Loan' },
        { title: '3. Equity' },
        { title: '4. Grant' },
        { title: '5. Other' }
      ],
      `What type of funding are you seeking?
1. Microloan
2. Term Loan  
3. Equity Financing
4. Grant
5. Other

Type the numbers (e.g., "1 4" for multiple):`
    );
  }

  async handleSection5(phoneNumber, message, session) {
    const field = session.currentField;
    console.log(`   Processing section5, field: ${field}, message: "${message}"`);

    if (field === 'fundingType') {
      if (!session.data.fundingType) session.data.fundingType = [];
      
      // Handle funding type selection
      if (message.includes('1') || message.toLowerCase().includes('microloan')) {
        session.data.fundingType.push('Microloan');
      }
      if (message.includes('2') || message.toLowerCase().includes('term loan')) {
        session.data.fundingType.push('Term Loan');
      }
      if (message.includes('3') || message.toLowerCase().includes('equity')) {
        session.data.fundingType.push('Equity Financing');
      }
      if (message.includes('4') || message.toLowerCase().includes('grant')) {
        session.data.fundingType.push('Grant');
      }
      if (message.includes('5') || message.toLowerCase().includes('other')) {
        session.data.fundingType.push('Other');
      }
      
      if (session.data.fundingType.length === 0) {
        await whatsappService.sendTextMessage(phoneNumber,
          '❌ Please select at least one funding type. Tap one of the buttons above or type the number (1-5).');
        return;
      }
      
      console.log('✅ Funding types selected:', session.data.fundingType);
      
      // SHOW SUMMARY before submitting
      await this.showSummaryBeforeSubmission(phoneNumber, session);
    }

    this.updateSession(phoneNumber, session);
  }

  // Helper function to send lists with fallback
  async sendListWithFallback(phoneNumber, body, buttonText, options) {
    try {
      await whatsappService.sendSimpleList(phoneNumber, body, buttonText, options);
    } catch (error) {
      console.log('🔄 List failed, falling back to text...');
      let optionsText = options.map((opt, index) => `${index + 1}. ${opt.title}`).join('\n');
      await whatsappService.sendTextMessage(phoneNumber, `${body}\n\n${optionsText}\n\nPlease reply with the number (e.g., "1"):`);
    }
  }

  // Helper function to send buttons with fallback
  async sendButtonsWithFallback(phoneNumber, text, buttons, fallbackText) {
    try {
      await whatsappService.sendButtons(phoneNumber, text, buttons);
    } catch (error) {
      console.log('🔄 Buttons failed, falling back to text...');
      await whatsappService.sendTextMessage(phoneNumber, fallbackText);
    }
  }

  // Show summary before submission
  async showSummaryBeforeSubmission(phoneNumber, session) {
    const summary = `
📊 *YOUR BUSINESS PLAN SUMMARY*

👤 *Personal Information:*
• Name: ${session.data.fullName}
• Phone: ${session.data.cellphone}
• Email: ${session.data.email}
• Business: ${session.data.businessName}

🏢 *Business Details:*
• Type: ${session.data.businessType}
• Stage: ${session.data.businessStage} 
• Employees: ${session.data.employees}
• Ownership: ${session.data.ownership.join(', ')}

🏭 *Business Operations:*
• Sector: ${session.data.primarySector}
• Subsector: ${session.data.subsector}

📢 *Marketing:*
• Channels: ${session.data.marketingChannels.join(', ')}

💰 *Funding:*
• Types: ${session.data.fundingType.join(', ')}

---
✅ *Ready to submit?* Type "YES" to submit your business plan.
🔄 Type "NO" to make changes.
    `;

    await whatsappService.sendTextMessage(phoneNumber, summary);
    
    // Change field to wait for confirmation
    session.currentField = 'confirmation';
  }

  // Handle confirmation
  async handleConfirmation(phoneNumber, message, session) {
    if (message.toLowerCase() === 'yes') {
      await whatsappService.sendTextMessage(phoneNumber, '🚀 Submitting your business plan...');
      await this.completeForm(phoneNumber, session);
    } else if (message.toLowerCase() === 'no') {
      await whatsappService.sendTextMessage(phoneNumber,
        '🔄 Let me know which section you want to change, or type "RESTART" to start over.');
      session.currentField = 'editing';
    } else {
      await whatsappService.sendTextMessage(phoneNumber,
        '❌ Please type "YES" to submit your business plan or "NO" to make changes.');
    }
  }

  async completeForm(phoneNumber, session) {
    try {
      console.log('🎯 Form completed, sending to Airtable...');
      console.log('Data to send:', session.data);
      
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