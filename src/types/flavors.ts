export interface FlavorItem {
  name: string;
  description: string;
  howToIdentify: string;
}

export interface FlavorCategory {
  color: string;
  items: (FlavorItem | string)[];
  gradient: string[];
  howToIdentify?: string;
}