import { createCategory, getAllCategories } from '@/app/actions/categories';

export const GET = async (request: Request) => {
  const url = new URLSearchParams(request.url);
  const searchString = url.get('search') || '';
  const categories = await getAllCategories(searchString);
  return Response.json(categories);
};

export const POST = async () => {
  const idNewCategory = await createCategory();
  return Response.json({ idNewCategory });
};
