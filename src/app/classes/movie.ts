import { MovieInterface, DataInterface, CreditsInterface, CastInterface, CrewInterface, ProviderInterface, VideoInterface, ActorInterface } from './../interface/movie-interface';

export class Movie implements MovieInterface {
    statusCode: null;
    data: Data;
    message: string;
    success: string;
    movieID: string;

    /**
     * This class implements MovieInterface and saves all the data carried by movie detail API JSON object
     * @param statusCode null
     * @param data Data, data-type
     * @param message string
     * @param success string
     * @param movieID string
     */
    constructor(statusCode: null = null, data: Data = new Data(), message: string = null, success: string = null,
        moviID: string = null) {

        this.statusCode = statusCode;
        this.data = new Data(data.background_img, data.credits, data.id, data.original_title, data.poster_img, data.release_date,
            data.runtime, data.title, data.providers, data.videos, data.synopsis, data.genres);

        this.message = message;
        this.success = success;
        this.movieID = moviID;
    }
}

export class Data implements DataInterface {
    background_img: string;
    credits: Credits;
    id: number;
    original_title: string;
    poster_img: string;
    release_date: string;
    runtime: number;
    title: string;
    providers: Provider[];
    videos: Video[];
    synopsis: string;
    genres: string[];
    providers_image_set:  string[];

    /**
     * This class implements DataInterface and stores all the data on a movie
     * @param background_img string
     * @param credits Credits, data-type
     * @param id number
     * @param original_title string
     * @param poster_img string
     * @param release_date string
     * @param runtime number
     * @param title string
     * @param providers Provider[], data-type
     * @param videos Video[], data-type
     * @param synopsis string
     * @param genres string[]
     * @param providers_image_set  string
     */
    constructor(background_img: string = null , credits: Credits = new Credits(), id: number = 1,
        original_title: string = null, poster_img: string = null, release_date: string = null, runtime: number = -1,
        title: string = null, providers: Provider[] = [], videos: Video[] = [], synopsis: string = null, genres: string[] = []) {

        if ( background_img === null) {
            this.background_img = 'https://image.shutterstock.com/image-vector/no-image-available-sign-absence-600w-373243873.jpg';
        } else {
            this.background_img = 'https://image.tmdb.org/t/p/w1280' + background_img;
        }
        this.credits = new Credits(credits.cast, credits.crew);
        this.id = id;
        this.original_title = original_title;
        if (poster_img === null) {
            this.poster_img = 'https://image.shutterstock.com/image-vector/no-image-available-sign-absence-600w-373243873.jpg';
        } else {
            this.poster_img = 'https://image.tmdb.org/t/p/w500' + poster_img;
        }

        this.release_date = release_date;
        this.runtime = runtime;
        this.title = title;

        if (providers) {
            this.providers = [];
            providers.forEach(provider => {
                this.providers.push(provider);
            });
        }

        if (videos) {
            this.videos = [];
            videos.forEach(video => {
                this.videos.push(video);
            });
        }

        this.synopsis = synopsis;

        if (genres) {
            this.genres = [];
            genres.forEach(genre => {
                this.genres.push(genre);
            });
        }

        if (providers) {
            // Had to create this temporay img set type variable to create a set of providers url's
            // and then use that set to fill up the string list of "providers_image_set", as providers_image_set.length
            // is used to calculate the exact number of providers availabe and display on the front-end.
            const img: Set<string> = new Set<string>();
            this.providers_image_set = [];
            providers.forEach((provider: Provider) => {
                img.add(provider.img);
            });

            img.forEach((img_url: string) => {
                this.providers_image_set.push(img_url);
            });
        }
    }
}

export class Credits implements CreditsInterface {
    cast: Cast[];
    crew: Crew[];

    /**
     * This class implements CreditsInterface and records cast and crew data in 
     * cast and crew data-types
     * @param cast Cast data-type
     * @param crew Crew data-type
     */
    constructor(cast: Cast[] = [], crew: Crew[] = []) {

        if (cast) {
            this.cast = [];
            cast.forEach(person => {
                this.cast.push(new Cast(person.cast_id, person.character, person.credit_id, person.gender, person.id,
                    person.name, person.order, person.profile_path));
            });
        }

        if (crew) {
            this.crew = [];
            crew.forEach(person => {
                this.crew.push(new Crew(person.credit_id, person.department, person.gender, person.id, person.job, person.name,
                    person.profile_path));
            });
        }
    }
}

export class Cast implements CastInterface {
    cast_id: number;
    character: string;
    credit_id: string;
    gender: number;
    id: number;
    name: string;
    order: number;
    profile_path: null | string;
    profile_path_null_identifier: boolean;

    /**
     * This class implements CastInterface and saves all the information on movie cast
     * @param cast_id number
     * @param character string
     * @param credit_id string
     * @param gender number
     * @param id number
     * @param name string
     * @param order number
     * @param profile_path null | string 
     */
    constructor(cast_id: number = -1, character: string = null, credit_id: string = null, gender: number = -1,
        id: number = -1, name: string = null, order: number = -1, profile_path: null | string = null) {

        this.cast_id = cast_id;
        this.character = character;
        this.credit_id = credit_id;
        this.gender = gender;
        this.id = id;
        this.name = name;
        this.order = order;
        if (profile_path === null) {
            this.profile_path = 'https://image.shutterstock.com/image-vector/no-image-available-sign-absence-600w-373243873.jpg';
            this.profile_path_null_identifier = true;
        }else{
            this.profile_path = 'https://image.tmdb.org/t/p/w500' + profile_path;
            this.profile_path_null_identifier = false;
        }
    }
}

export class Crew implements CrewInterface {
    credit_id: string;
    department: string;
    gender: number;
    id: number;
    job: string;
    name: string;
    profile_path: null | string;
    profile_path_null_identifier: boolean;

    /**
     * This class implements CrewInterface and saves all the information on movie crew
     * @param credit_id string
     * @param department string
     * @param gender number
     * @param id number
     * @param job string
     * @param name string
     * @param profile_path null | string 
     */
    constructor(credit_id: string = null, department: string = null, gender: number = -1, id: number = -1,
        job: string = null, name: string = null, profile_path: null | string = null) {

        this.credit_id = credit_id;
        this.department = department;
        this.gender = gender;
        this.id = id;
        this.job = job;
        this.name = name;
        if (profile_path === null) {
            this.profile_path = 'https://image.shutterstock.com/image-vector/no-image-available-sign-absence-600w-373243873.jpg';
            this.profile_path_null_identifier = true;
        }else{
            this.profile_path = 'https://image.tmdb.org/t/p/w500' + profile_path;
            this.profile_path_null_identifier = false;
        }
    }
}

export class Provider implements ProviderInterface {
    category:      string;
    img:           string;
    price:         null | string;
    quality:       string;
    url:           string;
    provider_name: string;

    /**
     * This class implements ProviderInterface and stores all the data on a movie provider related to that movie.
     * @param category string
     * @param img string
     * @param price null | string
     * @param quality string
     * @param url string
     * @param provider_name string
     */
    constructor(category: string = null, img: string = null, price: null | string = null, quality: string = null, 
        url: string = null, provider_name: string = null) {
        this.category = category;
        this.img = img;
        this.price = price;
        this.quality = quality;
        this.url = url;    
        this.provider_name = provider_name;    
    }
}

export class Video implements VideoInterface {
    id:         string;
    iso_639_1:  string;
    iso_3166_1: string;
    key:        string;
    name:       string;
    site:       string;
    size:       number;
    type:       string;

    /**
     * This class impements VideoInterface and records all the information on trailers 
     * and teasers for the respective movie. 
     * @param id string
     * @param iso_639_1 string 
     * @param iso_3166_1 string
     * @param key string
     * @param name string
     * @param site string
     * @param size number
     * @param type string
     */
    constructor(id: string = null, iso_639_1: string = null, iso_3166_1: string = null, key: string = null, 
        name: string = null, site: string = null, size: number = -1, type: string = null) {
        this.id = id;
        this.iso_639_1 = iso_639_1;
        this.iso_3166_1 = iso_3166_1;
        this.key = key;
        this.name = name;
        this.site = site;
        this.size = size;
        this.type = type;
    }
}

export class Actor implements ActorInterface {
    name: string;
    profile_path: string;
    
    /**
     * This class is to save only those actors that have non-null profile picture paths 
     * along with their name
     * @param name string
     * @param profile_path string 
     */
    constructor(name: string, profile_path: string) {
        this.name = name;
        this.profile_path = profile_path;
    }
}