import { Company } from 'types/Company'
import { Period } from 'types/Period'

export type Id = string
type Role = string
type Summary = string

export type Experience = {
  id: Id
  role: Role
  company: Company
  period: Period
  summary: Summary
}
