export type Newable<T = any> = { new(...args: any[]): T };

export type ClassDependencies<T = any> = {
  clss: Newable<T> | [string, Newable<T>];
  dependencies?: string[];
} | {
  constant: [string, any];
}
