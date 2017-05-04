<!-- авторизация -->
<div class="modal fade" id="AuthWindow">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h6 class="modal-title" style="margin:auto">авторизация</h6>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close" title="закрыть">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">	          				
		<label for="email">Email</label>
		<input type="email" class="form-control input" id="auth_email" placeholder="Введи email">
		<label for="password">Пароль</label>
		<input type="password" class="form-control input" id="auth_password" placeholder="Введи пароль">
		<a href="#" class="nav-link" id="reg_link">регистрация</a>
      </div>		
		<div class="col-md-12 text-center" id="label_auth_col"><img src="pages/img/vk_logo.png" class="social_img"/></div>
      <div class="modal-footer" style="margin:auto">
        <button type="button" class="btn btn-primary" id="button_auth">вход</button>        
      </div>
    </div>
  </div>
</div>
<!-- регистрация -->
<div class="modal fade" id="RegWindow">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h6 class="modal-title" style="margin:auto">регистрация</h6>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close" title="закрыть">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">	          
		<select class="form-control" id="reg_user_type">
		<option value="0">Я читатель</option>			
		<option value="1">Я писатель</option>		
		</select>
		<label for="name" id="label_name">Имя</label>
		<input type="text" class="form-control input" id="reg_name" placeholder="Введи имя">		
		<label for="login" id="label_surname">Фамилия</label>
		<input type="text" class="form-control input" id="reg_surname" placeholder="Введи фамилию">		
		<label for="email">Email</label>
		<input type="email" class="form-control input" id="reg_email" placeholder="Введи email">
		<label for="password">Пароль</label>
		<input type="password" class="form-control input" id="reg_password" placeholder="Введи пароль">
      </div>
      <div class="modal-footer" style="margin:auto">
        <button type="button" class="btn btn-primary" id="reg">продолжить</button>        
      </div>
    </div>
  </div>
</div>