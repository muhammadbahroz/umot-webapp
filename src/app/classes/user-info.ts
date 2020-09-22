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

    constructor(email: string = null, username: string = null, password: string = null, gender: string = null,
        dob: string = null, num_of_children: number = 0, country: string = null, postcode: string = null,
        dp_url: string = null, platform_config: string = null, medium_config: string = null) {
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
