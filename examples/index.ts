import * as _ from '../src'

type A0 = _.Empty<number, string>

type A1 = _.Insert<2, 'a', A0>

type A2 = _.Insert<2, 'b', A1>

type A3 = _.Delete<6, A2>

type A4 = _.Set<2, '', A3>

type B0 = _.FromEntries<
  [[4, ''], [4, 'abc'], [2, 'sss'], [33, '5'], [34, 'ooo']],
  [number, string]
>
