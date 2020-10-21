export interface UnsavedPartner {
  name: string;
  url: string;
}

export interface PartnerType extends UnsavedPartner {
  id: string;
}
