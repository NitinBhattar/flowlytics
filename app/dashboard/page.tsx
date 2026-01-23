import ProductsCharts from "@/components/products-chart";
import Sidebar from "@/components/sidebar";
import { getUser } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { TrendingUp } from "lucide-react";

const DashboardPage = async () => {
    const user = await getUser();
    const userId = user?.id;

    // prisma.TableName.function, Key-Metrics
    const totalProducts = await prisma.product.count({where: {userId}});

    // lte:less than equal to, not: shouldn't be the value, Key-Metrics
    const lowStock = await prisma.product.count({where: {userId, lowStockAt: {not: null}, quantity: {lte: prisma.product.fields.lowStockAt}}});

    // All products to calculate specific properties, Key-Metrics
    const allProducts = await prisma.product.findMany({
        where: {userId},
        select: {price: true, quantity: true, lowStockAt: true, createdAt: true}
    });

    // Total value from all products, Key-Metrics
    const totalValue = allProducts.reduce((sum, product) => sum + (Number(product.price) * Number(product.quantity)), 0);

    // Weekly Products, Inventory Over Time
    const weeklyProductsData = [];
    const now = new Date();

    // Filter logic
    for(let i=11; i >= 0; i--) {
        // Week starts at
        const weekStart = new Date(now);
        weekStart.setDate(weekStart.getDate() - (i*7));
        // hr, min, sec, ms
        weekStart.setHours(0, 0, 0, 0);

        // Week ends at
        const weekEnd = new Date(weekStart);
        weekEnd.setDate(weekStart.getDate() + 6);
        // hr, min, sec, ms
        weekEnd.setHours(23, 59, 59, 999);

        // X-Label, 01/01, day/month
        const weekLabel = `${String(weekStart.getDate()).padStart(2, "0")}/${String(weekStart.getMonth() + 1).padStart(2, "0")}`;

        const weekProducts = allProducts.filter((product) => {
            const productDate = new Date(product.createdAt);
            
            return productDate >= weekStart && productDate <= weekEnd;
        });

        weeklyProductsData.push({
            week: weekLabel,
            products: weekProducts.length
        });
    }

    // orderBy and take mean taking top 5 items, Stock-Levels
    const recent = await prisma.product.findMany({where: {userId}, orderBy: { createdAt: "desc"}, take: 5});

    // In Stock, Efficiency
    const inStockCount = allProducts.filter((p) => Number(p.quantity) > (p.lowStockAt || 5)).length;
    const lowStockCount = allProducts.filter((p) => Number(p.quantity) <= (p.lowStockAt || 5)).length;
    const outOfStockCount = allProducts.filter((p) => Number(p.quantity) === 0).length;

    const inStockPercentage = totalProducts > 0 ? Math.round((inStockCount / totalProducts) * 100) : 0;
    const lowStockPercentage = totalProducts > 0 ? Math.round((lowStockCount / totalProducts) * 100) : 0;
    const outOfStockPercentage = totalProducts > 0 ? Math.round((outOfStockCount / totalProducts) * 100) : 0;

    // For circle, Efficiency
    const inStockDeg = inStockPercentage * 3.6;
    const lowStockDeg = lowStockPercentage * 3.6;
    const outStockDeg = outOfStockPercentage * 3.6;


    return (
        <div className="min-h-screen bg-white/95">
            {/* Sidebar */}
            <Sidebar currentPath="/dashboard" />

            {/* Page */}
            <div className="ml-16 md:ml-64 p-6 md:p-8">
                {/* Heading */}
                <div className="mb-8">
                    <div className="flex flex-wrap items-center justify-between">
                        <div className= "">
                            <h1 className="text-2xl font-semibold text-black">
                                Dashboard
                            </h1>

                            <p className="text-sm text-black">
                                Welcome! Here is an overview of your Inventory.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                    {/* Key-Metrics */}
                    <div className="bg-white rounded-lg border border-gray-500 p-6">
                        <h2 className="text-lg font-semibold text-black mb-6">
                            Key Metrics
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="text-center">
                                <div className="text-3xl font-bold text-black">
                                    {totalProducts}
                                </div>

                                <div className="text-sm font-bold text-gray-500">
                                    Total Products
                                </div>

                                <div className="flex items-center justify-center mt-1">
                                    <span className="text-xs text-green-600">
                                        +{totalProducts}
                                    </span>

                                    <TrendingUp className="w-3 h-3 text-green-600 ml-1" />
                                </div>
                            </div>

                            <div className="text-center">
                                <div className="text-3xl font-bold text-black">
                                    {Number(totalValue).toFixed(0)}
                                </div>

                                <div className="text-sm font-bold text-gray-500">
                                    Total Value
                                </div>

                                <div className="flex items-center justify-center mt-1">
                                    <span className="text-xs text-green-600">
                                        +{Number(totalValue).toFixed(0)}
                                    </span>

                                    <TrendingUp className="w-3 h-3 text-green-600 ml-1" />
                                </div>
                            </div>

                            <div className="text-center">
                                <div className="text-3xl font-bold text-black">
                                    {lowStock}
                                </div>

                                <div className="text-sm font-bold text-gray-500">
                                    Low Stock
                                </div>

                                <div className="flex items-center justify-center mt-1">
                                    <span className="text-xs text-green-600">
                                        +{lowStock}
                                    </span>

                                    <TrendingUp className="w-3 h-3 text-green-600 ml-1" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Inventory Over Time */}
                    <div className="bg-white rounded-lg border border-gray-500 p-6">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-lg font-semibold text-black mb-6">New productes per week</h2>
                        </div>

                        <div className="h-48">
                            <ProductsCharts data={weeklyProductsData} />
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                    {/* Stock-Levels */}
                    <div className="bg-white rounded-lg border border-gray-500 p-6">
                        <h2 className="text-lg font-semibold text-black mb-6">
                            Stock Levels
                        </h2>

                        <div className="space-y-3">
                            {
                                recent.map((product, key) => {
                                    // For colours
                                    const stockLevel = product.quantity === 0
                                    ? 0 
                                    : product.quantity <= (product.lowStockAt || 5)
                                        ? 1
                                        : 2;

                                    const bgColours = ["bg-red-600", "bg-yellow-400", "bg-green-400"];
                                    const textColours = ["text-red-600", "text-yellow-400", "text-green-400"];

                                    return (
                                        <div key={key} className="flex items-center justify-between p-3 rounded-lg bg-gray-100">
                                            <div className="flex items-center space-x-3">
                                                <div className={`w-3 h-3 rounded-full ${bgColours[stockLevel]}`}/>
                                                <span className="text-black text-sm font-medium">{product.name}</span>
                                            </div>

                                            <div className={`text-sm font-medium ${textColours[stockLevel]}`}>
                                                {product.quantity} units
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>

                    {/* Efficiency */}
                    <div className="bg-white rounded-lg border border-gray-500 p-6">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-lg font-semibold text-black mb-6">Efficiency</h2>
                        </div>

                        <div className="flex items-center justify-center">
                            <div className="relative w-48 h-48 rounded-full bg-gray-200">
                                {/* Multi-segment ring */}
                                <div
                                    className="absolute inset-0 rounded-full"
                                    style={{
                                        background: `conic-gradient(
                                        #7c3aed 0deg ${inStockDeg}deg,
                                        #c4b5fd ${inStockDeg+1}deg ${inStockDeg + lowStockDeg}deg,
                                        #e5e7eb ${inStockDeg + lowStockDeg + 1}deg 360deg
                                        )`
                                    }}
                                />

                                {/* Inner Text */}
                                <div className="absolute inset-6 rounded-full bg-white flex items-center justify-center">
                                    <div className="text-center">
                                        <div className="text-2xl font-bold text-gray-900">
                                            {inStockPercentage}%
                                        </div>
                                        <div className="text-sm text-gray-600">In Stock</div>
                                    </div>
                                </div>
                            </div>
                        </div>


                        <div className="mt-6 space-y-2">
                            <div className="flex items-center justify-between text-sm text-gray-500">
                                {/* In Stock */}
                                <div className="flex items-center space-x-2">
                                    {/* Circle */}
                                    <div className="w-3 h-3 rounded-full bg-purple-600" />

                                    {/* Text */}
                                    <span className="">
                                        In Stock ({inStockPercentage}%)
                                    </span>
                                </div>

                                {/* Low Stock */}
                                <div className="flex items-center space-x-2">
                                    {/* Circle */}
                                    <div className="w-3 h-3 rounded-full bg-purple-200" />

                                    {/* Text */}
                                    <span className="">
                                        Low on Stock ({lowStockPercentage}%)
                                    </span>
                                </div>

                                {/* Out of stock */}
                                <div className="flex items-center space-x-2">
                                    {/* Circle */}
                                    <div className="w-3 h-3 rounded-full bg-gray-200" />

                                    {/* Text */}
                                    <span className="">
                                        Out of Stock ({outOfStockPercentage}%)
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DashboardPage;
