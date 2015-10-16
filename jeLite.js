/**
* jeLite v.1.0.0
*
* Javascript library for DOM manipulation
*
* @copyright 2015
* @author Edison Romero
* @license http://mit-license.org
* 
*/

(function (w, d, u) {
	'use strict';
	var alias = 'jeLite';

	/* CORE */
	var core = function(selector){
		var domElement = this || d;
		var elements = domElement.querySelectorAll(selector);
		return (elements.length>1)?elements:elements[0];
	};

	core.create = function(element) {
		return d.createElement(element);
	};

	core.extend = function ( defaults, options ) {
		var extended = {};
		var prop;
		for (prop in defaults) {
			if (Object.prototype.hasOwnProperty.call(defaults, prop)) {
				extended[prop] = defaults[prop];
			}
		}
		for (prop in options) {
			if (Object.prototype.hasOwnProperty.call(options, prop)) {
				extended[prop] = options[prop];
			}
		}
		return extended;
	};

	/* DOM */
	var methods = {};
	
	// hide | show
	// toggle | toggleClass
	// css | attr
	// html
	// hasClass | removeClass | addClass
	// parent | remove | append
	// addClick (click)
	// animate
	// FadeIn | FadeOut

	methods.hide = function() {
		this.style.display = 'none';
	};


	methods.show = function() {
		this.style.display = 'block';
	};


	methods.toggle = function() {
		(this.style.display === 'none')?this.show():this.hide();
	};


	methods.toggleClass = function(className) {
		(this.hasClass(className))?this.classList.remove(className):this.classList.add(className);
	};


	methods.attr = function(attribute, value) {
		if(value) this.setAttribute(attribute, value);
		else return this.getAttribute(attribute);
	};


	methods.css = function(attribute, value) {
		if(value) this.style[attribute] = value;
		else return this.style[attribute];
	};

	
	methods.html = function(content) {
		this.innerHTML = content;
	};


	methods.addClass = function(className) {
		if(!this.hasClass(className))
			this.classList.add(className);
	};


	methods.removeClass = function(className) {
		if(this.hasClass(className))
			this.classList.remove(className);
	};


	methods.hasClass = function(className) {
		return this.classList.contains(className);
	};

	methods.parent = function () {
		return this.parentNode;
	};

	methods.append = function(element) {
		return this.appendChild(element);
	};

	methods.remove = function(element) {
		console.log(this);
		var toRemove = element || this;
		return this.parent().removeChild(toRemove);
	};

	methods.addClick = function(functionName){
		this.addEventListener('click', functionName);
	};

	methods.animate = function(property,init,end,units,time,incr){
		init = init || 0;
		units = units || '';
		incr = incr || 1;

		var that = this;

		function transition(){
			if(init > end){
				init -= incr;
			}else{
				init += incr;
			}

			that.style[property] = init+units;

			if(init !== end){
				setTimeout(transition,time);
			}
		}
		
		transition();

		return this;
	};

	methods.fadeOut = function(){
		this.animate('opacity',1,0,u,1,0.01);
		return this;
	};

	methods.fadeIn = function(){
		this.animate('opacity',0,1,u,1,0.01);
		return this;
	};

	/*** Asign ***/
	w.NodeList.prototype.each = Array.prototype.forEach;

	Object.getOwnPropertyNames(methods).forEach(function(item){
		w.Element.prototype[item] = methods[item];
		w.NodeList.prototype[item] = function(){
			var args = arguments;
			this.each(function(ele){
				ele[item].apply(ele,args);
			});
		};
	});

	/*** revealing ***/
	w.$ = w[alias]  = core;
	w.Element.prototype.$ = w.Element.prototype[alias]  = core;

})(window, document);
