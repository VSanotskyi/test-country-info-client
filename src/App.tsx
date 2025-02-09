import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
// import {ReactQueryDevtools} from "@tanstack/react-query-devtools";

import Countries from "./components/Countries/Countries.tsx";

const queryClient = new QueryClient()

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <Countries/>
            {/*<ReactQueryDevtools initialIsOpen={false}/>*/}
        </QueryClientProvider>
    )
}

export default App
