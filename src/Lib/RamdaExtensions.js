import { toPairs, map, join, compose, concat } from 'ramda'

// '?page=2&pageSize=10&total=205&somethingElse=value'
export const createQs = compose(
  concat('?'),
  join('&'),
  map(join('=')),
  toPairs
)

// 'page=2&pageSize=10&total=205&somethingElse=value'
export const UrlEncode = compose(
  join('&'),
  map(join('=')),
  toPairs
)
