import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  publicRoutes: [
    "/",
    "/api/webhooks(.*)",
    "/tags",
    "/profile/:id",
    "/question/:id",
    "tags/:id",
    "/community",
    "/jobs",
  ],
  ignoredRoutes: ["/api/webhooks(.*)"],
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
