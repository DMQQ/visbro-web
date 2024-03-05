export type NinoxResponse<Data extends {}> = {
  id: number;
  createdAt: string;
  createdBy: string;
  modifiedAt: string;
  modifiedBy: string;
  fields: Data;
};

export type TJobOffer = {
  name: string;
  content: string;
  benefits: string;
  offerId: string;
  image: string;
  lang: string;
  requirements: string;
  responsibilities: string;
};

export type JobOfferNinox = NinoxResponse<TJobOffer>;
