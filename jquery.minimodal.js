/*
  @author: Mathieu Sylvain
  @url: http://hibe.com
  @usage: miniModal(); // applied tags to be used for all implementations
          $('.miniModal').miniModal(options);
  @license: Released under the MIT License, Copyright (c) 2009 Mathieu Sylvain & Shopmedia inc.
  @version: 0.1

 See the default settings at the bottom for more reference on how to customize this plugin
 via the options.

*/

(function($){
$.fn.miniModal = function(options) {

	// Extends the default options with the users parameters
	var opts = $.extend({}, $.fn.miniModal.defaults, options);

	// Initialize the plugin
	function init($this){
		// iterate and reformat each matched element
		return $this.each(function() {
			var trigger = $(this)

			var _onShow = opts.onShow
			var onShow = function($this) {
				$this.show();
				if (opts.onBeforeShow($this)) {
					_onShow($this);
				}
			}

			$("#" + this.id).click(function(){
				var newModal = instantiateModal();
				$(newModal).show();
			})

			var instantiateModal = function() {
				var newModal = opts.templateWindow($this);
				newModal.hide();
				// Adds the new modal window to the trigger
				trigger.miniModal = newModal;
				var $this = newModal;
				$this.trigger = trigger;

				if (trigger.metadata) {
					$this.metadata = trigger.metadata();
				}

				augmentModalDOM(newModal);
				a = $("body").append(newModal);
				var newOpts = $.extend({}, opts);
				newOpts.onShow = null; // Override this option to make sure it isnt called by jqModal
				newOpts.onHide = function(hash){
					hash.o.remove()
					doCancel(hash.w);
				}

				$($this).jqm(newOpts);
				onShow($this);

				return $this;
			}

		})
	}

	var killModal = function($this) {
		$($this).remove();
	}

	function augmentModalDOM($this) {
		var inner = $this.wrapInner("<div class='miniModal-inner'></div>");
		var buttonBar = $(".miniModal-placeholder", inner.append(opts.buttonBarTemplate()));

		if (opts.showOk) {
			var buttonOk = opts.buttonTemplate("miniModal-buttonOk", "Ok")
			buttonBar.append(
				$(buttonOk).click(function(){ doOk($this) })
			);
		}
		if (opts.showCancel) {
			var buttonCancel = opts.buttonTemplate("miniModal-buttonCancel", "Cancel")
			buttonBar.append(
				$(buttonCancel).click(function(){ doCancel($this) })
			);
		}
		if (!opts.showTitle) {
			$(".miniModal-header", $this).remove();
		}
	}

	function doCancel($this) {
		var result = opts.onCancel($this);
		if (result = true) {
			$this.jqmHide();
			killModal($this);
		}
	}

	function doOk($this) {
		var result = opts.onOk($this);
		if (result = true) {
			$this.jqmHide();
		}
	}

	function setTitle($this, strTitle) {
		$(".miniModal-titlePlacehodler", $this).html(strTitle);
	}
	
	init(this);
};

// Default settings for miniModal
$.fn.miniModal.defaults = {
	trigger: null,
	showOk: true,
	showCancel: true,
	showTitle: true,
	title: "Window title goes here...",
	isVolatile: true,
	offsetTop: 20,
	offsetLeft: 20,
	buttonBarTemplate: function(label) {
		return $("<div class='miniModal-buttonBar'><div class='miniModal-placeholder'></div></div>");
	},
	buttonTemplate: function(id, label) {
		return $("<button id='" + id + "'>" + label + "</button>");
	},
	onShow: function($this){
		var modal = $this;
		var trigger = $this.trigger;
		var position = trigger.offset();
		var width = trigger.width();
		modal[0].style.top = (position.top - 20) + "px";
		modal[0].style.left = (position.left + (width/2)) + "px";
		modal.jqmShow();
	},
	onBeforeShow: function(hash, $this) {
		return true;
	},
	onOk: function($this) {
		return true;
	},
	onCancel: function($this) {
		return true;
	},
	templateWindow: function($this) {
		return $('<div class="miniModal"><div class="miniModal-header"><h2><span class="miniModal-titlePlacehodler"></span></h2></div><div class="miniModal-body"></div></div>');
	}
};
})(jQuery);

