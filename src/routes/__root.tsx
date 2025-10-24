import { Outlet, createRootRouteWithContext } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

import { LayoutAddition as TanStackQueryLayout } from "@/components/query-provider";

import type { QueryClient } from "@tanstack/react-query";
import { GlobalMenu } from "@/components/global-menu";

interface MyRouterContext {
  queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  component: () => (
    <div className="h-[100svh] w-screen relative">
      <Outlet />
      <div className="absolute w-fit bottom-5 right-5 z-50">
        <GlobalMenu />
      </div>
      <TanStackRouterDevtools />
      <TanStackQueryLayout />
    </div>
  ),
});
