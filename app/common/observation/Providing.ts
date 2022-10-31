import {Observatory} from "./Observatory";

export interface Providing {
    provide_at(observatory: Observatory): void;
}
