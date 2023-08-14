import { Transaction, Category, Tag }  from "@wasp/entities"
import { GetTransactions, GetCategories, GetTags } from "@wasp/queries/types"
import HttpError from '@wasp/core/HttpError.js'

export const getTransactions: GetTransactions<void, Transaction[]>  = async (args, context) => {
  if (!context.user) {
    throw new HttpError(401)
  }
  return context.entities.Transaction.findMany(
   { 
      where: { user: { id: context.user.id } },
      include: {
        tags: true
      },
      orderBy: {
        date: "desc"
      }
   }
  )
}

export const getCategories: GetCategories<void, Category[]>  = async (args, context) => {
  if (!context.user) {
    throw new HttpError(401)
  }
  return context.entities.Category.findMany(
    { where: { user: { id: context.user.id } } }
  )
}

export const getTags: GetTags<void, Tag[]>  = async (args, context) => {
  if (!context.user) {
    throw new HttpError(401)
  }
  return context.entities.Tag.findMany(
    { where: { user: { id: context.user.id } } }
  )
}