/**
 * This Interface maps the json that carries the Complete Data of a movie from the server.
 * @param statusCode null
 * @param data Data
 * @param message string
 * @param success string
 * @param movieID string
 */
export interface MovieInterface {
    statusCode: null;
    data:       DataInterface;
    message:    string;
    success:    string;
    movieID:    string;
}

/**
 * this interface just maps the data, sub json that carries the movie data
 * @param background_img string;
 * @param credits CreditsInterface datatype, it maps the cast and crew arrays
 * @param id number
 * @param original_title string
 * @param poster_img string
 * @param release_date string
 * @param runtime number
 * @param title string
 * @param providers ProviderInterface[] data-type
 * @param videos VideoInterface[] data-type
 * @param synopsis string
 * @param genres string[]
 * @param providers_image_set  string
 */
export interface DataInterface {
    background_img: string;
    credits:        CreditsInterface;
    id:             number;
    original_title: string;
    poster_img:     string;
    release_date:   string;
    runtime:        number;
    title:          string;
    providers:      ProviderInterface[];
    videos:         VideoInterface[];
    synopsis:       string;
    genres:         string[];
    providers_image_set:  string[];
}

/**
 * this interface maps the cast and crew arrays
 * @param cast Cast[], data-type
 * @param crew Crew[], data-type
 */
export interface CreditsInterface {
    cast: CastInterface[];
    crew: CrewInterface[];
}

/**
 * this interface maps an actor from the cast
 * @param cast_id number
 * @param character string
 * @param credit_id string
 * @param gender number
 * @param id number
 * @param name string
 * @param order number
 * @param profile_path null | string
 * @param profile_path_null_identifier boolean
 */
export interface CastInterface {
    cast_id:      number;
    character:    string;
    credit_id:    string;
    gender:       number;
    id:           number;
    name:         string;
    order:        number;
    profile_path: null | string;
    profile_path_null_identifier: boolean;
}

/**
 * this interface maps a person from the crew
 * @param credit_id    string
 * @param department   string
 * @param gender       number
 * @param id           number
 * @param job          string
 * @param name         string
 * @param profile_path null | string
 * @param profile_path_null_identifier boolean
 */
export interface CrewInterface {
    credit_id:    string;
    department:   string;
    gender:       number;
    id:           number;
    job:          string;
    name:         string;
    profile_path: null | string;
    profile_path_null_identifier: boolean;
}

/**
 * This interface maps a Provider's complete information
 *  @param category Category, enum
 *  @param img string
 *  @param price   null| string;
 *  @param quality string
 *  @param url string
 *  @param provider_name   string
 */
export interface ProviderInterface {
    category:      string;
    img:           string;
    price:         null | string;
    quality:       string;
    url:           string;
    provider_name: string;
}

/**
 * this is an enum that has just three values i.e Buy, Rent and Stream
 * @param Buy
 * @param Rent
 * @param Stream
 */
export enum Category {
    Buy = "Buy",
    Rent = "Rent",
    Stream = "Stream",
}

/**
 * This Interface maps the complete information on trailers and teasers for the movie 
 *  @param id string
 *  @param iso_639_1 string
 *  @param iso_3166_1 string
 *  @param key string
 *  @param name string
 *  @param site string
 *  @param size number
 *  @param type string
 */
export interface VideoInterface {
    id:         string;
    iso_639_1:  string;
    iso_3166_1: string;
    key:        string;
    name:       string;
    site:       string;
    size:       number;
    type:       string;
}

/**
 * This Interface is to map only those actors that have non-null profile picture paths 
 * along with their name
 * @param name string
 * @param profile_path string
 */
export interface ActorInterface {
    name: string;
    profile_path: string;
}