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
	this.controllers=new Array();
	this.pushController= function(controllerRef){
		//TODO: Probably we want to add some validation here.
		controllerRef.navigationController= this;
		this.controllers.push(controllerRef);
		this.injectController(controllerRef);
	};
	
	this.injectController= function(controllerRef){
		controllerRef.viewWillAppear();
		$('#'+this.containerId).html(controllerRef.view.HTMLString());
		//TODO: We need to detect when the dom injected the new stuff...
		setTimeout(bind(controllerRef, controllerRef.viewDidAppear), 100);		
	};
	
	this.pop=function(){
		this.controllers.pop();
		var controller= this.controllers(this.controllers.length-1);
		this.injectController(controller);
	};
}