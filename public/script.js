// Pipeline status simulator
const statuses = ['Building', 'Testing', 'Deploying', 'Success'];
let currentStatus = 0;

// Add pipeline status indicator
function createStatusIndicator() {
    const statusDiv = document.createElement('div');
    statusDiv.className = 'status-indicator';
    statusDiv.innerHTML = `
        <div class="status-content">
            <span class="status-icon">⚡</span>
            <span class="status-text">Pipeline Status: <strong>Idle</strong></span>
            <div class="status-bar">
                <div class="status-progress"></div>
            </div>
        </div>
    `;
    document.querySelector('.card').appendChild(statusDiv);
}

// Add stats counter
function createStatsCounter() {
    const statsDiv = document.createElement('div');
    statsDiv.className = 'stats-container';
    statsDiv.innerHTML = `
        <div class="stat-item">
            <div class="stat-number" data-target="1247">0</div>
            <div class="stat-label">Deployments</div>
        </div>
        <div class="stat-item">
            <div class="stat-number" data-target="99.9">0</div>
            <div class="stat-label">Uptime %</div>
        </div>
        <div class="stat-item">
            <div class="stat-number" data-target="3.2">0</div>
            <div class="stat-label">Avg Build Time (min)</div>
        </div>
    `;
    document.querySelector('.subtitle').after(statsDiv);
}

// Animate numbers
function animateNumbers() {
    const numbers = document.querySelectorAll('.stat-number');
    numbers.forEach(num => {
        const target = parseFloat(num.getAttribute('data-target'));
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;

        const timer = setInterval(() => {
            current += step;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            num.textContent = target % 1 === 0 ? Math.floor(current) : current.toFixed(1);
        }, 16);
    });
}

// Simulate pipeline execution
function runPipeline() {
    const statusText = document.querySelector('.status-text strong');
    const statusIcon = document.querySelector('.status-icon');
    const progress = document.querySelector('.status-progress');
    
    currentStatus = 0;
    progress.style.width = '0%';
    
    const interval = setInterval(() => {
        if (currentStatus < statuses.length) {
            statusText.textContent = statuses[currentStatus];
            progress.style.width = ((currentStatus + 1) / statuses.length * 100) + '%';
            
            // Update icon based on status
            if (statuses[currentStatus] === 'Success') {
                statusIcon.textContent = '✅';
                progress.style.background = 'linear-gradient(90deg, #10b981, #059669)';
            } else {
                statusIcon.textContent = '⚡';
                progress.style.background = 'linear-gradient(90deg, #667eea, #764ba2)';
            }
            
            currentStatus++;
        } else {
            clearInterval(interval);
            setTimeout(() => {
                statusText.textContent = 'Idle';
                statusIcon.textContent = '⚡';
                progress.style.width = '0%';
            }, 2000);
        }
    }, 1500);
}

// Feature card interactions
function setupFeatureCards() {
    const features = document.querySelectorAll('.feature');
    features.forEach((feature, index) => {
        feature.addEventListener('click', () => {
            feature.style.animation = 'none';
            setTimeout(() => {
                feature.style.animation = 'bounce 0.5s ease';
            }, 10);
        });

        // Stagger animation on load
        feature.style.animation = `slideUp 0.8s ease-out ${0.2 * (index + 1)}s both`;
    });
}

// CTA button interaction
function setupCTAButton() {
    const ctaButton = document.querySelector('.cta-button');
    ctaButton.addEventListener('click', (e) => {
        e.preventDefault();
        runPipeline();
        
        // Add ripple effect
        const ripple = document.createElement('span');
        ripple.className = 'ripple';
        ctaButton.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    });
}

// Particle effect on mouse move
function createParticle(x, y) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.left = x + 'px';
    particle.style.top = y + 'px';
    document.body.appendChild(particle);
    
    setTimeout(() => particle.remove(), 1000);
}

let lastParticleTime = 0;
document.addEventListener('mousemove', (e) => {
    const now = Date.now();
    if (now - lastParticleTime > 100) {
        createParticle(e.clientX, e.clientY);
        lastParticleTime = now;
    }
});

// Initialize everything
document.addEventListener('DOMContentLoaded', () => {
    createStatsCounter();
    createStatusIndicator();
    setupFeatureCards();
    setupCTAButton();
    
    // Animate numbers after a short delay
    setTimeout(animateNumbers, 500);
});

// Add additional styles dynamically
const style = document.createElement('style');
style.textContent = `
    .stats-container {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 30px;
        margin: 40px 0;
        padding: 30px;
        background: linear-gradient(135deg, rgba(102, 126, 234, 0.05) 0%, rgba(118, 75, 162, 0.05) 100%);
        border-radius: 16px;
    }

    .stat-item {
        text-align: center;
    }

    .stat-number {
        font-size: 2.5rem;
        font-weight: 800;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
    }

    .stat-label {
        color: #666;
        font-size: 0.9rem;
        margin-top: 8px;
    }

    .status-indicator {
        margin-top: 40px;
        padding: 20px;
        background: white;
        border-radius: 12px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    }

    .status-content {
        display: flex;
        align-items: center;
        gap: 15px;
        flex-wrap: wrap;
    }

    .status-icon {
        font-size: 1.5rem;
    }

    .status-text {
        color: #333;
        font-size: 1rem;
        flex: 1;
        min-width: 200px;
    }

    .status-bar {
        flex: 1;
        min-width: 200px;
        height: 8px;
        background: #e5e7eb;
        border-radius: 4px;
        overflow: hidden;
    }

    .status-progress {
        height: 100%;
        width: 0%;
        background: linear-gradient(90deg, #667eea, #764ba2);
        transition: width 0.5s ease;
        border-radius: 4px;
    }

    @keyframes bounce {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-10px); }
    }

    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        width: 20px;
        height: 20px;
        animation: ripple-effect 0.6s ease-out;
        pointer-events: none;
    }

    @keyframes ripple-effect {
        to {
            transform: scale(10);
            opacity: 0;
        }
    }

    .cta-button {
        position: relative;
        overflow: hidden;
    }

    .particle {
        position: fixed;
        width: 4px;
        height: 4px;
        background: rgba(255, 255, 255, 0.6);
        border-radius: 50%;
        pointer-events: none;
        animation: particle-fade 1s ease-out forwards;
        z-index: 9999;
    }

    @keyframes particle-fade {
        0% {
            transform: translate(0, 0) scale(1);
            opacity: 1;
        }
        100% {
            transform: translate(var(--tx, 20px), var(--ty, 20px)) scale(0);
            opacity: 0;
        }
    }

    @media (max-width: 768px) {
        .stats-container {
            grid-template-columns: 1fr;
            gap: 20px;
        }

        .status-content {
            flex-direction: column;
            align-items: flex-start;
        }

        .status-bar {
            width: 100%;
        }
    }
`;
document.head.appendChild(style);