//@ts-nocheck

'use client';

import { ChangeEvent, FC } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table';
import { Wrapper } from '@/components/AdminPanel/common/Wrapper';
import { ColumnDef } from '@tanstack/react-table';

interface IAdminTableProps<T> {
  searchTerm: string;
  handleSearch: (e: ChangeEvent<HTMLInputElement>) => void;
  columns: ColumnDef<T>;
  data: T;
  handleCreate: Function;
}

export const AdminTable = <T extends object>({
  searchTerm,
  handleSearch,
  columns,
  data,
  handleCreate,
}: IAdminTableProps<T>) => {
  return (
    <Wrapper>
      <div className="mt-10 flex flex-col gap-10">
        <div className="flex items-center gap-6">
          <Input
            value={searchTerm}
            onChange={handleSearch}
            placeholder="Поиск..."
            className="min-w-[300px]"
          />
          <Button onClick={handleCreate}>+ Добавить категорию</Button>
        </div>
        <DataTable columns={columns} data={data || []} />
      </div>
    </Wrapper>
  );
};
