import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Head, useForm, usePage } from "@inertiajs/react";
import { Transition } from "@headlessui/react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import TextArea from "@/Components/TextArea";
import { Terminal } from "lucide-react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

export default function EditMenu({ auth, className = "", menu }) {
    const { categoryMenu } = usePage().props;

    const { data, setData, put, errors, processing, recentlySuccessful } =
        useForm({
            name: menu.name || "",
            category_menu_id: menu.category_menu_id || "",
            price: menu.price || "",
            description: menu.description || "",
            photo: null,
        });

    const submit = (e) => {
        e.preventDefault();
        // Menggunakan put untuk mengupdate data menu
        put(route("menus.update", menu.id));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Edit Menu
                </h2>
            }
        >
            <Head title="Edit Menu" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                        <section className={className}>
                            <header>
                                <h2 className="text-lg font-medium text-gray-900">
                                    Edit Menu
                                </h2>

                                <p className="mt-1 text-sm text-gray-600">
                                    Edit the existing menu item with the form
                                    below.
                                </p>
                            </header>

                            <form
                                onSubmit={submit}
                                className="mt-6 space-y-6"
                                encType="multipart/form-data"
                            >
                                <div>
                                    <InputLabel
                                        htmlFor="name"
                                        value="Menu Name"
                                    />

                                    <TextInput
                                        id="name"
                                        name="name"
                                        value={data.name}
                                        className="mt-1 block w-full"
                                        onChange={(e) =>
                                            setData("name", e.target.value)
                                        }
                                        required
                                    />

                                    <InputError
                                        message={errors.name}
                                        className="mt-2"
                                    />
                                </div>

                                <div className="mt-4">
                                    <InputLabel
                                        htmlFor="category"
                                        value="Category"
                                    />

                                    <select
                                        id="category"
                                        name="category_menu_id"
                                        value={data.category_menu_id}
                                        onChange={(e) =>
                                            setData(
                                                "category_menu_id",
                                                e.target.value
                                            )
                                        }
                                        className="mt-1 block w-full"
                                        required
                                    >
                                        <option value="">
                                            Select Category
                                        </option>
                                        {categoryMenu.map((category) => (
                                            <option
                                                key={category.id}
                                                value={category.id}
                                            >
                                                {category.name}
                                            </option>
                                        ))}
                                    </select>

                                    <InputError
                                        message={errors.category_menu_id}
                                        className="mt-2"
                                    />
                                </div>

                                <div className="mt-4">
                                    <InputLabel htmlFor="price" value="Price" />

                                    <TextInput
                                        id="price"
                                        name="price"
                                        value={data.price}
                                        className="mt-1 block w-full"
                                        onChange={(e) =>
                                            setData("price", e.target.value)
                                        }
                                        required
                                    />

                                    <InputError
                                        message={errors.price}
                                        className="mt-2"
                                    />
                                </div>

                                <div className="mt-4">
                                    <InputLabel
                                        htmlFor="description"
                                        value="Description"
                                    />

                                    <TextArea
                                        id="description"
                                        name="description"
                                        value={data.description}
                                        className="mt-1 block w-full"
                                        onChange={(e) =>
                                            setData(
                                                "description",
                                                e.target.value
                                            )
                                        }
                                        required
                                    />

                                    <InputError
                                        message={errors.description}
                                        className="mt-2"
                                    />
                                </div>

                                {/* Input untuk Upload Foto */}
                                <div className="mt-4">
                                    <InputLabel
                                        htmlFor="photo"
                                        value="Menu Photo"
                                    />

                                    <input
                                        type="file"
                                        id="photo"
                                        name="photo"
                                        className="mt-1 block w-full"
                                        onChange={(e) =>
                                            setData("photo", e.target.files[0])
                                        }
                                    />

                                    <InputError
                                        message={errors.photo}
                                        className="mt-2"
                                    />
                                </div>

                                <div className="flex items-center gap-4">
                                    <PrimaryButton disabled={processing}>
                                        Save
                                    </PrimaryButton>

                                    <Transition
                                        show={recentlySuccessful}
                                        enter="transition ease-in-out"
                                        enterFrom="opacity-0"
                                        leave="transition ease-in-out"
                                        leaveTo="opacity-0"
                                    >
                                        <p className="text-sm text-gray-600">
                                            Saved.
                                        </p>
                                    </Transition>
                                </div>

                                <div className="flex items-center">
                                    {recentlySuccessful && (
                                        <Alert className="absolute top-5 right-5 w-fit shadow bg-green-100">
                                            <Terminal className="h-4 w-4" />
                                            <AlertTitle>Success!</AlertTitle>
                                            <AlertDescription>
                                                Menu updated successfully!
                                            </AlertDescription>
                                        </Alert>
                                    )}
                                </div>
                            </form>
                        </section>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
