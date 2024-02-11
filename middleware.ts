import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  publicRoutes: [
    "/",
    "/api/webhooks",
    "/tags",
    "/profile",
    "/profile/:id",
    "/question/:id",
    "tags/:id",
    "/community",
    "/jobs",
    "/collection",
  ],
  ignoredRoutes: ["/api/webhooks"],
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
