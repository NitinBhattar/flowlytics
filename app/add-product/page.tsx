import Sidebar from "@/components/sidebar";
import { getUser } from "@/lib/auth";
import { createProduct } from "@/lib/actions/products";
import Link from "next/link";

const AddProductPage = async () => {
    const user = await getUser();
    const userId = user?.id;

    return (
        <div className="min-h-screen bg-white/95">
            {/* Sidebar */}
            <Sidebar currentPath="/add-product" />

            {/* Page */}
            <div className="ml-16 md:ml-64 p-6 md:p-8">
                {/* Heading */}
                <div className="mb-8">
                    <div className="flex flex-wrap items-center justify-between">
                        <div className= "">
                            <h1 className="text-2xl font-semibold text-black">
                                Add Product
                            </h1>

                            <p className="text-sm text-black">
                                Add a new product to your Inventory.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Add product form */}
                <div className="max-w-2xl">
                    <div className="bg-white rounded-lg border border-gray-200! p-6">
                        <form className="space-y-6" action={createProduct}>
                            <div className="">
                                <label
                                    htmlFor="name"
                                    className="block text-sm font-medium text-gray-700 mb-2"
                                >
                                    Product Name *
                                </label>

                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    required
                                    className="w-full px-4 py-2 text-black border border-gray-300! rounded-lg"
                                    placeholder="Enter Product Name"
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="">
                                    <label
                                        htmlFor="quantity"
                                        className="block text-sm font-medium text-gray-700 mb-2"
                                    >
                                        Quantity *
                                    </label>

                                    <input
                                        type="number"
                                        id="quantity"
                                        name="quantity"
                                        min="0"
                                        required
                                        className="w-full px-4 py-2 text-black border border-gray-300! rounded-lg"
                                        placeholder="0"
                                    />
                                </div>

                                <div className="">
                                    <label
                                        htmlFor="price"
                                        className="block text-sm font-medium text-gray-700 mb-2"
                                    >
                                        Price *
                                    </label>

                                    <input
                                        type="number"
                                        id="price"
                                        name="price"
                                        step="0.01"
                                        min="0"
                                        required
                                        className="w-full px-4 py-2 border text-black border-gray-300! rounded-lg"
                                        placeholder="0.0"
                                    />
                                </div>
                            </div>

                            <div className="">
                                <label
                                    htmlFor="sku"
                                    className="block text-sm font-medium text-gray-700 mb-2"
                                >
                                    SKU (Optional)
                                </label>

                                <input
                                    type="text"
                                    id="sku"
                                    name="sku"
                                    className="w-full px-4 py-2 border text-black border-gray-300! rounded-lg"
                                    placeholder="Enter SKU"
                                />
                            </div>

                            <div>
                                <label
                                    htmlFor="lowStockAt"
                                    className="block text-sm font-medium text-gray-700 mb-2"
                                >
                                    Low Stock At (Optional)
                                </label>

                                <input
                                    type="number"
                                    id="lowStockAt"
                                    name="lowStockAt"
                                    min="0"
                                    className="w-full px-4 py-2 text-black border border-gray-300! rounded-lg"
                                    placeholder="Enter low stock threshold"
                                />
                            </div>

                            <div className="flex gap-5">
                                <button
                                    type="submit"
                                    className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800"
                                >
                                    Add Product
                                </button>
                                <Link
                                    href="/inventory"
                                    className="px-6 py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300"
                                >
                                    Cancel
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default AddProductPage;
