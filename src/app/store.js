import { configureStore } from '@reduxjs/toolkit';
import itemsListReducer from '../features/ItemsListSlice';

export default configureStore({
    reducer: {
        itemsList: itemsListReducer
    }
})