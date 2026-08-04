import api from './api';

const blogService = {
  // Public blog endpoints
  getBlogs: async () => {
    const response = await api.get('/blogs');
    return response.data;
  },

  getBlogBySlug: async (slug) => {
    const response = await api.get(`/blogs/${slug}`);
    return response.data;
  },

  // Admin blog CRUD endpoints
  adminGetBlogs: async () => {
    const response = await api.get('/admin/blogs');
    return response.data;
  },

  adminCreateBlog: async (blogData) => {
    const response = await api.post('/admin/blogs', blogData);
    return response.data;
  },

  adminUpdateBlog: async (id, blogData) => {
    const response = await api.put(`/admin/blogs/${id}`, blogData);
    return response.data;
  },

  adminDeleteBlog: async (id) => {
    const response = await api.delete(`/admin/blogs/${id}`);
    return response.data;
  },

  // Image Upload helper
  uploadBlogImage: async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    const response = await api.post('/admin/blogs/upload-image', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data; // Expected: { imageUrl }
  },
};

export default blogService;
