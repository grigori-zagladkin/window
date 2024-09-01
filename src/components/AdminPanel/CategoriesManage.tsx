'use client';

import { FC, useState, useCallback, ChangeEvent, useEffect, useMemo } from 'react';
import { DataTable } from '@/components/ui/data-table';
import { Button } from '@/components/ui/button';
import { ColumnDef } from '@tanstack/react-table';
import { useDebounce } from '@/hooks/useDebounce';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { toast } from 'sonner';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { MoreHorizontal } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

type Category = {
  id: number;
  title: string;
};

const formSchema = z.object({
  title: z.string().min(2, {
    message: 'У категории должно быть название',
  }),
});

const fetchCategories = async (search: string) =>
    await fetch('/api/categories?search=' + search).then((res) => res.json());

const CategoriesManage: FC = () => {
  const [currentEditableId, setCurrentEditableId] = useState(0);
  const clearCurrentEditableId = useCallback(() => {
    setCurrentEditableId(0);
  }, []);
  const [isOpenAlert, setIsOpenAlert] = useState(false);
  const handleChangeIsOpenAlert = useCallback((id: number) => {
    setIsOpenAlert(true);
    setCurrentEditableId(id);
  }, []);
  const deleteCategory = useCallback(async () => {
    try {
      await fetch('/api/categories/' + currentEditableId, {
        method: 'DELETE',
      }).then(() => {
        toast.success('Успешно');
        fetchCategories(debouncedSearch).then((res) => {
          setCategories(
              res?.map?.((item) => ({
                id: item.id,
                title: item.title,
              })),
          );
        });
      });
    } catch (err) {
      console.error(err);
      throw new Error('не удалось удалить категорию');
      toast.error('не удалось удалить категорию');
    }
  }, [currentEditableId]);
  const updateCategory = useCallback(async (id: number) => {
    try {
      await fetch('/api/categories/' + id, {
        method: 'DELETE',
      }).then(() => {
        toast.success('Успешно');
      });
    } catch (err) {
      console.error(err);
      throw new Error('не удалось удалить категорию');
      toast.error('не удалось удалить категорию');
    }
  }, []);
  const columns: ColumnDef<Category>[] = useMemo(
    () => [
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
                <DropdownMenuItem>Обновить</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => handleChangeIsOpenAlert(id)}>
                  Удалить
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          );
        },
      },
    ],
    [],
  );
  const [search, setSearch] = useState('');
  const handleChangeSearch = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  }, []);
  const debouncedSearch = useDebounce(search, 500);
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    fetchCategories(debouncedSearch).then((res) => {
      setCategories(
        res?.map?.((item) => ({
          id: item.id,
          title: item.title,
        })),
      );
    });
  }, [debouncedSearch]);
  const [isOpen, setIsOpen] = useState(false);
  const handleBtnClick = useCallback(async () => {
    try {
      await fetch('/api/categories', {
        method: 'POST',
      }).then((res) => {
        setIsOpen(true);
        setCurrentEditableId(res as number);
      });
      fetchCategories(debouncedSearch).then((res) => {
        setCategories(
            res?.map?.((item) => ({
              id: item.id,
              title: item.title,
            })),
        );
      });
      toast.success('Успешно');
    } catch (err) {
      console.error(err);
      throw new Error('Не удалось добавить категорию');
      toast.error('Не удалось добавить категорию');
    }
  }, []);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
    },
  });
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await fetch('/api/categories/' + currentEditableId, {
        method: 'PUT',
        body: values,
      }).then(() => {
        toast.success('Успешное обновление');
      });
    } catch (err) {
      console.error(err);
      throw new Error('Ошибка при обновлении категории');
      toast.error('Ошибка при обновлении категории');
    }
  };
  return (
    <>
      <AlertDialog open={isOpenAlert} onOpenChange={setIsOpenAlert}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Вы точно уверены?</AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={clearCurrentEditableId}>Нет</AlertDialogCancel>
            <AlertDialogAction onClick={deleteCategory}>Да</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <div className="mt-5 space-y-5">
        <div className="flex items-center gap-6">
          <Input
            value={search}
            onChange={handleChangeSearch}
            placeholder="Поиск..."
            className="min-w-[300px]"
          />
          <Button onClick={handleBtnClick}>+ Добавить категорию</Button>
        </div>
        <DataTable columns={columns} data={categories} />
      </div>
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Редактирование категории</SheetTitle>
          </SheetHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Название</FormLabel>
                    <FormControl>
                      <Input placeholder="Название..." {...field} />
                    </FormControl>
                    <FormDescription>Название категории</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">Обновить</Button>
            </form>
          </Form>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default CategoriesManage;
