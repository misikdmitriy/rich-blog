export const mockReturnValueOnce = <
    TFunc extends (...args: any[]) => any
>(func: TFunc, returnValue: any) => {
	const mocked = func as jest.MockedFunction<TFunc>;
	mocked.mockReturnValueOnce(returnValue);
};

export const mockImplementationOnce = <
	TFunc extends (...args: any[]) => any
>(func: TFunc, mock: (...args: any[]) => any) => {
	const mocked = func as jest.MockedFunction<TFunc>;
	mocked.mockImplementationOnce(mock);
};
