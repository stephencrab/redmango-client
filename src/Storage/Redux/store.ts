import { configureStore } from "@reduxjs/toolkit";
import { menuItemApi, shoppingCartApi } from "../../Apis/index";
import { menuItemReducer } from "./menuItemSlice";
import { shoppingCartReducer } from "./shoppingCartSlice";

const store = configureStore({
    reducer: {
        menuItemSore: menuItemReducer,
        shoppingCartStore: shoppingCartReducer,
        [menuItemApi.reducerPath]: menuItemApi.reducer,
        [shoppingCartApi.reducerPath]: shoppingCartApi.reducer,
    },
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware()
            .concat(menuItemApi.middleware)
            .concat(shoppingCartApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export default store;