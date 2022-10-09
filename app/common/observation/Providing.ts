import {Observatory} from "./Observatory";

interface Providing {
    provide_at(observatory: Observatory): void;
}

export {Providing}