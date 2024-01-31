'use client'
import {useRouter} from 'next/navigation'

export default function Page({params}) {
  const {course, language} = params

  const router = useRouter()
  router.push('/' + language) // Redirect to the home page
  return null // Return null to prevent rendering the rest of the page
}
