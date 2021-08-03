const { createSlice } = require('@reduxjs/toolkit');

const initialState = {
	selectedProducts: [],
};

const discountSlice = createSlice({
	name: 'discount',
	initialState,
	reducers: {
		selectedProductsChange: (state, action) => {
			state.selectedProducts = action.payload;
		},
	},
});

export const { selectedProductsChange } = discountSlice.actions;

export default discountSlice.reducer;
