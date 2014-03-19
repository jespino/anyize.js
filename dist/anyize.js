(function() {
  var Anyize,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  Anyize = (function() {
    Anyize.prototype._randomString = function(length) {
      var chars, x;
      if (length == null) {
        length = 5;
      }
      chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz'.split('');
      return ((function() {
        var _i, _results;
        _results = [];
        for (x = _i = 1; 1 <= length ? _i <= length : _i >= length; x = 1 <= length ? ++_i : --_i) {
          _results.push(chars[Math.floor(Math.random() * chars.length)]);
        }
        return _results;
      })()).join('');
    };

    function Anyize(options) {
      this.crossScreenAnimation = __bind(this.crossScreenAnimation, this);
      this.defaultAnimation = __bind(this.defaultAnimation, this);
      var anyizeAudioMarkup, anyizeImageMarkup;
      this._randomId = this._randomString(5);
      this.imgUrl = options.imgUrl || null;
      this.mp3Url = options.mp3Url || null;
      this.oggUrl = options.oggUrl || null;
      this.animation = options.animation || this.defaultAnimation;
      this.reset = options.reset || this.defaultReset;
      if (this.imgUrl) {
        anyizeImageMarkup = "<img id='" + this._randomId + "-image' style='display: none' src='" + this.imgUrl + "' />";
        $('body').append(anyizeImageMarkup);
      }
      if (this.mp3Url || this.oggUrl) {
        anyizeAudioMarkup = "<audio id='" + this._randomId + "-audio' preload='auto'>";
        if (this.mp3Url) {
          anyizeAudioMarkup += "<source src='" + this.mp3Url + "' />";
        }
        if (this.oggUrl) {
          anyizeAudioMarkup += "<source src='" + this.oggUrl + "' />";
        }
        anyizeAudioMarkup += "</audio>";
        $('body').append(anyizeAudioMarkup);
      }
      $("#" + this._randomId + "-image").on('load', (function(_this) {
        return function() {
          console.log($("#" + _this._randomId + "-image").height() - 10);
          _this.initialCss = options.initialCss || {
            "position": "fixed",
            "bottom": -$("#" + _this._randomId + "-image").height() - 10,
            "right": "0",
            "display": "block"
          };
          return $("#" + _this._randomId + "-image").css(_this.initialCss);
        };
      })(this));
    }

    Anyize.prototype.defaultReset = function(imgElement, audioElement) {
      return imgElement.css(this.initialCss);
    };

    Anyize.prototype.fire = function() {
      return this.animation($("#" + this._randomId + "-image"), $("#" + this._randomId + "-audio"));
    };

    Anyize.prototype.defaultAnimation = function(imgElement, audioElement) {
      audioElement.each(function(idx, elem) {
        return elem.play();
      });
      return imgElement.animate({
        "bottom": "0"
      }, 750, (function(_this) {
        return function() {
          return imgElement.delay(1500).animate({
            "bottom": -imgElement.height() - 10
          }, 750, function() {
            return _this.reset(imgElement, audioElement);
          });
        };
      })(this));
    };

    Anyize.prototype.crossScreenAnimation = function(imgElement, audioElement) {
      audioElement.each(function(idx, elem) {
        return elem.play();
      });
      return imgElement.animate({
        "right": $(window).width()
      }, 5000, (function(_this) {
        return function() {
          return _this.reset(imgElement, audioElement);
        };
      })(this));
    };

    Anyize.prototype.setCrossScreenCss = function() {
      var setCss;
      setCss = (function(_this) {
        return function() {
          _this.initialCss = {
            "position": "fixed",
            "bottom": "0",
            "right": -$("#" + _this._randomId + "-image").height() - 10,
            "display": "block"
          };
          return $("#" + _this._randomId + "-image").css(_this.initialCss);
        };
      })(this);
      setCss();
      return $("#" + this._randomId + "-image").on("load", setCss);
    };

    return Anyize;

  })();

  this.Anyize = Anyize;

}).call(this);
