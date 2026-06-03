<?php
// send_vk.php
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *"); // Разрешаем CORS, если фронтенд и бэкенд на разных доменах
header("Access-Control-Allow-Headers: Content-Type");

$data = json_decode(file_get_contents('php://input'), true);
if (!$data) $data = $_POST;

if (empty($data['name'])) {
    echo json_encode(["status" => "error", "message" => "Имя не указано"]);
    exit;
}

// НАСТРОЙКИ VK
$vk_token = "vk1.a.ZQRYl90bEOcdSFDylfl9K48HqcU0lxorhFyxCgGf28kh7a3V6dn1ZIUUw22j0RvfddL_5ydO7SHHxbD5gKfgnNJysqqYApuxlamoZr3-F6huO7c8VnvlUTt_9SvHNBDeHl77rS4fl3djL6tdjml8VbBPNpcw7lQJqxp_JueXJabtSLLx5uYK7VbaG2znGAyYMD868PiJPBQGgbVCEcIC0w";
$user_id  = "195078279";

// Формируем текст
$attendance_text = ($data['attendance'] === 'yes') ? "✅ Да, с удовольствием придет!" : "❌ К сожалению, не сможет прийти";

$message = "🥂 Новый ответ на приглашение!\n\n";
$message .= "👤 Имя: " . htmlspecialchars($data['name']) . "\n";
$message .= "❓ Присутствие: " . $attendance_text . "\n";

if (!empty($data['preferences'])) {
    $message .= "🍹 Пожелания/Аллергии: " . htmlspecialchars($data['preferences']) . "\n";
}

$query_data = [
    'user_id'      => $user_id,
    'random_id'    => rand(100000, 999999),
    'message'      => $message,
    'access_token' => $vk_token,
    'v'            => '5.131'
];

$ch = curl_init('https://vk.com');
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($query_data));
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
$response = curl_exec($ch);
curl_close($ch);

$result = json_decode($response, true);

if (isset($result['response'])) {
    echo json_encode(["status" => "success"]);
} else {
    http_response_code(500);
    echo json_encode(["status" => "error", "message" => $result['error']['error_msg'] ?? 'Ошибка ВК']);
}
?>
