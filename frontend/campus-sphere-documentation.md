Title Page

CAMPUSSPHERE: A WEB-BASED CAMPUS COMMUNITY AND SERVICES PORTAL  
A Major Project Report Submitted in Partial Fulfillment of the Requirements  
for the Award of the Degree of Bachelor of Technology (B.Tech.)  
in Computer Science and Engineering

By  
[Your Name]  
[Enrollment Number]

Under the Guidance of  
[Guide’s Name], [Designation]  
[Department], [Institution]

Department of Computer Science and Engineering  
[Institute Name]  
[City, State, Country]  
[Month, Year]

---

Declaration

I, [Your Name], hereby declare that the project titled “CampusSphere: A Web-Based Campus Community and Services Portal” submitted in partial fulfillment of the requirements for the degree of Bachelor of Technology in Computer Science and Engineering is an authentic record of my own work carried out under the supervision of [Guide’s Name], [Designation], [Institution]. This work has not been submitted, in part or full, for the award of any other degree or diploma in any other institution.

Date: [DD/MM/YYYY]  
Place: [City]

Signature: ___________________  
Name: [Your Name]  
Enrollment Number: [Your Enrollment Number]

---

Certificate

This is to certify that the project report entitled “CampusSphere: A Web-Based Campus Community and Services Portal” submitted by [Your Name], Enrollment Number [Your Enrollment Number], to [Institute Name] in partial fulfillment of the requirements for the award of the degree of Bachelor of Technology in Computer Science and Engineering is a bona fide record of work carried out under my guidance and supervision.

Date: [DD/MM/YYYY]  
Place: [City]

Signature of Guide: ___________________  
Name: [Guide’s Name]  
Designation: [Designation], [Department], [Institution]

Signature of Head of Department: ___________________  
Name: [HOD’s Name]  
Designation: Head, Department of CSE, [Institution]

Institution Seal

---

Acknowledgment

I would like to express my sincere gratitude to my guide, [Guide’s Name], for their continuous support, valuable guidance, and encouragement throughout this project. I am grateful to [HOD’s Name], Head of the Department of Computer Science and Engineering, for providing the necessary resources and an environment conducive to research and development. I also thank the faculty members and technical staff of the department for their assistance.

Special thanks to my peers and friends for their constructive feedback and to my family for their unwavering support and motivation. Finally, I acknowledge all the authors and communities whose open-source tools and research contributed to this work.

---

Abstract

This report presents CampusSphere, a web-based campus community and services portal that centralizes academic information, student services, event management, and peer collaboration into a unified platform. The system addresses common challenges faced by students and administrators, such as fragmented communication channels, manual processes for service requests, and lack of integrated access to academic resources. CampusSphere offers features including role-based dashboards, announcements, event calendars, service request tracking, discussion forums, and an extensible module architecture for future integration (e.g., placement updates, hostel management, and library APIs).

The solution adopts a modular micro-frontend-inspired structure within a single-page application (SPA) for maintainability. The backend exposes secure REST APIs with JSON Web Token (JWT) authentication and follows a layered architecture. The database schema is normalized to ensure data integrity while supporting efficient queries for dashboards and reports. This report covers system analysis, design, implementation details, testing strategies, and result analysis. The evaluation demonstrates improved accessibility, reduced processing time for service requests, and enhanced user satisfaction. The document concludes with limitations, lessons learned, and a roadmap for future enhancements, including mobile app integration, analytics, and AI-driven personalization.

Keywords: Campus portal, student services, SPA, JWT authentication, REST API, database design, usability, performance.

---

Table of Contents

1. Introduction  
   1.1 Background  
   1.2 Problem Statement  
   1.3 Objectives  
   1.4 Scope and Limitations  
2. System Analysis  
   2.1 Existing System  
   2.2 Proposed System  
   2.3 Hardware Requirements  
   2.4 Software Requirements  
   2.5 Input and Output Specification  
3. System Design  
   3.1 System Architecture  
   3.2 Data Flow Diagram / Use Case Diagram  
   3.3 Database Design  
   3.4 Module Design  
4. Implementation  
   4.1 Tools and Technologies Used  
   4.2 Code Explanation  
   4.3 Screenshots  
5. Testing and Results  
   5.1 Testing Methods  
   5.2 Test Cases Table  
   5.3 Output Screens  
   5.4 Result Analysis  
6. Conclusion and Future Work  
References  
Appendix

(Note: Update page numbers after inserting into Word using automatic TOC.)

---

List of Figures and Tables

Figures  
- Figure 1.1: Campus Context and Stakeholders  
- Figure 3.1: System Architecture Diagram  
- Figure 3.2: Level-0 DFD (Context Diagram)  
- Figure 3.3: Level-1 DFD (Service Request Processing)  
- Figure 3.4: Use Case Diagram  
- Figure 3.5: ER Diagram  
- Figure 4.1: Login Screen  
- Figure 4.2: Student Dashboard  
- Figure 4.3: Service Request Form  
- Figure 5.1: Test Execution Summary Chart

Tables  
- Table 2.1: Hardware Requirements  
- Table 2.2: Software Requirements  
- Table 2.3: Input and Output Specification  
- Table 3.1: Database Tables Overview  
- Table 3.2: Module-Wise Features  
- Table 5.1: Test Cases  
- Table 5.2: Performance Metrics

(Insert automatic captions in Word to manage numbering.)

---

1. Introduction

1.1 Background

Higher education institutions manage diverse services including academic administration, student support, event organization, and communication among stakeholders. Traditional systems are often siloed, relying on disparate tools, email threads, and manual workflows, which cause inefficiencies and reduced visibility. With the proliferation of web technologies, there is an increasing demand for unified platforms that streamline operations, enhance communication, and improve student experience. CampusSphere is designed to meet these needs by aggregating critical services into a single, role-aware portal for students, faculty, and administrators.

`i1.1.1 Institutional Context and Stakeholders

- Students: Require timely access to announcements, academic schedules, service requests, and peer collaboration tools.
- Faculty: Need convenient channels to publish notices, manage events, and interact with classes and committees.
- Administrators: Oversee user management, audit trails, compliance, and performance of campus services.
- IT Support: Maintain infrastructure, security, integrations, and ensure system uptime and data protection.

1.1.2 Motivation and Rationale

The motivation for CampusSphere arose from recurring pain points observed during requirement elicitation workshops: inconsistent information dissemination, lack of self-service for routine requests, and difficulty measuring service performance. A unified portal promises operational efficiency, better user satisfaction, and measurable KPIs (e.g., request resolution time, announcement reach, and event participation).

1.2 Problem Statement

- Fragmented systems lead to duplicated data and inconsistent information.  
- Manual service request handling causes delays and limited tracking.  
- Inefficient communication channels reduce student engagement and awareness.  
- Lack of analytics hampers data-driven decision-making.  
- Existing solutions may be costly, proprietary, or insufficiently customizable for institutional workflows.

1.3 Objectives

- Develop a secure, scalable web portal integrating campus services.  
- Provide role-based dashboards for students, faculty, and admins.  
- Implement modules for announcements, events, service requests, and forums.  
- Ensure responsive UI and accessible design (WCAG-aligned).  
- Enable extensibility for future modules (placements, hostel, library).  
- Apply robust testing and performance optimization practices.

1.4 Scope and Limitations

- Scope: Authentication, dashboards, announcements, events, service requests, forums, basic reporting, and admin management.  
- Out of Scope (current version): Native mobile apps, advanced analytics, deep integration with legacy ERP/Library systems.  
- Limitations: Internet dependency, constrained offline functionality, and limited real-time features in MVP.  
- Assumptions: Users have institutional accounts; institutional email for verification; modern browsers.

---

2. System Analysis

2.1 Existing System

- Manual forms for services; email-based communications.  
- Separate platforms for events, notices, and academic information.  
- Limited transparency in request processing and approval status.  
- No centralized dashboard for stakeholders.

Challenges: High turnaround time, low visibility, redundant data entry, limited accessibility on mobile, and dependence on staff for routine updates.

2.2 Proposed System

CampusSphere offers:  
- Unified portal with SSO-ready authentication and role-based access.  
- Modular features: announcements, events calendar, service requests, discussions.  
- Self-service dashboards with notifications.  
- RESTful APIs, JWT-based sessions, audit logs.  
- Extensible architecture to integrate additional services.

Benefits: Reduced processing time, improved communication, better user experience, and maintainable codebase with clear separation of concerns.

2.2.1 Functional Requirements

- FR-01: Users shall authenticate with institutional email and password.
- FR-02: Role-based dashboards shall display relevant widgets (announcements, events, requests).
- FR-03: Faculty/Admin shall publish and schedule announcements to target audiences.
- FR-04: Users shall submit and track service requests with status notifications.
- FR-05: System shall support event creation, RSVP, and reminders.
- FR-06: Forum shall enable posts, replies, tagging, and search.
- FR-07: Admin shall manage users, roles, and audit logs.

2.2.2 Non-Functional Requirements

- Performance: P95 response time ≤ 250 ms for common read endpoints under expected load.
- Availability: 99.5% monthly uptime target for the MVP.
- Security: JWT-based auth, RBAC, input validation, and secure password storage.
- Usability: Responsive UI, keyboard navigable, color-contrast compliant.
- Scalability: Stateless services and horizontal scaling support.
- Maintainability: Modular codebase, documented APIs, and CI checks.

2.2.3 Risk Analysis and Mitigation

- R1: Scope creep due to new module requests → Mitigate with a clear release plan and change control.
- R2: Integration complexities with legacy systems → Design adapters and schedule phased integrations.
- R3: Data privacy issues → Enforce least-privilege access, audit logs, and data retention policies.
- R4: Performance degradation under peak loads → Introduce caching and asynchronous processing for heavy tasks.

2.3 Hardware Requirements

Table 2.1: Hardware Requirements

| Component | Minimum | Recommended |
| --- | --- | --- |
| Server CPU | 2 vCPU | 4+ vCPU |
| Server RAM | 4 GB | 8–16 GB |
| Storage | 50 GB SSD | 100+ GB SSD |
| Client Devices | Modern PC/Phone | Same |
| Network | 10 Mbps | 50+ Mbps |

2.4 Software Requirements

Table 2.2: Software Requirements

| Layer | Technology |
| --- | --- |
| OS | Ubuntu Server 22.04 LTS / Windows Server 2019+ |
| Backend | Node.js 18+/Express or NestJS |
| Frontend | React 18+/Vite or Next.js |
| Database | PostgreSQL 14+ |
| Auth | JWT, bcrypt |
| Tools | Git, Postman, Docker (optional) |
| CI/CD | GitHub Actions (optional) |
| Testing | Jest, React Testing Library |

2.5 Input and Output Specification

Table 2.3: Input and Output Specification

| Module | Inputs | Processing | Outputs |
| --- | --- | --- | --- |
| Authentication | Email, password | Validation, hashing, JWT | Session token, role |
| Announcements | Title, body, audience | Validation, persistence | Feed items |
| Events | Title, date, venue | Scheduling, reminders | Calendar entries |
| Service Request | Category, description | Routing, status updates | Ticket ID, status |
| Forum | Post text, tags | Moderation, indexing | Threads, replies |
| Admin | CRUD forms | Validation, RBAC | Updated entities |

---

3. System Design

3.1 System Architecture

- Client: React SPA with modular pages and shared components.  
- API Gateway: REST endpoints for authentication, CRUD, and reporting.  
- Service Layer: Business rules, validation, and orchestration.  
- Data Layer: PostgreSQL with normalized schema, indexes, and migrations.  
- Security: JWT auth, role-based access, input validation, rate limiting.  
- Deployment: Container-ready; supports horizontal scaling for stateless services.

[Insert Figure 3.1: System Architecture Diagram Here]

3.2 Data Flow Diagram / Use Case Diagram

- Level-0 DFD: External entities (Student, Faculty, Admin) interacting with CampusSphere portal.  
- Level-1 DFD: Decomposition of service request lifecycle: submission → triage → assignment → resolution → feedback.  
- Use Case Diagram: Actors and core use cases (Login, View Dashboard, Submit Request, Post Announcement, Manage Events).

[Insert Figure 3.2: Level-0 DFD (Context Diagram) Here]  
[Insert Figure 3.3: Level-1 DFD (Service Request Processing) Here]  
[Insert Figure 3.4: Use Case Diagram Here]

3.3 Database Design

- Key Entities: `users`, `roles`, `announcements`, `events`, `service_requests`, `comments`, `attachments`, `notifications`, `audit_logs`.  
- Relationships: One-to-many between `users` and `service_requests`; many-to-many for `users` and `roles` via `user_roles`.  
- Constraints: NOT NULL, unique indexes on emails; foreign keys with ON DELETE RESTRICT/SET NULL; created_at/updated_at timestamps.

[Insert Figure 3.5: ER Diagram Here]

Table 3.1: Database Tables Overview

| Table | Primary Key | Important Fields | Relationships |
| --- | --- | --- | --- |
| users | user_id | name, email, password_hash, status | user_roles, service_requests, comments |
| roles | role_id | name | user_roles |
| user_roles | (user_id, role_id) | assigned_at | users ↔ roles |
| announcements | announcement_id | title, body, audience, created_by | users (created_by) |
| events | event_id | title, start_at, venue, organizer_id | users (organizer) |
| service_requests | request_id | category, description, status, assignee_id | users (requester, assignee) |
| comments | comment_id | request_id, author_id, body | users, service_requests |
| attachments | attachment_id | owner_type, owner_id, path | polymorphic |
| notifications | notification_id | user_id, type, payload, read_at | users |
| audit_logs | log_id | actor_id, action, entity, entity_id | users |

3.4 Module Design

Table 3.2: Module-Wise Features

| Module | Features | Roles |
| --- | --- | --- |
| Authentication | Registration, login, password reset, email verification | All |
| Dashboard | Announcements, events, recent requests, notifications | Student/Faculty/Admin |
| Announcements | Create, schedule, target audience, archive | Faculty/Admin |
| Events | Create, edit, RSVP, reminders, calendar integration | Faculty/Admin/Student |
| Service Requests | Create, assign, comment, change status, feedback | Student/Admin |
| Forum | Post, reply, tag, moderate, search | All |
| Admin | User/role management, audit logs, reports | Admin |

3.4.1 Detailed Module Descriptions

- Authentication Module: Handles registration, login, token issuance, refresh flow, and password reset with rate limiting and email verification hooks.
- Dashboard Module: Aggregates recent announcements, events, and requests through optimized queries and server-side pagination.
- Announcements Module: Supports scheduling, target audiences, and archiving with retention policies.
- Events Module: Provides recurrence rules, RSVP, capacity limits, and conflict detection.
- Service Requests Module: Enables categorization, SLA tracking, triage workflows, and comment threads.
- Forum Module: Offers moderation tools, content reporting, and search with relevance ranking.
- Admin Module: Includes user provisioning, bulk role assignment, and exportable audit trails.

3.4.2 Security Design Considerations

- RBAC across controllers and UI routes with defense-in-depth checks.
- Input validation using schema validators; centralized error handling.
- Secure headers (CSP, X-Content-Type-Options) and HTTPS enforcement.
- Sensitive logging redaction and minimal payload storage.

---

4. Implementation

4.1 Tools and Technologies Used

- Frontend: React 18, TypeScript, Vite, React Router, Tailwind CSS.  
- State Management: Context API/Redux Toolkit (as applicable).  
- Backend: Node.js 18, Express.js, Prisma ORM (or Sequelize).  
- Database: PostgreSQL.  
- Auth: JWT (access/refresh), bcrypt for password hashing.  
- DevOps: Git, Docker (optional), GitHub Actions (optional).  
- Testing: Jest, React Testing Library, Supertest (backend).  
- Utilities: Zod/Yup for validation, Winston/Pino for logging.

4.2 Code Explanation (with snippets and comments)

Authentication controller (backend):

```javascript
// src/controllers/authController.js
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { prisma } = require('../db/client');

const ACCESS_TTL = '15m';
const REFRESH_TTL = '7d';

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await prisma.users.findUnique({ where: { email } });
  if (!user) return res.status(401).json({ message: 'Invalid credentials' });

  const ok = await bcrypt.compare(password, user.password_hash);
  if (!ok) return res.status(401).json({ message: 'Invalid credentials' });

  const accessToken = jwt.sign({ sub: user.user_id, roles: user.roles }, process.env.JWT_SECRET, { expiresIn: ACCESS_TTL });
  const refreshToken = jwt.sign({ sub: user.user_id }, process.env.JWT_SECRET, { expiresIn: REFRESH_TTL });

  return res.json({ accessToken, refreshToken });
};
```

JWT middleware:

```javascript
// src/middleware/auth.js
const jwt = require('jsonwebtoken');

module.exports = (requiredRoles = []) => (req, res, next) => {
  const header = req.headers.authorization || '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : null;
  if (!token) return res.status(401).json({ message: 'Missing token' });

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = payload;
    if (requiredRoles.length && !requiredRoles.some(r => payload.roles?.includes(r))) {
      return res.status(403).json({ message: 'Forbidden' });
    }
    return next();
  } catch {
    return res.status(401).json({ message: 'Invalid token' });
  }
};
```

Service request routes:

```javascript
// src/routes/requests.js
const router = require('express').Router();
const auth = require('../middleware/auth');
const { prisma } = require('../db/client');

router.post('/', auth(['student']), async (req, res) => {
  const { category, description } = req.body;
  const request = await prisma.service_requests.create({
    data: {
      category,
      description,
      status: 'OPEN',
      requester_id: req.user.sub,
    },
  });
  res.status(201).json(request);
});

router.patch('/:id/status', auth(['admin']), async (req, res) => {
  const { status, assigneeId } = req.body;
  const updated = await prisma.service_requests.update({
    where: { request_id: Number(req.params.id) },
    data: { status, assignee_id: assigneeId ?? null },
  });
  res.json(updated);
});

module.exports = router;
```

Frontend API client:

```typescript
// src/api/client.ts
export async function api<T>(path: string, options: RequestInit = {}): Promise<T> {
  const token = localStorage.getItem('accessToken');
  const headers = new Headers(options.headers || {});
  headers.set('Content-Type', 'application/json');
  if (token) headers.set('Authorization', `Bearer ${token}`);
  const res = await fetch(import.meta.env.VITE_API_URL + path, { ...options, headers });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}
```

React dashboard component:

```tsx
// src/pages/Dashboard.tsx
import { useEffect, useState } from 'react';
import { api } from '../api/client';

type Announcement = { announcement_id: number; title: string; body: string; created_at: string; };

export default function Dashboard() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);

  useEffect(() => {
    api<Announcement[]>('/announcements').then(setAnnouncements).catch(console.error);
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-xl font-semibold">Welcome to CampusSphere</h1>
      <section className="mt-4">
        <h2 className="text-lg font-medium">Latest Announcements</h2>
        <ul className="list-disc ml-6">
          {announcements.map(a => (
            <li key={a.announcement_id}>
              <strong>{a.title}</strong> — {new Date(a.created_at).toLocaleString()}
              <div>{a.body}</div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
```

Database migration (Prisma example):

```sql
-- prisma/migrations/001_init.sql
CREATE TABLE users (
  user_id SERIAL PRIMARY KEY,
  name VARCHAR(120) NOT NULL,
  email VARCHAR(160) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  status VARCHAR(16) DEFAULT 'ACTIVE',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE service_requests (
  request_id SERIAL PRIMARY KEY,
  requester_id INTEGER REFERENCES users(user_id),
  assignee_id INTEGER REFERENCES users(user_id),
  category VARCHAR(50) NOT NULL,
  description TEXT NOT NULL,
  status VARCHAR(16) DEFAULT 'OPEN',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

Backend configuration (Express app setup):

```javascript
// src/app.js
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const authRoutes = require('./routes/auth');
const requestRoutes = require('./routes/requests');

const app = express();
app.use(helmet());
app.use(cors({ origin: process.env.CORS_ORIGIN?.split(',') ?? '*', credentials: true }));
app.use(express.json({ limit: '1mb' }));

app.use('/auth', authRoutes);
app.use('/requests', requestRoutes);

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: 'Internal Server Error' });
});

module.exports = app;
```

Frontend login component:

```tsx
// src/pages/Login.tsx
import { useState } from 'react';
import { api } from '../api/client';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    try {
      const res = await api<{ accessToken: string; refreshToken: string }>(
        '/auth/login',
        { method: 'POST', body: JSON.stringify({ email, password }) }
      );
      localStorage.setItem('accessToken', res.accessToken);
      window.location.href = '/';
    } catch (err: any) {
      setError(err.message || 'Login failed');
    }
  }

  return (
    <div className="max-w-sm mx-auto mt-24 p-6 border rounded">
      <h1 className="text-xl font-semibold mb-4">Login</h1>
      <form onSubmit={onSubmit} className="space-y-3">
        <input className="w-full border p-2" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
        <input type="password" className="w-full border p-2" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
        {error && <div className="text-red-600 text-sm">{error}</div>}
        <button className="bg-blue-600 text-white px-4 py-2 rounded">Sign in</button>
      </form>
    </div>
  );
}
```

4.3 Screenshots (use placeholders)

- [Insert Figure 4.1: Login Screen Here]  
- [Insert Figure 4.2: Student Dashboard Here]  
- [Insert Figure 4.3: Service Request Form Here]  
- [Insert Figure 4.4: Admin Management Panel Here]

---

5. Testing and Results

5.1 Testing Methods

- Unit Testing: Controllers, services, and utilities using Jest.  
- Integration Testing: API endpoints using Supertest.  
- UI Testing: React Testing Library for components and flows.  
- Performance Testing: Load testing with k6/Artillery for key endpoints.  
- Security Testing: Input validation, JWT handling, access control checks.  
- UAT: Feedback from a pilot group of students and faculty.

5.2 Test Cases Table

Table 5.1: Test Cases

| TC ID | Module | Test Scenario | Steps | Expected Result | Status |
| --- | --- | --- | --- | --- | --- |
| TC-01 | Auth | Valid login | Enter valid email/password | Redirect to dashboard; token stored | Pass |
| TC-02 | Auth | Invalid login | Enter wrong password | Error message; no token | Pass |
| TC-03 | Requests | Create request | Fill form and submit | Request created; status OPEN | Pass |
| TC-04 | Requests | Update status | Admin changes to IN_PROGRESS | Status updated and visible | Pass |
| TC-05 | Announce | Create announcement | Admin submits form | Appears in feed | Pass |
| TC-06 | Events | RSVP | User clicks RSVP | Status saved; reflected in UI | Pass |
| TC-07 | Security | RBAC | Student tries admin route | 403 Forbidden | Pass |

Performance Metrics (sample)

Table 5.2: Performance Metrics

| Endpoint | 95th Percentile (ms) | RPS @ 100 VU | Error Rate |
| --- | --- | --- | --- |
| POST /login | 210 | 45 | 0.2% |
| GET /announcements | 150 | 60 | 0% |
| POST /requests | 180 | 40 | 0.3% |

5.3 Output Screens

- [Insert Figure 5.1: Test Execution Summary Chart Here]  
- [Insert Figure 5.2: API Response Example Here]  
- [Insert Figure 5.3: UI Flow Screenshot Here]

5.4 Result Analysis

- Functional Correctness: All critical user flows validated; non-critical edge cases recorded for iteration.  
- Performance: Meets target response times under expected loads with headroom for scaling.  
- Usability: Positive feedback on clarity and navigation; minor suggestions for visual contrast and keyboard accessibility.  
- Reliability: No critical crashes in UAT; graceful error handling present.

5.5 Test Strategy and Coverage

- Unit Coverage Target: ≥ 75% statements for core modules.
- Integration Tests: Focus on authentication, RBAC, and service request lifecycle.
- Accessibility Testing: Keyboard navigation paths and ARIA roles validated on primary flows.
- Regression Suite: Smoke tests on announcements, events, and dashboard widgets per release.

5.6 Performance Tuning Summary

- Enabled GZIP/HTTP compression and HTTP keep-alive.
- Implemented pagination and selective projections on list endpoints.
- Added indexes for high-frequency queries (created_at, foreign keys).
- Deferred heavy tasks to background jobs (future enhancement).

---

6. Conclusion and Future Work

CampusSphere consolidates essential campus services into a secure, scalable web portal that improves communication, reduces processing times, and enhances user experience. The modular architecture supports maintainability and future integrations. Testing confirms functional completeness for the MVP and adequate performance under load.

Future Work:  
- Mobile app (Android/iOS) with offline-first capabilities.  
- Real-time features (WebSockets) for notifications and chat.  
- Analytics dashboards and reports for administrators.  
- Integrations with ERP, library systems, and payment gateways.  
- AI-driven personalization and content recommendations.  
- Enhanced accessibility and localization support.

7. References

---

References

- Pressman, R. S., & Maxim, B. R. (2020). Software Engineering: A Practitioner’s Approach (9th ed.). McGraw-Hill.  
- Fowler, M. (2003). Patterns of Enterprise Application Architecture. Addison-Wesley.  
- Fielding, R. T. (2000). Architectural Styles and the Design of Network-based Software Architectures (Doctoral dissertation). University of California, Irvine.  
- OWASP Foundation. (2023). OWASP Top Ten. Retrieved from https://owasp.org  
- Hunt, A., & Thomas, D. (2019). The Pragmatic Programmer (20th Anniversary Ed.). Addison-Wesley.  
- ISO/IEC 25010:2011 Systems and software engineering — Systems and software Quality Requirements and Evaluation (SQuaRE).  
- Postman Team. (2024). API Testing Best Practices. Retrieved from https://www.postman.com  
- PostgreSQL Global Development Group. (2024). PostgreSQL Documentation. Retrieved from https://www.postgresql.org/docs/  
- React Team. (2024). React Documentation. Retrieved from https://react.dev  
- Node.js Foundation. (2024). Node.js Documentation. Retrieved from https://nodejs.org/en/docs/

(Format references in APA/IEEE as required by your institution.)

---

Appendix

A. Source Code (Selected)

Backend `.env` example (do not commit to VCS):

```bash
PORT=8080
DATABASE_URL=postgresql://user:password@localhost:5432/campussphere
JWT_SECRET=replace_with_strong_secret
```

Sample seed script:

```javascript
// scripts/seed.js
const { prisma } = require('../src/db/client');
(async () => {
  await prisma.users.create({
    data: { name: 'Admin', email: 'admin@campus.edu', password_hash: '$2a$10$hash', status: 'ACTIVE' }
  });
  process.exit(0);
})();
```

Frontend route configuration:

```tsx
// src/App.tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login/>} />
        <Route path="/" element={<Dashboard/>} />
      </Routes>
    </BrowserRouter>
  );
}
```

B. Additional Materials

- UI wireframes and design guidelines.  
- Meeting notes and requirement elicitation summaries.  
- Risk assessment and mitigation plan.  
- Deployment checklist and runbook.

---

Placeholders for Diagrams (insert actual diagrams in Word):
- [Insert Figure 1.1: Campus Context and Stakeholders]  
- [Insert Figure 3.1: System Architecture Diagram]  
- [Insert Figure 3.2: Level-0 DFD]  
- [Insert Figure 3.3: Level-1 DFD]  
- [Insert Figure 3.4: Use Case Diagram]  
- [Insert Figure 3.5: ER Diagram]

Placeholders for Screens:
- [Insert Figure 4.1: Login Screen]  
- [Insert Figure 4.2: Student Dashboard]  
- [Insert Figure 4.3: Service Request Form]  
- [Insert Figure 5.1: Test Summary Chart]

Formatting Notes for Word:

- Apply “Heading 1/2/3” for numbered headings (enable multilevel list).  
- Insert automatic Table of Contents and update fields before submission.  
- Insert “Table Caption” and “Figure Caption” for numbering and cross-references.  
- Use page numbers, header with project title, and footer with your name/enrollment.

C. Deployment Guide (Summary)

- Prerequisites: Node.js 18+, PostgreSQL 14+, environment variables configured.
- Steps: Install dependencies, run database migrations, build frontend, start backend, configure reverse proxy (Nginx/IIS).
- Health Checks: `/health` endpoint on backend; uptime monitor configuration.
- Backup: Nightly database dump with 7-day retention.

D. Maintenance and Support Plan

- Issue Triage: Labeling, prioritization, and SLAs for bug fixes.
- Release Cadence: Bi-weekly sprint releases with changelogs.
- Monitoring: Logs, alerts, and periodic performance reviews.

E. Project Management Artifacts

- High-level Gantt chart placeholder: [Insert Figure: Project Timeline and Milestones]
- RACI Matrix placeholder: [Insert Table: Roles and Responsibilities]

