import { Hotline, SiteInfo } from '../../types';

export const siteInfoInitialState: SiteInfo = {
  shortName: '',
  fullName: '',
  facebookLink: '',
  youtubeLink: '',
  phoneNumbers: [],
  emails: [],
  hotlines: [],
};

export enum SiteInfoActionType {
  AddAll = 'AddAll',
  AddShortName = 'AddShortName',
  AddFullName = 'AddFullName',
  AddFacebookLink = 'AddFacebookLink',
  AddYouTubeLink = 'AddYouTubeLink',
  AddPhoneNumber = 'AddPhoneNumber',
  UpdatePhoneNumber = 'UpdatePhoneNumber',
  DeletePhoneNumber = 'DeletePhoneNumber',
  AddEmail = 'AddEmail',
  UpdateEmail = 'UpdateEmail',
  DeleteEmail = 'DeleteEmail',
  AddHotline = 'AddHotline',
  UpdateHotline = 'UpdateHotline',
  DeleteHotline = 'DeleteHotline',
}

export interface AddAllAction {
  type: SiteInfoActionType.AddAll;
  payload: SiteInfo;
}

export interface AddShortNameAction {
  type: SiteInfoActionType.AddShortName;
  payload: string;
}

export interface AddFullNameAction {
  type: SiteInfoActionType.AddFullName;
  payload: string;
}

export interface AddFacebookLinkAction {
  type: SiteInfoActionType.AddFacebookLink;
  payload: string;
}

export interface AddYouTubeLinkAction {
  type: SiteInfoActionType.AddYouTubeLink;
  payload: string;
}

export interface AddPhoneNumberAction {
  type: SiteInfoActionType.AddPhoneNumber;
  payload: string;
}

export interface UpdatePhoneNumberAction {
  type: SiteInfoActionType.UpdatePhoneNumber;
  number: string;
  index: number;
}

export interface DeletePhoneNumberAction {
  type: SiteInfoActionType.DeletePhoneNumber;
  index: number;
}

export interface AddEmailAction {
  type: SiteInfoActionType.AddEmail;
  payload: string;
}

export interface UpdateEmailAction {
  type: SiteInfoActionType.UpdateEmail;
  email: string;
  index: number;
}

export interface DeleteEmailAction {
  type: SiteInfoActionType.DeleteEmail;
  index: number;
}

export interface AddHotlineAction {
  type: SiteInfoActionType.AddHotline;
  payload: Hotline;
}

export interface UpdateHotlineAction {
  type: SiteInfoActionType.UpdateHotline;
  hotline: Hotline;
  index: number;
}

export interface DeleteHotlineAction {
  type: SiteInfoActionType.DeleteHotline;
  index: number;
}

type SiteInfoAction =
  | AddAllAction
  | AddShortNameAction
  | AddFullNameAction
  | AddFacebookLinkAction
  | AddYouTubeLinkAction
  | AddPhoneNumberAction
  | UpdatePhoneNumberAction
  | DeletePhoneNumberAction
  | AddEmailAction
  | UpdateEmailAction
  | DeleteEmailAction
  | AddHotlineAction
  | UpdateHotlineAction
  | DeleteHotlineAction;

export function siteInfoReducer(state: SiteInfo, action: SiteInfoAction) {
  switch (action.type) {
    case SiteInfoActionType.AddAll:
      return action.payload;
    case SiteInfoActionType.AddShortName:
      return {
        ...state,
        shortName: action.payload,
      };
    case SiteInfoActionType.AddFullName:
      return {
        ...state,
        fullName: action.payload,
      };
    case SiteInfoActionType.AddFacebookLink:
      return {
        ...state,
        facebookLink: action.payload,
      };
    case SiteInfoActionType.AddYouTubeLink:
      return {
        ...state,
        youtubeLink: action.payload,
      };
    case SiteInfoActionType.AddPhoneNumber:
      return {
        ...state,
        phoneNumbers: [...state.phoneNumbers, action.payload],
      };
    case SiteInfoActionType.UpdatePhoneNumber:
      return {
        ...state,
        phoneNumbers: [
          ...state.phoneNumbers.slice(0, action.index),
          action.number,
          ...state.phoneNumbers.slice(action.index + 1),
        ],
      };
    case SiteInfoActionType.DeletePhoneNumber:
      return {
        ...state,
        phoneNumbers: [
          ...state.phoneNumbers.slice(0, action.index),
          ...state.phoneNumbers.slice(action.index + 1),
        ],
      };
    case SiteInfoActionType.AddEmail:
      return {
        ...state,
        emails: [...state.emails, action.payload],
      };
    case SiteInfoActionType.UpdateEmail:
      return {
        ...state,
        emails: [
          ...state.emails.slice(0, action.index),
          action.email,
          ...state.emails.slice(action.index + 1),
        ],
      };
    case SiteInfoActionType.DeleteEmail:
      return {
        ...state,
        emails: [
          ...state.emails.slice(0, action.index),
          ...state.emails.slice(action.index + 1),
        ],
      };
    case SiteInfoActionType.AddHotline:
      return {
        ...state,
        hotlines: [...state.hotlines, action.payload],
      };
    case SiteInfoActionType.UpdateHotline:
      return {
        ...state,
        hotlines: [
          ...state.hotlines.slice(0, action.index),
          action.hotline,
          ...state.hotlines.slice(action.index + 1),
        ],
      };
    case SiteInfoActionType.DeleteHotline:
      return {
        ...state,
        hotlines: [
          ...state.hotlines.slice(0, action.index),
          ...state.hotlines.slice(action.index + 1),
        ],
      };
    default:
      return state;
  }
}
