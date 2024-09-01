export const blurhash =
  "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj["

// Utility function to check if a value is empty
export const isEmpty = (value) =>
  value == null ||
  (typeof value === "string" && value.trim() === "") ||
  (typeof value === "object" && Object.keys(value).length === 0)
