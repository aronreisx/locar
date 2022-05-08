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
      '/categories': {
        post: {
          tags: ['categories'],
          summary: 'Create category',
          description: 'Create a new category',
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
            '201': {
              description: 'Created',
            },
            '500': {
              description: 'Category already exists',
            },
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
    },
  })
);
