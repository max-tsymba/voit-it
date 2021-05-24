<?php

    use PHPMailer\PHPMailer\PHPMailer;
    use PHPMailer\PHPMailer\Exception;

    require './PHPMailer/src/PHPMailer.php';
    require './PHPMailer/src/Exception.php';

    $mail = new PHPMailer(true);
    $mail->CharSet = 'UTF-8';
    $mail->setLanguage('ru', 'phpmailer/language/');
    $mail->isHTML(true);

    $mail->setFrom('macesbeats@gmail.com' ['name']);
    $mail->addAddress('young.bezero@gmail.com');
    $mail->Subject = 'Форма VOIT';

    if(trim(!empty($_POST['name']))) {
        $body.= '<p><strong>Имя: </strong> '.$_POST['name'].'</p>';
    }

    if(trim(!empty($_POST['surname']))) {
        $body.= '<p><strong>Имя: </strong> '.$_POST['surname'].'</p>';
    }

    if(trim(!empty($_POST['email']))) {
        $body.= '<p><strong>Имя: </strong> '.$_POST['email'].'</p>';
    }

    if(trim(!empty($_POST['message']))) {
        $body.= '<p><strong>Имя: </strong> '.$_POST['message'].'</p>';
    }

    $mail->Body = $body;

    if($mail->send()) $message = 'Okay';
    else $message = 'Error';

    $response = ['message' => $message];

    header('Content-type: application/json');
    echo json_encode($response);

?>