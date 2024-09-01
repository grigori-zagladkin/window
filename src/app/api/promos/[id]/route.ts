import { getIdFromSearchString } from '@/utils/getIdFromSearchString';
import { getPromoById } from '@/app/actions/promos';

export const GET = async (request: Request): Promise<Response> => {
  const id = getIdFromSearchString(request.url);
  const promo = await getPromoById(id);
  return Response.json({
    ...promo,
  });
};

export const PUT = async () => {};

export const DELETE = async () => {};
