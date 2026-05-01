const App = {
    state: {
        theme: localStorage.getItem('theme') || 'light',
        lang: localStorage.getItem('lang') || 'EN',
        user: JSON.parse(localStorage.getItem('user')) || {
            name: '',
            state: '',
            isRegistered: false,
            hasID: false,
            location: null,
            progress: 0,
            completedSteps: [],
            badge: 'Beginner',
            age: localStorage.getItem('user-age') || null
        }
    },

    translations: {
        EN: {
            "nav-home": "Home",
            "nav-assistant": "Assistant",
            "nav-dashboard": "Dashboard",
            "nav-learning": "Learning",
            "logo-text": "VoterSaathi",
            "hero-title": "Your Voice, Your Power.",
            "hero-subtitle": "The ultimate guide for first-time voters in India. Get registered, stay informed, and make your vote count.",
            "get-started": "Get Started",
            "placeholder-name": "Full Name",
            "placeholder-state": "Select State",
            "placeholder-age": "Age",
            "select-state": "Select State",
            "voter-status": "Your Journey",
            "voter-badge-label": "Voter Badge",
            "badge-beginner": "Beginner",
            "badge-desc": "Keep learning to level up!",
            "learning-title": "Quiz Mode",
            "learning-desc": "Test your civics knowledge.",
            "timeline-title": "Timeline",
            "timeline-desc": "Important election dates.",
            "fact-check-title": "Fact Check",
            "fact-check-desc": "Verify election news.",
            "simulation-title": "Booth Sim",
            "simulation-desc": "Virtual voting experience.",
            "ai-assistant": "Assistant",
            "bot-welcome": "Namaste! I'm VoterSaathi. How can I help you navigate the voting process today?",
            "ask-placeholder": "Ask a question...",
            "why-voting-title": "Why Voting Matters",
            "reason-1-title": "1. Shape the Future",
            "reason-1-desc": "Decisions made today affect your education, environment, and career tomorrow.",
            "reason-2-title": "2. Equality for All",
            "reason-2-desc": "Every vote has the same value, regardless of background or wealth.",
            "reason-3-title": "3. Be the Change",
            "reason-3-desc": "Voting is the most powerful way to express your opinion on how the country is run.",
            "note-label": "Note:",
            "note-desc": "You can register to vote as soon as you turn 18. Keep this guide bookmarked!",
            "steps-title": "Simple Steps to Vote",
            "steps-subtitle": "Everything you need to navigate the democratic process.",
            "step-register-title": "Register",
            "step-register-desc": "New to the electoral roll? Complete your Form 6 registration in minutes.",
            "step-register-btn": "Start Registration",
            "step-id-title": "Verify ID",
            "step-id-desc": "Check your Voter ID status or apply for corrections effortlessly.",
            "step-id-btn": "Check Status",
            "step-vote-title": "Go Vote",
            "step-vote-desc": "Find your polling station and prepare for the big day with our checklist.",
            "step-vote-btn": "View Timeline",
            "welcome-user": "Welcome, {name} from {state}!",
            "eligible-msg": "You are eligible to vote! Redirecting you to the assistant...",
            "not-eligible-title": "Not Eligible Yet",
            "not-eligible-desc": "You are not eligible to vote yet. Voting requires age 18+. However, you can still learn about the process!",
            "learn-more-btn": "Learn About Voting",
            "try-again-btn": "Try Again",
            "df-start-q": "Are you registered to vote?",
            "df-yes": "Yes",
            "df-no": "No",
            "df-has-id-q": "Do you have a physical Voter ID card?",
            "df-reg-title": "How to Register",
            "df-reg-step1": "Visit <strong>voterportal.eci.gov.in</strong>",
            "df-reg-step2": "Fill <strong>Form 6</strong> for new registration",
            "df-reg-step3": "Upload Address & Age proof",
            "df-reg-btn": "Got it, I'll do that!",
            "df-id-help-title": "No Voter ID? No Problem!",
            "df-id-help-desc": "If your name is in the electoral roll, you can still vote using any of these valid documents:",
            "df-id-btn": "Take me to Dashboard",
            "df-aadhaar": "Aadhaar Card",
            "df-dl": "Driving License",
            "df-passport": "Passport",
            "df-pan": "PAN Card",
            "df-subtitle": "Help us understand your current status to guide you better.",
            "quiz-q1": "What is the minimum age to vote in India?",
            "quiz-q1-a": ["16", "18", "21"],
            "quiz-q2": "Which document is primarily used for voting?",
            "quiz-q2-a": ["Ration Card", "Voter ID (EPIC)", "Electricity Bill"],
            "quiz-q3": "What does VVPAT stand for?",
            "quiz-q3-a": ["Voter Verifiable Paper Audit Trail", "Voting Verification Paper Audit Tool", "Voter Verification Paper Account Tool"],
            "quiz-q4": "Is voting a fundamental right in India?",
            "quiz-q4-a": ["Yes", "No, it's a Constitutional Right"],
            "quiz-q5": "Can you vote if your name is not in the Electoral Roll?",
            "quiz-q5-a": ["Yes", "No"],
            "quiz-complete": "Quiz Complete!",
            "quiz-score": "You scored {score} out of {total}",
            "quiz-status": "New Status Earned",
            "quiz-retake": "Retake Quiz",
            "quiz-back": "Back to Dashboard",
            "sim-arrival-title": "Arrival at Polling Booth",
            "sim-arrival-desc": "Welcome to your assigned polling station. Please proceed to the verification desk.",
            "sim-next": "Next",
            "sim-id-title": "Identity Verification",
            "sim-id-desc": "Please present your Voter ID card or a valid alternative document.",
            "sim-id-docs": "Accepted Documents:",
            "sim-id-aadhaar": "Aadhaar Card",
            "sim-id-pan": "PAN Card",
            "sim-id-dl": "Driving License",
            "sim-id-passport": "Passport",
            "sim-show-id": "Show ID",
            "sim-forgot-id": "I forgot my ID",
            "sim-list-title": "Voter List Check",
            "sim-list-desc": "The polling officer is checking your name in the electoral roll.",
            "sim-verified": "Name Verified: Serial No. 425",
            "sim-not-found": "Name not found in this booth.",
            "sim-guidance": "Guidance: Check your polling station online at voterportal.eci.gov.in or use the helpdesk outside.",
            "sim-proceed-ink": "Proceed to Ink Marking",
            "sim-ink-title": "Ink Marking",
            "sim-ink-desc": "The second polling officer will apply indelible ink to your left index finger.",
            "sim-go-evm": "Go to EVM",
            "sim-evm-title": "EVM Voting",
            "sim-evm-desc": "Inside the voting compartment, press the blue button next to your candidate of choice.",
            "sim-vvpat-printing": "VVPAT SLIP PRINTING...",
            "sim-vvpat-drop": "Slip will drop in 7 seconds",
            "sim-success-title": "Successfully Voted!",
            "sim-success-desc": "Thank you for participating in the democratic process. You have fulfilled your duty as a responsible citizen.",
            "sim-badge-earned": "Responsible Voter Badge Earned!",
            "sim-share": "Share your \"I Voted\" selfie on social media to encourage others.",
            "sim-back-dash": "Back to Dashboard",
            "sim-alt-id": "Use Alternative ID",
            "sim-id-req": "ID Required",
            "bot-faq-nota": "NOTA (None of the Above) allows voters to officially register a vote of rejection for all candidates. It doesn't affect the winner but signals dissatisfaction.",
            "bot-faq-docs": "Besides Voter ID, you can use Aadhaar, PAN card, Passport, or Driving License if your name is on the electoral roll.",
            "bot-faq-vote": "Go to your polling booth, get your finger inked, press the button next to your candidate on the EVM, and wait for the VVPAT beep.",
            "bot-faq-deadline": "The registration deadline is typically 3 weeks before the election date in your constituency.",
            "bot-fallback": "I'm still learning! You can ask about NOTA, documents, how to vote, or deadlines. For more help, visit eci.gov.in."
        },
        HI: {
            "nav-home": "होम",
            "nav-assistant": "सहायक",
            "nav-dashboard": "डैशबोर्ड",
            "nav-learning": "सीखना",
            "logo-text": "वोटर साथी",
            "hero-title": "आपकी आवाज़, आपकी शक्ति।",
            "hero-subtitle": "भारत में पहली बार मतदान करने वालों के लिए मार्गदर्शिका। पंजीकरण करें, सूचित रहें और अपने वोट का महत्व समझें।",
            "get-started": "शुरू करें",
            "placeholder-name": "पूरा नाम",
            "placeholder-state": "राज्य चुनें",
            "placeholder-age": "आयु",
            "select-state": "राज्य चुनें",
            "voter-status": "आपकी यात्रा",
            "voter-badge-label": "वोटर बैज",
            "badge-beginner": "शुरुआती",
            "badge-desc": "लेवल बढ़ाने के लिए सीखते रहें!",
            "learning-title": "क्विज़ मोड",
            "learning-desc": "अपने नागरिक शास्त्र ज्ञान का परीक्षण करें।",
            "timeline-title": "समयरेखा",
            "timeline-desc": "महत्वपूर्ण चुनाव तिथियां।",
            "fact-check-title": "तथ्य जाँच",
            "fact-check-desc": "चुनावी समाचारों को सत्यापित करें।",
            "simulation-title": "बूथ सिम",
            "simulation-desc": "आभासी मतदान अनुभव।",
            "ai-assistant": "सहायक",
            "bot-welcome": "नमस्ते! मैं वोटर साथी हूँ। मैं मतदान प्रक्रिया में आपकी मदद कैसे कर सकता हूँ?",
            "ask-placeholder": "एक सवाल पूछें...",
            "why-voting-title": "मतदान क्यों मायने रखता है",
            "reason-1-title": "1. भविष्य को आकार दें",
            "reason-1-desc": "आज लिए गए निर्णय कल आपकी शिक्षा, पर्यावरण और करियर को प्रभावित करेंगे।",
            "reason-2-title": "2. सभी के लिए समानता",
            "reason-2-desc": "पृष्ठभूमि या धन की परवाह किए बिना हर वोट का समान मूल्य होता है।",
            "reason-3-title": "3. परिवर्तन बनें",
            "reason-3-desc": "देश कैसे चलाया जाए, इस पर अपनी राय व्यक्त करने का मतदान सबसे शक्तिशाली तरीका है।",
            "note-label": "नोट:",
            "note-desc": "जैसे ही आप 18 वर्ष के हो जाते हैं, आप वोट देने के लिए पंजीकरण कर सकते हैं। इस गाइड को बुकमार्क करके रखें!",
            "steps-title": "वोट देने के सरल कदम",
            "steps-subtitle": "लोकतांत्रिक प्रक्रिया को नेविगेट करने के लिए आपको जो कुछ भी चाहिए।",
            "step-register-title": "पंजीकरण",
            "step-register-desc": "निर्वाचक नामावली में नए हैं? मिनटों में अपना फॉर्म 6 पंजीकरण पूरा करें।",
            "step-register-btn": "पंजीकरण शुरू करें",
            "step-id-title": "आईडी सत्यापित करें",
            "step-id-desc": "अपनी वोटर आईडी स्थिति जांचें या सुधार के लिए आवेदन करें।",
            "step-id-btn": "स्थिति जांचें",
            "step-vote-title": "वोट दें",
            "step-vote-desc": "अपना मतदान केंद्र खोजें और चेकलिस्ट के साथ बड़े दिन के लिए तैयार रहें।",
            "step-vote-btn": "समयरेखा देखें",
            "welcome-user": "नमस्ते, {state} के {name}!",
            "eligible-msg": "आप वोट देने के पात्र हैं! आपको सहायक के पास ले जाया जा रहा है...",
            "not-eligible-title": "अभी पात्र नहीं हैं",
            "not-eligible-desc": "आप अभी वोट देने के पात्र नहीं हैं। मतदान के लिए 18 वर्ष की आयु आवश्यक है। हालाँकि, आप अभी भी प्रक्रिया के बारे में जान सकते हैं!",
            "learn-more-btn": "मतदान के बारे में जानें",
            "try-again-btn": "पुनः प्रयास करें",
            "df-start-q": "क्या आप मतदान करने के लिए पंजीकृत हैं?",
            "df-yes": "हाँ",
            "df-no": "नहीं",
            "df-has-id-q": "क्या आपके पास वोटर आईडी कार्ड है?",
            "df-reg-title": "पंजीकरण कैसे करें",
            "df-reg-step1": "<strong>voterportal.eci.gov.in</strong> पर जाएं",
            "df-reg-step2": "नये पंजीकरण के लिए <strong>फॉर्म 6</strong> भरें",
            "df-reg-step3": "पता और आयु प्रमाण अपलोड करें",
            "df-reg-btn": "ठीक है, मैं यह करूँगा!",
            "df-id-help-title": "वोटर आईडी नहीं है? कोई बात नहीं!",
            "df-id-help-desc": "यदि आपका नाम मतदाता सूची में है, तो आप इनमें से किसी भी वैध दस्तावेज का उपयोग करके वोट दे सकते हैं:",
            "df-id-btn": "मुझे डैशबोर्ड पर ले चलें",
            "df-aadhaar": "आधार कार्ड",
            "df-dl": "ड्राइविंग लाइसेंस",
            "df-passport": "पासपोर्ट",
            "df-pan": "पैन कार्ड",
            "df-subtitle": "आपकी स्थिति समझने में हमारी सहायता करें ताकि हम आपका बेहतर मार्गदर्शन कर सकें।",
            "quiz-q1": "भारत में वोट देने की न्यूनतम आयु क्या है?",
            "quiz-q1-a": ["16", "18", "21"],
            "quiz-q2": "मतदान के लिए मुख्य रूप से किस दस्तावेज़ का उपयोग किया जाता है?",
            "quiz-q2-a": ["राशन कार्ड", "वोटर आईडी (EPIC)", "बिजली बिल"],
            "quiz-q3": "VVPAT का पूर्ण रूप क्या है?",
            "quiz-q3-a": ["Voter Verifiable Paper Audit Trail", "Voting Verification Paper Audit Tool", "Voter Verification Paper Account Tool"],
            "quiz-q4": "क्या भारत में मतदान एक मौलिक अधिकार है?",
            "quiz-q4-a": ["हाँ", "नहीं, यह एक संवैधानिक अधिकार है"],
            "quiz-q5": "यदि आपका नाम मतदाता सूची में नहीं है तो क्या आप वोट दे सकते हैं?",
            "quiz-q5-a": ["हाँ", "नहीं"],
            "quiz-complete": "क्विज़ पूरा हुआ!",
            "quiz-score": "आपने {total} में से {score} अंक प्राप्त किए",
            "quiz-status": "नया स्टेटस मिला",
            "quiz-retake": "क्विज़ दोबारा लें",
            "quiz-back": "डैशबोर्ड पर वापस जाएं",
            "sim-arrival-title": "मतदान केंद्र पर आगमन",
            "sim-arrival-desc": "आपके निर्दिष्ट मतदान केंद्र पर आपका स्वागत है। कृपया सत्यापन डेस्क पर आगे बढ़ें।",
            "sim-next": "अगला",
            "sim-id-title": "पहचान सत्यापन",
            "sim-id-desc": "कृपया अपना वोटर आईडी कार्ड या कोई वैध वैकल्पिक दस्तावेज़ प्रस्तुत करें।",
            "sim-id-docs": "स्वीकार्य दस्तावेज़:",
            "sim-id-aadhaar": "आधार कार्ड",
            "sim-id-pan": "पैन कार्ड",
            "sim-id-dl": "ड्राइविंग लाइसेंस",
            "sim-id-passport": "पासपोर्ट",
            "sim-show-id": "आईडी दिखाएं",
            "sim-forgot-id": "मैं अपनी आईडी भूल गया",
            "sim-list-title": "मतदाता सूची की जाँच",
            "sim-list-desc": "मतदान अधिकारी मतदाता सूची में आपका नाम जांच रहे हैं।",
            "sim-verified": "नाम सत्यापित: सीरियल नंबर 425",
            "sim-not-found": "इस बूथ में नाम नहीं मिला।",
            "sim-guidance": "मार्गदर्शन: अपना मतदान केंद्र voterportal.eci.gov.in पर ऑनलाइन जांचें या बाहर हेल्पडेस्क का उपयोग करें।",
            "sim-proceed-ink": "स्याही लगाने के लिए आगे बढ़ें",
            "sim-ink-title": "स्याही लगाना",
            "sim-ink-desc": "दूसरा मतदान अधिकारी आपकी बाईं तर्जनी पर अमिट स्याही लगाएगा।",
            "sim-go-evm": "ईवीएम पर जाएं",
            "sim-evm-title": "ईवीएम मतदान",
            "sim-evm-desc": "वोटिंग कंपार्टमेंट के अंदर, अपनी पसंद के उम्मीदवार के बगल में नीला बटन दबाएं।",
            "sim-vvpat-printing": "वीवीपीएटी पर्ची छप रही है...",
            "sim-vvpat-drop": "पर्ची 7 सेकंड में गिर जाएगी",
            "sim-success-title": "सफलतापूर्वक मतदान किया!",
            "sim-success-desc": "लोकतांत्रिक प्रक्रिया में भाग लेने के लिए धन्यवाद। आपने एक जिम्मेदार नागरिक के रूप में अपना कर्तव्य निभाया है।",
            "sim-badge-earned": "जिम्मेदार मतदाता बैज मिला!",
            "sim-share": "दूसरों को प्रोत्साहित करने के लिए सोशल मीडिया पर अपनी \"मैंने वोट दिया\" सेल्फी साझा करें।",
            "sim-back-dash": "डैशबोर्ड पर वापस जाएं",
            "sim-alt-id": "वैकल्पिक आईडी का उपयोग करें",
            "sim-id-req": "आईडी आवश्यक",
            "bot-faq-nota": "नोटा (उपरोक्त में से कोई नहीं) मतदाताओं को आधिकारिक तौर पर सभी उम्मीदवारों के लिए अस्वीकृति का वोट दर्ज करने की अनुमति देता है। यह विजेता को प्रभावित नहीं करता है लेकिन असंतोष का संकेत देता है।",
            "bot-faq-docs": "वोटर आईडी के अलावा, यदि आपका नाम मतदाता सूची में है तो आप आधार, पैन कार्ड, पासपोर्ट या ड्राइविंग लाइसेंस का उपयोग कर सकते हैं।",
            "bot-faq-vote": "अपने मतदान केंद्र पर जाएं, अपनी उंगली पर स्याही लगवाएं, ईवीएम पर अपने पसंद के उम्मीदवार के बगल में बटन दबाएं और वीवीपीएटी बीप का इंतज़ार करें।",
            "bot-faq-deadline": "पंजीकरण की समय सीमा आम तौर पर आपके निर्वाचन क्षेत्र में चुनाव की तारीख से 3 सप्ताह पहले होती है।",
            "bot-fallback": "मैं अभी भी सीख रहा हूँ! आप नोटा, दस्तावेज़, वोट कैसे दें, या समय सीमा के बारे में पूछ सकते हैं। अधिक सहायता के लिए eci.gov.in पर जाएं।"
        }
    },

    init() {
        this.applyTheme();
        this.applyLanguage();
        this.initEventListeners();
        this.updateProgressTracker();
        this.updateBadge();
        this.initParallax();
        this.initScrollAnimations();
        
        if (this.state.user.age) {
            this.toggleAppAccess(parseInt(this.state.user.age) >= 18);
            this.updateWelcomeMessage();
        } else {
            this.toggleAppAccess(false);
        }
        
        if (typeof DecisionFlow !== 'undefined') DecisionFlow.init();
        if (typeof Chatbot !== 'undefined') Chatbot.init();
        if (typeof Quiz !== 'undefined') Quiz.init();
        if (typeof VotingSimulation !== 'undefined') VotingSimulation.init();
    },

    initEventListeners() {
        document.getElementById('theme-toggle').addEventListener('click', () => {
            this.state.theme = this.state.theme === 'light' ? 'dark' : 'light';
            this.applyTheme();
            localStorage.setItem('theme', this.state.theme);
        });

        document.getElementById('lang-toggle').addEventListener('click', () => {
            this.state.lang = this.state.lang === 'EN' ? 'HI' : 'EN';
            this.applyLanguage();
            localStorage.setItem('lang', this.state.lang);
            this.updateWelcomeMessage();
            
            // Refresh active widget if any
            const container = document.getElementById('active-widget');
            if (container && container.children.length > 0) {
                const text = container.innerHTML;
                if (text.includes('quiz')) this.showWidget('quiz');
                else if (text.includes('Timeline') || text.includes('समयरेखा')) this.showWidget('timeline');
                else if (text.includes('Misinformation') || text.includes('तथ्य जाँच')) this.showWidget('fact-check');
                else if (text.includes('Simulation') || text.includes('आभासी')) this.showWidget('simulation');
            }

            // Refresh Chatbot if initialized
            if (typeof Chatbot !== 'undefined' && Chatbot.messagesContainer) {
                Chatbot.showWelcome();
            }
        });

        document.getElementById('check-eligibility').addEventListener('click', () => {
            this.handleOnboarding();
        });

        const inputs = ['user-age', 'user-name', 'user-state'];
        inputs.forEach(id => {
            const el = document.getElementById(id);
            if (el) el.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') this.handleOnboarding();
            });
        });

        document.getElementById('nav-logo').addEventListener('click', (e) => {
            e.preventDefault();
            this.showSection('onboarding');
        });

        document.getElementById('nav-quiz').addEventListener('click', () => this.showWidget('quiz'));
        document.getElementById('nav-timeline').addEventListener('click', () => this.showWidget('timeline'));
        document.getElementById('nav-fact-check').addEventListener('click', () => this.showWidget('fact-check'));
        document.getElementById('nav-simulation').addEventListener('click', () => this.showWidget('simulation'));

        // Navbar Scroll Effect
        window.addEventListener('scroll', () => {
            const nav = document.getElementById('main-nav');
            if (window.scrollY > 50) {
                nav.classList.add('scrolled');
            } else {
                nav.classList.remove('scrolled');
            }
        });
    },

    initParallax() {
        document.addEventListener('mousemove', (e) => {
            const { clientX, clientY } = e;
            const centerX = window.innerWidth / 2;
            const centerY = window.innerHeight / 2;
            
            const moveX = (clientX - centerX) / 50;
            const moveY = (clientY - centerY) / 50;
            
            const gradient = document.getElementById('bg-gradient');
            if (gradient) {
                gradient.style.transform = `translate(${moveX}px, ${moveY}px) rotate(${moveX * 0.1}deg)`;
            }

            const heroImg = document.getElementById('hero-img');
            if (heroImg && document.getElementById('onboarding').classList.contains('active')) {
                heroImg.style.transform = `translate(${moveX * -0.5}px, ${moveY * -0.5}px)`;
            }
        });
    },

    initScrollAnimations() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, { threshold: 0.1 });

        document.querySelectorAll('.card, .feature-card, .hero-content').forEach(el => {
            observer.observe(el);
        });
    },

    applyTheme() {
        document.documentElement.setAttribute('data-theme', this.state.theme);
        const icon = document.querySelector('#theme-toggle i');
        if (icon) icon.className = this.state.theme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
    },

    applyLanguage() {
        const t = this.translations[this.state.lang];
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (t[key]) el.textContent = t[key];
        });
        document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
            const key = el.getAttribute('data-i18n-placeholder');
            if (t[key]) {
                if (el.tagName === 'SELECT') {
                    // Handled via data-i18n on the first option usually, but let's be safe
                } else {
                    el.placeholder = t[key];
                }
            }
        });
        const langEl = document.getElementById('current-lang');
        if (langEl) langEl.textContent = this.state.lang === 'EN' ? 'HI' : 'EN';
    },

    updateWelcomeMessage() {
        if (!this.state.user.name) return;
        const t = this.translations[this.state.lang];
        let msg = t['welcome-user'].replace('{name}', this.state.user.name).replace('{state}', this.state.user.state);
        
        const heroTitle = document.querySelector('[data-i18n="hero-title"]');
        if (heroTitle && this.state.user.age >= 18) {
            heroTitle.textContent = msg;
        }
    },

    showSection(sectionId) {
        const sections = document.querySelectorAll('.section');
        sections.forEach(s => {
            s.classList.remove('active');
            s.style.opacity = '0';
        });
        
        const target = document.getElementById(sectionId);
        target.classList.add('active');
        
        // Update nav links active state
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('onclick')?.includes(sectionId)) {
                link.classList.add('active');
            }
        });

        setTimeout(() => {
            target.style.opacity = '1';
            target.style.transform = 'translateY(0)';
        }, 50);

        window.scrollTo({ top: 0, behavior: 'smooth' });
    },

    showWidget(type) {
        const container = document.getElementById('active-widget');
        container.innerHTML = `
            <div style="display: flex; justify-content: center; padding: 3rem;">
                <div class="loader" style="width: 40px; height: 40px; border: 4px solid var(--border-color); border-top-color: var(--primary); border-radius: 50%; animation: spin 1s linear infinite;"></div>
            </div>
            <style>@keyframes spin { to { transform: rotate(360deg); } }</style>
        `;

        setTimeout(() => {
            switch(type) {
                case 'quiz': Quiz.render(container); break;
                case 'timeline': this.renderTimeline(container); break;
                case 'fact-check': this.renderFactChecker(container); break;
                case 'simulation': VotingSimulation.render(container); break;
            }
            container.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 600);
    },

    updateProgressTracker() {
        const tracker = document.getElementById('progress-tracker');
        if (!tracker) return;
        const steps = [
            { id: 'register', label: 'Registration', icon: 'fa-user-plus' },
            { id: 'id-card', label: 'Voter ID', icon: 'fa-id-card' },
            { id: 'vote', label: 'Cast Vote', icon: 'fa-check-to-slot' }
        ];

        tracker.innerHTML = `
            <div style="display: flex; flex-direction: column; gap: 1.25rem;">
                ${steps.map(step => `
                    <div style="display: flex; align-items: center; gap: 1rem; opacity: ${this.state.user.completedSteps.includes(step.id) ? '1' : '0.4'}; transition: var(--transition);">
                        <div style="width: 36px; height: 36px; border-radius: 50%; background: ${this.state.user.completedSteps.includes(step.id) ? 'var(--secondary)' : 'var(--border-color)'}; color: white; display: flex; align-items: center; justify-content: center;">
                            <i class="fas ${step.icon}" style="font-size: 0.9rem;"></i>
                        </div>
                        <span style="font-weight: 600; font-size: 0.95rem;">${step.label}</span>
                        ${this.state.user.completedSteps.includes(step.id) ? '<i class="fas fa-check" style="margin-left: auto; color: var(--secondary);"></i>' : ''}
                    </div>
                `).join('')}
            </div>
        `;
    },

    updateBadge() {
        const badgeName = document.getElementById('badge-name');
        if (badgeName) badgeName.textContent = this.state.user.badge;
    },

    renderTimeline(container) {
        container.innerHTML = `
            <div class="card glass" style="animation: slideUp 0.6s ease-out;">
                <h3 style="margin-bottom: 2rem;">Election Timeline 2026</h3>
                <div style="display: flex; flex-direction: column; gap: 2rem;">
                    <div style="border-left: 3px solid var(--primary); padding-left: 2rem; position: relative;">
                        <div style="position: absolute; left: -9px; top: 0; width: 15px; height: 15px; border-radius: 50%; background: var(--primary);"></div>
                        <div style="font-weight: 700; color: var(--primary); margin-bottom: 0.25rem;">Oct 15, 2025</div>
                        <div style="font-weight: 600; font-size: 1.1rem;">Registration Deadline</div>
                        <p style="color: var(--text-muted); margin-bottom: 1rem;">Last day to submit Form 6 for the upcoming elections.</p>
                        <button class="btn btn-primary btn-sm" onclick="App.setReminder('Registration')">Set Reminder</button>
                    </div>
                    <div style="border-left: 3px solid var(--secondary); padding-left: 2rem; position: relative;">
                        <div style="position: absolute; left: -9px; top: 0; width: 15px; height: 15px; border-radius: 50%; background: var(--secondary);"></div>
                        <div style="font-weight: 700; color: var(--secondary); margin-bottom: 0.25rem;">Nov 20, 2025</div>
                        <div style="font-weight: 600; font-size: 1.1rem;">Voting Day</div>
                        <p style="color: var(--text-muted); margin-bottom: 1rem;">Polls open from 7:00 AM to 6:00 PM. Don't forget your ID!</p>
                        <button class="btn btn-primary btn-sm" onclick="App.setReminder('Voting')">Set Reminder</button>
                    </div>
                </div>
            </div>
        `;
    },

    renderFactChecker(container) {
        container.innerHTML = `
            <div class="card glass" style="animation: slideUp 0.6s ease-out;">
                <h3 style="margin-bottom: 1rem;">Misinformation Checker</h3>
                <p style="color: var(--text-muted); margin-bottom: 2rem;">Paste a message or claim below to verify its authenticity using our AI database.</p>
                <div style="display: flex; flex-direction: column; gap: 1.5rem;">
                    <textarea id="fact-input" style="width: 100%; height: 120px; padding: 1.25rem; border-radius: var(--radius-md); border: 1px solid var(--border-color); background: var(--bg-color); color: var(--text-color); font-family: inherit; resize: none;" placeholder="e.g., Voting is mandatory this year or you will be fined..."></textarea>
                    <button class="btn btn-primary" onclick="App.verifyFact()">Verify Claim</button>
                    <div id="fact-result"></div>
                </div>
            </div>
        `;
    },

    verifyFact() {
        const input = document.getElementById('fact-input').value.toLowerCase();
        const resultDiv = document.getElementById('fact-result');
        if (!input.trim()) return;

        let result = { text: "Likely True", class: "true", icon: "check-circle", color: "#10b981" };
        if (input.includes('whatsapp') || input.includes('mandatory') || input.includes('holiday')) {
            result = { text: "Possibly Misleading", class: "misleading", icon: "exclamation-triangle", color: "#f59e0b" };
        }
        if (input.includes('online voting') || input.includes('vote by phone') || input.includes('fined')) {
            result = { text: "False Information", class: "false", icon: "times-circle", color: "#ef4444" };
        }

        resultDiv.innerHTML = `
            <div style="display: flex; align-items: center; gap: 1rem; padding: 1.25rem; border-radius: var(--radius-md); background: ${result.color}20; border: 1px solid ${result.color}40; animation: fadeIn 0.4s ease;">
                <i class="fas fa-${result.icon}" style="color: ${result.color}; font-size: 1.5rem;"></i>
                <span style="font-weight: 700; color: ${result.color};">${result.text}</span>
            </div>
        `;
    },

    setReminder(type) {
        alert(`${type} reminder set successfully!`);
    },

    handleOnboarding() {
        const nameInput = document.getElementById('user-name');
        const stateInput = document.getElementById('user-state');
        const ageInput = document.getElementById('user-age');
        
        const name = nameInput.value.trim();
        const state = stateInput.value;
        const age = parseInt(ageInput.value);
        
        if (!name || !state || !age || age < 1 || age > 120) {
            const t = this.translations[this.state.lang];
            alert(this.state.lang === 'EN' ? "Please fill all fields correctly." : "कृपया सभी फ़ील्ड सही ढंग से भरें।");
            return;
        }

        this.state.user.name = name;
        this.state.user.state = state;
        this.state.user.age = age;
        
        localStorage.setItem('user-age', age);
        this.saveUserProgress();
        
        const isEligible = age >= 18;
        this.renderEligibilityResult(isEligible);
        this.toggleAppAccess(isEligible);
        this.updateWelcomeMessage();

        if (isEligible) {
            setTimeout(() => this.showSection('decision-flow'), 1500);
        }
    },

    renderEligibilityResult(isEligible) {
        const container = document.getElementById('eligibility-result');
        const t = this.translations[this.state.lang];
        
        if (isEligible) {
            container.innerHTML = `
                <div class="card glass" style="padding: 1.5rem 2rem; background: rgba(20, 184, 166, 0.1); border-color: var(--secondary); display: flex; align-items: center; gap: 1rem; animation: slideUp 0.4s forwards;">
                    <i class="fas fa-check-circle" style="color: var(--secondary); font-size: 1.5rem;"></i>
                    <span style="font-weight: 700; color: var(--secondary);">${t['eligible-msg']}</span>
                </div>
            `;
        } else {
            container.innerHTML = `
                <div class="card glass" style="padding: 2rem; border-color: var(--error); animation: slideUp 0.4s forwards;">
                    <div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 1.5rem;">
                        <i class="fas fa-exclamation-triangle" style="color: var(--error); font-size: 2rem;"></i>
                        <h3 style="color: var(--error);">${t['not-eligible-title']}</h3>
                    </div>
                    <p style="color: var(--text-muted); margin-bottom: 2rem;">${t['not-eligible-desc']}</p>
                    <div style="display: flex; gap: 1rem;">
                        <button class="btn btn-primary" onclick="App.showEducation()">${t['learn-more-btn']}</button>
                        <button class="btn btn-outline" onclick="App.resetOnboarding()">${t['try-again-btn']}</button>
                    </div>
                </div>
            `;
        }
    },

    toggleAppAccess(isEligible) {
        const navLinks = document.querySelector('.nav-links');
        const chatbotBtn = document.getElementById('chatbot-toggle');
        const featuresSection = document.getElementById('features');
        
        if (isEligible) {
            if (navLinks) navLinks.style.display = 'flex';
            if (chatbotBtn) chatbotBtn.style.display = 'flex';
            if (featuresSection) featuresSection.style.display = 'block';
            document.getElementById('hero-initial-actions').style.display = 'none';
        } else {
            if (navLinks) navLinks.style.display = 'none';
            if (chatbotBtn) chatbotBtn.style.display = 'none';
            // Keep features visible for education? No, user said "Hide or disable main interactive features"
            if (featuresSection) featuresSection.style.display = 'none';
        }
    },

    showEducation() {
        document.getElementById('education-info').style.display = 'block';
        document.getElementById('education-info').scrollIntoView({ behavior: 'smooth' });
    },

    resetOnboarding() {
        this.state.user.age = null;
        this.state.user.name = '';
        this.state.user.state = '';
        localStorage.removeItem('user-age');
        this.saveUserProgress();
        
        document.getElementById('user-age').value = '';
        document.getElementById('user-name').value = '';
        document.getElementById('user-state').value = '';
        document.getElementById('eligibility-result').innerHTML = '';
        document.getElementById('education-info').style.display = 'none';
        document.getElementById('hero-initial-actions').style.display = 'flex';
        this.toggleAppAccess(false);
        this.applyLanguage(); // Reset translations to original hero title
    },

    saveUserProgress() {
        localStorage.setItem('user', JSON.stringify(this.state.user));
        this.updateProgressTracker();
        this.updateBadge();
    }
};

window.addEventListener('DOMContentLoaded', () => App.init());

