export default {
    name: 'novidades',
    title: 'Novidades',
    type: 'document',
    fields: [
      {
        name: 'image',
        title: 'Image',
        type: 'image'
      },
      { 
        name: 'name',
        title: 'Name',
        type: 'string',
      },
      { 
        name: 'slug',
        title: 'Slug',
        type: 'slug',
        options: {
          source: 'name',
          maxLength: 90,
        }
      }
    ]
  }