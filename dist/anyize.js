(function() {
  var Anyize,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  Anyize = (function() {
    function Anyize(options) {
      this.defaultAnimation = __bind(this.defaultAnimation, this);
      var anyizeAudioMarkup, anyizeImageMarkup;
      this.imgUrl = options.imgUrl || null;
      this.mp3Url = options.mp3Url || null;
      this.oggUrl = options.oggUrl || null;
      this.initialCss = options.initialCss || {
        "position": "fixed",
        "bottom": "-250px",
        "right": "0",
        "display": "block"
      };
      this.animation = options.animation || this.defaultAnimation;
      if (this.imgUrl) {
        anyizeImageMarkup = "<img id='anyize-image' style='display: none' src='" + this.imgUrl + "' />";
        $('body').append(anyizeImageMarkup);
      }
      if (this.mp3Url || this.oggUrl) {
        anyizeAudioMarkup = "<audio id='anyize-audio' preload='auto'>";
        if (this.mp3Url) {
          anyizeAudioMarkup += "<source src='" + this.mp3Url + "' />";
        }
        if (this.oggUrl) {
          anyizeAudioMarkup += "<source src='" + this.oggUrl + "' />";
        }
        anyizeAudioMarkup += "</audio>";
        $('body').append(anyizeAudioMarkup);
      }
      $('#anyize-image').css(this.initialCss);
    }

    Anyize.prototype.reset = function() {
      return $('#anyize-image').css(this.initialCss);
    };

    Anyize.prototype.fire = function() {
      return this.animation();
    };

    Anyize.prototype.defaultAnimation = function() {
      $('#anyize-audio').each(function(idx, elem) {
        return elem.play();
      });
      $('#anyize-image').animate({
        "bottom": "0"
      }, 750, function() {
        return $(this).delay(1500).animate({
          "bottom": "-250px"
        }, 750);
      });
      return this.reset;
    };

    return Anyize;

  })();

  this.Anyize = Anyize;

}).call(this);
