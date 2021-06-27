---
title: index.ts
nav_order: 1
parent: Modules
---

## index overview

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Constructors](#constructors)
  - [Empty (type alias)](#empty-type-alias)
  - [FromEntries (type alias)](#fromentries-type-alias)
- [Model](#model)
  - [Map (type alias)](#map-type-alias)
  - [MapEntry (type alias)](#mapentry-type-alias)
- [Utils](#utils)
  - [Delete (type alias)](#delete-type-alias)
  - [Error (type alias)](#error-type-alias)
  - [Exists (type alias)](#exists-type-alias)
  - [Insert (type alias)](#insert-type-alias)
  - [KeyOf (type alias)](#keyof-type-alias)
  - [Lookup (type alias)](#lookup-type-alias)
  - [ToEntries (type alias)](#toentries-type-alias)
  - [Upsert (type alias)](#upsert-type-alias)
  - [ValOf (type alias)](#valof-type-alias)

---

# Constructors

## Empty (type alias)

Creates an empty Map

**Signature**

```ts
export type Empty<K = any, V = any> = InternalEmpty<K, V>
```

**Example**

```ts
import { Empty, ToEntries } from 'ts-typelevel-map'
import { assert as typeAssert, IsExact } from 'conditional-type-checks'

typeAssert<IsExact<ToEntries<Empty>, []>>(true)
```

## FromEntries (type alias)

Creates a Map from a list of key value pairs

**Signature**

```ts
export type FromEntries<Es extends MapEntry<KV[0], KV[1]>[], KV extends [any, any] = [any, any]> = InternalFromEntries<
  Es,
  KV
>
```

**Example**

```ts
import { ToEntries, FromEntries } from 'ts-typelevel-map'
import { assert as typeAssert, IsExact } from 'conditional-type-checks'

type M = FromEntries<[[1, 'A'], [2, 'B'], [3, 'C']]>

typeAssert<IsExact<ToEntries<M>, [[1, 'A'], [2, 'B'], [3, 'C']]>>(true)
```

# Model

## Map (type alias)

A type level Map with arbitrary keys and values

**Signature**

```ts
export type Map<K = any, V = any> = InternalMap<K, V>
```

## MapEntry (type alias)

Defines a key value pair of a Map

**Signature**

```ts
export type MapEntry<K = any, V = any> = [K, V]
```

# Utils

## Delete (type alias)

Deletes a key value pair from a map

**Signature**

```ts
export type Delete<K extends KeyOf<M>, M extends Map> = InternalDelete<K, M>
```

## Error (type alias)

Error type

**Signature**

```ts
export type Error<M extends string = string, D = any> = {
  readonly Error: unique symbol
  message: M
  data: D
}
```

## Exists (type alias)

Checks if a key exists in a Map

**Signature**

```ts
export type Exists<K extends KeyOf<M>, M extends Map> = InternalExists<K, M>
```

## Insert (type alias)

Insert a key value pair in a Map

**Signature**

```ts
export type Insert<K extends KeyOf<M>, V extends ValOf<M>, M extends Map> = InternalInsert<K, V, M>
```

**Example**

```ts
import { ToEntries, Insert, FromEntries, Error } from 'ts-typelevel-map'
import { assert as typeAssert, IsExact, Has } from 'conditional-type-checks'

type M = FromEntries<[[1, 'A'], [2, 'B'], [3, 'C']]>
type M1 = Insert<0, 'Z', M>
type M2 = Insert<1, 'AA', M>

typeAssert<IsExact<ToEntries<M1>, [[0, 'Z'], [1, 'A'], [2, 'B'], [3, 'C']]>>(true)

typeAssert<Has<M2, Error>>(true)
```

## KeyOf (type alias)

Get the key type

**Signature**

```ts
export type KeyOf<M extends Map> = InternalKeyOf<M>
```

## Lookup (type alias)

Tries to lookup a key from a Map and return the value

**Signature**

```ts
export type Lookup<K extends KeyOf<M>, M extends Map> = InternalLookup<K, M>
```

## ToEntries (type alias)

Return entries as key value pairs

**Signature**

```ts
export type ToEntries<M extends Map> = InternalToEntries<M>
```

## Upsert (type alias)

Insert or update a key value pair in a Map

**Signature**

```ts
export type Upsert<K extends KeyOf<M>, V extends ValOf<M>, M extends Map> = InternalUpsert<K, V, M>
```

**Example**

```ts
import { ToEntries, Upsert, FromEntries } from 'ts-typelevel-map'
import { assert as typeAssert, IsExact } from 'conditional-type-checks'

type M = FromEntries<[[1, 'A'], [2, 'B'], [3, 'C']]>
type M1 = Upsert<0, 'Z', M>
type M2 = Upsert<1, 'AA', M>

typeAssert<IsExact<ToEntries<M1>, [[0, 'Z'], [1, 'A'], [2, 'B'], [3, 'C']]>>(true)

typeAssert<IsExact<ToEntries<M2>, [[1, 'AA'], [2, 'B'], [3, 'C']]>>(true)
```

## ValOf (type alias)

Get the value type

**Signature**

```ts
export type ValOf<M extends Map> = InternalValOf<M>
```
