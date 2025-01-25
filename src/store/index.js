import { configureStore } from '@reduxjs/toolkit';

import noteSlice from './noteSlice.js';

const store = configureStore({
    reducer: {
        notes: noteSlice.reducer
    }
});

export default store;