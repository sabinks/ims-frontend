export type Inventory = {
  [x: string]: any;
  id?: number;
  entryId: string;
  title: string;
  author: string;
  genre: string;
  publicationDate: string;
  isbn: string;
};
export type Inventory422Error = {
  property: string;
  message: string;
};
