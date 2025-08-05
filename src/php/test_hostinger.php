<?php
// Teste de funcionamento no Hostinger
// Execute este arquivo para verificar se tudo está OK
// URL: https://seudominio.com/test_hostinger.php

echo "<h1>🧪 Teste Hostinger - Cajá</h1>";

// 1. Teste de PHP
echo "<h2>1. ✅ PHP Funcionando</h2>";
echo "Versão PHP: " . phpversion() . "<br>";
echo "Data/Hora: " . date('Y-m-d H:i:s') . "<br>";

// 2. Teste de extensões necessárias
echo "<h2>2. Extensões PHP</h2>";
$extensions = ['pdo', 'pdo_mysql', 'json', 'curl'];
foreach ($extensions as $ext) {
    $status = extension_loaded($ext) ? '✅' : '❌';
    echo "$status $ext<br>";
}

// 3. Teste de conexão com banco
echo "<h2>3. Teste de Banco de Dados</h2>";
try {
    // Tente incluir o arquivo de configuração
    if (file_exists('config/database.php')) {
        include 'config/database.php';
        echo "✅ Arquivo de configuração encontrado<br>";
        
        // Teste a conexão
        $stmt = $pdo->query("SELECT 1");
        echo "✅ Conexão com banco OK<br>";
        
        // Teste se tabela existe
        $stmt = $pdo->query("DESCRIBE contacts");
        echo "✅ Tabela 'contacts' existe<br>";
        
        // Contar registros
        $stmt = $pdo->query("SELECT COUNT(*) as total FROM contacts");
        $count = $stmt->fetch()['total'];
        echo "📊 Total de contatos: $count<br>";
        
    } else {
        echo "❌ Arquivo config/database.php não encontrado<br>";
    }
    
} catch (Exception $e) {
    echo "❌ Erro: " . $e->getMessage() . "<br>";
}

// 4. Teste de permissões de arquivos
echo "<h2>4. Permissões de Arquivos</h2>";
$files = ['index.html', 'style.css', 'script.js', 'contact.php'];
foreach ($files as $file) {
    if (file_exists($file)) {
        $perms = substr(sprintf('%o', fileperms($file)), -4);
        echo "✅ $file - Permissões: $perms<br>";
    } else {
        echo "❌ $file - Arquivo não encontrado<br>";
    }
}

// 5. Teste de configurações do servidor
echo "<h2>5. Configurações do Servidor</h2>";
echo "Servidor: " . $_SERVER['SERVER_SOFTWARE'] . "<br>";
echo "Método: " . $_SERVER['REQUEST_METHOD'] . "<br>";
echo "HTTPS: " . (isset($_SERVER['HTTPS']) ? '✅ Ativo' : '❌ Inativo') . "<br>";

// 6. Teste de formulário (se POST)
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    echo "<h2>6. Teste de Formulário</h2>";
    echo "✅ Dados POST recebidos:<br>";
    foreach ($_POST as $key => $value) {
        echo "$key: " . htmlspecialchars($value) . "<br>";
    }
}

echo "<hr>";
echo "<h2>🚀 Próximos Passos</h2>";
echo "<p>1. Configure as credenciais do banco em config/database.php</p>";
echo "<p>2. Execute o SQL create_table.sql no phpMyAdmin</p>";
echo "<p>3. Teste o formulário de contato</p>";
echo "<p>4. ⚠️ <strong>REMOVA ESTE ARQUIVO após os testes!</strong></p>";

echo "<hr>";
echo "<p><small>Teste executado em: " . date('Y-m-d H:i:s') . "</small></p>";
?>