import { Category } from '@wasp/entities'
import { CreateCategory } from '@wasp/actions/types'
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