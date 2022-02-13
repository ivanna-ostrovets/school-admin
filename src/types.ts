export interface Section {
  title: string;
  text: string;
}

export interface BusinessCard {
  title: string;
  subtitle: string;
  sections: Section[];
}

export interface UnsavedPartner {
  name: string;
  url: string;
}

export interface Partner extends UnsavedPartner {
  id: string;
}

export type Partners = { [key: string]: Partner };

export interface Talent {
  title: string;
  text: string;
}

export type TalentTitles = { id: string; title: string }[];
