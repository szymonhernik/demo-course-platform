'use client'

import {ArrowRightIcon} from '@heroicons/react/24/outline'
import {useParams} from 'next/navigation'
import {SanityDocument} from 'next-sanity'

import {getLabelByKey} from '@/lib/getLabelByKey'
import {createCourseSummary, createLessonLinks} from '@/lib/helpers'
import {Label} from '@/lib/types'

import Button from './Button'
import Title from './Title'
import TranslationLinks from './TranslationLinks'
import LessonLinks from './LessonLinks'
import Prose from './Prose'
import {useMemo} from 'react'

type HomeLayoutProps = {
  data?: {courses: SanityDocument[]}
}

export function HomeLayout(props: HomeLayoutProps) {
  const {courses} = props.data || {}
  const params = useParams()
  const language = Array.isArray(params.language) ? params.language[0] : params.language
  // const slugDef = courses?.map((course) => course.slug)
  // const lessonsDef = courses?.map((course) => course.lessons)

  // console.log(courses?.map((course) => course.lessons.map((lesson) => lesson.translations[1])))
  // console.log(courses?.map((course) => course.lessons))
  // console.log(lessonPaths)
  return (
    <div className="container mx-auto pt-header grid grid-cols-1 gap-header mt-header px-4 md:px-0">
      {courses &&
        courses?.length > 0 &&
        courses.map((course) => {
          // Generate lesson links for each course
          const lessonPaths = createLessonLinks(course.lessons, course.slug)
          const numberOfProjects = course.lessons.length
          // console.log(course.slug[language]?.current)
          // const slug = course.slug[language]?.current

          return (
            <article
              key={course._id}
              className="relative bg-gradient-to-tr mix-blend-multiply from-cyan-100 via-pink-100 to-yellow-100 p-8 md:p-16 xl:p-24 rounded-xl md:rounded-2xl xl:rounded-3xl w-full max-w-7xl mx-auto flex flex-col gap-4 md:flex-row items-start md:items-center md:justify-between group 
            hover:scale-[1.01] hover:rotate-[-0.25deg] 
            transition-transform duration-200"
            >
              {course?.slug?.[language]?.current ? (
                <>
                  {/* {console.log(course)} */}
                  <Title>{course.title[language]}</Title>
                  {lessonPaths.length > 0 ? (
                    <>
                      <LessonLinks lessons={lessonPaths} openByDefault />
                      {numberOfProjects}
                    </>
                  ) : (
                    <Prose>No lessons available</Prose>
                  )}
                  {/* <ul>
                  {Object.keys(course.lessons).map((lesson) => (
                    <a href={`/` + language + `/` + course.lessons[lesson].slug.current}>
                      <li>{course.lessons[lesson].title} </li>
                    </a>
                  ))}
                </ul> */}
                </>
              ) : (
                <>
                  <Title>{course.title[language]}</Title>
                  <ul>
                    <li>item 1</li>
                    <li>item 2</li>
                  </ul>
                </>
              )}
            </article>
          )
        })}
    </div>
  )
}
