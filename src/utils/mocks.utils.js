export const USER = {
  id: 3,
  name: 'test',
  email: 'test@test.com',
  entries: 7,
};

export const OUTPUTS = {
  outputs: [
    {
      data: {
        regions: [
          {
            region_info: {
              bounding_box: {
                top_row: 0.5,
                left_col: 0.5,
                bottom_row: 0.5,
                right_col: 0.5,
              },
            },
          },
        ],
      },
    },
  ],
};

export const CREDENTIAL_ERROR = {
  error: 'You have entered an invalid username and/or password',
};

export const SERVER_ERROR = {
  error: 'Something went wrong. Please try again later.',
};
