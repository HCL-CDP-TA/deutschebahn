# DB BahnCard Demo

A modern, multilingual demo web application for Deutsche Bahn's BahnCard, built with Next.js, TypeScript, and Tailwind CSS.

## Features

- BahnCard selection and comparison
- Multistep checkout: customer data, payment, confirmation
- Google Places Autocomplete for address entry (biased to Germany)
- LocalStorage for persisting user and order data
- Responsive, accessible UI with Tailwind CSS
- Full i18n support (English & German)
- Modular, reusable React components

## Tech Stack

- [Next.js](https://nextjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [next-intl](https://github.com/amannn/next-intl) for translations
- [@react-google-maps/api](https://github.com/JustFly1984/react-google-maps-api) for address autocomplete

## Getting Started

1. **Install dependencies:**

   ```bash
   npm install
   ```

2. **Set up environment variables:**

Copy `.env.example` to `.env.local` and add your Google Maps API key and CDP write key.

3. **Run the development server:**

   ```bash
   npm run dev
   ```

4. **Open [http://localhost:3000](http://localhost:3000) in your browser.**

## Deployment

Commits are automatically deployed to [Vercel](https://vercel.com/) and visible at [https://bc.hclcdp.com](https://bc.hclcdp.com).

## Docker Deployment

Create a `.env` as above

```bash
npm run docker-rebuild
```

then access [http://localhost:8080](http://localhost:8080) or other docker hostname

## Customization

- **Translations:** Edit `/messages/en.json` and `/messages/de.json`.
- **Cards:** Update BahnCard options in `/app/data/cards.ts`.
- **Styling:** Modify Tailwind config or global styles in `/app/globals.css`.

## License

This project is for demonstration purposes only and is not affiliated with Deutsche Bahn AG.

---

© 2025 HCL Software. All rights reserved.
