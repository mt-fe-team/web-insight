export const sidebarOpened = state => state.sidebarOpened

export const jsErrorNum = state => state.jsChartData.nums && state.jsChartData.nums.error || 0
export const jsWarnNum = state => state.jsChartData.nums && state.jsChartData.nums.warn || 0
export const jsDebugNum = state => state.jsChartData.nums && state.jsChartData.nums.debug || 0
export const jsInfoNum = state => state.jsChartData.nums && state.jsChartData.nums.info || 0
export const jsChartData = state => state.jsChartData.chartData || {}

export const apiErrorNum = state => state.apiChartData.nums && state.apiChartData.nums.error || 0
export const apiFailNum = state => state.apiChartData.nums && state.apiChartData.nums.fail || 0
export const apiSuccessNum = state => state.apiChartData.nums && state.apiChartData.nums.success || 0
export const apiChartData = state => state.apiChartData.chartData || {}

export const eventNums = state => state.eventChartData.nums || {}
export const eventChartData = state => state.eventChartData.chartData || {}

export const jsChartLoading = state => state.jsChartLoading
export const apiChartLoading = state => state.apiChartLoading
export const eventChartLoading = state => state.eventChartLoading
