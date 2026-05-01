const Quiz = {
    getQuestions() {
        const t = App.translations[App.state.lang];
        return [
            { q: t['quiz-q1'], a: t['quiz-q1-a'], correct: 1 },
            { q: t['quiz-q2'], a: t['quiz-q2-a'], correct: 1 },
            { q: t['quiz-q3'], a: t['quiz-q3-a'], correct: 0 },
            { q: t['quiz-q4'], a: t['quiz-q4-a'], correct: 1 },
            { q: t['quiz-q5'], a: t['quiz-q5-a'], correct: 1 }
        ];
    },

    init() {
        this.currentQuestion = 0;
        this.score = 0;
        this.questions = this.getQuestions();
    },

    render(container) {
        this.init();
        this.container = container;
        this.showQuestion();
    },

    showQuestion() {
        const t = App.translations[App.state.lang];
        if (this.currentQuestion >= this.questions.length) {
            this.showResult();
            return;
        }

        const q = this.questions[this.currentQuestion];
        this.container.innerHTML = `
            <div class="card glass" style="text-align: center; animation: sectionIn 0.6s forwards;">
                <div style="margin-bottom: 2.5rem;">
                    <div style="display: flex; justify-content: space-between; font-size: 0.95rem; font-weight: 700; color: var(--text-muted); margin-bottom: 1rem;">
                        <span>Question ${this.currentQuestion + 1} of ${this.questions.length}</span>
                        <span>${Math.round((this.currentQuestion / this.questions.length) * 100)}% Complete</span>
                    </div>
                    <div class="progress-container" style="height: 10px; margin: 0; background: var(--border-color); border-radius: 5px; overflow: hidden;">
                        <div class="progress-bar-fill" style="width: ${(this.currentQuestion / this.questions.length) * 100}%; height: 100%; background: linear-gradient(90deg, var(--primary), var(--secondary)); transition: width 0.4s ease;"></div>
                    </div>
                </div>
                
                <h3 style="font-size: 1.8rem; margin-bottom: 3rem; min-height: 5rem; display: flex; align-items: center; justify-content: center;">${q.q}</h3>
                
                <div style="display: flex; flex-direction: column; gap: 1.25rem;" id="quiz-options">
                    ${q.a.map((opt, i) => `
                        <div class="quiz-option" onclick="Quiz.handleAnswer(${i}, this)">
                            <span style="width: 35px; height: 35px; border-radius: 50%; border: 2px solid currentColor; display: inline-flex; align-items: center; justify-content: center; font-size: 0.9rem; flex-shrink: 0;">${String.fromCharCode(65 + i)}</span>
                            <span style="flex: 1;">${opt}</span>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    },

    handleAnswer(index, element) {
        if (this.answered) return;
        this.answered = true;

        const correct = this.questions[this.currentQuestion].correct;
        const options = document.getElementById('quiz-options').children;

        if (index === correct) {
            element.classList.add('correct');
            this.score++;
        } else {
            element.classList.add('incorrect');
            options[correct].classList.add('correct');
        }

        setTimeout(() => {
            this.currentQuestion++;
            this.answered = false;
            this.showQuestion();
        }, 1500);
    },

    showResult() {
        const t = App.translations[App.state.lang];
        let badge = 'Beginner';
        let medalColor = '#94a3b8'; // Silver/Gray
        if (this.score >= 4) {
            badge = 'Election Ready';
            medalColor = '#f59e0b'; // Gold
        } else if (this.score >= 2) {
            badge = 'Aware Voter';
            medalColor = '#818cf8'; // Indigo/Silver
        }

        App.state.user.badge = badge;
        App.saveUserProgress();

        this.container.innerHTML = `
            <div class="card glass" style="text-align: center; animation: slideUp 0.6s ease-out;">
                <div style="font-size: 3.5rem; color: ${medalColor}; margin-bottom: 1.5rem; filter: drop-shadow(0 0 15px ${medalColor}40);">
                    <i class="fas fa-medal"></i>
                </div>
                <h2 style="margin-bottom: 0.5rem;">${t['quiz-complete']}</h2>
                <p style="color: var(--text-muted); margin-bottom: 2rem;">${t['quiz-score'].replace('{score}', this.score).replace('{total}', this.questions.length)}</p>
                
                <div style="background: var(--bg-color); padding: 2rem; border-radius: var(--radius-md); margin-bottom: 2.5rem; border: 1px solid var(--border-color);">
                    <p style="font-size: 0.9rem; text-transform: uppercase; letter-spacing: 0.1em; color: var(--text-muted); margin-bottom: 0.5rem;">${t['quiz-status']}</p>
                    <h3 style="font-size: 1.75rem; color: var(--primary);">${badge}</h3>
                </div>
                
                <div style="display: flex; gap: 1rem; justify-content: center;">
                    <button class="btn btn-primary" onclick="Quiz.render(document.getElementById('active-widget'))">
                        <i class="fas fa-redo"></i> ${t['quiz-retake']}
                    </button>
                    <button class="btn btn-outline" onclick="App.showSection('dashboard')">
                        ${t['quiz-back']}
                    </button>
                </div>
            </div>
        `;
    }
};

