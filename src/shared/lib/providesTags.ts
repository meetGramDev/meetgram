/**
 * A tag providing function aimed to reduce boilerplate code across endpoints' providesTags property
 */
export function providesTags<R extends { id: number | string }[], T extends string>(
  resultsWithIds: R | undefined,
  tagType: T
) {
  return resultsWithIds
    ? [{ id: 'ALL', type: tagType }, ...resultsWithIds.map(({ id }) => ({ id, type: tagType }))]
    : [{ id: 'ALL', type: tagType }]
}
