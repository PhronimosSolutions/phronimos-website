// Single source of truth for the discovery-questionnaire format.
// Used by the Astro content collection (src/content.config.ts) and by the agent
// CLI (scripts/questionnaire.mjs), so a form that passes the CLI always builds.
// Takes the zod instance as an argument so both sides can pass their own.

export const QUESTION_TYPES = ['text', 'long', 'single', 'multi', 'scale', 'yesno', 'number', 'date', 'email', 'url'];

export function makeQuestionnaireSchema(z) {
  const question = z.object({
    id: z.string().regex(/^[a-z0-9_]+$/, 'ids use lowercase letters, digits and _').optional(),
    type: z.enum(QUESTION_TYPES).default('long'),
    label: z.string().min(1),
    hint: z.string().optional(),
    placeholder: z.string().optional(),
    required: z.boolean().default(true),
    /** single / multi choices */
    options: z.array(z.string().min(1)).min(1).optional(),
    /** single / multi: add an "Other" choice with a free-text box */
    other: z.boolean().default(false),
    /** scale: 1..max. With no labels and max 5 it uses the assessment's agree scale. */
    max: z.number().int().min(3).max(10).default(5),
    minLabel: z.string().optional(),
    maxLabel: z.string().optional(),
  });

  return z
    .object({
      title: z.string().min(1),
      client: z.string().min(1),
      status: z.enum(['open', 'closed']).default('open'),
      /** YYYY-MM-DD; the form closes itself after this date */
      expires: z.coerce.date().optional(),
      intro: z.string().min(1),
      minutes: z.number().int().positive().optional(),
      /** Ask for name / email / company / role on step 1 */
      collectContact: z.boolean().default(true),
      prefill: z
        .object({
          name: z.string().optional(),
          email: z.string().optional(),
          company: z.string().optional(),
          role: z.string().optional(),
        })
        .default({}),
      thanks: z.string().optional(),
      sections: z
        .array(
          z.object({
            title: z.string().min(1),
            label: z.string().optional(),
            intro: z.string().optional(),
            questions: z.array(question).min(1),
          })
        )
        .min(1),
    })
    .superRefine((q, ctx) => {
      const ids = new Set();
      let n = 0;
      q.sections.forEach((s, si) =>
        s.questions.forEach((qq, qi) => {
          n += 1;
          const path = ['sections', si, 'questions', qi];
          if ((qq.type === 'single' || qq.type === 'multi') && !qq.options) {
            ctx.addIssue({ code: 'custom', path: [...path, 'options'], message: `"${qq.label}" is ${qq.type} but has no options` });
          }
          const id = qq.id ?? `q${n}`;
          if (ids.has(id)) ctx.addIssue({ code: 'custom', path: [...path, 'id'], message: `duplicate question id "${id}"` });
          ids.add(id);
        })
      );
    });
}
