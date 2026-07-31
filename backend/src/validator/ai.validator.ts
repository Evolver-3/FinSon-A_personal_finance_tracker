import {z} from 'zod'

export const insightSchema=z.object({
  period:z.enum(
    ['day','week','month','quater','year']
  ).default('month')
})

export type InsightPeriodInput=z.infer<typeof insightSchema>