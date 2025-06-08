import { Client, Account, Databases, Storage, Teams, ID, Query } from 'appwrite';

// Initialize Appwrite Client
const client = new Client();

client
  .setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT || 'https://cloud.appwrite.io/v1')
  .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID || 'your-project-id');

// Initialize Appwrite Services
export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);
export const teams = new Teams(client);

// Database and Collection IDs (you'll need to create these in Appwrite Console)
export const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID || 'main-database';

export const COLLECTIONS = {
  TESTIMONIALS: 'testimonials',
  BLOG_POSTS: 'blog-posts',
  UNIVERSITIES: 'universities',
  CAREER_PATHS: 'career-paths',
  FAQS: 'faqs',
  FEATURES: 'features',
  PRICING_PLANS: 'pricing-plans',
  CONTACT_FORMS: 'contact-forms',
  CONSULTATIONS: 'consultations',
  CONSULTATION_SERVICES: 'consultation-services',
  USERS: 'users',
  CATEGORIES: 'categories'
};

// Storage Bucket ID
export const STORAGE_BUCKET_ID = import.meta.env.VITE_APPWRITE_STORAGE_BUCKET_ID || 'main-storage';

// Helper Functions
export const createDocument = async (collectionId: string, data: any, documentId?: string) => {
  try {
    return await databases.createDocument(
      DATABASE_ID,
      collectionId,
      documentId || ID.unique(),
      data
    );
  } catch (error) {
    console.error('Error creating document:', error);
    throw error;
  }
};

export const getDocuments = async (collectionId: string, queries?: string[]) => {
  try {
    return await databases.listDocuments(DATABASE_ID, collectionId, queries);
  } catch (error) {
    console.error('Error fetching documents:', error);
    throw error;
  }
};

export const getDocument = async (collectionId: string, documentId: string) => {
  try {
    return await databases.getDocument(DATABASE_ID, collectionId, documentId);
  } catch (error) {
    console.error('Error fetching document:', error);
    throw error;
  }
};

export const updateDocument = async (collectionId: string, documentId: string, data: any) => {
  try {
    return await databases.updateDocument(DATABASE_ID, collectionId, documentId, data);
  } catch (error) {
    console.error('Error updating document:', error);
    throw error;
  }
};

export const deleteDocument = async (collectionId: string, documentId: string) => {
  try {
    return await databases.deleteDocument(DATABASE_ID, collectionId, documentId);
  } catch (error) {
    console.error('Error deleting document:', error);
    throw error;
  }
};

export const uploadFile = async (file: File) => {
  try {
    return await storage.createFile(STORAGE_BUCKET_ID, ID.unique(), file);
  } catch (error) {
    console.error('Error uploading file:', error);
    throw error;
  }
};

export const getFilePreview = (fileId: string, width?: number, height?: number) => {
  return storage.getFilePreview(STORAGE_BUCKET_ID, fileId, width, height);
};

export const getFileView = (fileId: string) => {
  return storage.getFileView(STORAGE_BUCKET_ID, fileId);
};

// Predefined Queries
export const commonQueries = {
  published: Query.equal('status', 'published'),
  orderByDate: Query.orderDesc('$createdAt'),
  orderByUpdated: Query.orderDesc('$updatedAt'),
  limit: (limit: number) => Query.limit(limit),
};

export { ID, Query };
export default client;
