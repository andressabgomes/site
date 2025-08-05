<?php
// Configurações do banco Hostinger - Cajá
// Credenciais completas configuradas

$host = 'localhost';
$dbname = 'u921347543_bdprod';       // ✅ Banco configurado
$username = 'u921347543_andressa';   // ✅ Usuário configurado  
$password = 'Aa200200229*';          // ✅ Senha configurada

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8mb4", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
    
    // Log de conexão bem-sucedida
    error_log("✅ Conexão com banco u921347543_bdprod estabelecida com sucesso");
    
} catch(PDOException $e) {
    // Log detalhado do erro
    error_log("❌ ERRO DE CONEXÃO: " . $e->getMessage());
    error_log("Host: $host, Database: $dbname, User: $username");
    
    // Não expor detalhes do banco em produção
    die("Erro de conexão com o banco de dados. Entre em contato com o suporte.");
}

// Verificar se tabela existe
try {
    $stmt = $pdo->query("DESCRIBE contacts");
    error_log("✅ Tabela 'contacts' encontrada no banco u921347543_bdprod");
} catch(PDOException $e) {
    error_log("❌ TABELA 'contacts' NÃO ENCONTRADA: " . $e->getMessage());
    error_log("💡 Execute o SQL create_table.sql no phpMyAdmin para criar a tabela");
}
?>