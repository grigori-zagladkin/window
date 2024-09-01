import { createCategory, getAllCategories } from '@/app/actions/categories';

export const GET = async (request: Request) => {
  const url = new URL(request.url);
  const searchParams = new URLSearchParams(url.search);
  const searchString = searchParams.get('search') || '';
  const categories = await getAllCategories(searchString);
  return Response.json(categories);
};

export const POST = async () => {
  const id = await createCategory();
  return Response.json(id);
};
