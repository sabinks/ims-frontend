export function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export function camalize(str: string) {
  return str
    .toLowerCase()
    .replace(/[^a-zA-Z0-9]+(.)/g, (m, chr) => chr.toUpperCase());
}

export const booleanCheck = (check: any) => Boolean(parseInt(check));
