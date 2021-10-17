export const formatDate = (x: any) => {
  const date = new Date(x);
  var d = date.getDate();
  var m = date.getMonth() + 1; //Month from 0 to 11
  var y = date.getFullYear();
  var h = date.getHours();
  var mn = date.getMinutes();
  return `${d <= 9 ? '0' + d : d}-${m <= 9 ? '0' + m : m}-${y} ${
    h <= 9 ? '0' + h : h
  }:${mn <= 9 ? '0' + mn : mn}`;
};
