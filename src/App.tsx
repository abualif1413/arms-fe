import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "react-router";
import { routes } from "./utils/route-definitions";
import { PageSpinnerProvider } from "./components/page-spinner";

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <PageSpinnerProvider>
        <RouterProvider router={routes} />
      </PageSpinnerProvider>
    </QueryClientProvider>
  );
}

export default App;
