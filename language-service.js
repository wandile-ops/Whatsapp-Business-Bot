// language-service.js - COMPLETE 11 LANGUAGES
class LanguageService {
  constructor() {
    this.translations = {
      // English (en)
      'en': {
        'welcome': `🌟 *Welcome to the Business Plan Collection Form* 🌟

I'll guide you through the process of submitting your business plan. This form has 5 sections and will take about 10-15 minutes to complete.

*Commands:*
• Type *STOP* to pause
• Type *RESTART* to start over

Let's start! Please choose your language:`,
        
        'language_selection': '🌍 *Please select your language:*',
        'full_name': '👤 *Full Name:*\nPlease enter your full name:',
        'cellphone': '📱 *Cellphone Number:*\nPlease enter your cellphone number (e.g., 0712345678):',
        'email': '📧 *Email Address:*\nPlease enter your email address:',
        'dob': '🎂 *Date of Birth:*\nPlease enter your date of birth (YYYY-MM-DD):',
        'id_number': '🆔 *ID Number:*\nPlease enter your South African ID number:',
        'business_name': '🏢 *Business Name:*\nPlease enter your business or project name:',
        'business_reg': '📋 *Business Registration Number:*\nIf registered, enter your business registration number.\nIf not registered, type *N/A*:',
        'business_type': '*Business Type:*\nPlease select your business type:',
        'year_established': '📅 *Year Established:*\nPlease enter the year your business was established (YYYY):',
        'business_stage': '*Business Stage:*\nSelect the current stage of your business:',
        'ownership': `*Ownership & Leadership:*
Select all that apply to your business:

1. Women Majority-Owned (80%+)
2. Women-Led
3. Other`,
        'employees': '*Number of Employees:*\nSelect the number of employees in your business:',
        'sector': '🏭 *Primary Sector:*\nSelect your primary business sector:',
        'subsector': '🔍 *Subsector:*\nPlease specify your subsector:',
        'description': `📝 *Business Description:*
Please provide a detailed description of your business (100-300 words).

Include:
- What products/services you offer
- Your business model
- Key activities and operations

Take your time to write a comprehensive description:`,
        'target_market': `🎯 *Target Market:*
Please describe your target market (50-200 words).

Include:
- Demographic information
- Geographic location
- Customer needs and pain points

Describe your ideal customers:`,
        'unique_value': `💎 *Unique Value Proposition:*
Explain what makes your business unique (50-150 words).

What makes you different from competitors?
Why should customers choose you?
What special value do you provide?

Describe your unique advantages:`,
        'competitors': '🏆 *Key Competitors:* (Optional)\nIf you know your main competitors, please list them here.\nIf not, type *skip*:',
        'marketing': `📢 *Marketing Channels:*
Select your main marketing channels:

1. Social Media (Facebook, Instagram, TikTok)
2. WhatsApp / Messaging Apps
3. Physical Stores / Pop-ups
4. E-commerce / Website
5. Other`,
        'funding': `💰 *Funding Information:*
What type of funding are you seeking?

1. Microloan
2. Term Loan
3. Equity Financing
4. Grant
5. Other`,
        'completion': `🎉 *Congratulations!* 🎉

Your business plan has been successfully submitted!

*Reference Number:* {referenceNumber}

We will review your application and contact you within 5-7 business days.

Thank you for taking the time to complete this comprehensive business plan form.

Have a great day! 🌟`,
        'error': '❌ Sorry, there was an error submitting your form. Please try again later or contact support.',
        'paused': '🛑 Form paused. You can continue anytime by sending any message.',
        'invalid_phone': '❌ Please enter a valid South African phone number (10 digits starting with 0).\nExample: 0712345678',
        'invalid_email': '❌ Please enter a valid email address.\nExample: name@example.com',
        'invalid_dob': '❌ You must be at least 18 years old. Please enter a valid date (YYYY-MM-DD):',
        'invalid_year': '❌ Please enter a valid year between 1900 and {currentYear}:',
        'required_field': '❌ This field is required. Please provide a response:',
        'select_at_least_one': '❌ Please select at least one option.'
      },

      // isiZulu (zu)
      'zu': {
        'welcome': `🌟 *Siyakwamukela kwiFomu yoQoqosho lweBhizinisi* 🌟

Ngizokuholela ngenqubo yokuthumela icebo lakho lebhizinisi. Leli fomu linezigaba ezi-5 futhi lizothatha imizuzu eyi-10-15 ukuqedwa.

*Imiyalo:*
• Thayipha *STOP* ukumisa okwesikhashana
• Thayipha *RESTART* ukuqala kabusha

Ake siqale! Sicela ukhethe ulimi lakho:`,
        
        'language_selection': '🌍 *Sicela ukhethe ulimi lakho:*',
        'full_name': '👤 *Igama Eliphelele:*\nSicela ufake igama lakho eliphelele:',
        'cellphone': '📱 *Inombolo Yocingo:*\nSicela ufake inombolo yakho yocingo (isb., 0712345678):',
        'email': '📧 *Ikheli Le-imeyili:*\nSicela ufake ikheli lakho le-imeyili:',
        'dob': '🎂 *Usuku Lokuzalwa:*\nSicela ufake usuku lokuzalwa (YYYY-MM-DD):',
        'id_number': '🆔 *Inombolo Yesazisi:*\nSicela ufake inombolo yakho yesazisi saseNingizimu Afrika:',
        'business_name': '🏢 *Igama Lebhizinisi:*\nSicela ufake igama lebhizinisi noma iphrojekthi:',
        'business_reg': '📋 *Inombolo Yokubhaliswa Kwebhizinisi:*\nUma ibhalisiwe, faka inombolo yokubhaliswa kwebhizinisi.\nUma ingabhaliswanga, thayipha *N/A*:',
        'business_type': '*Uhlobo Lwebhizinisi:*\nSicela ukhethe uhlobo lwebhizinisi:',
        'year_established': '📅 *Unyaka Owasungulwa:*\nSicela ufake unyaka ibhizinisi lasungulwa ngalo (YYYY):',
        'business_stage': '*Isigaba Sebhizinisi:*\nKhetha isigaba samanje sebhizinisi:',
        'ownership': `*Ubunikazi Nobuholi:*
Khetha konke okusebenzayo ebhizinisini lakho:

1. Abesifazane Abanobunikazi Obuningi (80%+)
2. Okuholwa Ngabesifazane
3. Okunye`,
        'employees': '*Inani Labasebenzi:*\nKhetha inani labasebenzi ebhizinisini lakho:',
        'sector': '🏭 *Isigaba Esiyinhloko Sebhizinisi:*\nKhetha isigaba sakho esiyinhloko sebhizinisi:',
        'subsector': '🔍 *Isigaba Esincane:*\nSicela ucacise isigaba sakho esincane:',
        'description': `📝 *Incazelo Yebhizinisi:*
Sicela unikeze incazelo eningiliziwe yebhizinisi lakho (amagama ayi-100-300).

Faka:
- Imikhiqizo/insizakalo oyinikezayo
- Imodeli yakho yebhizinisi
- Imisebenzi eyinhloko nemisebenzi

Thathela isikhathi sakho ukubhala incazelo ephelele:`,
        'target_market': `🎯 *Imakethi Ehlosiwe:*
Sicela uchaze imakethi yakho ehlosiwe (amagama ayi-50-200).

Faka:
- Ulwazi lwedemografi
- Indawo yezwe
- Izidingo zamakhasimende kanye nezinkinga

Chaza amakhasimende akho afiselekayo:`,
        'unique_value': `💎 *Isiphakamiso Senani Esiyingqayizivele:*
Chaza okwenza ibhizinisi lakho liyingqayizivele (amagama ayi-50-150).

Yini ekwenze umehluko kubaqhudi bakho?
Kungani amakhasimende kufanele akukhethe?
Iluphi udaba olukhethekile olulinikezayo?

Chaza izinzuzo zakho ezingaqhelekile:`,
        'competitors': '🏆 *Abaqhudi Abayinhloko:* (Okungaphoqiwe)\nUma wazi abaqhudi bakho abayinhloko, sicela ubabhale lapha.\nUma ungenabo, thayipha *skip*:',
        'marketing': `📢 *Amashaneli Ezokumaketha:*
Khetha amashaneli akho ayinhloko ezokumaketha:

1. Imidiya Yezokuxhumana (Facebook, Instagram, TikTok)
2. Izinhlelo zokuxhumana zocingo / Izinhlelo zokuthumela imiyalezo
3. Izitolo Zomzimba / Ama-pop-up
4. I-E-commerce / Iwebhusayithi
5. Okunye`,
        'funding': `💰 *Ulwazi Lgezimali:*
Wulolo luphi uhlobo lwezimali olufunayo?

1. Imalimboleko emincane
2. Imalimboleko yesikhathi esithile
3. Ukuxhaswa ngezimali nge-equity
4. Isibonelelo
5. Okunye`,
        'completion': `🎉 *Siyakuhalalisela!* 🎉

Icebo lakho lebhizinisi lithunyelwe ngempumelelo!

*Inombolo Yesiqinisekiso:* {referenceNumber}

Sizobuyekeza isicelo sakho futhi sizoxhumana nawe phakathi namahora amabili amasonto.

Siyabonga ngokuthatha isikhathi sakho ukugcwalisa leli fomu elingokopelo lecebo lebhizinisi.

Ube nosuku oluhle! 🌟`,
        'error': '❌ Uxolo, kube nephutha ekuthumeleni ifomu lakho. Sicela uzame futhi emuva kwesikhathi noma uxhumane nosizo.',
        'paused': '🛑 Ifomu limisiwe. Ungaqhubeka noma yisiphi isikhathi ngokuthumela noma yimuphi umyalezo.',
        'invalid_phone': '❌ Sicela ufake inombolo yocingo evumelekile yaseNingizimu Afrika (amadijithi ayi-10 aqala ngo-0).\nIsibonelo: 0712345678',
        'invalid_email': '❌ Sicela ufake ikheli le-imeyili elivumelekile.\nIsibonelo: igama@isibonelo.com',
        'invalid_dob': '❌ Kufanele ube neminyaka engu-18 nangaphezulu. Sicela ufake usuku oluvumelekile (YYYY-MM-DD):',
        'invalid_year': '❌ Sicela ufake unyaka ovumelekile phakathi kuka-1900 no-{currentYear}:',
        'required_field': '❌ Le nkambu iyadingeka. Sicela unikeze impendulo:',
        'select_at_least_one': '❌ Sicela ukhethe okungenani inketho eyodwa.'
      },

      // isiXhosa (xh)
      'xh': {
        'welcome': `🌟 *Wamkelekile kwiFomu yoQokelelo lweNqaku leShishini* 🌟

Ndiza kukukhokela ngendlela yokuthumela isicwangciso sakho seshishini. Eli fomu lineenxalenye ezi-5 kwaye liza kuthatha imizuzu eyi-10-15 ukuqitywa.

*Iiyalelo:*
• Chwetheza *STOP* ukumisa okwexeshana
• Chwetheza *RESTART* ukuqala kwakhona

Masisiqale! Nceda ukhethe ulwimi lwakho:`,
        
        'language_selection': '🌍 *Nceda ukhethe ulwimi lwakho:*',
        'full_name': '👤 *Igama Elipheleleyo:*\nNceda ufake igama lakho elipheleleyo:',
        'cellphone': '📱 *Inombolo YeSelula:*\nNceda ufake inombolo yakho yeselula (umz., 0712345678):',
        'email': '📧 *Idilesi Ye-imeyili:*\nNceda ufake idilesi yakho ye-imeyili:',
        'dob': '🎂 *Umhla Wokuzalwa:*\nNceda ufake umhla wokuzalwa (YYYY-MM-DD):',
        'id_number': '🆔 *Inombolo Ye-ID:*\nNceda ufake inombolo yakho ye-ID yaseMzantsi Afrika:',
        'business_name': '🏢 *Igama LeShishini:*\nNceda ufake igama leshishini okanye iprojekthi:',
        'business_reg': '📋 *Inombolo Yokubhalisa Ishashini:*\nUkuba ibhalisiwe, faka inombolo yokubhalisa ishishini.\nUkuba ayibhaliswanga, chwetheza *N/A*:',
        'business_type': '*Uhlobo LweShishini:*\nNceda ukhethe uhlobo lweshishini:',
        'year_established': '📅 *Unyaka Owasungulwa:*\nNceda ufake unyaka ishishini lasungulwa ngalo (YYYY):',
        'business_stage': '*Inqanaba LeShishini:*\nKhetha inqanaba langoku leshishini:',
        'ownership': `*Ubunikazi NoBunkokeli:*
Khetha konke okusebenzayo kwishishini lakho:

1. Abafazi Abanobunikazi Obuninzi (80%+)
2. Okukhokelwa Ngabafazi
3. Okunye`,
        'employees': '*Inani Labasebenzi:*\nKhetha inani labasebenzi kwishishini lakho:',
        'sector': '🏭 *Inkalo Eyingqalelo Yeshishini:*\nKhetha inkalo yakho eyingqalelo yeshishini:',
        'subsector': '🔍 *Inkalo Encinci:*\nNceducacisa inkalo yakho encinci:',
        'description': `📝 *Inkcazo YeShishini:*
Nceda unikeze inkcazo enzulu yeshishini lakho (amagama ayi-100-300).

Quka:
- Imveliso/iinkonzo ozinikezayo
- Imodeli yakho yeshishini
- Imisebenzi ephambili nemisebenzi

Thathela ixesha lakho ukubhala inkcazo epheleleyo:`,
        'target_market': `🎯 *Imakethi Ekhangelwe:*
Nceda uchaze imakethi yakho ekhangelwe (amagama ayi-50-200).

Quka:
- Ulwazi lwedemografi
- Indawo yejografi
- Izimfuno zamaxabiso kuneempawu zentloko

Chaza amaxabiso akho afunekayo:`,
        'unique_value': `💎 *Isicwangciso Sexabiso Elingafaniyo:*
Cacisa okwenza ishishini lakho lahluke (amagama ayi-50-150).

Yini eyenza umehluko kubaqhudi bakho?
Kutheni amaxabiso kufuneka akukhethe?
Yeyiphi ixabiso ekhethekileyo olinikezayo?

Cazaimbewu zakho ezingaqhelekanga:`,
        'competitors': '🏆 *Abaqhudi Abaphambili:* (Okungaqinisekisiyo)\nUkuba uyabaqhubi bakho abaphambili, nceda ubabhale apha.\nUkuba awunabo, chwetheza *skip*:',
        'marketing': `📢 *Iindlela Zokuthengisa:*
Khetha iindlela zakho zokuthengisa eziphambili:

1. Imidiya Yezentlalo (Facebook, Instagram, TikTok)
2. I-WhatsApp / Iiapp zokuthumela imiyalezo
3. Iivenkile Zomzimba / Ii-pop-up
4. I-E-commerce / Iwebhusayithi
5. Okunye`,
        'funding': `💰 *Ulwazi Ngezimali:*
Loluphi uhlobo lwezimali olufunayo?

1. Imali engenambala encinane
2. Imali engenambala yesikhathi esithile
3. Ukuxhaswa ngezimali nge-equity
4. Isibonelelo
5. Okunye`,
        'completion': `🎉 *Sivuyisana nawe!* 🎉

Isicwangciso sakho seshishini sithunyelwe ngempumelelo!

*Inombolo Yereferensi:* {referenceNumber}

Siza kujonga isicelo sakho kwaye siza kunxibelelana nawe phakathi kwamahora ama-5-7 asebenza.

Enkosi ngokuthatha ixesha lakho ukugcwalisa eli fomu elipheleleyo lesicwangciso seshishini.

Ube nosuku oluhle! 🌟`,
        'error': '❌ Uxolo, kukho impazamo ekuthumeleni ifomu lakho. Nceda uzame kwakhona emva kwexesha okanye unxibelelane noncedo.',
        'paused': '🛑 Ifomu limisiwe. Ungaqhubeka nanini na ngokuthumela nayiphi na imiyalezo.',
        'invalid_phone': '❌ Nceda ufake inombolo yeselula evumelekileyo yaseMzantsi Afrika (amanani ali-10 aqala nge-0).\nUmzekelo: 0712345678',
        'invalid_email': '❌ Nceda ufake idilesi ye-imeyili evumelekileyo.\nUmzekelo: igama@umzekelo.com',
        'invalid_dob': '❌ Kufuneka ube neminyaka engama-18 nangaphezulu. Nceda ufake umhla ovumelekileyo (YYYY-MM-DD):',
        'invalid_year': '❌ Nceda ufake unyaka ovumelekileyo phakathi kuka-1900 no-{currentYear}:',
        'required_field': '❌ Le nkundla iyafuneka. Nceda unikeze impendulo:',
        'select_at_least_one': '❌ Nceda ukhethe ubuncinane inketho enye.'
      },

      // Afrikaans (af)
      'af': {
        'welcome': `🌟 *Welkom by die Sakeplan-insamelingsvorm* 🌟

Ek sal jou deur die proses lei om jou sakeplan in te dien. Hierdie vorm het 5 afdelings en sal ongeveer 10-15 minute neem om te voltooi.

*Opdragte:*
• Tik *STOP* om te pauzeer
• Tik *RESTART* om oor te begin

Laat ons begin! Kies asseblief jou taal:`,
        
        'language_selection': '🌍 *Kies asseblief jou taal:*',
        'full_name': '👤 *Volle Naam:*\nVoer asseblief jou volle naam in:',
        'cellphone': '📱 *Selfoonnommer:*\nVoer asseblief jou selfoonnommer in (bv., 0712345678):',
        'email': '📧 *E-posadres:*\nVoer asseblief jou e-posadres in:',
        'dob': '🎂 *Geboortedatum:*\nVoer asseblief jou geboortedatum in (JJJJ-MM-DD):',
        'id_number': '🆔 *ID-nommer:*\nVoer asseblief jou Suid-Afrikaanse ID-nommer in:',
        'business_name': '🏢 *Sakenaam:*\nVoer asseblief jou sakenaam of projeknaam in:',
        'business_reg': '📋 *Sakeregistrasienommer:*\nIndien geregistreer, voer jou sakeregistrasienommer in.\nIndien nie geregistreer nie, tik *N/A*:',
        'business_type': '*Saketipe:*\nKies asseblief jou saketipe:',
        'year_established': '📅 *Jaar Gestig:*\nVoer asseblief die jaar in wat jou besigheid gestig is (JJJJ):',
        'business_stage': '*Sakestadium:*\nKies die huidige stadium van jou besigheid:',
        'ownership': `*Eienaarskap & Leierskap:*
Kies alles wat op jou besigheid van toepassing is:

1. Vroue-meerderheidseienaarskap (80%+)
2. Vroue-gelei
3. Ander`,
        'employees': '*Aantal Werknemers:*\nKies die aantal werknemers in jou besigheid:',
        'sector': '🏭 *Primêre Sektor:*\nKies jou primêre besigheidsektor:',
        'subsector': '🔍 *Subsektor:*\nSpesifiseer asseblief jou subsektor:',
        'description': `📝 *Beskrywing van Besigheid:*
Verskaf asseblief 'n gedetailleerde beskrywing van jou besigheid (100-300 woorde).

Sluit in:
- Watter produkte/dienste jy aanbied
- Jou besigheidsmodel
- Sleutelaktiwiteite en bedrywighede

Neem jou tyd om 'n omvattende beskrywing te skryf:`,
        'target_market': `🎯 *Teikenmark:*
Beskryf asseblief jou teikenmark (50-200 woorde).

Sluit in:
- Demografiese inligting
- Geografiese ligging
- Kliëntbehoeftes en pynpunte

Beskryf jou ideale kliënte:`,
        'unique_value': `💎 *Unieke Waarde-proposisie:*
Verduidelik wat jou besigheid uniek maak (50-150 woorde).

Wat maak jou anders as mededingers?
Hoekom moet kliënte jou kies?
Watter spesiale waarde bied jy?

Beskryf jou unieke voordele:`,
        'competitors': '🏆 *Sleutelmededingers:* (Opsioneel)\nAs jy jou hoofmededingers ken, lys hulle asseblief hier.\nIndien nie, tik *skip*:',
        'marketing': `📢 *Bemarkingskanale:*
Kies jou hoof bemarkingskanale:

1. Sosiale Media (Facebook, Instagram, TikTok)
2. WhatsApp / Boodskap-apps
3. Fisiese Winkels / Pop-ups
4. E-handel / Webwerf
5. Ander`,
        'funding': `💰 *Finansieringsinligting:*
Watter tipe finansiering soek jy?

1. Mikrolening
2. Termynlening
3. Aandelefinansiering
4. Toekenning
5. Ander`,
        'completion': `🎉 *Baie geluk!* 🎉

Jou sakeplan is suksesvol ingedien!

*Verwysingsnommer:* {referenceNumber}

Ons sal jou aansoek hersien en binne 5-7 werksdae met jou in verbinding tree.

Dankie dat jy die tyd geneem het om hierdie omvattende sakeplanvorm te voltooi.

Hê 'n goeie dag! 🌟`,
        'error': '❌ Jammer, daar was \'n fout met die indiening van jou vorm. Probeer asseblief later weer of skakel ondersteuning.',
        'paused': '🛑 Vorm gepauseer. Jy kan enige tyd voortgaan deur enige boodskap te stuur.',
        'invalid_phone': '❌ Voer asseblief \'n geldige Suid-Afrikaanse selfoonnommer in (10 syfers wat met 0 begin).\nVoorbeeld: 0712345678',
        'invalid_email': '❌ Voer asseblief \'n geldige e-posadres in.\nVoorbeeld: naam@voorbeeld.com',
        'invalid_dob': '❌ Jy moet ten minste 18 jaar oud wees. Voer asseblief \'n geldige datum in (JJJJ-MM-DD):',
        'invalid_year': '❌ Voer asseblief \'n geldige jaar in tussen 1900 en {currentYear}:',
        'required_field': '❌ Hierdie veld is verpligtend. Verskaf asseblief \'n antwoord:',
        'select_at_least_one': '❌ Kies asseblief ten minste een opsie.'
      },

      // Sesotho sa Leboa (Northern Sotho) (nso)
      'nso': {
        'welcome': `🌟 *Rea amogela go Foramo ya Pokello ya Morero wa Kgwebo* 🌟

Ke tla go otlela ka tshepedišo ya go romela morero wa gago wa kgwebo. Foramo ye e na le dikarolo tše 5 gomme e tla tšea metsotso e ka bago 10-15 go e fetsa.

*Ditaelo:*
• Ngwala *STOP* go emisa nakonyana
• Ngwala *RESTART* go thoma gape

A re thome! Hle kgetha polelo ya gago:`,
        
        'language_selection': '🌍 *Hle kgetha polelo ya gago:*',
        'full_name': '👤 *Leina la Botlalo:*\nHle tsenya leina la gago la botlalo:',
        'cellphone': '📱 *Nomoro ya Selefouna:*\nHle tsenya nomoro ya gago ya selefouna (mohlala, 0712345678):',
        'email': '📧 *Atrese ya Imeile:*\nHle tsenya atrese ya gago ya imeile:',
        'dob': '🎂 *Letšatši la Matsalo:*\nHle tsenya letšatši la matsalo (YYYY-MM-DD):',
        'id_number': '🆔 *Nomoro ya ID:*\nHle tsenya nomoro ya gago ya ID ya Afrika Borwa:',
        'business_name': '🏢 *Leina la Kgwebo:*\nHle tsenya leina la kgwebo goba projeke:',
        'business_reg': '📋 *Nomoro ya Ngwadišo ya Kgwebo:*\nGe e ngwadilwe, tsenya nomoro ya ngwadišo ya kgwebo.\nGe e sa ngwadišwe, ngwala *N/A*:',
        'business_type': '*Mohuta wa Kgwebo:*\nHle kgetha mohuta wa kgwebo:',
        'year_established': '📅 *Ngwaga wo o Theilwego:*\nHle tsenya ngwaga kgwebo yeo e theilwego ka wona (YYYY):',
        'business_stage': '*Boemong bja Kgwebo:*\nKgetha boemong bja bjale bja kgwebo:',
        'ownership': `*Bong le Boetapele:*
Kgetha tšohle tšeo di šomago kgwebong ya gago:

1. Bong bja Basadi ba Bontši (80%+)
2. E e Taogeleditswego ke Basadi
3. Tše dingwe`,
        'employees': '*Palo ya Bašomi:*\nKgetha palo ya bašomi kgwebong ya gago:',
        'sector': '🏭 *Karolo ya Mathomo ya Kgwebo:*\nKgetha karolo ya gago ya mathomo ya kgwebo:',
        'subsector': '🔍 *Karolwana:*\nHle hlaloša karolwana ya gago:',
        'description': `📝 *Tlhalošo ya Kgwebo:*
Hle nea tlhalošo yeo e feletšego ya kgwebo ya gago (mantšu a 100-300).

Akaretša:
- Dihlahlo/direto tšeo o di neago
- Mokgwa wa gago wa kgwebo
- Diriwa tša motheo le mešomo

Tšea nako ya gago go ngwala tlhalošo yeo e feletšego:`,
        'target_market': `🎯 *Mmaraka wo o Lebisitswego:*
Hle hlaloše mmaraka wa gago wo o lebisitswego (mantšu a 50-200).

Akaretša:
- Tshedimošo ya demografi
- Lefelo la jiografi
- Dinyakwa tša bareki le mathata

Hlaloša bareki ba gago ba ba nyakegago:`,
        'unique_value': `💎 *Tlhahlo ya Boleng bo bo Ikgethilego:*
Hlaloša seo se dirago kgwebo ya gago e be ye e ikgethilego (mantšu a 50-150).

Ke eng se o se dirilego go fapana le bašomi?
Ke ka baka la eng bareki ba swanetše go go kgetha?
Ke boleng bofe bja go ikgetha bo o bo neago?

Hlaloša melemo ya gago ya go ikgetha:`,
        'competitors': '🏆 *Bašomi ba Motheo:* (Ka go ikgetha)\nGe o tseba bašomi ba gago ba motheo, hle o ba beake mo.\nGe o sa ba tsebe, ngwala *skip*:',
        'marketing': `📢 *Ditsela tša Papatšo:*
Kgetha ditsela tša gago tša motheo tša papatšo:

1. Media ya Sebjalebjale (Facebook, Instagram, TikTok)
2. WhatsApp / Diapp tša go Romela Melaetša
3. Ditoro tša Mmele / Dipo-pop-up
4. E-kgwebo / Webosaete
5. Tše dingwe`,
        'funding': `💰 *Tshedimošo ya Ditshelete:*
Ke mohuta ofe wa ditshelete o o e batlago?

1. Mokgwatšo wa Ditshelete tše Dinyane
2. Mokgwatšo wa Ditshelete wa Nako
3. Tlhwatšišo ya Ditshelete ka Equity
4. Kabo
5. Tše dingwe`,
        'completion': `🎉 *Re o anega!* 🎉

Morero wa gago wa kgwebo o rometšwe ka katlego!

*Nomoro ya Tshupiso:* {referenceNumber}

Re tla lekodišiša kopo ya gago gomme re tla ikgokaganya le wena ka hare ga matšatši a 5-7 a mošomo.

Re a leboga ka go tšea nako ya gago go tlatša foramo ye e feletšego ya morero wa kgwebo.

Eba le letšatši le lekaone! 🌟`,
        'error': '❌ Khomotšo, go bile le phošo ge go romelwa foramo ya gago. Hle leka gape ka morago ga nako goba ikgokaganye le tshepedišo.',
        'paused': '🛑 Foramo e emisitšwe. O ka tswelela nako le nako ka go romela melaetša ye mebedi.',
        'invalid_phone': '❌ Hle tsenya nomoro ya selefouna ya Afrika Borwa ye e swanelago (manomoro a 10 a thomago ka 0).\nMohlala: 0712345678',
        'invalid_email': '❌ Hle tsenya atrese ya imeile ye e swanelago.\nMohlala: leina@mohlala.com',
        'invalid_dob': '❌ O swanetše go ba le mengwaga ye e ka bago 18 go feta. Hle tsenya letšatši le le swanelago (YYYY-MM-DD):',
        'invalid_year': '❌ Hle tsenya ngwaga wo o swanelago magareng ga 1900 le {currentYear}:',
        'required_field': '❌ Leboto le le a nyakega. Hle nea karabo:',
        'select_at_least_one': '❌ Hle kgetha kgetho e le nngwe goba go feta.'
      },

      // Setswana (tn)
      'tn': {
        'welcome': `🌟 *O amogetswe mo Forameng ya Pokokopanelo ya Morero wa Kgwebo* 🌟

Ke tla go otlhelela ka tsela ya go romela morero wa gago wa kgwebo. Foramo e ena le dikarolo tse 5 mme e tla tsaya metsotso e ka nna 10-15 go e fedisa.

*Ditaelo:*
• Kwala *STOP* go emisa nakonyana
• Kwala *RESTART* go simolola gape

A re simolole! Tsweetswee kgetha puo ya gago:`,
        
        'language_selection': '🌍 *Tsweetswee kgetha puo ya gago:*',
        'full_name': '👤 *Leina la Botlalo:*\nTsweetswee tsenya leina la gago la botlalo:',
        'cellphone': '📱 *Nomoro ya Selefouno:*\nTsweetswee tsenya nomoro ya gago ya selefouno (sekai, 0712345678):',
        'email': '📧 *Aterese ya Imeile:*\nTsweetswee tsenya aterese ya gago ya imeile:',
        'dob': '🎂 *Letsatsi la Tsoalo:*\nTsweetswee tsenya letsatsi la tsoalo (YYYY-MM-DD):',
        'id_number': '🆔 *Nomoro ya ID:*\nTsweetswee tsenya nomoro ya gago ya ID ya Aforika Borwa:',
        'business_name': '🏢 *Leina la Kgwebo:*\nTsweetswee tsenya leina la kgwebo kgotsa porojeke:',
        'business_reg': '📋 *Nomoro ya Ngodiso ya Kgwebo:*\nFa e ngodisitswe, tsenya nomoro ya ngodiso ya kgwebo.\nFa e sa ngodisiwe, kwala *N/A*:',
        'business_type': '*Mofuta wa Kgwebo:*\nTsweetswee kgetha mofuta wa kgwebo:',
        'year_established': '📅 *Ngwaga o o Simolotseng:*\nTsweetswee tsenya ngwaga kgwebo e e simolotseng ka yone (YYYY):',
        'business_stage': '*Legato la Kgwebo:*\nKgetha legato la gompieno la kgwebo:',
        'ownership': `*Bogosi le Boeteledipele:*
Kgetha sotlhe se se dirang mo kgwebong ya gago:

1. Bogosi jwa Basadi ba Bantsi (80%+)
2. E e Laolwang ke Basadi
3. Tse dingwe`,
        'employees': '*Palo ya Badiri:*\nKgetha palo ya badiri mo kgwebong ya gago:',
        'sector': '🏭 *Karolo ya Ntlha ya Kgwebo:*\nKgetha karolo ya gago ya ntlha ya kgwebo:',
        'subsector': '🔍 *Karolwana:*\nTsweetswee tlhalosa karolwana ya gago:',
        'description': `📝 *Tlhaloso ya Kgwebo:*
Tsweetswee naya tlhaloso e e tlhomilweng ya kgwebo ya gago (mafoko a 100-300).

Akaretsa:
- Dithoto/ditirelo tse o di nayang
- Mokgwa wa gago wa kgwebo
- Ditiragatso tsa botlhokwa le ditiro

Tsaya nako ya gago go kwala tlhaloso e e tlhomilweng:`,
        'target_market': `🎯 *Mmaraka o o Lebisitsweng:*
Tsweetswee tlhalosa mmaraka wa gago o o lebisitsweng (mafoko a 50-200).

Akaretsa:
- Tshedimosetso ya demografi
- Lefelo la jografi
- Dikgatlhego tsa bareki le mathata

Tlhalosa bareki ba gago ba ba batlegang:`,
        'unique_value': `💎 *Tlhagiso ya Boleng jo bo Ikgethang:*
Tlhalosa se se dirang kgwebo ya gago e nne ya ikgetha (mafoko a 50-150).

Ke eng se o se dirileng go farologanya le batsayakarolo?
Ke ka ntlha yang bareki ba tshwanetse go go kgetha?
Ke boleng jofe jo bo ikgethang jo o bo nayang?

Tlhalosa melemo ya gago ya go ikgetha:`,
        'competitors': '🏆 *Batsayakarolo ba Botlhokwa:* (Ka go itlhopha)\nFa o itse batsayakarolo ba gago ba botlhokwa, tsweetswee o ba kwale fano.\nFa o sa ba itse, kwala *skip*:',
        'marketing': `📢 *Ditsela tsa Papatso:*
Kgetha ditsela tsa gago tsa botlhokwa tsa papatso:

1. Media ya Sechaba (Facebook, Instagram, TikTok)
2. WhatsApp / Diapp tsa go Romela Melaetsa
3. Ditoro tsa Mmele / Dipo-pop-up
4. E-kgwebo / Websaete
5. Tse dingwe`,
        'funding': `💰 *Tshedimosetso ya Ditshenyegelo:*
Ke mofuta ofe wa ditshenyegelo o o o batlang?

1. Mokgwatso wa Ditshenyegelo tse Dinyane
2. Mokgwatso wa Ditshenyegelo wa Nako
3. Tshegetso ya Ditshenyegelo ka Equity
4. Kabo
5. Tse dingwe`,
        'completion': `🎉 *Re o lonegeleditse!* 🎉

Morero wa gago wa kgwebo o rometswe ka katlego!

*Nomoro ya Tshupiso:* {referenceNumber}

Re tla sekaseka kopo ya gago mme re tla ikgolaganya le wena ka gare ga matsatsi a 5-7 a tiriso.

Re a leboga ka go tsaya nako ya gago go tlatsa foramo e e tlhomilweng ya morero wa kgwebo.

Eba le letsatsi le le monate! 🌟`,
        'error': '❌ Tsweetswee, go ne le phoso fa go romela foramo ya gago. Tsweetswee leka gape morago ga nako kgotsa ikgolaganye le tshegetso.',
        'paused': '🛑 Foramo e emisitswe. O ka tswelela nako le nako ka go romela melaetsa e mebedi.',
        'invalid_phone': '❌ Tsweetswee tsenya nomoro ya selefouno ya Aforika Borwa e e siameng (manomoro a 10 a a simololang ka 0).\nSekai: 0712345678',
        'invalid_email': '❌ Tsweetswee tsenya aterese ya imeile e e siameng.\nSekai: leina@sekai.com',
        'invalid_dob': '❌ O tshwanetse go ba le mengwaga e e ka nna 18 go feta. Tsweetswee tsenya letsatsi le le siameng (YYYY-MM-DD):',
        'invalid_year': '❌ Tsweetswee tsenya ngwaga o o siameng magareng ga 1900 le {currentYear}:',
        'required_field': '❌ Lebokoso le le a tlhokega. Tsweetswee naya karabo:',
        'select_at_least_one': '❌ Tsweetswee kgetha kgetho e le nngwe goba go feta.'
      },

      // Sesotho (st)
      'st': {
        'welcome': `🌟 *O amohetswe Foromong ya Pokello ya Morero oa Khoebo* 🌟

Ke tla u etellela pele ka mokhoa oa ho romella morero oa hau oa khoebo. Foromo ena e na likarolo tse 5 'me e tla nka metsotso e ka bang 10-15 ho e phetha.

*Litaelo:*
• Ngola *STOP* ho emisa nakoana
• Ngola *RESTART* ho qala hape

Ha re qale! Ka kopo khetha puo ea hau:`,
        
        'language_selection': '🌍 *Ka kopo khetha puo ea hau:*',
        'full_name': '👤 *Lebitso la Botlalo:*\nKa kopo kenya lebitso la hau la botlalo:',
        'cellphone': '📱 *Nomoro ea Selefouno:*\nKa kopo kenya nomoro ea hau ea selefouno (mohlala, 0712345678):',
        'email': '📧 *Aterese ea Imeile:*\nKa kopo kenya aterese ea hau ea imeile:',
        'dob': '🎂 *Letsatsi la Tsoalo:*\nKa kopo kenya letsatsi la tsoalo (YYYY-MM-DD):',
        'id_number': '🆔 *Nomoro ea ID:*\nKa kopo kenya nomoro ea hau ea ID ea Afrika Boroa:',
        'business_name': '🏢 *Lebitso la Khoebo:*\nKa kopo kenya lebitso la khoebo kapa projeke:',
        'business_reg': '📋 *Nomoro ea Ngoliso ea Khoebo:*\nHa e ngolisitsoe, kenya nomoro ea ngoliso ea khoebo.\nHa e sa ngolisoe, ngola *N/A*:',
        'business_type': '*Mofuta oa Khoebo:*\nKa kopo khetha mofuta oa khoebo:',
        'year_established': '📅 *Selemo seo e Thehoetseng:*\nKa kopo kenya selemo khoebo e thehoetseng ka sona (YYYY):',
        'business_stage': '*Boemo ba Khoebo:*\nKhetha boemo ba hajoale ba khoebo:',
        'ownership': `*Bong le Boetapele:*
Khetha tsohle tseo li sebeletsang khoebong ea hau:

1. Bong ba Basadi ba Bongata (80%+)
2. E laoloa ke Basadi
3. Tse ling`,
        'employees': '*Palo ea Basebetsi:*\nKhetha palo ea basebetsi khoebong ea hau:',
        'sector': '🏭 *Karolo ea Mantlha ea Khoebo:*\nKhetha karolo ea hau ea mantlha ea khoebo:',
        'subsector': '🔍 *Karolwana:*\nKa kopo hlalosa karolwana ea hau:',
        'description': `📝 *Tlhaloso ea Khoebo:*
Ka kopo fana ka tlhaloso e botebo ea khoebo ea hau (mantsoe a 100-300).

Kenyeletsa:
- Lihlahisoa/litšebeletso tseo u li fang
- Mofuta oa hau oa khoebo
- Liketsahalo tsa bohlokoa le mesebetsi

Nka nako ea hau ho ngola tlhaloso e feletseng:`,
        'target_market': `🎯 *Mmaraka o Lebisitsoeng:*
Ka kopo hlalosa mmaraka oa hau o lebisitsoeng (mantsoe a 50-200).

Kenyeletsa:
- Lintlha tsa demografi
- Boemo ba lefats'e
- Litlhoko tsa bareki le mathata

Hlalosa bareki ba hau ba ba ratang:`,
        'unique_value': `💎 *Tlhahiso ea Boleng bo Ikgethang:*
Hlalosa se etsang khoebo ea hau e be ea ikhetha (mantsoe a 50-150).

Ke eng se u se entseng ho fapana le batsamai?
Ke hobaneng bareki ba lokela ho u khetha?
Ke boleng bo fe bo ikhethang bo u bo fang?

Hlalosa melemo ea hau ea ho ikhetha:`,
        'competitors': '🏆 *Batsamai ba Bohlokoa:* (Ka ho ikhethela)\nHa u tseba batsamai ba hau ba bohlokoa, ka kopo u ba ngole mona.\nHa u sa ba tsebe, ngola *skip*:',
        'marketing': `📢 *Litsela tsa Papatso:*
Khetha litsela tsa hau tsa bohlokoa tsa papatso:

1. Media ea Sechaba (Facebook, Instagram, TikTok)
2. WhatsApp / Liapp tsa ho Romella Melaetsa
3. Libaka tsa 'Mele / Lipop-up
4. E-khoebo / Webosaete
5. Tse ling`,
        'funding': `💰 *Lintlha tsa Chelete:*
Ke mofuta ofe oa chelete o u o batlang?

1. Mokgabelo oa Chelete e Nyane
2. Mokgabelo oa Chelete oa Nako
3. Tšehetso ea Chelete ka Equity
4. Kabo
5. Tse ling`,
        'completion': `🎉 *Re u halaletsa!* 🎉

Morero oa hau oa khoebo o rometsoe ka katleho!

*Nomoro ea Tšupiso:* {referenceNumber}

Re tla sheba kopo ea hau 'me re tla ikopanya le uena ka har'a matsatsi a 5-7 a mosebetsi.

Rea leboha ka ho nka nako ea hau ho tlatsa foromo ena e feletseng ea morero oa khoebo.

Eba le letsatsi le le molemo! 🌟`,
        'error': '❌ Tsoarelo, ho bile le phoso ha ho romelloa foromo ea hau. Ka kopo leka hape kamora nako kapa ikopanye le tšehetso.',
        'paused': '🛑 Foromo e emisitsoe. U ka tsoela pele nako le nako ka ho romella melaetsa e meli.',
        'invalid_phone': '❌ Ka kopo kenya nomoro ea selefouno ea Afrika Boroa e nepahetseng (manomoro a 10 a qalang ka 0).\nMohlala: 0712345678',
        'invalid_email': '❌ Ka kopo kenya aterese ea imeile e nepahetseng.\nMohlala: lebitso@mohlala.com',
        'invalid_dob': '❌ U lokela ho ba le lilemo tse ka bang 18 ho feta. Ka kopo kenya letsatsi le nepahetseng (YYYY-MM-DD):',
        'invalid_year': '❌ Ka kopo kenya selemo se nepahetseng pakeng tsa 1900 le {currentYear}:',
        'required_field': '❌ Lebokose lena le a hlokahala. Ka kopo fana ka karabo:',
        'select_at_least_one': '❌ Ka kopo khetha khetho e le ngoe kapa ho feta.'
      },

      // Xitsonga (ts)
      'ts': {
        'welcome': `🌟 *U amukeriwe eFomeni yo Hlengeletiwa ka Ndhlela ya Bindu* 🌟

Ndzi ta ku yisa emahlweni hi ndlela yo rhumela ndhlela ya wena ya bindu. Fomo leyi yi na swivandla swa 5 naswona yi ta teka mitsotso yo ringana 10-15 ku yi hetisa.

*Swiyalezo:*
• Tsala *STOP* ku yima nkarhi wo karhi
• Tsala *RESTART* ku sungula nakambe

A hi sungule! Ndzi kombela u hlawule ririmi ra wena:`,
        
        'language_selection': '🌍 *Ndzi kombela u hlawule ririmi ra wena:*',
        'full_name': '👤 *Vito ro Hetelela:*\nNdzi kombela u nghenisa vito ra wena ro hetelela:',
        'cellphone': '📱 *Nomboro ya Selula:*\nNdzi kombela u nghenisa nomboro ya wena ya selula (xik., 0712345678):',
        'email': '📧 *Adirese ya Imeyili:*\nNdzi kombela u nghenisa adirese ya wena ya imeyili:',
        'dob': '🎂 *Siku ra Ntumbuluko:*\nNdzi kombela u nghenisa siku ra ntumbuluko (YYYY-MM-DD):',
        'id_number': '🆔 *Nomboro ya ID:*\nNdzi kombela u nghenisa nomboro ya wena ya ID ya Afrika-Dzonga:',
        'business_name': '🏢 *Vito ra Bindu:*\nNdzi kombela u nghenisa vito ra bindu kumbe porojeke:',
        'business_reg': '📋 *Nomboro ya Ndzavisiso wa Bindu:*\nLoko yi tsarisiwile, nghenisa nomboro ya ndzavisiso wa bindu.\nLoko a yi tsarisiwi, tsala *N/A*:',
        'business_type': '*Ndzhawu ya Bindu:*\nNdzi kombela u hlawule ndzhawu ya bindu:',
        'year_established': '📅 *Lembe ro Sunguriwa:*\nNdzi kombela u nghenisa lembe bindu ro sunguriwa hi rona (YYYY):',
        'business_stage': '*Xiyimo xa Bindu:*\nHlawula xiyimo xa sweswi xa bindu:',
        'ownership': `*Vutomi na Vufambisi:*
Hlawula hinkwaswo leswi swi tirhaka ebindwini ra wena:

1. Vutomi bya Vavasati bya Ntwanano (80%+)
2. Leisiwile hi Vavasati
3. Swin'wana`,
        'employees': '*Nomboro ya Vatirhi:*\nHlawula nomboro ya vatirhi ebindwini ra wena:',
        'sector': '🏭 *Xandla xa Nkoka xa Bindu:*\nHlawula xandla xa wena xa nkoka xa bindu:',
        'subsector': '🔍 *Xandlana:*\nNdzi kombela u hlamusela xandlana xa wena:',
        'description': `📝 *Nhlalutelo ya Bindu:*
Ndzi kombela u nyika nhlalutelo wo antswa wa bindu ra wena (marito ya 100-300).

Akanya:
- Swiperiwa/swirhundzulo leswi u swi nyikaka
- Maendlelo ya wena ya bindu
- Mintlangu ya nkoka na mintirho

Teka nkarhi wa wena ku tsala nhlalutelo wo hetiseka:`,
        'target_market': `🎯 *Makete wo Lahiwa:*
Ndzi kombela u hlamusela makete wa wena wo lahiwa (marito ya 50-200).

Akanya:
- Vutivi bya demografi
- Vundzeni bya matiko
- Swilaveko swa vatirisi na swipfumelo

Hlamusela vatirisi va wena va swi lavaka:`,
        'unique_value': `💎 *Nkambisiso wa Nkoka wo Hlawuleka:*
Hlamusela leswi swi endlaka bindu ra wena ri hlawuleka (marito ya 50-150).

Yini leyi u yi endlaka ku hambana na valandi?
Hikokwalaho yini vatirisi va fanele va ku hlawula?
I nkoka wihi wo hlawuleka lowu u wu nyikaka?

Hlamusela swihlawulekisi swa wena swa ku hlawuleka:`,
        'competitors': '🏆 *Valandi va Nkoka:* (Hi ku hlawula)\nLoko u tiva valandi va wena va nkoka, ndzi kombela u va tsalela laha.\nLoko u nga va tivi, tsala *skip*:',
        'marketing': `📢 *Tindlela ta Nhlangano:*
Hlawula tindlela ta wena ta nkoka ta nhlangano:

1. Media ya Mintlangu (Facebook, Instagram, TikTok)
2. WhatsApp / Tiapp ta ku Rhumela Milayizana
3. Tivengele ta Miri / Tipop-up
4. E-bindu / Webusayiti
5. Swin'wana`,
        'funding': `💰 *Vutivi bya Mali:*
I ndhawu yihi ya mali leyi u yi lavaka?

1. Xikweleti xa Mali leyi Ntsongo
2. Xikweleti xa Mali xa Nkarhi
3. Nseketelo wa Mali hi Equity
4. Nyiko
5. Swin'wana`,
        'completion': `🎉 *Hi ku hahlelela!* 🎉

Ndhlela ya wena ya bindu yi rhumeriwe hi ndlela yo antswa!

*Nomboro ya Xikombiso:* {referenceNumber}

Hi ta ringetela xikombelo xa wena naswona hi ta hlanganisa na wena exikarhi ka masiku ya 5-7 ya ntirho.

Hi khensa nkarhi lowu u wu tekeke ku hetisa fomo leyi yo hetelela ya ndhlela ya bindu.

Va ni siku ro hisa! 🌟`,
        'error': '❌ Ku rivaleri, a ku ri na xihoxo loko ku rhumeriwa fomo ra wena. Ndzi kombela u ringeta nakambe endzhaku ka nkarhi kumbe u hlanganisa na nseketelo.',
        'paused': '🛑 Fomo yi yimisiwile. U nga ya emahlweni nkarhi wunwana na wunwana hi ku rhumela milayizana yo karhi.',
        'invalid_phone': '❌ Ndzi kombela u nghenisa nomboro ya selula yo lulamile ya Afrika-Dzonga (tinomboro ta 10 leti sungulaka hi 0).\nXikombiso: 0712345678',
        'invalid_email': '❌ Ndzi kombela u nghenisa adirese ya imeyili yo lulamile.\nXikombiso: vito@xikombiso.com',
        'invalid_dob': '❌ U fanele u va u ni malembe yo ringana 18 ku hundza. Ndzi kombela u nghenisa siku ro lulamile (YYYY-MM-DD):',
        'invalid_year': '❌ Ndzi kombela u nghenisa lembe ro lulamile exikarhi ka 1900 na {currentYear}:',
        'required_field': '❌ Xivandla lexi xi lava ku tirhisiwa. Ndzi kombela u nyika nhlamuselo:',
        'select_at_least_one': '❌ Ndzi kombela u hlawula nkatsakanyo wo ringana unwe kumbe ku hundza.'
      },

      // siSwati (ss)
      'ss': {
        'welcome': `🌟 *Wemukelekile kuFomu yekuQoqwa kweNhlangotsi yeBhizinisi* 🌟

Ngitakukhombisa indlela yekuthumela inhlangotsi yakho yebhizinisi. Lelifomu lineSigaba 5 futsi litatfola emaminitsi langu-10-15 kuphela.

*Tintfo letitayiselwe:*
• Tayiphela *STOP* kumisa kancane
• Tayiphela *RESTART* kucala kabusha

Asicale! Sicela ukhetse lulwimi lwakho:`,
        
        'language_selection': '🌍 *Sicela ukhetse lulwimi lwakho:*',
        'full_name': '👤 *Libito leliphelele:*\nSicela ufake libito lakho leliphelele:',
        'cellphone': '📱 *Inombolo yelucingo:*\nSicela ufake inombolo yakho yelucingo (sib., 0712345678):',
        'email': '📧 *Ikheli le-imeyili:*\nSicela ufake ikheli lakho le-imeyili:',
        'dob': '🎂 *Lilanga lelkutalwa:*\nSicela ufake lilanga lelkutalwa (YYYY-MM-DD):',
        'id_number': '🆔 *Inombolo ye-ID:*\nSicela ufake inombolo yakho ye-ID yaseNingizimu Afrika:',
        'business_name': '🏢 *Libito lebhizinisi:*\nSicela ufake libito lebhizinisi noma iphrojekhi:',
        'business_reg': '📋 *Inombolo yekubhaliswa kwebhizinisi:*\nUma ibhalisiwe, fake inombolo yekubhaliswa kwebhizinisi.\nUma ingabhaliswanga, tayiphela *N/A*:',
        'business_type': '*Luhlobo lwebhizinisi:*\nSicela ukhetse luhlobo lwebhizinisi:',
        'year_established': '📅 *Umnyaka lowasungulwa:*\nSicela ufake umnyaka ibhizinisi lasungulwa ngalo (YYYY):',
        'business_stage': '*Sigaba sebhizinisi:*\nKhetsa sigaba samanje sebhizinisi:',
        'ownership': `*Bunikazi nekubusa:*
Khetsa konkhe lokusebentako ebhizinisini lakho:

1. Basikati labanebunikazi lobuningi (80%+)
2. Lokubuswa ngabasikati
3. Lokunye`,
        'employees': '*Linani labasebenti:*\nKhetsa linani labasebenti ebhizinisini lakho:',
        'sector': '🏭 *Sigaba seliciniso sebhizinisi:*\nKhetsa sigaba sakho seliciniso sebhizinisi:',
        'subsector': '🔍 *Sigatsana:*\nSicela ucacise sigatsana sakho:',
        'description': `📝 *Incazelo yebhizinisi:*
Sicela unikeze incazelo lecinile yebhizinisi lakho (emagama langu-100-300).

Faka:
- Imikhicito/insita loluyiniketa
- Indlela yakho yebhizinisi
- Imisebenti lebalulekile nemisebenti

Tsatfela sikhatsi sakho kubhala incazelo lecinile:`,
        'target_market': `🎯 *Imakethe lehlosiwe:*
Sicela uchaze imakethe yakho lehlosiwe (emagama langu-50-200).

Faka:
- Lwati lwebantfu
- Indzawo yelive
- Tidzingo temakhasimende netinkinga

Chaza emakhasimende akho lafiselekako:`,
        'unique_value': `💎 *Insimu yeluhlangotsi leluhlukile:*
Chaza lokwenta ibhizinisi lakho libe ngalokuhlukile (emagama langu-50-150).

Yini leyenta umehluko kubacindzeteli bakho?
Kungani emakhasimende kufanele akukhetse?
Iyiphi insita lehlukile loluyiniketa?

Chaza tinzuzo takho letihlukile:`,
        'competitors': '🏆 *Bacindzeteli lababalulekile:* (Ngalokukhetsekile)\nUma wati bacindzeteli bakho lababalulekile, sicela ubabhale lapha.\nUma ungenabo, tayiphela *skip*:',
        'marketing': `📢 *Tindlela tekumaketha:*
Khetsa tindlela takho letibalulekile tekumaketha:

1. Imidiya yetekuchumana (Facebook, Instagram, TikTok)
2. WhatsApp / Tinhlelo tekuthumela imiyalezo
3. Titalo temtimba / Emapop-up
4. I-E-commerce / Iwebhusayithi
5. Lokunye`,
        'funding': `💰 *Lwati lwemali:*
Luliphi luhlobo lwemali lolulufunako?

1. Imalimboleko lelincane
2. Imalimboleko yesikhatsi lesitsite
3. Kusekelwa ngemali nge-equity
4. Sipho
5. Lokunye`,
        'completion': `🎉 *Sikubongela!* 🎉

Inhlangotsi yakho yebhizinisi itfunyelwe ngemphumelelo!

*Inombolo yekusetjentiswa:* {referenceNumber}

Sitakabuyeketa sicelo sakho futsi sitakakhuluma nawe ngaphakathi kwemalanga langu-5-7 emsebenti.

Siyabonga ngemtsetfo wakho wekugcwalisa lelifomu lelicinile lenhlangotsi yebhizinisi.

Ube nelilanga leliphilile! 🌟`,
        'error': '❌ Bebana, kwaba neliphutha ekuthumeni kwelifomu lakho. Sicela uzame futsi emuva kwesikhatsi noma ukhulume nenselelo.',
        'paused': '🛑 Ifomu limisiwe. Ungaqhubeka noma yisiphi isikhathi ngokuthumela noma yimuphi umlayeto.',
        'invalid_phone': '❌ Sicela ufake inombolo yelucingo levumelekile yaseNingizimu Afrika (tidijithi lettisitfupha letticala nge-0).\nSibonelo: 0712345678',
        'invalid_email': '❌ Sicela ufake ikheli le-imeyili levumelekile.\nSibonelo: libito@sibonelo.com',
        'invalid_dob': '❌ Kufanele ube neminyaka lengu-18 nangetulu. Sicela ufake lilanga levumelekile (YYYY-MM-DD):',
        'invalid_year': '❌ Sicela ufake umnyaka lovumelekile phakathi kwa-1900 na-{currentYear}:',
        'required_field': '❌ Leligatja lidzingeka. Sicela unikeze impendvulo:',
        'select_at_least_one': '❌ Sicela ukhetse okungenani inketho eyodwa.'
      },

      // Tshivenda (ve)
      've': {
        'welcome': `🌟 *No amba kha Foromo ya U Kuvhanganya Maano a Bindu* 🌟

Ndi do u ranga nḓila ya u ruma maano anu a bindu. Foromo iyi i na zwikhethwa zwa 5 nahone i do tshika minithi i no vha 10-15 u i endedza.

*Milayo:*
• Nwala *STOP* u imisa tshifhinganyana
• Nwala *RESTART* u thoma hafhu

A ri thome! Ndi humbela u khetha luambo lwanu:`,
        
        'language_selection': '🌍 *Ndi humbela u khetha luambo lwanu:*',
        'full_name': '👤 *Dzina loṱhe:*\nNdi humbela u nanga dzina lanu loṱhe:',
        'cellphone': '📱 *Nomoro ya Tshifhone:*\nNdi humbela u nanga nomoro yanu ya tshifhone (tsumbo, 0712345678):',
        'email': '📧 *Ḓiresi ya Imeyili:*\nNdi humbela u nanga ḓiresi yanu ya imeyili:',
        'dob': '🎂 *Duvha la u bebwa:*\nNdi humbela u nanga duvha la u bebwa (YYYY-MM-DD):',
        'id_number': '🆔 *Nomoro ya ID:*\nNdi humbela u nanga nomoro yanu ya ID ya Afurika Tshipembe:',
        'business_name': '🏢 *Dzina la Bindu:*\nNdi humbela u nanga dzina la bindu kana phurojeke:',
        'business_reg': '📋 *Nomoro ya U Ngodiswa ha Bindu:*\nArali yo ngodiswa, nanga nomoro ya u ngodiswa ha bindu.\nArali a yo ngodiswa, nwala *N/A*:',
        'business_type': '*Muvhigo wa Bindu:*\nNdi humbela u khetha muvhigo wa bindu:',
        'year_established': '📅 *Ngwaha wo Thomiwaho:*\nNdi humbela u nanga ngwaha bindu lo thomiwaho nga lwo (YYYY):',
        'business_stage': '*Mugingo wa Bindu:*\nKhetha mugingo wa zwino wa bindu:',
        'ownership': `*Vhutshilo na Vhuṭanzi:*
Khetha zwoṱhe zwi shumisaho binduni lanu:

1. Vhutshilo ha Vhafumakadzi vha Vhunzhi (80%+)
2. Zwo Rangelwaho nga Vhafumakadzi
3. Zwinwe`,
        'employees': '*Vhupo ha Vhashumi:*\nKhetha vhupo ha vhashumi binduni lanu:',
        'sector': '🏭 *Tshipida tsha U thoma ha Bindu:*\nKhetha tshipida tshanu tsha u thoma ha bindu:',
        'subsector': '🔍 *Tshipidana:*\nNdi humbela u ṱalutshedza tshipidana tshanu:',
        'description': `📝 *Ṱalutshedzo ya Bindu:*
Ndi humbela u pea ṱalutshedzo yo tevhekanyo ya bindu lanu (maipfi a 100-300).

Shumisa:
- Zwibveledzwa/nyikedzo dza u pea
- Muvhigo wanu wa bindu
- Mishumo ya ndeme na mishumo

Shumisa tshifhinga tshanu u nwala ṱalutshedzo yo tevhekanyo:`,
        'target_market': `🎯 *Maraka o Lavhelelwaho:*
Ndi humbela u ṱalutshedza maraka anu o lavhelelwaho (maipfi a 50-200).

Shumisa:
- Mafhungo a demografi
- Vhupo ha shango
- Zwiḓingwa zwa vharengi na zwiṭaluli

Ṱalutshedza vharengi vhanu vho fiselelwaho:`,
        'unique_value': `💎 *Phurofishenale ya Ndiṱanganelo yo Khethekanyo:*
Ṱalutshedza zwiitisa bindu lanu u vha na u khethekanya (maipfi a 50-150).

Ndi mini zwiitisa u fhambana na vhane vha shuma na inwi?
Ndi ngani vharengi vha tea u u khetha?
Ndi ndiṱanganelo ifhio yo khethekanyo ine na i pea?

Ṱalutshedza mbuelo dzanu dza u khethekanya:`,
        'competitors': '🏆 *Vhane vha Shuma na Inwi vha Ndeme:* (Nga u ita khetho)\nArali vha ḓivha vhane vha shuma na inwi vha ndeme, ndi humbela u vha nwala afha.\nArali a vha vha ḓivhi, nwala *skip*:',
        'marketing': `📢 *Nzila dza U Tikedza:*
Khetha nzila dzanu dza ndeme dza u tikedza:

1. Midiya ya Mvelele (Facebook, Instagram, TikTok)
2. WhatsApp / Thaidzo dza U Ruma Milaedza
3. Zwitoro zwa Muvhili / Ma-pop-up
4. E-bindu | Webusayithi
5. Zwinwe`,
        'funding': `💰 *Mafhungo a Tshelede:*
Ndi muvhigo ufhi wa tshelede une vha u ṱoda?

1. Mugodelo wa Tshelede iṱuku
2. Mugodelo wa Tshelede wa Tshifhinga
3. U Thuswa ha Tshelede nga Equity
4. Nyeletshedzo
5. Zwinwe`,
        'completion': `🎉 *Ri u tendelisa!* 🎉

Maano anu a bindu o rumwa nga u bveledzea!

*Nomoro ya Sumbo:* {referenceNumber}

Ri do sedzulusa khumbelo yanu nahone ri do vhudzana na inwi vhukati ha matshili a 5-7 a mushumo.

Ri a livhuwa nga u shumisa tshifhinga tshanu u endedza foromo iyi yo tevhekanyo ya maano a bindu.

Vha na duvha line vha tambudze! 🌟`,
        'error': '❌ Khathihi, ho vha na phoso musi ho rumwa foromo yanu. Ndi humbela u linga hafhu nga murahu ha tshifhinga kana u vhudzana na thuso.',
        'paused': '🛑 Foromo yo imiswa. Vha nga ya phanḓa nge tshifhinga tshithihi nga u rumela milaedza i no fhiraho.',
        'invalid_phone': '❌ Ndi humbela u nanga nomoro ya tshifhone yo tendelwaho ya Afurika Tshipembe (dijithi dza fumi dzo thomaho nga 0).\nTsumbo: 0712345678',
        'invalid_email': '❌ Ndi humbela u nanga ḓiresi ya imeyili yo tendelwaho.\nTsumbo: dzina@tsumbo.com',
        'invalid_dob': '❌ Vha tea u vha na miṅwaha i no fhira 18. Ndi humbela u nanga duvha lo tendelwaho (YYYY-MM-DD):',
        'invalid_year': '❌ Ndi humbela u nanga ngwaha wo tendelwaho vhukati ha 1900 na {currentYear}:',
        'required_field': '❌ Tshipida itshi tshi tea u shumiswa. Ndi humbela u pea phindulo:',
        'select_at_least_one': '❌ Ndi humbela u khetha khetho i no fhiraho iṅwe.'
      },

      // isiNdebele (nr)
      'nr': {
        'welcome': `🌟 *Uyamukelekwa kwiFomu yokuQoqwa koCwangco weBhizinisi* 🌟

Ngizokuholela ngenkambo yokuthumela ucwangco lwakho lwebhizinisi. Leli fomu linezigaba ezi-5 futhi lizothatha imizuzu eyi-10-15 ukuqedwa.

*Iiyalelo:*
• Thayipha *STOP* ukumisa okwesikhashana
• Thayipha *RESTART* ukuqala kabusha

Asiqale! Sicela ukhethe ulimi lwakho:`,
        
        'language_selection': '🌍 *Sicela ukhethe ulimi lwakho:*',
        'full_name': '👤 *Igama Eleyonke:*\nSicela ufake igama lakho eliyonke:',
        'cellphone': '📱 *Inombolo Yocingo:*\nSicela ufake inombolo yakho yocingo (isb., 0712345678):',
        'email': '📧 *Ikheli Le-imeyili:*\nSicela ufake ikheli lakho le-imeyili:',
        'dob': '🎂 *Usuku Lokuzalwa:*\nSicela ufake usuku lokuzalwa (YYYY-MM-DD):',
        'id_number': '🆔 *Inombolo Yesazisi:*\nSicela ufake inombolo yakho yesazisi saseNingizimu Afrika:',
        'business_name': '🏢 *Igama Lebhizinisi:*\nSicela ufake igama lebhizinisi noma iphrojekthi:',
        'business_reg': '📋 *Inombolo Yokubhaliswa Kwebhizinisi:*\nUma ibhalisiwe, faka inombolo yokubhaliswa kwebhizinisi.\nUma ingabhaliswanga, thayipha *N/A*:',
        'business_type': '*Uhlobo Lwebhizinisi:*\nSicela ukhethe uhlobo lwebhizinisi:',
        'year_established': '📅 *Unyaka Owasungulwa:*\nSicela ufake unyaka ibhizinisi lasungulwa ngalo (YYYY):',
        'business_stage': '*Isigaba Sebhizinisi:*\nKhetha isigaba samanje sebhizinisi:',
        'ownership': `*Ubunikazi Nobuholi:*
Khetha konke okusebenzayo ebhizinisini lakho:

1. Abesifazane Abanobunikazi Obuningi (80%+)
2. Okuholwa Ngabesifazane
3. Okunye`,
        'employees': '*Inani Labasebenzi:*\nKhetha inani labasebenzi ebhizinisini lakho:',
        'sector': '🏭 *Isigaba Esiyinhloko Sebhizinisi:*\nKhetha isigaba sakho esiyinhloko sebhizinisi:',
        'subsector': '🔍 *Isigaba Esincane:*\nSicela ucacise isigaba sakho esincane:',
        'description': `📝 *Incazelo Yebhizinisi:*
Sicela unikeze incazelo enzulu yebhizinisi lakho (amagama ayi-100-300).

Faka:
- Imikhiqizo/izinsiza ozinikezayo
- Imodeli yakho yebhizinisi
- Imisebenzi ebalulekile nemisebenzi

Thathela isikhathi sakho ukubhala incazelo enzulu:`,
        'target_market': `🎯 *Imakethi Ehlosiwe:*
Sicela uchaze imakethi yakho ehlosiwe (amagama ayi-50-200).

Faka:
- Ulwazi lwedemografi
- Indawo yezwe
- Izidingo zamakhasimende kanye nezinkinga

Chaza amakhasimende akho afiselekayo:`,
        'unique_value': `💎 *Isiphakamiso Senani Esiyingqayizivele:*
Chaza okwenza ibhizinisi lakho liyingqayizivele (amagama ayi-50-150).

Yini ekwenze umehluko kubaqhudi bakho?
Kungani amakhasimende kufanele akukhethe?
Iluphi udaba olukhethekile olulinikezayo?

Chaza izinzuzo zakho ezingaqhelekile:`,
        'competitors': '🏆 *Abaqhudi Abayinhloko:* (Okungaphoqiwe)\nUma wazi abaqhudi bakho abayinhloko, sicela ubabhale lapha.\nUma ungenabo, thayipha *skip*:',
        'marketing': `📢 *Amashaneli Ezokumaketha:*
Khetha amashaneli akho ayinhloko ezokumaketha:

1. Imidiya Yezokuxhumana (Facebook, Instagram, TikTok)
2. WhatsApp / Izinhlelo zokuthumela imiyalezo
3. Izitolo Zomzimba / Ama-pop-up
4. I-E-commerce / Iwebhusayithi
5. Okunye`,
        'funding': `💰 *Ulwazi Lgezimali:*
Wulolo luphi uhlobo lwezimali olufunayo?

1. Imalimboleko emincane
2. Imalimboleko yesikhathi esithile
3. Ukuxhaswa ngezimali nge-equity
4. Isibonelelo
5. Okunye`,
        'completion': `🎉 *Siyakuhalalisela!* 🎉

Ucwangco lwakho lwebhizinisi luthunyelwe ngempumelelo!

*Inombolo Yesiqinisekiso:* {referenceNumber}

Sizobuyekeza isicelo sakho futhi sizoxhumana nawe phakathi kwamahora amabili amasonto.

Siyabonga ngokuthatha isikhathi sakho ukugcwalisa leli fomu elingokopelo locwangco lwebhizinisi.

Ube nosuku oluhle! 🌟`,
        'error': '❌ Uxolo, kube nephutha ekuthumeleni ifomu lakho. Sicela uzame futhi emuva kwesikhathi noma uxhumane nosizo.',
        'paused': '🛑 Ifomu limisiwe. Ungaqhubeka noma yisiphi isikhathi ngokuthumela noma yimuphi umyalezo.',
        'invalid_phone': '❌ Sicela ufake inombolo yocingo evumelekile yaseNingizimu Afrika (amadijithi ayi-10 aqala ngo-0).\nIsibonelo: 0712345678',
        'invalid_email': '❌ Sicela ufake ikheli le-imeyili elivumelekile.\nIsibonelo: igama@isibonelo.com',
        'invalid_dob': '❌ Kufanele ube neminyaka engu-18 nangaphezulu. Sicela ufake usuku oluvumelekile (YYYY-MM-DD):',
        'invalid_year': '❌ Sicela ufake unyaka ovumelekile phakathi kuka-1900 no-{currentYear}:',
        'required_field': '❌ Le nkambu iyadingeka. Sicela unikeze impendulo:',
        'select_at_least_one': '❌ Sicela ukhethe okungenani inketho eyodwa.'
      }
    };
  }

  getTranslation(language, key, variables = {}) {
    const lang = this.translations[language] || this.translations['en'];
    let translation = lang[key] || this.translations['en'][key] || key;
    
    // Replace variables in the translation
    Object.keys(variables).forEach(variable => {
      translation = translation.replace(`{${variable}}`, variables[variable]);
    });
    
    return translation;
  }

  getLanguageName(code) {
    const languageNames = {
      'en': 'English',
      'zu': 'isiZulu', 
      'xh': 'isiXhosa',
      'af': 'Afrikaans',
      'nso': 'Sesotho sa Leboa',
      'tn': 'Setswana',
      'st': 'Sesotho',
      'ts': 'Xitsonga',
      'ss': 'siSwati',
      've': 'Tshivenda',
      'nr': 'isiNdebele'
    };
    return languageNames[code] || code;
  }

  getLanguageButtons() {
    return [
      { title: '🇺🇸 English' },
      { title: '🇿🇦 isiZulu' },
      { title: '🇿🇦 isiXhosa' },
      { title: '🇿🇦 Afrikaans' },
      { title: '🇿🇦 Sesotho sa Leboa' },
      { title: '🇿🇦 Setswana' },
      { title: '🇿🇦 Sesotho' },
      { title: '🇿🇦 Xitsonga' },
      { title: '🇿🇦 siSwati' },
      { title: '🇿🇦 Tshivenda' },
      { title: '🇿🇦 isiNdebele' }
    ];
  }

  detectLanguage(text) {
    // Simple language detection based on common words
    const languagePatterns = {
      'zu': ['sawubona', 'ngiyabonga', 'yebo', 'cha', 'ngicela', 'unjani', 'kahle'],
      'xh': ['molo', 'enkosi', 'ewe', 'hayi', 'ndicela', 'unjani', 'kakuhle'],
      'af': ['hallo', 'dankie', 'ja', 'nee', 'asseblief', 'hoe gaan dit', 'goed'],
      'nso': ['dumela', 'ke a leboga', 'ee', 'aowa', 'ke kopa', 'o kae', 'gona'],
      'tn': ['dumela', 'ke a leboga', 'ee', 'nnyaa', 'tsweetswee', 'o kae', 'sentle'],
      'st': ['lumela', 'kea leboha', 'ee', 'che', 'ka kopo', 'o phela joang', 'hantle'],
      'ts': ['avuxeni', 'ndza nkhensa', 'ina', 'e-e', 'ndzi kombela', 'ku njhani', 'kahle'],
      'ss': ['sawubona', 'ngiyabonga', 'yebo', 'cha', 'ngicela', 'unjani', 'kahle'],
      've': ['nda', 'ndo livhuwa', 'ee', 'a-a', 'ndi khou humbela', 'vho vuwa hani', 'zwavhudi'],
      'nr': ['salibonani', 'ngiyabonga', 'yebo', 'cha', 'ngicela', 'unjani', 'kahle']
    };

    const lowerText = text.toLowerCase();
    for (const [lang, patterns] of Object.entries(languagePatterns)) {
      if (patterns.some(word => lowerText.includes(word))) {
        return lang;
      }
    }
    
    return 'en'; // Default to English
  }
}

module.exports = new LanguageService();