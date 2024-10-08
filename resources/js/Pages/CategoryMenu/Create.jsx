import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Head, useForm } from "@inertiajs/react";
import { Transition } from "@headlessui/react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal } from "lucide-react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

export default function CreateCategory({ auth, className = "" }) {
    const { data, setData, post, errors, processing, recentlySuccessful } =
        useForm({
            name: "",
        });

    const submit = (e) => {
        e.preventDefault();
        post(route("category-menus.store"));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Create Menu
                </h2>
            }
        >
            <Head title="Create Menu" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                        <section className={className}>
                            <header>
                                <h2 className="text-lg font-medium text-gray-900">
                                    Create Category
                                </h2>
                                <p className="mt-1 text-sm text-gray-600">
                                    Create a new category for your menu items.
                                </p>
                            </header>

                            <form onSubmit={submit} className="mt-6 space-y-6">
                                <div>
                                    <InputLabel
                                        htmlFor="name"
                                        value="Category Name"
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

                                {recentlySuccessful && (
                                    <Alert className="absolute top-5 right-5 w-fit shadow bg-green-100">
                                        <Terminal className="h-4 w-4" />
                                        <AlertTitle>Success!</AlertTitle>
                                        <AlertDescription>
                                            Category created successfully!
                                        </AlertDescription>
                                    </Alert>
                                )}
                            </form>
                        </section>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
