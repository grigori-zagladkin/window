'use client';

import {FC, useState, useCallback, ChangeEvent} from "react";
import {DataTable} from "@/components/ui/data-table";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {ColumnDef} from "@tanstack/react-table";

type Category = {
    id: number;
    title: string;
    description?: string;
    image?: string;
    type: 'category' | 'sub_category';
}

const columns: ColumnDef<Category>[] = [
    {
        accessorKey: "id",
        header: "ID",
    },
    {
        accessorKey: "title",
        header: "Название",
    },
    {
        accessorKey: "description",
        header: "Описание",
    },
    {
        accessorKey: "image",
        header: "Изображение",
    },
    {
        accessorKey: "type",
        header: "Тип",
    },
    {
        id: "actions",
        header: "Действия",
        cell: ({row}) => {
            return <div>Действия</div>
        }
    }
]

const CategoriesManage: FC = () => {
    const [search, setSearch] = useState('');
    const handleChangeSearch = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        setSearch(event.target.value);
    }, []);
    const [categories, setCategories] = useState([]);

    return (
        <div className='mt-5 space-y-5'>
            <div className="flex gap-6 items-center">
                <Input value={search} onChange={handleChangeSearch} placeholder='Поиск...' className='min-w-[300px]'/>
                <Button>+ Добавить категорию</Button>
            </div>
            <DataTable columns={columns} data={categories} />
        </div>
    );
};

export default CategoriesManage;