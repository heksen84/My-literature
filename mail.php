<?php
include "php/class.mail.php";

$mail = new Mail("no-reply@my-literature.com");
$mail->setFromName("Моя литература");
$mail->send($_GET["mail"], "Данные регистрации в портале МОЯ ЛИТЕРАТУРА", "!!!");

?>