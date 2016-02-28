/*
slider.js by Gubarev Andrey © 2016

Activate slider:
	slider.init({
		slideSpeed : 3000,
		animationSpeed : 50,
		randomAnimation : true
	}),
*/
;'use strict';

function $(id){
	return document.getElementById(id);
};

Array.prototype.shuffle = function(b){
		var i = this.length, j, t;
		while(i){
			j = Math.floor((i--) * Math.random());
			t = b && typeof this[i].shuffle !== 'undefined' ? this[i].shuffle() : this[i];
			this[i] = this[j];
			this[j] = t;
		}
		return this;
	};

var slider = new Object();
slider.slide = 0;
slider.coords = {
	0 : [0, 0], 1 : [200, 0], 2 : [400, 0], 3 : [600, 0], 4 : [800, 0],
	5 : [0, 200], 6 : [200, 200], 7 : [400, 200], 8 : [600, 200], 9 : [800, 200],
	10 : [0, 400], 11 : [200, 400], 12 : [400, 400], 13 : [600, 400], 14 : [800, 400],
};

slider.init = function(obj){
	this.timeOut = obj.slideSpeed || 3000;
	this.speed = obj.animationSpeed || 50;
	this.random = obj.randomAnimation;
	this.stopped = false;
	this.slides = $('slider').getElementsByTagName('div');
	this.links = $('slider').getElementsByTagName('a');
	this.images = $('slider').getElementsByTagName('img');
	this.count = this.slides.length;
	for (var i = 0, l = 5; i < this.slides.length; i++, l--){
		var element = slider.create('div');
		element.setAttribute('id','s'+i);
		var a = slider.create('a');
		a.href = this.links[i].href;
		for (var j = 0; j < 15; j++){
			var div = slider.create('div');
			div.style.background = 'transparent';
			div.style.position = 'absolute';
			div.style.top = this.coords[j][1] + 'px';
			div.style.left = this.coords[j][0] + 'px';
			div.style.width = '200px';
			div.style.height = '200px';
			div.style.overflow = 'hidden';
			div.style.transition = 'all 0.5s ease-in-out';
			if (i === 0) div.style.opacity = '1';
			else div.style.opacity = '0';
			div.style.background = 'url('+ this.images[i].src +')';
			div.style.backgroundPosition = '-'+this.coords[j][0]+'px -'+this.coords[j][1]+'px';
			a.appendChild(div);
		};
		element.style.top = '0px';
		element.style.left = '0px';
		element.style.position = 'absolute';
		element.style.zIndex = l;
		element.appendChild(a);
		this['s'+i] = element;
	};
	for (var i = 0; i < this.count; i++){
		var element = this['s'+i];
		$('slider').appendChild(element);
	};
	var forward = slider.create('div');
	var back = slider.create('div');
	forward.setAttribute('id', 'forward');
	back.setAttribute('id', 'back');
	forward.addEventListener('click', slider.goForward, false, true);
	forward.addEventListener('mouseover', function(){forward.style.background = 'url(forwardActive.png) no-repeat'}, false);
	forward.addEventListener('mouseout', function(){forward.style.background = 'url(forward.png) no-repeat'}, false);
	$('slider').appendChild(forward);
	back.addEventListener('click', slider.goBack, false);
	back.addEventListener('mouseover', function(){back.style.background = 'url(backActive.png) no-repeat'}, false);
	back.addEventListener('mouseout', function(){back.style.background = 'url(back.png) no-repeat'}, false);
	$('slider').appendChild(back);
	
	$('slider').addEventListener('mouseover', function(){
		slider.stopped = true;
		forward.style.opacity = '1';
		back.style.opacity = '1';
		forward.style.transform = 'Scale(1)';
		back.style.transform = 'Scale(1)';
	}, false);
	$('slider').addEventListener('mouseout', function(){
		slider.stopped = false;
		forward.style.opacity = '0';
		back.style.opacity = '0';
		forward.style.transform = 'Scale(1.5)';
		back.style.transform = 'Scale(1.5)';
	}, false);

	slider.interval = window.setInterval(this.goForward, this.timeOut, false);
};

slider.create = function (type){
	var result = document.createElement(type);
	return result;
};

slider.goForward = function(a){
	if (slider.stopped && !a) return;
	var now = slider.slide;
	var next = slider.slide + 1;
	if (next > slider.count - 1) {
		next = 0;
		$('s' + now).style.zIndex = 1;
		$('s' + next).style.zIndex = 0;
	}
	else {
		$('s' + now).style.zIndex = now + 1;
		$('s' + next).style.zIndex = now;
	};
	slider.animate($('s' + now), $('s' + next));
	slider.slide = next;
};

slider.goBack = function(){
	var now = slider.slide;
	var next = slider.slide - 1;
	if (now == 0) {
		next = slider.count - 1;
		$('s' + now).style.zIndex = 1;
		$('s' + next).style.zIndex = 0;
	}
	else {
		$('s' + now).style.zIndex = now + 1;
		$('s' + next).style.zIndex = now;
	};
	slider.animate($('s' + now), $('s' + next));
	slider.slide = next;
};

slider.animate = function (element1, element2){
	var divs1 = new Array();
	var divs2 = new Array();
	var tmp1 = element1.childNodes;
	var tmp2 = element2.childNodes;
	tmp1 = tmp1[0].childNodes;
	tmp2 = tmp2[0].childNodes;
	for (var i = 0; i < tmp1.length; i++) {
		divs1.push(tmp1[i]);
		divs2.push(tmp2[i]);
	};
	if (this.random) {divs1 = divs1.shuffle(false);}
	for (var i = 0; i < divs2.length; i++) {
		divs2[i].style.opacity = '1';
	};
	for (var i = 0; i < divs1.length; i++) {
		window.setTimeout(function(element) {
			element.style.opacity = '0';
		}, i * this.speed, divs1[i]);		
	};
};