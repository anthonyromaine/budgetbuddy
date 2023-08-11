import { Category, Tag, Transaction } from '@wasp/entities'
import { CreateCategory, CreateTag, CreateTransaction } from '@wasp/actions/types'
import HttpError from '@wasp/core/HttpError.js'

type CreateCategoryPayload = Pick<Category, 'name'>

export const createCategory: CreateCategory<CreateCategoryPayload, Category> = async (
  args,
  context
) => {
  if (!context.user) {
    throw new HttpError(401)
  }
  return context.entities.Category.create({
    data: {
      name: args.name,
      user: { connect: { id: context.user.id } },
    },
  })
}

type CreateTagPayload = Pick<Tag, 'name'>;

export const createTag: CreateTag<CreateTagPayload, Tag> = async (
  args,
  context
) => {
  if (!context.user) {
    throw new HttpError(401)
  }
  return context.entities.Tag.create({
    data: {
      name: args.name,
      user: { connect: { id: context.user.id } },
    },
  })
}

type CreateTransactionPayload = Pick<Transaction, "date" | "categoryName" | "amount" | "description" | "notes" | "type"> & {
  tags: string[]
};

export const createTransaction: CreateTransaction<CreateTransactionPayload, Transaction> = async (
  args,
  context
) => {
  if (!context.user) {
    throw new HttpError(401)
  }
  return context.entities.Transaction.create({
    data: {
      description: args.description,
      type: args.type,
      date: args.date,
      category: { connect: { userId_name: {
        userId: context.user.id,
        name: args.categoryName
      }}},
      amount: args.amount,
      notes: args.notes,
      tags: { connect: args.tags.map(tag => ({ userId_name: {
        userId: context.user!.id,
        name: tag
      }}))},
      user: { connect: { id: context.user.id } },
    },
  })
}