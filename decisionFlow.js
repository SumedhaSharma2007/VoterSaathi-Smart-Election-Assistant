const DecisionFlow = {
    getSteps() {
        const t = App.translations[App.state.lang];
        return {
            START: {
                question: t['df-start-q'],
                options: [
                    { text: t['df-yes'], next: 'HAS_ID' },
                    { text: t['df-no'], next: 'REGISTRATION_STEPS' }
                ],
                progress: 25
            },
            HAS_ID: {
                question: t['df-has-id-q'],
                options: [
                    { text: t['df-yes'], next: 'DASHBOARD' },
                    { text: t['df-no'], next: 'ID_HELP' }
                ],
                progress: 50
            },
            REGISTRATION_STEPS: {
                title: t['df-reg-title'],
                content: `
                    <div style="text-align: left; background: var(--bg-color); padding: 1.5rem; border-radius: var(--radius-md); margin: 2rem 0;">
                        <div style="display: flex; gap: 1rem; margin-bottom: 1.25rem;">
                            <div style="width: 30px; height: 30px; border-radius: 50%; background: var(--primary); color: white; display: flex; align-items: center; justify-content: center; flex-shrink: 0;">1</div>
                            <p>${t['df-reg-step1']}</p>
                        </div>
                        <div style="display: flex; gap: 1rem; margin-bottom: 1.25rem;">
                            <div style="width: 30px; height: 30px; border-radius: 50%; background: var(--primary); color: white; display: flex; align-items: center; justify-content: center; flex-shrink: 0;">2</div>
                            <p>${t['df-reg-step2']}</p>
                        </div>
                        <div style="display: flex; gap: 1rem;">
                            <div style="width: 30px; height: 30px; border-radius: 50%; background: var(--primary); color: white; display: flex; align-items: center; justify-content: center; flex-shrink: 0;">3</div>
                            <p>${t['df-reg-step3']}</p>
                        </div>
                    </div>
                `,
                action: { text: t['df-reg-btn'], next: 'HAS_ID' },
                progress: 40
            },
            ID_HELP: {
                title: t['df-id-help-title'],
                content: `
                    <p style="margin-bottom: 1.5rem;">${t['df-id-help-desc']}</p>
                    <div class="options-grid" style="text-align: left; display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
                        <div style="padding: 1rem; border-radius: var(--radius-sm); border: 1px solid var(--border-color); display: flex; align-items: center; gap: 0.75rem;">
                            <i class="fas fa-address-card" style="color: var(--secondary);"></i> <span>${t['df-aadhaar']}</span>
                        </div>
                        <div style="padding: 1rem; border-radius: var(--radius-sm); border: 1px solid var(--border-color); display: flex; align-items: center; gap: 0.75rem;">
                            <i class="fas fa-car" style="color: var(--secondary);"></i> <span>${t['df-dl']}</span>
                        </div>
                        <div style="padding: 1rem; border-radius: var(--radius-sm); border: 1px solid var(--border-color); display: flex; align-items: center; gap: 0.75rem;">
                            <i class="fas fa-passport" style="color: var(--secondary);"></i> <span>${t['df-passport']}</span>
                        </div>
                        <div style="padding: 1rem; border-radius: var(--radius-sm); border: 1px solid var(--border-color); display: flex; align-items: center; gap: 0.75rem;">
                            <i class="fas fa-id-card-alt" style="color: var(--secondary);"></i> <span>${t['df-pan']}</span>
                        </div>
                    </div>
                `,
                action: { text: t['df-id-btn'], next: 'DASHBOARD' },
                progress: 75
            }
        };
    },

    init() {
        this.renderStep('START');
    },

    renderStep(stepKey) {
        const container = document.getElementById('flow-content');
        const progressFill = document.getElementById('flow-progress-fill');
        const t = App.translations[App.state.lang];
        if (!container) return;
        
        const steps = this.getSteps();
        const step = steps[stepKey];

        if (stepKey === 'DASHBOARD') {
            if (progressFill) progressFill.style.width = '100%';
            setTimeout(() => {
                App.showSection('dashboard');
            }, 600);
            return;
        }

        if (progressFill && step.progress) {
            progressFill.style.width = `${step.progress}%`;
        }

        let html = '';
        if (step.question) {
            html = `
                <div style="animation: sectionIn 0.8s forwards;">
                    <h2 style="font-size: 2.5rem; margin-bottom: 1.5rem; background: linear-gradient(135deg, var(--primary), var(--secondary)); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">${step.question}</h2>
                    <p style="color: var(--text-muted); font-size: 1.2rem; margin-bottom: 3.5rem;">${t['df-subtitle']}</p>
                    <div style="display: flex; gap: 2rem; justify-content: center; flex-wrap: wrap;">
                        ${step.options.map(opt => `
                            <button class="btn btn-outline btn-lg" style="min-width: 220px;" onclick="DecisionFlow.handleOption('${opt.next}', '${stepKey}')">${opt.text}</button>
                        `).join('')}
                    </div>
                </div>
            `;
        } else {
            html = `
                <div style="animation: sectionIn 0.8s forwards;">
                    <h2 style="font-size: 2.5rem; margin-bottom: 1.5rem; background: linear-gradient(135deg, var(--primary), var(--secondary)); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">${step.title}</h2>
                    ${step.content}
                    <button class="btn btn-primary btn-lg" style="margin-top: 3rem; padding: 1.25rem 3.5rem;" onclick="DecisionFlow.renderStep('${step.action.next}')">
                        ${step.action.text} <i class="fas fa-arrow-right"></i>
                    </button>
                </div>
            `;
        }
        
        container.style.opacity = '0';
        container.style.transform = 'translateY(20px)';
        setTimeout(() => {
            container.innerHTML = html;
            container.style.opacity = '1';
            container.style.transform = 'translateY(0)';
        }, 300);
    },

    handleOption(next, current) {
        if (current === 'START' && next === 'HAS_ID') {
            if (!App.state.user.completedSteps.includes('register')) {
                App.state.user.isRegistered = true;
                App.state.user.completedSteps.push('register');
                App.saveUserProgress();
            }
        }
        if (current === 'HAS_ID' && next === 'DASHBOARD') {
            if (!App.state.user.completedSteps.includes('id-card')) {
                App.state.user.hasID = true;
                App.state.user.completedSteps.push('id-card');
                App.saveUserProgress();
            }
        }
        this.renderStep(next);
    }
};

