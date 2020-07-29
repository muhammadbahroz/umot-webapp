import { User } from './../interface/user';
export class UserInfo implements User {
    email:           string;
    username:        string;
    password:        string;
    gender:          string;
    dob:             string;
    num_of_children: number;
    country:         string;
    postcode:        string;
    dp_url:          string;
    platform_config: string;
    medium_config:   string;

    constructor(){
        
    }
}
