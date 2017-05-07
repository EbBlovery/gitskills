function addLoadEvent(func){
    var oldonload=window.onload;
    if(typeof window.onload != 'function'){
       window.onload=func;
    }else{
    	window.onload=function(){
    		oldonload();
    		func();
    	}
    }
}

function insertAfter(newElement,targetElement){
     var parent=targetElement.parentNode;
     if(parent.lastChild == targetElement){
         parent.appendChild(newElement);
     }else{
     	 parent.insertBefore(newElement,targetElement.nextSibling)
     }
}

function addClass(element,value){
    if(!element.className){
        element.calssName=value;
    }else{
    	newClassName=element.className;
    	newClassName+="";
    	newClassName+=value;
    	element.className=newClassName;
    }
}
/*find now web*/
function hightlightPage(){
    if(!document.getElementsByTagName) return false;
    if(!document.getElementById) return false;
    var headers=document.getElementsByTagName('header');
    if(headers.length==0)return false;
    var navs=headers[0].getElementsByTagName('nav');
    if(navs.length==0)return false;
    var links=navs[0].getElementsByTagName('a');
    
    for(var i=0;i<links.length;i++){
    	var linksurl;
        linksurl=links[i].getAttribute('href');
        if(window.location.href.indexOf(linksurl) != -1){       	
            links[i].className ='here';  
            var linktext=links[i].lastChild.nodeValue.toLowerCase();
            document.body.setAttribute('id',linktext);      
        }
    }
}
/*compaign function*/
function startMove(elementID,l,t,interval){
   if(!document.getElementById) return false;
   if(!document.getElementById(elementID))return false;
   var elem=document.getElementById(elementID);
   if(elem.movement){
       clearTimeout(elem.movement);
   }
   if(!elem.style.left){
       elem.style.left=0+'px';
   }
   if(!elem.style.top){
       elem.style.top=0+'px';
   }
   var xpos=parseInt(elem.style.left);
   var ypos=parseInt(elem.style.top);
   if(xpos==l && ypos==t){
       return true;
   }
   if(xpos<l){
       var dist =Math.ceil((l-xpos)/10);
       xpos+=dist;
   }
   if(xpos>l){
       var dist=Math.ceil((xpos-l)/10);
       xpos-=dist;
   }
   if(ypos<t){
       var dist=Math.ceil((t-ypos)/10);
       ypos+=dist;
   }
   if(ypos>t){
       var dist=Math.ceil((ypos-t)/10);
       ypos-=dist;
   }
   elem.style.left=xpos+"px";
   elem.style.top=ypos+"px";
   var repeat="startMove('"+elementID+"',"+l+","+t+","+interval+")";
   elem.movement=setTimeout(repeat,interval);
}
function prepareSlideshow(){
   if(!document.getElementById)return false;
   if(!document.getElementsByTagName)return false;
   if(!document.getElementById('intro'))return false;
   var intro=document.getElementById('intro');
   var slideshow=document.createElement('div');
   slideshow.setAttribute('id','slideshow');/*the create div id*/
   var preview=document.createElement('img');
   preview.setAttribute('src','images/slideshow.gif');
   preview.setAttribute('alt','a lsdaoijfdawijfd');
   preview.setAttribute('id','preview');/*the img id*/
   slideshow.appendChild(preview);
   insertAfter(slideshow,intro);
   var links=intro.getElementsByTagName('a');
   var destination;
   for(var i=0;i<links.length;i++){
   	  
      links[i].onmouseover=function(){
      	 destination=this.getAttribute('href');
      	 if(destination.indexOf('index.html') != -1){
             startMove('preview',0,0,5);
      	 } 
      	 if(destination.indexOf('about.html') != -1){
             startMove('preview',-150,0,5);
      	 }
      	 if(destination.indexOf('photos.html') != -1){
             startMove('preview',-300,0,5);
      	 }
      	 if(destination.indexOf('live.html') != -1){
             startMove('preview',-450,0,5);
      	 }
      	 if(destination.indexOf('contact.html') != -1){
             startMove('preview',-600,0,5);
      	 }
      }  
   }
}

function showSevtion(id){
   var sections=document.getElementsByTagName('section');
   for(var i=0;i<sections.length;i++){
      if(sections[i].getAttribute('id') != id){
         sections[i].style.display="none";
      }else{
      	 sections[i].style.display="block";
      }
   }
}

function prepareInternalnav(){
   if(!document.getElementsByTagName)return false;
   if(!document.getElementById)return false;
   var articles=document.getElementsByTagName('article');
   if(articles.length==0)return false;
   var nav=articles[0].getElementsByTagName('nav');
   if(nav.length==0)return false;
   var links=nav[0].getElementsByTagName('a');

   for(var i=0;i<links.length;i++){
   	   var sectionID=links[i].getAttribute('href').split('#')[1];
   	   if(!document.getElementById(sectionID)) continue;
   	   document.getElementById(sectionID).style.display='none';
   	   links[i].distanition=sectionID
       links[i].onclick=function(){
           showSevtion(this.distanition);
           return false;
       }
   }
}

function prepalePlaceholder(){
    if(!document.getElementById)return false;
    if(!document.createElement)return false;
    if(!document.createTextNode)return false;
    if(!document.getElementById('imagegallery'))return false;
    var ploceholder=document.createElement('img');
    ploceholder.setAttribute('src','images/photos/placeholder.gif');
    ploceholder.setAttribute('alt','my image gallery');
    ploceholder.setAttribute('id','placeholder');
    var description=document.createElement('p');
    description.setAttribute('id','description');
    var desctext=document.createTextNode('Choose an image');
    description.appendChild(desctext);
    var gallery=document.getElementById('imagegallery');
    insertAfter(description,gallery);
    insertAfter(ploceholder,description);
}
 
function prepareGallery(){
	if(!document.getElementsByTagName)return false;
	if(!document.getElementById)return false;
	if(!document.getElementById('imagegallery'))return false;
    var gallery=document.getElementById('imagegallery');
    let links=gallery.getElementsByTagName('a');
    for(var i=0;i<links.length;i++){
        links[i].onclick=function(){
        	showPic(this); 
        	return false;
        }
    }
}
function showPic(whichpic){
   var source=whichpic.getAttribute('href');
   console.log(source)
   var placeholder=document.getElementById('placeholder');
   placeholder.setAttribute('src',source);

}







addLoadEvent(hightlightPage); 
addLoadEvent(prepareSlideshow);
addLoadEvent(prepareInternalnav);
addLoadEvent(prepalePlaceholder);
addLoadEvent(prepareGallery);