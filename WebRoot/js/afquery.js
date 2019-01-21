
var Af = {};

Af.log = function(msg)
{
	 try {   console.log(msg);     } catch (err) {}
};

function Af$ ( selector ) 
{
	var a=selector;
	if(a==null) throw "Af$: selector can't be null!"
	if(a.constructor != jQuery) a = $(a);
	if(a.length == 0) throw "Af$: jQuery selects no object! Wrong selector? The input is:" + selector;
	return a;
}

Af.getElement = function( selector )
{
	var e = selector;
	if(e==null) throw "Af.getElement(): selector can't be null!"
	if(e.constructor == String) e = $(e);
	if(e.constructor == jQuery)
	{
		if(e.length == 0) throw "jQuery selects no object! Wrong selector?"
		e = e[0];
	}
	return e;
}

Af.getQueryParam = function (name) 
{
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]); return null;
}


Af.restErrHandler = function(error, reason)
{	
	alert(reason);
};

Af.httpErrHandler = function()
{	
	alert("HTTP Error");
};

Af.rest = function (serviceUri, req, dataHandler,restErrHandler)
{
	jQuery.ajax({				
		url: serviceUri, 			
		method: "POST", 
		processData: false,	
		data: JSON.stringify(req), 
		dataType: 'json',
		success: function(ans){
			if(ans.error != 0)
			{
				if(restErrHandler != null)
					restErrHandler( ans.error, ans.reason);
				else
					Af.restErrHandler( ans.error, ans.reason);
			}				
			else
			{
				dataHandler(ans.data);
			}				
		},
		error: function( jqXHR, textStatus, errorThrown){
			Af.httpErrHandler();
		}
	});	
}

Af.jsonp = function(URI, req, resultHanlder)
{
	jQuery.ajax({				
			url: URI,	
			method: "GET",
			dataType: "jsonp",
			//jsonpCallback: "callback",
			data: req,
			success: resultHanlder
	});	
}

Af.putSession = function(key, obj)
{
	sessionStorage.setItem(key, JSON.stringify(obj));
}
Af.getSession = function(key)
{
	return JSON.parse(sessionStorage.getItem(key));
}

Af.loadPage = function( container, url)
{
	if(container.constructor == String)	 
		container = $(container);
		
	$.get(url, function(content){
		container.html( content);
	});
}

function AfTemplate(template)
{
	this.map = null;;
	this.template = template;
	
	this.compile = function()
	{
		this.map = {};
		
		var r = new RegExp("\\{#.*?\\}", "g");

		var result;
		while ((result = r.exec( this.template )) != null)  
		{
			var match = result[0];
			var key = match.substr(2, match.length - 3);
			//var key = key1.trim();
			this.map[key] = new RegExp("\\{#" + key + "\\}", "g");
			//Af.log(varName);
		}
		
		return this;
	};
	
	this.replace= function( data )
	{
		if(this.map == null) this.compile();
		
		var html = this.template;
		for( var key in this.map)
		{
			var regex = this.map[key];
			var value = data[ key];
			if(value != null)
				html = html.replace( regex, value);
		}
		return html;
	};
}

function AfMap()
{
	this.array = [];
	
	this.put = function(id, obj)
	{
		for(var i=0; i<this.array.length;i++)
		{
			var e = this.array[i];
			if(e.id == id) 
			{
				e.obj = obj;
				return;
			}
		}
		var e = {};
		e.id = id;
		e.obj = obj;
		this.array.push( e );
	};
	
	this.get = function(id)
	{
		for(var i=0; i<this.array.length;i++)
		{
			var e = this.array[i];
			if(e.id == id) 
				return e.obj;
		}
		return null;
	};
	
	this.each = function ( callback )
	{
		for(var i=0; i<this.array.length;i++)
		{
			var e = this.array[i];
			if(false == callback (e.id, e.obj ) ) break;
		}
	};
	
	this.remove = function ( id )
	{
		for(var i=0; i<this.array.length;i++)
		{
			var e = this.array[i];
			if(e.id == id)
				this.array.splice(i, 1);
		}
	};
	
	this.size = function()
	{
		return this.array.length;
	};
	
	this.clear = function()
	{
		this.array = [];
	};
	
	this.values = function()
	{
		var values = [];
		for(var i=0; i<this.array.length;i++)
		{
			var e = this.array[i];
			values.push(e.obj);
		}
		return values;
	};
	this.ids = function()
	{
		var result = [];
		for(var i=0; i<this.array.length;i++)
		{
			var e = this.array[i];
			result.push(e.id);
		}
		return result;
	};
}

function AfIdList ()
{
	this.ids = [];	
	
	this.aa = function (str)
	{
		if(str==null || str.length==0) return this;
		var sss = str.split(",");
		for(var i=0; i<sss.length; i++)
		{
			var it = sss[i];
			if(it.length > 0 && ! this.contains( it ))
			{				
				this.ids.push(it);
			}
		}
		return this;
	};
	this.at = function(index)
	{
		if(this.ids.length == 0) return null;
		return this.ids[index];
	};
	this.contains = function (id)
	{
		for(var i=0; i<this.ids.length; i++)
		{
			if( id == this.ids[i]) return true;
		}
		return false;
	};
	this.size = function ()
	{
		return this.ids.length;
	};
	this.toString = function()
	{
		return this.ids.join(",");
	}
}

Af.showDialog = function(selector)
{
	var dlg = selector;
	if(selector.constructor == String)	 
		dlg = $(selector);
	
	var closeButton = $('[role="close"]', dlg);
	if(closeButton != null);
	{
		closeButton.click(function(){
			dlg.hide();
		});
	}
	
	dlg.show();
}

function AfFileUploader()
{
	this.fileButton = null;
	this.file = null;
	this.uploadUrl = null; 
	this.status = 0;
	this.progress = 0;
	this.response = {};
	this.observer = null;
	this.enableLog = true;
	
	this.setButton = function(fileButton)
	{
		if(fileButton.constructor == String) fileButton = $(fileButton);
		
		if(fileButton.constructor == jQuery)
		{
			if(fileButton.length==0) throw ("jQuery Selector Error!");
			fileButton = fileButton[0];
		}
		
		if(fileButton.uploader != null)  return fileButton.uploader;
		
		this.fileButton = fileButton;
		
		this.fileButton.uploader = this;
		
		this.fileButton.addEventListener("change", function(){
			var ctx = this.uploader;
			var fileButton = this;
			if(fileButton.files.length == 0) return;		
			
			var file = fileButton.files[0];
			ctx.log("select file: " + file.name);
			fileButton.value = '';
			ctx.setFile(file);
			ctx.startUpload( );
		});
		
		return this;
	};
	
	this.setUploadUrl = function(url)
	{
		this.uploadUrl = url;
		return this;
	};
	
	this.setObserver = function ( observer )
	{
		this.observer = observer;
		return this;
	};
	
	this.setLogEnabled  = function( enabled)
	{
		this.enableLog = enabled;
		return this;
	};
	
	this.setFile = function(file)
	{
		this.file = file;
		return this;
	};
		
	this.openFileDialog = function()
	{
		if(this.fileButton == null) throw ("Call setButton() first!");

		$(this.fileButton).click();	
	};

	this.startUpload = function( )
	{
		if(this.uploadUrl == null) throw ("Call setUploadUrl() first!");
		if(this.file == null) throw ("Call openFileDialog() first!");
		
		var file = this.file;

		if(this.observer != null && this.observer.uploadTestFile != null)
		{
			if( ! this.observer.uploadTestFile(this))
			{
				this.log("Not proper type!" + file.name);
				return;
			}
		}
		
		this.log("Start uploading: " + file.name);

	   	var formData = new FormData();
		formData.append('file', file); 
				    
	    var formRequest = new XMLHttpRequest();
	    formRequest.ctx = this;
	    formRequest.upload.ctx = this;
	    
	    formRequest.upload.addEventListener("progress", this.evt_upload_progress, false);
	    formRequest.addEventListener("load", this.evt_upload_complete, false);
	    formRequest.addEventListener("error", this.evt_upload_failed, false);
	    formRequest.addEventListener("abort", this.evt_upload_cancel, false);		
	
		this.notify('start');
		formRequest.open("POST", this.uploadUrl );
	    formRequest.send(formData);
	    
	    this.formRequest = formRequest;
	   	this.status = 1;		   		   	
	   	return this;
	};
	
	this.cancelUpload = function()
	{		
		if(this.formRequest != null)
		{
			try{
				this.formRequest.abort(); 
    			this.formRequest = null;
    			this.status = -2;
			}catch(err)
			{
				Af.log("Error occurs when canceling:" + err);
			}
    	}
	};
	
	this.notify = function(msg) 
	{
		if(this.observer != null && this.observer.uploadHandleEvent != null)
		{
			this.observer.uploadHandleEvent(msg, this);
		}
	};
	
	this.log = function(msg)
	{
		if(!this.enableLog) return;
		try {   console.log(msg);     } catch (err) {}
	};

	
	this.evt_upload_progress = function (evt) 
	{
		var ctx = this.ctx;
	    if (evt.lengthComputable)
	    {
	    	ctx.progress = Math.round(evt.loaded * 100 / evt.total);		    	
	    	ctx.log ("Upload progress: " + ctx.progress);		
	    	ctx.notify('progress');
	    }	        
	};
	this.evt_upload_complete = function (evt)
	{
		var ctx = this.ctx;
		if(evt.loaded == 0)
		{
			ctx.status = -1;
			ctx.log ("Upload failed!" + ctx.file.name);
			ctx.notify('error');
		}
		else
		{
			ctx.status = 100;
	    	ctx.response = JSON.parse(evt.target.responseText);
	   		ctx.log (ctx.response); 
	   		ctx.notify('complete');
		}			
	};		 
	this.evt_upload_failed = function (evt) 
	{			
		var ctx = this.ctx;
		ctx.status = -1;
		ctx.log ("Error!"); 
		ctx.notify('error');
	};
	this.evt_upload_cancel = function (evt) 
	{
		var ctx = this.ctx;
		ctx.status = -2;
		ctx.log( "Upload terminated!");	
		ctx.notify('abort');
	};
}