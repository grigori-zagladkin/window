'use client';

import { FC, useCallback, useState } from 'react';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import CategoriesManage from '@/components/AdminPanel/CategoriesManage';
import PromoManage from '@/components/AdminPanel/PromoManage';
import SubCategoriesManage from '@/components/AdminPanel/SubCategoriesManage';
import ProductsManage from '@/components/AdminPanel/ProductsManage';
import AttributesManage from '@/components/AdminPanel/AttributesManage';

const AdminPanel: FC = () => {
  const [open, setOpen] = useState(false);
  const openBtnClickHandler = useCallback(() => {
    setOpen(true);
  }, []);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <Button variant="ghost" onClick={openBtnClickHandler}>
        Панель администратора
      </Button>
      <SheetContent className="min-w-[1000px]">
        <SheetHeader>
          <SheetTitle>Панель администратора</SheetTitle>
          <SheetDescription>
            Здесь вы можете создавать и редактировать товары и категории.
          </SheetDescription>
        </SheetHeader>
        <Tabs defaultValue="account" className="mt-5 w-full">
          <TabsList>
            <TabsTrigger value="products">Товары</TabsTrigger>
            <TabsTrigger value="categories">Категории</TabsTrigger>
            <TabsTrigger value="sub_categories">Подкатегории</TabsTrigger>
            <TabsTrigger value="attributes">Атрибуты</TabsTrigger>
            <TabsTrigger value="promos">Промо</TabsTrigger>
          </TabsList>
          <TabsContent value="products">
            <ProductsManage />
          </TabsContent>
          <TabsContent value="categories">
            <CategoriesManage />
          </TabsContent>
          <TabsContent value="sub_categories">
            <SubCategoriesManage />
          </TabsContent>
          <TabsContent value="attributes">
            <AttributesManage />
          </TabsContent>
          <TabsContent value="promos">
            <PromoManage />
          </TabsContent>
        </Tabs>
      </SheetContent>
    </Sheet>
  );
};

export default AdminPanel;
