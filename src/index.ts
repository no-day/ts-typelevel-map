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
  data: Entry[]
} & MapBrand

type Entry<K = any, V = any> = [K, V]

/**
 * It's a greeting
 *
 * @since 1.0.0
 * @category Greetings
 */
export type Empty<K = any, V = any> = UnsafeMap<K, V, Empty_>

type Empty_ = []

type MapBrand = { readonly Map: unique symbol }

type UnsafeMap<K, V, D extends Entry[]> = {
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
> = Insert_<K, V, DataOf<M>> extends infer result
  ? result extends Entry[]
    ? UnsafeMap<KeyOf<M>, ValOf<M>, result>
    : `ERROR: Key ${Print<K>} already exists`
  : never

type Print<T> = T extends number ? `${T}` : T extends string ? T : '...'

type Insert_<K, V, D extends Entry[]> = Exists_<K, D> extends false
  ? [[K, V], ...D]
  : unknown

export type Set<
  K extends KeyOf<M>,
  V extends ValOf<M>,
  M extends Map
> = UnsafeMap<KeyOf<M>, ValOf<M>, Set_<K, V, DataOf<M>>>

/**
 * It's a greeting
 *
 * @since 1.0.0
 * @category Greetings
 * @example
 *   import { FromEntries } from 'ts-typelevel-maps'
 *
 *   type People = FromEntries<
 *     [[894, 'Michael'], [23, 'Tom'], [33, 'Linda'], [34, 'Maria']],
 *     [number, string]
 *   >
 *
 *   type T = Set<2, 'ABC', People>
 */
type Set_<K, V, D> = D extends [[infer k, infer v], ...infer tail]
  ? Is<k, K> extends true
    ? [[k, V], ...Set_<K, V, tail>]
    : [[k, v], ...Set_<K, V, tail>]
  : []

export type Lookup<K extends KeyOf<M>, M extends Map> = Lookup_<K, DataOf<M>>

type Lookup_<K, D> = D extends [[infer k, infer v], ...infer tail]
  ? Is<k, K> extends true
    ? v
    : Lookup_<K, tail>
  : unknown

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

export type Exists<K extends KeyOf<M>, M extends Map> = Exists_<K, DataOf<M>>

type Exists_<K, D extends Entry[]> = Not<Is<Lookup_<K, D>, unknown>>

export type KeyOf<M extends Map> = M['_K']

export type ValOf<M extends Map> = M['_V']

export type DataOf<M extends Map> = M['data']

export type FromEntries<
  Es extends Entry<KV[0], KV[1]>[],
  KV extends [any, any]
> = FromEntries_<Es, KV[0], KV[1]>

type FromEntries_<Es, K, V> = Es extends [[infer k, infer v], ...infer tail]
  ? FromEntries_<tail, K, V> extends infer result
    ? result extends Map<K, V>
      ? k extends K
        ? v extends V
          ? Insert<k, v, result>
          : never
        : never
      : result
    : never
  : Empty

// -----------------------------------------------------------------------------
// Internal
// -----------------------------------------------------------------------------

type Is<T, G> = T extends G ? (G extends T ? true : false) : false

type Not<T extends boolean> = T extends true ? false : true
