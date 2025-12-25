
const app = {
    state: {
        currentPage: 'home',
        uploadedImages: [],
        selectedGoal: null,
        isAnalyzing: false,
        analysisStep: 0,
    },

    init() {
        this.render();
        this.attachEventListeners();
    },

    setState(newState) {
        this.state = { ...this.state, ...newState };
        this.render();
    },

    render() {
        const root = document.getElementById('app');
        
        if (this.state.currentPage === 'home') {
            root.innerHTML = this.renderHome();
        } else if (this.state.currentPage === 'wizard') {
            root.innerHTML = this.renderWizard();
        }

        this.attachEventListeners();
    },

    renderHome() {
        return `
            <header>
                <div class="header-content">
                    <a href="#" class="logo" onclick="app.setState({currentPage: 'home'})">
                        <svg fill="currentColor" viewBox="0 0 24 24"><path d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
                        FitScan AI
                    </a>
                    <nav id="nav">
                        <a href="#features">Features</a>
                        <a href="#how-it-works">How It Works</a>
                        <a href="#goals">Goals</a>
                    </nav>
                    <div class="header-actions">
                        <button class="btn btn-primary" onclick="app.setState({currentPage: 'wizard'})">Start Scan</button>
                        <button class="menu-toggle" id="menu-toggle">
                            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/></svg>
                        </button>
                    </div>
                </div>
            </header>

            <main>
                <!-- Hero Section -->
                <section class="hero">
                    <div class="hero-background"></div>
                    <div class="container">
                        <div class="hero-content">
                            <div class="hero-badge">
                                <svg fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>
                                AI-Powered Body Analysis
                            </div>
                            <h1>Transform Your Body with <span style="color: #60a5fa;">Personalized AI</span> Workouts</h1>
                            <p class="hero-subtitle">Upload your photo, share your dream physique, and let our AI create a customized workout plan designed for maximum results.</p>
                            <div class="hero-buttons">
                                <button class="btn btn-primary" onclick="app.setState({currentPage: 'wizard'})">
                                    Scan Your Body
                                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"/></svg>
                                </button>
                                <button class="btn btn-outline" onclick="document.getElementById('features').scrollIntoView({behavior:'smooth'})">See How It Works</button>
                            </div>
                            <div class="hero-trust">
                                <div class="trust-item">
                                    <div class="trust-dot"></div>
                                    <span>Powered by AI</span>
                                </div>
                                <div class="trust-item">
                                    <div class="trust-dot"></div>
                                    <span>10,000+ Transformations</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <!-- Features Section -->
                <section class="features" id="features">
                    <div class="container">
                        <div class="section-header">
                            <h2>Everything You Need to Transform</h2>
                            <p>Our AI-powered platform provides comprehensive tools to help you achieve your dream physique.</p>
                        </div>
                        <div class="features-grid">
                            ${this.renderFeatureCards()}
                        </div>
                    </div>
                </section>

                <!-- How It Works Section -->
                <section class="how-it-works" id="how-it-works">
                    <div class="container">
                        <div class="section-header">
                            <h2>How It Works</h2>
                            <p>Transform your body in four simple steps with our AI-powered fitness coach.</p>
                        </div>
                        <div class="steps-grid">
                            ${this.renderStepCards()}
                        </div>
                    </div>
                </section>

                <!-- Goals Section -->
                <section class="goals" id="goals">
                    <div class="container">
                        <div class="section-header">
                            <h2>Choose Your Dream Physique</h2>
                            <p>Select the physique goal that matches your aspirations and we'll create a plan to get you there.</p>
                        </div>
                        <div class="goals-grid">
                            ${this.renderGoalCards()}
                        </div>
                    </div>
                </section>
            </main>

            <footer>
                <div class="container">
                    <div class="footer-grid">
                        <div>
                            <div class="logo" style="margin-bottom: 16px;">
                                <svg fill="currentColor" viewBox="0 0 24 24"><path d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
                                FitScan AI
                            </div>
                            <p style="color: var(--muted-foreground); font-size: 14px; max-width: 300px;">Transform your body with AI-powered personalized workout plans. Our advanced technology analyzes your physique and creates custom training programs for maximum results.</p>
                        </div>
                        <div>
                            <div class="footer-section">
                                <h4>Quick Links</h4>
                                <ul>
                                    <li><a href="#features">Features</a></li>
                                    <li><a href="#how-it-works">How It Works</a></li>
                                    <li><a href="#goals">Goals</a></li>
                                </ul>
                            </div>
                        </div>
                        <div>
                            <div class="footer-section">
                                <h4>Legal</h4>
                                <ul>
                                    <li><a href="#">Privacy Policy</a></li>
                                    <li><a href="#">Terms of Service</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div class="footer-bottom">
                        <p>2024 FitScan AI. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        `;
    },

    renderWizard() {
        let wizardContent = '';
        const step = this.state.wizardStep || 1;

        if (step === 1) {
            wizardContent = `
                <div class="wizard-card">
                    <div class="wizard-card-header">
                        <h2>Upload Your Photos</h2>
                        <p class="wizard-card-subtitle">Our AI will analyze your current physique to create a personalized plan</p>
                    </div>
                    ${this.renderUploader()}
                    <div class="wizard-footer">
                        <button class="btn btn-secondary" onclick="app.setState({currentPage: 'home'})">Cancel</button>
                        <button class="btn btn-primary" id="next-step1" disabled>Continue</button>
                    </div>
                </div>
            `;
        } else if (step === 2) {
            wizardContent = `
                <div class="wizard-card">
                    <div class="wizard-card-header">
                        <h2>Select Your Goal</h2>
                        <p class="wizard-card-subtitle">Choose the physique you want to achieve</p>
                    </div>
                    <div class="goals-grid">
                        ${this.renderGoalCardsForWizard()}
                    </div>
                    <div class="wizard-footer">
                        <button class="btn btn-secondary" onclick="app.setState({wizardStep: 1})">Back</button>
                        <button class="btn btn-primary" id="next-step2" disabled>Generate Plan</button>
                    </div>
                </div>
            `;
        } else if (step === 3) {
            wizardContent = this.renderAnalysisProgress();
        } else if (step === 4) {
            wizardContent = this.renderWorkoutPlan();
        }

        return `
            <div class="wizard">
                <div class="wizard-container">
                    ${step < 4 ? `
                        <div class="wizard-header">
                            <div class="wizard-progress">
                                <span>Step ${step} of 4</span>
                                <button class="btn btn-ghost btn-sm" onclick="app.setState({currentPage: 'home'})">Cancel</button>
                            </div>
                            <div class="progress-bar">
                                <div class="progress-fill" style="width: ${(step / 4) * 100}%"></div>
                            </div>
                        </div>
                    ` : ''}
                    ${wizardContent}
                </div>
            </div>
        `;
    },

    renderUploader() {
        return `
            <div class="uploader-zone" id="uploader-zone">
                <div class="uploader-icon">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/></svg>
                </div>
                <div class="uploader-title">Upload Your Body Photos</div>
                <div class="uploader-desc">Upload up to 3 photos (front, side, back) for the most accurate AI analysis</div>
                <div class="uploader-buttons">
                    <button class="btn btn-primary" id="upload-btn">
                        <svg fill="currentColor" viewBox="0 0 24 24"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/></svg>
                        Choose Photos
                    </button>
                    <button class="btn btn-outline" id="camera-btn">
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"/></svg>
                        Take Photo
                    </button>
                </div>
                <input type="file" id="file-input" accept="image/*" multiple style="display: none;">
                <input type="file" id="camera-input" accept="image/*" capture="user" style="display: none;">
            </div>
            ${this.state.uploadedImages.length > 0 ? `
                <div class="image-preview">
                    ${this.state.uploadedImages.map((img, idx) => `
                        <div class="preview-item">
                            <img src="${img}" alt="Preview ${idx + 1}">
                            <div class="preview-label">${['Front', 'Side', 'Back'][idx] || 'Photo'}</div>
                            <button class="preview-remove" onclick="app.removeImage(${idx})">×</button>
                        </div>
                    `).join('')}
                </div>
            ` : ''}
        `;
    },

    renderAnalysisProgress() {
        const steps = [
            { label: 'Scanning body composition' },
            { label: 'Analyzing muscle groups' },
            { label: 'Generating workout plan' },
            { label: 'Complete!' },
        ];

        return `
            <div style="max-width: 500px; margin: 0 auto;">
                <div class="progress-container">
                    <div class="progress-icon">
                        <svg fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>
                    </div>
                    <div class="progress-title">AI Analysis in Progress</div>
                    <div class="progress-subtitle">Our AI is analyzing your photos and creating your personalized plan</div>
                    <div class="progress-bar">
                        <div class="progress-fill" id="analysis-bar" style="width: 0%"></div>
                    </div>
                    <div class="progress-steps" id="progress-steps">
                        ${steps.map((step, idx) => `
                            <div class="progress-step ${idx <= this.state.analysisStep ? 'active' : ''}">
                                <div class="step-indicator ${idx < this.state.analysisStep ? 'complete' : idx === this.state.analysisStep ? 'active' : 'pending'}">
                                    ${idx < this.state.analysisStep ? '✓' : idx + 1}
                                </div>
                                <div class="step-label">${step.label}</div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        `;
    },

    renderWorkoutPlan() {
        const plan = [
            { day: 'Monday', name: 'Push Day - Chest & Shoulders', duration: '55 min', exercises: [
                { name: 'Barbell Bench Press', sets: 4, reps: '8-10', rest: '90s', muscles: ['Chest'] },
                { name: 'Incline Press', sets: 3, reps: '10-12', rest: '60s', muscles: ['Upper Chest'] },
                { name: 'Overhead Press', sets: 4, reps: '8-10', rest: '90s', muscles: ['Shoulders'] },
            ]},
            { day: 'Tuesday', name: 'Pull Day - Back & Biceps', duration: '50 min', exercises: [
                { name: 'Pull-ups', sets: 4, reps: '6-8', rest: '90s', muscles: ['Back'] },
                { name: 'Barbell Rows', sets: 4, reps: '8-10', rest: '90s', muscles: ['Back'] },
                { name: 'Bicep Curls', sets: 3, reps: '10-12', rest: '45s', muscles: ['Biceps'] },
            ]},
            { day: 'Wednesday', name: 'Rest & Recovery', duration: '-', isRest: true },
            { day: 'Thursday', name: 'Legs - Quads & Glutes', duration: '60 min', exercises: [
                { name: 'Barbell Squats', sets: 4, reps: '8-10', rest: '120s', muscles: ['Quads'] },
                { name: 'Romanian Deadlifts', sets: 4, reps: '10-12', rest: '90s', muscles: ['Hamstrings'] },
                { name: 'Leg Press', sets: 3, reps: '12-15', rest: '60s', muscles: ['Quads'] },
            ]},
            { day: 'Friday', name: 'Upper Body Hypertrophy', duration: '50 min', exercises: [
                { name: 'Dumbbell Bench Press', sets: 4, reps: '10-12', rest: '60s', muscles: ['Chest'] },
                { name: 'Cable Rows', sets: 4, reps: '10-12', rest: '60s', muscles: ['Back'] },
                { name: 'Arnold Press', sets: 3, reps: '10-12', rest: '60s', muscles: ['Shoulders'] },
            ]},
            { day: 'Saturday', name: 'Lower Body & Core', duration: '55 min', exercises: [
                { name: 'Deadlifts', sets: 4, reps: '6-8', rest: '120s', muscles: ['Back', 'Glutes'] },
                { name: 'Hip Thrusts', sets: 4, reps: '10-12', rest: '90s', muscles: ['Glutes'] },
                { name: 'Planks', sets: 3, reps: '45-60s', rest: '30s', muscles: ['Core'] },
            ]},
            { day: 'Sunday', name: 'Active Recovery', duration: '-', isRest: true },
        ];

        return `
            <div class="wizard-card">
                <div class="plan-header">
                    <div class="plan-info">
                        <h2>Your Personalized Workout Plan</h2>
                        <p>Optimized for: ${this.state.selectedGoal || 'Muscle Gain'}</p>
                    </div>
                    <div class="plan-actions">
                        <button class="btn btn-secondary btn-sm" onclick="alert('Download feature coming soon!')">
                            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/></svg>
                            Download
                        </button>
                        <button class="btn btn-ghost btn-sm" onclick="app.setState({currentPage: 'home'})">
                            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/></svg>
                            New Scan
                        </button>
                    </div>
                </div>
                <div class="workout-grid">
                    ${plan.map((day, idx) => `
                        <div class="workout-day ${day.isRest ? 'rest-day' : ''}">
                            <div class="workout-header">
                                <div>
                                    <div class="workout-day-badge">${day.day}</div>
                                    <h3>${day.name}</h3>
                                </div>
                            </div>
                            ${day.isRest ? `
                                <p class="rest-day-message">Rest and recovery day. Focus on light stretching, hydration, and proper nutrition.</p>
                            ` : `
                                <div class="workout-duration">
                                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" style="width: 16px; height: 16px;"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 2m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                                    ${day.duration}
                                </div>
                                <div class="exercise-list">
                                    ${day.exercises.map(ex => `
                                        <div class="exercise">
                                            <h4>${ex.name}</h4>
                                            <div class="exercise-meta">
                                                <span>🔄 ${ex.sets} sets</span>
                                                <span>⏱️ ${ex.reps} reps</span>
                                                <span>⏸️ ${ex.rest}</span>
                                            </div>
                                            ${ex.muscles.map(m => `<span class="exercise-badge">${m}</span>`).join('')}
                                        </div>
        