'use client';

import { FC, useState, useCallback } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { toast } from 'sonner';
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
import { ImageUpload } from '@/components/ui/image-upload';

const formSchema = z.object({
  title: z.string().min(2, {
    message: 'У акции должно быть название',
  }),
  description: z.string().min(2, {
    message: 'У акции должно быть описание',
  }),
  image: z.string().min(2, {
    message: 'У акции должно быть изображение',
  }),
});

const PromoManage: FC = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      description: '',
      image: '',
    },
  });

  const [currentId, setCurrentId] = useState(0);

  const [isOpen, setIsOpen] = useState(false);
  const addButtonClickHandler = useCallback(async () => {
    await fetch('/api/promos', {
      method: 'POST',
    }).then((id) => {
      setCurrentId(id);
      setIsOpen(true);
    });
  }, []);

  const onFileChanges = useCallback((images: string[]) => {
    form.setValue('image', images[0]);
  }, []);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      ('use server');
      await fetch('/api/promos/' + currentId, {
        method: 'PUT',
      }).then(() => {
        toast.success('Успешное обновление');
      });
    } catch (err) {
      console.error(err);
      throw new Error('Ошибка при обновлении акции');
      toast.error('Ошибка при создании');
    }
  };

  return (
    <div>
      <Button variant="ghost" onClick={addButtonClickHandler}>
        + Добавить промо
      </Button>
      <ul></ul>
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetContent className="min-w-[450px]">
          <SheetHeader>
            <SheetTitle>Редактирование акции</SheetTitle>
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
                    <FormDescription>Название акции</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Описание</FormLabel>
                    <FormControl>
                      <Input placeholder="Описание..." {...field} />
                    </FormControl>
                    <FormDescription>Описание акции</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="image"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Изображение</FormLabel>
                    <FormControl>
                      <ImageUpload initialValues={[]} maxCount={1} onChange={onFileChanges} />
                    </FormControl>
                    <FormDescription>Изображение</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">Обновить</Button>
            </form>
          </Form>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default PromoManage;
