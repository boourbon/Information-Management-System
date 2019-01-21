var M = {};
	
M.doSubmit = function()
{
	var f = $('.info');
	var req = {};
	req.id = $('.id', f).val().trim();
	req.name = $('.name', f).val().trim();
	req.phone = $('.phone', f).val().trim();
	req.sex = $('.sex', f).val().trim();
		
	Af.rest("StudentAdd.api", req, function(data){
		alert("Successfully Added!");
		$(".info input").val("");
	});
		
}