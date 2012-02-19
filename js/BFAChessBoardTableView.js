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

BFA.ChessBoardTableView= function(cellId, cellColor, cellImage, title, message, detailMessage, progress, delegate){
	this.cellColor= cellColor;
	this.cellImage= cellImage;
	this.numberOfRows= 0;
	this.cellId=cellId;
	this.message= message;
	this.detailMesage= detailMessage;
	this.title=title;
	this.delegate=delegate;
	this.progress=progress;
	
	
	this.htmlRow=function(){
		return "<div class=\"brandedFont tableRow\" style=\"background:"+this.cellColor+";\" id=\""+this.cellId+"\"> \
					<img src=\""+this.cellImage+"\" alt=\"../../resources/pablo.jpg\" class=\"tableImageCell\"> \
					<div class=\"tableCellTitle\">"+this.title+"</div>\
					<div class=\"tableDetailCell\"> \
						<div class=\"userMessage\" id=\"IDuserMessage1\">"+this.message+"</div> \
						<canvas  id=\""+this.cellId+"canvas\" width=\"460\" height=\"60\">Your browser does not have support for canvas.</canvas>\
					</div>\
				</div>";
	};
	
	this.didSelectedRow=function(){
		console.log("click");
		this.delegate.didSelectedRow(this);
	}
				
				
	this.insertRowIntoContainer= function(tableContainerid, cellColor, cellImage, title, message, detailMessage, progress){
		if(cellColor!=null){
			this.cellColor= cellColor;
		}
		if(cellImage){
			this.cellImage= cellImage;
		}
		
		if(progress!=null){
			this.progress=progress;
		}
		
		this.message= message;
		this.detailMesage= detailMessage;
		this.title=title;
		
		var currentInnerHTML= $("#"+tableContainerid).html();
		currentInnerHTML= currentInnerHTML.concat(this.htmlRow());
		$("#"+tableContainerid).html(currentInnerHTML);
		BFA.ProgressBar(this.cellId+"canvas", this.progress/100);
		$("#"+cellId).bind('click', bind(this, this.didSelectedRow));
	};
	
};       
        
        
function bind(scope, fn) {
		return function() {
			fn.apply(scope, arguments);
		};
	};