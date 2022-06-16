import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

export const quotesApi = createApi({
    reducerPath: 'quotesApi',
    baseQuery: fetchBaseQuery({baseUrl:`https://quotes.rest`}),
    endpoints: (build) => ({
        getQuotes: build.query({
            query: () => 'qod?category=inspire'
        })
    })
});

export const {useGetQuotesQuery} = quotesApi; 