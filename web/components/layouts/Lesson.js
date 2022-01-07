import React, {useMemo} from 'react'
import {ChevronLeftIcon, CheckIcon} from '@heroicons/react/outline'
import {useRouter} from 'next/router'

import LessonLinks from '../LessonLinks'
import ProseableText from '../ProseableText'
import {createLessonLinks} from '../../lib/helpers'
import {i18n} from '../../../languages'
import Button from '../Button'
import Title from '../Title'
import Blobs from '../Blobs'
import Layout from './Layout'

export default function Lesson({data}) {
  const {title, summary, content, course} = data
  const {lessons, presenters} = course ?? {}
  const {locale} = useRouter()

  const courseSlug = course.slug[locale ?? i18n.base].current
  const coursePath = `/${[locale === i18n.base ? null : locale, courseSlug]
    .filter(Boolean)
    .join('/')}`
  const lessonPaths = useMemo(() => createLessonLinks(lessons, course.slug), [lessons, course.slug])

  // From the lessonPaths we can find the translations of this lesson
  const currentLessonIndex = lessonPaths.findIndex((versions) =>
    versions.find((lesson) => lesson.title === title)
  )
  const translations = lessonPaths[currentLessonIndex]
  const nextLesson =
    currentLessonIndex + 1 === lessonPaths.length
      ? null
      : lessonPaths[currentLessonIndex + 1].find((lesson) => lesson.language === locale)

  const presentersString = presenters
    .map((presenter) => [presenter.name, presenter.title].join(', '))
    .join(', ')

  return (
    <Layout translations={translations}>
      <div className="relative z-10">
        <section className="bg-gradient-to-r mix-blend-multiply from-cyan-100 via-transparent to-transparent pt-16">
          <div className="container mx-auto py-8 p-4 md:p-8 xl:p-16 flex flex-col justify-start items-start gap-4 xl:gap-8">
            <Title subtitle={presentersString}>{title}</Title>
            {coursePath && (
              <Button href={coursePath} Icon={ChevronLeftIcon} iconFirst>
                {course.title[locale]}
              </Button>
            )}
          </div>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 md:gap-8 xl:gap-16 p-4 md:p-8 xl:p-16 container mx-auto">
          {lessons?.length > 0 ? (
            <div className="md:col-span-2 md:col-start-4 md:sticky md:top-24 self-start">
              <LessonLinks lessons={lessonPaths} />
            </div>
          ) : null}

          {content?.length > 0 ? (
            <div className="md:col-span-3 md:col-start-1 md:row-start-1">
              {summary ? (
                <div className="italic text-cyan-800 text-2xl lg:leading-normal mb-4 md:mb-8">
                  {summary}
                </div>
              ) : null}

              <ProseableText blocks={content} />

              {nextLesson?.path && (
                <div className="flex items-center justify-between my-8">
                  <Button href={nextLesson.path} Icon={CheckIcon}>
                    <>
                      Complete
                      <span className="sr-only">
                        #{currentLessonIndex + 2} {nextLesson.title}
                      </span>
                    </>
                  </Button>
                </div>
              )}
            </div>
          ) : null}
        </div>
      </div>
      <Blobs />
    </Layout>
  )
}
