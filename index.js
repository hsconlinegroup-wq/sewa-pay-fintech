#!/usr/bin/env node

/**
 * SEWAPAY FINTECH PRIVATE LIMITED
 * One-file Bootstrap Generator for a Vercel-ready Next.js app
 * Creates: Next.js 14 App Router project with Tailwind, Role portals, KYC flows, mock APIs, AI chat.
 * Usage: node index.js
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const project = 'sewapay-fintech';

const files = {
  'package.json': `{
  "name": "sewapay-fintech",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "next dev -p 3000",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "next": "14.2.5",
    "react": "18.3.1",
    "react-dom": "18.3.1",
    "tailwindcss": "3.4.10",
    "@tailwindcss/forms": "0.5.7",
    "autoprefixer": "10.4.19",
    "postcss": "8.4.41",
    "lucide-react": "0.441.0",
    "framer-motion": "11.2.12",
    "@headlessui/react": "1.7.18",
    "react-hot-toast": "2.4.1",
    "jsonwebtoken": "9.0.2",
    "zod": "3.23.8",
    "bcryptjs": "2.4.3",
    "uuid": "9.0.1",
    "cookie": "0.6.0"
  },
  "devDependencies": {
    "eslint": "8.57.0",
    "eslint-config-next": "14.2.5",
    "typescript": "5.6.2",
    "@types/node": "20.14.11",
    "@types/react": "18.3.5",
    "@types/react-dom": "18.3.0"
  }
}
`,
  'next.config.js': `/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: { typedRoutes: true },
};
module.exports = nextConfig;
`,
  'postcss.config.js': `module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
`,
  'tailwind.config.js': `/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: { DEFAULT: "#0ea5e9", dark: "#0369a1" },
        accent: "#16a34a",
        ink: "#0f172a"
      }
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
`,
  'tsconfig.json': `{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["dom", "dom.iterable", "es2020"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": false,
    "forceConsistentCasingInFileNames": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "baseUrl": "."
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", "**/*.js"],
  "exclude": ["node_modules"]
}
`,
  '.eslintrc.json': `{
  "extends": ["next/core-web-vitals"]
}
`,
  '.gitignore': `node_modules
.next
out
.env
.env.local
.env.production
`,
  'app/globals.css': `@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --brand: 14 165 233;
  --ink: 15 23 42;
}

html, body {
  height: 100%;
}

body {
  @apply bg-slate-50 text-slate-800 antialiased;
}

.btn {
  @apply inline-flex items-center justify-center gap-2 rounded-md px-4 py-2 font-medium transition-colors;
}
.btn-primary { @apply bg-primary text-white hover:bg-sky-600; }
.btn-outline { @apply border border-slate-300 bg-white hover:bg-slate-50; }
.card { @apply rounded-xl border border-slate-200 bg-white p-6 shadow-sm; }
input, select, textarea { @apply rounded-md; }
`,
  'app/layout.tsx': `import "./globals.css";
import { Toaster } from "react-hot-toast";

export const metadata = {
  title: "SEWAPAY FINTECH PRIVATE LIMITED",
  description: "Unified Fintech Platform - Recharges, BBPS, AEPS, DMT, Travel",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Toaster />
        {children}
      </body>
    </html>
  );
}
`,
  'components/Header.tsx': `'use client';
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MessageSquare, Menu } from "lucide-react";
import { useState } from "react";

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const NavLink = ({ href, label }: any) => (
    <Link
      href={href}
      className={\`px-3 py-2 rounded-md hover:bg-slate-100 \${pathname===href ? 'text-primary font-semibold' : ''}\`}
      onClick={() => setOpen(false)}
    >
      {label}
    </Link>
  );
  return (
    <header className="sticky top-0 z-50 border-b bg-white/90 backdrop-blur">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex items-center justify-between py-3">
          <Link href="/" className="flex items-center gap-3">
            <div className="h-10 w-10 rounded bg-sky-500/10 ring-1 ring-sky-200 flex items-center justify-center">
              <span className="text-sky-600 font-black">S</span>
            </div>
            <div className="leading-tight">
              <div className="font-bold">SEWAPAY FINTECH PRIVATE LIMITED</div>
              <div className="text-xs text-slate-500">Bhubaneswar, Odisha 751019</div>
            </div>
          </Link>
          <nav className="hidden md:flex items-center gap-2">
            <NavLink href="/" label="Home" />
            <NavLink href="/about" label="About Us" />
            <NavLink href="/services" label="Services" />
            <NavLink href="/contact" label="Contact" />
            <NavLink href="/auth/signin" label="Sign In" />
            <Link href="/auth/signup" className="btn btn-primary">Sign Up</Link>
          </nav>
          <div className="md:hidden">
            <button onClick={()=>setOpen(!open)} className="btn btn-outline"><Menu size={18}/></button>
          </div>
        </div>
        {open && (
          <div className="flex flex-col gap-2 pb-3 md:hidden">
            <NavLink href="/" label="Home" />
            <NavLink href="/about" label="About Us" />
            <NavLink href="/services" label="Services" />
            <NavLink href="/contact" label="Contact" />
            <NavLink href="/auth/signin" label="Sign In" />
            <Link href="/auth/signup" className="btn btn-primary">Sign Up</Link>
          </div>
        )}
      </div>
      <Link href="#ai-chat" className="fixed bottom-5 right-5 btn btn-primary shadow-lg">
        <MessageSquare size={18}/> AI Chat
      </Link>
    </header>
  );
}
`,
  'components/Footer.tsx': `export default function Footer() {
  const company = process.env.NEXT_PUBLIC_COMPANY_NAME || "SEWAPAY FINTECH PRIVATE LIMITED";
  const phone = process.env.NEXT_PUBLIC_SUPPORT_PHONE || "+91 8986454772";
  const info = process.env.NEXT_PUBLIC_SUPPORT_EMAIL || "info@sewapay.com";
  const sales = process.env.NEXT_PUBLIC_SALES_EMAIL || "sales@sewapay.com";
  const help = process.env.NEXT_PUBLIC_HELP_EMAIL || "support@sewapay.com";
  return (
    <footer className="border-t bg-white">
      <div className="mx-auto max-w-7xl px-4 py-10 grid gap-6 md:grid-cols-3">
        <div>
          <div className="font-bold">{company}</div>
          <div className="text-sm text-slate-600">Bhubaneswar, Odisha, 751019</div>
        </div>
        <div className="text-sm">
          <div>Mobile: {phone}</div>
          <div>Email: {info}</div>
          <div>Sales: {sales}</div>
          <div>Support: {help}</div>
        </div>
        <div className="text-sm text-slate-500">
          © {new Date().getFullYear()} {company}. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
`,
  'components/Hero.tsx': `import Link from "next/link";

export default function Hero() {
  return (
    <section className="bg-gradient-to-b from-sky-50 to-white">
      <div className="mx-auto max-w-7xl px-4 py-16 grid gap-10 md:grid-cols-2">
        <div>
          <h1 className="text-3xl md:text-5xl font-extrabold text-ink">
            Unified Fintech Platform for Recharges, Bills, AEPS, DMT & Travel
          </h1>
          <p className="mt-4 text-slate-600">
            Launch white-label portals, manage distributors and retailers, automate KYC onboarding, and offer full-stack digital services.
          </p>
          <div className="mt-6 flex gap-3">
            <Link href="/auth/signup" className="btn btn-primary">Get Started</Link>
            <Link href="/services" className="btn btn-outline">Explore Services</Link>
          </div>
        </div>
        <div className="grid gap-4">
          <div className="card">
            <div className="font-semibold">Portals & Roles</div>
            <div className="text-sm text-slate-600">Super Admin, Admin, White Label, Distributor, Retailer, B2C, Reseller</div>
          </div>
          <div className="card">
            <div className="font-semibold">Built-in Compliance</div>
            <div className="text-sm text-slate-600">RBI-aligned KYC for Individual and Business (Proprietorship, Partnership/LLP, Pvt. Ltd.)</div>
          </div>
          <div className="card">
            <div className="font-semibold">AI Chat Assistant</div>
            <div className="text-sm text-slate-600">24x7 guided onboarding, FAQs, and ticket triage.</div>
          </div>
        </div>
      </div>
    </section>
  );
}
`,
  'components/AIChat.tsx': `'use client';
import { useEffect, useRef, useState } from 'react';
import { Send } from 'lucide-react';

export default function AIChat() {
  const [messages, setMessages] = useState([{ role: 'assistant', content: 'Welcome to SEWAPAY. How can I help you today?' }]);
  const [input, setInput] = useState('');
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(()=>{ bottomRef.current?.scrollIntoView({ behavior: 'smooth' }) }, [messages]);

  async function ask(e: React.FormEvent) {
    e.preventDefault();
    if (!input.trim()) return;
    const userMsg = { role: 'user', content: input.trim() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    try {
      const res = await fetch('/api/ai', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ messages: [...messages, userMsg] })});
      const data = await res.json();
      setMessages(prev => [...prev, { role: 'assistant', content: data.reply || 'Thanks! Our team will reach out shortly.' }]);
    } catch {
      setMessages(prev => [...prev, { role: 'assistant', content: 'System is busy. Please try again.' }]);
    }
  }

  return (
    <section id="ai-chat" className="mx-auto max-w-4xl px-4 py-10">
      <div className="card">
        <div className="font-semibold mb-3">AI Chat Assistant</div>
        <div className="h-72 overflow-y-auto rounded border bg-slate-50 p-3">
          {messages.map((m, i)=>(
            <div key={i} className={m.role==='user' ? 'text-right' : 'text-left'}>
              <div className={\`inline-block my-1 rounded px-3 py-2 \${m.role==='user'?'bg-sky-600 text-white':'bg-white border'}\`}>{m.content}</div>
            </div>
          ))}
          <div ref={bottomRef} />
        </div>
        <form onSubmit={ask} className="mt-3 flex gap-2">
          <input className="w-full border px-3 py-2 rounded" placeholder="Ask about onboarding, KYC, services..." value={input} onChange={e=>setInput(e.target.value)} />
          <button className="btn btn-primary"><Send size={16}/> Send</button>
        </form>
      </div>
    </section>
  );
}
`,
  'components/KYCForm.tsx': `'use client';
import { useState } from 'react';
import { z } from 'zod';
import toast from 'react-hot-toast';

const individualSchema = z.object({
  fullName: z.string().min(3),
  mobile: z.string().min(10),
  email: z.string().email(),
  pan: z.string().min(10),
  aadhaar: z.string().min(12),
});

const businessSchema = z.object({
  entityName: z.string().min(3),
  businessType: z.enum(['Proprietorship','Partnership/LLP','Private Limited']),
  gstin: z.string().min(15).optional(),
  cin: z.string().optional(),
  pan: z.string().min(10),
  address: z.string().min(5),
});

export default function KYCForm({ onSubmitted }: { onSubmitted?: ()=>void }) {
  const [mode, setMode] = useState<'Individual'|'Business'>('Individual');
  const [loading, setLoading] = useState(false);
  async function submit(formData: FormData) {
    setLoading(true);
    try {
      const payload = Object.fromEntries(formData.entries());
      if (mode==='Individual') individualSchema.parse(payload);
      else businessSchema.parse(payload);
      const res = await fetch('/api/onboarding/register', { method: 'POST', body: JSON.stringify({ mode, data: payload }) });
      const data = await res.json();
      if (data.ok) {
        toast.success('KYC submitted. Awaiting verification.');
        onSubmitted?.();
      } else throw new Error(data.error || 'Failed');
    } catch (e:any) {
      toast.error(e.message || 'Validation error');
    } finally {
      setLoading(false);
    }
  }
  return (
    <div className="card">
      <div className="flex items-center justify-between">
        <div className="font-semibold">RBI-aligned Onboarding & KYC</div>
        <select className="border px-2 py-1 rounded" value={mode} onChange={e=>setMode(e.target.value as any)}>
          <option>Individual</option>
          <option>Business</option>
        </select>
      </div>
      <form action={submit} className="mt-4 grid gap-3">
        {mode==='Individual' ? (
          <>
            <input name="fullName" placeholder="Full Name" className="border px-3 py-2" required />
            <div className="grid md:grid-cols-2 gap-3">
              <input name="mobile" placeholder="Mobile" className="border px-3 py-2" required />
              <input name="email" placeholder="Email" className="border px-3 py-2" required />
            </div>
            <div className="grid md:grid-cols-2 gap-3">
              <input name="pan" placeholder="PAN" className="border px-3 py-2" required />
              <input name="aadhaar" placeholder="Aadhaar" className="border px-3 py-2" required />
            </div>
            <div className="text-sm text-slate-500">Upload documents after initial submission via secure link shared to your email.</div>
          </>
        ) : (
          <>
            <input name="entityName" placeholder="Entity Name" className="border px-3 py-2" required />
            <select name="businessType" className="border px-3 py-2" required>
              <option>Proprietorship</option>
              <option>Partnership/LLP</option>
              <option>Private Limited</option>
            </select>
            <div className="grid md:grid-cols-2 gap-3">
              <input name="gstin" placeholder="GSTIN (optional)" className="border px-3 py-2" />
              <input name="cin" placeholder="CIN (if applicable)" className="border px-3 py-2" />
            </div>
            <div className="grid md:grid-cols-2 gap-3">
              <input name="pan" placeholder="PAN" className="border px-3 py-2" required />
              <input name="address" placeholder="Registered Address" className="border px-3 py-2" required />
            </div>
            <div className="text-sm text-slate-500">Post-submission, upload partnership deed/COI, GST, and authorized signatory KYC via secure link.</div>
          </>
        )}
        <button disabled={loading} className="btn btn-primary">{loading?'Submitting...':'Submit KYC'}</button>
      </form>
    </div>
  );
}
`,
  'components/ServiceCards.tsx': `import { CreditCard, Wallet, Landmark, Router, Receipt, Plane } from "lucide-react";

const items = [
  { icon: CreditCard, title: "Mobile & D2H Recharges", desc: "Prepaid, DTH across operators with instant confirmations." },
  { icon: Receipt, title: "BBPS", desc: "Utility bill payments with BBPS reference ID." },
  { icon: Landmark, title: "AEPS", desc: "Aadhaar-enabled cash-in/out, balance inquiry." },
  { icon: Wallet, title: "DMT", desc: "Domestic money transfer to bank accounts via IMPS/NEFT." },
  { icon: Router, title: "White Label Portals", desc: "Brandable portals for partners with custom pricing and margins." },
  { icon: Plane, title: "Travel Bookings", desc: "Rail, bus, air, hotels with GST-compliant invoices." },
];

export default function ServiceCards() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-12 grid md:grid-cols-3 gap-6">
      {items.map((x, i)=>(
        <div key={i} className="card">
          <div className="flex items-center gap-3">
            <x.icon className="text-sky-600" />
            <div className="font-semibold">{x.title}</div>
          </div>
          <div className="mt-2 text-sm text-slate-600">{x.desc}</div>
        </div>
      ))}
    </section>
  );
}
`,
  'lib/auth.ts': `import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { cookies } from 'next/headers';

const JWT_SECRET = process.env.JWT_SECRET || 'dev_secret';

type User = {
  id: string;
  email: string;
  role: 'SUPER_ADMIN'|'ADMIN'|'WHITE_LABEL'|'DISTRIBUTOR'|'RETAILER'|'B2C'|'RESELLER';
  name?: string;
};

const memory: { users: Record<string, any> } = { users: {} };

export function createUser(email: string, password: string, role: User['role'], name?: string) {
  const id = Math.random().toString(36).slice(2);
  const hash = bcrypt.hashSync(password, 8);
  memory.users[email] = { id, email, hash, role, name };
  return memory.users[email];
}

export function getUser(email: string) {
  return memory.users[email] || null;
}

export function verifyPassword(email: string, password: string) {
  const u = getUser(email);
  if (!u) return false;
  return bcrypt.compareSync(password, u.hash);
}

export function signSession(u: User) {
  const token = jwt.sign({ sub: u.id, email: u.email, role: u.role }, JWT_SECRET, { expiresIn: '7d' });
  cookies().set('sewa_session', token, { httpOnly: true, secure: true, sameSite: 'lax', path: '/' });
}

export function getSession(): User|null {
  const c = cookies().get('sewa_session')?.value;
  if (!c) return null;
  try {
    const d:any = jwt.verify(c, JWT_SECRET);
    return { id: d.sub, email: d.email, role: d.role };
  } catch { return null; }
}

export function signOut() {
  cookies().set('sewa_session', '', { path: '/', maxAge: 0 });
}
`,
  'app/page.tsx': `import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import ServiceCards from "@/components/ServiceCards";
import AIChat from "@/components/AIChat";
import KYCForm from "@/components/KYCForm";

export default function Home() {
  return (
    <>
      <Header />
      <Hero />
      <ServiceCards />
      <div className="mx-auto max-w-7xl px-4">
        <KYCForm />
      </div>
      <AIChat />
      <Footer />
    </>
  );
}
`,
  'app/about/page.tsx': `import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function About() {
  return (
    <>
      <Header />
      <main className="mx-auto max-w-7xl px-4 py-10">
        <div className="card">
          <div className="font-semibold text-lg">About SEWAPAY</div>
          <p className="mt-2 text-slate-600">
            SEWAPAY FINTECH PRIVATE LIMITED is a Bhubaneswar-based fintech platform delivering digital payment and travel services
            through a multi-portal architecture for Super Admin, Admin, White Label, Distributor, Retailer, B2C, and Reseller stakeholders.
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
`,
  'app/services/page.tsx': `import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ServiceCards from "@/components/ServiceCards";

export default function Services() {
  return (
    <>
      <Header />
      <ServiceCards />
      <Footer />
    </>
  );
}
`,
  'app/contact/page.tsx': `import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function Contact() {
  return (
    <>
      <Header />
      <main className="mx-auto max-w-7xl px-4 py-10 grid md:grid-cols-2 gap-6">
        <div className="card">
          <div className="font-semibold mb-2">Contact Information</div>
          <div className="text-sm">
            <div>Bhubaneswar, Odisha, 751019</div>
            <div>Mobile: +91 8986454772</div>
            <div>Email: info@sewapay.com</div>
            <div>Sales: sales@sewapay.com</div>
            <div>Support: support@sewapay.com</div>
          </div>
        </div>
        <form className="card" action="/api/contact" method="post">
          <div className="font-semibold mb-2">Send us a message</div>
          <input className="border px-3 py-2 mb-2" name="name" placeholder="Your Name" required />
          <input className="border px-3 py-2 mb-2" name="email" placeholder="Your Email" required />
          <textarea className="border px-3 py-2 mb-2" name="message" placeholder="Message" rows={5} required />
          <button className="btn btn-primary">Submit</button>
        </form>
      </main>
      <Footer />
    </>
  );
}
`,
  'app/auth/signin/page.tsx': `'use client';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

export default function SignIn() {
  const r = useRouter();
  const [loading, setLoading] = useState(false);
  async function submit(e:any) {
    e.preventDefault();
    setLoading(true);
    const form = new FormData(e.currentTarget);
    const res = await fetch('/api/auth/signin', { method: 'POST', body: new URLSearchParams(form as any) });
    const data = await res.json();
    setLoading(false);
    if (data.ok) { toast.success('Signed in'); r.push('/portal'); }
    else toast.error(data.error || 'Invalid credentials');
  }
  return (
    <>
      <Header />
      <main className="mx-auto max-w-md px-4 py-10">
        <form onSubmit={submit} className="card">
          <div className="font-semibold mb-2">Sign In</div>
          <input name="email" className="border px-3 py-2 mb-2" placeholder="Email" required />
          <input name="password" type="password" className="border px-3 py-2 mb-2" placeholder="Password" required />
          <button disabled={loading} className="btn btn-primary w-full">{loading?'Signing in...':'Sign In'}</button>
        </form>
      </main>
      <Footer />
    </>
  );
}
`,
  'app/auth/signup/page.tsx': `'use client';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

export default function SignUp() {
  const r = useRouter();
  const [loading, setLoading] = useState(false);
  async function submit(e:any) {
    e.preventDefault();
    setLoading(true);
    const form = new FormData(e.currentTarget);
    const res = await fetch('/api/auth/signup', { method: 'POST', body: new URLSearchParams(form as any) });
    const data = await res.json();
    setLoading(false);
    if (data.ok) { toast.success('Account created'); r.push('/portal'); }
    else toast.error(data.error || 'Error');
  }
  return (
    <>
      <Header />
      <main className="mx-auto max-w-md px-4 py-10">
        <form onSubmit={submit} className="card">
          <div className="font-semibold mb-2">Create Account</div>
          <input name="name" className="border px-3 py-2 mb-2" placeholder="Name" required />
          <input name="email" className="border px-3 py-2 mb-2" placeholder="Email" required />
          <input name="password" type="password" className="border px-3 py-2 mb-2" placeholder="Password" required />
          <select name="role" className="border px-3 py-2 mb-2" defaultValue="RETAILER">
            <option value="B2C">B2C</option>
            <option value="RETAILER">Retailer</option>
            <option value="DISTRIBUTOR">Distributor</option>
            <option value="RESELLER">Reseller</option>
            <option value="WHITE_LABEL">White Label</option>
          </select>
          <button disabled={loading} className="btn btn-primary w-full">{loading?'Creating...':'Sign Up'}</button>
        </form>
      </main>
      <Footer />
    </>
  );
}
`,
  'app/portal/page.tsx': `import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getSession } from "@/lib/auth";
import Link from "next/link";

function Tile({ href, title, desc }: any) {
  return (
    <Link href={href} className="card hover:shadow-md transition">
      <div className="font-semibold">{title}</div>
      <div className="text-sm text-slate-600">{desc}</div>
    </Link>
  );
}

export default function Portal() {
  const s = getSession();
  return (
    <>
      <Header />
      <main className="mx-auto max-w-7xl px-4 py-10 grid md:grid-cols-3 gap-6">
        <Tile href="/portal/wallet" title="Wallet" desc="Load balance, ledger, settlements" />
        <Tile href="/portal/recharge" title="Recharges" desc="Mobile/D2H across operators" />
        <Tile href="/portal/bbps" title="BBPS" desc="Utility bills" />
        <Tile href="/portal/aeps" title="AEPS" desc="Aadhaar services" />
        <Tile href="/portal/dmt" title="DMT" desc="Money transfer" />
        <Tile href="/portal/travel" title="Travel" desc="Rail/Bus/Air/Hotels" />
        {(s?.role==='ADMIN'||s?.role==='SUPER_ADMIN') && <Tile href="/portal/admin" title="Admin" desc="Manage users, pricing, payouts" />}
        {(s?.role==='SUPER_ADMIN') && <Tile href="/portal/super" title="Super Admin" desc="System config, partners, reports" />}
        {(s?.role==='WHITE_LABEL') && <Tile href="/portal/white-label" title="White Label" desc="Branding, markup, subusers" />}
        {(s?.role==='DISTRIBUTOR') && <Tile href="/portal/distributor" title="Distributor" desc="Retailers, commissions" />}
        {(s?.role==='RETAILER') && <Tile href="/portal/retailer" title="Retailer" desc="Customer services" />}
        {(s?.role==='B2C') && <Tile href="/portal/b2c" title="B2C" desc="Self-service portal" />}
        {(s?.role==='RESELLER') && <Tile href="/portal/reseller" title="Reseller" desc="Bundles and licenses" />}
      </main>
      <Footer />
    </>
  );
}
`,
  'app/portal/admin/page.tsx': `import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function Admin() {
  return (
    <>
      <Header />
      <main className="mx-auto max-w-6xl px-4 py-10">
        <div className="card">
          <div className="font-semibold">Admin Panel</div>
          <div className="text-sm text-slate-600">User management, KYC queue, pricing slabs, service toggles, payouts.</div>
        </div>
      </main>
      <Footer />
    </>
  );
}
`,
  'app/portal/super/page.tsx': `import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function SuperAdmin() {
  return (
    <>
      <Header />
      <main className="mx-auto max-w-6xl px-4 py-10">
        <div className="card">
          <div className="font-semibold">Super Admin</div>
          <div className="text-sm text-slate-600">Master settings, partners, revenue reports, risk controls.</div>
        </div>
      </main>
      <Footer />
    </>
  );
}
`,
  'app/portal/white-label/page.tsx': `import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function WhiteLabel() {
  return (
    <>
      <Header />
      <main className="mx-auto max-w-6xl px-4 py-10">
        <div className="card">
          <div className="font-semibold">White Label Portal</div>
          <div className="text-sm text-slate-600">Branding, domain mapping, theming, margin controls, subusers.</div>
        </div>
      </main>
      <Footer />
    </>
  );
}
`,
  'app/portal/distributor/page.tsx': `import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function Distributor() {
  return (
    <>
      <Header />
      <main className="mx-auto max-w-6xl px-4 py-10">
        <div className="card">
          <div className="font-semibold">Distributor Dashboard</div>
          <div className="text-sm text-slate-600">Retailer onboarding, commissions, settlements.</div>
        </div>
      </main>
      <Footer />
    </>
  );
}
`,
  'app/portal/retailer/page.tsx': `import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function Retailer() {
  return (
    <>
      <Header />
      <main className="mx-auto max-w-6xl px-4 py-10">
        <div className="card">
          <div className="font-semibold">Retailer Dashboard</div>
          <div className="text-sm text-slate-600">Customer services, receipts, support.</div>
        </div>
      </main>
      <Footer />
    </>
  );
}
`,
  'app/portal/b2c/page.tsx': `import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function B2C() {
  return (
    <>
      <Header />
      <main className="mx-auto max-w-6xl px-4 py-10">
        <div className="card">
          <div className="font-semibold">B2C Portal</div>
          <div className="text-sm text-slate-600">Self-service bookings and bill payments.</div>
        </div>
      </main>
      <Footer />
    </>
  );
}
`,
  'app/portal/reseller/page.tsx': `import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function Reseller() {
  return (
    <>
      <Header />
      <main className="mx-auto max-w-6xl px-4 py-10">
        <div className="card">
          <div className="font-semibold">Reseller Panel</div>
          <div className="text-sm text-slate-600">Sell licenses, manage partner renewals.</div>
        </div>
      </main>
      <Footer />
    </>
  );
}
`,
  'app/portal/recharge/page.tsx': `import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function Recharge() {
  return (
    <>
      <Header />
      <main className="mx-auto max-w-3xl px-4 py-10">
        <div className="card">
          <div className="font-semibold mb-2">Mobile & D2H Recharge</div>
          <form action="/api/recharge" method="post" className="grid gap-3">
            <select name="type" className="border px-3 py-2"><option>Mobile</option><option>D2H</option></select>
            <input name="account" className="border px-3 py-2" placeholder="Number / Subscriber ID" required />
            <input name="operator" className="border px-3 py-2" placeholder="Operator" required />
            <input name="amount" className="border px-3 py-2" placeholder="Amount" required />
            <button className="btn btn-primary">Proceed</button>
          </form>
        </div>
      </main>
      <Footer />
    </>
  );
}
`,
  'app/portal/bbps/page.tsx': `import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function BBPS() {
  return (
    <>
      <Header />
      <main className="mx-auto max-w-3xl px-4 py-10">
        <div className="card">
          <div className="font-semibold mb-2">BBPS - Bill Payment</div>
          <form action="/api/bbps" method="post" className="grid gap-3">
            <input name="biller" className="border px-3 py-2" placeholder="Biller Name" required />
            <input name="customerId" className="border px-3 py-2" placeholder="Customer ID" required />
            <input name="amount" className="border px-3 py-2" placeholder="Amount" required />
            <button className="btn btn-primary">Pay Bill</button>
          </form>
        </div>
      </main>
      <Footer />
    </>
  );
}
`,
  'app/portal/aeps/page.tsx': `import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function AEPS() {
  return (
    <>
      <Header />
      <main className="mx-auto max-w-3xl px-4 py-10">
        <div className="card">
          <div className="font-semibold mb-2">AEPS</div>
          <div className="text-sm text-slate-600">Connect biometric device via partner SDK (mocked here).</div>
          <form action="/api/aeps" method="post" className="grid gap-3">
            <select name="action" className="border px-3 py-2"><option>Cash Withdrawal</option><option>Balance Enquiry</option></select>
            <input name="aadhaar" className="border px-3 py-2" placeholder="Aadhaar (partial)" required />
            <button className="btn btn-primary">Proceed</button>
          </form>
        </div>
      </main>
      <Footer />
    </>
  );
}
`,
  'app/portal/dmt/page.tsx': `import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function DMT() {
  return (
    <>
      <Header />
      <main className="mx-auto max-w-3xl px-4 py-10">
        <div className="card">
          <div className="font-semibold mb-2">DMT - Domestic Money Transfer</div>
          <form action="/api/dmt" method="post" className="grid gap-3">
            <input name="senderMobile" className="border px-3 py-2" placeholder="Sender Mobile" required />
            <input name="beneficiary" className="border px-3 py-2" placeholder="Beneficiary Name" required />
            <input name="account" className="border px-3 py-2" placeholder="Account Number" required />
            <input name="ifsc" className="border px-3 py-2" placeholder="IFSC" required />
            <input name="amount" className="border px-3 py-2" placeholder="Amount" required />
            <button className="btn btn-primary">Transfer</button>
          </form>
        </div>
      </main>
      <Footer />
    </>
  );
}
`,
  'app/portal/travel/page.tsx': `import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function Travel() {
  return (
    <>
      <Header />
      <main className="mx-auto max-w-3xl px-4 py-10">
        <div className="card">
          <div className="font-semibold mb-2">Travel Bookings</div>
          <div className="text-sm text-slate-600">Rail/Bus/Air/Hotels (mock search)</div>
          <form action="/api/travel/search" method="post" className="grid gap-3">
            <div className="grid md:grid-cols-2 gap-3">
              <input name="from" className="border px-3 py-2" placeholder="From" required />
              <input name="to" className="border px-3 py-2" placeholder="To" required />
            </div>
            <div className="grid md:grid-cols-2 gap-3">
              <input name="date" type="date" className="border px-3 py-2" required />
              <select name="mode" className="border px-3 py-2"><option>Rail</option><option>Bus</option><option>Air</option><option>Hotel</option></select>
            </div>
            <button className="btn btn-primary">Search</button>
          </form>
        </div>
      </main>
      <Footer />
    </>
  );
}
`,
  'app/portal/wallet/page.tsx': `import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function Wallet() {
  return (
    <>
      <Header />
      <main className="mx-auto max-w-3xl px-4 py-10">
        <div className="card">
          <div className="font-semibold mb-2">Wallet</div>
          <div className="text-sm text-slate-600">Add funds, view ledger, settlements (mock).</div>
          <form action="/api/wallet/add" method="post" className="grid md:grid-cols-2 gap-3">
            <input name="amount" className="border px-3 py-2" placeholder="Amount" required />
            <button className="btn btn-primary">Add Funds</button>
          </form>
        </div>
      </main>
      <Footer />
    </>
  );
}
`,
  'app/api/ai/route.ts': `import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { messages } = await req.json();
  const last = messages?.[messages.length-1]?.content?.toLowerCase() || '';
  let reply = 'Thanks for reaching out. Our team will assist you shortly.';
  if (last.includes('kyc')) reply = 'KYC requires PAN, Aadhaar (individual) or entity docs (business). Submit the form; a secure link will follow.';
  if (last.includes('white')) reply = 'White Label portals include custom domain, theme, and markup controls. Pricing varies by volume.';
  if (last.includes('aeps')) reply = 'AEPS requires onboarding with a partner bank/BC network and approved biometric device integration.';
  if (last.includes('bbps')) reply = 'BBPS supports utility payments with reference IDs; settlement per T+1/T+2 as configured.';
  return NextResponse.json({ reply });
}
`,
  'app/api/onboarding/register/route.ts': `import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { mode, data } = await req.json();
    // In production: validate, create applicant, send secure document upload link, queue for KYC verification.
    return NextResponse.json({ ok: true, applicantId: 'APP-' + Math.random().toString(36).slice(2), mode, data });
  } catch (e:any) {
    return NextResponse.json({ ok: false, error: e.message || 'Invalid payload' }, { status: 400 });
  }
}
`,
  'app/api/auth/signup/route.ts': `import { NextRequest, NextResponse } from 'next/server';
import { createUser, signSession } from '@/lib/auth';

export async function POST(req: NextRequest) {
  const form = await req.text();
  const params = new URLSearchParams(form);
  const email = params.get('email')!;
  const password = params.get('password')!;
  const role = (params.get('role') || 'RETAILER') as any;
  const name = params.get('name') || undefined;
  const u = createUser(email, password, role, name);
  signSession({ id: u.id, email: u.email, role: u.role, name: u.name });
  return NextResponse.json({ ok: true });
}
`,
  'app/api/auth/signin/route.ts': `import { NextRequest, NextResponse } from 'next/server';
import { getUser, verifyPassword, signSession } from '@/lib/auth';

export async function POST(req: NextRequest) {
  const form = await req.text();
  const params = new URLSearchParams(form);
  const email = params.get('email')!;
  const password = params.get('password')!;
  const u = getUser(email);
  if (!u) return NextResponse.json({ ok: false, error: 'User not found' }, { status: 401 });
  const ok = verifyPassword(email, password);
  if (!ok) return NextResponse.json({ ok: false, error: 'Invalid password' }, { status: 401 });
  signSession({ id: u.id, email: u.email, role: u.role, name: u.name });
  return NextResponse.json({ ok: true });
}
`,
  'app/api/contact/route.ts': `import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const form = await req.formData();
  const name = form.get('name');
  const email = form.get('email');
  const message = form.get('message');
  // In production: send to CRM/helpdesk
  return NextResponse.json({ ok: true, message: 'Received', data: { name, email, message }});
}
`,
  'app/api/wallet/add/route.ts': `import { NextRequest, NextResponse } from 'next/server';
export async function POST(req: NextRequest) {
  return NextResponse.json({ ok: true, txnId: 'WAL-' + Math.random().toString(36).slice(2) });
}
`,
  'app/api/recharge/route.ts': `import { NextRequest, NextResponse } from 'next/server';
export async function POST(req: NextRequest) {
  return NextResponse.json({ ok: true, ref: 'RC-' + Math.random().toString(36).slice(2) });
}
`,
  'app/api/bbps/route.ts': `import { NextRequest, NextResponse } from 'next/server';
export async function POST(req: NextRequest) {
  return NextResponse.json({ ok: true, bbpsRef: 'BBPS-' + Math.random().toString(36).slice(2) });
}
`,
  'app/api/aeps/route.ts': `import { NextRequest, NextResponse } from 'next/server';
export async function POST(req: NextRequest) {
  return NextResponse.json({ ok: true, rrn: 'AEPS-' + Math.random().toString(36).slice(2) });
}
`,
  'app/api/dmt/route.ts': `import { NextRequest, NextResponse } from 'next/server';
export async function POST(req: NextRequest) {
  return NextResponse.json({ ok: true, utr: 'DMT-' + Math.random().toString(36).slice(2) });
}
`,
  'app/api/travel/search/route.ts': `import { NextRequest, NextResponse } from 'next/server';
export async function POST() {
  // Mock results
  return NextResponse.json({ ok: true, results: [{ id: 'T1', name: 'Sample Fare', price: 1234 }]});
}
`,
  'public/robots.txt': `User-agent: *
Allow: /
`,
  'README.md': `# SEWAPAY FINTECH PRIVATE LIMITED

Vercel-ready Next.js fintech app with role-based portals, onboarding/KYC, services (Recharges, BBPS, AEPS, DMT, Travel), and AI chat.

- Super Admin, Admin, White Label, Distributor, Retailer, B2C, Reseller
- App Router (Next.js 14), TailwindCSS
- API routes mock connectors
- Replace mocks with live providers as needed
`
};

function writeFiles(base) {
  Object.entries(files).forEach(([p, content]) => {
    const full = path.join(base, p);
    fs.mkdirSync(path.dirname(full), { recursive: true });
    fs.writeFileSync(full, content);
  });
}

function main() {
  const root = path.join(process.cwd(), project);
  if (fs.existsSync(root)) {
    console.error('Directory already exists: ' + root);
    process.exit(1);
  }
  fs.mkdirSync(root);
  writeFiles(root);
  console.log('Project files created in', root);
  try {
    execSync('npm i', { cwd: root, stdio: 'inherit' });
  } catch (e) {
    console.warn('Dependency installation failed. Run manually: npm install');
  }
  console.log('Done. Next steps:');
  console.log('  cd sewapay-fintech');
  console.log('  npm run dev  # http://localhost:3000');
  console.log('  git init && git add . && git commit -m \"init\"');
  console.log('Push to GitHub and deploy on Vercel.');
}

main();
