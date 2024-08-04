/* tslint:disable */
/* eslint-disable */
/**
 * This file was automatically generated by Payload.
 * DO NOT MODIFY IT BY HAND. Instead, modify your source Payload config,
 * and re-run `payload generate:types` to regenerate this file.
 */

export interface Config {
  collections: {
    jobs: Job;
    organizations: Organization;
    candidates: Candidate;
    applications: Application;
    cvs: Cv;
    agreements: Agreement;
    logos: Logo;
    'image-covers': ImageCover;
    photos: Photo;
    users: User;
    'payload-preferences': PayloadPreference;
    'payload-migrations': PayloadMigration;
  };
  globals: {
    data: Data;
  };
  locale: 'cs' | 'sk';
  user: User & {
    collection: 'users';
  };
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "jobs".
 */
export interface Job {
  id: string;
  archived?: boolean | null;
  status: string;
  title: string;
  categories: ('category-1' | 'category-2' | 'category-3')[];
  organization: string | Organization;
  employmentType: (
    | 'fulltime'
    | 'parttime'
    | 'contract'
    | 'temporary'
    | 'internship'
    | 'freelance'
    | 'apprenticeship'
    | 'volunteer'
    | 'seasonal'
  )[];
  location?: string | null;
  locationType?: ('onsite' | 'remote' | 'hybrid')[] | null;
  education?:
    | (
        | 'noEducation'
        | 'highSchool'
        | 'associateDegree'
        | 'bachelorsDegree'
        | 'mastersDegree'
        | 'doctoralDegree'
        | 'professionalDegree'
      )[]
    | null;
  experience?:
    | (
        | 'noExperience'
        | 'lessThanOneYear'
        | 'oneTwoYears'
        | 'twoThreeYears'
        | 'threeFiveYears'
        | 'fiveTenYears'
        | 'tenPlusYears'
      )[]
    | null;
  language?:
    | (
        | 'sq'
        | 'bg'
        | 'ca'
        | 'hr'
        | 'cs'
        | 'da'
        | 'nl'
        | 'en'
        | 'fi'
        | 'fr'
        | 'de'
        | 'el'
        | 'hu'
        | 'it'
        | 'no'
        | 'pl'
        | 'pt'
        | 'ro'
        | 'ru'
        | 'sr'
        | 'sk'
        | 'es'
        | 'sv'
        | 'tr'
        | 'uk'
      )[]
    | null;
  salary?: {
    enabled?: boolean | null;
    range?: boolean | null;
    base?: number | null;
    minSalary?: number | null;
    maxSalary?: number | null;
    currency?: ('czk' | 'eur') | null;
    salaryType?: ('hourly' | 'daily' | 'weekly' | 'biweekly' | 'monthly' | 'annually') | null;
  };
  description: string;
  richText?: {
    root: {
      type: string;
      children: {
        type: string;
        version: number;
        [k: string]: unknown;
      }[];
      direction: ('ltr' | 'rtl') | null;
      format: 'left' | 'start' | 'center' | 'right' | 'end' | 'justify' | '';
      indent: number;
      version: number;
    };
    [k: string]: unknown;
  } | null;
  skills?: string[] | null;
  certifications?: string[] | null;
  responsibilities?: string[] | null;
  benefits?: string[] | null;
  suitableFor?: {
    students?: boolean | null;
    disabledPeople?: boolean | null;
    mothersOnMaternityLeave?: boolean | null;
    retirees?: boolean | null;
  };
  applications?: (string | Application)[] | null;
  featured?: boolean | null;
  hasEndDate?: boolean | null;
  endDate?: string | null;
  slug?: string | null;
  customApplyUrl?: string | null;
  createdBy?: (string | null) | User;
  publicId?: number | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "organizations".
 */
export interface Organization {
  id: string;
  archived?: boolean | null;
  title: string;
  slug?: string | null;
  featured?: boolean | null;
  email: string;
  phone?: string | null;
  location?: string | null;
  vatId?: string | null;
  categories?: ('category-1' | 'category-2' | 'category-3')[] | null;
  logo?: string | Logo | null;
  imageCover?: string | ImageCover | null;
  description?: string | null;
  richText?: {
    root: {
      type: string;
      children: {
        type: string;
        version: number;
        [k: string]: unknown;
      }[];
      direction: ('ltr' | 'rtl') | null;
      format: 'left' | 'start' | 'center' | 'right' | 'end' | 'justify' | '';
      indent: number;
      version: number;
    };
    [k: string]: unknown;
  } | null;
  url?: string | null;
  jobsPublished?: (string | Job)[] | null;
  jobsUnpublished?: (string | Job)[] | null;
  createdBy?: (string | null) | User;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "logos".
 */
export interface Logo {
  id: string;
  createdBy?: (string | null) | User;
  prefix?: string | null;
  updatedAt: string;
  createdAt: string;
  url?: string | null;
  thumbnailURL?: string | null;
  filename?: string | null;
  mimeType?: string | null;
  filesize?: number | null;
  width?: number | null;
  height?: number | null;
  focalX?: number | null;
  focalY?: number | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "users".
 */
export interface User {
  id: string;
  role: 'super-admin' | 'admin' | 'organization' | 'candidate';
  title?: string | null;
  firstName?: string | null;
  lastName?: string | null;
  profile?:
    | ({
        relationTo: 'organizations';
        value: string | Organization;
      } | null)
    | ({
        relationTo: 'candidates';
        value: string | Candidate;
      } | null);
  updatedAt: string;
  createdAt: string;
  email: string;
  resetPasswordToken?: string | null;
  resetPasswordExpiration?: string | null;
  salt?: string | null;
  hash?: string | null;
  loginAttempts?: number | null;
  lockUntil?: string | null;
  password?: string | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "candidates".
 */
export interface Candidate {
  id: string;
  archived?: boolean | null;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string | null;
  location?: string | null;
  photo?: string | Photo | null;
  bio?: string | null;
  applications?: (string | Application)[] | null;
  jobsSaved?: (string | Job)[] | null;
  createdBy?: (string | null) | User;
  fullName?: string | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "photos".
 */
export interface Photo {
  id: string;
  createdBy?: (string | null) | User;
  prefix?: string | null;
  updatedAt: string;
  createdAt: string;
  url?: string | null;
  thumbnailURL?: string | null;
  filename?: string | null;
  mimeType?: string | null;
  filesize?: number | null;
  width?: number | null;
  height?: number | null;
  focalX?: number | null;
  focalY?: number | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "applications".
 */
export interface Application {
  id: string;
  archived?: boolean | null;
  job: string | Job;
  candidate?: (string | null) | Candidate;
  firstName?: string | null;
  lastName?: string | null;
  email?: string | null;
  phone?: string | null;
  location?: string | null;
  coverLetter?: string | null;
  cv: string | Cv;
  agreements?: (string | Agreement)[] | null;
  status: 'pending' | 'accepted' | 'rejected';
  fullName?: string | null;
  trackingId?: number | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "cvs".
 */
export interface Cv {
  id: string;
  job?: (string | null) | Job;
  organization?: (string | null) | Organization;
  createdBy?: (string | null) | User;
  prefix?: string | null;
  updatedAt: string;
  createdAt: string;
  url?: string | null;
  thumbnailURL?: string | null;
  filename?: string | null;
  mimeType?: string | null;
  filesize?: number | null;
  width?: number | null;
  height?: number | null;
  focalX?: number | null;
  focalY?: number | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "agreements".
 */
export interface Agreement {
  id: string;
  archived?: boolean | null;
  title: string;
  richText: {
    root: {
      type: string;
      children: {
        type: string;
        version: number;
        [k: string]: unknown;
      }[];
      direction: ('ltr' | 'rtl') | null;
      format: 'left' | 'start' | 'center' | 'right' | 'end' | 'justify' | '';
      indent: number;
      version: number;
    };
    [k: string]: unknown;
  };
  slug?: string | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "image-covers".
 */
export interface ImageCover {
  id: string;
  createdBy?: (string | null) | User;
  prefix?: string | null;
  updatedAt: string;
  createdAt: string;
  url?: string | null;
  thumbnailURL?: string | null;
  filename?: string | null;
  mimeType?: string | null;
  filesize?: number | null;
  width?: number | null;
  height?: number | null;
  focalX?: number | null;
  focalY?: number | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-preferences".
 */
export interface PayloadPreference {
  id: string;
  user: {
    relationTo: 'users';
    value: string | User;
  };
  key?: string | null;
  value?:
    | {
        [k: string]: unknown;
      }
    | unknown[]
    | string
    | number
    | boolean
    | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-migrations".
 */
export interface PayloadMigration {
  id: string;
  name?: string | null;
  batch?: number | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "data".
 */
export interface Data {
  id: string;
  lastPublicJobId?: number | null;
  lastApplicationTrackingId?: number | null;
  updatedAt?: string | null;
  createdAt?: string | null;
}


declare module 'payload' {
  export interface GeneratedTypes extends Config {}
}