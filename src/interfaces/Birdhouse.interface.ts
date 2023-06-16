class CreateBirdhouseStyle {
  name: string;
}

interface IBirdhouseStyle {
  id?: number;
  style: string;
}

interface IBirdhousePicture {
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
  description: string;
  pictures: IBirdhousePicture[];
  styles: IBirdhouseStyle[];
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

export interface IUpdateBirdhouse {
  birdhouseId: string;
  name: string;
  price: string;
  size: string;
  stock: string;
  description: string;
  pictures: string[];
  styles: string[];
}
