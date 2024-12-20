export interface Profile {
  id?: string;
  userId?: string;
  name: string;
  email: string;
  phone: string;
  title: string;
  company: string;
  bio: string;
  avatar?: string;
  links: ProfileLink[];
  theme: {
    id: string;
    colors: {
      background: string;
      text: string;
      accent: string;
    };
    font: string;
  };
  social: {
    linkedin?: string;
    twitter?: string;
    instagram?: string;
    facebook?: string;
    youtube?: string;
  };
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ProfileLink {
  id: string;
  title: string;
  url: string;
  icon?: string;
  order: number;
}

export interface Theme {
  id: string;
  name: string;
  preview: string;
  colors: {
    background: string;
    text: string;
    accent: string;
  };
  font: string;
}