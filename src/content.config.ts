import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';
import { makeQuestionnaireSchema } from './lib/questionnaire-schema.mjs';
import { loadQuestionnaires } from './lib/questionnaire-source.mjs';

const notes = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/notes' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    // Optional. If present, PostLayout emits dateModified on the Article
    // JSON-LD. If absent, pubDate is used for both fields.
    updatedDate: z.coerce.date().optional(),
    draft: z.boolean().default(false),
  }),
});


// Discovery questionnaires (/q/<id>/). Format: src/lib/questionnaire-schema.mjs.
// Sources: src/lib/questionnaire-source.mjs (local sample + the private forms repo).
// Agents create and edit forms with scripts/questionnaire.mjs, never by hand.
const questionnaires = defineCollection({
  loader: loadQuestionnaires,
  schema: makeQuestionnaireSchema(z),
});

export const collections = { notes, questionnaires };
