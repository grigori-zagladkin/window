'use server';

import { prisma } from '@/../../prisma/prisma-client';
import { Prisma } from '@prisma/client';

const getAllPromos = async () => {
  try {
    return await prisma.promo.findMany();
  } catch (err) {
    console.error(err);
    throw new Error('Не удалось получить список акций');
  }
};

const getPromoById = async (id: number) => {
  try {
    return prisma.promo.findUnique({
      where: {
        id,
      },
    });
  } catch (err) {
    console.error(err);
    throw new Error('Не удалось получить акцию по уникальному идентификатору');
  }
};

const createPromo = async () => {
  try {
    return prisma.promo
      .create({
        data: {
          title: '',
          description: '',
          image: '',
        },
      })
      .then((item) => item.id);
  } catch (err) {
    console.error(err);
    throw new Error('Не удалось создать акцию');
  }
};

const updatePromo = async (id: number, dto: Prisma.PromoUpdateInput) => {
  try {
    return prisma.promo.update({
      data: {
        ...dto,
      },
      where: {
        id,
      },
    });
  } catch (err) {
    console.error(err);
    throw new Error('Не удалось обновить акцию');
  }
};

const deletePromo = async (id: number) => {
  try {
    return prisma.promo
      .delete({
        where: {
          id,
        },
      })
      .then((item) => item.id);
  } catch (err) {
    console.error(err);
    throw new Error('Не удалось удалить акцию');
  }
};

export { getAllPromos, getPromoById, createPromo, updatePromo, deletePromo };
