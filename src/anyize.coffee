class Anyize
    constructor: (options) ->
        @imgUrl = options.imgUrl or null
        @mp3Url = options.mp3Url or null
        @oggUrl = options.oggUrl or null

        @initialCss = options.initialCss or {
            "position":"fixed",
            "bottom": "-250px",
            "right" : "0",
            "display" : "block"
        }

        @animation = options.animation or @defaultAnimation

        if @imgUrl
            anyizeImageMarkup = "<img id='anyize-image' style='display: none' src='#{@imgUrl}' />"
            $('body').append(anyizeImageMarkup)

        if @mp3Url or @oggUrl
            anyizeAudioMarkup = "<audio id='anyize-audio' preload='auto'>"
            if @mp3Url
                anyizeAudioMarkup += "<source src='#{@mp3Url}' />"
            if @oggUrl
                anyizeAudioMarkup += "<source src='#{@oggUrl}' />"
            anyizeAudioMarkup += "</audio>"
            $('body').append(anyizeAudioMarkup)

        $('#anyize-image').css(@initialCss)

    reset: ->
        $('#anyize-image').css(@initialCss)

    fire: ->
        @animation()

    defaultAnimation: =>
        $('#anyize-audio').each (idx, elem) -> elem.play()
        $('#anyize-image').animate { "bottom" : "0" }, 750, ->
            $(@).delay(1500).animate { "bottom" : "-250px" }, 750
        @reset

@Anyize = Anyize
