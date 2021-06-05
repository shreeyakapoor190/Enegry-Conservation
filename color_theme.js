var dark=false;
$(document).ready(function()
{
$('#b1').click(function()
{
var div=$('#b1');

if(dark)
{
	$('body').css({"background-color":"white","color":"black"});

    div.animate({left: '30px'}, "slow");	
	dark=false;
}
else 	
{
$('body').css({"background-color":"black","color":"white"});

    div.animate({right: '30px'}, "slow");	
	dark=true;
}
});
});