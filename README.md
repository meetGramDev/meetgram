<div align="center">
    <h1>
        <!-- <img src="readmeicon.png" alt="TMC Emblem" height="23px"> -->
        <a href="https://meetgrams.online/">Meetgram Social App</a>
    </h1>
    <h4><b>Welcome! This is the codebase for the Meetgram Social App.</b></h4>
    <h4>
        <a href="#links">Links</a>
        •
        <a href="#develop">Features</a>
        •
        <a href="#stack">Tech stack</a>
        •
        <a href="#develop">Develop</a>
    </h4>
    <h3>
        <a href="https://meetgrams.online/">
            <img src="https://img.shields.io/website?url=http%3A%2F%2Fmeetgrams.online%2F">
        </a>
        <a href="https://www.github.com/meetGramDev/meetgram/commits/dev">
            <img src="https://img.shields.io/github/last-commit/meetGramDev/meetgram?color=blue&label=updated">
        </a>
        <span>
            <img src="https://img.shields.io/badge/licence-%C2%A9-orange">
        </span>
    </h3>
</div>

# Links

The different hosted versions of the website can be found at the following locations, where the staging server is the site based-on the latest `dev`:

- 🌐 **Production: https://meetgrams.online**
- 🧪 **Staging: https://meetgramdev.vercel.app**

## 🛠 Tech Stack

This is an international multi-language (English, Spanish, Russian, Ukranian, Belarusian) [Next.js](https://nextjs.org/) application, written in the [TypeScript](https://www.typescriptlang.org/) programming language, using [SCSS modules](https://sass-lang.com/documentation/modules/) and [Tailwind CSS](https://sass-lang.com/documentation/modules/) for styling, [Redux](https://redux-toolkit.js.org/) for state management. [Docker](https://www.docker.com/) with [Nginx](https://nginx.org/) and [Jenkins](https://www.jenkins.io/) pipeline using in CI/CD.

# Features

### 🌐 Social Features:

- Create and manage posts with photos
- Like, comment, and follow users
- Real-time messaging and notifications
- Smart user search

### 🔐 Authentication & Profiles:

- OAuth and email/password login
- Fast password recovery
- Customizable profiles with photo upload
- User settings personalization

### ⚡ User Experience & Performance:

- Server-side rendering for SEO boost
- Efficient API route handling
- Fully responsive design

## Develop

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.ts`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.
