import { PlatformConfig } from './platform-config';
import { MediumConfig } from './medium-config';
import { UserUpdateInterface } from './../interface/user-update-interface';
export class UserUpdate implements UserUpdateInterface{
    gender: string;
    dob: string;
    num_of_children: number;
    country: string;
    postcode: string;
    dp_url: string;
    platform_config: string;
    medium_config: string;

    /**
     * This maps user update Json and saves all the data over a user that can be sent over to server to update user
     * @param gender string
     * @param dob string
     * @param num_of_children number
     * @param country string
     * @param postcode string
     * @param dp_url string
     * @param platform_config string
     * @param medium_config string
     */
    constructor (gender: string = "other", dob: string = "1999-01-01", num_of_children: number = 0,
    country: string = "AQ", postcode: string = "0000", dp_url: string = "/assets/actors/person.png",
    platform_config: string = JSON.stringify(new PlatformConfig()), medium_config: string = JSON.stringify(new MediumConfig())){
        this.gender = gender;
        this.dob = dob;
        this.num_of_children = num_of_children;
        this.country = country;
        this.postcode = postcode;
        this.dp_url = dp_url;
        this.platform_config = platform_config;
        this.medium_config = medium_config;
    }
}
