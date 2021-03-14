module.exports = {
  getToday: function () {
    const todayObj = new Date();
    const dd = String(todayObj.getDate()).padStart(2, '0');
    const mm = String(todayObj.getMonth() + 1).padStart(2, '0');
    const yyyy = todayObj.getFullYear();
    return `${yyyy}-${mm}-${dd}`;
  },
};
