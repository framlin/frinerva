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

let a_observer = new ObserverStub(A_CLASS_ID);
let b_observer = new ObserverStub(B_CLASS_ID);

beforeAll(() => {
    a_subject = new Subject<A>(A_CLASS_ID);
    a_subject.add(a_observer);

    b_subject = new Subject<B>(B_CLASS_ID);
    b_subject.add(b_observer);
});

test('setting state A', () => {
    let a = new A("hallo");
    a_subject.state = a;

    expect(a_observer.signal_called).toBe(true);
    expect(a_observer.signal_param).toBeInstanceOf(Subject);
    // @ts-ignore
    expect(a_observer.signal_param.state).toBeInstanceOf(A);
});
