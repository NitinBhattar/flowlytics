import { authServer } from "@/lib/auth/server";
import { redirect } from "next/navigation";

export const getUser = async () => {
    const { data }  = await authServer.getSession();

    // If user is not logged-in
    if (!data?.user) {
        redirect("/auth/sign-in");
    }

    return data?.user;
};
