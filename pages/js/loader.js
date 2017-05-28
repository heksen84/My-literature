if (localStorage.getItem("rec_id") != "" && localStorage.getItem("rec_id") != undefined) {
	localStorage.setItem("read_data_id", localStorage.getItem("rec_id"));	
	window.location.href = "pages/read_text.php";
}
else localStorage.setItem("read_data_id", "");
localStorage.setItem("writer_record_id", "");