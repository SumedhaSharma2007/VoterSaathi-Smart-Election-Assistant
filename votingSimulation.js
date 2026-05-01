const VotingSimulation = {
    currentStep: 0,
    hasID: false,
    nameInList: true,
    
    getSteps() {
        const t = App.translations[App.state.lang];
        return [
            {
                id: 'arrival',
                title: t['sim-arrival-title'],
                description: t['sim-arrival-desc'],
                icon: 'fa-building-columns',
                action: { text: t['sim-next'], next: 1 }
            },
            {
                id: 'id-verification',
                title: t['sim-id-title'],
                description: t['sim-id-desc'],
                icon: 'fa-id-card',
                customRender: (container) => {
                    container.innerHTML += `
                        <div class="glass" style="padding: 1.5rem; margin: 1.5rem 0; text-align: left;">
                            <p style="margin-bottom: 1rem; font-weight: 600;">${t['sim-id-docs']}</p>
                            <ul style="list-style: none; display: grid; grid-template-columns: 1fr 1fr; gap: 0.5rem; font-size: 0.9rem; color: var(--text-muted);">
                                <li><i class="fas fa-check-circle" style="color: var(--secondary);"></i> ${t['sim-id-aadhaar']}</li>
                                <li><i class="fas fa-check-circle" style="color: var(--secondary);"></i> ${t['sim-id-pan']}</li>
                                <li><i class="fas fa-check-circle" style="color: var(--secondary);"></i> ${t['sim-id-dl']}</li>
                                <li><i class="fas fa-check-circle" style="color: var(--secondary);"></i> ${t['sim-id-passport']}</li>
                            </ul>
                        </div>
                        <div style="display: flex; gap: 1rem; justify-content: center; margin-top: 2rem;">
                            <button class="btn btn-primary" onclick="VotingSimulation.handleID(true)">${t['sim-show-id']}</button>
                            <button class="btn btn-outline" onclick="VotingSimulation.handleID(false)">${t['sim-forgot-id']}</button>
                        </div>
                    `;
                }
            },
            {
                id: 'list-check',
                title: t['sim-list-title'],
                description: t['sim-list-desc'],
                icon: 'fa-user-check',
                customRender: (container) => {
                    container.innerHTML += `
                        <div id="list-check-status" style="margin-top: 2rem; min-height: 80px;">
                            <div class="loader" style="margin: 0 auto; width: 30px; height: 30px; border: 3px solid var(--border-color); border-top-color: var(--secondary); border-radius: 50%; animation: spin 1s linear infinite;"></div>
                        </div>
                    `;
                    setTimeout(() => {
                        const status = document.getElementById('list-check-status');
                        if (VotingSimulation.nameInList) {
                            status.innerHTML = `
                                <div style="color: var(--secondary); font-weight: 700; animation: fadeIn 0.5s;">
                                    <i class="fas fa-check-circle"></i> ${t['sim-verified']}
                                </div>
                                <button class="btn btn-primary" style="margin-top: 1.5rem;" onclick="VotingSimulation.nextStep()">${t['sim-proceed-ink']}</button>
                            `;
                        } else {
                            status.innerHTML = `
                                <div style="color: var(--error); font-weight: 700; animation: fadeIn 0.5s;">
                                    <i class="fas fa-times-circle"></i> ${t['sim-not-found']}
                                </div>
                                <p style="font-size: 0.9rem; margin-top: 1rem;">${t['sim-guidance']}</p>
                                <button class="btn btn-outline" style="margin-top: 1.5rem;" onclick="VotingSimulation.reset()">${t['try-again-btn']}</button>
                            `;
                        }
                    }, 2000);
                }
            },
            {
                id: 'ink-marking',
                title: t['sim-ink-title'],
                description: t['sim-ink-desc'],
                icon: 'fa-pen-nib',
                customRender: (container) => {
                    container.innerHTML += `
                        <div class="ink-mark-container">
                            <i class="fas fa-hand-pointer finger-icon"></i>
                            <div class="ink-drop"></div>
                        </div>
                        <button class="btn btn-primary" style="margin-top: 2rem;" onclick="VotingSimulation.nextStep()">${t['sim-go-evm']}</button>
                    `;
                }
            },
            {
                id: 'evm-voting',
                title: t['sim-evm-title'],
                description: t['sim-evm-desc'],
                icon: 'fa-box-archive',
                customRender: (container) => {
                    const candidates = [
                        { name: 'Candidate A', symbol: '☀️' },
                        { name: 'Candidate B', symbol: '🌙' },
                        { name: 'Candidate C', symbol: '⭐' },
                        { name: 'NOTA', symbol: '✖️' }
                    ];
                    container.innerHTML += `
                        <div class="evm-container">
                            ${candidates.map((c, i) => `
                                <div class="evm-row">
                                    <div class="evm-candidate-info">
                                        <div class="evm-symbol">${c.symbol}</div>
                                        <span style="font-weight: 600;">${c.name}</span>
                                    </div>
                                    <div class="evm-light" id="light-${i}"></div>
                                    <button class="evm-btn" id="btn-${i}" onclick="VotingSimulation.castVote(${i}, '${c.name}', '${c.symbol}')"></button>
                                </div>
                            `).join('')}
                        </div>
                        <div id="vvpat-container"></div>
                    `;
                }
            },
            {
                id: 'completion',
                title: t['sim-success-title'],
                description: t['sim-success-desc'],
                icon: 'fa-award',
                customRender: (container) => {
                    container.innerHTML += `
                        <div class="glass" style="padding: 2rem; margin-top: 2rem; background: rgba(20, 184, 166, 0.1); border-color: var(--secondary);">
                            <i class="fas fa-award" style="font-size: 4rem; color: var(--accent); margin-bottom: 1rem;"></i>
                            <h3 style="color: var(--secondary);">${t['sim-badge-earned']}</h3>
                            <p style="margin-top: 1rem;">${t['sim-share']}</p>
                        </div>
                        <button class="btn btn-primary" style="margin-top: 2.5rem;" onclick="App.showSection('dashboard')">${t['sim-back-dash']}</button>
                    `;
                    // Add badge to user profile
                    if (!App.state.user.completedSteps.includes('vote')) {
                        App.state.user.completedSteps.push('vote');
                        App.state.user.badge = 'Responsible Voter';
                        App.saveUserProgress();
                    }
                }
            }
        ];
    },

    init() {
        this.currentStep = 0;
        this.hasID = false;
        this.nameInList = true;
        this.steps = this.getSteps();
    },

    render(container) {
        this.steps = this.getSteps();
        const step = this.steps[this.currentStep];
        container.innerHTML = `
            <div class="card glass" style="animation: slideUp 0.6s ease-out; text-align: center; max-width: 700px; margin: 0 auto; padding: 4rem 2rem;">
                <div style="font-size: 3.5rem; margin-bottom: 2rem; background: linear-gradient(135deg, var(--primary), var(--secondary)); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">
                    <i class="fas ${step.icon}"></i>
                </div>
                <h2 style="margin-bottom: 1rem;">${step.title}</h2>
                <p style="color: var(--text-muted); font-size: 1.1rem; max-width: 500px; margin: 0 auto;">${step.description}</p>
                <div id="sim-content"></div>
                ${step.action ? `<button class="btn btn-primary" style="margin-top: 2rem; padding: 1rem 3rem;" onclick="VotingSimulation.nextStep()">${step.action.text}</button>` : ''}
            </div>
        `;

        if (step.customRender) {
            step.customRender(document.getElementById('sim-content'));
        }
    },

    nextStep() {
        this.currentStep++;
        if (this.currentStep < this.steps.length) {
            this.render(document.getElementById('active-widget'));
        }
    },

    handleID(success) {
        const t = App.translations[App.state.lang];
        if (success) {
            this.hasID = true;
            this.nextStep();
        } else {
            const content = document.getElementById('sim-content');
            content.innerHTML = `
                <div class="glass" style="padding: 1.5rem; margin: 1.5rem 0; background: rgba(239, 68, 68, 0.1); border-color: var(--error); animation: fadeIn 0.5s;">
                    <p style="color: var(--error); font-weight: 700;"><i class="fas fa-exclamation-triangle"></i> ${t['sim-id-req']}</p>
                    <p style="font-size: 0.9rem; color: var(--text-muted); margin-top: 0.5rem;">${t['df-id-help-desc']}</p>
                </div>
                <button class="btn btn-primary" onclick="VotingSimulation.handleID(true)">${t['sim-alt-id']}</button>
            `;
        }
    },

    castVote(index, name, symbol) {
        const t = App.translations[App.state.lang];
        // Deactivate all buttons and show light
        document.querySelectorAll('.evm-btn').forEach(btn => btn.disabled = true);
        const light = document.getElementById(`light-${index}`);
        const btn = document.getElementById(`btn-${index}`);
        light.classList.add('active');
        btn.classList.add('voted');

        // Beep sound simulation (visual)
        const vvpat = document.getElementById('vvpat-container');
        vvpat.innerHTML = `
            <div class="vvpat-window">
                <div style="font-size: 0.8rem; margin-bottom: 0.5rem;">${t['sim-vvpat-printing']}</div>
                <div style="font-size: 1.5rem;">${symbol}</div>
                <div style="font-weight: 700;">${name}</div>
                <div style="font-size: 0.7rem; margin-top: 0.5rem;">${t['sim-vvpat-drop']}</div>
            </div>
        `;

        setTimeout(() => {
            this.nextStep();
        }, 3000);
    },

    reset() {
        this.init();
        this.render(document.getElementById('active-widget'));
    }
};
