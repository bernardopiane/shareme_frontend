// Categories[{name: '', image: ''}]
export const categories = [
  {
    name: "cars",
    image: "https://i.imgur.com/qkdpN.png",
  },
  {
    name: "fitness",
    image: "https://i.imgur.com/qkdpN.png",
  },
  {
    name: "food",
    image: "https://i.imgur.com/qkdpN.png",
  },
  {
    name: "games",
    image: "https://i.imgur.com/qkdpN.png",
  },
  {
    name: "health",
    image: "https://i.imgur.com/qkdpN.png",
  },
  {
    name: "music",
    image: "https://i.imgur.com/qkdpN.png",
  },
  {
    name: "sports",
    image: "https://i.imgur.com/qkdpN.png",
  },
  {
    name: "travel",
    image: "https://i.imgur.com/qkdpN.png",
  },
  {
    name: "others",
    image: "https://i.imgur.com/qkdpN.png",
  },
];

export const userQuery = (userId) => {
  const query = `*[_type == "user" && _id == "${userId}"]`;

  return query;
};

export const searchQuery = (searchTerm) => {
  const query = `*[_type == "pin" && title match "${searchTerm}*" || category match "${searchTerm}*"] || about match "${searchTerm}*"{
    image{
      asset -> {
        url
      },
    },
    _id,
    destination,
    postedBy -> {
      _id,
      username,
      image
    },
    save[] {
      _key,
      postedBy -> {
        _id,
        username,
        image
      },
    },
  }`;

  return query;
};

// Fetch all pins
export const feedQuery = `*[_type == "pin"] | order(_createdAt desc) {
  image{
    asset->{
      url
    }
  },
      _id,
      destination,
      postedBy->{
        _id,
        username,
        image
      },
      save[]{
        _key,
        postedBy->{
          _id,
          username,
          image
        },
      },
    } `;
