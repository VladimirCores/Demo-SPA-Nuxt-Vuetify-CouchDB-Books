import type { Ref, ComputedRef } from 'vue';

interface ISetupProfileFunction {
  (value: any | null): void;
}

interface IUser {
  readonly isExists: ComputedRef<boolean>;
  profile: Ref<any> | any;
  readonly setupProfile: ISetupProfileFunction
}

export default IUser;
