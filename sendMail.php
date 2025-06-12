<?php
// Allow requests from anywhere (adjust if needed for security)
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

// Get POST data
$data = json_decode(file_get_contents("php://input"));

$name = $data->name ?? '';
$email = $data->email ?? '';
$subject = $data->subject ?? 'New Contact Message';
$message = $data->message ?? '';

$to = "ronaldjjuuko7@gmail.com";
$headers = "From: $email\r\n";
$headers .= "Reply-To: $email\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

$body = "You received a new message from your website:\n\n";
$body .= "Name: $name\n";
$body .= "Email: $email\n";
$body .= "Subject: $subject\n";
$body .= "Message:\n$message\n";

if (mail($to, $subject, $body, $headers)) {
  echo json_encode(["success" => true, "message" => "Mail sent"]);
} else {
  http_response_code(500);
  echo json_encode(["success" => false, "message" => "Mail failed to send"]);
}
?>
