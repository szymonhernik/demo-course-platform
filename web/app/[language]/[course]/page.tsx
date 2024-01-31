'use client'
import {useRouter} from 'next/navigation'

export default function Page({params}) {
  const {language} = params

  const router = useRouter()
  router.push('/' + language) // Redirect to the home page
}
