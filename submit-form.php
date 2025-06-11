<?php
// Basic spam prevention and input sanitization
function clean_input($data) {
    return htmlspecialchars(strip_tags(trim($data)));
}

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $name = clean_input($_POST["name"] ?? '');
    $email = filter_var($_POST["email"] ?? '', FILTER_VALIDATE_EMAIL);
    $message = clean_input($_POST["message"] ?? '');

    if (!$name || !$email || !$message) {
        http_response_code(400);
        echo "Please fill out all required fields correctly.";
        exit;
    }

    $to = "admin@thetechtower.com";
    $subject = "New Contact Form Submission from $name";
    $headers = "From: info@thetechtower.com\r\n";
    $headers .= "Reply-To: $email\r\n";
    $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

    $body = "You received a new message via the contact form:\n\n";
    $body .= "Name: $name\n";
    $body .= "Email: $email\n\n";
    $body .= "Message:\n$message\n";

    if (mail($to, $subject, $body, $headers)) {
        echo "Message sent successfully!";
    } else {
        http_response_code(500);
        echo "Message sending failed. Try again later.";
    }
} else {
    http_response_code(405);
    echo "Method Not Allowed.";
}
?>
