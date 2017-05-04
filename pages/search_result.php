<!---------------------------- 
 Ilya Bobkov 2017(c) 
------------------------------>
<!DOCTYPE html>
<html lang="ru">
<head>
<title>Литературный ресурс THE-TEXTS&reg (стихи, книги, прозы, рассказы)</title>
<link rel="shortcut icon" href="../favicon.ico" type="image/x-icon">
<meta charset = "utf-8">
<meta name = "viewport" 	content	= "width=device-width"/>
<meta name = "description" 	content = "литературный ресурс"/>
<meta name = "keywords"    	content = "стихи, книги, рассказы, сказки, поэмы, статьи, писатель, поэт"/>
<meta name = "robots" 	   	content = "index, follow"/>
<meta name = "viewport" 	content = "width=device-width, initial-scale=1, shrink-to-fit=no">
<!-- styles -->
<link href = "css/lib/bootstrap.min.css"	     			rel = "stylesheet"/>
<link href = "css/lib/tether.min.css"		     			rel = "stylesheet"/>
<link href = "css/lib/sweet-alert.css"   					rel	= "stylesheet"/>
<link href = "css/lib/scroll.css"	             			rel = "stylesheet"/>
<link href = "css/lib/nprogress.css"			   			rel = "stylesheet">
<link href = "css/search_result.css?<?php echo time()?>" 	rel = "stylesheet"/>
<!-- libs -->
<script src = "js/lib/jquery-3.2.1.min.js"></script>
<script src = "js/lib/tether.min.js"></script>
<script src = "js/lib/bootstrap.min.js"></script>
<script src = "js/lib/sweet-alert.min.js"></script>      
<script src = "js/lib/jquery.util.js"></script>  
<script src = "js/lib/jquery.msg.js"></script>          
<script src = "js/lib/jquery.float.js"></script>          
<script src = "js/lib/nprogress.js"></script>
<script src = "js/lib/moment.min.js"></script>
<script src = "js/search_result.js?<?php echo time()?>"></script>
</head>
<body>
<div class="container-fluid">	
<div class="row">
<div class="col-md-12 text-center"><button type="button" class="btn btn-link" style="color:white" onclick="window.history.back();">назад</button></div>
<div class="col-md-12">
<h4 style="margin-bottom:15px">результаты поиска</h4>
<table class="table table-bordered table-hover table-sm" id="result_table">
  <thead>
    <tr>      
      <th style="width:5%">№</th>      
      <th style="width:80%">название</th>
	  <th style="width:15%;text-align:center">разместил</th>	  	  
    </tr>
  </thead>
  <tbody id="tbody"></tbody>
</table>
</div>
</div>
</div>
</body>