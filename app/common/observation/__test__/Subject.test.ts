import {Subject} from '../Subject';

class A {
    value: string = ""
    constructor(s: string){
        this.value = s;
    }
}
const A_CLASS_ID = new A("");

class B {
    value = 0;
    constructor(v: number){
        this.value = v;
    }
}
const B_CLASS_ID = new B(0);

class ObserverStub<T>  {
    signal_called = false;
    signal_param: Subject<T> | undefined;
    constructor(public CLASS_ID: T){}
    signal(subject: Subject<T>):void {
        this.signal_called = true;
        this.signal_param = subject;
    }
}


let a_subject: Subject<A>;
let b_subject: Subject<B>;
let a: A;

let a_observer = new ObserverStub(A_CLASS_ID);
let b_observer = new ObserverStub(B_CLASS_ID);

beforeAll(() => {
    a_subject = new Subject<A>(A_CLASS_ID);
    a_subject.add(a_observer);

    b_subject = new Subject<B>(B_CLASS_ID);
    b_subject.add(b_observer);
    a = new A("hallo");
});

test('setting state A', () => {
    a_subject.state = a;

    expect(a_observer.signal_called).toBe(true);
    expect(a_observer.signal_param).toBeInstanceOf(Subject);
    // @ts-ignore
    expect(a_observer.signal_param.state).toBeInstanceOf(A);
    // @ts-ignore
    expect(a_observer.signal_param.state.value).toBe("hallo")

});

test('having two observers', () => {
    let a_observer_2 =  new ObserverStub(A_CLASS_ID);
    a_subject.add(a_observer_2);
    a_subject.state = a;

    expect(a_observer.signal_called).toBe(true);
    expect(a_observer.signal_param).toBeInstanceOf(Subject);
    // @ts-ignore
    expect(a_observer.signal_param.state).toBeInstanceOf(A);
    // @ts-ignore
    expect(a_observer.signal_param.state.value).toBe("hallo")


    expect(a_observer_2.signal_called).toBe(true);
    expect(a_observer_2.signal_param).toBeInstanceOf(Subject);
    // @ts-ignore
    expect(a_observer_2.signal_param.state).toBeInstanceOf(A);
    // @ts-ignore
    expect(a_observer_2.signal_param.state.value).toBe("hallo")
});

test ('having two subjects', () => {
    let a_subject_2 =  new Subject<A>(A_CLASS_ID);
    a_subject_2.add(a_observer);
    let a_2 = new A("welt");
    a_subject.state = a;

    expect(a_observer.signal_called).toBe(true);
    expect(a_observer.signal_param).toBeInstanceOf(Subject);
    // @ts-ignore
    expect(a_observer.signal_param.state).toBeInstanceOf(A);
    // @ts-ignore
    expect(a_observer.signal_param.state.value).toBe("hallo");

    a_subject_2.state = a_2;
    // @ts-ignore
    expect(a_observer.signal_param.state.value).toBe("welt")
})
