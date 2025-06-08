# Appwrite Database Collections Documentation

This document provides a comprehensive guide to set up the Appwrite database collections for the College Jaankaar application. Follow this structure to recreate the database in your Appwrite project.

## Database Configuration

### Database Information
- **Database ID**: `main-database` (or use environment variable `VITE_APPWRITE_DATABASE_ID`)
- **Storage Bucket ID**: `main-storage` (or use environment variable `VITE_APPWRITE_STORAGE_BUCKET_ID`)

### Environment Variables Required
```
VITE_APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
VITE_APPWRITE_PROJECT_ID=your-project-id
VITE_APPWRITE_DATABASE_ID=main-database
VITE_APPWRITE_STORAGE_BUCKET_ID=main-storage
```

## Collections Structure

### 1. Testimonials Collection
**Collection ID**: `testimonials`

#### Attributes:
| Attribute | Type | Size | Required | Array | Default |
|-----------|------|------|----------|-------|---------|
| name | String | 255 | ✓ | ✗ | - |
| role | String | 255 | ✓ | ✗ | - |
| content | String | 2000 | ✓ | ✗ | - |
| rating | Integer | - | ✓ | ✗ | 5 |
| image | URL | 2048 | ✓ | ✗ | - |
| status | String | 50 | ✗ | ✗ | "published" |

#### Indexes:
- `status_index` (ASC) on `status`
- `rating_index` (DESC) on `rating`

---

### 2. Blog Posts Collection
**Collection ID**: `blog-posts`

#### Attributes:
| Attribute | Type | Size | Required | Array | Default |
|-----------|------|------|----------|-------|---------|
| title | String | 255 | ✓ | ✗ | - |
| excerpt | String | 500 | ✓ | ✗ | - |
| image | URL | 2048 | ✓ | ✗ | - |
| category | String | 100 | ✓ | ✗ | - |
| readTime | String | 50 | ✓ | ✗ | - |
| content | String | 50000 | ✗ | ✗ | - |
| author | String | 255 | ✗ | ✗ | - |
| tags | String | 100 | ✗ | ✓ | - |
| status | String | 50 | ✗ | ✗ | "published" |
| featured | Boolean | - | ✗ | ✗ | false |

#### Indexes:
- `status_index` (ASC) on `status`
- `category_index` (ASC) on `category`
- `featured_index` (DESC) on `featured`

---

### 3. Universities Collection
**Collection ID**: `universities`

#### Attributes:
| Attribute | Type | Size | Required | Array | Default |
|-----------|------|------|----------|-------|---------|
| name | String | 255 | ✓ | ✗ | - |
| logo | URL | 2048 | ✓ | ✗ | - |
| ranking | String | 10 | ✓ | ✗ | - |
| description | String | 1000 | ✓ | ✗ | - |
| location | String | 255 | ✗ | ✗ | - |
| established | String | 10 | ✗ | ✗ | - |
| students | String | 50 | ✗ | ✗ | - |
| programs | String | 50 | ✗ | ✗ | - |
| website | URL | 2048 | ✗ | ✗ | - |
| type | String | 100 | ✗ | ✗ | "university" |
| country | String | 100 | ✗ | ✗ | - |
| status | String | 50 | ✗ | ✗ | "published" |

#### Indexes:
- `status_index` (ASC) on `status`
- `ranking_index` (DESC) on `ranking`
- `location_index` (ASC) on `location`
- `type_index` (ASC) on `type`

---

### 4. Career Paths Collection
**Collection ID**: `career-paths`

#### Attributes:
| Attribute | Type | Size | Required | Array | Default |
|-----------|------|------|----------|-------|---------|
| title | String | 255 | ✓ | ✗ | - |
| description | String | 1000 | ✓ | ✗ | - |
| averageSalary | String | 50 | ✓ | ✗ | - |
| growthRate | String | 20 | ✓ | ✗ | - |
| skills | String | 100 | ✓ | ✓ | - |
| icon | String | 100 | ✓ | ✗ | - |
| category | String | 100 | ✗ | ✗ | - |
| experience | String | 50 | ✗ | ✗ | - |
| education | String | 255 | ✗ | ✗ | - |
| status | String | 50 | ✗ | ✗ | "published" |

#### Indexes:
- `status_index` (ASC) on `status`
- `category_index` (ASC) on `category`
- `title_index` (ASC) on `title`

---

### 5. FAQs Collection
**Collection ID**: `faqs`

#### Attributes:
| Attribute | Type | Size | Required | Array | Default |
|-----------|------|------|----------|-------|---------|
| question | String | 500 | ✓ | ✗ | - |
| answer | String | 2000 | ✓ | ✗ | - |
| category | String | 100 | ✗ | ✗ | "general" |
| order | Integer | - | ✗ | ✗ | 0 |
| status | String | 50 | ✗ | ✗ | "published" |

#### Indexes:
- `status_index` (ASC) on `status`
- `category_index` (ASC) on `category`
- `order_index` (ASC) on `order`

---

### 6. Consultation Services Collection
**Collection ID**: `consultation-services`

#### Attributes:
| Attribute | Type | Size | Required | Array | Default |
|-----------|------|------|----------|-------|---------|
| title | String | 255 | ✓ | ✗ | - |
| description | String | 1000 | ✓ | ✗ | - |
| duration | String | 100 | ✓ | ✗ | - |
| price | String | 50 | ✓ | ✗ | - |
| features | String | 200 | ✓ | ✓ | - |
| isPopular | Boolean | - | ✗ | ✗ | false |
| category | String | 100 | ✗ | ✗ | - |
| status | String | 50 | ✗ | ✗ | "published" |

#### Indexes:
- `status_index` (ASC) on `status`
- `popular_index` (DESC) on `isPopular`
- `category_index` (ASC) on `category`

---

### 7. Contact Forms Collection
**Collection ID**: `contact-forms`

#### Attributes:
| Attribute | Type | Size | Required | Array | Default |
|-----------|------|------|----------|-------|---------|
| name | String | 255 | ✓ | ✗ | - |
| email | Email | 255 | ✓ | ✗ | - |
| phone | String | 20 | ✗ | ✗ | - |
| subject | String | 255 | ✓ | ✗ | - |
| message | String | 2000 | ✓ | ✗ | - |
| status | String | 50 | ✗ | ✗ | "new" |
| priority | String | 20 | ✗ | ✗ | "normal" |

#### Indexes:
- `status_index` (ASC) on `status`
- `priority_index` (DESC) on `priority`
- `email_index` (ASC) on `email`

---

### 8. Consultations Collection
**Collection ID**: `consultations`

#### Attributes:
| Attribute | Type | Size | Required | Array | Default |
|-----------|------|------|----------|-------|---------|
| name | String | 255 | ✓ | ✗ | - |
| email | Email | 255 | ✓ | ✗ | - |
| mobile | String | 20 | ✓ | ✗ | - |
| message | String | 2000 | ✓ | ✗ | - |
| preferredTime | String | 100 | ✗ | ✗ | - |
| consultationType | String | 100 | ✗ | ✗ | - |
| status | String | 50 | ✗ | ✗ | "pending" |
| assignedTo | String | 255 | ✗ | ✗ | - |

#### Indexes:
- `status_index` (ASC) on `status`
- `email_index` (ASC) on `email`
- `consultationType_index` (ASC) on `consultationType`

---

### 9. Users Collection
**Collection ID**: `users`

#### Attributes:
| Attribute | Type | Size | Required | Array | Default |
|-----------|------|------|----------|-------|---------|
| userId | String | 255 | ✓ | ✗ | - |
| name | String | 255 | ✓ | ✗ | - |
| email | Email | 255 | ✓ | ✗ | - |
| avatar | URL | 2048 | ✗ | ✗ | - |
| role | String | 50 | ✗ | ✗ | "user" |
| preferences | String | 2000 | ✗ | ✗ | - |
| status | String | 50 | ✗ | ✗ | "active" |

#### Indexes:
- `userId_index` (ASC) on `userId`
- `email_index` (ASC) on `email`
- `role_index` (ASC) on `role`
- `status_index` (ASC) on `status`

---

### 10. Categories Collection
**Collection ID**: `categories`

#### Attributes:
| Attribute | Type | Size | Required | Array | Default |
|-----------|------|------|----------|-------|---------|
| name | String | 255 | ✓ | ✗ | - |
| slug | String | 255 | ✓ | ✗ | - |
| description | String | 1000 | ✗ | ✗ | - |
| icon | String | 100 | ✗ | ✗ | - |
| color | String | 20 | ✗ | ✗ | - |
| order | Integer | - | ✗ | ✗ | 0 |
| status | String | 50 | ✗ | ✗ | "published" |

#### Indexes:
- `slug_index` (ASC) on `slug`
- `status_index` (ASC) on `status`
- `order_index` (ASC) on `order`

---

## Storage Bucket Configuration

### Main Storage Bucket
**Bucket ID**: `main-storage`

#### File Types Allowed:
- Images: `jpg`, `jpeg`, `png`, `gif`, `webp`, `svg`
- Documents: `pdf`, `doc`, `docx`
- Maximum file size: 10MB

#### Permissions:
- Read: `any`
- Write: `users`
- Update: `users`
- Delete: `users`

---

## Permissions Configuration

### Default Permissions for Collections:

#### Read Permissions:
- `any` - For public collections (testimonials, blog-posts, universities, career-paths, faqs, consultation-services, categories)
- `users` - For user-specific collections (users, contact-forms, consultations)

#### Write Permissions:
- `users` - For user-generated content
- `team:admin` - For admin-only collections

#### Update Permissions:
- `users` - For user-owned documents
- `team:admin` - For admin management

#### Delete Permissions:
- `users` - For user-owned documents
- `team:admin` - For admin management

---

## Sample Data Setup

### Testimonials Sample Data:
```json
[
  {
    "name": "Sarah Johnson",
    "role": "University Student",
    "content": "The career counseling service helped me choose the perfect major and university. The guidance was invaluable!",
    "rating": 5,
    "image": "https://api.dicebear.com/9.x/avataaars/svg?seed=SarahJohnson",
    "status": "published"
  }
]
```

### Blog Posts Sample Data:
```json
[
  {
    "title": "How to Choose the Right Career Path",
    "excerpt": "Discover proven strategies to identify your passion and align it with market opportunities.",
    "image": "/api/placeholder/400/250",
    "category": "Career Planning",
    "readTime": "5 min read",
    "status": "published",
    "featured": true
  }
]
```

---

## Setup Instructions

1. **Create Appwrite Project**
   - Sign up at [Appwrite Cloud](https://cloud.appwrite.io) or set up self-hosted instance
   - Create a new project
   - Note down the Project ID

2. **Create Database**
   - Go to Databases section
   - Create a new database with ID: `main-database`

3. **Create Collections**
   - For each collection above, create with the specified Collection ID
   - Add all attributes as per the table specifications
   - Set up indexes as mentioned

4. **Configure Storage**
   - Create a storage bucket with ID: `main-storage`
   - Set file type restrictions and size limits
   - Configure permissions

5. **Set Environment Variables**
   - Update your `.env` file with the Appwrite configuration
   - Deploy your application

6. **Populate Sample Data**
   - Use the Appwrite Console or API to add initial data
   - Test the application functionality

---

## Notes

- All collections include automatic `$id`, `$createdAt`, and `$updatedAt` fields
- Ensure proper permissions are set based on your application requirements
- Consider implementing data validation rules in your application layer
- Regular backups are recommended for production environments
- Monitor API usage and set appropriate rate limits

---

## Troubleshooting

### Common Issues:
1. **Permission Denied**: Check collection permissions and user authentication
2. **Attribute Missing**: Ensure all required attributes are created with correct types
3. **Index Errors**: Verify index configuration matches query requirements
4. **Storage Issues**: Check file type restrictions and size limits

### Support Resources:
- [Appwrite Documentation](https://appwrite.io/docs)
- [Appwrite Discord Community](https://discord.com/invite/GSeTUeA)
- [GitHub Issues](https://github.com/appwrite/appwrite/issues)
