/**
 * Contact Form Component
 * Gerencia o formulário de contato com validação e envio
 */
class ContactForm {
    constructor() {
        this.form = document.getElementById('contactForm');
        this.submitBtn = document.getElementById('submitBtn');
        this.submitText = document.getElementById('submitText');
        this.formMessage = document.getElementById('formMessage');
        
        this.init();
    }
    
    init() {
        if (!this.form) return;
        
        this.bindEvents();
    }
    
    bindEvents() {
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
    }
    
    async handleSubmit(e) {
        e.preventDefault();
        
        if (!this.validateForm()) {
            return;
        }
        
        this.setLoadingState(true);
        this.hideMessage();
        
        try {
            const result = await this.submitForm();
            this.handleResponse(result);
        } catch (error) {
            console.error('Form error:', error);
            this.showMessage('error', '❌ Erro de conexão. Verifique sua internet e tente novamente.');
        }
        
        this.setLoadingState(false);
    }
    
    validateForm() {
        const requiredFields = this.form.querySelectorAll('[required]');
        let isValid = true;
        
        requiredFields.forEach(field => {
            field.classList.remove('error');
            if (!field.value.trim()) {
                field.classList.add('error');
                isValid = false;
            }
        });
        
        if (!isValid) {
            this.showMessage('error', '❌ Por favor, preencha todos os campos obrigatórios.');
        }
        
        return isValid;
    }
    
    async submitForm() {
        const formData = new FormData(this.form);
        const isLocal = this.isLocalEnvironment();
        const endpoint = isLocal ? 'contact.php' : 'contact.php';
        
        const response = await fetch(endpoint, {
            method: 'POST',
            body: formData
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        return await response.json();
    }
    
    handleResponse(result) {
        if (result.success) {
            this.showMessage('success', result.message);
            this.resetForm();
            this.autoHideMessage();
        } else {
            this.showMessage('error', result.message);
        }
    }
    
    setLoadingState(isLoading) {
        this.submitBtn.disabled = isLoading;
        
        if (isLoading) {
            this.submitText.innerHTML = `
                <div class="loading-spinner"></div>
                Enviando...
            `;
        } else {
            this.submitText.innerHTML = `
                Enviar mensagem
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <line x1="22" y1="2" x2="11" y2="13"/>
                    <polygon points="22,2 15,22 11,13 2,9 22,2"/>
                </svg>
            `;
        }
    }
    
    showMessage(type, message) {
        if (!this.formMessage) return;
        
        this.formMessage.className = `form-message ${type}`;
        
        const icon = type === 'success' 
            ? '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22,4 12,14.01 9,11.01"/></svg>'
            : '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="m15 9-6 6"/><path d="m9 9 6 6"/></svg>';
        
        this.formMessage.innerHTML = `
            ${icon}
            <div>${message}</div>
        `;
        this.formMessage.style.display = 'flex';
    }
    
    hideMessage() {
        if (this.formMessage) {
            this.formMessage.style.display = 'none';
            this.formMessage.className = 'form-message';
        }
    }
    
    autoHideMessage() {
        setTimeout(() => {
            this.hideMessage();
        }, 8000);
    }
    
    resetForm() {
        setTimeout(() => {
            this.form.reset();
        }, 1000);
    }
    
    isLocalEnvironment() {
        return window.location.hostname === 'localhost' || 
               window.location.hostname === '127.0.0.1' || 
               window.location.hostname === '';
    }
}

export default ContactForm; 