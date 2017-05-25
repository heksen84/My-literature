<!---------------------------- 
 Ilya Bobkov 2017(c) 
------------------------------>
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
<link href = "css/lib/bootstrap.min.css"	      rel = "stylesheet"/>
<link href = "css/lib/tether.min.css"		      rel = "stylesheet"/>
<link href = "css/lib/sweet-alert.css"   		  rel = "stylesheet"/>
<link href = "css/lib/scroll.css"	              rel = "stylesheet"/>
<link href = "css/posted.css?<?php echo time()?>" rel = "stylesheet"/>
<!-- libs -->
<script src = "js/lib/jquery-3.2.1.min.js"></script>
<script src = "js/lib/tether.min.js"></script>
<script src = "js/lib/bootstrap.min.js"></script>
<script src = "js/lib/sweet-alert.min.js"></script>      
<script src = "js/lib/jquery.msg.js"></script>          
<script src = "js/lib/moment.min.js"></script>
<script src = "js/posted.js?<?php echo time()?>"></script>
</head>
<body>
<div class="container-fluid">	
<div class="row">
<div class="col-md-12 text-center"><button type="button" class="btn btn-link" style="color:white" onclick="window.history.back();">назад</button></div>
<div class="col-md-12 text-center">
<h4>моя литература</h4>
<table class="table table-bordered table-hover table-sm" id="posted_table">
  <thead>
    <tr>      
      <th style="width:5%">№</th>      
      <th style="width:60%">название</th>
      <th style="width:5%;text-align:center">&#10084;</th>
      <th style="width:5%;text-align:center">статус</th>
      <th style="width:5%;text-align:center"></th>
    </tr>
  </thead>
  <tbody id="tbody"></tbody>
</table>
</div>
</div>
</div>
</body>
</html>