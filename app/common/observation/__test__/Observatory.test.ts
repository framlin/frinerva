import {Observatory} from "../Observatory";
import {Observer} from "../Observer";
import {Subject} from "../Subject";

class A {
    value: string = ""

    constructor(s: string) {
        this.value = s;
    }
}

const A_CLASS_ID = new A("");


class B {
    constructor(public value: number) {
    }
}

const B_CLASS_ID = new B(0);

class A_Observer extends Observer<A> {
    signal_called = false;
    signal_state = new A("");
    signal_value = "";

    constructor(class_id: A, public observer_id: number) {
        super(class_id);
    }

    signal(subject: Subject<A>): void {
        this.signal_called = true;
        this.signal_state = subject.state;
        this.signal_value = subject.state.value;
    }
}

class B_Observer extends Observer<B> {
    signal_called = false;
    signal_state = new B(0);
    signal_value = 0;

    constructor(class_id: B, public observer_id: number) {
        super(class_id);
    }

    signal(subject: Subject<B>): void {
        this.signal_called = true;
        this.signal_state = subject.state;
        this.signal_value = subject.state.value;
    }
}

let observatory: Observatory;

let a_subject: Subject<A>;
let a2_subject: Subject<A>;
let b_subject: Subject<B>;

let a_observer: A_Observer;
let b_observer: B_Observer;
let b2_observer: B_Observer;


let a = new A("hallo");
let a2 = new A("welt");
let b = new B(42);

describe('subscribe and provide', () => {
    beforeEach(() => {
        observatory = new Observatory();

        a_subject = new Subject<A>(A_CLASS_ID);
        a2_subject = new Subject<A>(A_CLASS_ID);
        b_subject = new Subject<B>(B_CLASS_ID);

        a_observer = new A_Observer(A_CLASS_ID, 0);
        b_observer = new B_Observer(B_CLASS_ID, 1);
        b2_observer = new B_Observer(B_CLASS_ID, 2);

        observatory.provide(a_subject);
        observatory.provide(a2_subject);
        observatory.provide(b_subject);

        observatory.subscribe(a_observer);
        observatory.subscribe(b_observer);
        observatory.subscribe(b2_observer);
    });

    test("set one stat on subject A", () => {
        a_subject.state = a;
        expect(a_observer.signal_value).toBe("hallo");
    });

    test("set one value on Subject a and one value on Subj B", () => {
        a_subject.state = a;
        b_subject.state = b;
        expect(a_observer.signal_value).toBe("hallo");
        expect(b_observer.signal_value).toBe(42);
    });

    test('having two observers)', () => {
        b_subject.state = b;
        expect(b_observer.signal_value).toBe(42);
        expect(b_observer.observer_id).toBe(1);
        expect(b2_observer.signal_value).toBe(42);
        expect(b2_observer.observer_id).toBe(2);

    })

    test("set two values on Subject a and one value on Subj B", () => {
        a_subject.state = a;
        expect(a_observer.signal_value).toBe("hallo");
        a2_subject.state = a2;
        expect(a_observer.signal_value).toBe("welt");
        b_subject.state = b;
        expect(b_observer.signal_value).toBe(42);
    });

    test("a sequence of state-changes on all subjects with all observers", () => {
        a_subject.state = a;
        expect(a_observer.signal_value).toBe("hallo");
        a2_subject.state = a2;
        expect(a_observer.signal_value).toBe("welt");
        b_subject.state = b;
        expect(b_observer.signal_value).toBe(42);
        a2_subject.state = new A("foo");
        expect(a_observer.signal_value).toBe("foo");
        b_subject.state = new B(21);
        expect(b_observer.signal_value).toBe(21);
        expect(b_observer.observer_id).toBe(1);
        expect(b2_observer.signal_value).toBe(21);
        expect(b2_observer.observer_id).toBe(2);
    });

})
