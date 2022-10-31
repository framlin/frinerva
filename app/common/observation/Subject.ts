import {Observer} from "./Observer";
import {Observable} from "./Observable";

export class Subject<T> implements Observable<T>{
    readonly CLASS_ID: T
    constructor(class_id: T) {
        this.CLASS_ID = class_id;
        this._state =  class_id;
    }
    add(observer: Observer<T>): void{
        this._observers.add(observer);
    };

    set state(value: T) {
        this._state = value;
         for (let observer of this._observers) {
            observer.signal(this);
        }
    };

    get state(): T {
        return this._state;
    }

    private _state: T;
    private _observers = new Set<Observer<T>>();
}

