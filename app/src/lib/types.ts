export type Device = {
  location: null | Location;
  id: string;
  name: string;
  slug: string;
  location_id?: string | null;
};

export type Location = {
  id: string;
  name: string;
};
