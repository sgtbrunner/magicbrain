const { REACT_APP_API_ENDPOINT } = process.env;

const fetchServer = async ({
  path,
  method = 'POST',
  headers = { 'Content-Type': 'application/json' },
  body,
}) =>
  await fetch(`${REACT_APP_API_ENDPOINT}${path}`, {
    method,
    headers,
    body: JSON.stringify({ ...body }),
  });

export default {
  signInUser: ({ email, password }) =>
    fetchServer({ path: '/signin', body: { email, password } })
      .then((response) => {
        if (response.ok) return response.json();
        throw new Error(`${response.status} - Unable to sign user in: ${response.statusText}`);
      })
      .catch((err) => alert(err)),

  registerUser: ({ name, email, password }) =>
    fetchServer({ path: '/register', body: { name, email, password } })
      .then((response) => {
        if (response.ok) return response.json();
        throw new Error(`${response.status} - Unable to register user: ${response.statusText}`);
      })
      .catch((err) => alert(err)),

  getImageBoundary: ({ input }) =>
    fetchServer({ path: '/imageurl', body: { input } })
      .then((response) => {
        if (response.ok) return response.json();
        throw new Error(
          `${response.status} - Unable to get image boundaries: ${response.statusText}`
        );
      })
      .catch((err) => alert(err)),

  updateImageCount: ({ id }) =>
    fetchServer({ path: '/image', method: 'PUT', body: { id } })
      .then((response) => {
        if (response.ok) return response.json();
        throw new Error(
          `${response.status} - Unable to update image count: ${response.statusText}`
        );
      })
      .catch((err) => alert(err)),
};
