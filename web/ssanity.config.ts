import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'

export default defineConfig({
  title: 'Lang studio',
  projectId: 'c46enho2',
  dataset: 'production',
  apiVersion: '2023-03-04',
  basePath: '/admin',

  plugins: [structureTool()],
})
