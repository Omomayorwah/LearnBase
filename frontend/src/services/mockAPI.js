// Mock API Service for Demo/Development
import auto from '../asset/auto.JPG';
import fashion from '../asset/fashion.JPG';
import itf from '../asset/itf.JPG';
import nabteb from '../asset/nabteb.JPG';
import phone from '../asset/phone.png';
import welding from '../asset/welding.JPG'
export const mockAPI = {
  login: async (credentials) => {
    await new Promise(resolve => setTimeout(resolve, 800));
    return {
      success: true,
      user: {
        id: '1',
        name: 'Adewale Johnson',
        email: credentials.email,
        role: credentials.role || 'student',
        phone: '+234 803 456 7890',
        location: 'Lagos, Nigeria'
      },
      token: 'demo-token-12345'
    };
  },

  register: async (userData) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Simulate email already exists error
    if (userData.email === 'existing@email.com') {
      throw new Error('User already exists');
    }
    
    return {
      success: true,
      user: {
        id: Date.now().toString(),
        name: userData.name,
        email: userData.email,
        role: userData.role || 'student',
        phone: userData.phone,
        location: userData.location || 'Nigeria',
        language: userData.language || 'en',
        isVerified: false
      },
      token: `demo-token-${Date.now()}`
    };
  },

  getCourses: async () => {
    await new Promise(resolve => setTimeout(resolve, 400));
    return {
      success: true,
      data: [
        { id: '1', image: welding, title: 'Basic Welding', level: 'Beginner', progress: 45, category: 'Trade Skills', duration: '6 weeks' },
        { id: '2', image: phone, title: 'Phone Repair Basics', level: 'Beginner', progress: 70, category: 'Tech Skills', duration: '4 weeks' },
        { id: '3', image: fashion, title: 'Fashion Design', level: 'Intermediate', progress: 30, category: 'Creative Skills', duration: '8 weeks' },
        { id: '4', image: auto, title: 'Auto Mechanics', level: 'Advanced', progress: 15, category: 'Trade Skills', duration: '12 weeks' }
      ]
    };
  },

  getCertificates: async () => {
    await new Promise(resolve => setTimeout(resolve, 400));
    return {
      success: true,
      data: [
        { 
          id: '1', 
          image: nabteb,
          title: 'Basic Welding Certificate', 
          issuer: 'NABTEB', 
          date: '2024-09-15',
          status: 'valid',
          verificationCode: 'NABTEB-WLD-2024-001'
        },
        { 
          id: '2', 
          image: itf,
          title: 'Phone Repair Certification', 
          issuer: 'ITF Nigeria', 
          date: '2024-08-20',
          status: 'valid',
          verificationCode: 'ITF-PHN-2024-045'
        }
      ]
    };
  },

  getJobs: async () => {
    await new Promise(resolve => setTimeout(resolve, 400));
    return {
      success: true,
      data: [
        {
          id: '1',
          title: 'Welder Needed',
          company: 'Julius Berger Construction',
          location: 'Lagos',
          salary: '80,000 - 120,000',
          type: 'Full-time',
          posted: '2 days ago',
          requirements: 'NABTEB certification required'
        },
        {
          id: '2',
          title: 'Phone Repair Technician',
          company: 'Slot Systems',
          location: 'Ikeja',
          salary: '60,000 - 90,000',
          type: 'Full-time',
          posted: '1 week ago',
          requirements: 'ITF certification preferred'
        },
        {
          id: '3',
          title: 'Fashion Designer',
          company: 'Zizi Couture',
          location: 'Victoria Island',
          salary: '70,000 - 100,000',
          type: 'Contract',
          posted: '3 days ago',
          requirements: '2+ years experience'
        }
      ]
    };
  }
};

export default mockAPI;

