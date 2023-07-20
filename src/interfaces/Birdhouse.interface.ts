class CreateBirdhouseStyle {
  name: string;
}

export enum BirdhouseStatusEnum {
  active = "active",
  inactive = "inactive"
}

interface IBirdhouseStyle {
  id?: number;
  style: string;
}

interface ICreateBirdhouseSocialMedia {
  link: string;
}

interface IBirdhousePicture {
  id: number;
  picture: string;
}

export interface ISocialMedia {
  link: string;
  name: string;
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
  status: BirdhouseStatusEnum;
  description: string;
  pictures: IBirdhousePicture[];
  styles: IBirdhouseStyle[];
  socialMedia: ISocialMedia[];
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
  pictures: Blob[];
  styles: CreateBirdhouseStyle[];
  socialMedia: ICreateBirdhouseSocialMedia[];
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
  status: BirdhouseStatusEnum;
  socialMedia: string[];
}
