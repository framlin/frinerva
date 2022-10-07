import {Subject} from "./Subject";

interface Observer<T>{
    signal(subject: Subject<T>): void;
}

export {Observer}