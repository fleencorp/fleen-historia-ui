export interface Newable<T extends Object> {
  new(...data: any[]): T;
}

export type Constructor<T extends Object> = Newable<T> | null | undefined;
