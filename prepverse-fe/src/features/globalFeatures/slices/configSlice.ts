import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ConfigState {
    currentItem: string;
    currentMetric: string;
}

// Define the initial state with types
const initialState: ConfigState = {
    currentItem: "dashboard",
    currentMetric: "",
};

const configSlice = createSlice({
    name: "config",
    initialState,
    reducers: {
        setCurrentItem: (state, action: PayloadAction<string>) => {
            state.currentItem = action.payload;
        },
        setCurrentMetric: (state, action: PayloadAction<string>) => {
            state.currentMetric = action.payload;
        }
    },
});

// Export actions and reducer
export const {
    setCurrentItem,
    setCurrentMetric,
} = configSlice.actions;

export default configSlice.reducer;
