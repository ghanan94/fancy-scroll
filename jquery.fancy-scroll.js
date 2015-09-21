/* ===========================================================
 * jquery-fancy-scroll.js v1.1
 * ===========================================================
 * Copyright 2013 Pete Rojwongsuriya.
 * http://www.thepetedesign.com
 *
 * Add Overflow Scroll Effect like on iOS/Android 
 * but for your website
 *
 * https://github.com/peachananr/fancy-scroll
 *
 * ========================================================== */

!function($){
  
  var defaults = {
		animation: "bounce",
    horizontal: false,
		distance: 50,
		glowColor: "#02A1FA",
		animDuration: "0.2s",
		animEasing: "cubic-bezier(0.175, 0.885, 0.420, 1.310)",
		innerWrapper: document
	};

  $.fn.fancy_scroll = function(options) {
    var settings = $.extend({}, defaults, options),
        el = $(this).find(settings.innerWrapper),
        container = $(this),
        posWas = 0,
        status = "off";
    if (settings.innerWrapper != document) var el = container.find($(settings.innerWrapper));
    

    $.fn.bounceEffect = function(d, s, anim, settings) {
      if (settings.innerWrapper == document) {
        var selector = $(this).find("body")
      } else {
        var selector = $(this)
      }
      
      if (settings.horizontal) {
        selector.css({
          "-webkit-transform": "translate3d(" + d + "px, 0, 0)", 
          "-webkit-transition": "all " + s + " " + anim,
          "-moz-transform": "translate3d(" + d + "px, 0, 0)", 
          "-moz-transition": "all " + s + " " + anim,
          "-ms-transform": "translate3d(" + d + "px, 0, 0)", 
          "-ms-transition": "all " + s + " " + anim,
          "transform": "translate3d(" + d + "px, 0, 0)", 
          "transition": "all " + s + " " + anim
        })
      } else {
        selector.css({
          "-webkit-transform": "translate3d(0, " + d + "px, 0)", 
          "-webkit-transition": "all " + s + " " + anim,
          "-moz-transform": "translate3d(0, " + d + "px, 0)", 
          "-moz-transition": "all " + s + " " + anim,
          "-ms-transform": "translate3d(0, " + d + "px, 0)", 
          "-ms-transition": "all " + s + " " + anim,
          "transform": "translate3d(0, " + d + "px, 0)", 
          "transition": "all " + s + " " + anim
        })
      }
    }


    $.fn.glowEffect = function(d, s, anim, settings) {
      if (settings.innerWrapper == document) {
        var selector = $(this).find("body")
      } else {
        var selector = $(this)
      }

      if (d) {
        if (settings.horizontal) {
          selector.css({
            "box-shadow": settings.glowColor + " " + d + "px 0 50px -30px inset", 
            "-webkit-transition": "all " + s + " " + anim,
            "-moz-transition": "all " + s + " " + anim,
            "-ms-transition": "all " + s + " " + anim,
            "transition": "all " + s + " " + anim,
          })
        } else {
          selector.css({
            "box-shadow": settings.glowColor + " 0 " + d + "px 50px -30px inset", 
            "-webkit-transition": "all " + s + " " + anim,
            "-moz-transition": "all " + s + " " + anim,
            "-ms-transition": "all " + s + " " + anim,
            "transition": "all " + s + " " + anim,
          })
        }
      } else {
        selector.css({
          "box-shadow": "none", 
          "-webkit-transition": "all " + s + " " + anim,
          "-moz-transition": "all " + s + " " + anim,
          "-ms-transition": "all " + s + " " + anim,
          "transition": "all " + s + " " + anim,
        })
      }
    }
    
    
    container.scroll(function(event) {
      var pos, container_hw, el_hw; 

      if (settings.horizontal) {
        pos = container.scrollLeft();
        container_hw = container.width();
        el_hw = el.width();
      } else {
        pos = container.scrollTop();
        container_hw = container.height();
        el_hw = el.height();
      }

      if (pos > posWas) { // if the user is scrolling down/left...
        if ((pos + container_hw >= el_hw - 1) && status == "off") {
          status = "on"

          // Since scroll left is checking within +1 px, 
          // set the scroll to max ammount if not already to prevent double effects
          if (pos + container_hw < el_hw) {
            if (settings.horizontal) {
              container.scrollLeft(el_hw);
            } else {
              container.scrollTop(el_hw);
            }
          }

          switch (settings.animation) {
            case "bounce":
              el.bounceEffect(settings.distance * -1, settings.animDuration, settings.animEasing, settings);
              el.one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(e) {
                el.bounceEffect("0", settings.animDuration, settings.animEasing, settings);
                el.one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(e) {
                  status = "off"
                });
              });
              break;

            case "glow":
              el.glowEffect(settings.distance * -1, settings.animDuration, settings.animEasing, settings);
              el.one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(e) {
                el.glowEffect(null, settings.animDuration, settings.animEasing, settings);
                el.one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(e) {
                  status = "off"
                });
              });
              break;
          }
        }
      } else if (pos < posWas) { // if the user is scrolling up/right...
        if ((pos + container_hw != el_hw) && status == "off") {
          if (pos <= 0) {
            status = "on"

            switch (settings.animation) {
              case "bounce":
                el.bounceEffect(settings.distance, settings.animDuration, settings.animEasing, settings);
                el.one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(e) {
                  el.bounceEffect("0", settings.animDuration, settings.animEasing, settings);
                  el.one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(e) {
                    status = "off"
                  });
                });
                break;

              case "glow":
                el.glowEffect(settings.distance, settings.animDuration, settings.animEasing, settings);
                el.one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(e) {
                  el.glowEffect(null, settings.animDuration, settings.animEasing, settings);
                  el.one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(e) {
                    status = "off"
                  });
                });
                break;
            }
          }
        }
      } 

      posWas = pos; 
    });
  }
}(window.jQuery);
