export const swaggerDoc = JSON.parse(
  JSON.stringify({
    openapi: '3.0.0',
    info: {
      title: 'Locar Documentation',
      description: 'This is the Locar API Documentation',
      version: '1.0.0',
      contact: {
        email: 'aronreis2@gmail.com',
      },
    },
    paths: {
      '/sessions': {
        post: {
          tags: ['Session'],
          summary: 'User authentication',
          description: 'User authentication',
          requestBody: {
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    email: {
                      type: 'string',
                    },
                    password: {
                      type: 'string',
                    },
                  },
                },
              },
            },
          },
          responses: {
            '200': { description: 'Success' },
            '400': { description: 'Email or password incorrect!' },
          },
        },
      },
      '/categories': {
        post: {
          tags: ['categories'],
          summary: 'Create category',
          description: 'Create a new category',
          security: [{ bearerAuth: [] }],
          requestBody: {
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    name: {
                      type: 'string',
                    },
                    description: {
                      type: 'string',
                    },
                  },
                  example: {
                    name: 'Category name sample',
                    description: 'Category description sample',
                  },
                },
              },
            },
          },
          responses: {
            '201': { description: 'Created' },
            '500': { description: 'Category already exists' },
          },
        },
        get: {
          tags: ['categories'],
          summary: 'List all categories',
          description: 'List all categories',
          responses: {
            '200': {
              description: 'Success',
              content: {
                'application/json': {
                  schema: {
                    type: 'array',
                    items: {
                      type: 'object',
                      properties: {
                        type: 'string',
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
      '/categories/import': {
        post: {
          tags: ['categories'],
          summary: 'Import categories',
          description: 'Import categories from a file',
          security: [{ bearerAuth: [] }],
          requestBody: {
            content: {
              'multipart/form-data': {
                schema: {
                  type: 'object',
                  properties: {
                    file: {
                      type: 'string',
                      format: 'binary',
                    },
                  },
                },
              },
            },
          },
          responses: {
            '201': { description: 'Created' },
          },
        },
      },
      '/specifications': {
        post: {
          tags: ['Specifications'],
          summary: 'Create a specification',
          description: 'Create a new specification',
          security: [{ bearerAuth: [] }],
          requestBody: {
            content: {
              'application/json': {
                schema: {
                  $ref: '#/definitions/Specification',
                },
              },
            },
          },
          responses: {
            '201': { description: 'Created' },
            '500': { description: 'Specification already exists' },
          },
        },
      },
      '/cars': {
        post: {
          tags: ['Cars'],
          summary: 'Create a new car',
          description: 'Create a new car',
          security: [{ bearerAuth: [] }],
          requestBody: {
            content: {
              'application/json': {
                schema: {
                  $ref: '#definitions/Car',
                },
              },
            },
          },
          responses: {
            '201': { description: 'Created' },
            '400': { description: 'Car already exists' },
          },
        },
        '/cars/images/{id}': {
          post: {
            tags: ['Cars'],
            summary: 'Upload images',
            description: 'Upload images',
            security: [{ bearerAuth: [] }],
            parameters: [
              {
                name: 'id',
                in: 'path',
                description: 'Car id',
                required: true,
                schema: { type: 'string' },
              },
            ],
            requestBody: {
              content: {
                'multipart/form-data': {
                  schema: {
                    type: 'object',
                    properties: {
                      images: {
                        type: 'array',
                        items: {
                          type: 'string',
                          format: 'binary',
                        },
                      },
                    },
                  },
                },
              },
            },
            responses: {
              '201': { description: 'Created' },
            },
          },
        },
      },
    },
    definitions: {
      Specifications: {
        type: 'object',
        properties: {
          name: {
            type: 'string',
          },
          description: {
            type: 'string',
          },
        },
      },
      Car: {
        type: 'object',
        properties: {
          name: {
            type: 'string',
          },
          description: {
            type: 'string',
          },
          daily_rate: {
            type: 'number',
          },
          license_plate: {
            type: 'string',
          },
          fine_amount: {
            type: 'number',
          },
          brand: {
            type: 'string',
          },
          category_id: {
            type: 'string',
          },
        },
      },
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
  })
);
