class Anyize
    _randomString: (length=5) ->
        chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz'.split('')
        return (chars[Math.floor(Math.random() * chars.length)] for x in [1..length]).join('')

    constructor: (options) ->
        @locked = false

        @_randomId = @_randomString(5)
        @imgUrl = options.imgUrl or null
        @mp3Url = options.mp3Url or null
        @oggUrl = options.oggUrl or null

        @animation = options.animation or @defaultAnimation
        @reset = options.reset or @defaultReset

        if @imgUrl
            anyizeImageMarkup = "<img id='#{@_randomId}-image' style='display: none' src='#{@imgUrl}' />"
            $('body').append(anyizeImageMarkup)

        if @mp3Url or @oggUrl
            anyizeAudioMarkup = "<audio id='#{@_randomId}-audio' preload='auto'>"
            if @mp3Url
                anyizeAudioMarkup += "<source src='#{@mp3Url}' />"
            if @oggUrl
                anyizeAudioMarkup += "<source src='#{@oggUrl}' />"
            anyizeAudioMarkup += "</audio>"
            $('body').append(anyizeAudioMarkup)

        @initialCss = options.initialCss or =>
            {
                "position":"fixed"
                "bottom": -$("##{@_randomId}-image").height() - 10
                "right" : "0"
                "display" : "block"
            }

        $("##{@_randomId}-image").on 'load', =>
            $("##{@_randomId}-image").css(@initialCss())

    defaultReset: (imgElement, audioElement)->
        imgElement.css(@initialCss)

    fire: ->
        imgElement = $("##{@_randomId}-image")
        audioElement = $("##{@_randomId}-audio")
        @locked = true
        @animation(imgElement, audioElement).then =>
            @locked = false
            @reset(imgElement, audioElement)

    defaultAnimation: (imgElement, audioElement) =>
        defer = $.Deferred()
        audioElement.each (idx, elem) -> elem.play()
        imgElement.animate { "bottom" : "0" }, 750, =>
            imgElement.delay(1500).animate { "bottom" : -imgElement.height() - 10 }, 750, =>
                defer.resolve()
        return defer.promise()

    crossScreenAnimation: (imgElement, audioElement) =>
        defer = $.Deferred()
        audioElement.each (idx, elem) -> elem.play()
        imgElement.animate { "right" : $(window).width() }, 5000, =>
            defer.resolve()
        return defer.promise()

    crossScreenCss: ->
        @initialCss = {
            "position":"fixed"
            "bottom": "0"
            "right": -$("##{@_randomId}-image").height() - 10
            "display" : "block"
        }

    raptorizeAnimation: (imgElement, audioElement) =>
        defer = $.Deferred()
        audioElement.each (idx, elem) -> elem.play()
        imgElement.animate {"bottom" : "0"}, =>
            imgElement.animate {"bottom" : "-100px"}, 100, =>
                imgElement.delay(300).animate {"right": $(window).width()}, 2200, =>
                    defer.resolve()
        return defer.promise()

@Anyize = Anyize
