module.exports = {
	getToday() {
		const todayObject = new Date();
		const dd = String(todayObject.getDate()).padStart(2, '0');
		const mm = String(todayObject.getMonth() + 1).padStart(2, '0');
		const yyyy = todayObject.getFullYear();
		return `${yyyy}-${mm}-${dd}`;
	}
};
