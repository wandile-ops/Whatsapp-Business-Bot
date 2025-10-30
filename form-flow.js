// form-flow.js - CLEAN WORKING VERSION
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
        currentField: null
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
    // Handle special commands first
    if (message.toLowerCase() === 'stop') {
      await whatsappService.sendTextMessage(phoneNumber, 
        '🛑 Form paused. Send any message to continue.');
      return;
    }
    
    if (message.toLowerCase() === 'restart') {
      this.userSessions.delete(phoneNumber);
      await this.startForm(phoneNumber);
      return;
    }

    const session = this.getSession(phoneNumber);
    
    // Handle confirmation separately
    if (session.currentField === 'confirmation') {
      await this.handleConfirmation(phoneNumber, message, session);
      return;
    }

    // Route to appropriate section handler
    switch (session.currentSection) {
      case 'welcome':
        await this.startForm(phoneNumber);
        break;
      case 'section1':
        await this.handleSection1(phoneNumber, message, session);
        break;
      case 'section2':
        await this.handleSection2(phoneNumber, message, session);
        break;
      case 'section3':
        await this.handleSection3(phoneNumber, message, session);
        break;
      case 'section4':
        await this.handleSection4(phoneNumber, message, session);
        break;
      case 'section5':
        await this.handleSection5(phoneNumber, message, session);
        break;
      default:
        await this.startForm(phoneNumber);
    }
  }

  async startForm(phoneNumber) {
    const welcomeMessage = `🌟 *Welcome to the Business Plan Collection Form* 🌟

I'll guide you through submitting your business plan. This has 5 sections.

*Commands:*
• STOP - pause
• RESTART - start over

*Section 1: Personal Information*

Please enter your Full Name:`;

    await whatsappService.sendTextMessage(phoneNumber, welcomeMessage);
    this.updateSession(phoneNumber, { 
      currentSection: 'section1',
      currentField: 'fullName',
      data: { phoneNumber }
    });
  }

  async handleSection1(phoneNumber, message, session) {
    const field = session.currentField;

    if (field === 'fullName') {
      session.data.fullName = message;
      session.currentField = 'cellphone';
      await whatsappService.sendTextMessage(phoneNumber, 
        '📱 *Cellphone Number:*\nEnter your SA number (e.g., 0712345678):');
    
    } else if (field === 'cellphone') {
      if (!/^0[0-9]{9}$/.test(message)) {
        await whatsappService.sendTextMessage(phoneNumber, 
          '❌ Please enter a valid 10-digit SA number starting with 0.\nExample: 0712345678');
        return;
      }
      session.data.cellphone = message;
      session.currentField = 'email';
      await whatsappService.sendTextMessage(phoneNumber, 
        '📧 *Email Address:*\nEnter your email:');
    
    } else if (field === 'email') {
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(message)) {
        await whatsappService.sendTextMessage(phoneNumber, 
          '❌ Please enter a valid email.\nExample: name@example.com');
        return;
      }
      session.data.email = message;
      session.currentField = 'dob';
      await whatsappService.sendTextMessage(phoneNumber, 
        '🎂 *Date of Birth:*\nEnter your birth date (YYYY-MM-DD):\n*Must be 18+ years old*');
    
    } else if (field === 'dob') {
      const dob = new Date(message);
      const age = Math.floor((new Date() - dob) / (365.25 * 24 * 60 * 60 * 1000));
      if (isNaN(dob.getTime()) || age < 18) {
        await whatsappService.sendTextMessage(phoneNumber, 
          '❌ You must be 18+. Enter valid date (YYYY-MM-DD):');
        return;
      }
      session.data.dob = message;
      session.currentField = 'idNumber';
      await whatsappService.sendTextMessage(phoneNumber, 
        '🆔 *ID Number:*\nEnter your SA ID number:');
    
    } else if (field === 'idNumber') {
      if (!message.trim()) {
        await whatsappService.sendTextMessage(phoneNumber, 
          '❌ Please enter your ID number:');
        return;
      }
      session.data.idNumber = message;
      await this.startSection2(phoneNumber, session);
    }

    this.updateSession(phoneNumber, session);
  }

  async startSection2(phoneNumber, session) {
    session.currentSection = 'section2';
    session.currentField = 'businessName';
    
    await whatsappService.sendTextMessage(phoneNumber,
      `🏢 *Section 2: Business Details*

*Business Name:*\nEnter your business name:`);
  }

  async handleSection2(phoneNumber, message, session) {
    const field = session.currentField;

    if (field === 'businessName') {
      if (!message.trim()) {
        await whatsappService.sendTextMessage(phoneNumber,
          '❌ Please enter business name:');
        return;
      }
      session.data.businessName = message;
      session.currentField = 'businessRegNumber';
      await whatsappService.sendTextMessage(phoneNumber,
        '📋 *Business Registration:*\nEnter registration number or type N/A:');
    
    } else if (field === 'businessRegNumber') {
      session.data.businessRegNumber = message;
      session.currentField = 'businessType';
      
      // Simple text options for business type
      await whatsappService.sendTextMessage(phoneNumber,
        `🏢 *Business Type:*
Choose one:
1. Sole Proprietorship
2. Partnership
3. Private Company (Pty Ltd)
4. Cooperative
5. Non-Profit Organization
6. Social Enterprise
7. Other

Type the number (1-7):`);
    
    } else if (field === 'businessType') {
      const types = {
        '1': 'Sole Proprietorship',
        '2': 'Partnership',
        '3': 'Private Company (Pty Ltd)',
        '4': 'Cooperative',
        '5': 'Non-Profit Organization',
        '6': 'Social Enterprise',
        '7': 'Other'
      };
      
      if (types[message]) {
        session.data.businessType = types[message];
      } else if (Object.values(types).includes(message)) {
        session.data.businessType = message;
      } else {
        await whatsappService.sendTextMessage(phoneNumber,
          '❌ Please type a number 1-7:');
        return;
      }
      
      session.currentField = 'yearEstablished';
      await whatsappService.sendTextMessage(phoneNumber,
        '📅 *Year Established:*\nEnter year (YYYY):');
    
    } else if (field === 'yearEstablished') {
      const year = parseInt(message);
      const currentYear = new Date().getFullYear();
      if (isNaN(year) || year < 1900 || year > currentYear) {
        await whatsappService.sendTextMessage(phoneNumber,
          `❌ Enter valid year (1900-${currentYear}):`);
        return;
      }
      session.data.yearEstablished = year;
      session.currentField = 'businessStage';
      
      await whatsappService.sendTextMessage(phoneNumber,
        `🚀 *Business Stage:*
Choose one:
1. Idea / Concept
2. Startup (0–3 years)
3. Small & Medium Enterprise (SME)
4. Scaling / Growth Stage
5. Other

Type the number (1-5):`);
    
    } else if (field === 'businessStage') {
      const stages = {
        '1': 'Idea / Concept',
        '2': 'Startup (0–3 years)',
        '3': 'Small & Medium Enterprise (SME)',
        '4': 'Scaling / Growth Stage',
        '5': 'Other'
      };
      
      if (stages[message]) {
        session.data.businessStage = stages[message];
      } else if (Object.values(stages).includes(message)) {
        session.data.businessStage = message;
      } else {
        await whatsappService.sendTextMessage(phoneNumber,
          '❌ Please type a number 1-5:');
        return;
      }
      
      session.currentField = 'ownership';
      
      await whatsappService.sendTextMessage(phoneNumber,
        `👩‍💼 *Ownership & Leadership:*
Select all that apply:
1. Women Majority-Owned (80%+)
2. Women-Led
3. Other

Type numbers (e.g., "1 2" for multiple):`);
    
    } else if (field === 'ownership') {
      if (!session.data.ownership) session.data.ownership = [];
      
      if (message.includes('1')) session.data.ownership.push('Women Majority-Owned (80%+)');
      if (message.includes('2')) session.data.ownership.push('Women-Led');
      if (message.includes('3')) session.data.ownership.push('Other');
      
      if (session.data.ownership.length === 0) {
        await whatsappService.sendTextMessage(phoneNumber,
          '❌ Please select at least one. Type numbers (e.g., "1 2"):');
        return;
      }
      
      session.currentField = 'employees';
      
      await whatsappService.sendTextMessage(phoneNumber,
        `👥 *Number of Employees:*
Choose one:
1. 0–5
2. 6–20
3. 21–50
4. 51–100
5. 100+

Type the number (1-5):`);
    
    } else if (field === 'employees') {
      const employees = {
        '1': '0–5',
        '2': '6–20',
        '3': '21–50',
        '4': '51–100',
        '5': '100+'
      };
      
      if (employees[message]) {
        session.data.employees = employees[message];
      } else if (Object.values(employees).includes(message)) {
        session.data.employees = message;
      } else {
        await whatsappService.sendTextMessage(phoneNumber,
          '❌ Please type a number 1-5:');
        return;
      }
      
      await this.startSection3(phoneNumber, session);
    }

    this.updateSession(phoneNumber, session);
  }

  async startSection3(phoneNumber, session) {
    session.currentSection = 'section3';
    session.currentField = 'primarySector';
    
    await whatsappService.sendTextMessage(phoneNumber,
      `🏭 *Section 3: Business Sector*

*Primary Sector:*
Choose one:
1. Agriculture & Agro-Processing
2. Technology
3. Retail & Wholesale
4. Healthcare & Wellness
5. Education & Training
6. Tourism & Hospitality
7. Energy & Renewable Energy
8. Construction & Engineering
9. Other

Type the number (1-9):`);
  }

  async handleSection3(phoneNumber, message, session) {
    const field = session.currentField;

    if (field === 'primarySector') {
      const sectors = {
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
      
      if (sectors[message]) {
        session.data.primarySector = sectors[message];
      } else if (Object.values(sectors).includes(message)) {
        session.data.primarySector = message;
      } else {
        await whatsappService.sendTextMessage(phoneNumber,
          '❌ Please type a number 1-9:');
        return;
      }
      
      session.currentField = 'subsector';
      await whatsappService.sendTextMessage(phoneNumber,
        `🔍 *Subsector:*
Based on "${session.data.primarySector}", describe your specific area:

Examples:
- Technology: Software, FinTech, E-commerce
- Agriculture: Crop Farming, Livestock, Dairy
- Retail: FMCG, Clothing, Household Goods

Describe your subsector:`);
    
    } else if (field === 'subsector') {
      if (!message.trim()) {
        await whatsappService.sendTextMessage(phoneNumber,
          '❌ Please describe your subsector:');
        return;
      }
      session.data.subsector = message;
      session.currentField = 'businessDescription';
      await whatsappService.sendTextMessage(phoneNumber,
        `📝 *Business Description:*
Describe your business (2-3 sentences):

Include:
- Products/services you offer
- Your business model
- Key activities

Describe your business:`);
    
    } else if (field === 'businessDescription') {
      if (!message.trim() || message.length < 20) {
        await whatsappService.sendTextMessage(phoneNumber,
          '❌ Please provide a more detailed description:');
        return;
      }
      session.data.businessDescription = message;
      await this.startSection4(phoneNumber, session);
    }

    this.updateSession(phoneNumber, session);
  }

  async startSection4(phoneNumber, session) {
    session.currentSection = 'section4';
    session.currentField = 'targetMarket';
    
    await whatsappService.sendTextMessage(phoneNumber,
      `🎯 *Section 4: Market & Customers*

*Target Market:*
Describe your ideal customers:

Include:
- Who they are (age, location, income)
- Their needs and challenges
- Why they would buy from you

Describe your target market:`);
  }

  async handleSection4(phoneNumber, message, session) {
    const field = session.currentField;

    if (field === 'targetMarket') {
      session.data.targetMarket = message;
      session.currentField = 'uniqueValue';
      await whatsappService.sendTextMessage(phoneNumber,
        `💎 *Unique Value Proposition:*
What makes your business different?

- Why choose you over competitors?
- What special value do you provide?
- Your competitive advantage

Describe your unique value:`);
    
    } else if (field === 'uniqueValue') {
      session.data.uniqueValue = message;
      session.currentField = 'competitors';
      await whatsappService.sendTextMessage(phoneNumber,
        `🏆 *Key Competitors:* (Optional)
List your main competitors or type 'skip':`);
    
    } else if (field === 'competitors') {
      if (message.toLowerCase() !== 'skip') {
        session.data.competitors = message;
      }
      session.currentField = 'marketingChannels';
      
      await whatsappService.sendTextMessage(phoneNumber,
        `📢 *Marketing Channels:*
How do you reach customers?
1. Social Media (Facebook, Instagram, TikTok)
2. WhatsApp / Messaging Apps
3. Physical Stores / Pop-ups
4. E-commerce / Website
5. Other

Type numbers (e.g., "1 3" for multiple):`);
    
    } else if (field === 'marketingChannels') {
      if (!session.data.marketingChannels) session.data.marketingChannels = [];
      
      if (message.includes('1')) session.data.marketingChannels.push('Social Media (Facebook, Instagram, TikTok)');
      if (message.includes('2')) session.data.marketingChannels.push('WhatsApp / Messaging Apps');
      if (message.includes('3')) session.data.marketingChannels.push('Physical Stores / Pop-ups');
      if (message.includes('4')) session.data.marketingChannels.push('E-commerce / Website');
      if (message.includes('5')) session.data.marketingChannels.push('Other');
      
      if (session.data.marketingChannels.length === 0) {
        await whatsappService.sendTextMessage(phoneNumber,
          '❌ Please select at least one. Type numbers (e.g., "1 3"):');
        return;
      }
      
      await this.startSection5(phoneNumber, session);
    }

    this.updateSession(phoneNumber, session);
  }

  async startSection5(phoneNumber, session) {
    session.currentSection = 'section5';
    session.currentField = 'fundingType';
    
    await whatsappService.sendTextMessage(phoneNumber,
      `💰 *Section 5: Funding Information*

*Funding Type:*
What funding are you seeking?
1. Microloan
2. Term Loan
3. Equity Financing
4. Grant
5. Other

Type numbers (e.g., "1 4" for multiple):`);
  }

  async handleSection5(phoneNumber, message, session) {
    const field = session.currentField;

    if (field === 'fundingType') {
      if (!session.data.fundingType) session.data.fundingType = [];
      
      if (message.includes('1')) session.data.fundingType.push('Microloan');
      if (message.includes('2')) session.data.fundingType.push('Term Loan');
      if (message.includes('3')) session.data.fundingType.push('Equity Financing');
      if (message.includes('4')) session.data.fundingType.push('Grant');
      if (message.includes('5')) session.data.fundingType.push('Other');
      
      if (session.data.fundingType.length === 0) {
        await whatsappService.sendTextMessage(phoneNumber,
          '❌ Please select at least one. Type numbers (e.g., "1 4"):');
        return;
      }
      
      await this.showSummaryBeforeSubmission(phoneNumber, session);
    }

    this.updateSession(phoneNumber, session);
  }

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
✅ *Ready to submit?* Type "YES" to submit.
🔄 Type "NO" to make changes.
    `;

    await whatsappService.sendTextMessage(phoneNumber, summary);
    session.currentField = 'confirmation';
  }

  async handleConfirmation(phoneNumber, message, session) {
    if (message.toLowerCase() === 'yes') {
      await whatsappService.sendTextMessage(phoneNumber, '🚀 Submitting your business plan...');
      await this.completeForm(phoneNumber, session);
    } else if (message.toLowerCase() === 'no') {
      await whatsappService.sendTextMessage(phoneNumber,
        '🔄 Type "RESTART" to start over.');
    } else {
      await whatsappService.sendTextMessage(phoneNumber,
        '❌ Please type "YES" to submit or "NO" to cancel.');
    }
  }

  async completeForm(phoneNumber, session) {
    try {
      console.log('🎯 Submitting to Airtable...');
      
      const recordId = await airtableService.createBusinessPlan(session.data);
      
      const completionMessage = `🎉 *Congratulations!* 🎉

Your business plan has been submitted!

*Reference:* BP-${recordId.substring(0, 8).toUpperCase()}

We'll review and contact you within 5-7 days.

Thank you! 🌟`;

      await whatsappService.sendTextMessage(phoneNumber, completionMessage);
      
      // Clear session
      this.userSessions.delete(phoneNumber);
      
    } catch (error) {
      console.error('❌ Submission error:', error);
      await whatsappService.sendTextMessage(phoneNumber,
        '❌ Sorry, there was an error. Please try again later.');
    }
  }
}

module.exports = new FormFlow();