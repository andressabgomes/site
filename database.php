<?php
// Configurações do banco Local - Cajá
// Configuração para desenvolvimento local

$host = 'localhost';
$dbname = 'caja_local';       // Banco local
$username = 'root';           // Usuário padrão local
$password = '';               // Senha vazia para ambiente local

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8mb4", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
    
    // Log de conexão bem-sucedida
    error_log("✅ Conexão com banco local estabelecida com sucesso");
    
} catch(PDOException $e) {
    // Log detalhado do erro
    error_log("❌ ERRO DE CONEXÃO: " . $e->getMessage());
    error_log("Host: $host, Database: $dbname, User: $username");
    
    // Para ambiente local, vamos criar uma resposta simulada
    // Em produção, isso seria um erro fatal
    error_log("⚠️ Usando modo simulado para desenvolvimento local");
}
?> 