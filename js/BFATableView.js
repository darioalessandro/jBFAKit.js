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

BFA.TableView= function(cellId, cellColor, cellImage){
	this.cellColor= cellColor;
	this.cellImage= cellImage;
	this.numberOfRows= 0;
	this.cellId=cellId;
	
	this.htmlRow=function(){
		return "<div class=\"tableRow\" style=\"background:"+this.cellColor+";\" id=\""+this.cellId+"\"> \
					<img src=\""+this.cellImage+"\" alt=\"../../resources/pablo.jpg\" class=\"tableImageCell\"> \
					<div class=\"tableDetailCell\"> \
						<div class=\"userMessage\" id=\"IDuserMessage1\">¡Voy a ganar este reto!</div> \
						<canvas id=\"myCanvas4\" width=\"600\" height=\"60\">Your browser does not have support for canvas.</canvas>\
					</div>\
				</div>";
	};
				
				
	this.insertRowIntoContainer= function(tableContainerid, cellColor, cellImage){
		if(cellColor!=null){
			this.cellColor= cellColor;
		}
		if(cellImage){
			this.cellImage= cellImage;
		}
		
		var currentInnerHTML= $("#"+tableContainerid).html();
		currentInnerHTML= currentInnerHTML.concat(this.htmlRow());
		console.log(currentInnerHTML);
		$("#"+tableContainerid).html(currentInnerHTML);
	};
	
};       
        
        
function bind(scope, fn) {
		return function() {
			fn.apply(scope, arguments);
		};
	};