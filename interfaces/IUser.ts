import type { Ref, ComputedRef } from 'vue';

interface IUser {
  readonly isExist: ComputedRef<boolean>;
  profile: Ref<any> | any;
}

export default IUser;
