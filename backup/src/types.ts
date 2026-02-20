import type { UserModel } from '@server/generated/prisma/models/User'
import type { PersonModel } from '@server/generated/prisma/models/Person'
import type { FamilyModel } from '@server/generated/prisma/models/Family'
import type { FamilyMemberModel } from '@server/generated/prisma/models/FamilyMember'

export type TUser = UserModel &
  Partial<{
    persons: TPerson[]
    members: TFamilyMember[]
    families: TFamily[]
  }>

export type TPerson = PersonModel &
  Partial<{
    family: TFamily
    user: TUser
    parents: TPerson[]
    children: TPerson[]
  }>

export type TFamilyMember = FamilyMemberModel &
  Partial<{
    user: TUser
    family: TFamily
    person: TPerson
  }>

export type TFamily = FamilyModel &
  Partial<{
    owner: TUser
    members: TFamilyMember[]
    persons: TPerson[]
  }>
