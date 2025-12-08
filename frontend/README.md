# Campus Sphere - College Management Platform

A comprehensive, secure digital platform for colleges that supports students, teachers, non-teaching staff, parents, and administrators with role-based access and personalized dashboards.

## Features

### 🧑‍🎓 Student Features
- **Fee Management**: View all fee details, payment tracking, and receipt downloads
- **Academic Records**: Semester-wise performance tracking, CGPA monitoring, and transcript downloads
- **Study Materials**: Access textbooks, PDFs, lab manuals, and video lectures
- **Document Requests**: Apply for certificates, transcripts, and official documents
- **Scholarships**: Apply for scholarships and track approval status
- **Time Table**: View class schedules and subject credits
- **Campus Email**: Secure internal communication system
- **Notifications**: Role-specific alerts and updates

### 👨‍🏫 Teacher Features
- **Student Management**: View assigned students' academic data
- **Marks & Attendance**: Post grades and track attendance for assigned subjects
- **Campus Email**: Internal communication with students and faculty
- **Document Management**: Request and download payslips and certificates
- **Notifications**: Teacher-specific alerts and announcements

### 👨‍🔧 Staff Features
- **Task Management**: View assignments and track work progress
- **Leave Management**: Apply for leave and track approvals
- **Attendance Tracking**: Monitor work attendance and HR information
- **Document Access**: Download payslips and certificates
- **Notifications**: Staff-specific updates and circulars

### 👨‍👩‍👧 Parent Features
- **Child Performance**: Monitor academic progress and teacher feedback
- **Fee Management**: View and pay fees through secure payment gateway
- **Communication**: Receive updates about child's performance
- **Notifications**: Parent-specific alerts and PTM invitations

### 🛠️ Admin Features
- **User Management**: Onboard and manage all user types
- **Analytics**: Global reporting and performance monitoring
- **Document Workflow**: Manage certificate processing and approvals
- **Communication Control**: Monitor campus email usage
- **Role-Based Permissions**: Control access and data visibility

## Technology Stack

- **Frontend**: React 18 with TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Backend**: Supabase (PostgreSQL database, Authentication, Storage)
- **Build Tool**: Vite
- **State Management**: React Context API

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Supabase account

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd campus-sphere
```

2. Install dependencies:
```bash
npm install
```

3. Set up Supabase:
   - Create a new Supabase project
   - Copy your project URL and anon key
   - Update the `.env.local` file with your Supabase credentials:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. **IMPORTANT**: Run the database migrations:
   - Go to your Supabase dashboard
   - Navigate to SQL Editor
   - Copy and paste the contents of `supabase/migrations/create_initial_schema.sql`
   - Execute the SQL to create all necessary tables and security policies

5. Start the development server:
```bash
npm run dev
```

6. **Setup Demo Users** (First Time Only):
   - Click the "Setup Demo Users" button on the login page
   - This will create demo accounts for all user roles
   - Use password `demo123456` for all demo accounts
   - Wait for the success message before attempting to login

## ⚠️ Troubleshooting

If you encounter "Invalid login credentials" errors:

1. **Check Environment Variables**: Ensure your `.env.local` file has the correct Supabase URL and API key
2. **Apply Database Schema**: Make sure you've run the SQL migration in your Supabase dashboard
3. **Setup Demo Users**: Click the "Setup Demo Users" button and wait for completion
4. **Verify in Supabase**: Check your Supabase Authentication tab to see if users were created
5. **Disable Email Confirmation**: In Supabase Auth settings, disable email confirmation for testing

## Database Schema

The application uses a comprehensive database schema with the following main tables:

- **users**: Store all user information with role-based access
- **fee_details**: Student fee information and payment tracking
- **academic_records**: Academic performance and grades
- **documents**: Document requests and approvals
- **scholarships**: Scholarship applications and status
- **notifications**: Role-based notification system
- **academic_materials**: Study materials and resources
- **tasks**: Staff task assignments
- **emails**: Campus email system

## Security Features

- **Row Level Security (RLS)**: Implemented on all tables
- **Role-Based Access Control**: Users can only access data relevant to their role
- **Data Isolation**: Complete separation of data between different user types
- **Secure Authentication**: Powered by Supabase Auth
- **Campus-Only Email**: Internal communication system

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support and questions, please contact the development team or create an issue in the repository.