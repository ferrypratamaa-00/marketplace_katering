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
    const { menus } = usePage().props;
    console.log(menus[0].category_menu);
    const { delete: deleteMenu } = useForm();

    const handleDelete = (id) => {
        if (confirm("Are you sure you want to delete this menu?")) {
            deleteMenu(route("menus.destroy", id));
        }
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    List Menu
                </h2>
            }
        >
            <Head title="List Menu" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                        <div className="flex justify-between items-center mb-4">
                            <h1 className="text-lg font-bold">Menu</h1>
                            <Link href="/menus/create">
                                <Button>Add Menu</Button>
                            </Link>
                        </div>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Name</TableHead>
                                    <TableHead>Category</TableHead>
                                    <TableHead>Photo</TableHead>
                                    <TableHead>Action</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {menus.map((menu) => (
                                    <TableRow key={menu.id}>
                                        <TableCell className="font-medium">
                                            {menu.name}
                                        </TableCell>
                                        <TableCell className="font-medium">
                                            {menu.category_menu.name}
                                        </TableCell>
                                        <TableCell>
                                            {menu.photo && (
                                                <img
                                                    src={
                                                        "uploads/" + menu.photo
                                                    }
                                                    alt={menu.name}
                                                    className="h-20 w-20 object-cover rounded"
                                                />
                                            )}
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex space-x-2">
                                                <Link
                                                    href={route(
                                                        "menus.edit",
                                                        menu.id
                                                    )}
                                                    className="text-blue-600 hover:text-blue-900"
                                                >
                                                    Edit
                                                </Link>
                                                <button
                                                    onClick={() =>
                                                        handleDelete(menu.id)
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
