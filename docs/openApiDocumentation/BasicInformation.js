const swaggerDocument = {
  swagger: "2.0",
  info: {
    title: "PageX",
    description:
      "PageX is a solution to connect talented people in one place \
      and help them share and develop their passion.",
    version: "Beta",
  },
  servers: [
    {
      url: "http://localhost:3000/",
      description: "Local server",
    },
  ],
  produces: ["application/json"],
  consumes: "application/json",
  paths: {
    "/api/v1/users/validate/account": {
      post: {
        "x-swagger-router-controller": "users",
        operationId: "users-validate-account",
        summary: "Validate the email account",
        description: "Validate user emil",
        tags: ["User"],
        description: `[Account validation link](${
          process.env.URL_BACKEND +
          ":" +
          process.env.URL_BACKEND_PORT +
          "/api/v1/users/validate/account"
        })`,
        parameters: [
          // {
          //     "name": "fullname",
          //     "in": "formData",
          //     "type": "string",
          //     // "collectionFormat": "multi",
          //     "required": true
          //     // "items": {
          //     //     "type": "string"
          //     // },
          // },
          // {
          //     "name": "lastname",
          //     "in": "formData",
          //     "required": true,
          //     "type": "string"
          // },
          // {
          //     "name": "password",
          //     "in": "formData",
          //     "required": true,
          //     "type": "password"
          // },
          // {
          //     "name": "email",
          //     "in": "formData",
          //     "required": true,
          //     "type": "string"
          // },
          // {
          //     "name": "file",
          //     "in": "formData",
          //     "type": "file",
          //     "required": "true"
          // }
          {
            name: "body",
            in: "body",
            required: true,
            schema: {
              type: "object",
              properties: {
                data: {
                  type: "object",
                  properties: {
                    fullname: {
                      type: "string",
                      example: "John Dao",
                    },
                    email: {
                      type: "string",
                      example: "john.dao@pagex.io",
                    },
                  },
                },
              },
            },
          },
        ],
        responses: {
          302: {
            description: "This user email already exists",
            name: "body",
            in: "body",
            required: true,
            schema: {
              type: "object",
              properties: {
                data: {
                  type: "object",
                  properties: {
                    success: {
                      type: "booleon",
                      example: true,
                    },
                    msg: {
                      type: "string",
                      example: "Account exists",
                    },
                    code: {
                      type: "number",
                      example: 302,
                    },
                  },
                },
              },
            },
          },
          200: {
            description:
              "Validation code for user account has been generated succesfully",
            name: "body",
            in: "body",
            required: true,
            schema: {
              type: "object",
              properties: {
                data: {
                  type: "object",
                  properties: {
                    success: {
                      type: "booleon",
                      example: true,
                    },
                    code: {
                      type: "number",
                      example: 200,
                    },
                    data: {
                      properties: {
                        id: {
                          type: "string",
                          example: "_3456785445675",
                        },
                        validationCode: {
                          type: "string",
                          example: "98789",
                        },
                      },
                    },
                  },
                },
              },
            },
          },
          500: {
            description: "An error has occured",
          },
        },
      },
    },
    "/api/v1/users/validate/code": {
      post: {
        "x-swagger-router-controller": "users",
        operationId: "users-validate-code",
        summary: "Check if email code is valid",
        description: "Check account validation code",
        tags: ["User"],
        description: `[Code validation link](${
          process.env.URL_BACKEND +
          ":" +
          process.env.URL_BACKEND_PORT +
          "/api/v1/users/validate/code"
        })`,
        parameters: [
          {
            name: "body",
            in: "body",
            required: true,
            schema: {
              type: "object",
              properties: {
                data: {
                  type: "object",
                  properties: {
                    id: {
                      type: "string",
                      example: "5e4c58b2a7032302a4cc07cebd",
                    },
                    validationCode: {
                      type: "string",
                      example: "26021",
                    },
                  },
                },
              },
            },
          },
        ],
        responses: {
          406: {
            description: "Validation code is incorrect",
            name: "body",
            in: "body",
            required: true,
            schema: {
              type: "object",
              properties: {
                data: {
                  type: "object",
                  properties: {
                    success: {
                      type: "booleon",
                      example: true,
                    },
                    code: {
                      type: "number",
                      example: 406,
                    },
                    data: {
                      properties: {
                        valid: {
                          type: "boolean",
                          example: false,
                        },
                        msg: {
                          type: "string",
                          example: "Not acceptable",
                        },
                      },
                    },
                  },
                },
              },
            },
          },
          200: {
            description: "Validation code is correct",
            name: "body",
            in: "body",
            required: true,
            schema: {
              type: "object",
              properties: {
                data: {
                  type: "object",
                  properties: {
                    success: {
                      type: "booleon",
                      example: true,
                    },
                    code: {
                      type: "number",
                      example: 200,
                    },
                    data: {
                      properties: {
                        valid: {
                          type: "boolean",
                          example: true,
                        },
                        msg: {
                          type: "string",
                          example: "Accepted",
                        },
                      },
                    },
                  },
                },
              },
            },
          },
          500: {
            description: "An error has occured",
          },
        },
      },
    },
    "/api/v1/users/signup": {
      post: {
        "x-swagger-router-controller": "users",
        operationId: "users-signup",
        summary: "Signup a new user",
        description: "Create a new user account",
        tags: ["User"],
        parameters: [
          {
            name: "body",
            in: "body",
            required: true,
            schema: {
              type: "object",
              properties: {
                id: {
                  type: "string",
                  example: "5e4c58b2a7032302a4cc07cebd",
                },
                validationCode: {
                  type: "string",
                  example: "26021",
                },
                email: {
                  type: "string",
                  example: "pagex@gmail.com",
                },
                password: {
                  type: "string",
                  example: "9876543456789",
                },
                file: {
                  type: "string",
                  example: "/photo/test.png",
                },
                passion: {
                  type: "string",
                  example: "painting",
                },
              },
            },
          },
        ],
        responses: {
          406: {
            description: "Account validation",
            name: "body",
            in: "body",
            required: true,
            schema: {
              type: "object",
              properties: {
                data: {
                  type: "object",
                  properties: {
                    success: {
                      type: "booleon",
                      example: true,
                    },
                    code: {
                      type: "number",
                      example: 406,
                    },
                    data: {
                      properties: {
                        valid: {
                          type: "boolean",
                          example: false,
                        },
                        msg: {
                          type: "string",
                          example: "This account is not active or exists",
                        },
                      },
                    },
                  },
                },
              },
            },
          },
          407: {
            description: "Password validation",
            name: "body",
            in: "body",
            required: true,
            schema: {
              type: "object",
              properties: {
                data: {
                  type: "object",
                  properties: {
                    success: {
                      type: "booleon",
                      example: true,
                    },
                    code: {
                      type: "number",
                      example: 407,
                    },
                    data: {
                      properties: {
                        valid: {
                          type: "boolean",
                          example: false,
                        },
                        msg: {
                          type: "string",
                          example:
                            "Password must include more than 08 characters",
                        },
                      },
                    },
                  },
                },
              },
            },
          },
          200: {
            description: "Account creation",
            name: "body",
            in: "body",
            required: true,
            schema: {
              type: "object",
              properties: {
                data: {
                  type: "object",
                  properties: {
                    success: {
                      type: "booleon",
                      example: true,
                    },
                    code: {
                      type: "number",
                      example: 200,
                    },
                    data: {
                      properties: {
                        msg: {
                          type: "string",
                          example: "Account created with success",
                        },
                      },
                    },
                  },
                },
              },
            },
          },
          500: {
            description: "An error has occured",
          },
        },
      },
    },
    "/api/v1/users/login": {
      post: {
        "x-swagger-router-controller": "users",
        operationId: "users-login",
        summary: "Login user",
        description: "Account connection",
        tags: ["User"],
        description: `[User creation link](${
          process.env.URL_BACKEND +
          ":" +
          process.env.URL_BACKEND_PORT +
          "/api/v1/users/login"
        })`,
        parameters: [
          {
            name: "body",
            in: "body",
            required: true,
            schema: {
              type: "object",
              properties: {
                data: {
                  type: "object",
                  properties: {
                    email: {
                      type: "string",
                      example: "pagex@gmail.com",
                    },
                    password: {
                      type: "string",
                      example: "9876543456789",
                    },
                  },
                },
              },
            },
          },
        ],
        responses: {
          406: {
            description: "Account validation",
            name: "body",
            in: "body",
            required: true,
            schema: {
              type: "object",
              properties: {
                data: {
                  type: "object",
                  properties: {
                    success: {
                      type: "booleon",
                      example: true,
                    },
                    code: {
                      type: "number",
                      example: 406,
                    },
                    data: {
                      properties: {
                        msg: {
                          type: "string",
                          example: "Account does not exists",
                        },
                      },
                    },
                  },
                },
              },
            },
          },
          407: {
            description: "Password validation",
            name: "body",
            in: "body",
            required: true,
            schema: {
              type: "object",
              properties: {
                data: {
                  type: "object",
                  properties: {
                    success: {
                      type: "booleon",
                      example: true,
                    },
                    code: {
                      type: "number",
                      example: 407,
                    },
                    data: {
                      properties: {
                        msg: {
                          type: "string",
                          example: "Password and/or email is not correct",
                        },
                      },
                    },
                  },
                },
              },
            },
          },
          200: {
            description: "Account login successfully",
            name: "body",
            in: "body",
            required: true,
            schema: {
              type: "object",
              properties: {
                data: {
                  type: "object",
                  properties: {
                    success: {
                      type: "booleon",
                      example: true,
                    },
                    code: {
                      type: "number",
                      example: 200,
                    },
                    data: {
                      properties: {
                        token: {
                          type: "string",
                          example:
                            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IiQyYiQxMCRlMnRWeGc5dmszaHlFdjVOWGJ2U2t1YVVJOUJIakdHblAzTGZXZEFiRzBHOXBLVGJNUlA4aSIsImRhdGEiOiI1ZTUxMzU0ZWIyZjM0MDAwMmI0Y2I4N2EiLCJpYXQiOjE1ODIzODA3MDUsImV4cCI6MTU4MjQyMzkwNX0.aiesaYNjxKbZyZUhWmfZD48pVS0C_GhqITdKdTK2g80",
                        },
                        userId: {
                          type: "string",
                          example: "5e51354eb2f340002b4cb87a",
                        },
                        profilePhoto: {
                          type: "string",
                          example: "/upload/exemple/profiletest.png",
                        },
                        fullname: {
                          type: "string",
                          example: "John Dao",
                        },
                        passion: {
                          type: "string",
                          example: "Painting",
                        },
                        dateOfCreation: {
                          type: "string",
                          example: "2020-02-22T14:06:06.704Z",
                        },
                        isFirstLogin: {
                          type: "boolean",
                          example: "false",
                        },
                      },
                    },
                  },
                },
              },
            },
          },
          500: {
            description: "An error has occured",
          },
        },
      },
    },
    "/api/v1/users/login-google": {
      post: {
        "x-swagger-router-controller": "users",
        operationId: "users-google-login",
        summary: "Google loogin user",
        description: "Account connection with google ",
        tags: ["User"],
        description: `[User google login link](${
          process.env.URL_BACKEND +
          ":" +
          process.env.URL_BACKEND_PORT +
          "/api/v1/users/login-google"
        })`,
        parameters: [
          {
            name: "body",
            in: "body",
            required: true,
            schema: {
              type: "object",
              properties: {
                data: {
                  type: "object",
                  properties: {
                    token: {
                      type: "string",
                      example: "Google clientID",
                    },
                    email: {
                      type: "string",
                      example: "pagex@gmail.com",
                    },
                    firstname: {
                      type: "string",
                      example: "John",
                    },
                    lastname: {
                      type: "string",
                      example: "Doe",
                    },
                    fullname: {
                      type: "string",
                      example: "John Doe",
                    },
                    photo: {
                      type: "string",
                      example: "googlelink.image/image",
                    },
                  },
                },
              },
            },
          },
        ],
        responses: {
          200: {
            description: "Account login successfully",
            name: "body",
            in: "body",
            required: true,
            schema: {
              type: "object",
              properties: {
                data: {
                  type: "object",
                  properties: {
                    success: {
                      type: "booleon",
                      example: true,
                    },
                    code: {
                      type: "number",
                      example: 200,
                    },
                    data: {
                      properties: {
                        token: {
                          type: "string",
                          example:
                            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IiQyYiQxMCRlMnRWeGc5dmszaHlFdjVOWGJ2U2t1YVVJOUJIakdHblAzTGZXZEFiRzBHOXBLVGJNUlA4aSIsImRhdGEiOiI1ZTUxMzU0ZWIyZjM0MDAwMmI0Y2I4N2EiLCJpYXQiOjE1ODIzODA3MDUsImV4cCI6MTU4MjQyMzkwNX0.aiesaYNjxKbZyZUhWmfZD48pVS0C_GhqITdKdTK2g80",
                        },
                        userId: {
                          type: "string",
                          example: "5e51354eb2f340002b4cb87a",
                        },
                        profilePhoto: {
                          type: "string",
                          example: "/upload/exemple/profiletest.png",
                        },
                        fullname: {
                          type: "string",
                          example: "John Dao",
                        },
                        passion: {
                          type: "string",
                          example: "Painting",
                        },
                        dateOfCreation: {
                          type: "string",
                          example: "2020-02-22T14:06:06.704Z",
                        },
                        isFirstLogin: {
                          type: "boolean",
                          example: "false",
                        },
                      },
                    },
                  },
                },
              },
            },
          },
          500: {
            description: "An error has occured",
          },
        },
      },
    },
    "/api/v1/users/subscription/create": {
      post: {
        "x-swagger-router-controller": "users",
        operationId: "users-subscription",
        summary: "Create subscription",
        description: "To allow user to subcriber other users",
        tags: ["User"],
        parameters: [
          {
            name: "body",
            in: "body",
            required: true,
            schema: {
              type: "object",
              properties: {
                data: {
                  type: "object",
                  properties: {
                    userId: {
                      type: "string",
                      example: "5e63a169bc6eb82fe4b049d0",
                    },
                    subscribeToUserId: {
                      type: "string",
                      example: "5e6cfc2c82cbec0efd7fa5dc",
                    },
                  },
                },
              },
            },
          },
        ],
        responses: {
          200: {
            description: "Subscription created successfully",
            name: "body",
            in: "body",
            required: true,
            schema: {
              type: "object",
              properties: {
                success: {
                  type: "booleon",
                  example: true,
                },
                code: {
                  type: "number",
                  example: 200,
                },
                data: {
                  properties: {
                    msg: {
                      type: "string",
                      example: "Subscription created with success",
                    },
                  },
                },
                error: {
                  properties: {
                    msg: {
                      type: "String",
                      example: "Error will displayed if it occured",
                    },
                  },
                },
              },
            },
          },
          500: {
            description: "An error has occured",
          },
        },
      },
    },
    "/api/v1/users/subscription/remove": {
      delete: {
        "x-swagger-router-controller": "users",
        operationId: "users-subscription-remove",
        summary: "Remove subscription",
        description: "To allow user to remove subscription",
        tags: ["User"],
        parameters: [
          {
            name: "body",
            in: "body",
            required: true,
            schema: {
              type: "object",
              properties: {
                data: {
                  type: "object",
                  properties: {
                    userId: {
                      type: "string",
                      example: "5e63a169bc6eb82fe4b049d0",
                    },
                    unSubscribeToUserId: {
                      type: "string",
                      example: "5e6cfc2c82cbec0efd7fa5dc",
                    },
                  },
                },
              },
            },
          },
        ],
        responses: {
          200: {
            description: "Removed subscription successfully",
            name: "body",
            in: "body",
            required: true,
            schema: {
              type: "object",
              properties: {
                success: {
                  type: "booleon",
                  example: true,
                },
                code: {
                  type: "number",
                  example: 200,
                },
                data: {
                  properties: {
                    msg: {
                      type: "string",
                      example: "Removed subscription successfully",
                    },
                  },
                },
                error: {
                  properties: {
                    msg: {
                      type: "String",
                      example: "Error will displayed if it occured",
                    },
                  },
                },
              },
            },
          },
          500: {
            description: "An error has occured",
          },
        },
      },
    },
    "/api/v1/users/subscription/status/subscribeToUserId/:subscribeToUserId": {
      get: {
        "x-swagger-router-controller": "users",
        operationId: "subscription-status",
        summary: "get subscription status",
        description: "Get subscription status",
        tags: ["User"],
        parameters: [],
        responses: {
          200: {
            description: "Subscription Info",
            name: "body",
            in: "body",
            required: true,
            schema: {
              type: "object",
              properties: {
                data: {
                  type: "object",
                  properties: {
                    success: {
                      type: "booleon",
                      example: true,
                    },
                    code: {
                      type: "number",
                      example: 200,
                    },
                    data: {
                      properties: {
                        subscriptionStatus: {
                          type: "String",
                          example:
                            "Ok => When we find any subscription Or NotFound => Dont have any subscription",
                        },
                      },
                    },
                  },
                },
              },
            },
          },
          404: {
            description: "No subscroption found",
          },
          500: {
            description: "An error has occured",
          },
        },
      },
    },
    "/api/v1/users/subscription/list/userId/:userId": {
      get: {
        "x-swagger-router-controller": "users",
        operationId: "subscription-list",
        summary: "get subscribed user list",
        description: "Get all subriced users list",
        tags: ["User"],
        parameters: [],
        responses: {
          200: {
            description: "Subscription list fetched successfully",
            name: "body",
            in: "body",
            required: true,
            schema: {
              type: "object",
              properties: {
                data: {
                  type: "object",
                  properties: {
                    success: {
                      type: "booleon",
                      example: true,
                    },
                    code: {
                      type: "number",
                      example: 200,
                    },
                    data: {
                      properties: {
                        _id: {
                          type: "String",
                          example: "",
                        },
                        firstname: {
                          type: "String",
                          example: "",
                        },
                        lastname: {
                          type: "String",
                          example: "",
                        },
                        profilePhoto: {
                          type: "String",
                          example: "",
                        },
                      },
                    },
                  },
                },
              },
            },
          },
          500: {
            description: "An error has occured",
          },
        },
      },
    },
    "/api/v1/users/subscriber/list/userId/:userId": {
      get: {
        "x-swagger-router-controller": "users",
        operationId: "subscribers-list",
        summary: "get subscribed user list",
        description: "Get all subriced users list",
        tags: ["User"],
        parameters: [],
        responses: {
          200: {
            description: "Subscribers list fetched successfully",
            name: "body",
            in: "body",
            required: true,
            schema: {
              type: "object",
              properties: {
                data: {
                  type: "object",
                  properties: {
                    success: {
                      type: "booleon",
                      example: true,
                    },
                    code: {
                      type: "number",
                      example: 200,
                    },
                    data: {
                      properties: {
                        _id: {
                          type: "String",
                          example: "",
                        },
                        firstname: {
                          type: "String",
                          example: "",
                        },
                        lastname: {
                          type: "String",
                          example: "",
                        },
                        profilePhoto: {
                          type: "String",
                          example: "",
                        },
                      },
                    },
                  },
                },
              },
            },
          },
          500: {
            description: "An error has occured",
          },
        },
      },
    },
    "/api/v1/users/info/userId/:userId": {
      get: {
        "x-swagger-router-controller": "users",
        operationId: "user-info",
        summary: "get user info",
        description: "Get user info",
        tags: ["User"],
        parameters: [],
        responses: {
          200: {
            description: "User Info fetched successfully",
            name: "body",
            in: "body",
            required: true,
            schema: {
              type: "object",
              properties: {
                data: {
                  type: "object",
                  properties: {
                    success: {
                      type: "booleon",
                      example: true,
                    },
                    code: {
                      type: "number",
                      example: 200,
                    },
                    data: {
                      properties: {
                        fullname: {
                          type: "String",
                          example: "",
                        },
                        firstname: {
                          type: "String",
                          example: "",
                        },
                        lastname: {
                          type: "String",
                          example: "",
                        },
                        profilePhoto: {
                          type: "String",
                          example: "",
                        },
                        email: {
                          type: "String",
                          example: "",
                        },
                        bio: {
                          type: "String",
                          example: "user bio info",
                        },
                        headline: {
                          type: "String",
                          example: "user headline",
                        },
                        location: {
                          type: "String",
                          example: "user location",
                        },
                        passion: {
                          type: "object",
                          properties: {
                            title: {
                              type: "String",
                              example: "",
                            },
                            description: {
                              type: "String",
                              example: "",
                            },
                            image: {
                              type: "String",
                              example: "",
                            },
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
          500: {
            description: "An error has occured",
          },
        },
      },
    },
    "/api/v1/users/info/edit": {
      post: {
        "x-swagger-router-controller": "users",
        operationId: "user-edit-info",
        summary: "Edi user info",
        description: "Edit user info",
        tags: ["User"],
        parameters: [
          {
            name: "body",
            in: "body",
            required: true,
            schema: {
              type: "object",
              properties: {
                type: "object",
                data: {
                  type: "object",
                  properties: {
                    userId: {
                      type: "string",
                      example: "5e4c58b2a7032302a4cc07cebd",
                    },
                    bio: {
                      type: "string",
                      example: "bio information about user",
                    },
                    headline: {
                      type: "string",
                      example: "Job tile or profession",
                    },
                    location: {
                      type: "String",
                      example: "New York, United States",
                    },
                    file: {
                      type: "file",
                      example: "updating profile phot",
                    },
                  },
                },
              },
            },
          },
        ],
        responses: {
          200: {
            description: "Updated account succesfully",
            name: "body",
            in: "body",
            required: true,
            schema: {
              type: "object",
              properties: {
                type: "object",
                data: {
                  type: "object",
                  properties: {
                    success: {
                      type: "booleon",
                      example: true,
                    },
                    code: {
                      type: "number",
                      example: 200,
                    },
                    data: {
                      type: "object",
                      properties: {
                        fullname: {
                          type: "String",
                          example: "",
                        },
                        firstname: {
                          type: "String",
                          example: "",
                        },
                        lastname: {
                          type: "String",
                          example: "",
                        },
                        profilePhoto: {
                          type: "String",
                          example: "",
                        },
                        email: {
                          type: "String",
                          example: "",
                        },
                        bio: {
                          type: "String",
                          example: "user bio info",
                        },
                        headline: {
                          type: "String",
                          example: "user headline",
                        },
                        location: {
                          type: "String",
                          example: "user location",
                        },
                        passion: {
                          type: "object",
                          properties: {
                            title: {
                              type: "String",
                              example: "",
                            },
                            description: {
                              type: "String",
                              example: "",
                            },
                            image: {
                              type: "String",
                              example: "",
                            },
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
          500: {
            description: "An error has occured",
          },
        },
      },
    },
    "/api/v1/users/reaction/contentId/:contentId/limit/:limit/page/:page": {
      get: {
        "x-swagger-router-controller": "users",
        operationId: "user-reaction",
        summary: "get user reaction",
        description: "Get users by reaction content id",
        tags: ["User"],
        parameters: [],
        responses: {
          200: {
            description: "Users list fetched successfully",
            name: "body",
            in: "body",
            required: true,
            schema: {
              type: "object",
              properties: {
                data: {
                  type: "object",
                  properties: {
                    success: {
                      type: "booleon",
                      example: true,
                    },
                    code: {
                      type: "number",
                      example: 200,
                    },
                    data: {
                      type: "object",
                      properties: {
                        per_page: {
                          type: "number",
                          example: 10,
                        },
                        total: {
                          type: "number",
                          example: 42,
                        },
                        total_pages: {
                          type: "number",
                          example: 4,
                        },
                        data: {
                          type: "array",
                          items: {
                            properties: {
                              _id: {
                                type: "String",
                                example: "",
                              },
                              firstname: {
                                type: "String",
                                example: "",
                              },
                              lastname: {
                                type: "String",
                                example: "",
                              },
                              profilePhoto: {
                                type: "String",
                                example: "",
                              },
                            },
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
          500: {
            description: "An error has occured",
          },
        },
      },
    },
    "/api/v1/users/promotion/contentId/:contentId": {
      get: {
        "x-swagger-router-controller": "users",
        operationId: "user-promotion",
        summary: "get user promotion",
        description: "Get users by promotion content id",
        tags: ["User"],
        parameters: [],
        responses: {
          200: {
            description: "Users list fetched successfully",
            name: "body",
            in: "body",
            required: true,
            schema: {
              type: "object",
              properties: {
                data: {
                  type: "object",
                  properties: {
                    success: {
                      type: "booleon",
                      example: true,
                    },
                    code: {
                      type: "number",
                      example: 200,
                    },
                    data: {
                      properties: {
                        _id: {
                          type: "String",
                          example: "",
                        },
                        firstname: {
                          type: "String",
                          example: "",
                        },
                        lastname: {
                          type: "String",
                          example: "",
                        },
                        profilePhoto: {
                          type: "String",
                          example: "",
                        },
                      },
                    },
                  },
                },
              },
            },
          },
          500: {
            description: "An error has occured",
          },
        },
      },
    },
    "/api/v1/users/explore/passionId/:passion/limit/:limit/page/:page": {
      get: {
        "x-swagger-router-controller": "users",
        operationId: "users-explore-feed",
        summary: "get users explore feed",
        description: "Get users explore feed by passion id",
        tags: ["User"],
        parameters: [],
        responses: {
          200: {
            description: "Users list fetched successfully",
            name: "body",
            in: "body",
            required: true,
            schema: {
              type: "object",
              properties: {
                data: {
                  type: "object",
                  properties: {
                    success: {
                      type: "booleon",
                      example: true,
                    },
                    code: {
                      type: "number",
                      example: 200,
                    },
                    data: {
                      type: "array",
                      items: {
                        properties: {
                          _id: {
                            type: "String",
                            example: "",
                          },
                          firstname: {
                            type: "String",
                            example: "",
                          },
                          lastname: {
                            type: "String",
                            example: "",
                          },
                          fullname: {
                            type: "String",
                            example: "",
                          },
                          email: {
                            type: "String",
                            example: "",
                          },
                          profilePhoto: {
                            type: "String",
                            example: "",
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
          500: {
            description: "An error has occured",
          },
        },
      },
    },
    "/api/v1/users/search/keywords?text=''": {
      get: {
        "x-swagger-router-controller": "users",
        operationId: "user-search-input",
        summary: "User types in search",
        description: "User types in search",
        tags: ["User"],
        parameters: [],
        responses: {
          200: {
            description: "Get Users or Contents based on typed keyword",
            name: "body",
            in: "body",
            required: true,
            schema: {
              type: "object",
              properties: {
                success: {
                  type: "boolean",
                  example: true,
                },
                data: {
                  type: "object",
                  properties: {
                    users: {
                      type: "array",
                      items: {
                        properties: {
                          success: {
                            type: "booleon",
                            example: true,
                          },
                          code: {
                            type: "number",
                            example: 200,
                          },
                          data: {
                            properties: {
                              fullname: {
                                type: "String",
                                example: "",
                              },
                              firstname: {
                                type: "String",
                                example: "",
                              },
                              lastname: {
                                type: "String",
                                example: "",
                              },
                              profilePhoto: {
                                type: "String",
                                example: "",
                              },
                              email: {
                                type: "String",
                                example: "",
                              },
                              bio: {
                                type: "String",
                                example: "user bio info",
                              },
                              headline: {
                                type: "String",
                                example: "user headline",
                              },
                              location: {
                                type: "String",
                                example: "user location",
                              },
                              passion: {
                                type: "object",
                                properties: {
                                  title: {
                                    type: "String",
                                    example: "",
                                  },
                                  description: {
                                    type: "String",
                                    example: "",
                                  },
                                  image: {
                                    type: "String",
                                    example: "",
                                  },
                                },
                              },
                            },
                          },
                        },
                      },
                    },
                    content: {
                      type: "array",
                      items: {
                        properties: {
                          _id: {
                            type: "String",
                            example: "",
                          },
                          user: {
                            type: "object",
                            example: {},
                          },
                          parentContent: {
                            type: "String",
                            example: "",
                          },
                          contentDescription: {
                            type: "String",
                            example: "",
                          },
                          contentTag: {
                            type: "String",
                            example: "",
                          },
                          contentImage: {
                            type: "String",
                            example: "",
                          },
                          typeOfReaction: {
                            type: "String",
                            example: "",
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
          500: {
            description: "An error has occurred",
          },
        },
      },
    },
    "/api/v1/users/affiliation/:userId": {
      patch: {
        "x-swagger-router-controller": "users",
        description: "Check account validation code",
        operationId: "users-affiliation",
        summary: "Set User Affiliation and Organization",
        description: "This API will set the user affiliation and organization",
        tags: ["User"],
        parameters: [
          {
            name: "body",
            in: "body",
            required: true,
            schema: {
              type: "object",
              properties: {
                data: {
                  type: "object",
                  properties: {
                    organizationName: {
                      type: "string",
                      example: "Organization Name",
                    },
                    organizationType: {
                      type: "string",
                      example: "student",
                    },
                    isAffiliated: {
                      type: "boolean",
                    },
                  },
                },
              },
            },
          },
          {
            name: "userId",
            in: "path",
            schema: {
              type: "string",
            },
            required: true,
          },
        ],
        responses: {
          400: {
            description: "Validation Input is incorrect",
            name: "body",
            in: "body",
            required: true,
            schema: {
              type: "object",
              properties: {
                data: {
                  type: "object",
                  properties: {
                    success: {
                      type: "booleon",
                      example: true,
                    },
                    code: {
                      type: "number",
                      example: 400,
                    },
                    data: {
                      properties: {
                        msg: {
                          type: "string",
                          example: "Not acceptable",
                        },
                      },
                    },
                  },
                },
              },
            },
          },
          200: {
            description: "Affiliation succesfully updated",
            name: "body",
            in: "body",
            required: true,
            schema: {
              type: "object",
              properties: {
                data: {
                  type: "object",
                  properties: {
                    success: {
                      type: "booleon",
                      example: true,
                    },
                    code: {
                      type: "number",
                      example: 200,
                    },
                    data: {
                      properties: {
                        isAffiliated: {
                          type: "boolean",
                          example: "true",
                        },
                      },
                    },
                  },
                },
              },
            },
          },
          401: {
            description: "Invalid user id, Not authorized attempt access",
          },
          500: {
            description: "An error has occured",
          },
        },
      },
    },
    "/api/v1/content/new": {
      post: {
        "x-swagger-router-controller": "contents",
        operationId: "contents-new",
        summary: "Add content",
        description: "Create new content",
        tags: ["Content"],
        description: `[Content creation link](${
          process.env.URL_BACKEND +
          ":" +
          process.env.URL_BACKEND_PORT +
          "/api/v1/content/new"
        })`,
        parameters: [
          {
            in: "header",
            name: "Authorization",
            required: true,
            description: "Authorization bearer token",
            example:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c",
            schema: {
              type: "string",
            },
          },
          {
            name: "body",
            in: "body",
            required: true,
            schema: {
              type: "object",
              properties: {
                contentUserId: {
                  type: "string",
                  example: "5e51354eb2f340002b4cb87a",
                },
                contentTitle: {
                  type: "string",
                  example: "Awesome paintings",
                },
                contentDescription: {
                  type: "string",
                  example: "this is my cool art",
                },
                file: {
                  type: "string",
                  example: "I am an image",
                },
                contentType: {
                  type: "string",
                  example: "passion",
                },
              },
            },
          },
        ],
        responses: {
          406: {
            description: "Account validation",
            name: "body",
            in: "body",
            required: true,
            schema: {
              type: "object",
              properties: {
                data: {
                  type: "object",
                  properties: {
                    success: {
                      type: "booleon",
                      example: true,
                    },
                    code: {
                      type: "number",
                      example: 406,
                    },
                    data: {
                      properties: {
                        msg: {
                          type: "string",
                          example: "Account does not exists",
                        },
                      },
                    },
                  },
                },
              },
            },
          },
          200: {
            description: "Content created successfully",
            name: "body",
            in: "body",
            required: true,
            schema: {
              type: "object",
              properties: {
                data: {
                  type: "object",
                  properties: {
                    success: {
                      type: "booleon",
                      example: true,
                    },
                    code: {
                      type: "number",
                      example: 200,
                    },
                    data: {
                      properties: {
                        msg: {
                          type: "string",
                          example: "Content created with success",
                        },
                      },
                    },
                  },
                },
              },
            },
          },
          500: {
            description: "An error has occured",
          },
        },
      },
    },
    "/api/v1/content/all/limit/:limit/page/:page/userId/:userId": {
      get: {
        "x-swagger-router-controller": "contents",
        operationId: "contents-all",
        summary: "Get contents",
        description: "Get all content by pagination",
        tags: ["Content"],
        description: `[Content fetch link](${
          process.env.URL_BACKEND +
          ":" +
          process.env.URL_BACKEND_PORT +
          "/api/v1/content/all/limit/:limit/page/:page"
        })`,
        parameters: [],
        responses: {
          200: {
            description: "Content fetched successfully",
            name: "body",
            in: "body",
            required: true,
            schema: {
              type: "object",
              properties: {
                data: {
                  type: "object",
                  properties: {
                    success: {
                      type: "booleon",
                      example: true,
                    },
                    code: {
                      type: "number",
                      example: 200,
                    },
                    data: {
                      properties: {
                        per_page: {
                          type: "number",
                          example: 10,
                        },
                        total: {
                          type: "number",
                          example: 42,
                        },
                        total_pages: {
                          type: "number",
                          example: 4,
                        },
                        data: {
                          type: "array",
                          items: {
                            properties: {
                              contentDeleted: {
                                type: "booleon",
                                example: false,
                              },
                              _id: {
                                type: "string",
                                example: "5e51489c01a9f50461ae7bf4",
                              },
                              contentUserId: {
                                type: "string",
                                example: "5e51354eb2f340002b4cb87a",
                              },
                              contentTitle: {
                                type: "string",
                                example: "Awesome paintings",
                              },
                              contentDescription: {
                                type: "string",
                                example: "this is my cool art",
                              },
                              file: {
                                type: "string",
                                example: "I am an image",
                              },
                              contentType: {
                                type: "string",
                                example: "passion",
                              },
                            },
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
          500: {
            description: "An error has occured",
          },
        },
      },
    },
    "/api/v1/content/category/{category}/limit/:limit/page/:page": {
      get: {
        "x-swagger-router-controller": "contents",
        operationId: "contents-category",
        summary: "Get contents",
        description: "Get  content by category",
        tags: ["Content"],
        description: `[Content fetch link](${
          process.env.URL_BACKEND +
          ":" +
          process.env.URL_BACKEND_PORT +
          "/api/v1/content/category/:category/limit/:limit/page/:page"
        })`,
        parameters: [
          {
            in: "header",
            name: "Authorization",
            required: true,
            description: "Authorization bearer token",
            example:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c",
            schema: {
              type: "string",
            },
          },
          {
            in: "path",
            name: "category",
            required: true,
            description: "Category",
            example: "...",
            schema: {
              type: "string",
            },
          },
        ],
        responses: {
          200: {
            description: "Content fetched successfully",
            name: "body",
            in: "body",
            required: true,
            schema: {
              type: "object",
              properties: {
                data: {
                  type: "object",
                  properties: {
                    success: {
                      type: "booleon",
                      example: true,
                    },
                    code: {
                      type: "number",
                      example: 200,
                    },
                    data: {
                      properties: {
                        per_page: {
                          type: "number",
                          example: 10,
                        },
                        total: {
                          type: "number",
                          example: 42,
                        },
                        total_pages: {
                          type: "number",
                          example: 4,
                        },
                        data: {
                          type: "array",
                          items: {
                            properties: {
                              contentDeleted: {
                                type: "booleon",
                                example: false,
                              },
                              _id: {
                                type: "string",
                                example: "5e51489c01a9f50461ae7bf4",
                              },
                              contentUserId: {
                                type: "string",
                                example: "5e51354eb2f340002b4cb87a",
                              },
                              contentTitle: {
                                type: "string",
                                example: "Awesome paintings",
                              },
                              contentDescription: {
                                type: "string",
                                example: "this is my cool art",
                              },
                              file: {
                                type: "string",
                                example: "I am an image",
                              },
                              contentType: {
                                type: "string",
                                example: "passion",
                              },
                            },
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
          500: {
            description: "An error has occured",
          },
        },
      },
    },
    "/api/v1/content/feed/user/passion/limit/:limit/page/:page": {
      get: {
        "x-swagger-router-controller": "contents",
        operationId: "contents-user-passion-feed",
        summary: "Get all contents of user's passion",
        description: "Get all content of user's passion by pagination",
        tags: ["Content"],
        parameters: [],
        responses: {
          200: {
            description: "Content fetched successfully",
            name: "body",
            in: "body",
            required: true,
            schema: {
              type: "object",
              properties: {
                data: {
                  type: "object",
                  properties: {
                    success: {
                      type: "booleon",
                      example: true,
                    },
                    code: {
                      type: "number",
                      example: 200,
                    },
                    data: {
                      properties: {
                        per_page: {
                          type: "number",
                          example: 10,
                        },
                        total: {
                          type: "number",
                          example: 42,
                        },
                        total_pages: {
                          type: "number",
                          example: 4,
                        },
                        data: {
                          type: "array",
                          items: {
                            properties: {
                              parentContent: {
                                type: "object",
                              },
                              user: {
                                type: "object",
                              },
                              _id: {
                                type: "string",
                                example: "5e51489c01a9f50461ae7bf4",
                              },
                              contentUserId: {
                                type: "string",
                                example: "5e51354eb2f340002b4cb87a",
                              },
                              contentTitle: {
                                type: "string",
                                example: "Awesome paintings",
                              },
                              contentDescription: {
                                type: "string",
                                example: "this is my cool art",
                              },
                              contentImage: {
                                type: "string",
                                example: "I am an image",
                              },
                              contentType: {
                                type: "string",
                                example: "Contribution",
                              },
                            },
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
          500: {
            description: "An error has occured",
          },
        },
      },
    },
    "/api/v1/content/feed/art-form/id/:artFormId/limit/:limit/page/:page": {
      get: {
        "x-swagger-router-controller": "contents",
        operationId: "contents-art-form-feed",
        summary: "Get all contents by artForm",
        description: "Get all content by artForm with pagination",
        tags: ["Content"],
        parameters: [],
        responses: {
          200: {
            description: "Content fetched successfully",
            name: "body",
            in: "body",
            required: true,
            schema: {
              type: "object",
              properties: {
                data: {
                  type: "object",
                  properties: {
                    success: {
                      type: "booleon",
                      example: true,
                    },
                    code: {
                      type: "number",
                      example: 200,
                    },
                    data: {
                      properties: {
                        per_page: {
                          type: "number",
                          example: 10,
                        },
                        total: {
                          type: "number",
                          example: 42,
                        },
                        total_pages: {
                          type: "number",
                          example: 4,
                        },
                        data: {
                          type: "array",
                          items: {
                            properties: {
                              parentContent: {
                                type: "object",
                              },
                              user: {
                                type: "object",
                              },
                              _id: {
                                type: "string",
                                example: "5e51489c01a9f50461ae7bf4",
                              },
                              contentUserId: {
                                type: "string",
                                example: "5e51354eb2f340002b4cb87a",
                              },
                              contentTitle: {
                                type: "string",
                                example: "Awesome paintings",
                              },
                              contentDescription: {
                                type: "string",
                                example: "this is my cool art",
                              },
                              contentImage: {
                                type: "string",
                                example: "I am an image",
                              },
                              contentType: {
                                type: "string",
                                example: "Contribution",
                              },
                            },
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
          500: {
            description: "An error has occured",
          },
        },
      },
    },
    "/api/v1/content/feed/subject/:subject/limit/:limit/page/:page": {
      get: {
        "x-swagger-router-controller": "contents",
        operationId: "contents-subject-feed",
        summary: "Get all contents by subject",
        description: "Get all content by subject with pagination",
        tags: ["Content"],
        parameters: [],
        responses: {
          200: {
            description: "Content fetched successfully",
            name: "body",
            in: "body",
            required: true,
            schema: {
              type: "object",
              properties: {
                data: {
                  type: "object",
                  properties: {
                    success: {
                      type: "booleon",
                      example: true,
                    },
                    code: {
                      type: "number",
                      example: 200,
                    },
                    data: {
                      properties: {
                        per_page: {
                          type: "number",
                          example: 10,
                        },
                        total: {
                          type: "number",
                          example: 42,
                        },
                        total_pages: {
                          type: "number",
                          example: 4,
                        },
                        data: {
                          type: "array",
                          items: {
                            properties: {
                              parentContent: {
                                type: "object",
                              },
                              user: {
                                type: "object",
                              },
                              _id: {
                                type: "string",
                                example: "5e51489c01a9f50461ae7bf4",
                              },
                              contentUserId: {
                                type: "string",
                                example: "5e51354eb2f340002b4cb87a",
                              },
                              contentTitle: {
                                type: "string",
                                example: "Awesome paintings",
                              },
                              contentDescription: {
                                type: "string",
                                example: "this is my cool art",
                              },
                              contentImage: {
                                type: "string",
                                example: "I am an image",
                              },
                              contentType: {
                                type: "string",
                                example: "Contribution",
                              },
                            },
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
          500: {
            description: "An error has occured",
          },
        },
      },
    },
    "/api/v1/content/explore/passionId/:passion/limit/:limit/page/:page": {
      get: {
        "x-swagger-router-controller": "contents",
        operationId: "contents-user-explore-passion-feed",
        summary: "Get all contents by passion id",
        description: "Get all content by passion id with pagination",
        tags: ["Content"],
        parameters: [],
        responses: {
          200: {
            description: "Content fetched successfully",
            name: "body",
            in: "body",
            required: true,
            schema: {
              type: "object",
              properties: {
                data: {
                  type: "object",
                  properties: {
                    success: {
                      type: "booleon",
                      example: true,
                    },
                    code: {
                      type: "number",
                      example: 200,
                    },
                    data: {
                      properties: {
                        per_page: {
                          type: "number",
                          example: 10,
                        },
                        total: {
                          type: "number",
                          example: 42,
                        },
                        total_pages: {
                          type: "number",
                          example: 4,
                        },
                        data: {
                          type: "array",
                          items: {
                            properties: {
                              parentContent: {
                                type: "object",
                              },
                              user: {
                                type: "object",
                              },
                              _id: {
                                type: "string",
                                example: "5e51489c01a9f50461ae7bf4",
                              },
                              contentUserId: {
                                type: "string",
                                example: "5e51354eb2f340002b4cb87a",
                              },
                              contentTitle: {
                                type: "string",
                                example: "Awesome paintings",
                              },
                              contentDescription: {
                                type: "string",
                                example: "this is my cool art",
                              },
                              contentImage: {
                                type: "string",
                                example: "I am an image",
                              },
                              contentType: {
                                type: "string",
                                example: "Contribution",
                              },
                            },
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
          500: {
            description: "An error has occured",
          },
        },
      },
    },
    "/api/v1/content/explore/passionId/:passion/columnId/:column/limit/:limit/page/:page":
      {
        get: {
          "x-swagger-router-controller": "contents",
          operationId: "contents-user-explore-passion-column-feed",
          summary: "Get all contents by passion id and column id",
          description:
            "Get all content by passion id and column id with pagination",
          tags: ["Content"],
          parameters: [],
          responses: {
            200: {
              description: "Content fetched successfully",
              name: "body",
              in: "body",
              required: true,
              schema: {
                type: "object",
                properties: {
                  data: {
                    type: "object",
                    properties: {
                      success: {
                        type: "booleon",
                        example: true,
                      },
                      code: {
                        type: "number",
                        example: 200,
                      },
                      data: {
                        properties: {
                          per_page: {
                            type: "number",
                            example: 10,
                          },
                          total: {
                            type: "number",
                            example: 42,
                          },
                          total_pages: {
                            type: "number",
                            example: 4,
                          },
                          data: {
                            type: "array",
                            items: {
                              properties: {
                                parentContent: {
                                  type: "object",
                                },
                                user: {
                                  type: "object",
                                },
                                _id: {
                                  type: "string",
                                  example: "5e51489c01a9f50461ae7bf4",
                                },
                                contentUserId: {
                                  type: "string",
                                  example: "5e51354eb2f340002b4cb87a",
                                },
                                contentTitle: {
                                  type: "string",
                                  example: "Awesome paintings",
                                },
                                contentDescription: {
                                  type: "string",
                                  example: "this is my cool art",
                                },
                                contentImage: {
                                  type: "string",
                                  example: "I am an image",
                                },
                                contentType: {
                                  type: "string",
                                  example: "Contribution",
                                },
                              },
                            },
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
            500: {
              description: "An error has occured",
            },
          },
        },
      },
    "/api/v1/content/feed/user/subscription/limit/:limit/page/:page": {
      get: {
        "x-swagger-router-controller": "contents",
        operationId: "contents-user-subscription-feed",
        summary: "Get all contents based on user subscriptions",
        description: "Get all contents based on user subscriptions",
        tags: ["Content"],
        parameters: [],
        responses: {
          200: {
            description: "Content fetched successfully",
            name: "body",
            in: "body",
            required: true,
            schema: {
              type: "object",
              properties: {
                data: {
                  type: "object",
                  properties: {
                    success: {
                      type: "booleon",
                      example: true,
                    },
                    code: {
                      type: "number",
                      example: 200,
                    },
                    data: {
                      properties: {
                        per_page: {
                          type: "number",
                          example: 10,
                        },
                        total: {
                          type: "number",
                          example: 42,
                        },
                        total_pages: {
                          type: "number",
                          example: 4,
                        },
                        data: {
                          type: "array",
                          items: {
                            properties: {
                              parentContent: {
                                type: "object",
                              },
                              user: {
                                type: "object",
                              },
                              _id: {
                                type: "string",
                                example: "5e51489c01a9f50461ae7bf4",
                              },
                              contentUserId: {
                                type: "string",
                                example: "5e51354eb2f340002b4cb87a",
                              },
                              contentTitle: {
                                type: "string",
                                example: "Awesome paintings",
                              },
                              contentDescription: {
                                type: "string",
                                example: "this is my cool art",
                              },
                              contentImage: {
                                type: "string",
                                example: "I am an image",
                              },
                              contentType: {
                                type: "string",
                                example: "Contribution",
                              },
                            },
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
          500: {
            description: "An error has occured",
          },
        },
      },
    },
    "/api/v1/content/contribution/new": {
      post: {
        "x-swagger-router-controller": "contents",
        operationId: "contents-contribution-new",
        summary: "Add content contribution",
        description: "Create new content contribution",
        tags: ["Content"],
        description: `[Content creation link](${
          process.env.URL_BACKEND +
          ":" +
          process.env.URL_BACKEND_PORT +
          "/api/v1/content/contribution/new"
        })`,
        parameters: [
          {
            in: "header",
            name: "Authorization",
            required: true,
            description: "Authorization bearer token",
            example:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c",
            schema: {
              type: "string",
            },
          },
          {
            name: "body",
            in: "body",
            required: true,
            schema: {
              type: "object",
              properties: {
                contentUserId: {
                  type: "string",
                  example: "5e51354eb2f340002b4cb87a",
                },
                columnId: {
                  type: "string",
                  example: "5e51354eb2f340002b4cb87a",
                },
                artForms: {
                  type: "array",
                  example: ["hello"],
                },
                subject: {
                  type: "string",
                  example: "trending",
                },
                contentDescription: {
                  type: "string",
                  example: "Awesome paintings",
                },
                contentTag: {
                  type: "string",
                  example: "this is my cool art",
                },
                file: {
                  type: "Binary",
                  example: "...",
                },
              },
            },
          },
        ],
        responses: {
          406: {
            description: "Account validation",
            name: "body",
            in: "body",
            required: true,
            schema: {
              type: "object",
              properties: {
                data: {
                  type: "object",
                  properties: {
                    success: {
                      type: "booleon",
                      example: true,
                    },
                    code: {
                      type: "number",
                      example: 406,
                    },
                    data: {
                      properties: {
                        msg: {
                          type: "string",
                          example: "Account does not exists",
                        },
                      },
                    },
                  },
                },
              },
            },
          },
          200: {
            description: "ContentContribution created successfully",
            name: "body",
            in: "body",
            required: true,
            schema: {
              type: "object",
              properties: {
                data: {
                  type: "object",
                  properties: {
                    success: {
                      type: "booleon",
                      example: true,
                    },
                    code: {
                      type: "number",
                      example: 200,
                    },
                    data: {
                      properties: {
                        msg: {
                          type: "string",
                          example: "Content created with success",
                        },
                      },
                    },
                  },
                },
              },
            },
          },
          500: {
            description: "An error has occured",
          },
        },
      },
    },
    "/api/v1/content/contribution/edit": {
      post: {
        "x-swagger-router-controller": "contents",
        operationId: "contents-contribution-edit",
        summary: "Edit content contribution",
        description: "Edit content contribution",
        tags: ["Content"],
        parameters: [
          {
            name: "body",
            in: "body",
            required: true,
            schema: {
              type: "object",
              properties: {
                contentId: {
                  type: "string",
                  example: "5e51354eb2f340002b4nb43a",
                },
                contentUserId: {
                  type: "string",
                  example: "5e51354eb2f340002b4cb87a",
                },
                contentDescription: {
                  type: "string",
                  example: "Awesome paintings",
                },
                contentTag: {
                  type: "string",
                  example: "this is my cool art",
                },
                file: {
                  type: "Binary",
                  example: "...",
                },
                artForms: {
                  type: "array",
                  example: ["hello"],
                },
                subject: {
                  type: "string",
                  example: "trending",
                },
              },
            },
          },
        ],
        responses: {
          200: {
            description: "Content Contribution edit successfully",
            name: "body",
            in: "body",
            required: true,
            schema: {
              type: "object",
              properties: {
                data: {
                  type: "object",
                  properties: {
                    success: {
                      type: "booleon",
                      example: true,
                    },
                    code: {
                      type: "number",
                      example: 200,
                    },
                    data: {
                      properties: {
                        contentId: {
                          type: "string",
                          example: "5e51354eb2f340002b4nb43a",
                        },
                        contentUserId: {
                          type: "string",
                          example: "5e51354eb2f340002b4cb87a",
                        },
                        contentDescription: {
                          type: "string",
                          example: "Awesome paintings",
                        },
                        contentTag: {
                          type: "string",
                          example: "this is my cool art",
                        },
                        file: {
                          type: "Binary",
                          example: "...",
                        },
                        subject: {
                          type: "string",
                          example: "subject",
                        },
                        artForms: {
                          type: "object",
                          properties: {
                            titles: {
                              type: "array",
                              example: ["films"],
                            },
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
          406: {
            description: "Account validation Or Content Dont Exisits",
            name: "body",
            in: "body",
            required: true,
            schema: {
              type: "object",
              properties: {
                data: {
                  type: "object",
                  properties: {
                    success: {
                      type: "booleon",
                      example: true,
                    },
                    code: {
                      type: "number",
                      example: 406,
                    },
                    data: {
                      properties: {
                        msg: {
                          type: "string",
                          example: "Account does not exists",
                        },
                      },
                    },
                  },
                },
              },
            },
          },
          500: {
            description: "An error has occured",
          },
        },
      },
    },
    "/api/v1/content/contribution/all/limit/:limit/page/:page/user/:userId": {
      get: {
        "x-swagger-router-controller": "contents",
        operationId: "contents-get-contribution-of-user-all",
        summary: "Get content contributions of user",
        description: "Get all content contributions of user by pagination",
        tags: ["Content"],
        parameters: [],
        responses: {
          200: {
            description: "Content Contribution fetched successfully",
            name: "body",
            in: "body",
            required: true,
            schema: {
              type: "object",
              properties: {
                data: {
                  type: "object",
                  properties: {
                    success: {
                      type: "booleon",
                      example: true,
                    },
                    code: {
                      type: "number",
                      example: 200,
                    },
                    data: {
                      properties: {
                        per_page: {
                          type: "number",
                          example: 10,
                        },
                        total: {
                          type: "number",
                          example: 42,
                        },
                        total_pages: {
                          type: "number",
                          example: 4,
                        },
                        data: {
                          type: "array",
                          items: {
                            properties: {
                              contentDeleted: {
                                type: "booleon",
                                example: false,
                              },
                              _id: {
                                type: "string",
                                example: "5e51489c01a9f50461ae7bf4",
                              },
                              contentUserId: {
                                type: "string",
                                example: "5e51354eb2f340002b4cb87a",
                              },
                              contentText: {
                                type: "string",
                                example: "Awesome paintings",
                              },
                              contentTag: {
                                type: "string",
                                example: "this is my cool art",
                              },
                              contentImage: {
                                type: "string",
                                example: "I am an image",
                              },
                            },
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
          500: {
            description: "An error has occured",
          },
        },
      },
    },
    "/api/v1/content/contribution/all/tag/limit/:limit/page/:page": {
      post: {
        "x-swagger-router-controller": "contents",
        operationId: "contents-contribution-tags",
        summary: "Get content contribution by tag name",
        description: "Get content contribution by tag name",
        tags: ["Content"],
        parameters: [
          {
            name: "body",
            in: "body",
            required: true,
            schema: {
              type: "object",
              properties: {
                userId: {
                  type: "string",
                  example: "5e51354eb2f340002b4cb87a",
                },
                contentTag: {
                  type: "string",
                  example: "#Subject",
                },
              },
            },
          },
        ],
        responses: {
          200: {
            description: "ContentContribution created successfully",
            name: "body",
            in: "body",
            required: true,
            schema: {
              type: "object",
              properties: {
                data: {
                  type: "object",
                  properties: {
                    per_page: {
                      type: "number",
                      example: 10,
                    },
                    total: {
                      type: "number",
                      example: 42,
                    },
                    total_pages: {
                      type: "number",
                      example: 4,
                    },
                    data: {
                      type: "array",
                      items: {
                        properties: {
                          parentContent: {
                            type: "object",
                            example: {},
                          },
                          contentDeleted: {
                            type: "booleon",
                            example: false,
                          },
                          _id: {
                            type: "string",
                            example: "5e51489c01a9f50461ae7bf4",
                          },
                          user: {
                            type: "object",
                            example: {},
                          },
                          contentDescription: {
                            type: "string",
                            example: "this is my cool art",
                          },
                          contentTag: {
                            type: "string",
                            example: "#Subject",
                          },
                          contentImage: {
                            type: "string",
                            example: "I am an image",
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
          500: {
            description: "An error has occured",
          },
        },
      },
    },
    "/api/v1/content/work/new": {
      post: {
        "x-swagger-router-controller": "contents",
        operationId: "contents-work-new",
        summary: "Add content work",
        description: "Create new content work",
        tags: ["Content"],
        description: `[Content creation link](${
          process.env.URL_BACKEND +
          ":" +
          process.env.URL_BACKEND_PORT +
          "/api/v1/content/work/new"
        })`,
        parameters: [
          {
            name: "body",
            in: "body",
            required: true,
            schema: {
              type: "object",
              properties: {
                contentUserId: {
                  type: "string",
                  example: "5e51354eb2f340002b4cb87a",
                },
                contentTitle: {
                  type: "string",
                  example: "Awesome paintings",
                },
                contentDescription: {
                  type: "string",
                  example: "this is my cool art",
                },
                file: {
                  type: "Binary",
                  example: "...",
                },
                contentArtist: {
                  type: "string",
                  example: "I am an artist",
                },
              },
            },
          },
        ],
        responses: {
          406: {
            description: "Account validation",
            name: "body",
            in: "body",
            required: true,
            schema: {
              type: "object",
              properties: {
                data: {
                  type: "object",
                  properties: {
                    success: {
                      type: "booleon",
                      example: true,
                    },
                    code: {
                      type: "number",
                      example: 406,
                    },
                    data: {
                      properties: {
                        msg: {
                          type: "string",
                          example: "Account does not exists",
                        },
                      },
                    },
                  },
                },
              },
            },
          },
          200: {
            description: "ContentWork created successfully",
            name: "body",
            in: "body",
            required: true,
            schema: {
              type: "object",
              properties: {
                data: {
                  type: "object",
                  properties: {
                    success: {
                      type: "booleon",
                      example: true,
                    },
                    code: {
                      type: "number",
                      example: 200,
                    },
                    data: {
                      properties: {
                        msg: {
                          type: "string",
                          example: "ContentWork created with success",
                        },
                      },
                    },
                  },
                },
              },
            },
          },
          500: {
            description: "An error has occured",
          },
        },
      },
    },
    "/api/v1/content/reaction/new": {
      post: {
        "x-swagger-router-controller": "contents",
        operationId: "contents-reaction-new",
        summary: "Add content reaction",
        description: "Create new content reaction",
        tags: ["Content"],
        parameters: [
          {
            name: "body",
            in: "body",
            required: true,
            schema: {
              type: "object",
              properties: {
                data: {
                  type: "object",
                  properties: {
                    userId: {
                      type: "string",
                      example: "5e51354eb2f340002b4cb87a",
                    },
                    contentId: {
                      type: "string",
                      example: "A5e51354eb2f340002b4cb87a",
                    },
                    contentDescription: {
                      type: "string",
                      example: "this is my cool reaction",
                    },
                    contentImage: {
                      type: "Binary",
                      example: "...",
                    },
                    contentTag: {
                      type: "string",
                      example: "tags",
                    },
                    typeOfReaction: {
                      type: "string",
                      example: "",
                    },
                  },
                },
              },
            },
          },
        ],
        responses: {
          406: {
            description: "Account validation",
            name: "body",
            in: "body",
            required: true,
            schema: {
              type: "object",
              properties: {
                data: {
                  type: "object",
                  properties: {
                    success: {
                      type: "booleon",
                      example: true,
                    },
                    code: {
                      type: "number",
                      example: 406,
                    },
                    data: {
                      properties: {
                        msg: {
                          type: "string",
                          example: "Account does not exists",
                        },
                      },
                    },
                  },
                },
              },
            },
          },
          200: {
            description: "Content reaction created successfully",
            name: "body",
            in: "body",
            required: true,
            schema: {
              type: "object",
              properties: {
                data: {
                  type: "object",
                  properties: {
                    success: {
                      type: "booleon",
                      example: true,
                    },
                    code: {
                      type: "number",
                      example: 200,
                    },
                    data: {
                      properties: {
                        msg: {
                          type: "string",
                          example: "Content(Reaction) created with success",
                        },
                      },
                    },
                  },
                },
              },
            },
          },
          500: {
            description: "An error has occured",
          },
        },
      },
    },
    "/api/v1/content/reaction/list/contentId/:contentId/limit/:limit/page/:page":
      {
        get: {
          "x-swagger-router-controller": "contents",
          operationId: "reaction lists by content Id",
          summary: "get reaction list by content id",
          description: "Get reactions list by content id",
          tags: ["Content"],
          parameters: [],
          responses: {
            200: {
              description: "Reaction list fetched successfully",
              name: "body",
              in: "body",
              required: true,
              schema: {
                type: "object",
                properties: {
                  data: {
                    type: "object",
                    properties: {
                      success: {
                        type: "booleon",
                        example: true,
                      },
                      code: {
                        type: "number",
                        example: 200,
                      },
                      data: {
                        type: "object",
                        properties: {
                          per_page: {
                            type: "number",
                            example: 10,
                          },
                          total: {
                            type: "number",
                            example: 42,
                          },
                          total_pages: {
                            type: "number",
                            example: 4,
                          },
                          data: {
                            type: "array",
                            items: {
                              properties: {
                                _id: {
                                  type: "String",
                                  example: "",
                                },
                                user: {
                                  type: "object",
                                  example: {},
                                },
                                parentContent: {
                                  type: "String",
                                  example: "",
                                },
                                contentDescription: {
                                  type: "String",
                                  example: "",
                                },
                                contentTag: {
                                  type: "String",
                                  example: "",
                                },
                                contentImage: {
                                  type: "String",
                                  example: "",
                                },
                                typeOfReaction: {
                                  type: "String",
                                  example: "",
                                },
                              },
                            },
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
            500: {
              description: "An error has occured",
            },
          },
        },
      },
    "/api/v1/content/reaction/list/userId/:userId": {
      get: {
        "x-swagger-router-controller": "contents",
        operationId: "reaction lists by user Id",
        summary: "get reaction lists by user id",
        description: "Get reactions list by user id",
        tags: ["Content"],
        parameters: [],
        responses: {
          200: {
            description: "Reaction list fetched successfully",
            name: "body",
            in: "body",
            required: true,
            schema: {
              type: "object",
              properties: {
                data: {
                  type: "object",
                  properties: {
                    success: {
                      type: "booleon",
                      example: true,
                    },
                    code: {
                      type: "number",
                      example: 200,
                    },
                    data: {
                      properties: {
                        _id: {
                          type: "String",
                          example: "",
                        },
                        user: {
                          type: "String",
                          example: "",
                        },
                        contentDescription: {
                          type: "String",
                          example: "",
                        },
                        contentTag: {
                          type: "String",
                          example: "",
                        },
                        contentImage: {
                          type: "String",
                          example: "",
                        },
                        typeOfReaction: {
                          type: "String",
                          example: "",
                        },
                      },
                    },
                  },
                },
              },
            },
          },
          500: {
            description: "An error has occured",
          },
        },
      },
    },
    "/api/v1/content/promotion/new": {
      post: {
        "x-swagger-router-controller": "contents",
        operationId: "contents-promotion-new",
        summary: "Add content promotion",
        description: "Create new content promotion",
        tags: ["Content"],
        parameters: [
          {
            name: "body",
            in: "body",
            required: true,
            schema: {
              type: "object",
              properties: {
                data: {
                  type: "object",
                  properties: {
                    userId: {
                      type: "string",
                      example: "5e51354eb2f340002b4cb87a",
                    },
                    contentId: {
                      type: "string",
                      example: "5e51354eb2f340002b4cb87a",
                    },
                    contentDescription: {
                      type: "string",
                      example: "this is my cool",
                    },
                  },
                },
              },
            },
          },
        ],
        responses: {
          406: {
            description: "Account validation",
            name: "body",
            in: "body",
            required: true,
            schema: {
              type: "object",
              properties: {
                data: {
                  type: "object",
                  properties: {
                    success: {
                      type: "booleon",
                      example: true,
                    },
                    code: {
                      type: "number",
                      example: 406,
                    },
                    data: {
                      properties: {
                        msg: {
                          type: "string",
                          example: "Account does not exists",
                        },
                      },
                    },
                  },
                },
              },
            },
          },
          200: {
            description: "Content promotion created successfully",
            name: "body",
            in: "body",
            required: true,
            schema: {
              type: "object",
              properties: {
                data: {
                  type: "object",
                  properties: {
                    success: {
                      type: "booleon",
                      example: true,
                    },
                    code: {
                      type: "number",
                      example: 200,
                    },
                    data: {
                      properties: {
                        msg: {
                          type: "string",
                          example: "Content Promotion created with success",
                        },
                      },
                    },
                  },
                },
              },
            },
          },
          500: {
            description: "An error has occured",
          },
        },
      },
    },
    "/api/v1/content/works": {
      get: {
        "x-swagger-router-controller": "contents",
        operationId: "contents-work",
        summary:
          "Fetch all content by pagination and category for HomePage Page",
        description:
          "Fetch all content by pagination and category for HomePage Page",
        tags: ["Content"],
        parameters: [
          {
            in: "query",
            name: "page",
            schema: {
              type: "integer",
            },
            description: "The number of page",
          },
          {
            in: "query",
            name: "limit",
            schema: {
              type: "integer",
            },
            description:
              "The number of items to skip before starting to collect the result set",
          },
          {
            in: "query",
            name: "category",
            schema: {
              type: "string",
            },
            description: "Category of content",
          },
        ],
        responses: {
          200: {
            description: "ContentContribution fetched successfully",
            name: "body",
            in: "body",
            required: true,
            schema: {
              type: "object",
              properties: {
                data: {
                  type: "object",
                  properties: {
                    success: {
                      type: "booleon",
                      example: true,
                    },
                    code: {
                      type: "number",
                      example: 200,
                    },
                    data: {
                      properties: {
                        per_page: {
                          type: "number",
                          example: 10,
                        },
                        total: {
                          type: "number",
                          example: 42,
                        },
                        total_pages: {
                          type: "number",
                          example: 4,
                        },
                        data: {
                          type: "array",
                          items: {
                            properties: {
                              contentDeleted: {
                                type: "booleon",
                                example: false,
                              },
                              _id: {
                                type: "string",
                                example: "5e51489c01a9f50461ae7bf4",
                              },
                              contentUserId: {
                                type: "string",
                                example: "5e51354eb2f340002b4cb87a",
                              },
                              contentTitle: {
                                type: "string",
                                example: "Awesome paintings",
                              },
                              contentDescription: {
                                type: "string",
                                example: "this is my cool art",
                              },
                              contentArtist: {
                                type: "string",
                                example: "I am an artist",
                              },
                              contentImage: {
                                type: "string",
                                example: "I am an image",
                              },
                              revealedBy: {
                                type: "string",
                                example: null,
                              },
                            },
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
          500: {
            description: "An error has occured",
          },
        },
      },
    },
    "/api/v1/content/revealedWorks": {
      get: {
        "x-swagger-router-controller": "contents",
        operationId: "contents-revealedwork",
        summary:
          "Fetch all content by pagination and category for Publication Page",
        description:
          "Fetch all content by pagination and category for Publication Page",
        tags: ["Content"],
        parameters: [
          {
            in: "query",
            name: "page",
            schema: {
              type: "integer",
            },
            description: "The number of page",
          },
          {
            in: "query",
            name: "limit",
            schema: {
              type: "integer",
            },
            description:
              "The number of items to skip before starting to collect the result set",
          },
          {
            in: "query",
            name: "category",
            schema: {
              type: "string",
            },
            description: "Category of content",
          },
        ],
        responses: {
          200: {
            description: "ContentContribution fetched successfully",
            name: "body",
            in: "body",
            required: true,
            schema: {
              type: "object",
              properties: {
                data: {
                  type: "object",
                  properties: {
                    success: {
                      type: "booleon",
                      example: true,
                    },
                    code: {
                      type: "number",
                      example: 200,
                    },
                    data: {
                      properties: {
                        per_page: {
                          type: "number",
                          example: 10,
                        },
                        total: {
                          type: "number",
                          example: 42,
                        },
                        total_pages: {
                          type: "number",
                          example: 4,
                        },
                        data: {
                          type: "array",
                          items: {
                            properties: {
                              contentDeleted: {
                                type: "booleon",
                                example: false,
                              },
                              _id: {
                                type: "string",
                                example: "5e51489c01a9f50461ae7bf4",
                              },
                              contentUserId: {
                                type: "string",
                                example: "5e51354eb2f340002b4cb87a",
                              },
                              contentTitle: {
                                type: "string",
                                example: "Awesome paintings",
                              },
                              contentDescription: {
                                type: "string",
                                example: "this is my cool art",
                              },
                              contentArtist: {
                                type: "string",
                                example: "I am an artist",
                              },
                              contentImage: {
                                type: "string",
                                example: "I am an image",
                              },
                              revealedBy: {
                                type: "string",
                                example: "610289f176316e27679361dd",
                              },
                            },
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
          500: {
            description: "An error has occured",
          },
        },
      },
    },
    "/work/userId/{userId}/reveal/{contentId}": {
      put: {
        "x-swagger-router-controller": "contents",
        operationId: "contents-revealed",
        summary: "update Revealed Content By ID",
        description: "update Revealed Content By ID",
        tags: ["Content"],
        parameters: [
          {
            name: "userId",
            example: "60a54cfd66c43d743c8f3992",
            in: "path",
            required: true,
            description: "ID of user",
            schema: {
              type: "string",
            },
          },
          {
            name: "contentId",
            example: "60a54cfd66c43d743c8f3992",
            in: "path",
            required: true,
            description: "ID of content",
            schema: {
              type: "string",
            },
          },
        ],
        responses: {
          406: {
            description: "Account validation",
            name: "body",
            in: "body",
            required: true,
            schema: {
              type: "object",
              properties: {
                data: {
                  type: "object",
                  properties: {
                    success: {
                      type: "booleon",
                      example: true,
                    },
                    code: {
                      type: "number",
                      example: 406,
                    },
                    data: {
                      properties: {
                        msg: {
                          type: "string",
                          example:
                            "You dont have access to revealed the content",
                        },
                      },
                    },
                  },
                },
              },
            },
          },
          200: {
            description: "Content promotion created successfully",
            name: "body",
            in: "body",
            required: true,
            schema: {
              type: "object",
              properties: {
                data: {
                  type: "object",
                  properties: {
                    success: {
                      type: "booleon",
                      example: true,
                    },
                    code: {
                      type: "number",
                      example: 200,
                    },
                    data: {
                      properties: {
                        msg: {
                          type: "string",
                          example: "Content revealed",
                        },
                      },
                    },
                  },
                },
              },
            },
          },
          500: {
            description: "An error has occured",
          },
        },
      },
    },
    "/api/v1/content/promotion/list/userId/:userId": {
      get: {
        "x-swagger-router-controller": "contents",
        operationId: "promotion lists by user Id",
        summary: "get promotion lists by user id",
        description: "Get promotion list by user id",
        tags: ["Content"],
        parameters: [],
        responses: {
          200: {
            description: "Promotion list fetched successfully",
            name: "body",
            in: "body",
            required: true,
            schema: {
              type: "object",
              properties: {
                data: {
                  type: "object",
                  properties: {
                    success: {
                      type: "booleon",
                      example: true,
                    },
                    code: {
                      type: "number",
                      example: 200,
                    },
                    data: {
                      properties: {
                        _id: {
                          type: "String",
                          example: "",
                        },
                        user: {
                          type: "String",
                          example: "",
                        },
                        contentDescription: {
                          type: "String",
                          example: "",
                        },
                      },
                    },
                  },
                },
              },
            },
          },
          500: {
            description: "An error has occured",
          },
        },
      },
    },
    "/api/v1/content/work/all/limit/:limit/page/:page/userId/:userId": {
      get: {
        "x-swagger-router-controller": "contents",
        operationId: "contents-work-get-all",
        summary: "Get content works",
        description: "Get all content works by pagination",
        tags: ["Content"],
        description: `[Content fetch link](${
          process.env.URL_BACKEND +
          ":" +
          process.env.URL_BACKEND_PORT +
          "/api/v1/content/work/all/limit/:limit/page/:page"
        })`,
        parameters: [],
        responses: {
          200: {
            description: "ContentContribution fetched successfully",
            name: "body",
            in: "body",
            required: true,
            schema: {
              type: "object",
              properties: {
                data: {
                  type: "object",
                  properties: {
                    success: {
                      type: "booleon",
                      example: true,
                    },
                    code: {
                      type: "number",
                      example: 200,
                    },
                    data: {
                      properties: {
                        per_page: {
                          type: "number",
                          example: 10,
                        },
                        total: {
                          type: "number",
                          example: 42,
                        },
                        total_pages: {
                          type: "number",
                          example: 4,
                        },
                        data: {
                          type: "array",
                          items: {
                            properties: {
                              contentDeleted: {
                                type: "booleon",
                                example: false,
                              },
                              _id: {
                                type: "string",
                                example: "5e51489c01a9f50461ae7bf4",
                              },
                              contentUserId: {
                                type: "string",
                                example: "5e51354eb2f340002b4cb87a",
                              },
                              contentTitle: {
                                type: "string",
                                example: "Awesome paintings",
                              },
                              contentDescription: {
                                type: "string",
                                example: "this is my cool art",
                              },
                              contentArtist: {
                                type: "string",
                                example: "I am an artist",
                              },
                              contentImage: {
                                type: "string",
                                example: "I am an image",
                              },
                            },
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
          500: {
            description: "An error has occured",
          },
        },
      },
    },
    "/api/v1/content/contribution/contentId/:contentId/user/:userId": {
      delete: {
        "x-swagger-router-controller": "contents",
        operationId: "contents-contribution-delete",
        summary: "Delete content contribution",
        description: "Delete content contribution by contentid and user id",
        tags: ["Content"],
        parameters: [],
        responses: {
          200: {
            description: "Contribution deleted successfully",
            name: "body",
            in: "body",
            required: true,
            schema: {
              type: "object",
              properties: {
                data: {
                  type: "object",
                  properties: {
                    success: {
                      type: "booleon",
                      example: true,
                    },
                    code: {
                      type: "number",
                      example: 200,
                    },
                    data: {
                      properties: {
                        msg: {
                          type: "string",
                          example: "Contribution is deleted succesffully",
                        },
                      },
                    },
                  },
                },
              },
            },
          },
          406: {
            description: "Invalid content",
          },
          500: {
            description: "An error has occured",
          },
        },
      },
    },
    "/api/v1/content/work/contentId/:contentId/user/:userId": {
      delete: {
        "x-swagger-router-controller": "contents",
        operationId: "contents-work-delete",
        summary: "Delete content work",
        description: "Delete content work by contentid and user id",
        tags: ["Content"],
        parameters: [],
        responses: {
          200: {
            description: "Work deleted successfully",
            name: "body",
            in: "body",
            required: true,
            schema: {
              type: "object",
              properties: {
                data: {
                  type: "object",
                  properties: {
                    success: {
                      type: "booleon",
                      example: true,
                    },
                    code: {
                      type: "number",
                      example: 200,
                    },
                    data: {
                      properties: {
                        msg: {
                          type: "string",
                          example: "Work is deleted succesffully",
                        },
                      },
                    },
                  },
                },
              },
            },
          },
          406: {
            description: "Invalid content",
          },
          500: {
            description: "An error has occured",
          },
        },
      },
    },
    "/api/v1/content/trending/subjects": {
      get: {
        "x-swagger-router-controller": "contents",
        operationId: "contents-trending-subject",
        summary: "Get trending subjects",
        description: "Get trending subjects",
        tags: ["Content"],
        parameters: [],
        responses: {
          200: {
            description: "Subjects fetched successfully",
            name: "body",
            in: "body",
            required: true,
            schema: {
              type: "object",
              properties: {
                data: {
                  type: "object",
                  properties: {
                    success: {
                      type: "booleon",
                      example: true,
                    },
                    code: {
                      type: "number",
                      example: 200,
                    },
                    data: {
                      type: "array",
                      items: ["shakespeare", "etc"],
                    },
                  },
                },
              },
            },
          },
          500: {
            description: "An error has occured",
          },
        },
      },
    },
    "/api/v1/content/work/all/searchphrase/:title": {
      get: {
        "x-swagger-router-controller": "contents",
        operationId: "contents-trending-subject",
        summary: "Get all work by title",
        description: "Get all work by title",
        tags: ["Content"],
        parameters: [],
        responses: {
          200: {
            name: "body",
            in: "body",
            required: true,
            schema: {
              type: "object",
              properties: {
                success: {
                  type: "boolean",
                  example: true,
                },
                code: {
                  type: "number",
                  example: 200,
                },
                contents: {
                  type: "array",
                  items: {
                    properties: {
                      artForms: {
                        type: "object",
                        properties: {
                          ids: {
                            type: "array",
                            example: ["5f0f79202e52812c76ee2fb1"],
                          },
                          titles: {
                            type: "array",
                            example: ["filmmaking"],
                          },
                        },
                      },
                      _id: {
                        type: "string",
                        example: "606a302166c43d743c8f36ff",
                      },
                      contentTitle: {
                        type: "string",
                        example: "Climate change",
                      },
                      contentArtist: {
                        type: "string",
                        example: "Samuel Leslie",
                      },
                      dateOfCreation: {
                        type: "string",
                        example: "2021-04-04T21:31:13.755Z",
                      },
                    },
                  },
                },
              },
            },
          },
          500: {
            description: "An error has occurred",
          },
        },
      },
    },
    "/api/v1/passion/all/limit/:limit/page/:page": {
      get: {
        "x-swagger-router-controller": "passons",
        operationId: "passions",
        summary: "Get passions",
        description: "Get all passions by pagination",
        tags: ["Passion"],
        description: `[Passion fetch link](${
          process.env.URL_BACKEND +
          ":" +
          process.env.URL_BACKEND_PORT +
          "/api/v1/passion/all/limit/:limit/page/:page"
        })`,
        parameters: [],
        responses: {
          200: {
            description: "Passion fetched successfully",
            name: "body",
            in: "body",
            required: true,
            schema: {
              type: "object",
              properties: {
                data: {
                  type: "object",
                  properties: {
                    success: {
                      type: "booleon",
                      example: true,
                    },
                    code: {
                      type: "number",
                      example: 200,
                    },
                    data: {
                      properties: {
                        per_page: {
                          type: "number",
                          example: 10,
                        },
                        total: {
                          type: "number",
                          example: 42,
                        },
                        total_pages: {
                          type: "number",
                          example: 4,
                        },
                        data: {
                          type: "array",
                          items: {
                            properties: {
                              _id: {
                                type: "string",
                                example: "5e51489c01a9f50461ae7bf4",
                              },
                              passionImage: {
                                type: "string",
                                example: "5e51354eb2f340002b4cb87a",
                              },
                              passionTitle: {
                                type: "string",
                                example: "Painting",
                              },
                              passionDescription: {
                                type: "strnig",
                                example: "My passion, my life",
                              },
                              passionDeleted: {
                                type: "booleon",
                                example: false,
                              },
                              dateOfCreation: {
                                type: "string",
                                example: "2020-02-22T21:34:15.843Z",
                              },
                              dateOfLastUpdate: {
                                type: "string",
                                example: "2020-02-22T21:34:15.843Z",
                              },
                            },
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
          500: {
            description: "An error has occured",
          },
        },
      },
    },
    "/api/v1/column/all/limit/:limit/page/:page": {
      get: {
        "x-swagger-router-controller": "columns",
        operationId: "columns",
        summary: "Get columns",
        description: "Get all columns",
        tags: ["Column"],
        parameters: [],
        responses: {
          200: {
            description: "Column fetched successfully",
            name: "body",
            in: "body",
            required: true,
            schema: {
              type: "object",
              properties: {
                data: {
                  type: "object",
                  properties: {
                    success: {
                      type: "booleon",
                      example: true,
                    },
                    code: {
                      type: "number",
                      example: 200,
                    },
                    data: {
                      properties: {
                        per_page: {
                          type: "number",
                          example: 10,
                        },
                        total: {
                          type: "number",
                          example: 42,
                        },
                        total_pages: {
                          type: "number",
                          example: 4,
                        },
                        data: {
                          type: "array",
                          items: {
                            properties: {
                              _id: {
                                type: "string",
                                example: "5e51489c01a9f50461ae7bf4",
                              },
                              title: {
                                type: "string",
                                example: "Column 1",
                              },
                              form: {
                                type: "string",
                                example: "",
                              },
                              dateOfCreation: {
                                type: "string",
                                example: "2020-02-22T21:34:15.843Z",
                              },
                              dateOfLastUpdate: {
                                type: "string",
                                example: "2020-02-22T21:34:15.843Z",
                              },
                            },
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
          500: {
            description: "An error has occured",
          },
        },
      },
    },
    "/api/v1/column/new": {
      post: {
        "x-swagger-router-controller": "columns",
        operationId: "column-new",
        summary: "Add column",
        description: "Create new column",
        tags: ["Column"],
        parameters: [
          {
            name: "body",
            in: "body",
            required: true,
            schema: {
              type: "object",
              properties: {
                data: {
                  type: "object",
                  properties: {
                    userId: {
                      type: "string",
                      example: "5e51354eb2f340002b4cb87a",
                    },
                    title: {
                      type: "string",
                      example: "Column 1",
                    },
                    form: {
                      type: "string",
                      example: "",
                    },
                  },
                },
              },
            },
          },
        ],
        responses: {
          406: {
            description: "Column with same already exists",
            name: "body",
            in: "body",
            required: true,
            schema: {
              type: "object",
              properties: {
                data: {
                  type: "object",
                  properties: {
                    success: {
                      type: "booleon",
                      example: true,
                    },
                    code: {
                      type: "number",
                      example: 406,
                    },
                    data: {
                      properties: {
                        msg: {
                          type: "string",
                          example: "Column with same already exists",
                        },
                      },
                    },
                  },
                },
              },
            },
          },
          200: {
            description: "Column created successfully",
            name: "body",
            in: "body",
            required: true,
            schema: {
              type: "object",
              properties: {
                data: {
                  type: "object",
                  properties: {
                    success: {
                      type: "boolean",
                      example: true,
                    },
                    code: {
                      type: "number",
                      example: 200,
                    },
                    data: {
                      properties: {
                        msg: {
                          type: "string",
                          example: "Column created successfully",
                        },
                      },
                    },
                  },
                },
              },
            },
          },
          500: {
            description: "An error has occured",
          },
        },
      },
    },
    "/api/v1/column/remove": {
      delete: {
        "x-swagger-router-controller": "columns",
        operationId: "column-remove",
        summary: "Remove column",
        description: "Remove column",
        tags: ["Column"],
        parameters: [
          {
            name: "body",
            in: "body",
            required: true,
            schema: {
              type: "object",
              properties: {
                data: {
                  type: "object",
                  properties: {
                    userId: {
                      type: "string",
                      example: "5e51354eb2f340002b4cb87a",
                    },
                    columnId: {
                      type: "string",
                      example: "5e51354eb2f340002b4cb87a",
                    },
                  },
                },
              },
            },
          },
        ],
        responses: {
          404: {
            description: "No column found",
            name: "body",
            in: "body",
            required: true,
            schema: {
              type: "object",
              properties: {
                data: {
                  type: "object",
                  properties: {
                    success: {
                      type: "boolean",
                      example: true,
                    },
                    code: {
                      type: "number",
                      example: 406,
                    },
                    data: {
                      properties: {
                        msg: {
                          type: "string",
                          example: "No column found",
                        },
                      },
                    },
                  },
                },
              },
            },
          },
          200: {
            description: "Column removed successfully",
            name: "body",
            in: "body",
            required: true,
            schema: {
              type: "object",
              properties: {
                data: {
                  type: "object",
                  properties: {
                    success: {
                      type: "boolean",
                      example: true,
                    },
                    code: {
                      type: "number",
                      example: 200,
                    },
                    data: {
                      properties: {
                        msg: {
                          type: "string",
                          example: "Column removed successfully",
                        },
                      },
                    },
                  },
                },
              },
            },
          },
          500: {
            description: "An error has occured",
          },
        },
      },
    },
    "/api/v1/column/promotion/new": {
      post: {
        "x-swagger-router-controller": "columns",
        operationId: "columns-promotion-new",
        summary: "Add column promotion",
        description: "Create new column promotion",
        tags: ["Column"],
        parameters: [
          {
            name: "body",
            in: "body",
            required: true,
            schema: {
              type: "object",
              properties: {
                data: {
                  type: "object",
                  properties: {
                    userId: {
                      type: "string",
                      example: "5e51354eb2f340002b4cb87a",
                    },
                    columnId: {
                      type: "string",
                      example: "5e51354eb2f340002b4cb87a",
                    },
                    columnDescription: {
                      type: "string",
                      example: "this is my cool",
                    },
                  },
                },
              },
            },
          },
        ],
        responses: {
          406: {
            description: "Account validation",
            name: "body",
            in: "body",
            required: true,
            schema: {
              type: "object",
              properties: {
                data: {
                  type: "object",
                  properties: {
                    success: {
                      type: "booleon",
                      example: true,
                    },
                    code: {
                      type: "number",
                      example: 406,
                    },
                    data: {
                      properties: {
                        msg: {
                          type: "string",
                          example: "Account does not exists",
                        },
                      },
                    },
                  },
                },
              },
            },
          },
          200: {
            description: "Column promotion created successfully",
            name: "body",
            in: "body",
            required: true,
            schema: {
              type: "object",
              properties: {
                data: {
                  type: "object",
                  properties: {
                    success: {
                      type: "booleon",
                      example: true,
                    },
                    code: {
                      type: "number",
                      example: 200,
                    },
                    data: {
                      properties: {
                        msg: {
                          type: "string",
                          example: "Column Promotion created with success",
                        },
                      },
                    },
                  },
                },
              },
            },
          },
          500: {
            description: "An error has occured",
          },
        },
      },
    },
    "/api/v1/column/promotion/list": {
      get: {
        "x-swagger-router-controller": "columns",
        operationId: "promotion lists",
        summary: "get promotion lists",
        description: "Get promotion ",
        tags: ["Column"],
        parameters: [],
        responses: {
          200: {
            description: "Promotion list fetched successfully",
            name: "body",
            in: "body",
            required: true,
            schema: {
              type: "object",
              properties: {
                data: {
                  type: "object",
                  properties: {
                    success: {
                      type: "booleon",
                      example: true,
                    },
                    code: {
                      type: "number",
                      example: 200,
                    },
                    data: {
                      properties: {
                        _id: {
                          type: "String",
                          example: "",
                        },
                        contentDescription: {
                          type: "String",
                          example: "",
                        },
                      },
                    },
                  },
                },
              },
            },
          },
          500: {
            description: "An error has occured",
          },
        },
      },
    },
    "/api/v1/column/forms/all/passion/:passionId/limit/:limit/page/:page": {
      get: {
        "x-swagger-router-controller": "columns-forms-list",
        operationId: "columns-forms-list",
        summary: "Get column forms list",
        description: "Get all forms of columns",
        tags: ["Column"],
        parameters: [],
        responses: {
          200: {
            description: "forms fetched successfully",
            name: "body",
            in: "body",
            required: true,
            schema: {
              type: "object",
              properties: {
                data: {
                  type: "object",
                  properties: {
                    success: {
                      type: "booleon",
                      example: true,
                    },
                    code: {
                      type: "number",
                      example: 200,
                    },
                    data: {
                      properties: {
                        per_page: {
                          type: "number",
                          example: 10,
                        },
                        total: {
                          type: "number",
                          example: 42,
                        },
                        total_pages: {
                          type: "number",
                          example: 4,
                        },
                        data: {
                          type: "array",
                          items: {
                            properties: {
                              columns: {
                                type: "integer",
                                example: 4,
                              },
                              form: {
                                type: "string",
                                example: "Poerty",
                              },
                            },
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
          500: {
            description: "An error has occured",
          },
        },
      },
    },
    "/api/v1/column/all/passion/:passionId/form/:form/limit/:limit/page/:page":
      {
        get: {
          "x-swagger-router-controller": "columns-by-passion-and-form",
          operationId: "columns-list-by-passion-and-form",
          summary: "Get column list by passion and form",
          description: "Get column list by passion and form",
          tags: ["Column"],
          parameters: [],
          responses: {
            200: {
              description: "Journls fetched successfully",
              name: "body",
              in: "body",
              required: true,
              schema: {
                type: "object",
                properties: {
                  data: {
                    type: "object",
                    properties: {
                      success: {
                        type: "booleon",
                        example: true,
                      },
                      code: {
                        type: "number",
                        example: 200,
                      },
                      data: {
                        properties: {
                          per_page: {
                            type: "number",
                            example: 10,
                          },
                          total: {
                            type: "number",
                            example: 42,
                          },
                          total_pages: {
                            type: "number",
                            example: 4,
                          },
                          data: {
                            type: "array",
                            items: {
                              properties: {
                                _id: {
                                  type: "string",
                                  example: "5ea3507679e70d466d5b1516",
                                },
                                title: {
                                  type: "string",
                                  example: "My Column",
                                },
                                form: {
                                  type: "string",
                                  example: "Poetry",
                                },
                                user: {
                                  type: "object",
                                },
                                dateOfCreation: {
                                  type: "string",
                                  example: "2020-04-24T20:47:50.248Z",
                                },
                                dateOfLastUpdate: {
                                  type: "string",
                                  example: "2020-04-24T20:47:50.248Z",
                                },
                              },
                            },
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
            500: {
              description: "An error has occured",
            },
          },
        },
      },
    "/api/v1/artforms/all": {
      get: {
        "x-swagger-router-controller": "artForms",
        operationId: "all-artforms",
        summary: "Get All Art Forms",
        description: "Get All Art Forms",
        tags: ["ArtForm"],
        parameters: [],
        responses: {
          200: {
            schema: {
              type: "object",
              properties: {
                success: {
                  type: "boolean",
                  example: true,
                },
                code: {
                  type: "number",
                  example: 200,
                },
                data: {
                  type: "array",
                  items: {
                    properties: {
                      description: {
                        type: "text",
                        example: "",
                      },
                      artFormDeleted: {
                        type: "boolean",
                        example: false,
                      },
                      _id: {
                        type: "string",
                        example: "5ecaa53fc0f45c629bcc0f9a",
                      },
                      title: {
                        type: "string",
                        example: "movie",
                      },
                      dateOfCreation: {
                        type: "string",
                        example: "2020-05-24T16:47:59.965Z",
                      },
                      dateOfLastUpdate: {
                        type: "string",
                        example: "2020-05-24T16:47:59.965Z",
                      },
                    },
                  },
                },
              },
            },
          },
          500: {
            description: "An error has occurred",
          },
        },
      },
    },
    "/api/v1/artforms/search/title/:title": {
      get: {
        "x-swagger-router-controller": "artForms",
        operationId: "search-by-title",
        summary: "Search artfroms by title",
        description: "Search by title",
        tags: ["ArtForm"],
        parameters: [],
        responses: {
          200: {
            description: "",
            name: "body",
            in: "body",
            required: true,
            schema: {
              type: "object",
              properties: {
                success: {
                  type: "booleon",
                  example: true,
                },
                code: {
                  type: "number",
                  example: 200,
                },
                data: {
                  type: "array",
                  items: {
                    properties: {
                      _id: {
                        type: "string",
                        example: "5e51489c01a9f50461ae7bf4",
                      },
                      title: {
                        type: "string",
                        example: "Film",
                      },
                    },
                  },
                },
              },
            },
          },
          500: {
            description: "An error has occured",
          },
        },
      },
    },
    "/api/v1/artforms/activity/user": {
      get: {
        "x-swagger-router-controller": "artForms",
        operationId: "user-activity-artform",
        summary: "User activity art-forms",
        description: "Artforms activity of user",
        tags: ["ArtForm"],
        parameters: [],
        responses: {
          200: {
            description: "",
            name: "body",
            in: "body",
            required: true,
            schema: {
              type: "object",
              properties: {
                success: {
                  type: "booleon",
                  example: true,
                },
                code: {
                  type: "number",
                  example: 200,
                },
                data: {
                  type: "array",
                  items: {
                    properties: {
                      _id: {
                        type: "string",
                        example: "5e51489c01a9f50461ae7bf4",
                      },
                      title: {
                        type: "string",
                        example: "Film",
                      },
                    },
                  },
                },
              },
            },
          },
          500: {
            description: "An error has occured",
          },
        },
      },
    },
    "/api/v1/artforms/artform/works": {
      post: {
        "x-swagger-router-controller": "artForms",
        operationId: "user-activity-artform",
        summary: "User activity art-forms",
        description: "Artforms activity of user",
        tags: ["ArtForm"],
        parameters: [
          {
            name: "body",
            in: "body",
            required: true,
            schema: {
              type: "object",
              properties: {
                title: {
                  type: "string",
                  example: "film",
                },
              },
            },
          },
        ],
        responses: {
          200: {
            description: "Get Works by Artform Title",
            name: "body",
            in: "body",
            required: true,
            schema: {
              type: "object",
              properties: {
                success: {
                  type: "boolean",
                  example: true,
                },
                code: {
                  type: "number",
                  example: 200,
                },
                data: {
                  type: "array",
                  items: {
                    properties: {
                      _id: {
                        type: "string",
                        example: "5e51489c01a9f50461ae7bf4",
                      },
                      contentDeleted: {
                        type: "boolean",
                        example: false,
                      },
                      contentDescription: {
                        type: "string",
                        example: "content description",
                      },
                      contentImage: {
                        type: "string",
                        example: "content image url",
                      },
                      contentTag: {
                        type: "string",
                        example: "undefined",
                      },
                      contentType: {
                        type: "string",
                        example: "Work",
                      },
                      dateOfCreation: {
                        type: "string",
                        example: "2020-02-22T14:06:06.704Z",
                      },
                      dateOfLastUpdate: {
                        type: "string",
                        example: "2020-02-22T14:06:06.704Z",
                      },
                      parentContent: {
                        type: "object",
                      },
                    },
                  },
                },
              },
            },
          },
          500: {
            description: "An error has occured",
          },
        },
      },
    },
    "/api/v1/artforms/artform/:artformId/contents": {
      get: {
        "x-swagger-router-controller": "artForms",
        operationId: "user-activity-artform",
        summary: "User activity art-forms",
        description: "Artforms activity of user",
        tags: ["ArtForm"],
        responses: {
          200: {
            description: "Get contribution contents by Artform Id",
            name: "body",
            in: "body",
            required: true,
            schema: {
              type: "object",
              properties: {
                success: {
                  type: "boolean",
                  example: true,
                },
                code: {
                  type: "number",
                  example: 200,
                },
                data: {
                  type: "array",
                  items: {
                    properties: {
                      _id: {
                        type: "string",
                        example: "5e51354eb2f340002b4nb43a",
                      },
                      user: {
                        type: "string",
                        example: "5e51354eb2f340002b4cb87a",
                      },
                      contentDescription: {
                        type: "string",
                        example: "Awesome paintings",
                      },
                      contentTag: {
                        type: "string",
                        example: "this is my cool art",
                      },
                      parentContent: {
                        type: "string",
                        example: "",
                      },
                      details: {
                        type: "object",
                        example: {},
                      },
                      notes: {
                        type: "array",
                        example: [],
                      },
                      contentDeleted: {
                        type: "boolean",
                        example: false,
                      },
                      subContributions: {
                        type: "array",
                        example: [],
                      },
                      contentImage: {
                        type: "string",
                        example: "uploads/N3xGm6J0a-1617743336093.jpg",
                      },
                      subject: {
                        type: "string",
                        example: "subject",
                      },
                      dateOfLastUpdate: {
                        type: "string",
                        example: "2020-02-22T14:06:06.704Z",
                      },
                      dateOfCreation: {
                        type: "string",
                        example: "2020-02-22T14:06:06.704Z",
                      },

                      artForms: {
                        type: "object",
                        properties: {
                          titles: {
                            type: "array",
                            example: ["films"],
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
          500: {
            description: "An error has occurred",
          },
        },
      },
    },
    "/api/v1/pages/add-page": {
      post: {
        "x-swagger-router-controller": "page",
        operationId: "page-activity-addpage",
        summary: "Page activity add-page",
        description: "Creates a new page",
        tags: ["Page"],
        parameters: [
          {
            in: "header",
            name: "Authorization",
            required: true,
            description: "Authorization bearer token",
            example:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c",
            schema: {
              type: "string",
            },
          },
          {
            name: "body",
            in: "body",
            required: true,
            schema: {
              type: "object",
              properties: {
                title: {
                  type: "string",
                  example: "A New Page",
                },
                category: {
                  type: "string",
                  example: "movies",
                },
                description: {
                  type: "string",
                  example: "some description",
                },
                contributions: {
                  type: "array",
                  example: [
                    "5e7dcc8b8572c77122f46db7",
                    "5e7dcc808572c77122f46db6",
                  ],
                },
                user: {
                  type: "string",
                  example: "5f8acd7ea2b0a80f2c2885a0",
                },
                image: {
                  type: "string",
                  example: "someURL",
                },
              },
            },
          },
        ],
        responses: {
          200: {
            description: "OK",
            name: "body",
            in: "body",
            required: true,
            schema: {
              type: "object",
              properties: {
                status: {
                  type: "string",
                  example: "success",
                },
                message: {
                  type: "string",
                  example: "A new page has been created",
                },
                newPage: {
                  type: "object",
                  properties: {
                    title: {
                      type: "string",
                      example: "Page title",
                    },

                    category: {
                      title: "string",
                      example: "movies",
                    },
                    description: {
                      title: "string",
                      example: "Page description",
                    },
                    image: {
                      title: "string",
                      example: "image url",
                    },
                    contributions: {
                      type: "array",
                      example: [
                        "5e7dcc8b8572c77122f46db7",
                        "5e7dcc808572c77122f46db6",
                      ],
                    },
                    _id: {
                      type: "string",
                      example: "61540a984216fd3f44e24c37",
                    },
                    user: {
                      type: "string",
                      example: "5f8acd7ea2b0a80f2c2885a0",
                    },
                    image: {
                      type: "string",
                      example: "image not found",
                    },

                    __v: {
                      type: "number",
                      example: 0,
                    },
                  },
                },
              },
            },
          },
          404: {
            description: "Page not found",
            name: "body",
            in: "body",
            required: true,
            schema: {
              type: "object",
              properties: {
                status: {
                  type: "string",
                  example: "error",
                },
                message: {
                  type: "string",
                  example: "Some Error",
                },
              },
            },
          },
        },
      },
    },
    "/api/v1/pages/get-page/{category}": {
      get: {
        "x-swagger-router-controller": "page",
        operationId: "page-activity-getpage",
        summary: "Page activity get-page",
        description: "Getting a page",
        tags: ["Page"],
        parameters: [
          {
            name: "category",
            example: "content",
            in: "path",
            required: true,
            description: "category to retreive the page",
            schema: {
              type: "string",
            },
          },
          {
            name: "page",
            example: 1,
            in: "query",
            required: true,
            description: "Page No",
            schema: {
              type: "integer",
            },
          },
          {
            name: "limit",
            example: 10,
            in: "query",
            required: true,
            description: "Limiting the no. of pages",
            schema: {
              type: "integer",
            },
          },
        ],
        responses: {
          200: {
            description: "OK",
            name: "body",
            in: "body",
            required: true,
            schema: {
              type: "object",
              properties: {
                status: {
                  type: "string",
                  example: "success",
                },
                message: {
                  type: "string",
                  example: "Page fetched Successfully",
                },
                page: {
                  type: "array",
                  items: {
                    properties: {
                      title: {
                        type: "string",
                        example: "Page title",
                      },

                      category: {
                        typeOfReaction: "string",
                        example: "movies",
                      },
                      description: {
                        type: "string",
                        example: "Page description",
                      },
                      image: {
                        type: "string",
                        example: "image url",
                      },
                      contributions: {
                        type: "array",
                        items: {
                          properties: {
                            contentDeleted: {
                              type: "boolean",
                              example: false,
                            },
                            _id: {
                              type: "string",
                              example: "61540a984216fd3f44e24c37",
                            },
                            contentDescription: {
                              type: "string",
                              example: "Some description",
                            },
                            contentImage: {
                              type: "string",
                              example: "image url",
                            },
                            contentTag: {
                              type: "string",
                              example: "some tag",
                            },
                            user: {
                              type: "object",
                              properties: {
                                _id: {
                                  type: "string",
                                  example: "61540a984216fd3f44e24c37",
                                },
                                fullname: {
                                  type: "string",
                                  example: "alex smith",
                                },
                                profilePhoto: {
                                  type: "string",
                                  example: "image url",
                                },
                              },
                            },
                          },
                        },
                      },
                      _id: {
                        type: "string",
                        example: "61540a984216fd3f44e24c37",
                      },
                      __v: {
                        type: "number",
                        example: 0,
                      },
                      user: {
                        type: "object",
                        properties: {
                          _id: {
                            type: "string",
                            example: "61540a984216fd3f44e24c37",
                          },
                          fullname: {
                            type: "string",
                            example: "alex smith",
                          },
                          profilePhoto: {
                            type: "string",
                            example: "image url",
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
          404: {
            description: "Error",
            name: "body",
            in: "body",
            required: true,
            schema: {
              type: "object",
              properties: {
                status: {
                  type: "string",
                  example: "error",
                },
                message: {
                  type: "string",
                  example: "Page not found",
                },
              },
            },
          },
        },
      },
    },
    "/api/v1/pages/get-page/user/{userId}?limit={limit}&page={page}": {
      get: {
        "x-swagger-router-controller": "page",
        operationId: "page-activity-getpagebyuser",
        summary: "Page activity get-page-by-user-id",
        description: "Getting a page by user id",
        tags: ["Page"],
        parameters: [
          {
            name: "userId",
            example: "content",
            in: "path",
            required: true,
            description: "userId to retreive the user pages",
            schema: {
              type: "string",
            },
          },
          {
            in: "query",
            name: "limit",
            example: "1",
            required: false,
            description: "limit number of pages per page.",
            schema: {
              type: "number",
            },
          },
          {
            in: "query",
            name: "page",
            example: "1",
            required: false,
            description:
              "number of pages per showing limit number of user pages.",
            schema: {
              type: "number",
            },
          },
        ],
        responses: {
          200: {
            description: "OK",
            name: "body",
            in: "body",
            required: true,
            schema: {
              type: "object",
              properties: {
                status: {
                  type: "string",
                  example: "success",
                },
                message: {
                  type: "string",
                  example: "Pages fetched Successfully",
                },
                page: {
                  type: "array",
                  items: {
                    properties: {
                      title: {
                        type: "string",
                        example: "Page title",
                      },

                      category: {
                        typeOfReaction: "string",
                        example: "movies",
                      },
                      description: {
                        type: "string",
                        example: "Page description",
                      },
                      image: {
                        type: "string",
                        example: "image url",
                      },
                      contributions: {
                        type: "array",
                        items: {
                          properties: {
                            contentDeleted: {
                              type: "boolean",
                              example: false,
                            },
                            _id: {
                              type: "string",
                              example: "61540a984216fd3f44e24c37",
                            },
                            contentDescription: {
                              type: "string",
                              example: "Some description",
                            },
                            contentImage: {
                              type: "string",
                              example: "image url",
                            },
                            contentTag: {
                              type: "string",
                              example: "some tag",
                            },
                            user: {
                              type: "object",
                              properties: {
                                _id: {
                                  type: "string",
                                  example: "61540a984216fd3f44e24c37",
                                },
                                fullname: {
                                  type: "string",
                                  example: "alex smith",
                                },
                                profilePhoto: {
                                  type: "string",
                                  example: "image url",
                                },
                              },
                            },
                          },
                        },
                      },
                      _id: {
                        type: "string",
                        example: "61540a984216fd3f44e24c37",
                      },
                      __v: {
                        type: "number",
                        example: 0,
                      },
                      user: {
                        type: "object",
                        properties: {
                          _id: {
                            type: "string",
                            example: "61540a984216fd3f44e24c37",
                          },
                          fullname: {
                            type: "string",
                            example: "alex smith",
                          },
                          profilePhoto: {
                            type: "string",
                            example: "image url",
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
          404: {
            description: "Error",
            name: "body",
            in: "body",
            required: true,
            schema: {
              type: "object",
              properties: {
                status: {
                  type: "string",
                  example: "error",
                },
                message: {
                  type: "string",
                  example: "Pages not found",
                },
              },
            },
          },
        },
      },
    },
    "/api/v1/pages/get-pages?page=2&limit=10": {
      get: {
        "x-swagger-router-controller": "page",
        operationId: "page-activity-getAllPages",
        summary: "Page activity getAllPages",
        description: "Getting all pages",
        tags: ["Page"],
        parameters: [
          {
            name: "page",
            example: 1,
            in: "query",
            required: true,
            description: "Page No",
            schema: {
              type: "integer",
            },
          },
          {
            name: "limit",
            example: 10,
            in: "query",
            required: true,
            description: "Limiting the no. of pages",
            schema: {
              type: "integer",
            },
          },
        ],
        responses: {
          200: {
            description: "OK",
            name: "body",
            in: "body",
            required: true,
            schema: {
              type: "object",
              properties: {
                status: {
                  type: "string",
                  example: "success",
                },
                message: {
                  type: "string",
                  example: "Pages fetched Successfully",
                },
                page: {
                  type: "array",
                  items: {
                    properties: {
                      title: {
                        type: "string",
                        example: "Page title",
                      },

                      category: {
                        typeOfReaction: "string",
                        example: "movies",
                      },
                      description: {
                        type: "string",
                        example: "Page description",
                      },
                      image: {
                        type: "string",
                        example: "image url",
                      },
                      contributions: {
                        type: "array",
                        items: {
                          properties: {
                            contentDeleted: {
                              type: "boolean",
                              example: false,
                            },
                            _id: {
                              type: "string",
                              example: "61540a984216fd3f44e24c37",
                            },
                            contentDescription: {
                              type: "string",
                              example: "Some description",
                            },
                            contentImage: {
                              type: "string",
                              example: "image url",
                            },
                            contentTag: {
                              type: "string",
                              example: "some tag",
                            },
                            user: {
                              type: "object",
                              properties: {
                                _id: {
                                  type: "string",
                                  example: "61540a984216fd3f44e24c37",
                                },
                                fullname: {
                                  type: "string",
                                  example: "alex smith",
                                },
                                profilePhoto: {
                                  type: "string",
                                  example: "image url",
                                },
                              },
                            },
                          },
                        },
                      },
                      _id: {
                        type: "string",
                        example: "61540a984216fd3f44e24c37",
                      },
                      __v: {
                        type: "number",
                        example: 0,
                      },
                      user: {
                        type: "object",
                        properties: {
                          _id: {
                            type: "string",
                            example: "61540a984216fd3f44e24c37",
                          },
                          fullname: {
                            type: "string",
                            example: "alex smith",
                          },
                          profilePhoto: {
                            type: "string",
                            example: "image url",
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
          404: {
            description: "Page not found",
            name: "body",
            in: "body",
            required: true,
            schema: {
              type: "object",
              properties: {
                status: {
                  type: "string",
                  example: "error",
                },
                message: {
                  type: "string",
                  example: "Page not found",
                },
              },
            },
          },
        },
      },
    },
    "/api/v1/pages/edit-page/{id}": {
      patch: {
        "x-swagger-router-controller": "page",
        operationId: "page-activity-editpage",
        summary: "Page activity edit-page",
        description: "Editing a page",
        tags: ["Page"],
        parameters: [
          {
            in: "header",
            name: "Authorization",
            required: true,
            description: "Authorization bearer token",
            example:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c",
            schema: {
              type: "string",
            },
          },
          {
            name: "id",
            example: "4654df5ads56f4f46ad",
            in: "path",
            required: true,
            description: "Id of the page",
            schema: {
              type: "string",
            },
          },

          {
            name: "body",
            in: "body",
            required: true,
            schema: {
              type: "object",
              properties: {
                title: {
                  type: "string",
                  example: "A New Page",
                },
                category: {
                  type: "string",
                  example: "movies",
                },
                description: {
                  type: "string",
                  example: "some description",
                },
                image: {
                  type: "string",
                  example: "image url",
                },
              },
            },
          },
        ],
        responses: {
          200: {
            description: "OK",
            name: "body",
            in: "body",
            required: true,
            schema: {
              type: "object",
              properties: {
                status: {
                  type: "string",
                  example: "success",
                },
                message: {
                  type: "string",
                  example: "Page fetched Successfully",
                },
                page: {
                  type: "array",
                  items: {
                    properties: {
                      title: {
                        type: "string",
                        example: "Page title",
                      },

                      category: {
                        typeOfReaction: "string",
                        example: "movies",
                      },
                      description: {
                        type: "string",
                        example: "Page description",
                      },
                      image: {
                        type: "string",
                        example: "image url",
                      },
                      contributions: {
                        type: "array",
                        items: {
                          properties: {
                            contentDeleted: {
                              type: "boolean",
                              example: false,
                            },
                            _id: {
                              type: "string",
                              example: "61540a984216fd3f44e24c37",
                            },
                            contentDescription: {
                              type: "string",
                              example: "Some description",
                            },
                            contentImage: {
                              type: "string",
                              example: "image url",
                            },
                            contentTag: {
                              type: "string",
                              example: "some tag",
                            },
                            user: {
                              type: "object",
                              properties: {
                                _id: {
                                  type: "string",
                                  example: "61540a984216fd3f44e24c37",
                                },
                                fullname: {
                                  type: "string",
                                  example: "alex smith",
                                },
                                profilePhoto: {
                                  type: "string",
                                  example: "image url",
                                },
                              },
                            },
                          },
                        },
                      },
                      _id: {
                        type: "string",
                        example: "61540a984216fd3f44e24c37",
                      },
                      __v: {
                        type: "number",
                        example: 0,
                      },
                      user: {
                        type: "object",
                        properties: {
                          _id: {
                            type: "string",
                            example: "61540a984216fd3f44e24c37",
                          },
                          fullname: {
                            type: "string",
                            example: "alex smith",
                          },
                          profilePhoto: {
                            type: "string",
                            example: "image url",
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
          404: {
            description: "Page not found",
            name: "body",
            in: "body",
            required: true,
            schema: {
              type: "object",
              properties: {
                status: {
                  type: "string",
                  example: "error",
                },
                message: {
                  type: "string",
                  example: "Page not found",
                },
              },
            },
          },
        },
      },
    },
    "/api/v1/pages/delete-page/{id}": {
      delete: {
        "x-swagger-router-controller": "page",
        operationId: "page-activity-deletepage",
        summary: "Page activity delete-page",
        description: "Deleting a page",
        tags: ["Page"],
        parameters: [
          {
            name: "id",
            example: "4654df5ads56f4f46ad",
            in: "path",
            required: true,
            description: "Id of the page",
            schema: {
              type: "string",
            },
          },
        ],

        responses: {
          200: {
            description: "OK",
            name: "body",
            in: "body",
            required: true,
            schema: {
              type: "object",
              properties: {
                status: {
                  type: "string",
                  example: "success",
                },
                message: {
                  type: "string",
                  example: "Page Deleted Successfully",
                },
              },
            },
          },
          404: {
            description: "Page not found",
            name: "body",
            in: "body",
            required: true,
            schema: {
              type: "object",
              properties: {
                status: {
                  type: "string",
                  example: "error",
                },
                message: {
                  type: "string",
                  example: "Page not found",
                },
              },
            },
          },
        },
      },
    },
    "/api/v1/requests/request": {
      post: {
        tags: ["Request"],
        "x-swagger-router-controller": "request",
        operationId: "request-createrequest",
        summary: "Create request",
        description: "Create request to user",
        parameters: [
          {
            in: "header",
            name: "Authorization",
            required: true,
            description: "Authorization bearer token",
            example:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c",
            schema: {
              type: "string",
            },
          },
          {
            name: "body",
            in: "body",
            required: true,
            schema: {
              type: "object",
              properties: {
                message: {
                  schema: {
                    type: "string",
                    maximum: 200,
                    default: "",
                  },
                  example: "message",
                },
                contentId: {
                  description: "Content id",
                  required: true,
                  schema: {
                    type: "string",
                  },
                  example: "Content id",
                },
                requestedUserId: {
                  description: "Requested user id",
                  required: true,
                  schema: {
                    type: "string",
                  },
                  example: "Requested user id",
                },
              },
            },
          },
        ],
        responses: {
          200: {
            description: "OK",
            name: "body",
            in: "body",
            required: true,
            schema: {
              type: "object",
              properties: {
                success: {
                  type: "booleon",
                  example: true,
                },
                code: {
                  type: "number",
                  example: 200,
                },
                data: {
                  properties: {
                    msg: {
                      type: "string",
                      example: "Request created successfully",
                    },
                  },
                },
              },
            },
          },
          401: {
            description: "ERROR",
            name: "body",
            in: "body",
            required: true,
            schema: {
              type: "object",
              properties: {
                success: {
                  type: "booleon",
                  example: true,
                },
                code: {
                  type: "number",
                  example: 401,
                },
                data: {
                  properties: {
                    msg: {
                      type: "string",
                      example:
                        "Maximum number of outgoing requests from user reached",
                    },
                  },
                },
              },
            },
          },
          402: {
            description: "ERROR",
            name: "body",
            in: "body",
            required: true,
            schema: {
              type: "object",
              properties: {
                success: {
                  type: "booleon",
                  example: true,
                },
                code: {
                  type: "number",
                  example: 402,
                },
                data: {
                  properties: {
                    msg: {
                      type: "string",
                      example:
                        "Maximum number of ingoing requests for requested user reached, please try later",
                    },
                  },
                },
              },
            },
          },
          403: {
            description: "ERROR",
            name: "body",
            in: "body",
            required: true,
            schema: {
              type: "object",
              properties: {
                success: {
                  type: "booleon",
                  example: true,
                },
                code: {
                  type: "number",
                  example: 403,
                },
                data: {
                  properties: {
                    msg: {
                      type: "string",
                      example: "Self request not allowed",
                    },
                  },
                },
              },
            },
          },
          500: {
            description: "FAIL",
            name: "body",
            in: "body",
            required: true,
            schema: {
              type: "String",
              example: "An error has occurred",
            },
          },
        },
      },
    },
    "/api/v1/requests/request/{id}": {
      delete: {
        "x-swagger-router-controller": "request",
        operationId: "request-deleterequest",
        summary: "Delete request",
        description: "Deleting a request by user",
        tags: ["Request"],
        parameters: [
          {
            in: "header",
            name: "Authorization",
            required: true,
            description: "Authorization bearer token",
            example:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c",
            schema: {
              type: "string",
            },
          },
          {
            name: "id",
            in: "path",
            required: true,
            description: "Request id",
            schema: {
              type: "string",
            },
          },
        ],
        responses: {
          200: {
            description: "OK",
            name: "body",
            in: "body",
            required: true,
            schema: {
              type: "object",
              properties: {
                success: {
                  type: "booleon",
                  example: true,
                },
                code: {
                  type: "number",
                  example: 200,
                },
                data: {
                  properties: {
                    msg: {
                      type: "string",
                      example: "Request deleted successfully",
                    },
                  },
                },
              },
            },
          },
          404: {
            description: "OK",
            name: "body",
            in: "body",
            required: true,
            schema: {
              type: "object",
              properties: {
                success: {
                  type: "booleon",
                  example: true,
                },
                code: {
                  type: "number",
                  example: 404,
                },
                data: {
                  properties: {
                    msg: {
                      type: "string",
                      example: "Unauthorized access",
                    },
                  },
                },
              },
            },
          },
          500: {
            description: "FAIL",
            name: "body",
            in: "body",
            required: true,
            schema: {
              type: "String",
              example: "An error has occurred",
            },
          },
        },
      },
      put: {
        "x-swagger-router-controller": "request",
        operationId: "request-putrequest",
        summary: "Update request status",
        description: "Updating request status by requested user",
        tags: ["Request"],
        parameters: [
          {
            in: "header",
            name: "Authorization",
            required: true,
            description: "Authorization bearer token",
            example:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c",
            schema: {
              type: "string",
            },
          },
          {
            name: "id",
            in: "path",
            required: true,
            description: "Request id",
            schema: {
              type: "string",
            },
          },
          {
            name: "body",
            in: "body",
            schema: {
              type: "object",
              properties: {
                isAccepted: {
                  type: "boolean",
                  example: true,
                },
                contribution: {
                  type: "object",
                  properties: {
                    title: { type: "string", example: "title" },
                    description: { type: "string", example: "description" },
                  },
                },
              },
            },
          },
        ],
        responses: {
          200: {
            description: "OK",
            name: "body",
            in: "body",
            required: true,
            schema: {
              type: "object",
              properties: {
                success: {
                  type: "booleon",
                  example: true,
                },
                code: {
                  type: "number",
                  example: 200,
                },
                data: {
                  properties: {
                    msg: {
                      type: "string",
                      example: "Request deleted successfully",
                    },
                  },
                },
              },
            },
          },
          201: {
            description: "OK",
            name: "body",
            in: "body",
            required: true,
            schema: {
              type: "object",
              properties: {
                success: {
                  type: "booleon",
                  example: true,
                },
                code: {
                  type: "number",
                  example: 201,
                },
                data: {
                  properties: {
                    msg: {
                      type: "string",
                      example: "The request has already been replied to",
                    },
                  },
                },
              },
            },
          },
          404: {
            description: "OK",
            name: "body",
            in: "body",
            required: true,
            schema: {
              type: "object",
              properties: {
                success: {
                  type: "booleon",
                  example: false,
                },
                code: {
                  type: "number",
                  example: 404,
                },
                data: {
                  properties: {
                    msg: {
                      type: "string",
                      example: "Unauthorized access",
                    },
                  },
                },
              },
            },
          },
          500: {
            description: "FAIL",
            name: "body",
            in: "body",
            required: true,
            schema: {
              type: "String",
              example: "An error has occurred",
            },
          },
        },
      },
    },
    "/api/v1/requests/sent-requests": {
      get: {
        tags: ["Request"],
        "x-swagger-router-controller": "request",
        operationId: "request-getsentrequests",
        summary: "Get requests sent by user",
        description:
          "Get sent requests (will get user id from authorization token)",
        parameters: [
          {
            in: "header",
            name: "Authorization",
            required: true,
            description: "Authorization bearer token",
            example:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c",
            schema: {
              type: "string",
            },
          },
        ],
        responses: {
          200: {
            description: "OK",
            name: "body",
            in: "body",
            required: true,
            schema: {
              type: "object",
              properties: {
                success: {
                  type: "boolean",
                  example: true,
                },
                data: {
                  type: "object",
                  properties: {
                    msg: {
                      type: "string",
                      example: "Requests retrieved successfully",
                    },
                    requests: {
                      type: "array",
                      items: {
                        type: "object",
                        properties: {
                          status: {
                            type: "String",
                            enum: ["PENDING", "ACCEPTED", "REFUSED"],
                            example: "PENDING",
                          },
                          message: {
                            type: "String",
                            maxLength: 200,
                            example: "message",
                          },
                          dateOfCreation: {
                            type: "Date",
                            example: new Date(),
                          },
                          dateOfLastUpdate: {
                            type: "Date",
                            example: new Date(),
                          },
                          content: {
                            type: "string",
                            example: "Content info",
                          },
                          user: {
                            type: "string",
                            example: "User info",
                          },
                          requestedUser: {
                            type: "string",
                            example: "Requested user info",
                          },
                        },
                      },
                    },
                  },
                },
                code: {
                  type: "number",
                  example: 200,
                },
              },
            },
          },
          500: {
            description: "FAIL",
            name: "body",
            in: "body",
            required: true,
            schema: {
              type: "String",
              example: "An error has occurred",
            },
          },
        },
      },
    },
    "/api/v1/requests/received-requests": {
      get: {
        tags: ["Request"],
        "x-swagger-router-controller": "request",
        operationId: "request-getreceivedrequests",
        summary: "Get requests received by user",
        description:
          "Get requests received by user (will get user id from authorization token)",
        parameters: [
          {
            in: "header",
            name: "Authorization",
            required: true,
            description: "Authorization bearer token",
            example:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c",
            schema: {
              type: "string",
            },
          },
        ],
        responses: {
          200: {
            description: "OK",
            name: "body",
            in: "body",
            required: true,
            schema: {
              type: "object",
              properties: {
                success: {
                  type: "boolean",
                  example: true,
                },
                data: {
                  type: "object",
                  properties: {
                    msg: {
                      type: "string",
                      example: "Requests retrieved successfully",
                    },
                    requests: {
                      type: "array",
                      items: {
                        type: "object",
                        properties: {
                          status: {
                            type: "String",
                            enum: ["PENDING", "ACCEPTED", "REFUSED"],
                            example: "PENDING",
                          },
                          message: {
                            type: "String",
                            maxLength: 200,
                            example: "message",
                          },
                          dateOfCreation: {
                            type: "Date",
                            example: new Date(),
                          },
                          dateOfLastUpdate: {
                            type: "Date",
                            example: new Date(),
                          },
                          content: {
                            type: "string",
                            example: "Content info",
                          },
                          user: {
                            type: "string",
                            example: "User info",
                          },
                          requestedUser: {
                            type: "string",
                            example: "Requested user info",
                          },
                        },
                      },
                    },
                  },
                },
                code: {
                  type: "number",
                  example: 200,
                },
              },
            },
          },
          500: {
            description: "FAIL",
            name: "body",
            in: "body",
            required: true,
            schema: {
              type: "String",
              example: "An error has occurred",
            },
          },
        },
      },
    },
    "/api/v1/categories/get": {
      get: {
        "x-swagger-router-controller": "category",
        operationId: "category-getAllCategories",
        summary: "getAllCategories",
        description: "Getting all categories",
        tags: ["Category"],
        responses: {
          200: {
            description: "OK",
            name: "body",
            in: "body",
            required: true,
            schema: {
              type: "object",
              properties: {
                success: {
                  type: "booleon",
                  example: true,
                },
                code: {
                  type: "number",
                  example: 403,
                },
                data: {
                  properties: {
                    msg: {
                      type: "string",
                      example: "Self request not allowed",
                    },
                    data: {
                      type: "array",
                      items: {
                        type: "object",
                        properties: {
                          _id: {
                            type: "string",
                            example: "6296d426568dc148e481c794",
                          },
                          name: {
                            type: "string",
                            example: "Culture",
                          },
                          description: {
                            type: "string",
                            example: "Culture",
                          },
                          userId: {
                            type: "string",
                            example: "6296d426568dc148e481c794",
                          },
                          subCategories: {
                            type: "array",
                            items: {
                              type: "object",
                              properties: {
                                _id: {
                                  type: "string",
                                  example: "6296d426568dc148e481c794",
                                },
                                name: {
                                  type: "string",
                                  example: "Culture",
                                },
                                description: {
                                  type: "string",
                                  example: "Culture",
                                },
                                userId: {
                                  type: "string",
                                  example: "6296d426568dc148e481c794",
                                },
                              },
                            },
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    "/api/v1/categories/add": {
      post: {
        "x-swagger-router-controller": "categories",
        operationId: "category-create",
        summary: "Create category",
        description: "To allow user to create new category",
        tags: ["Category"],
        parameters: [
          {
            name: "body",
            in: "body",
            required: true,
            schema: {
              type: "object",
              properties: {
                data: {
                  type: "object",
                  properties: {
                    name: {
                      type: "string",
                      example: "Documentary",
                    },
                    description: {
                      type: "string",
                      example: "Documentary description",
                    },
                  },
                },
              },
            },
          },
        ],
        responses: {
          200: {
            description: "Category created successfully",
            name: "body",
            in: "body",
            required: true,
            schema: {
              type: "object",
              properties: {
                success: {
                  type: "booleon",
                  example: true,
                },
                code: {
                  type: "number",
                  example: 200,
                },
                data: {
                  properties: {
                    msg: {
                      type: "string",
                      example: "Subscription created with success",
                    },
                    id: {
                      type: "string",
                      example: "6296d426568dc148e481c794",
                    },
                  },
                },
                error: {
                  properties: {
                    msg: {
                      type: "String",
                      example: "Error will displayed if it occured",
                    },
                  },
                },
              },
            },
          },
          500: {
            description: "An error has occured",
          },
        },
      },
    },
    "/api/v1/categories/set_current_category": {
      post: {
        "x-swagger-router-controller": "categories",
        operationId: "user-category-set",
        summary: "Set users current category",
        description: "To allow user to set their current category",
        tags: ["Category", "User"],
        parameters: [
          {
            name: "body",
            in: "body",
            required: true,
            schema: {
              type: "object",
              properties: {
                category_id: {
                  type: "string",
                  example: "62a155d9e83747467cc0fa06",
                },
              },
            },
          },
        ],
        responses: {
          200: {
            description: "Succesfully set current category for user",
            name: "body",
            in: "body",
            required: true,
            schema: {
              type: "object",
              properties: {
                msg: {
                  type: "string",
                  example: "Succesfully set current category for user",
                },
                code: {
                  type: "number",
                  example: 200,
                },
              },
            },
          },
          500: {
            description: "An error has occured",
            name: "body",
            in: "body",
            required: true,
            schema: {
              type: "object",
              properties: {
                msg: {
                  type: "string",
                  example: "Internal Server Error",
                },
                code: {
                  type: "number",
                  example: 500,
                },
              },
            },
          },
          404: {
            description: "Category not found",
            name: "body",
            in: "body",
            required: true,
            schema: {
              type: "object",
              properties: {
                msg: {
                  example: "Category not found",
                  type: "string",
                },
                code: {
                  type: "number",
                  example: 404,
                },
              },
            },
          },
        },
      },
    },
  },
};

module.exports = swaggerDocument;
