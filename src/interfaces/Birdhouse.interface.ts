class CreateBirdhouseStyle {
  name: string;
}

interface BirdhouseStyle {
  id: number;
  style: string;
}

interface BirdhousePicture {
  id: number;
  picture: string;
}

export interface IBirdhouseFormPicture {
  fileContent: string;
  type: string
}

export interface BirdhouseInterface {
  birdhouseId: string;
  name: string;
  price: number;
  size: number;
  stock: number;
  description: string | undefined;
  pictures: BirdhousePicture[];
  styles: BirdhouseStyle[];
}

export interface BirdhouseCartItemInterface {
  birdhouseId: string;
  name: string;
  price: number;
  quantity: number;
  picture: string;
  stock: number;
}

export interface ICreateBirdhouse {
  name: string;
  price: string;
  size: string;
  stock: string;
  description: string | undefined;
  pictures: FileList;
  styles: CreateBirdhouseStyle[];
}
