import type { UserModel } from '@@/prisma/client/models/User'
import type { PersonModel } from '@@/prisma/client/models/Person'
import type { FamilyModel } from '@@/prisma/client/models/Family'
import type { FamilyMemberModel } from '@@/prisma/client/models/FamilyMember'

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
