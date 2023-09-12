export type Page = {
  index?: boolean;
  title: string;
  isTabGroup?: boolean;
  path: string;
  children?: Page[];
};
