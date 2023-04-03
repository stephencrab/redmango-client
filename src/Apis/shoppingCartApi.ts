import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const shoppingCartApi = createApi({
    reducerPath: "shoppingCartApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "https://redmangoapi20230227.azurewebsites.net/api/",
        prepareHeaders: (headers: Headers, api) => {
            const token = localStorage.getItem("token");
            token && headers.append("Authorization", "Bearer " + token);
          },
    }),
    tagTypes: ["ShoppingCarts"],
    endpoints: (builder) => ({        
        getShoppingCartById: builder.query({
            query: (userId) => ({
                url: "ShoppingCart",
                method: "GET",
                params: {
                    userId
                },
            }),
            providesTags: ["ShoppingCarts"],
        }),
        updateShoppingCart: builder.mutation({
            query: ({userId, menuItemId, updateQuantity}) => ({
                url: "ShoppingCart",
                method: "POST",
                params: {
                    userId,
                    menuItemId,
                    updateQuantity,
                },
            }),
            invalidatesTags: ["ShoppingCarts"],
        }),
    }),
});

export const { useGetShoppingCartByIdQuery, useUpdateShoppingCartMutation } = shoppingCartApi