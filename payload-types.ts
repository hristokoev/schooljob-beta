/* tslint:disable */
/* eslint-disable */
/**
 * This file was automatically generated by Payload.
 * DO NOT MODIFY IT BY HAND. Instead, modify your source Payload config,
 * and re-run `payload generate:types` to regenerate this file.
 */

export interface Config {
  auth: {
    users: UserAuthOperations;
  };
  collections: {
    jobs: Job;
    applications: Application;
    organizations: Organization;
    candidates: Candidate;
    cvs: Cv;
    banners: Banner;
    logos: Logo;
    'image-covers': ImageCover;
    photos: Photo;
    ads: Ad;
    documents: Document;
    'email-templates': EmailTemplate;
    memberships: Membership;
    orders: Order;
    partners: Partner;
    users: User;
    search: Search;
    'payload-preferences': PayloadPreference;
    'payload-migrations': PayloadMigration;
  };
  db: {
    defaultIDType: string;
  };
  globals: {
    data: Data;
  };
  locale: null;
  user: User & {
    collection: 'users';
  };
}
export interface UserAuthOperations {
  forgotPassword: {
    email: string;
    password: string;
  };
  login: {
    email: string;
    password: string;
  };
  registerFirstUser: {
    email: string;
    password: string;
  };
  unlock: {
    email: string;
    password: string;
  };
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "jobs".
 */
export interface Job {
  id: string;
  archived?: boolean | null;
  status: 'published' | 'unpublished' | 'expired';
  title: string;
  categories: ('preschool' | 'primary' | 'secondary' | 'tertiary' | 'leisure' | 'sport' | 'other')[];
  organization: string | Organization;
  email: string;
  employmentType: ('fulltime' | 'parttime' | 'agreement' | 'internship' | 'contract' | 'volunteer')[];
  location?:
    | (
        | 'praha'
        | 'jihocesky-kraj'
        | 'jihomoravsky-kraj'
        | 'karlovarsky-kraj'
        | 'kralovehradecky-kraj'
        | 'liberecky-kraj'
        | 'moravskoslezsky-kraj'
        | 'olomoucky-kraj'
        | 'pardubicky-kraj'
        | 'plzensky-kraj'
        | 'stredocesky-kraj'
        | 'ustecky-kraj'
        | 'vysocina'
        | 'zlinsky-kraj'
      )[]
    | null;
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
  benefits?: string[] | null;
  suitableFor?: {
    students?: boolean | null;
    disabledPeople?: boolean | null;
    mothersOnMaternityLeave?: boolean | null;
    retirees?: boolean | null;
  };
  applications?: (string | Application)[] | null;
  featured?: boolean | null;
  slug?: string | null;
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
  location?:
    | (
        | 'praha'
        | 'jihocesky-kraj'
        | 'jihomoravsky-kraj'
        | 'karlovarsky-kraj'
        | 'kralovehradecky-kraj'
        | 'liberecky-kraj'
        | 'moravskoslezsky-kraj'
        | 'olomoucky-kraj'
        | 'pardubicky-kraj'
        | 'plzensky-kraj'
        | 'stredocesky-kraj'
        | 'ustecky-kraj'
        | 'vysocina'
        | 'zlinsky-kraj'
      )[]
    | null;
  vatId: string;
  categories?: ('preschool' | 'primary' | 'secondary' | 'tertiary' | 'leisure' | 'sport' | 'other')[] | null;
  logo?: (string | null) | Logo;
  imageCover?: (string | null) | ImageCover;
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
  jobsAllowed: number;
  memberships?:
    | {
        membership: string | Membership;
        price: number;
        id?: string | null;
      }[]
    | null;
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
  vatId?: string | null;
  processingOfPersonalData: boolean;
  terms?: boolean | null;
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
  photo?: (string | null) | Photo;
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
  email: string;
  phone?: string | null;
  location?: string | null;
  coverLetter?: string | null;
  cv: string | Cv;
  processingOfPersonalData: boolean;
  status: 'pending' | 'accepted' | 'rejected' | 'interview';
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
 * via the `definition` "memberships".
 */
export interface Membership {
  id: string;
  title: string;
  featured?: boolean | null;
  description: string;
  features: string[];
  price: number;
  currency: 'czk' | 'eur';
  discount?:
    | {
        count: number;
        discount: number;
        text: string;
        id?: string | null;
      }[]
    | null;
  slug?: string | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "banners".
 */
export interface Banner {
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
 * via the `definition` "ads".
 */
export interface Ad {
  id: string;
  enabled?: boolean | null;
  title: string;
  bannerDesktop: string | Banner;
  bannerMobile: string | Banner;
  page: 'home' | 'jobs' | 'organizations';
  position:
    | 'afterHeader'
    | 'afterFeaturedJobs'
    | 'beforeOrganizations'
    | 'afterOrganizations'
    | 'beforeFooter'
    | 'afterFeaturedOrganizations';
  width: 'full' | 'normal';
  height: '36' | '48' | '64' | '72' | '96';
  paddingTop: 'none' | 'sm' | 'md' | 'lg';
  paddingBottom: 'none' | 'sm' | 'md' | 'lg';
  background: 'white' | 'slate-100';
  url: string;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "documents".
 */
export interface Document {
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
 * via the `definition` "email-templates".
 */
export interface EmailTemplate {
  id: string;
  title: string;
  from: 'no-reply';
  to: 'admin' | 'candidate' | 'organization';
  preview: string;
  blocks: (TextBlock | ButtonBlock)[];
  footer: string;
  event?:
    | (
        | 'new-candidate'
        | 'new-organization'
        | 'reset-password'
        | 'new-job'
        | 'job-status-changed'
        | 'new-application'
        | 'application-status-pending'
        | 'application-status-accepted'
        | 'application-status-rejected'
        | 'application-status-interview'
      )
    | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "TextBlock".
 */
export interface TextBlock {
  text: {
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
  id?: string | null;
  blockName?: string | null;
  blockType: 'Text';
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "ButtonBlock".
 */
export interface ButtonBlock {
  text: string;
  link: string;
  id?: string | null;
  blockName?: string | null;
  blockType: 'Button';
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "orders".
 */
export interface Order {
  id: string;
  organization: string | Organization;
  membership: string | Membership;
  quantity: number;
  expiresAt: string;
  price: number;
  currency: 'czk' | 'eur';
  createdBy?: (string | null) | User;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "partners".
 */
export interface Partner {
  id: string;
  title: string;
  logo: string | Logo;
  url: string;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "search".
 */
export interface Search {
  id: string;
  title?: string | null;
  priority?: number | null;
  doc:
    | {
        relationTo: 'jobs';
        value: string | Job;
      }
    | {
        relationTo: 'organizations';
        value: string | Organization;
      };
  status?: string | null;
  slug?: string | null;
  publicId?: string | null;
  keywords?: string | null;
  updatedAt: string;
  createdAt: string;
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
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "auth".
 */
export interface Auth {
  [k: string]: unknown;
}


declare module 'payload' {
  export interface GeneratedTypes extends Config {}
}