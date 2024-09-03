import { FC } from 'react';
import {
  CategoryTableItem,
  getColumnDefinitionForCategoriesList,
  useCategories,
} from '@/components/AdminPanel/CategoiesManage';
import { AdminTable } from '@/components/AdminPanel/common/AdminTable';
import { ColumnDef } from '@tanstack/react-table';

export const CategoriesManageWidget: FC = () => {
  const { data, searchTerm, handleSearch, handleDelete, handleUpdate, handleCreate } =
    useCategories();
  const columns = getColumnDefinitionForCategoriesList(handleUpdate, handleDelete);
  return (
    <AdminTable
      searchTerm={searchTerm}
      handleSearch={handleSearch}
      columns={columns as unknown as ColumnDef<CategoryTableItem[]>}
      data={data || []}
      handleCreate={handleCreate}
    />
  );
};
