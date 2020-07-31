declare type ShareResult = {
    extra: string;
    otherUid?: string;
    shareResult: number;
    type: string;
};
declare type BaseConfig = {
    type?: string;
    base64Image?: string;
    clan?: {
        icon: string;
        message: string;
        title: string;
    };
    pm?: {
        icon: string;
        message: string;
        title: string;
    };
    feed?: {
        icon: string;
        message: string;
        title: string;
    };
    extra?: Extra;
    shareConfig?: string;
};
interface Extra {
    activityId?: number;
    customUrl?: string;
    type?: string;
    custom?: {
        activityUri?: string;
        activityTitle?: string;
        activityDesc?: string;
    };
}
declare type Opt = {
    initShare?: boolean;
    isLogin?: boolean;
    config?: BaseConfig;
    complete?: (res: ShareResult) => void;
    before?: (e: BaseConfig) => boolean;
};
declare class GameShare {
    private option;
    constructor(option: Opt);
    private init;
    openShare(): void;
    shareForType(type: string): void;
    private initShare;
    private extend;
    private extraAction;
    private setShareForTypeConfig;
    setConfig(config: Opt): void;
}
export { GameShare };
