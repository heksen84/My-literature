<!---------------------------- 
 Ilya Bobkov 2017(c) 
------------------------------>
<?php if (isset($_GET["rec_id"])) echo "<script>localStorage.setItem('rec_id','".$_GET["rec_id"]."');</script>"; ?>
<!DOCTYPE html>
<html lang="ru">
<head>
<title>Литературный портал МОЯ ЛИТЕРАТУРА&reg (стихи, книги, прозы, рассказы)</title>
<link rel="shortcut icon" href="../favicon.ico" type="image/x-icon">
<meta charset = "utf-8">
<meta name = "viewport" 	content	= "width=device-width"/>
<meta name = "description" 	content = "литературный ресурс"/>
<meta name = "keywords"    	content = "стихи, книги, рассказы, сказки, поэмы, статьи, писатель, поэт"/>
<meta name = "robots" 	   	content = "index, follow"/>
<meta name = "viewport" 	content = "width=device-width, initial-scale=1, shrink-to-fit=no">
<!-- styles -->
<link href = "pages/css/lib/bootstrap.min.css"	     	rel = "stylesheet"/>
<link href = "pages/css/lib/tether.min.css"		     	rel = "stylesheet"/>
<link href = "pages/css/lib/sweet-alert.css"   			rel	= "stylesheet"/>
<link href = "pages/css/lib/scroll.css"	             	rel = "stylesheet"/>
<link href = "pages/css/lib/nprogress.css"			   	rel = "stylesheet">
<link href = "pages/css/index.css?<?php echo time()?>" 	rel	= "stylesheet"/>
<!-- libs -->
<script src = "pages/js/lib/jquery-3.2.1.min.js"></script>
<script src = "pages/js/lib/tether.min.js"></script>
<script src = "pages/js/lib/bootstrap.min.js"></script>
<script src = "pages/js/lib/sweet-alert.min.js"></script>      
<script src = "pages/js/lib/jquery.util.js?<?php echo time()?>"></script>  
<script src = "pages/js/lib/jquery.msg.js"></script>          
<script src = "pages/js/lib/jquery.float.js"></script>          
<script src = "pages/js/lib/nprogress.js"></script>
<script src = "pages/js/lib/moment.min.js"></script>
<script src = "pages/js/index.js?<?php echo time()?>"></script>
</head>
<body>
<div class="container-fluid">
<a class="nav-link active" href="#" id="reader_auth_link">ВХОД</a>
<? include "pages/auth_reg_form.php" ?>
<!-- контент -->
<div class="row" id="main_row">	
	<div class="col-md-12 text-center" id="main_col">		
	<h1 id="title">МОЯ ЛИТЕРАТУРА<span id="reg">&reg;</span></h1>
	<div id="desc">литературный портал</div>
	<hr class="small_line">	
	</div>
	<div class="col-md-12 text-center" id="categories_column">
	<table class="table table-bordered table-hover" id="table">	
  	<tbody id="tbody"></tbody>
	</table>
	</div>
</div>
<div class="row no-display" id="alert_opros">
<div class="col-md-12 text-center">
<div class="alert alert-success" role="alert">
Благодарим Вас за использование сервиса. Это поможет нам в дальнейшем.
<button type="button" class="btn btn-success" style="margin-top:10px">заполнить форму</button>
</div>
</div>
</div>
</body>