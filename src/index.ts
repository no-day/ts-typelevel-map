/** @since 1.0.0 */

import { pipe } from 'fp-ts/function'

// -----------------------------------------------------------------------------
// greetings
// -----------------------------------------------------------------------------

/**
 * It's a greeting
 *
 * @since 1.0.0
 * @category Greetings
 */
export type Map<K = any, V = any> = {
  _K: K
  _V: V
  data: [any, any][]
} & MapBrand

/**
 * It's a greeting
 *
 * @since 1.0.0
 * @category Greetings
 */
export type Empty<K = any, V = any> = UnsafeMap<K, V, []>

type MapBrand = { readonly Map: unique symbol }

type UnsafeMap<K, V, D extends [any, any][]> = {
  _K: K
  _V: V
  data: D
} & MapBrand

/**
 * It's a greeting
 *
 * @since 1.0.0
 * @category Greetings
 * @example
 *   import { Insert, Empty } from 'ts-typelevel-maps'
 *
 *   type People = Insert<4, 'Tom', Insert<3, 'Anton', Empty<number, string>>>
 */
export type Insert<
  K extends KeyOf<M>,
  V extends ValOf<M>,
  M extends Map
> = Exists<K, M> extends false
  ? UnsafeMap<KeyOf<M>, ValOf<M>, [[K, V], ...M['data']]>
  : unknown

export type Set<
  K extends KeyOf<M>,
  V extends ValOf<M>,
  M extends Map
> = UnsafeMap<KeyOf<M>, ValOf<M>, Set_<K, V, DataOf<M>>>

type Set_<K, V, D> = D extends [[infer k, infer v], ...infer tail]
  ? Is<k, K> extends true
    ? [[k, V], ...Set_<K, V, tail>]
    : [[k, v], ...Set_<K, V, tail>]
  : []

export type Lookup<K extends KeyOf<M>, M extends Map> = Lookup_<K, M>

type Lookup_<K, M> = M extends Map
  ? DataOf<M> extends [[infer k, infer v], ...infer tail]
    ? Is<k, K> extends true
      ? v
      : Lookup_<K, tail>
    : unknown
  : never

export type Delete<K extends KeyOf<M>, M extends Map> = UnsafeMap<
  KeyOf<M>,
  ValOf<M>,
  Delete_<K, DataOf<M>>
>

type Delete_<K, D> = D extends [[infer k, infer v], ...infer tail]
  ? Is<k, K> extends true
    ? Delete_<K, tail>
    : [[k, v], ...Delete_<K, tail>]
  : []

export type Exists<K extends KeyOf<M>, M extends Map> = Not<
  Is<Lookup<K, M>, unknown>
>

export type KeyOf<M extends Map> = M['_K']

export type ValOf<M extends Map> = M['_V']

export type DataOf<M extends Map> = M['data']

// -----------------------------------------------------------------------------
// Internal
// -----------------------------------------------------------------------------

type Is<T, G> = T extends G ? (G extends T ? true : false) : false

type Not<T extends boolean> = T extends true ? false : true
