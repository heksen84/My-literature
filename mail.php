<?php
 mail($_GET["mail"], 'the subject', 'the message', null,
   'no-reply@my-literature.com');
?>