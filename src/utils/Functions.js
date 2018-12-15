export function prettify(str) {
  return str
    .split("_")
    .map(part => {
      return part.charAt(0).toUpperCase() + part.slice(1);
    })
    .join(" ");
}
