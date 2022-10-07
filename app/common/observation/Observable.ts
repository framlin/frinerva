import {Observer} from "./Observer";

interface Observable <T> {
    add(observer: Observer<T>): void;
    set state(value: T);
    get state(): T;
}

export {Observable}