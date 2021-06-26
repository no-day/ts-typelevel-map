import { ToEntries, FromEntries } from 's'
  import { assert as typeAssert, IsExact } from 'conditional-type-checks'

  type M = FromEntries<[[1, 'A'], [2, 'B'], [3, 'C']]>

  typeAssert<IsExact<ToEntries<M>, [[1, 'A'], [2, 'B'], [3, 'C']]>>(true)
