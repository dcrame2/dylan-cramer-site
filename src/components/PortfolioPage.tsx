"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

const professionalProjects = [
  {
    title: "Zmac Transport",
    description:
      "Logistics and transportation company with load board, instant quote, and HubSpot integration.",
    image: "/images/portfolio/zmac.png",
    url: "https://www.zmactransport.com/",
    tags: ["Corporate", "Logistics"],
  },
  {
    title: "Impact Networking",
    description:
      "Managed IT services and business solutions company with HubSpot-integrated marketing site.",
    image: "/images/portfolio/impactmybiz.png",
    url: "https://www.impactmybiz.com/",
    tags: ["Corporate", "IT Services"],
  },
  {
    title: "Beggars Pizza",
    description:
      "Chicago-area pizza chain with custom Strapi CMS, PostgreSQL, and Cloudinary-powered media delivery.",
    image: "/images/portfolio/beggars_pizza.png",
    url: "https://www.beggarspizza.com/",
    tags: ["Restaurant", "E-Commerce"],
  },
  {
    title: "DOT Security",
    description:
      "Cybersecurity company site with modular layouts, SEO optimization, and HubSpot integration.",
    image: "/images/portfolio/dot_security.png",
    url: "https://dotsecurity.com/",
    tags: ["Corporate", "Cybersecurity"],
  },
  {
    title: "N1C",
    description:
      "Critical infrastructure company with custom CMS, Strapi backend, and Digital Ocean hosting.",
    image: "/images/portfolio/n1c.png",
    url: "https://n1critical.com/",
    tags: ["Corporate", "Infrastructure"],
  },
  {
    title: "Attitude Dance Company",
    description:
      "Dance studio website built on WordPress with PHP, SASS, and pixel-perfect UX/UI collaboration.",
    image: "/images/portfolio/attitude-dance-company.png",
    url: "https://www.attitudedancecompany.com/",
    tags: ["Small Business", "Dance"],
  },
  {
    title: "Townsend Rowcare",
    description:
      "WordPress CMS site with PHP, SASS, and Pantheon hosting — built in agile sprints with UX/UI team.",
    image: "/images/portfolio/rowcare.png",
    url: "https://row-care.com",
    tags: ["Corporate", "Services"],
  },
  {
    title: "NG Gilbert",
    description:
      "Construction company site on WordPress with PHP, JavaScript, SASS, and Pantheon hosting.",
    image: "/images/portfolio/nggilbert.png",
    url: "https://nggilbert.com/",
    tags: ["Corporate", "Construction"],
  },
  {
    title: "MPI WJW",
    description:
      "WordPress CMS with PHP, SASS, SEO optimization, and Pantheon hosting — solo development.",
    image: "/images/portfolio/mpiwjw.png",
    url: "https://mpiwjw.com/",
    tags: ["Corporate", "Business"],
  },
  {
    title: "Schuetz Insurance",
    description:
      "Insurance agency site built on WordPress with PHP, SASS, and agile development methodology.",
    image: "/images/portfolio/schuetz_insurance.png",
    url: "https://schuetzinsurance.com/",
    tags: ["Small Business", "Insurance"],
  },
];

const freelanceProjects = [
  {
    title: "Burbank Sports",
    description:
      "Custom uniforms, letterman jackets, silk screen printing, and trophies — family-owned business with 50+ years of expertise.",
    image: "/images/portfolio/burbank-sports.png",
    url: "https://burbank-sports.vercel.app",
    tags: ["Small Business", "E-Commerce"],
  },
  {
    title: "Chain O'Lakes Marina",
    description:
      "Full service marina on the Chain O'Lakes. Fuel, slips, in/out service, maintenance, and everything a boater needs.",
    image: "/images/portfolio/col-marina.png",
    url: "https://col-marina.vercel.app",
    tags: ["Small Business", "Services"],
  },
  {
    title: "Paul Murphy Associates",
    description:
      "Global staffing and recruitment solutions for the financial industry — from capital markets to start-ups.",
    image: "/images/portfolio/paul-murphy-associates.png",
    url: "https://paul-murphy-associates.vercel.app",
    tags: ["Corporate", "Recruitment"],
  },
  {
    title: "Mike Moulis",
    description:
      "Country Financial representative portfolio — expert financial guidance and insurance in the Greater Chicago Area.",
    image: "/images/portfolio/mike-moulis-portfolio.png",
    url: "https://mike-moulis-portfolio.vercel.app",
    tags: ["Portfolio", "Finance"],
  },
  {
    title: "Dustin DeLisle",
    description:
      "Professional portfolio for a Carrier Sales Zone Manager — driving growth in logistics brokerage.",
    image: "/images/portfolio/dustin-delisle-portfolio.png",
    url: "https://dustin-delisle-portfolio.vercel.app",
    tags: ["Portfolio", "Professional"],
  },
  {
    title: "Tulayna Limo Service",
    description:
      "Freelance build for a limo service — one-page site designed to drive form submissions and bookings.",
    image: "/images/portfolio/tulayna.png",
    url: "https://www.tulaynalimoservice.com/",
    tags: ["Small Business", "Transport"],
  },
  {
    title: "Digital Delight",
    description:
      "Freelance marketing site with HubSpot integration, React frontend, and brand identity design.",
    image: "/images/portfolio/digitaldelightpic.png",
    url: "https://thedigitaldelight.com/",
    tags: ["Agency", "Marketing"],
  },
  {
    title: "Moulis Financial",
    description:
      "Freelance insurance website — designed to showcase offerings and drive customers to contact form.",
    image: "/images/portfolio/moulisfinancial.png",
    url: "https://moulisfinancial.com/",
    tags: ["Small Business", "Insurance"],
  },
  {
    title: "BigAntSosa",
    description:
      "Streamer and content creator site — gaming, F1, marathon running, and vibes.",
    image: "/images/portfolio/bigantsosa.png",
    url: "https://bigantsosa.vercel.app",
    tags: ["Creator", "Entertainment"],
  },
  {
    title: "IG Growth Leaderboard",
    description:
      "Community-driven Instagram growth platform — leaderboard tracking and roadmap to influencer reach.",
    image: "/images/portfolio/ig-growth-leaderboard.png",
    url: "https://ig4retards.com",
    tags: ["SaaS", "Social Media"],
  },
  {
    title: "Timeline That",
    description:
      "SaaS app letting users create shareable timelines with Stripe payments and unique generated URLs.",
    image: "/images/portfolio/timeline-that.png",
    url: "https://timelinethat.com/",
    tags: ["SaaS", "Personal Project"],
  },
  {
    title: "Emoji AI",
    description:
      "AI-powered emoji generator — turn any sentence into emojis using OpenAI, with copy-to-clipboard sharing.",
    image: "/images/portfolio/emoji_ai.png",
    url: "https://www.emoji-ai.app/",
    tags: ["AI", "Personal Project"],
  },
  {
    title: "Irish Poker",
    description:
      "Online multiplayer card game with Socket.io real-time communication — play from any device.",
    image: "/images/portfolio/irish-poker.png",
    url: "https://www.irish-poker.com",
    tags: ["Game", "Multiplayer"],
  },
];

function ProjectCard({
  project,
  index,
  isInView,
}: {
  project: (typeof professionalProjects)[number];
  index: number;
  isInView: boolean;
}) {
  return (
    <motion.a
      href={project.url}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: 0.1 + index * 0.08, duration: 0.6 }}
      className="group relative rounded-2xl border border-white/10 bg-white/5 overflow-hidden hover:border-red-600/40 transition-all duration-500"
    >
      <div className="relative aspect-[16/9] overflow-hidden">
        <Image
          src={project.image}
          alt={`${project.title} website screenshot`}
          fill
          className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
      </div>

      <div className="p-6">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-xl font-bold text-white group-hover:text-red-500 transition-colors">
            {project.title}
          </h3>
          <svg
            className="w-5 h-5 text-gray-500 group-hover:text-red-500 transition-all group-hover:translate-x-1 group-hover:-translate-y-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M7 17L17 7M17 7H7M17 7v10"
            />
          </svg>
        </div>
        <p className="text-sm text-gray-400 mb-4 leading-relaxed">
          {project.description}
        </p>
        <div className="flex gap-2 flex-wrap">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs px-3 py-1 rounded-full border border-white/10 text-gray-500"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.a>
  );
}

export default function PortfolioPage() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <div ref={ref} className="min-h-screen pt-32 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <p className="text-xs uppercase tracking-[0.4em] text-red-500 font-mono mb-4">
            Portfolio
          </p>
          <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tight">
            Websites
            <br />
            <span className="text-red-500">I&apos;ve Built.</span>
          </h1>
          <p className="text-gray-400 mt-4 max-w-xl">
            Custom-designed, mobile-first websites for creators, athletes, and
            small businesses. Every site is built to look good and convert.
          </p>
        </motion.div>

        {/* Professional Projects */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mb-6"
        >
          <p className="text-xs uppercase tracking-[0.3em] text-gray-600 font-mono mb-2">
            Professional
          </p>
          <div className="h-px bg-gradient-to-r from-red-600/30 to-transparent mb-8" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 mb-20">
          {professionalProjects.map((project, i) => (
            <ProjectCard
              key={project.title}
              project={project}
              index={i}
              isInView={isInView}
            />
          ))}
        </div>

        {/* Freelance & Personal Projects */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="mb-6"
        >
          <p className="text-xs uppercase tracking-[0.3em] text-gray-600 font-mono mb-2">
            Freelance & Personal
          </p>
          <div className="h-px bg-gradient-to-r from-red-600/30 to-transparent mb-8" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {freelanceProjects.map((project, i) => (
            <ProjectCard
              key={project.title}
              project={project}
              index={i}
              isInView={isInView}
            />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mt-16 text-center"
        >
          <p className="text-gray-500 mb-4">
            Need a website built for your business or brand?
          </p>
          <a
            href="mailto:dcrame2@gmail.com?subject=Website%20Build%20Inquiry"
            className="inline-block px-8 py-3 bg-red-600 text-white font-bold text-sm uppercase tracking-wider rounded-xl hover:bg-red-500 transition-all"
          >
            Get Started — $500
          </a>
        </motion.div>
      </div>
    </div>
  );
}
