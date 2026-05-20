# Neuctra OpenSource CMS

A modern, fast, and customizable Open Source CMS built with React, Vite, and Tailwind CSS.

Neuctra CMS is designed for developers who want a flexible and clean content management experience with modern UI components, authentication support, and a powerful blog editor with live preview capabilities.

---

##  Features

-  **Built with Vite** for lightning-fast development and optimized builds
-  **Modern UI** using Tailwind CSS with a clean, responsive design
-  **Component-based architecture** with `@neuctra/ui` for reusable components
-  **Authentication system** powered by `@neuctra/authix` with email verification
-  **Rich Blog Editor** with Monaco Editor for code editing and syntax highlighting
-  **Live Preview** functionality for real-time content preview
-  **Admin Panel** for comprehensive content management
-  **Blog Management** - Create, edit, view, and manage blog posts
-  **Code Syntax Highlighting** using react-syntax-highlighter
-  **Modern Icons** with lucide-react
-  **Client-side Routing** with react-router-dom
-  **Fully responsive dashboard** optimized for all screen sizes
-  **Developer-friendly** with clean code structure and ESLint configuration

---

## Tech Stack

- **React.js** (v19.2.5) - UI library
- **Vite** (v8.0.10) - Build tool and dev server
- **Tailwind CSS** (v4.3.0) - Utility-first CSS framework
- **@neuctra/ui** - Reusable UI components
- **@neuctra/authix** - Authentication handling
- **@neuctra/cms-core** - Core CMS functionality
- **@monaco-editor/react** (v4.7.0) - Code editor component
- **react-router-dom** (v7.15.0) - Client-side routing
- **react-syntax-highlighter** (v15.6.6) - Code syntax highlighting
- **lucide-react** - Icon library

---

##  Installation

Clone the repository:

```bash
git clone https://github.com/Taha-Asif-313/neuctra-opensource-cms.git
```

Go to the project directory:

```bash
cd neuctra-opensource-cms
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

---

## Project Structure

```bash
src/
├── components/
│   ├── BlogCards.jsx          - Blog card components
│   ├── BlogPreviewModal.jsx   - Modal for blog preview
│   ├── BlogsHeader.jsx        - Header component for blogs
│   ├── GoToTop.jsx            - Scroll to top button
│   ├── NeuctraBlogEditor/     - Blog editor components
│   └── modals/                - Modal components
├── pages/
│   ├── AdminPanelPage.jsx     - Admin dashboard
│   ├── AllBlogsPage.jsx       - View all blogs
│   ├── BlogPostPage.jsx       - Single blog post view
│   ├── CreateBlogPage.jsx     - Create new blog
│   ├── EditBlogPage.jsx       - Edit existing blog
│   ├── LoginPage.jsx          - Login page
│   ├── MainPage.jsx           - Main landing page
│   └── VerifiyEmailPage.jsx   - Email verification page
├── contexts/                  - React contexts for state management
├── services/                  - API services and data fetching
├── states/                    - Global state management
├── utils/                     - Utility functions
├── App.jsx                    - Main app component with routing
├── BlogsLayout.jsx            - Layout for blog pages
├── index.css                  - Global styles
└── main.jsx                   - Application entry point
```

---

##  Available Scripts

```bash
npm run dev
```

Runs the app in development mode with hot-reload enabled.

```bash
npm run build
```

Builds the app for production and creates an optimized `dist` folder.

```bash
npm run preview
```

Previews the production build locally to test the optimized application.

```bash
npm run lint
```

Runs ESLint to check for code quality and potential issues.

---

##  Key Components

### NeuctraBlogEditor
A powerful blog editor component featuring:
- Monaco Editor integration for code editing
- Live preview functionality
- Syntax highlighting for code blocks
- Rich text editing capabilities

### Authentication
- Login system with `@neuctra/authix`
- Email verification support
- Secure session management

### Blog Management
- Create new blog posts with rich content
- Edit existing posts with full editor
- View all blogs in a card-based layout
- Individual blog post pages with full content display
- Admin panel for comprehensive management

---

##  Environment Setup

Create a `.env` file in the root directory with your environment variables:

```env
# Add your environment variables here
VITE_NEUCTRA_AUTHIX_BASE_URL
VITE_NEUCTRA_AUTHIX_API_KEY
VITE_NEUCTRA_AUTHIX_APP_ID
```

---

##  Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Commit your changes (`git commit -m 'Add some amazing feature'`)
5. Push to the branch (`git push origin feature/amazing-feature`)
6. Open a Pull Request

Please ensure your code follows the project's ESLint configuration.

---

## License

This project is licensed under the MIT License - see the LICENSE file for details.

---

## Author

### Taha Asif

- GitHub: https://github.com/Taha-Asif-313
- Portfolio: https://tahaasif.neuctra.com

---

## Support & Community

If you like this project, consider giving it a star on GitHub ⭐

For issues, questions, or suggestions, please open an issue on the GitHub repository.

---

## Roadmap

- [ ] Add more authentication providers (Google, GitHub)
- [ ] Implement image upload functionality
- [ ] Add dark mode support
- [ ] Create comprehensive documentation
- [ ] Add unit and integration tests
- [ ] Implement SEO optimization
- [ ] Add comment system for blogs
- [ ] Create plugin system for extensibility