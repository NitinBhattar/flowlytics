"use server";

import { getUser } from "../auth";
import prisma from "../prisma"
import { revalidatePath } from "next/cache";

const deleteProduct = async (formData: FormData) => {
    const user = await getUser();
    const userId = user?.id;
    const id = String(formData.get("id") || "");

    await prisma.product.deleteMany({
        where: {id, userId}
    });

    // Refreshes inventory
    revalidatePath("/inventory");
    return;
}

const createProduct = async (formData: FormData) => {
}

export {deleteProduct, createProduct};
