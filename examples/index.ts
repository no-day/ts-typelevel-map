import * as _ from '../src'

type A0 = _.Empty<number, string>

type A1 = _.Upsert<2, 'a', A0>

type A2 = _.Upsert<4, 'b', A1>

type A3 = _.Delete<6, A2>

type A4 = _.Upsert<2, '', A3>

type B0 = _.FromEntries<
  [[44, ''], [4, 'abc'], [2, 'sss'], [33, '5'], [34, 'ooo']],
  [number, string]
>

type R = B0['data'][3]
