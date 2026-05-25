export type PublicPageLink = {
  readonly href: string;
  readonly label: string;
};

export type PublicPageSection = {
  readonly heading: string;
  readonly paragraphs: readonly string[];
};

export type PublicPageContent = {
  readonly title: string;
  readonly intro: string;
  readonly sections: readonly PublicPageSection[];
};
