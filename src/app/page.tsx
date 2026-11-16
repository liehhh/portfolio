import About from "@/components/About";
import Cursor from "@/components/Cursor";
import Featured from "@/components/Featured";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import ProjectDialogs from "@/components/ProjectDialogs";
import { Capabilities, Contact, Experience } from "@/components/Sections";
import Work from "@/components/Work";
import { profile, site } from "@/content/portfolio";
import { siteUrl } from "@/lib/site";

function JsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    url: siteUrl().toString(),
    jobTitle: "Full-Stack Developer & AI Engineer",
    description: site.description,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Tbilisi",
      addressCountry: "GE",
    },
    sameAs: [profile.linkedin, profile.github].filter(Boolean),
    knowsLanguage: ["ka", "en"],
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: "Business and Technology University",
    },
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}

export default function Home() {
  return (
    <>
      <a href="#work" className="skip">
        Skip to work
      </a>
      <Header />
      <main>
        <Hero />
        <About />
        <Work />
        <Featured />
        <Capabilities />
        <Experience />
        <Contact />
      </main>
      <ProjectDialogs />
      <div className="grain" aria-hidden />
      <Cursor />
      <JsonLd />
    </>
  );
}
