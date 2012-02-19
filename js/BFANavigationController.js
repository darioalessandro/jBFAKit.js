/**
 * Copyright (C) <2012> <Dario Alessandro Lencina Talarico>

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies
of the Software, and to permit persons to whom the Software is furnished to do
so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
 */

if(typeof BFA== "undefined"){
	var BFA={};
}

BFA.NavigationController= function(containerId){
	this.containerId= containerId;
	this.visibleController=null;
	this.pushController= function(controllerRef){
		//TODO: Probably we want to add some validation here.
		//This logic sucks because I was struggling with the stupid browser, I need to refactor it later on.
		if(this.visibleController==null){
			this.injectController(controllerRef);
			window.history.pushState(controllerRef.title, "Title", "#"+controllerRef.title);
		}
		else if(controllerRef.title!=this.visibleController.title){
			this.injectController(controllerRef);
			window.history.pushState(controllerRef.title, "Title", "#"+controllerRef.title);
		}
	};
	
	this.injectController= function(controllerRef){
		//TODO: we'll get rid of this soon...
		if(this.visibleController!=null){
			this.visibleController.viewWillDissapear();
		}
		if(this.visibleController!=null){
			this.visibleController.viewDidUnload();
		}
		controllerRef.viewWillAppear();		
		$('#'+this.containerId).html(controllerRef.view.HTMLString());
		//TODO: We need to detect when the dom injected the new stuff...
		// setTimeout(bind(controllerRef, controllerRef.viewDidAppear), 100);
		this.visibleController=controllerRef;		
	};
	
	this.pop=function(stackstate){
		if(typeof stackstate.state != "undefined" && stackstate.state!=null){
			if(stackstate.state!=this.visibleController.title){
				this.injectController(eval("new "+stackstate.state+"()"));
			}
		}
	};
	
	window.onpopstate= bind(this, this.pop);
	
	this.hideAnimated=function(){
		//("#"+this.containerId).css.addClass("removeNavTabContainer");
	};
	
	this.showAnimated=function(){
		//("#"+this.containerId).css.addClass("visibleNavTabContainer");
	};
}