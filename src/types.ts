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

export interface BaseTalent {
  id: string | undefined;
  title: string;
  text: string;
}

export interface UnsavedTalent extends BaseTalent {
  id: undefined;
}

export interface Talent extends BaseTalent {
  id: string;
}

export type TalentTitles = { id: string; title: string }[];
