import Pagination from "@/components/pagination";
import Sidebar from "@/components/sidebar";
import { deleteProduct } from "@/lib/actions/products";
import { getUser } from "@/lib/auth";
import prisma from "@/lib/prisma";

const inventory = async ({searchParams}: {searchParams: Promise<{q?: string, page?: string}>}) => {
    const user = await getUser();
    const userId = user?.id;

    // For search
    const params = await searchParams;
    const q = (params.q ?? "").trim();

    // For pagination
    const pageSize = 10;
    const page = Math.max(1, Number(params.page ?? 1));

    // Modified search, mode: "insensitive" makes the match case insensitive
    const where = {
        userId, ...(q ? { name: { contains: q, mode: "insensitive" as const } } : {})
    };

    const [totalCount, items] = await Promise.all([
        prisma.product.count({ where }),

        prisma.product.findMany({
            where,
            orderBy: { createdAt: "desc" },
            skip: (page - 1) * pageSize,
            take: pageSize
        }),
    ]);

    const totalPages = Math.max(1, Math.ceil(totalCount / pageSize));

    return (
        <div className="min-h-screen bg-white/95 w-full">
            {/* Sidebar */}
            <Sidebar currentPath="/inventory" />

            {/* Page */}
            <div className="ml-16 md:ml-64 p-6 md:p-8">
                {/* Heading */}
                <div className="mb-8">
                    <div className="flex flex-wrap items-center justify-between">
                        <div className= "">
                            <h1 className="text-2xl font-semibold text-black">
                                Inventory
                            </h1>

                            <p className="text-sm text-black">
                                Manage your products and track inventory levels.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Product Table */}
                <div className="space-y-6">
                    <div className="w-full overflow-scroll hide-scrollbar">
                        {/* Search Bar */}
                        <div className="w-full bg-white rounded-lg p-6">
                            <form className="flex gap-2" action="/inventory" method="GET">
                                <input
                                    name="q"
                                    placeholder="Search for products..."
                                    className="flex-1 px-4 py-2 border border-gray-500! text-black rounded-lg"
                                />

                                <button className="px-6 py-2 text-white rounded-lg bg-black hover:bg-gray-800">
                                    Search
                                </button>
                            </form>
                        </div>

                        {/* Table */}
                        <table className="w-full bg-white rounded-lg border border-gray-200 ">
                            <thead className="bg-gray-50">
                                <tr className="">
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">SKU</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Price</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Quantity</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Low Stock At</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                                </tr>
                            </thead>

                            <tbody className="divide-y divide-gray-200">
                                {
                                    items.map((product, key) => {
                                        return (
                                            <tr key={key} className="hover:bg-gray-50">
                                                <td className="px-6 py-4 text-sm text-gray-500">
                                                    {product.name}
                                                </td>

                                                <td className="px-6 py-4 text-sm text-gray-500">
                                                    {product.sku || '-'}
                                                </td>

                                                <td className="px-6 py-4 text-sm text-gray-500">
                                                    {product.price.toFixed(2)}
                                                </td>

                                                <td className="px-6 py-4 text-sm text-gray-500">
                                                    {product.quantity}
                                                </td>

                                                <td className="px-6 py-4 text-sm text-gray-500">
                                                    {product.lowStockAt || "default(5)"}
                                                </td>

                                                <td className="px-6 py-4">
                                                    <form action={async (formData: FormData) => {
                                                        "use server";
                                                        await deleteProduct(formData);
                                                    }}>
                                                        <input type="hidden" name="id" value={product.id} />

                                                        <button className="text-red-600 hover:text-red-900">
                                                            Delete
                                                        </button>
                                                    </form>
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div>

                    {
                        totalPages > 1 && (
                            <div className="bg-white rounded-lg p-6">
                                <Pagination
                                    currentPage={page}
                                    totalPages={totalPages}
                                    baseUrl="/inventory"
                                    searchParams={{q, pageSize: String(pageSize)}}
                                />
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    )
};

export default inventory;
