import { ComponentPropsWithRef, ElementType } from 'react'

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
