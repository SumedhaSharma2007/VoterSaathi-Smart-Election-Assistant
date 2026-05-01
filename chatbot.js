const Chatbot = {
    getFAQs() {
        const t = App.translations[App.state.lang];
        return {
            "nota": t['bot-faq-nota'],
            "documents": t['bot-faq-docs'],
            "dostavej": t['bot-faq-docs'], // Hindi keyword
            "how to vote": t['bot-faq-vote'],
            "vote kaise kare": t['bot-faq-vote'], // Hindi keyword
            "deadline": t['bot-faq-deadline']
        };
    },

    init() {
        this.modal = document.getElementById('chatbot-modal');
        this.toggleBtn = document.getElementById('chatbot-toggle');
        this.closeBtn = document.querySelector('.close-modal');
        this.input = document.getElementById('chat-input');
        this.sendBtn = document.getElementById('send-message');
        this.messagesContainer = document.getElementById('chat-messages');
        this.voiceBtn = document.getElementById('voice-input');

        this.setupListeners();
        this.showWelcome();
    },

    showWelcome() {
        const t = App.translations[App.state.lang];
        this.messagesContainer.innerHTML = '';
        this.addMessage(t['bot-welcome'], 'bot');
    },

    setupListeners() {
        if (this.toggleBtn) this.toggleBtn.onclick = () => {
            this.modal.style.display = 'flex';
            this.modal.style.opacity = '0';
            this.modal.style.transform = 'translateY(20px)';
            setTimeout(() => {
                this.modal.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
                this.modal.style.opacity = '1';
                this.modal.style.transform = 'translateY(0)';
            }, 10);
            this.input.focus();
        };
        
        if (this.closeBtn) this.closeBtn.onclick = () => {
            this.modal.style.opacity = '0';
            this.modal.style.transform = 'translateY(20px)';
            setTimeout(() => {
                this.modal.style.display = 'none';
            }, 400);
        };
        
        if (this.sendBtn) this.sendBtn.onclick = () => this.handleMessage();
        if (this.input) this.input.onkeypress = (e) => { if (e.key === 'Enter') this.handleMessage(); };

        if ('webkitSpeechRecognition' in window) {
            const recognition = new webkitSpeechRecognition();
            recognition.onresult = (event) => {
                this.input.value = event.results[0][0].transcript;
                this.handleMessage();
            };
            if (this.voiceBtn) this.voiceBtn.onclick = () => recognition.start();
        } else if (this.voiceBtn) {
            this.voiceBtn.style.display = 'none';
        }
    },

    handleMessage() {
        const text = this.input.value.trim();
        if (!text) return;

        this.addMessage(text, 'user');
        this.input.value = '';

        // Show typing indicator
        const typingDiv = document.createElement('div');
        typingDiv.className = 'message bot';
        typingDiv.id = 'typing-indicator';
        typingDiv.innerHTML = `
            <div style="display: flex; gap: 4px; padding: 4px 0;">
                <div style="width: 6px; height: 6px; border-radius: 50%; background: var(--text-muted); animation: dotPulse 1.4s infinite linear;"></div>
                <div style="width: 6px; height: 6px; border-radius: 50%; background: var(--text-muted); animation: dotPulse 1.4s infinite linear 0.2s;"></div>
                <div style="width: 6px; height: 6px; border-radius: 50%; background: var(--text-muted); animation: dotPulse 1.4s infinite linear 0.4s;"></div>
            </div>
            <style>@keyframes dotPulse { 0%, 100% { opacity: 0.3; } 50% { opacity: 1; } }</style>
        `;
        this.messagesContainer.appendChild(typingDiv);
        this.scrollToBottom();

        setTimeout(() => {
            const indicator = document.getElementById('typing-indicator');
            if (indicator) indicator.remove();
            const response = this.getResponse(text.toLowerCase());
            this.addMessage(response, 'bot');
        }, 1200);
    },

    getResponse(text) {
        const faqs = this.getFAQs();
        const t = App.translations[App.state.lang];
        for (let key in faqs) {
            if (text.includes(key)) return faqs[key];
        }
        return t['bot-fallback'];
    },

    addMessage(text, sender) {
        const div = document.createElement('div');
        div.className = `message ${sender}`;
        div.innerHTML = `<p>${text}</p>`;
        this.messagesContainer.appendChild(div);
        this.scrollToBottom();
    },

    scrollToBottom() {
        this.messagesContainer.scrollTo({
            top: this.messagesContainer.scrollHeight,
            behavior: 'smooth'
        });
    }
};

