-- Cajá - Tecnologia Artesanal
-- SQL para criar tabela no Hostinger

-- Execute este SQL no painel do Hostinger: hPanel > Banco de dados > phpMyAdmin

CREATE TABLE IF NOT EXISTS contacts (
    id INT(11) AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    company VARCHAR(255) DEFAULT NULL,
    service VARCHAR(100) DEFAULT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    ip_address VARCHAR(45) DEFAULT NULL,
    user_agent TEXT DEFAULT NULL,
    INDEX idx_email (email),
    INDEX idx_created_at (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Verificar se tabela foi criada
SELECT COUNT(*) as total_contacts FROM contacts;

-- Inserir contato de teste (opcional)
INSERT INTO contacts (name, email, company, service, message, ip_address, user_agent) 
VALUES (
    'Teste Hostinger', 
    'teste@hostinger.com', 
    'Teste Company', 
    'MVP Rápido', 
    'Este é um contato de teste para verificar se tudo está funcionando no Hostinger.', 
    '127.0.0.1', 
    'Mozilla/5.0 (Test Browser)'
);

-- Consultar todos os contatos
SELECT * FROM contacts ORDER BY created_at DESC;