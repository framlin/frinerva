import {Subject} from "./Subject";
import {Observer} from "./Observer";

type SubjectSet = Set<Subject<any>>;
type ObserverSet = Set<Observer<any>>;

class Observatory {

    subject_map = new Map<any, SubjectSet>();
    observer_map = new Map<any, ObserverSet>();

    //TODO: revoke
    provide<T>(subject: Subject<T>) {
        if (this.subject_map.has(subject.CLASS_ID)) {
            let subjects = this.subject_map.get(subject.CLASS_ID)!;
            subjects.add(subject);
        } else {
            this.subject_map.set(subject.CLASS_ID, new Set<Subject<T>>([subject]));
        }
        let observer_set = this.observer_map.get(subject.CLASS_ID);
        if (observer_set) {
            observer_set.forEach((observer) => {
                subject.add(observer);
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
        let subject_set = this.subject_map.get(observer.CLASS_ID);
        if (subject_set) {
            subject_set.forEach((subject) => {
                subject.add(observer);
            })
        }
    }
}

export {Observatory}