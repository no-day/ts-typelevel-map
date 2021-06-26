import { ToEntries, Upsert, FromEntries } from 's'
  import { assert as typeAssert, IsExact } from 'conditional-type-checks'

  type M = FromEntries<[[1, 'A'], [2, 'B'], [3, 'C']]>
  type M1 = Upsert<0, 'Z', M>
  type M2 = Upsert<1, 'AA', M>

  typeAssert<
    IsExact<ToEntries<M1>, [[0, 'Z'], [1, 'A'], [2, 'B'], [3, 'C']]>
  >(true)

  typeAssert<IsExact<ToEntries<M2>, [[1, 'AA'], [2, 'B'], [3, 'C']]>>(true)
