$(document).ready(function(){
$(".ins_popup").fancybox({
openEffect : 'fade',
closeEffect : 'fade'
});

$('#bcr_instagsbtn').click(function(){
var bcr_tag = $('#bcr_instags').val();
bcr_instag(
ins_tag = bcr_tag, // tags
ins_token = '141970.467ede5.edbc9c37472d41b790e1db8948793f11' // token
);
return false;
});
});