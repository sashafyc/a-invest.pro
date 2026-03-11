<?php
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: https://a-invest.pro');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') { http_response_code(204); exit; }
if ($_SERVER['REQUEST_METHOD'] !== 'POST') { echo json_encode(['success' => false, 'error' => 'Method not allowed']); exit; }

$phone    = trim($_POST['phone'] ?? '');
$page     = trim($_POST['page'] ?? '');
$utm      = trim($_POST['utm'] ?? '');
$referrer = trim($_POST['referrer'] ?? '');

if (!preg_match('/\d{10,}/', preg_replace('/\D/', '', $phone))) {
    echo json_encode(['success' => false, 'error' => 'Invalid phone']);
    exit;
}

$to      = 'ain@a-invest.pro';
$subject = 'Новая заявка на экспресс-оценку — A-Invest';
$body    = "Телефон: $phone\nСтраница: $page\nUTM: $utm\nОткуда пришёл: $referrer\nВремя: " . date('d.m.Y H:i:s');
$headers = "From: noreply@a-invest.pro\r\nContent-Type: text/plain; charset=utf-8";

if (mail($to, $subject, $body, $headers)) {
    echo json_encode(['success' => true]);
} else {
    echo json_encode(['success' => false, 'error' => 'Mail error']);
}
