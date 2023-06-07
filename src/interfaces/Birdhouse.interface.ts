interface BirdhouseColor {
  id: number;
  color: string;
}

interface BirdhouseStyle {
  id: number;
  style: string;
}

interface BirdhousePicture {
  id: number;
  picture: string;
}

export interface BirdhouseInterface {
  birdhouseId: string;
  name: string;
  price: number;
  size: string;
  stock: number;
  description: string | undefined;
  pictures: BirdhousePicture[];
  colors: BirdhouseColor[];
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