import {Observatory} from "./Observatory";

export interface Subscribing{
    subscribe_at(observatory: Observatory): void;
}
