function PopupManager(options) {
    var settings = {
        maskClass: 'popup-mask',
        popupClass: 'popup',
        fadeInTime: 300,
        reposition: true,
        beforeShow: function () { },
        afterClose: function () { }
    };

    if (options) {
        $.extend(settings, options);
    }

    var mask = $('.' + settings.maskClass);
    var popup = $('.' + settings.popupClass);

    var setPosition = function () {
        var scrollWidth = document.documentElement.scrollWidth || document.body.scrollWidth;
        var scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
        var clientWidth = document.documentElement.clientWidth || document.body.clientWidth;
        var clientHeight = document.documentElement.clientHeight || document.body.clientHeight;
        var scrollTop = document.documentElement.scrollTop || document.body.scrollTop
        var realWidth = scrollWidth > clientWidth ? scrollWidth : clientWidth;
        var realHeight = scrollHeight > clientHeight ? scrollHeight : clientHeight;
        var ww = $(window).width();
        var wh = $(window).height();
        var popupWidth = popup.width();
        var popupHeight = popup.height();

        mask.css({ 'top': 0, 'left': 0 }).width(realWidth).height(realHeight);
        popup.css({ 'left': (ww - popupWidth) / 2, 'top': scrollTop + (wh - popupHeight) / 2 });
    };

    PopupManager.prototype.show = function () {
        settings.beforeShow();
        setPosition();
        mask.fadeIn(settings.fadeInTime, function () {
            popup.show();
        });
    };

    PopupManager.prototype.close = function () {
        popup.hide();
        mask.hide();
        settings.afterClose();
    };

    $(window).bind('resize', function () {
        if (settings.reposition) {
            setPosition();
        }
    });
}