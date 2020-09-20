export interface Choice {
  title: string;
  value: string;
}

export interface FieldMultichoice {
  key: string;
  type: string;
  title: string;
  value: string;
  choices: Choice[];
  helpText: string;
}

export interface Choices {
  fieldMultichoice: FieldMultichoice;
}

export interface Product {
  code?: unknown;
  guid: string;
  image: string;
  price: number;
  title: string;
  choices: Choices;
  quantity: number;
  description: string;
  product_type: string;
  discount_price?: number;
  field_multichoice: string[];
}

export interface CartDto {
  products: Product[];
}
