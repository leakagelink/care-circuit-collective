# Care Circuit Collective

# MASTER PROMPT: Build a Modern Customer, Billing, GPS & Complaint Management Platform

Act as a senior product designer, SaaS architect, full-stack engineer, database architect, and security engineer.

Build a production-oriented, modern, responsive customer management platform with three role-based interfaces:

1. Customer Portal / Customer App
2. Staff / Service Employee Portal
3. Admin Web Dashboard

The platform must manage customers, GPS locations, recurring monthly payments, payment history, outstanding balances, complaints, support conversations, staff assignments, service visits, notifications, and business reports.

This is a real business application, not a static UI demo. All core features must be connected to a real database, authentication system, and backend logic.

## 1. Product Goals

Create a professional, trustworthy, easy-to-use platform for businesses that serve registered customers and collect recurring monthly payments.

The system should allow administrators to manage the entire business from one dashboard, customers to manage their accounts and raise complaints, and staff to handle assigned customers, service visits, and payment collections.

Build the product as a responsive web application/PWA first, optimized for desktop, tablets, and mobile phones.

Use a modular architecture that can later support dedicated Android and iOS applications.

## 2. Technology Stack

Use the following technologies:

- Frontend: React, TypeScript, and Vite.
- UI: Tailwind CSS with shadcn/ui components.
- Icons: Lucide icons.
- Backend and database: Supabase.
- Database: PostgreSQL.
- Authentication: Supabase Auth.
- File storage: Supabase Storage.
- Server-side business logic: Supabase Edge Functions or secure PostgreSQL functions where appropriate.
- Forms and validation: React Hook Form and Zod.
- Charts: Recharts.
- Maps: A configurable map provider such as Google Maps or Mapbox.
- Location: Browser geolocation API with explicit user permission.
- Notifications: In-app notifications and web push where supported.
- Reports: CSV/Excel-compatible export and PDF generation.

Use environment variables for secrets and API keys. Never expose service-role keys, payment secrets, or privileged credentials in frontend code.

Connect the application to a real Supabase project. If credentials or integrations are unavailable, clearly identify the required setup instead of pretending that the integration is complete.

## 3. Visual Design System

Create a premium, modern SaaS interface.

Design direction:
- Clean, professional, enterprise-grade dashboard.
- Primary color: deep indigo or blue.
- Background: soft neutral gray or off-white.
- Cards: white surfaces, subtle borders, refined shadows.
- Typography: Inter or a similar modern sans-serif.
- Consistent spacing, border radius, and component sizing.
- Attractive charts, clear data tables, status badges, and informative empty states.
- Subtle transitions and micro-interactions.
- Light theme as the default, with optional dark mode.
- Accessible contrast, keyboard navigation, and readable text.

Avoid excessive gradients, oversized headings, unnecessary animations, cluttered layouts, and generic template-like UI.

Desktop admin layout:
- Collapsible left sidebar.
- Top navigation with search, notifications, and profile menu.
- Breadcrumbs and clear page titles.
- Responsive content area.
- Dashboard KPI cards, charts, tables, filters, and quick actions.

Mobile layout:
- Touch-friendly controls.
- Responsive tables or mobile card lists.
- Compact navigation.
- Mobile-friendly forms and bottom navigation where appropriate.
- No horizontal overflow.

Use consistent reusable components throughout the platform.

## 4. Authentication and Role-Based Access

Implement secure authentication with these roles:

- Admin
- Staff
- Customer

Required features:
- Login and logout.
- Customer registration where enabled by the administrator.
- Email verification where appropriate.
- Password reset.
- Profile management.
- Role-specific dashboards.
- Protected routes.
- Session management.
- Optional invitation-based staff onboarding.

Store role assignments securely in the database. Do not trust a role supplied by the frontend.

Implement Supabase Row Level Security (RLS) policies for all sensitive tables.

Access rules:
- Customers can access only their own profile, payments, complaints, notifications, and service history.
- Staff can access only the customers and work orders assigned to them, plus the minimum additional information required for their duties.
- Admins can manage business records according to their authorized permissions.

Do not allow users to elevate their own role or bypass authorization by modifying client-side requests.

## 5. Customer Management Module

Create a complete customer management system.

Customer fields:
- Unique customer ID, automatically generated.
- Full name.
- Mobile number.
- Email address.
- Profile photo.
- Address.
- City, state, postal code, and country.
- Latitude and longitude, when available and authorized.
- Registration date.
- Customer status: Active, Inactive, Suspended.
- Monthly billing amount.
- Billing start date.
- Billing day or due-date configuration.
- Assigned staff member.
- Internal admin notes.
- Relevant customer documents.

Features:
- Add, edit, view, search, filter, and archive customers.
- Search by name, phone, email, and customer ID.
- Filter by status, registration date, assigned staff, and payment status.
- Customer detail page with tabs for Overview, Payments, Complaints, Services, Documents, and Activity.
- Customer import from CSV.
- Duplicate detection for mobile numbers and email addresses where appropriate.
- Customer profile activity timeline.

Only authorized staff should see customer information necessary for their assigned work.

## 6. GPS and Location Management

Implement location management with real geolocation functionality.

Features:
- Request device location permission before collecting GPS coordinates.
- Capture and save the customer's location with the appropriate consent.
- Allow customers to enter or correct their address manually.
- Display customer locations on an interactive map.
- Display address and coordinates when authorized.
- Calculate distances between staff and assigned customers.
- Support nearby customer search using a configurable radius.
- Provide navigation links to Google Maps or another configured mapping provider.
- Display location accuracy and the timestamp of the last location update.
- Allow authorized users to update customer locations.
- Maintain location history only when required and explicitly configured.
- Allow administrators to filter the map by customer status, assigned staff, and outstanding payments.

Important:
- Do not continuously track customers or staff in the background by default.
- Do not silently collect GPS data.
- Request permission and explain the purpose before location collection.
- Use appropriate consent, retention limits, and access controls.
- If GPS permission is denied, allow manual address entry.
- Use a real map integration; do not present a static image as an interactive map.
- Handle unavailable geocoding, invalid coordinates, and API errors gracefully.

## 7. Monthly Billing and Payment Management

Build a robust recurring monthly billing module.

Each customer must have a configurable monthly billing amount and billing schedule.

Features:
- Monthly invoices generated automatically.
- Configurable billing start date and due date.
- Invoice number and customer reference.
- Amount due.
- Amount paid.
- Outstanding balance.
- Partial payment support.
- Multiple payment entries against an invoice.
- Paid, Partially Paid, Pending, Overdue, Cancelled, and Refunded statuses as appropriate.
- Payment history.
- Invoice details.
- Printable and downloadable payment receipts.
- Cash payment recording by authorized staff or admins.
- Online payment integration.
- Payment reminders.
- Overdue reminders.
- Monthly collection reports.
- Customer-wise and date-wise payment reports.
- Manual payment adjustments with audit logs and authorization.
- Refund and cancellation records where applicable.

Example customer billing table:

Customer | Monthly Amount | Amount Paid | Outstanding | Status
Customer A | ₹1,000 | ₹1,000 | ₹0 | Paid
Customer B | ₹1,500 | ₹0 | ₹1,500 | Pending
Customer C | ₹2,000 | ₹500 | ₹1,500 | Partially Paid

Business logic:
- Generate invoices idempotently so scheduled jobs cannot create duplicate invoices.
- Calculate outstanding balances from invoice totals and verified payment allocations.
- Do not mark an invoice paid merely because the frontend reports success.
- Verify online payment status server-side through authenticated provider callbacks or webhooks.
- Record payment references, payment method, timestamps, and the user who recorded the payment.
- Prevent unauthorized modification or deletion of financial records.
- Maintain an audit trail for corrections and refunds.
- Support configurable billing rules and billing-cycle changes.
- Define how unpaid balances carry forward into subsequent months.
- Use Indian Rupees (INR) as the default currency, but make currency configurable.

Do not hardcode payment gateway credentials. Implement the selected gateway only after its merchant credentials, account configuration, and webhook verification are available.

For testing, provide a clearly labeled sandbox or mock-payment mode that cannot be confused with real transactions.

## 8. Complaint and Customer Support Module

Create a complete complaint management system.

Customer-facing functionality:
- Open Help & Support.
- Create a new complaint.
- Select complaint category.
- Enter a subject and detailed description.
- Upload relevant images, documents, or videos.
- View complaint history.
- Track complaint status.
- Communicate with support through a conversation thread.
- Receive replies and updates.
- Reopen an eligible resolved complaint.
- Confirm resolution and close the complaint.

Complaint categories should be configurable by admins. Include sensible initial categories such as:
- Payment Issue
- Service Issue
- Technical Issue
- Account Issue
- Location Issue
- Other

Each complaint should contain:
- Unique complaint ID.
- Customer reference.
- Category and priority.
- Subject and description.
- Attachments.
- Creation date and time.
- Assigned staff member.
- Current status.
- Staff responses.
- Resolution notes.
- Resolution date.
- Activity history.

Complaint lifecycle:

New → Assigned → In Progress → Resolved → Closed

Allow authorized users to move complaints between valid statuses. Record every status change with the actor and timestamp.

Use private storage for complaint attachments. Validate file type and size, and authorize access to every uploaded file.

## 9. Admin Complaint Management

Create a dedicated complaint management dashboard.

Features:
- View all complaints.
- Search by complaint ID, customer, category, or assigned staff.
- Filter by status, priority, date range, and location.
- Assign and reassign complaints.
- Change priority.
- Add internal notes that customers cannot see.
- Send replies to customers.
- Review uploaded attachments.
- Record resolution details.
- Monitor complaint response and resolution times.
- Identify overdue complaints.
- View a complete complaint activity timeline.

Display complaints in a data table and optionally in a Kanban board.

Use clear status indicators and confirmation dialogs for important actions.

## 10. Customer Support Chat

Build a secure, database-backed conversation system.

Features:
- Customer-to-support conversations.
- Staff replies to assigned complaints.
- Message timestamps.
- Read status where supported.
- Attachment support.
- Unread message indicators.
- Realtime updates using Supabase Realtime where appropriate.
- Conversation history.
- Role-based message access.

Do not expose internal staff notes in customer conversations.

If realtime delivery is unavailable, provide a reliable fallback using normal data fetching and refresh.

## 11. Staff and Service Management

Create a dedicated staff portal with a simplified mobile-first interface.

Staff profile:
- Staff ID.
- Name.
- Phone.
- Email.
- Profile photo.
- Job role.
- Active/inactive status.
- Assigned customers.
- Work history.

Staff functionality:
- Secure login.
- View assigned customers.
- Search assigned customers.
- Open customer details.
- View customer address and authorized location data.
- Open navigation directions.
- View assigned service visits and complaints.
- Update work status.
- Add work notes.
- Upload before-and-after service photos.
- Record service completion.
- Record cash payments when authorized.
- Issue a receipt for a recorded payment.
- Reply to assigned complaints.
- View their work history and performance.

Service workflow:

Assigned → Accepted → In Progress → Completed

Allow additional statuses such as Cancelled or Rescheduled when appropriate.

Every status update must record the user, time, and relevant details.

Staff must not be able to:
- Access unassigned customers without authorization.
- Modify monthly billing plans without permission.
- Falsify verified online payments.
- Delete financial records.
- View other staff members' private information.

## 12. Service Appointment Management

Include a service scheduling module.

Features:
- Create appointments.
- Select customer, staff member, date, time, and service type.
- Add appointment notes.
- Set appointment status.
- Reschedule and cancel appointments.
- View calendar and list views.
- Notify relevant users about appointment changes.
- Link appointments to complaints or customer records.
- Store service completion notes and photos.

Prevent obvious scheduling conflicts where the business rules require exclusive staff availability.

## 13. Notifications and Reminders

Build a centralized notification system.

Notification types:
- Monthly invoice generated.
- Payment due soon.
- Payment overdue.
- Payment successfully verified.
- Complaint submitted.
- Complaint status changed.
- New support reply.
- Staff assignment.
- Service appointment reminder.
- Appointment rescheduled.
- Important announcement.

Requirements:
- In-app notification center.
- Read/unread state.
- Notification history.
- Configurable notification preferences.
- Scheduled reminders through secure server-side jobs.
- Optional email, SMS, WhatsApp, and web push integrations.

Use appropriate notification providers only after credentials and required consent are configured.

Do not assume that an email, SMS, or push notification was delivered merely because a database record was created.

Avoid duplicate reminders and repeated notifications for the same event.

## 14. Customer Dashboard

Create a polished customer dashboard with:

- Welcome message.
- Customer ID.
- Profile completion status.
- Current monthly invoice.
- Outstanding balance.
- Next payment due date.
- Payment history.
- Recent receipts.
- Active complaints.
- Recent support messages.
- Upcoming service appointments.
- Notifications.
- Customer documents.
- Address and authorized location information.

Provide prominent actions:
- Pay Now.
- View Invoices.
- Report a Problem.
- Contact Support.
- Update Profile.
- View Service History.

Customers must be able to navigate these features easily on mobile devices.

## 15. Admin Dashboard and Analytics

Create a comprehensive business overview dashboard.

KPI cards:
- Total Customers.
- Active Customers.
- New Customers.
- Total Invoiced.
- Payments Collected.
- Outstanding Balance.
- Overdue Invoices.
- Open Complaints.
- Resolved Complaints.
- Active Staff.

Charts:
- Monthly collections.
- Monthly outstanding balance.
- Customer growth.
- Paid versus pending invoices.
- Complaint trends.
- Complaint resolution performance.
- Staff work completion.
- Service appointment trends.

Dashboard filters:
- Date range.
- Staff member.
- Customer status.
- Payment status.
- Complaint status.

All metrics must be calculated from actual database records using consistent definitions.

For example:
- Collections should represent verified payments received in the selected period.
- Outstanding balances should represent unpaid invoice balances, not total invoice value.
- Active customers should follow a documented status rule.
- Revenue and cash collections should not be treated as identical accounting concepts without an explicit business definition.

Show loading, empty, and error states. Do not display fabricated production metrics.

## 16. Reports and Export

Create reports for:
- Customer directory.
- Customer registrations.
- Monthly invoices.
- Payment collections.
- Outstanding balances.
- Overdue payments.
- Customer payment history.
- Complaints.
- Complaint resolution time.
- Staff performance.
- Service appointments.
- Service completion.
- Customer location data where authorized.

Features:
- Date filters.
- Customer and staff filters.
- Search and sorting.
- Pagination.
- CSV export.
- Excel-compatible export.
- PDF report generation.
- Printable invoices and receipts.

Apply authorization to report generation and exports. Avoid exposing unnecessary personal data in exported files.

## 17. Database Design

Design a normalized PostgreSQL schema with suitable foreign keys, indexes, constraints, and timestamps.

Include the following core entities:

- profiles
- user_roles
- customers
- staff_profiles
- staff_customer_assignments
- customer_locations
- customer_location_history
- billing_plans
- invoices
- invoice_items
- payments
- payment_allocations
- complaints
- complaint_assignments
- complaint_messages
- complaint_attachments
- service_types
- service_appointments
- service_records
- service_attachments
- notifications
- notification_preferences
- documents
- audit_logs
- business_settings

Add any additional tables required for a correct implementation.

Requirements:
- UUID primary keys where appropriate.
- Foreign key constraints.
- Unique invoice and customer identifiers.
- Appropriate indexes for customer searches and date-based queries.
- Created-at and updated-at timestamps.
- Soft deletion or archival for appropriate business records.
- Immutable or tightly controlled financial transaction records.
- Server-side validation.
- Database migrations and reproducible setup instructions.

Never rely exclusively on frontend validation.

## 18. Security and Privacy

Security is a mandatory product requirement.

Implement:
- Supabase RLS policies.
- Server-side authorization checks.
- Input validation and sanitization.
- Secure file uploads.
- Private storage for sensitive documents.
- Rate limiting for sensitive operations where feasible.
- Audit logs for administrative and financial actions.
- Secure handling of API keys and secrets.
- Safe error messages that do not expose sensitive database information.
- Appropriate session and account lifecycle controls.
- Configurable data retention and account deletion workflows.

Do not place privileged credentials in the browser.

Do not trust user IDs, customer IDs, prices, payment status, or roles submitted by a client without server-side verification.

Design the system to support applicable Indian data-protection requirements and payment-provider rules. Do not claim legal compliance without an actual review.

## 19. Business Settings

Create an admin settings area for:
- Business name and logo.
- Business contact information.
- Default currency.
- Billing rules.
- Default monthly due date.
- Reminder schedules.
- Complaint categories.
- Complaint priority settings.
- Service types.
- Staff permissions.
- Notification preferences.
- Map provider configuration.
- Payment gateway configuration status.
- Invoice and receipt branding.
- Data retention settings.

Store configurable business values in the database rather than scattering hardcoded values across the frontend.

## 20. Navigation and Routes

Create protected, role-specific routes.

Admin:
- /admin/dashboard
- /admin/customers
- /admin/customers/:id
- /admin/locations
- /admin/billing
- /admin/invoices
- /admin/payments
- /admin/complaints
- /admin/staff
- /admin/services
- /admin/appointments
- /admin/reports
- /admin/notifications
- /admin/settings

Staff:
- /staff/dashboard
- /staff/customers
- /staff/assignments
- /staff/complaints
- /staff/services
- /staff/appointments
- /staff/payments
- /staff/profile

Customer:
- /app/dashboard
- /app/profile
- /app/locations
- /app/invoices
- /app/payments
- /app/complaints
- /app/support
- /app/services
- /app/appointments
- /app/notifications
- /app/documents
- /app/settings

Adapt route names to the final routing architecture where necessary, but maintain clear separation between roles.

## 21. Implementation Strategy

Build this application incrementally while maintaining one coherent product.

Phase 1 — Foundation:
- Design system.
- Responsive layouts.
- Authentication.
- Role-based routing.
- Supabase connection.
- Database schema and RLS policies.
- Admin, staff, and customer dashboards.

Phase 2 — Core Operations:
- Customer management.
- Staff management.
- Customer assignments.
- Billing plans.
- Invoices.
- Payment ledger.
- Payment history.

Phase 3 — Location and Support:
- GPS capture.
- Maps and navigation.
- Complaint management.
- Support conversations.
- Service scheduling.
- Service records.

Phase 4 — Automation:
- Scheduled monthly invoice generation.
- Payment reminders.
- Notifications.
- Verified online payment integration.
- Automated complaint and appointment updates.

Phase 5 — Analytics and Launch:
- Reports and charts.
- CSV, Excel-compatible, and PDF exports.
- Security testing.
- Authorization testing.
- Mobile responsiveness.
- Error handling.
- Deployment and operational documentation.

If all modules cannot be completed in one generation, implement the foundation first and then continue phase by phase. Do not replace unfinished backend functionality with decorative UI.

## 22. Definition of Done

The application is not complete merely because the pages render.

Verify that:
- Users can sign in and access only their authorized interfaces.
- Customers can be created and updated through real database operations.
- Staff assignments control which customer records staff can access.
- Monthly invoices are generated without duplicates.
- Outstanding balances are calculated correctly.
- Payments are recorded and allocated correctly.
- Online payments are verified server-side.
- Customers can submit complaints and see their status.
- Staff can respond to assigned complaints.
- Customer and staff locations work with permission.
- Map and navigation links use actual location data.
- Notifications are created from real business events.
- Reports use actual database records.
- File uploads enforce access permissions.
- Errors, empty states, and loading states are handled.
- Core flows work on desktop and mobile.
- RLS and authorization rules are tested using separate admin, staff, and customer accounts.

Create a README documenting setup, environment variables, database migrations, required integrations, deployment, scheduled jobs, and known limitations.

## 23. Start Building

Start by creating the complete visual design system, responsive application shell, protected route structure, Supabase integration, database schema, and secure role-based access.

Then implement the modules in the specified order.

Prioritize functional correctness, data integrity, security, and a polished user experience.

Use realistic demo data only in an explicitly labeled demo or development environment. Keep demo records separate from production data.

Before claiming any feature is complete, verify that it works end-to-end. Clearly list any feature that still requires external API credentials, payment gateway setup, scheduled infrastructure, or manual configuration.

The final result should feel like a professional, scalable business SaaS platform rather than a basic customer management template.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/c38f608a-a65b-4676-b1b4-0909d0ba1f74).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
