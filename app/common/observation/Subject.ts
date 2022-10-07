import {Observer} from "./Observer";
import {Observable} from "./Observable";

class Subject<T> implements Observable<T|undefined>{

    _state: T | undefined;
    add(observer: Observer<T>): void{
        this._observers.push(observer);
    };

    set state(value: T | undefined) {
        for (let observer of this._observers) {
            observer.signal(this);
        }
    };

    get state(): T | undefined {
        return this._state;
    }

    private _observers: Observer<T>[] = []
}
export {Subject}


