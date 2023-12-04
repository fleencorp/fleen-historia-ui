export type AnyArray = [string, any][] | any;

export type AnyObject = Record<string, any>;

export type AnyProp = {
  [key: string] : any
}

export type AnyRegEx = AnyProp;

export type TwoArray = [number, number] | [string, string] | null;

export type DependencyProvider = {
  provide: string;
  useValue: AnyProp;
}
