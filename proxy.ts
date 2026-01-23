import { neonAuthMiddleware } from "@neondatabase/auth/next/server";

export default neonAuthMiddleware({
    // Redirects unauthenticated users to sign-in page
    loginUrl: "/sign-in"
});

export const config = {
    matcher: [
        // Protected routes requiring authentication
        "/account/:path*"
    ]
};