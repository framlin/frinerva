import {Observable} from "./Observable";

export abstract class Observer<T>{
    CLASS_ID: T
    protected constructor(class_id: T) {
        this.CLASS_ID = class_id;
    }

    abstract signal(subject: Observable<T>): void;
}

