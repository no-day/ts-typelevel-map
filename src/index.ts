/** @since 1.0.0 */

// -----------------------------------------------------------------------------
// model
// -----------------------------------------------------------------------------

/**
 * A type level Map with arbitrary keys and values
 *
 * @category Model
 */
export type Map<K = any, V = any> = InternalMap<K, V>

type InternalMap<K, V> = {
  _K: K
  _V: V
  data: MapEntry[]
} & MapBrand

/**
 * Defines a key value pair of a Map
 *
 * @category Model
 */
export type MapEntry<K = any, V = any> = [K, V]

type MapBrand = { readonly Map: unique symbol }

type UnsafeMap<K, V, D extends MapEntry[]> = {
  _K: K
  _V: V
  data: D
} & MapBrand

// -----------------------------------------------------------------------------
// Internal
// -----------------------------------------------------------------------------

type Is<T, G> = T extends G ? (G extends T ? true : false) : false

type Not<T extends boolean> = T extends true ? false : true

type Insert<
  K extends KeyOf<M>,
  V extends ValOf<M>,
  M extends Map
> = InternalInsert<K, V, M>

type InternalInsert<
  K extends KeyOf<M>,
  V extends ValOf<M>,
  M extends Map
> = Insert_<K, V, ToEntries<M>> extends infer result
  ? result extends MapEntry[]
    ? UnsafeMap<KeyOf<M>, ValOf<M>, result>
    : Error<`Key already exists`, { key: K }>
  : never

type Insert_<K, V, D extends MapEntry[]> = Exists_<K, D> extends false
  ? [[K, V], ...D]
  : unknown

type Update<K extends KeyOf<M>, V extends ValOf<M>, M extends Map> = UnsafeMap<
  KeyOf<M>,
  ValOf<M>,
  Update_<K, V, ToEntries<M>>
>

type Update_<K, V, D> = D extends [[infer k, infer v], ...infer tail]
  ? Is<k, K> extends true
    ? [[k, V], ...Update_<K, V, tail>]
    : [[k, v], ...Update_<K, V, tail>]
  : []

type InternalLookup<K extends KeyOf<M>, M extends Map> = Lookup_<
  K,
  ToEntries<M>
>

type Lookup_<K, D> = D extends [[infer k, infer v], ...infer tail]
  ? Is<k, K> extends true
    ? v
    : Lookup_<K, tail>
  : unknown

type InternalDelete<K extends KeyOf<M>, M extends Map> = UnsafeMap<
  KeyOf<M>,
  ValOf<M>,
  Delete_<K, ToEntries<M>>
>

type Delete_<K, D> = D extends [[infer k, infer v], ...infer tail]
  ? Is<k, K> extends true
    ? Delete_<K, tail>
    : [[k, v], ...Delete_<K, tail>]
  : []

type Exists<K extends KeyOf<M>, M extends Map> = Exists_<K, ToEntries<M>>

type Exists_<K, D extends MapEntry[]> = Not<Is<Lookup_<K, D>, unknown>>

type InternalFromEntries<
  Es extends MapEntry<KV[0], KV[1]>[],
  KV extends [any, any] = [any, any]
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

type InternalEmpty<K, V> = UnsafeMap<K, V, []>

type InternalUpsert<
  K extends KeyOf<M>,
  V extends ValOf<M>,
  M extends Map
> = Insert<K, V, M> extends infer result
  ? result extends Map<K, V>
    ? result
    : Update<K, V, M>
  : never

type InternalKeyOf<M extends Map> = M['_K']
type InternalValOf<M extends Map> = M['_V']
type InternalToEntries<M extends Map> = M['data']

// -----------------------------------------------------------------------------
// Constructors
// -----------------------------------------------------------------------------

/**
 * Creates an empty Map
 *
 * @category Constructors
 * @example
 *   import { Empty, ToEntries } from 'ts-typelevel-maps'
 *   import { assert as typeAssert, IsExact } from 'conditional-type-checks'
 *
 *   typeAssert<IsExact<ToEntries<Empty>, []>>(true)
 */
export type Empty<K = any, V = any> = InternalEmpty<K, V>

/**
 * Creates a Map from a list of key value pairs
 *
 * @category Constructors
 * @example
 *   import { ToEntries, FromEntries } from 'ts-typelevel-maps'
 *   import { assert as typeAssert, IsExact } from 'conditional-type-checks'
 *
 *   type M = FromEntries<[[1, 'A'], [2, 'B'], [3, 'C']]>
 *
 *   typeAssert<IsExact<ToEntries<M>, [[1, 'A'], [2, 'B'], [3, 'C']]>>(true)
 */
export type FromEntries<
  Es extends MapEntry<KV[0], KV[1]>[],
  KV extends [any, any] = [any, any]
> = InternalFromEntries<Es, KV>

// -----------------------------------------------------------------------------
// Utils
// -----------------------------------------------------------------------------

/**
 * Error type
 *
 * @category Utils
 */
export type Error<M extends string, D> = {
  readonly Error: unique symbol
  message: M
  data: D
}

/**
 * Insert or update a key value pair in a Map
 *
 * @category Utils
 * @example
 *   import { ToEntries, Upsert, FromEntries } from 'ts-typelevel-maps'
 *   import { assert as typeAssert, IsExact } from 'conditional-type-checks'
 *
 *   type M = FromEntries<[[1, 'A'], [2, 'B'], [3, 'C']]>
 *   type M1 = Upsert<0, 'Z', M>
 *   type M2 = Upsert<1, 'AA', M>
 *
 *   typeAssert<
 *     IsExact<ToEntries<M1>, [[0, 'Z'], [1, 'A'], [2, 'B'], [3, 'C']]>
 *   >(true)
 *
 *   typeAssert<IsExact<ToEntries<M2>, [[1, 'AA'], [2, 'B'], [3, 'C']]>>(true)
 */
export type Upsert<
  K extends KeyOf<M>,
  V extends ValOf<M>,
  M extends Map
> = InternalUpsert<K, V, M>

/**
 * TODO
 *
 * @category Utils
 */
export type Lookup<K extends KeyOf<M>, M extends Map> = InternalLookup<K, M>

/**
 * TODO
 *
 * @category Utils
 */
export type Delete<K extends KeyOf<M>, M extends Map> = InternalDelete<K, M>

/**
 * Get the key type
 *
 * @category Utils
 */
export type KeyOf<M extends Map> = InternalKeyOf<M>

/**
 * Get the value type
 *
 * @category Utils
 */
export type ValOf<M extends Map> = InternalValOf<M>

/**
 * Return entries as key value pairs
 *
 * @category Utils
 */
export type ToEntries<M extends Map> = InternalToEntries<M>
