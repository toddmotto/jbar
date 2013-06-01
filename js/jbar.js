/*
	jBar v2.0.0
	
	by Todd Motto: http://toddmotto.com
	Latest version: https://github.com/toddmotto/jBar
	
	Copyright 2013 Todd Motto
	Licensed under the MIT license
	http://www.opensource.org/licenses/mit-license.php

	The jBar plugin, a simple and lightweight notification banner.
*/
!function(window, $, undefined){

	'use strict'
	
	// jBar
	var jBar = function (elem) {
		this.elem = elem
		this.$elem = $(elem)
		this.jsonConfig = this.$elem.data('jbar')
	}
	
	// prototype
	jBar.prototype = {
		init: function () {
			this.config = $.extend({}, this.defaults, this.jsonConfig)
			this.construct().printMessage().createButton().removeData().togglejBar()
		},
		construct: function () {
			this.$elem.before(
				$('<div class="jbar-push"></div>' +
					'<a href="#" class="jbar-down-toggle">' +
					'<img src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" class="jbar-down-arrow" alt=""></a>')
			)
			this.$elem.append(
				$(
					'<div class="jbar-wrap"></div><a href="#" class="jbar-up-toggle">' +
					'<img src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" class="jbar-up-arrow" alt=""></a>'
				)
			)
			return this
		},
		printMessage: function () {
			if (this.jsonConfig.message) {
				this.$elem.children('.jbar-wrap').append(
					$('<p>' + this.jsonConfig.message + '</p>')
				)
			}
			return this
		},
		createButton: function () {
			if (this.jsonConfig.button && this.jsonConfig.url) {
				this.$elem.children('.jbar-wrap').append(
					$('<a href="' + this.jsonConfig.url + '" class="jbar-button">' + this.jsonConfig.button + '</p>')
				)
			}
			return this
		},
		removeData: function () {
			if (this.jsonConfig) {
				this.$elem.removeAttr('data-jbar')
			}
			return this
		},
		togglejBar: function () {

			// toggle variables
			var $this   = this.$elem
			var $push   = $('.jbar-push')
			var $toggle = $('.jbar-down-toggle')
			var $toggles = $('.jbar-down-toggle, .jbar-up-toggle')
			var clicks;
			
			// json open and closed states
			if (this.jsonConfig.state === 'closed') {
				$this.add($push).css({
					'marginTop' : - ($this.outerHeight())
				})
				$push.css({
					'height' : ($this.outerHeight())
				})
				$toggle.css({
					'visibility' : 'visible'
				})
				setTimeout(function () {
					$this.add($push).css({
						'display' : 'block'
					})
				}, 500)
			} else if (this.jsonConfig.state === 'open') {
				$toggle.css({
					'marginTop' : - ($toggle.outerHeight() + 5)
				})
				$this.add($push).css({
					'display' : 'block'
				})
				$push.css({
					'height' : $this.outerHeight(),
				})
				setTimeout(function () {
					$toggle.css({
						'display' : 'block',
						'visibility' : 'visible'
					})
				}, 500)
				$this.data('clicks', !clicks)
			}
			
			// toggle click handlers
			$toggles.on('click', function (e) {
				
				// global scope for JSON states
				clicks = $this.data('clicks')
				
				// data clicks
				if (!clicks) {
					$this.add($push).css({
						'marginTop' : '0'
					})
					$toggle.css({
						'marginTop' : - ($this.outerHeight() + 5)
					})
				} else {
					$this.add($push).css({
						'marginTop' : - ($this.outerHeight())
					})
					$toggle.css({
						'marginTop' : '0'
					})
				}
				
				// set data
				$this.data('clicks', !clicks)
				
				// stop anchor click
				e.preventDefault()
				
			})
		}
	}
	
	// merge defaults
	jBar.defaults = jBar.prototype.defaults
	
	// jBar plugin logic
	$.fn.jBar = function () {
	
		return this.each(function () {
			new jBar(this).init()
		})
	
	}
	
	// global
	window.jBar = jBar
	
	// IIDE immediate-invoked-data-expression
	$(function () {
	
		// if the validator is set to initialise
		if($('[data-init]').data('init') === 'jbar') {
		
			// run jBar based on JSON data
			$('[data-jbar]').jBar()
		
		}
		
	})

}(window, jQuery);