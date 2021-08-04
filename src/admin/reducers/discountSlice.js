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
		resetDiscount: (state) => {
			state.selectedProducts = [];
		},
	},
});

export const { selectedProductsChange, resetDiscount } = discountSlice.actions;

export default discountSlice.reducer;
