import Link from 'next/link'

import {clean} from '../Clean'

export function ListLink(props) {
  const {href, group, children, ...rest} = props
  // console.log('group', group.en.current)
  // console.log('clean(href)', clean(href))
  // console.log(locale)

  return (
    <Link href={clean(href)} {...rest}>
      {children}
    </Link>
  )
}
