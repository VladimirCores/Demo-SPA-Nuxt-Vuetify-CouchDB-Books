interface IStoreFunction {
  (key: string, value:any): void;
}

interface IRetrieveFunction {
  (value: any): void;
}

interface ILocalStorage {
  readonly retrieve: IRetrieveFunction
  readonly store: IStoreFunction
}

export default ILocalStorage;
