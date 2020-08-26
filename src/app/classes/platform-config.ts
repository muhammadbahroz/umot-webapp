import { PlatformConfigInterface } from './../interface/platform-config-interface';
export class PlatformConfig implements PlatformConfigInterface{
    hbo: boolean;
    netflix: boolean;
    amazonPrimeVideo: boolean;
    appleTV: boolean;
    movieStarPlus: boolean;
    disneyPlus: boolean;
    filmIn: boolean;
    googlePlay: boolean;

    constructor(){
        this.hbo = false;
        this.netflix = false;
        this.amazonPrimeVideo = false;
        this.appleTV = false;
        this.movieStarPlus = false;
        this.disneyPlus = false;
        this.filmIn = false;
        this.googlePlay = false;
    }
}
