import { deleteCategory, getCategoryById, updateCategory } from '@/app/actions/categories';
import { getIdFromSearchString } from '@/utils/getIdFromSearchString';
import { Prisma } from '@prisma/client';

export const GET = async (request: Request) => {
  const id = getIdFromSearchString(request.url);
  const category = await getCategoryById(id);
  return Response.json({ category });
};

export const PUT = async (request: Request) => {
  const id = getIdFromSearchString(request.url);
  const data = request.body;
  const updatedCategory = await updateCategory(id, data as Prisma.CategoryUpdateInput);
  return Response.json({ updatedCategory });
};

export const DELETE = async (request: Request) => {
  const id = getIdFromSearchString(request.url);
  const deletedCategory = await deleteCategory(id);
  return Response.json({ deletedCategory });
};
