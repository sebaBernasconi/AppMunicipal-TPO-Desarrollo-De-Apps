import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


//TODO remplazar urls
export const authApi = createApi({
    reducerPath: "authApi",
    baseQuery: fetchBaseQuery({ baseUrl: "url"}),
    endpoints: (builder) => ({
        signUp: builder.mutation({
            query: ({...auth}) => ({
                url: "url",
                method: 'POST',
                body: auth,
            })
        }),
        login: builder.mutation({
            query: ({...auth}) => ({
                url: "url",
                method: 'POST',
                body: auth,
            })
        }),
    })
})

export const { useLoginMutation, useSignUpMutation } = authApi;