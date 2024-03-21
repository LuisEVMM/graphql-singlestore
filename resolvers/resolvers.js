import fetch from "node-fetch";

export const resolvers = {
  Query: {
    users: () => usersDataFromApi(),
    user: (_, args) => {
      const { id } = args;
      return userDataFromApi({ id });
    },
    characters: () => charactersDataFromApi(),
  },
};

const userDataFromApi = async ({ id }) => {
  const res = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
  return await res.json();
};

const usersDataFromApi = async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/users/");
  return await res.json();
};

const charactersDataFromApi = () => {
  return fetch("https://rickandmortyapi.com/api/character")
    .then((res) => res.json())
    .then((json) => json.results);
};
