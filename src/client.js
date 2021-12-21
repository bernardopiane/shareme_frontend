// Sanity Clientside
import sanityClient from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

export const client = sanityClient({
  projectId: "",
  dataset: "",
  apiVersion: "2021-12",
  useCdn: true,
  token: "",
});

const builder = imageUrlBuilder(client);

export const urlFor = (source) => {
  return builder.image(source);
};
