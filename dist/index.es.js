var context = window;
var GameShare = (function () {
    function GameShare(option) {
        this.option = {
            initShare: true,
            isLogin: false,
            config: {
                shareConfig: 'clan',
            },
            complete: function (e) {
                console.log(e);
            },
            before: function (e) {
                console.log(e);
                return true;
            },
        };
        if (!(this instanceof GameShare)) {
            return new GameShare(option);
        }
        this.option = option;
        this.init();
    }
    GameShare.prototype.init = function () {
        var _this = this;
        if (context.shareAPI) {
            context.shareCompleted = function (e) {
                _this.option.complete && _this.option.complete(e);
            };
            context.openShare = function () {
                if (_this.option.isLogin) {
                    if (context.login.onLoadCookieForJs() == '') {
                        context.login.onJSIvoke();
                        return;
                    }
                }
                if (_this.option.initShare) {
                    _this.initShare();
                }
                else {
                    _this.openShare();
                }
            };
        }
    };
    GameShare.prototype.openShare = function () {
        var _this = this;
        context.setShareData = function (e) {
            if (_this.option.before && !_this.option.before(e)) {
                return false;
            }
            var config = _this.extend(e, _this.option.config ? _this.option.config : {});
            config = _this.extraAction(config);
            var newconfig = JSON.stringify(config);
            context.shareAPI.onJsShare(newconfig);
        };
        context.shareAPI.getShareData();
    };
    GameShare.prototype.shareForType = function (type) {
        var _this = this;
        context.setShareData = function (e) {
            if (_this.option.before && !_this.option.before(e)) {
                return false;
            }
            var config = _this.extend(e, _this.option.config ? _this.option.config : {});
            config = _this.extraAction(config);
            config.type = type;
            var newconfig = JSON.stringify(_this.setShareForTypeConfig(config));
            context.shareAPI.onJsShareForType(newconfig);
        };
        context.shareAPI.getShareData();
    };
    GameShare.prototype.initShare = function () {
        var _this = this;
        context.setShareData = function (e) {
            if (_this.option.before && !_this.option.before(e)) {
                return false;
            }
            var config = JSON.stringify(e);
            context.shareAPI.onJsShare(config);
        };
        context.shareAPI.getShareData();
    };
    GameShare.prototype.extend = function (target, options) {
        for (var name_1 in options) {
            var copy = options[name_1];
            if (copy instanceof Function) {
                target[name_1] = options[name_1];
            }
            else if (copy instanceof Object) {
                target[name_1] = this.extend(target[name_1] ? target[name_1] : {}, copy);
            }
            else {
                target[name_1] = options[name_1];
            }
        }
        return target;
    };
    GameShare.prototype.extraAction = function (config) {
        if (config.extra &&
            config.extra.custom &&
            config.extra.custom.activityUri) {
            if (/\?/.test(config.shareUrl)) {
                config.shareUrl = config.shareUrl.replace(/&*ext=\S*/gi, '');
                config.shareUrl =
                    config.shareUrl + '&ext=' + config.extra.custom.activityUri;
            }
            else {
                config.shareUrl =
                    config.shareUrl + '?ext=' + config.extra.custom.activityUri;
            }
        }
        return config;
    };
    GameShare.prototype.setShareForTypeConfig = function (config) {
        var newconfig = {
            extra: config.extra,
            base64Image: config.base64Image,
            icon: config.shareIcon,
            message: config.shareContent,
            type: config.type,
            shareUrl: config.shareUrl,
            title: config.shareTitle,
        };
        return newconfig;
    };
    GameShare.prototype.setConfig = function (config) {
        this.option = this.extend(this.option, config);
    };
    return GameShare;
}());

export { GameShare };
