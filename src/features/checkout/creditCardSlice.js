const { createSlice } = require('@reduxjs/toolkit');

const initialState = {
	card_name: '',
	card_number: '',
	card_exp: '',
	card_code: '',
};

const creditCardSlice = createSlice({
	name: 'credit_card',
	initialState,
	reducers: {
		onCardChange: (state, action) => {
			return {
				...state,
				...action.payload,
			};
		},
	},
});

export const { onCardChange } = creditCardSlice.actions;

export default creditCardSlice.reducer;
