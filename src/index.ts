const context = window as any;
type OBJ = {
  [prop: string]: any;
};
type ShareResult = {
  extra: string;
  otherUid?: string;
  /**是否分享成功 1成功 0失败 */
  shareResult: number;
  /**分享类型 */
  type: string;
};
type ShareForTypeConfig = {
  base64Image?: string;
  extra?: Extra;
  icon?: string;
  message?: string;
  type?: string;
  shareUrl?: string;
  title?: string;
};
type BaseConfig = {
  /**单独分享的类型 */
  type?: string;
  /**分享图 */
  base64Image?: string;
  /**家族的分享信息 */
  clan?: {
    icon: string;
    message: string;
    title: string;
  };
  /**私信的分享信息 */
  pm?: {
    icon: string;
    message: string;
    title: string;
  };
  /**动态的分享信息 */
  feed?: {
    icon: string;
    message: string;
    title: string;
  };

  /**传给服务端的字段 */
  extra?: Extra;
  /**feed,pm,clan,qq,qzone,wxpyq,wxhy”分别显示动态、私信、家族、qq、qq空间、微信朋友圈、微信好友。该参数为空时显示所有的分享渠道*/
  shareConfig?: string;
};
interface Extra {
  /**分享活动id */
  activityId?: number;
  /**分享的链接 */
  customUrl?: string;
  /**分享的类型 */
  type?: string;
  custom?: {
    activityUri?: string;
    activityTitle?: string;
    activityDesc?: string;
  };
}
type ServeConfig = BaseConfig & {
  /**分享内容 */
  shareContent: string;
  /**分享标题 */
  shareTitle: string;
  /**分享icon */
  shareIcon: string;
  /**分享url */
  shareUrl: string;
};
type Opt = {
  /**右上角是否使用后台配置 */
  initShare?: boolean;
  /**是否检测登录 */
  isLogin?: boolean;
  /**分享配置 */
  config?: BaseConfig;
  /**完成回调 */
  complete?: (res: ShareResult) => void;
  /**分享之前的事件  可以阻止分享 */
  before?: (e: BaseConfig) => boolean;
};
class GameShare {
  private option: Opt = {
    initShare: true,
    isLogin: false,
    config: {
      shareConfig: 'clan',
    },
    complete: (e) => {
      console.log(e);
    },
    before: (e: BaseConfig) => {
      console.log(e);
      return true;
    },
  };
  constructor(option: Opt) {
    if (!(this instanceof GameShare)) {
      return new GameShare(option);
    }
    this.option = option;
    this.init();
  }
  private init() {
    if (context.shareAPI) {
      context.shareCompleted = (e: ShareResult) => {
        this.option.complete && this.option.complete(e);
      };
      context.openShare = () => {
        if (this.option.isLogin) {
          if (context.login.onLoadCookieForJs() == '') {
            context.login.onJSIvoke();
            return;
          }
        }
        if (this.option.initShare) {
          this.initShare();
        } else {
          this.openShare();
        }
      };
    }
  }
  /**
   * 定制分享
   */
  openShare() {
    context.setShareData = (e: ServeConfig) => {
      if (this.option.before && !this.option.before(e)) {
        return false;
      }
      let config = this.extend(
        e,
        this.option.config ? this.option.config : {}
      ) as ServeConfig;
      config = this.extraAction(config);
      const newconfig = JSON.stringify(config);
      context.shareAPI.onJsShare(newconfig);
    };
    context.shareAPI.getShareData();
  }
  /**
   * 单渠道分享
   * @param type feed,pm,clan,qq,qzone,wxpyq,wxhy”分别显示动态、私信、家族、qq、qq空间、微信朋友圈、微信好友
   */
  shareForType(type: string) {
    context.setShareData = (e: ServeConfig) => {
      if (this.option.before && !this.option.before(e)) {
        return false;
      }
      let config = this.extend(
        e,
        this.option.config ? this.option.config : {}
      ) as ServeConfig;
      config = this.extraAction(config);
      config.type = type;
      const newconfig = JSON.stringify(this.setShareForTypeConfig(config));
      context.shareAPI.onJsShareForType(newconfig);
    };
    context.shareAPI.getShareData();
  }
  /**
   * 右上角的默认分享
   */
  private initShare() {
    context.setShareData = (e: BaseConfig) => {
      if (this.option.before && !this.option.before(e)) {
        return false;
      }
      const config = JSON.stringify(e);
      context.shareAPI.onJsShare(config);
    };
    context.shareAPI.getShareData();
  }
  /**深复制 */
  private extend(target: OBJ, options: OBJ) {
    for (const name in options) {
      const copy = options[name];
      if (copy instanceof Function) {
        target[name] = options[name];
      } else if (copy instanceof Object) {
        target[name] = this.extend(target[name] ? target[name] : {}, copy);
      } else {
        target[name] = options[name];
      }
    }
    return target;
  }
  /**修改外部分享的自定义参数 */
  private extraAction(config: ServeConfig) {
    if (
      config.extra &&
      config.extra.custom &&
      config.extra.custom.activityUri
    ) {
      if (/\?/.test(config.shareUrl)) {
        config.shareUrl = config.shareUrl.replace(/&*ext=\S*/gi, '');
        config.shareUrl =
          config.shareUrl + '&ext=' + config.extra.custom.activityUri;
      } else {
        config.shareUrl =
          config.shareUrl + '?ext=' + config.extra.custom.activityUri;
      }
    }
    return config;
  }
  /**设置单渠道分享配置 */
  private setShareForTypeConfig(config: ServeConfig) {
    const newconfig: ShareForTypeConfig = {
      extra: config.extra,
      base64Image: config.base64Image,
      icon: config.shareIcon,
      message: config.shareContent,
      type: config.type,
      shareUrl: config.shareUrl,
      title: config.shareTitle,
    };
    return newconfig;
  }
  /**更换配置 */
  setConfig(config: Opt) {
    this.option = this.extend(this.option, config);
  }
}
export { GameShare };
