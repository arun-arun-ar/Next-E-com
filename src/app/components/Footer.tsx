import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Facebook, Linkedin, Instagram, Github } from 'lucide-react';

type FooterItems = {
  label: string;
  href: string;
};

const getToKnowUs: FooterItems[] = [
  { label: 'About Us', href: '/aboutUs' },
  { label: 'Blogs', href: '/blogs' },
  { label: 'Careers', href: '/careers' },
  { label: 'Terms and Conditions', href: '/terms-and-conditions' },
  { label: 'Privacy Policy', href: '/privacy-policy' },
];

const customerCare: FooterItems[] = [
  { label: 'Help Center', href: '/help-center' },
  { label: 'How to Buy', href: '/how-to-buy' },
  { label: 'Return & Refund', href: '/return-and-refund' },
  { label: 'Contact Us', href: '/contact-us' },
];

const makeMoneyWithUs: FooterItems[] = [
  { label: 'Sell Products With Us', href: '/sell-products-with-us' },
  { label: 'Become an Affiliate', href: '/become-an-affiliate' },
  { label: 'Advertise Your Products', href: '/advertise-your-product' },
  { label: 'Self-Publish with Us', href: '/self-publish-with-us' },
];

const Footer = () => {
  return (
    <div className='w-full bg-gray-900 text-gray-300'>
      <div className='max-w-6xl mx-auto px-4 py-10'>

        {/* Sections */}
        <div className='flex flex-col gap-8 md:flex-row md:justify-between'>
          {[{ title: 'Get to Know Us', links: getToKnowUs },
          { title: 'Customer Care', links: customerCare },
          { title: 'Make Money With Us', links: makeMoneyWithUs }]
            .map((section) => (
              <div key={section.title}>
                <h2 className='text-xl md:text-2xl font-semibold mb-4'>{section.title}</h2>
                <ul className='space-y-2'>
                  {section.links.map((link) => (
                    <li key={link.href}>
                      <Link href={link.href}>
                        <span className='cursor-pointer hover:text-white text-base md:text-lg transition hover:underline'>
                          {link.label}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
        </div>

        {/* Payment & Social */}
        <div className='mt-10 flex flex-col items-center gap-8'>

          {/* Payment Methods */}
          <div className='w-full'>
            <h2 className='text-center text-2xl md:text-3xl font-bold mb-6'>Payment Methods</h2>
            <div className='flex flex-wrap justify-center gap-5'>
              {[
                { src: "/cod.png", alt: "Cash on Delivery" },
                { src: "/visa_179457.png", alt: "Visa Card" },
                { src: "/master-card.png", alt: "Master Card" },
                { src: "/esewa.png", alt: "eSewa" },
                { src: "/ime-pay.webp", alt: "IME Pay" },
              ].map(({ src, alt }, index) => (
                <Image
                  key={index}
                  src={src}
                  alt={alt}
                  width={80}
                  height={80}
                  className='invert  rounded-md max-w-[80px]'
                />
              ))}
            </div>
          </div>

          {/* Follow Us Section */}
          <div className='w-full text-center'>
            <h1 className='text-xl md:text-2xl font-bold mb-4'>Follow Us</h1>
            <div className="flex flex-wrap justify-center gap-3 sm:gap-4 md:gap-5 lg:gap-6">
              {[
                { Icon: Facebook, href: "https://www.facebook.com/arun.acharya.58511", color: "#1877F2", name: "Facebook" },
                { Icon: Linkedin, href: "https://www.linkedin.com/in/arun-acharya-a27427178/", color: "#0A66C2", name: "LinkedIn" },
                { Icon: Instagram, href: "https://www.instagram.com/ar_un.ar/", color: "#E4405F", name: "Instagram" },
                { Icon: Github, href: "https://github.com/arun-arun-ar", color: "gray", name: "GitHub" },
              ].map(({ Icon, href, color, name }, index) => (
                <a
                  key={index}
                  href={href}
                  className="group relative text-white p-3 sm:p-4 rounded-full transition-all duration-300 hover:-translate-y-1 hover:bg-slate-800/60 border border-transparent hover:border-cyan-300/20"
                  style={{ color }}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={name}
                >
                  <Icon className="w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 lg:w-10 lg:h-10 transition-transform duration-300 group-hover:scale-110" />
                  <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 border border-cyan-300/20" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className='mt-10 text-center text-sm text-gray-400'>
          © {new Date().getFullYear()} Arun Acharya. All rights reserved.
        </div>
      </div>
    </div>
  );
};

export default Footer;
