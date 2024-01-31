// app/routes.tsx
import {createRoutes} from 'next/app-router'

export default createRoutes([
  {
    // Dynamic route for projects and optional subprojects with language
    path: '/:language/:group?/:course',
    page: () => import('./[course]/page'),
    loader: async ({params}) => {
      // params.group might be undefined if not present in the URL
      // Fetch data based on language, and optionally group, and course
      return {
        contentData: await fetchDataBasedOnParams(params.language, params.group, params.course),
      }
    },
  },
])
