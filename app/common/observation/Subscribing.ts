import {Observatory} from "./Observatory";

interface Subscribing{
    subscribe_at(observatory: Observatory): void;
}

export {Subscribing}