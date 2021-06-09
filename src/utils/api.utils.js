const { REACT_APP_API_ENDPOINT } = process.env;

const fetchServer = ({
  path,
  method = 'POST',
  headers = { 'Content-Type': 'application/json' },
  body,
}) =>
  fetch(`${REACT_APP_API_ENDPOINT}${path}`, {
    method,
    headers,
    body: JSON.stringify({ ...body }),
  });

export default {
  signInUser: ({ email, password }) =>
    fetchServer({ path: '/signin', body: { email, password } }).then((response) => response.json()),

  registerUser: ({ name, email, password }) =>
    fetchServer({ path: '/register', body: { name, email, password } }).then((response) =>
      response.json()
    ),

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
