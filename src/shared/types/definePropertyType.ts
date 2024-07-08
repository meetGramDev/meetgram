/**
 * Change type of object properties
 * @param K - original object type
 * @param TypeOf - desirable type
 */
export type DefinePropertyType<K, TypeOf> = {
  [P in keyof K]: TypeOf
}
