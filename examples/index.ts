import * as _ from '../src'

export type A0 = _.Empty<number, string>

export type A1 = _.Upsert<2, 'a', A0>

export type A2 = _.Upsert<4, 'b', A1>

export type A3 = _.Delete<6, A2>

export type A4 = _.Upsert<2, '', A3>

export type B0 = _.FromEntries<
  [[44, ''], [4, 'abc'], [2, 'sss'], [33, '5'], [34, 'ooo']],
  [number, string]
>

export type R = B0['data'][3]
