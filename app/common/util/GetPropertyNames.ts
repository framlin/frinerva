type valueOf<T> = T[keyof T];
type Properties<T> = {
    [K in keyof T] : K;
}
export type GetPropertyNames<T> = valueOf<Properties<T>>;
