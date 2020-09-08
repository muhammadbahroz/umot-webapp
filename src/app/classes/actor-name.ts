import { ActorNameInterface } from './../interface/actor-name-interface';
export class ActorName implements ActorNameInterface{
    name: string;
    id: number;

    constructor(){
        this.name = null;
        this.id = null;
    }
}
