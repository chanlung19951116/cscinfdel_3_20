export interface NavItem {
  displayName: string;
  route?: string;
  children?: NavItem[];
}

export function getAllItems(item: NavItem) {
  if (!item.children || !item.children.length) {
    return [item];
  }
  const items = [];
  item.children.forEach((child) => {
    items.push(...getAllItems(child));
  });

  return items;
}
