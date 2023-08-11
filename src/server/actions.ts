import { Category, Tag } from '@wasp/entities'
import { CreateCategory, CreateTag } from '@wasp/actions/types'
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