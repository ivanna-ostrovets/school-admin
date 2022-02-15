export interface SiteInfo {
  shortName: string;
  fullName: string;
  facebookLink: string;
  youtubeLink: string;
  phoneNumbers: string[];
  emails: string[];
}

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

export interface UnsavedTalent {
  title: string;
  text: string;
}

export interface Talent extends UnsavedTalent {
  id: string;
}

export type TalentTitles = { id: string; title: string }[];

export interface UnsavedGraduates {
  title: string;
  text: string;
}

export interface Graduates extends UnsavedGraduates {
  id: string;
}

export type GraduateTitles = { id: string; title: string }[];

export interface UnsavedSchedule {
  title: string;
  text: string;
}

export interface Schedule extends UnsavedSchedule {
  id: string;
}

export type ScheduleTitles = { id: string; title: string }[];
