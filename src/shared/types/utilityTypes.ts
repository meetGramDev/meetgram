import { ComponentPropsWithRef, ElementType } from 'react'

/**
 * Change type of object properties
 * @param K - original object type
 * @param TypeOf - desirable type
 */
export type DefinePropertyType<K, TypeOf> = {
  [P in keyof K]: TypeOf
}

/**
 * Utility type to extract the `ref` prop from a polymorphic component.
 *
 * {@link} https://www.benmvp.com/blog/forwarding-refs-polymorphic-react-component-typescript/
 */
export type PolymorphicRef<E extends ElementType> = ComponentPropsWithRef<E>['ref']

/**
 * A wrapper for any polymorphic component props that need to type the ref prop.
 *
 * {@link} https://www.benmvp.com/blog/forwarding-refs-polymorphic-react-component-typescript/
 */
export type PolymorphicComponentPropsWithRef<E extends ElementType, Props = {}> = {
  forwardRef?: PolymorphicRef<E>
} & Props

export type IsKeyString<K> = K extends string ? K : never
