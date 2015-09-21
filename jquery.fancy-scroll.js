/* ===========================================================
 * jquery-fancy-scroll.js v1
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
    direction: "vertical",
		bounceDistance: 50,
		glowColor: "#02A1FA",
		animDuration: "0.2s",
		animEasing: "cubic-bezier(0.175, 0.885, 0.420, 1.310)",
		innerWrapper: document
	};

  $.fn.fancy_scroll = function(options) {
    var settings = $.extend({}, defaults, options),
        el = $(settings.innerWrapper),
        container = $(this),
        posWas = 0,
        status = "off";
    if (settings.innerWrapper != document) var el = container.find($(settings.innerWrapper));
    
    
    $.fn.bounceEffect = function(px, s, anim, settings) {
      if (settings.innerWrapper == document) {
        var selector = $(this).find("body")
      } else {
        var selector = $(this)
      }
      
      if (settings.direction == "horizontal") {
        selector.css({
          "-webkit-transform": "translate3d(" + px + ", 0, 0)", 
          "-webkit-transition": "all " + s + " " + anim,
          "-moz-transform": "translate3d(" + px + ", 0, 0)", 
          "-moz-transition": "all " + s + " " + anim,
          "-ms-transform": "translate3d(" + px + ", 0, 0)", 
          "-ms-transition": "all " + s + " " + anim,
          "transform": "translate3d(" + px + ", 0, 0)", 
          "transition": "all " + s + " " + anim
        })
      } else {
        selector.css({
          "-webkit-transform": "translate3d(0, " + px + ", 0)", 
          "-webkit-transition": "all " + s + " " + anim,
          "-moz-transform": "translate3d(0, " + px + ", 0)", 
          "-moz-transition": "all " + s + " " + anim,
          "-ms-transform": "translate3d(0, " + px + ", 0)", 
          "-ms-transition": "all " + s + " " + anim,
          "transform": "translate3d(0, " + px + ", 0)", 
          "transition": "all " + s + " " + anim
        })
      }
    }


    $.fn.glowEffect = function(shadow, s, anim, settings) {
      if (settings.innerWrapper == document) {
        var selector = $(this).find("body")
      } else {
        var selector = $(this)
      }
      
      selector.css({
        "box-shadow": shadow, 
        "-webkit-transition": "all " + s + " " + anim,
        "-moz-transition": "all " + s + " " + anim,
        "-ms-transition": "all " + s + " " + anim,
        "transition": "all " + s + " " + anim,
      })
    }
    
    
    container.scroll(function(event) {
      var pos, container_hw, el_hw; 

      if (settings.direction == "horizontal") {
        pos = container.scrollLeft();
        container_hw = container.width();
        el_hw = el.width();
      } else {
        pos = container.scrollTop();
        container_hw = container.height();
        el_hw = el.height();
      }

      if (pos > posWas) { // if the user is scrolling down/left...
        if ((pos + container_hw >= el_hw) && status == "off") {
          status = "on"
          switch (settings.animation) {
            case "bounce":
              el.bounceEffect(settings.bounceDistance * -1 + "px", settings.animDuration, settings.animEasing, settings);
              el.one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(e) {
                el.bounceEffect("0", settings.animDuration, settings.animEasing, settings);
                el.one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(e) {
                  status = "off"
                });
              });
              break;

            case "glow":
              if (settings.direction == "horizontal") {
                el.glowEffect(settings.glowColor + " -30px 0 50px -30px inset", settings.animDuration, settings.animEasing, settings);
              } else {
                el.glowEffect(settings.glowColor + " 0 -30px 50px -30px inset", settings.animDuration, settings.animEasing, settings);
              }

              el.one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(e) {
                el.glowEffect("none", settings.animDuration, settings.animEasing, settings);
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
                el.bounceEffect(settings.bounceDistance + "px", settings.animDuration, settings.animEasing, settings);
                el.one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(e) {
                  el.bounceEffect("0", settings.animDuration, settings.animEasing, settings);
                  el.one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(e) {
                    status = "off"
                  });
                });
                break;

              case "glow":
                if (settings.direction == "horizontal") {
                  el.glowEffect(settings.glowColor + " 30px 0 50px -30px inset", settings.animDuration, settings.animEasing, settings);
                } else {
                  el.glowEffect(settings.glowColor + " 0 30px 50px -30px inset", settings.animDuration, settings.animEasing, settings);
                }
            
                el.one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(e) {
                  el.glowEffect("none", settings.animDuration, settings.animEasing, settings);
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


