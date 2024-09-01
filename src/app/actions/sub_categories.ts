'use server';

import { prisma } from '@/../../prisma/prisma-client';
import { Prisma } from '@prisma/client';

const getAllSubCategories = async (searchString: string = '') => {
  try {
    return prisma.subCategory.findMany({
      where: {
        OR: [
          {
            title: {
              contains: searchString,
              mode: 'insensitive',
            },
            description: {
              contains: searchString,
              mode: 'insensitive',
            },
          },
        ],
      },
    });
  } catch (err) {
    console.error(err);
    throw new Error('Не удалось получить список подкатегорий');
  }
};

const getSubCategoryById = async (id: number) => {
  try {
    return prisma.subCategory.findUnique({
      where: {
        id,
      },
    });
  } catch (err) {
    console.error(err);
    throw new Error('Не удалось получить подкатегорию по уникальному идентификатору');
  }
};

const createSubCategory = async () => {
  try {
    return prisma.subCategory
      .create({
        data: {
          title: '',
          category_id: 0,
        },
      })
      .then((item) => item.id);
  } catch (err) {
    console.error(err);
    throw new Error('Не удалось создать подкатегорию');
  }
};

const updateSubCategory = async (id: number, dto: Prisma.SubCategoryUpdateInput) => {
  try {
    return prisma.subCategory
      .update({
        data: {
          ...dto,
        },
        where: {
          id,
        },
      })
      .then((item) => item.id);
  } catch (err) {
    console.error(err);
    throw new Error('Не удалось создать подкатегорию');
  }
};

const deleteSubCategory = async (id: number) => {
  try {
    return prisma.subCategory
      .delete({
        where: {
          id,
        },
      })
      .then((item) => item.id);
  } catch (err) {
    console.error(err);
    throw new Error('Не удалось создать подкатегорию');
  }
};

export {
  getAllSubCategories,
  getSubCategoryById,
  createSubCategory,
  updateSubCategory,
  deleteSubCategory,
};
