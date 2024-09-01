import { createPromo, getAllPromos } from '@/app/actions/promos';

export const GET = async (request: Request) => {
  const data = await getAllPromos();
  return Response.json({ data });
};

export const POST = async () => {
  const idNewPromo = await createPromo();
  return Response.json({ idNewPromo });
};
