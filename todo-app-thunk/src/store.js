import {configureStore} from '@reduxjs/toolkit'

import todoReducer from './slice/todoSlice.js'

const store = configureStore({
    reducer: {
        todos: todoReducer
    }
})

export default store