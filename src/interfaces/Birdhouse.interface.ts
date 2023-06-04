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
  picture: Blob | undefined;
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