	var M = {};
	M.rows = [];
	M.cur = null;
	
	M.init = function()
	{
		M.uploader = new AfFileUploader();
		M.uploader.setButton('.main .filebutton').setObserver(this);

		M.reload();		
	}
	
	M.uploadPhoto = function()
	{
		M.uploader.setUploadUrl("Photo.upload?id=" + M.cur.id);
		M.uploader.openFileDialog();
	}
	
	M.uploadHandleEvent = function(msg, uploader)
	{
		if(msg =='complete')
		{
			var url = uploader.response.data.url;
			$('.main .photo').attr('src', url);
		}
	}
	
	M.reload = function()
	{
		var req = {};
		Af.rest("StudentList.api", req, function(data){
			M.showResult(data);
		});
	}
	
	M.query = function()
	{
		var req = {};
		req.filter = $('.toolbar .filter').val().trim();
		
		Af.rest("StudentQuery.api", req, function(data){
			M.showResult(data);
		});
	}

	M.rowClicked = function(e) 
	{
		var t = $('.main .table');
		$('.selected', t).removeClass('selected');
		$(e).addClass('selected');
		
		var index = $(e).attr('index');
		var row = M.rows[index];
		
		M.cur = row;
		$('.main .profile .name').html( row.name);
		
		this.showProfile( M.cur.id);
	}
	
	M.showProfile = function (id )
	{
		var req = {};
		req.id = id;
		Af.rest("ProfileGet.api", req, function(data){
			var photoUrl = data.photoUrl;
			$('.main .photo').attr('src', photoUrl);
		})
	}
	
	M.showResult = function(data)
	{
		var templ = new AfTemplate( $('.template').html());
		M.rows = data;
		
		var target = $(".main .content tbody");
		target.html("");
		for(var i=0; i<data.length; i++)
		{
			var row = data[i];
			row.index = i;
			row.sex2 = row.sex?'Male': 'Female'; 			
			var str = templ.replace(row); 
			target.append( str );
		}
		
		if(data.length > 0) 
			$(".main .content .empty").hide();
		else 
			$(".main .content .empty").show();
	}
	
	M.doRemove = function( e )
	{
		var req = {};
		req.id = $(e).attr("data");
		Af.rest("StudentRemove.api", req, function(data){				
			$(e).parent().parent().remove();
			
			alert("Delete Successfull!");
			
		})
	}

	M.init();
