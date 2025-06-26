// Mock API service to simulate backend REST API
export interface Speaker {
  id: string;
  firstName: string;
  lastName: string;
  biography: string;
  topic: string;
  photo: string;
  social: {
    linkedin?: string;
    twitter?: string;
    instagram?: string;
  };
  order: number;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  photo: string;
  description: string;
  contact: string;
  linkedin?: string;
}

export interface Sponsor {
  id: string;
  name: string;
  logo: string;
  type: 'Platino' | 'Oro' | 'Plata' | 'Bronce';
  link: string;
  description: string;
}

export interface MediaItem {
  id: string;
  type: 'photo' | 'video';
  url: string;
  title: string;
  description: string;
  tags: string[];
}

export interface SocialMediaPost {
  id: string;
  type: 'reel' | 'post';
  url: string;
  embedUrl: string;
  title: string;
  description: string;
  thumbnail?: string;
  createdAt: Date;
  isActive: boolean;
}

export interface Registration {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  reason: string;
  createdAt: Date;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: Date;
}

// Mock data
const mockSpeakers: Speaker[] = [
  {
    id: '1',
    firstName: 'María',
    lastName: 'González',
    biography: 'Neurocientífica especializada en el estudio de la creatividad y la innovación. PhD en Neurociencias por la Universidad de Harvard, actualmente investiga cómo el cerebro genera ideas innovadoras.',
    topic: 'El cerebro creativo: Cómo nacen las grandes ideas',
    photo: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=400',
    social: {
      linkedin: 'https://linkedin.com/in/mariagonzalez',
      twitter: 'https://twitter.com/mariagonzalez'
    },
    order: 1
  },
  {
    id: '2',
    firstName: 'Carlos',
    lastName: 'Mendoza',
    biography: 'Emprendedor social y fundador de múltiples ONGs enfocadas en educación. Ha impactado la vida de más de 50,000 jóvenes en Latinoamérica a través de programas educativos innovadores.',
    topic: 'Educación sin fronteras: Transformando vidas a través del aprendizaje',
    photo: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=400',
    social: {
      linkedin: 'https://linkedin.com/in/carlosmendoza',
      instagram: 'https://instagram.com/carlosmendoza'
    },
    order: 2
  },
  {
    id: '3',
    firstName: 'Ana',
    lastName: 'Ruiz',
    biography: 'Artista digital y pionera en el uso de inteligencia artificial para crear arte. Sus obras han sido exhibidas en museos de todo el mundo, explorando la intersección entre tecnología y creatividad humana.',
    topic: 'Arte + IA: Redefiniendo la creatividad en la era digital',
    photo: 'https://images.pexels.com/photos/1239288/pexels-photo-1239288.jpeg?auto=compress&cs=tinysrgb&w=400',
    social: {
      instagram: 'https://instagram.com/anaruizart',
      twitter: 'https://twitter.com/anaruizart'
    },
    order: 3
  }
];

const mockTeam: TeamMember[] = [
  {
    id: '1',
    name: 'Lucía Fernández',
    role: 'Organizadora Principal',
    photo: 'https://images.pexels.com/photos/1181424/pexels-photo-1181424.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: 'Apasionada por conectar ideas y personas. Lidera la organización de TEDxViedma con dedicación y visión.',
    contact: 'lucia@tedxviedma.com',
    linkedin: 'https://linkedin.com/in/luciafernandez'
  },
  {
    id: '2',
    name: 'Diego Morales',
    role: 'Director de Tecnología',
    photo: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: 'Especialista en streaming y producción audiovisual. Garantiza que cada detalle técnico funcione perfectamente.',
    contact: 'diego@tedxviedma.com',
    linkedin: 'https://linkedin.com/in/diegomorales'
  },
  {
    id: '3',
    name: 'Sofia Carrasco',
    role: 'Coordinadora de Contenido',
    photo: 'https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: 'Curadora de experiencias memorables. Se encarga de que cada charla transmita el espíritu TEDx.',
    contact: 'sofia@tedxviedma.com',
    linkedin: 'https://linkedin.com/in/sofiacarrasco'
  }
];

const mockSponsors: Sponsor[] = [
  {
    id: '1',
    name: 'TechCorp',
    logo: 'https://images.pexels.com/photos/3944091/pexels-photo-3944091.jpeg?auto=compress&cs=tinysrgb&w=200',
    type: 'Platino',
    link: 'https://techcorp.com',
    description: 'Líder en innovación tecnológica'
  },
  {
    id: '2',
    name: 'Banco Regional',
    logo: 'https://images.pexels.com/photos/3850512/pexels-photo-3850512.jpeg?auto=compress&cs=tinysrgb&w=200',
    type: 'Oro',
    link: 'https://bancoregional.com',
    description: 'Apoyando el crecimiento local'
  }
];

const mockGallery: MediaItem[] = [
  {
    id: '1',
    type: 'photo',
    url: 'https://images.pexels.com/photos/2747449/pexels-photo-2747449.jpeg?auto=compress&cs=tinysrgb&w=800',
    title: 'TEDxViedma 2024 - Momento inspirador',
    description: 'Audiencia durante una charla memorable',
    tags: ['evento', '2024', 'audiencia']
  },
  {
    id: '2',
    type: 'photo',
    url: 'https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=800',
    title: 'Oradora en acción',
    description: 'Compartiendo ideas transformadoras',
    tags: ['orador', 'charla', 'inspiración']
  },
  {
    id: '3',
    type: 'video',
    url: 'https://player.vimeo.com/video/76979871',
    title: 'Highlights TEDxViedma 2024',
    description: 'Los mejores momentos del evento anterior',
    tags: ['highlights', '2024', 'resumen']
  }
];

const mockSocialMediaPosts: SocialMediaPost[] = [
  {
    id: '1',
    type: 'reel',
    url: 'https://www.instagram.com/reel/DLShjOvzPjS/',
    embedUrl: 'https://www.instagram.com/p/DLShjOvzPjS/embed',
    title: 'Detrás de escenas: Preparando TEDxViedma',
    description: 'Un vistazo exclusivo a la preparación del evento más esperado del año',
    thumbnail: 'https://images.pexels.com/photos/2747449/pexels-photo-2747449.jpeg?auto=compress&cs=tinysrgb&w=400',
    createdAt: new Date('2025-01-10'),
    isActive: true
  },
  {
    id: '2',
    type: 'reel',
    url: 'https://www.instagram.com/reel/DLBD2uhOXJt/',
    embedUrl: 'https://www.instagram.com/p/DLBD2uhOXJt/embed',
    title: 'Conocé a nuestros oradores',
    description: 'Presentamos a las mentes brillantes que compartirán sus ideas',
    thumbnail: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=400',
    createdAt: new Date('2025-01-08'),
    isActive: true
  },
  {
    id: '3',
    type: 'post',
    url: 'https://www.instagram.com/p/DK3E5gyuEeT/',
    embedUrl: 'https://www.instagram.com/p/DK3E5gyuEeT/embed',
    title: 'Anuncio oficial: TEDxViedma 2025',
    description: 'Estamos emocionados de anunciar la fecha oficial de nuestro evento',
    thumbnail: 'https://images.pexels.com/photos/1239288/pexels-photo-1239288.jpeg?auto=compress&cs=tinysrgb&w=400',
    createdAt: new Date('2025-01-05'),
    isActive: true
  },
  {
    id: '4',
    type: 'post',
    url: 'https://www.instagram.com/p/DKanoxhO4kD/',
    embedUrl: 'https://www.instagram.com/p/DKanoxhO4kD/embed',
    title: 'Convocatoria abierta para oradores',
    description: '¿Tenés una idea que vale la pena compartir? ¡Postulate!',
    thumbnail: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=400',
    createdAt: new Date('2025-01-03'),
    isActive: true
  }
];

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// API Functions
export const api = {
  // Speakers
  async getSpeakers(): Promise<Speaker[]> {
    await delay(500);
    return mockSpeakers.sort((a, b) => a.order - b.order);
  },

  async getSpeaker(id: string): Promise<Speaker | null> {
    await delay(300);
    return mockSpeakers.find(s => s.id === id) || null;
  },

  // Team
  async getTeam(): Promise<TeamMember[]> {
    await delay(400);
    return mockTeam;
  },

  // Sponsors
  async getSponsors(): Promise<Sponsor[]> {
    await delay(300);
    return mockSponsors;
  },

  // Gallery
  async getGallery(): Promise<MediaItem[]> {
    await delay(600);
    return mockGallery;
  },

  // Social Media Posts
  async getSocialMediaPosts(): Promise<SocialMediaPost[]> {
    await delay(400);
    return mockSocialMediaPosts.filter(post => post.isActive).sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  },

  async createSocialMediaPost(data: Omit<SocialMediaPost, 'id' | 'createdAt'>): Promise<{ success: boolean; message: string; post?: SocialMediaPost }> {
    await delay(800);
    if (Math.random() > 0.1) {
      const newPost: SocialMediaPost = {
        ...data,
        id: Date.now().toString(),
        createdAt: new Date()
      };
      mockSocialMediaPosts.unshift(newPost);
      return { success: true, message: 'Post agregado exitosamente', post: newPost };
    } else {
      return { success: false, message: 'Error al agregar el post' };
    }
  },

  async updateSocialMediaPost(id: string, data: Partial<SocialMediaPost>): Promise<{ success: boolean; message: string }> {
    await delay(600);
    const index = mockSocialMediaPosts.findIndex(post => post.id === id);
    if (index !== -1) {
      mockSocialMediaPosts[index] = { ...mockSocialMediaPosts[index], ...data };
      return { success: true, message: 'Post actualizado exitosamente' };
    }
    return { success: false, message: 'Post no encontrado' };
  },

  async deleteSocialMediaPost(id: string): Promise<{ success: boolean; message: string }> {
    await delay(500);
    const index = mockSocialMediaPosts.findIndex(post => post.id === id);
    if (index !== -1) {
      mockSocialMediaPosts.splice(index, 1);
      return { success: true, message: 'Post eliminado exitosamente' };
    }
    return { success: false, message: 'Post no encontrado' };
  },

  // Registration
  async registerForStreaming(data: Omit<Registration, 'id' | 'createdAt'>): Promise<{ success: boolean; message: string }> {
    await delay(1000);
    // Simulate success/failure
    if (Math.random() > 0.1) {
      return { success: true, message: 'Registration successful!' };
    } else {
      return { success: false, message: 'Registration failed. Please try again.' };
    }
  },

  // Contact
  async sendContactMessage(data: Omit<ContactMessage, 'id' | 'createdAt'>): Promise<{ success: boolean; message: string }> {
    await delay(800);
    // Simulate success/failure
    if (Math.random() > 0.1) {
      return { success: true, message: 'Message sent successfully!' };
    } else {
      return { success: false, message: 'Failed to send message. Please try again.' };
    }
  }
};