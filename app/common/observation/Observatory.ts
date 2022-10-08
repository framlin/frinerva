import {Observable} from "./Observable";
import {Observer} from "./Observer";

type ObservableSet = Set<Observable<any>>;
type ObserverSet = Set<Observer<any>>;

class Observatory {

    observable_map = new Map<any, ObservableSet>();
    observer_map = new Map<any, ObserverSet>();

    //TODO: revoke
    provide<T>(observable: Observable<T>) {
        if (this.observable_map.has(observable.CLASS_ID)) {
            let observables = this.observable_map.get(observable.CLASS_ID)!;
            observables.add(observable);
        } else {
            this.observable_map.set(observable.CLASS_ID, new Set<Observable<T>>([observable]));
        }
        let observer_set = this.observer_map.get(observable.CLASS_ID);
        if (observer_set) {
            observer_set.forEach((observer) => {
                observable.add(observer);
            })
        }
    }

    //TODO: unsubscribe
    subscribe<T>(observer: Observer<T>) {
        if (this.observer_map.has(observer.CLASS_ID)) {
            let observers = this.observer_map.get(observer.CLASS_ID)!;
            observers.add(observer);
        } else {
            this.observer_map.set(observer.CLASS_ID, new Set<Observer<T>>([observer]));
        }
        let observable_set = this.observable_map.get(observer.CLASS_ID);
        if (observable_set) {
            observable_set.forEach((observable) => {
                observable.add(observer);
            })
        }
    }
}

export {Observatory}