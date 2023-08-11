import { Transaction, Category }  from "@wasp/entities"
import { GetTransactions, GetCategories } from "@wasp/queries/types"
import HttpError from '@wasp/core/HttpError.js'

export const getTransactions: GetTransactions<void, Transaction[]>  = async (args, context) => {
  if (!context.user) {
    throw new HttpError(401)
  }
  return context.entities.Transaction.findMany(
    { where: { user: { id: context.user.id } } }
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