export const constraints = {
    title: {
      type: "string",
      presence: true,
      length: {
        minimum: 3,
        message: "should be atleast 3 characters",
      }
    },
    body: {
        type: "string",
        presence: true,
        length: {
          minimum: 5,
          message: "should be atleast 5 characters",
        }
      },
  };