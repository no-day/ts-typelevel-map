import { Empty, ToEntries } from 's'
  import { assert as typeAssert, IsExact } from 'conditional-type-checks'

  typeAssert<IsExact<ToEntries<Empty>, []>>(true)
