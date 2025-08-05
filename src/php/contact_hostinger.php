<?php
// Cajá - Tecnologia Artesanal
// Formulário de contato otimizado para Hostinger

header('Content-Type: application/json; charset=UTF-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

// Log de erros ativo
ini_set('log_errors', 1);
ini_set('error_log', '/tmp/php_errors.log');

// Verificar se é POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Método não permitido']);
    exit;
}

// Incluir configuração do banco
require_once 'config/database.php';

// Função para sanitizar dados
function sanitize_input($data) {
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data, ENT_QUOTES, 'UTF-8');
    return $data;
}

// Validar e sanitizar dados
$name = isset($_POST['name']) ? sanitize_input($_POST['name']) : '';
$email = isset($_POST['email']) ? sanitize_input($_POST['email']) : '';
$company = isset($_POST['company']) ? sanitize_input($_POST['company']) : '';
$service = isset($_POST['service']) ? sanitize_input($_POST['service']) : '';
$message = isset($_POST['message']) ? sanitize_input($_POST['message']) : '';

// Validações melhoradas
$errors = [];

if (empty($name) || strlen($name) < 2) {
    $errors[] = 'Nome é obrigatório e deve ter pelo menos 2 caracteres';
}

if (empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $errors[] = 'Email válido é obrigatório';
}

if (empty($message) || strlen($message) < 10) {
    $errors[] = 'Mensagem é obrigatória e deve ter pelo menos 10 caracteres';
}

// Validação anti-spam básica
if (preg_match('/(http|https|www\.|\.com|\.br|viagra|casino)/i', $message)) {
    $errors[] = 'Mensagem contém conteúdo suspeito';
}

// Verificar se há muitos campos preenchidos rapidamente (bot detection)
$submission_time = time();
if (isset($_POST['timestamp'])) {
    $form_time = intval($_POST['timestamp']);
    if (($submission_time - $form_time) < 5) {
        $errors[] = 'Envio muito rápido. Aguarde alguns segundos e tente novamente.';
    }
}

if (!empty($errors)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => implode(', ', $errors)]);
    exit;
}

// Mapear serviços
$service_names = [
    'mvp' => 'MVP Rápido',
    'software' => 'Software Personalizado', 
    'gestao' => 'Gestão de Produtos Digitais',
    'treinamento' => 'Treinamentos Práticos',
    'consultoria' => 'Consultoria',
    'outro' => 'Outro'
];

$service_display = isset($service_names[$service]) ? $service_names[$service] : ($service ?: 'Não especificado');
$company_display = $company ?: 'Não informado';

try {
    // Inserir no banco de dados
    $stmt = $pdo->prepare("
        INSERT INTO contacts (name, email, company, service, message, ip_address, user_agent) 
        VALUES (:name, :email, :company, :service, :message, :ip_address, :user_agent)
    ");
    
    $result = $stmt->execute([
        ':name' => $name,
        ':email' => $email,
        ':company' => $company_display,
        ':service' => $service_display,
        ':message' => $message,
        ':ip_address' => $_SERVER['REMOTE_ADDR'] ?? 'unknown',
        ':user_agent' => $_SERVER['HTTP_USER_AGENT'] ?? 'unknown'
    ]);
    
    if ($result) {
        // Log de sucesso
        error_log("NOVO CONTATO: $name - $email - " . date('Y-m-d H:i:s'));
        
        // Resposta de sucesso
        echo json_encode([
            'success' => true,
            'message' => '🎉 Perfeito! Sua mensagem foi enviada com sucesso! Nossa equipe da Cajá recebeu sua solicitação e entrará em contato em até 24 horas. Muito obrigado pelo interesse!',
            'contact_id' => $pdo->lastInsertId()
        ]);
        
        // Opcional: Enviar email de notificação
        // mail('andressa@cajait.com', 'Novo contato do site', $message_content);
        
    } else {
        throw new Exception('Erro ao salvar no banco de dados');
    }
    
} catch (Exception $e) {
    // Log do erro
    error_log("ERRO FORMULÁRIO: " . $e->getMessage());
    
    // Resposta de erro
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => '❌ Erro interno do servidor. Nossa equipe foi notificada. Por favor, tente novamente em alguns minutos ou entre em contato via WhatsApp: (85) 99217-6713'
    ]);
}
?>