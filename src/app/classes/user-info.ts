import { MediumConfig } from './medium-config';
import { PlatformConfig } from './platform-config';
import { User } from './../interface/user';
export class UserInfo implements User {
    email: string;
    username: string;
    password: string;
    gender: string;
    dob: string;
    num_of_children: number;
    country: string;
    postcode: string;
    dp_url: string;
    platform_config: string;
    medium_config: string;

    constructor(email: string = null, username: string = "username", password: string = null, gender: string = "other",
        dob: string = "1999-01-01", num_of_children: number = 0, country: string = "AQ", postcode: string = "0000",
        dp_url: string = "/assets/actors/person.png", platform_config: string = JSON.stringify(new PlatformConfig()),
        medium_config: string = JSON.stringify(new MediumConfig())) {
        this.email = email;
        this.username = username;
        this.password = password;
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
