export interface UnsavedPartner {
  name: string;
  url: string;
}

export interface Partner extends UnsavedPartner {
  id: string;
}
