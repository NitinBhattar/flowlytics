import prisma from "@/lib/prisma";

const main = async () => {
    const demoId = "58a15510-77a3-430b-961e-cc8b9aaaf728";

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
