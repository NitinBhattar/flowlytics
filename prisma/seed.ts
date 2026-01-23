import prisma from "@/lib/prisma";

const main = async () => {
    const demoId = "e0e1ef3b-b65f-47ab-90e0-6bba32685061";

    // Create sample products
    await prisma.product.createMany({
            data: Array.from({ length: 25 }).map((_, i) => ({
            userId: demoId,
            name: `Product ${i + 1}`,
            price: (Math.random() * 90 + 10).toFixed(2),
            quantity: Math.floor(Math.random() * 20),
            lowStockAt: 5,
            createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * (i * 5))
        })),
    });
};

main().catch((error) => {
    console.error(error);
    process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    }
);
