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
};

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
	this.highlighted=false;
	
	$("#"+this.cellId).live('click', bind(this, function(){
		this.didSelectedRow();
	}));
			
	this.didSelectedRow=function(){
		if(this.highlighted==false){
			$('header').after("<div class=\"blocker\"></div>");			
			$(".blocker").live("click", bind(this, function(){
				this.didSelectedRow();
			}));
			this.highlighted=true;
			$("#"+this.cellId).bind('animationend webkitAnimationEnd', bind(this, function() { 
     			$("#"+this.cellId).css("-webkit-transform", "scale(1.1,1.1)");
     			$("#"+this.cellId).unbind('animationend webkitAnimationEnd');     			
     		}));
     		$("#"+this.cellId).addClass("hightlightedRow");
     		this.dropCell();
     		$("#"+this.cellId+"canvas").bind("click", function(click){
     			console.log("clickOnCanvas");
     		});   	
     		this.showEditableCell();
     			
     	}else{
     		$(".blocker").die("click");
     		$(".blocker").remove();     		
     		$("#"+this.cellId).removeClass("hightlightedRow");
     		$("#"+this.cellId).css("-webkit-transform", "scale(1,1)");     		     		
     		this.highlighted=false;
     		$("#"+this.cellId).live('click', bind(this, function(){
				this.didSelectedRow();
			}));
			this.showNonEditableCell();
     	}
   };
   
   // this.delegate.didSelectedRow(this);	
   
   this.showEditableCell=function(){
   		// var currentInnerHTML= $("#"+this.cellId).html();
		var currentInnerHTML= this.editableHTMLRow();
		$("#"+this.cellId).html(currentInnerHTML);	
   };		
	
	this.showNonEditableCell=function(){
		// var currentInnerHTML= $("#"+this.cellId).html();
		var currentInnerHTML= this.nonEditableHTML();
		$("#"+this.cellId).html(currentInnerHTML);
	};
	
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
	
	this.nonEditableHTML=function(){
		return "<img src=\""+this.cellImage+"\" alt=\"../../resources/pablo.jpg\" class=\"tableImageCell\"> \
					<div class=\"tableCellTitle\">"+this.title+"</div>\
					<div class=\"tableDetailCell\"> \
						<div class=\"userMessage\" id=\"IDuserMessage1\">"+this.message+"</div> \
						<canvas  id=\""+this.cellId+"canvas\" width=\"460\" height=\"60\">Your browser does not have support for canvas.</canvas>\
					</div>";
	};

	// this.editableHTMLRow=function(){
		// return "<div class=\"brandedFont tableRow\" style=\"background:"+this.cellColor+";\" id=\""+this.cellId+"\"> \
					// <img src=\""+this.cellImage+"\" alt=\"../../resources/pablo.jpg\" class=\"tableImageCell\"> \
					// <div class=\"tableCellTitle\">"+this.title+"</div>\
					// <div class=\"tableDetailCell\"> \
					// <textarea type=\"text\" class=\"userMessage\" id=\"IDuserMessage1\" style=\"margin-top: 0px; margin-bottom: 0px; height: 55px; margin-left: 0px; margin-right: 0px; width: 449px; \"></textarea>\
					// <input type=\"text\" style=\"height: 27px;float: right;font-size: 15px;\">\		
				// </div>";	
	// };
	
	this.editableHTMLRow=function(){
		var row= new String();
		// row=row.concat("<div class=\"brandedFont tableRow\" style=\"background:"+this.cellColor+";\" id=\""+this.cellId+"\">");
		row=row.concat("<img src=\""+this.cellImage+"\" alt=\"../../resources/pablo.jpg\" class=\"tableImageCell\"> ");
		row=row.concat("<div class=\"tableCellTitle\">"+this.title+"</div>");
		row=row.concat("<div class=\"tableDetailCell\">");
		row=row.concat("<textarea type=\"text\" placeholder=\"Actualiza el status de tu meta! ej: \'Estoy a punto de lograrlo\'\" class=\"userMessage\" id=\"IDuserMessage1\" style=\"margin-top: 0px; margin-bottom: 0px; height: 55px; margin-left: 0px; margin-right: 0px;width: 476px; max-width: 476px; max-height: 55px; \"></textarea>");
		row=row.concat("<input type=\"button\" value=\"Aceptar\" style=\"width:100px; height: 80px;float: right;font-size: 15px;bottom: 0;margin-bottom: 0;position: relative;top: 38px;left: 5px;\">");
		row=row.concat("<input type=\"button\" value=\"Cancelar\" style=\"width:100px; height: 80px;float: right;font-size: 15px;margin-top: 38px;\">");
		row=row.concat("<input type=\"text\" placeholder=\"Porcentaje (0..100)\"style=\"height: 27px;float: right;font-size: 13px;margin-top: 26px;border-right-width: 2px;margin-right: 10px;\">");
		row=row.concat("</div>");
		// row=row.concat("</div>");
		return row; 	
	};
							
	this.insertRowIntoContainer= function(tableContainerid, cellColor, cellImage, title, message, detailMessage, progress){
		if(cellColor!=null){
			this.cellColor= cellColor;
		}
		
		if(tableContainerid!=null){
			this.tableContainerid=tableContainerid;
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
		
		var currentInnerHTML= $("#"+this.tableContainerid).html();
		currentInnerHTML= currentInnerHTML.concat(this.htmlRow());
		$("#"+this.tableContainerid).html(currentInnerHTML);
		
	};
	
	this.dropCell=function(){
		$("#"+this.cellId).die('click');	
	};
	
};       
        
        
