export interface Products {
    brand?: string;
    category?: string;
    productQuantity?: number;
    description?: string;
    image?: string;
    name?: string;
    price?: number;
    discount?: number;
    _id?:any
  }
  
  export interface Iproduct {
    brand: string;
    category: string;
    productQuantity: number;
    description: string;
    image: string;
    name: string;
    price: number;
    discount?: number;
    numReviews?:number
    _id?:string
  
  }