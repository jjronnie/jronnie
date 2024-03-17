<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Get form data
    $name = $_POST['name'];
    $email = $_POST['email'];
    $message = $_POST['message'];
    
    // Set up email
    $to = "kclich@hotmail.com"; // Email to which the message will be sent
    $subject = "New Message from Contact Form"; // Subject of the email
    
    // Compose the email message
    $email_message = "Name: $name\n";
    $email_message .= "Email: $email\n\n";
    $email_message .= "Message:\n$message\n";
    
    // Set headers
    $headers = "From: $name <$email>\r\n";
    $headers .= "Reply-To: $email\r\n";
    
    // Send email
    if (mail($to, $subject, $email_message, $headers)) {
        echo "<p>Thank you for your message, I will get back to you as soon as possible.</p>";
    } else {
        echo "<p>Oops! Something went wrong. Please try again.</p>";
    }
} else {
    echo "<p>Invalid request. Please submit the form.</p>";
}
?>
