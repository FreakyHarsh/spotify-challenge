export type spotifyUserType = {
  display_name: string;
  external_urls: {
    spotify: string;
  };
  followers: { href: any, total: number };
  href: string;
  id: string;
  images: any;
  type: string;
  uri: string;
}