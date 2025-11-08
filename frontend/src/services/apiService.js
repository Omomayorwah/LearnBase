// Real API Service for Production
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

class APIService {
  constructor() {
    this.baseURL = API_BASE_URL;
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    // Add auth token if available
    const token = localStorage.getItem('lernbase_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Request failed');
      }

      return data;
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // Authentication endpoints
  async login(credentials) {
    return this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  }

  async register(userData) {
    return this.request('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }

  // Course endpoints
  async getCourses() {
    return this.request('/courses');
  }

  async getCourse(id) {
    return this.request(`/courses/${id}`);
  }

  async enrollInCourse(courseId) {
    return this.request(`/courses/${courseId}/enroll`, {
      method: 'POST',
    });
  }

  // Job endpoints
  async getJobs() {
    return this.request('/jobs');
  }

  async getJob(id) {
    return this.request(`/jobs/${id}`);
  }

  async applyForJob(jobId) {
    return this.request(`/jobs/${jobId}/apply`, {
      method: 'POST',
    });
  }

  // Certificate endpoints
  async getCertificates() {
    return this.request('/certificates');
  }

  async getCertificate(id) {
    return this.request(`/certificates/${id}`);
  }

  // User endpoints
  async getUserProfile() {
    return this.request('/users/profile');
  }

  async updateUserProfile(userData) {
    return this.request('/users/profile', {
      method: 'PUT',
      body: JSON.stringify(userData),
    });
  }

  // Search endpoint
  async search(query) {
    return this.request(`/search?q=${encodeURIComponent(query)}`);
  }
}

export const apiService = new APIService();
export default apiService;