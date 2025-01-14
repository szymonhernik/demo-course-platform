import {FiAward, FiType, FiUsers} from 'react-icons/fi'
import {StructureResolver, DefaultDocumentNodeResolver} from 'sanity/structure'

import {i18n} from '../../languages'
import preview from './preview'
import references from './references'
import transifex from './transifex'

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      // Custom document-level translation structure
      S.listItem()
        .title('Projects')
        .child(
          S.list()
            .title('Projects')
            .items([
              ...i18n.languages.map((language) =>
                S.listItem()
                  .title(`Projects (${language.id.toLocaleUpperCase()})`)
                  .schemaType('lesson')

                  .child(
                    S.documentList()
                      .id(language.id)
                      .title(`${language.title} Projects`)
                      .schemaType('lesson')
                      .filter('_type == "lesson" && language == $language')
                      .params({language: language.id})
                      .initialValueTemplates([
                        S.initialValueTemplateItem('lesson-language', {
                          id: 'lesson-language',
                          language: language.id,
                        }),
                      ])
                      .canHandleIntent((intentName, params) => {
                        // TODO: Handle **existing** documents (like search results when clicked)
                        // to return `true` on the correct language list!
                        if (intentName === 'edit') {
                          // return params?.language === language.id
                          return false
                        }

                        // Not an initial value template
                        if (!params.template) {
                          return true
                        }

                        // Template name structure example: "lesson-en"
                        const languageValue = params?.template?.split(`-`).pop()

                        return languageValue === language.id
                      })
                  )
              ),
              // I have only added this item so that search results when clicked will load this list
              // If the intent checker above could account for it, I'd remove this item
              S.divider(),
              S.listItem()
                .title(`All Projects`)
                .schemaType('lesson')
                .icon(FiAward)
                .child(
                  S.documentList()
                    .id(`all-lessons`)
                    .title(`All Lessons`)
                    .schemaType('lesson')
                    .filter('_type == "lesson"')
                    // Load this pane for existing `lesson` documents
                    // or new documents that aren't using an initial value template
                    .canHandleIntent(
                      (intentName, params) => intentName === 'edit' || params.template === `lesson`
                    )
                ),
            ])
        ),
      // Field-level translations
      S.documentTypeListItem('course').title('Projects Groups listed on Homepage'),
      S.divider(),

      // Market-specific portable text example
      S.documentTypeListItem('legal').title('About'),
      S.divider(),
      // Singleton, field-level translations
      S.listItem()
        .icon(FiType)
        .id('labelGroup')
        .schemaType('labelGroup')
        .title('Labels')
        .child(S.editor().id('labelGroup').schemaType('labelGroup').documentId('labelGroup')),
      S.divider(),
    ])

export const defaultDocumentNode: DefaultDocumentNodeResolver = (S, {schemaType, getClient}) => {
  // const client = getClient({apiVersion: `2023-01-01`})

  switch (schemaType) {
    case 'presenter':
      return S.document().views([
        S.view.form(),
        // preview(S, client)
        references(S),
      ])
    case 'course':
      return S.document().views([
        S.view.form(),
        // preview(S, client)
        transifex(S),
      ])
    case 'lesson':
      return S.document().views([
        S.view.form(),
        // preview(S, client)
      ])
    case 'legal':
      return S.document().views([
        S.view.form(),
        // preview(S, client)
      ])
    default:
      return S.document()
  }
}
