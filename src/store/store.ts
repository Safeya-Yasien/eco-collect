import { configureStore } from "@reduxjs/toolkit";
// import { persistStore, persistReducer } from "redux-persist";
// import storage from "redux-persist/lib/storage";
import auth from "./auth/authSlice";
import orders from "./orders/orderSlice";
import waste from "./waste/wasteSlice";
import collectors from "./collectors/collectorsSlice";
import customers from "./customers/customersSlice";
import analytics from "./analytics/analyticsSlice";

// const rootPersistConfig = {
//   key: "root",
//   storage,
//   whitelist: ["auth"],
// };

// const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: {
    auth,
    orders,
    waste,
    collectors,
    customers,
    analytics,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
