import { Film } from "./film";

export interface FilmResponse{
    results:{
        bindings: Film[];
    }
}