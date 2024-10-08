import React from "react";
import { Link, usePage, useForm, Head } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";

const Index = ({ auth }) => {
    const { categoryMenu } = usePage().props;
    const { delete: deleteCategory } = useForm();

    const handleDelete = (id) => {
        if (confirm("Are you sure you want to delete this category?")) {
            deleteCategory(route("category-menus.destroy", id));
        }
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    List Category Menu
                </h2>
            }
        >
            <Head title="List Category Menu" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                        <div className="flex justify-between items-center mb-4">
                            <h1 className="text-lg font-bold">Category Menu</h1>
                            <Link href="/category-menus/create">
                                <Button>Add Category</Button>
                            </Link>
                        </div>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Name</TableHead>
                                    <TableHead>Action</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {categoryMenu.map((category) => (
                                    <TableRow key={category.id}>
                                        <TableCell className="font-medium">
                                            {category.name}
                                        </TableCell>
                                        <TableCell key={category.id}>
                                            <div className="flex space-x-2">
                                                <Link
                                                    href={route(
                                                        "category-menus.edit",
                                                        category.id
                                                    )}
                                                    className="text-blue-600 hover:text-blue-900"
                                                >
                                                    Edit
                                                </Link>
                                                <button
                                                    onClick={() =>
                                                        handleDelete(
                                                            category.id
                                                        )
                                                    }
                                                    className="text-red-600 hover:text-red-900"
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default Index;
