'use client';

import {ChangeEvent, useCallback, useContext, useMemo, useState} from 'react';
import { useDebounce } from '@/hooks/useDebounce';
import { useMutation, useQuery } from '@tanstack/react-query';
import { CategoriesService } from '@/services/categories.service';
import { showError } from '@/utils/showError';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { MoreHorizontal } from 'lucide-react';
import { ColumnDef } from '@tanstack/react-table';
import {AlertContext} from "@/components/AdminPanel/common/Alert";

export type CategoryTableItem = {
  id: number;
  title: string;
};

export const getColumnDefinitionForCategoriesList = (
  handleDelete: Function,
  handleUpdate: Function,
): ColumnDef<CategoryTableItem>[] => [
  {
    accessorKey: 'id',
    header: 'ID',
  },
  {
    accessorKey: 'title',
    header: 'Название',
  },
  {
    id: 'actions',
    header: 'Действия',
    cell: ({ row }) => {
      const { id } = row.original;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Открыть меню</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Действия</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => handleUpdate(id)}>Обновить</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => handleDelete(id)}>Удалить</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export const useCategories = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearch = useDebounce(searchTerm, 500);
  const queryData = useQuery({
    queryKey: ['categories manage list', debouncedSearch],
    queryFn: useCallback(
      () => CategoriesService.getAllCategories(debouncedSearch),
      [debouncedSearch],
    ),
    select: (data) =>
      data.map(
        (category) =>
          ({
            id: category.id,
            title: category.title,
          }) as CategoryTableItem,
      ),
    throwOnError: (error) => {
      showError(error, 'Не удалось получить список категорий');
      return true;
    },
  });
  const handleSearch = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  }, []);
  const { mutateAsync: createAsync } = useMutation({});
  const { mutateAsync: deleteAsync } = useMutation({
    mutationKey: [],
    mutationFn: useCallback((id: number) => CategoriesService.deleteCategory(id), []),
  });
  const handleCreate = () => {};
  const alert = useContext(AlertContext)
  const handleDelete = async (id: number) => {
    try {
      await deleteAsync(id);
    } catch (err) {
      showError(err, 'Не удалось удалить категорию')
    }
  };
  const handleUpdate = () => {};
  return useMemo(
    () => ({
      handleSearch,
      ...queryData,
      searchTerm,
      handleCreate,
      handleDelete,
      handleUpdate,
    }),
    [queryData, handleSearch, searchTerm, handleCreate, handleDelete, handleUpdate],
  );
};
