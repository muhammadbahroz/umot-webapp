import { MediumConfigInterface } from '../interface/medium-config-interface';

export class MediumConfig implements MediumConfigInterface {
    desktop: boolean;
    tablet: boolean;
    mobile: boolean;
    chromecast: boolean;
    projector: boolean;
    smartTV: boolean;
    firetv: boolean;

    constructor(){
        this.desktop = false;
        this.tablet = false;
        this.mobile = false;
        this.chromecast = false;
        this.projector = false;
        this.smartTV = false;
        this.firetv = false;
    }
}
