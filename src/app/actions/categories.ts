'use server'

import { prisma } from "@/../../prisma/prisma-client";
import { Prisma } from '@prisma/client';

const getAllCategories = async (searchString: string = '') => {
    try {
        return prisma.category.findMany({
            where: {
                OR: [
                    {
                        title: {
                            contains: searchString,
                            mode: 'insensitive'
                        },
                        description: {
                            contains: searchString,
                            mode: 'insensitive'
                        },
                    }
                ]
            }
        })
    } catch (err) {
        console.error(err);
        throw new Error('Не удалось получить список категорий');
    }
};

const getCategoryById = async (id: number) => {
    try {
        return prisma.category.findUnique({
            where: {
                id
            }
        })
    } catch (err) {
        console.error(err);
        throw new Error('Не удалось получить категорию по уникальному идентификатору');
    }
}

const createCategory = async () => {
    try {
        return prisma.category.create({
            data: {
                title: '',
            }
        }).then(item => item.id);
    } catch (err) {
        console.error(err);
        throw new Error('Не удалось создать категорию');
    }
}

const updateCategory = async (id: number, dto: Prisma.CategoryUpdateInput) => {
    try {
        return prisma.category.update({
            data: {
                ...dto
            },
            where: {
                id
            }
        }).then(item => item.id);
    } catch (err) {
        console.error(err);
        throw new Error('Не удалось создать категорию');
    }
}

const deleteCategory = async (id: number) => {
    try {
        return prisma.category.delete({
            where: {
                id,
            }
        }).then(item => item.id);
    } catch (err) {
        console.error(err);
        throw new Error('Не удалось создать категорию');
    }
}

export {
    getAllCategories,
    getCategoryById,
    createCategory,
    updateCategory,
    deleteCategory
}