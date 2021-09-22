import { configureStore, createSlice } from "@reduxjs/toolkit";

const initialToken = localStorage.getItem("token")
const initialLocalId = localStorage.getItem("localId")


const authSlice = createSlice({
    name: "auth",
    initialState: { token: initialToken, localId: initialLocalId },
    reducers: {
        login(state, action) {
            state.token = action.payload
            localStorage.setItem("token", action.payload)

        },
        logout(state) {
            localStorage.removeItem("token")
            localStorage.removeItem("localId")
            state.token = null
            state.localId = null
        },
        localIdIn(state, action) {
            state.localId = action.payload
            localStorage.setItem("localId", action.payload)
        }

    }
})

export const authActions = authSlice.actions

const store = configureStore({
    reducer: {
        auth: authSlice.reducer
    }
})



export default store