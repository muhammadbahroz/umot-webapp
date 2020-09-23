export interface UserUpdateInterface {
    /**
     * this interface maps user update JSON
     * @param gender  string
     * @param dob  string
     * @param num_of_children  number
     * @param country  string
     * @param postcode  string
     * @param dp_url  string
     * @param platform_config  string
     * @param medium_config  string 
     */
    gender: string;
    dob: string;
    num_of_children: number;
    country: string;
    postcode: string;
    dp_url: string;
    platform_config: string;
    medium_config: string;
}