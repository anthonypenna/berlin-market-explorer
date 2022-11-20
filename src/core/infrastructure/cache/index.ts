export interface Cache<T> {
  has(key: string): boolean;
  get(key: string): T | null;
  set(key: string, value: T): void;
}
