<style>
#editor {
    width: 400px;
    height: 100px;
    padding: 10px;
    background-color: #444;
    color: white;
    font-size: 14px;
    font-family: monospace;
}
  
.statement {
    color: orange;
}
</style>
<div id="editor" contenteditable="true"></div>

<script>
$("#editor").on("keydown keyup", function(e){
    if (e.keyCode == 32){
        var text = $(this).text().replace(/[\s]+/g, " ").trim();
        var word = text.split(" ");
        var newHTML = "";

        $.each(word, function(index, value){
            switch(value.toUpperCase()){
                case "SELECT":
                case "FROM":
                case "WHERE":
                case "LIKE":
                case "BETWEEN":
                case "NOT LIKE":
                case "FALSE":
                case "NULL":
                case "FROM":
                case "TRUE":
                case "NOT IN":
                    newHTML += "<span class='statement'>" + value + "&nbsp;</span>";
                    break;
                default: 
                    newHTML += "<span class='other'>" + value + "&nbsp;</span>";
            }
        });
  
    	$(this).html(newHTML);
        
        //// Set cursor postion to end of text
        var child = $(this).children();
        var range = document.createRange();
        var sel = window.getSelection();
        range.setStart(child[child.length - 1], 1);
        range.collapse(true);
        sel.removeAllRanges();
        sel.addRange(range);
        $(this)[0].focus(); 
    }
});
</script>