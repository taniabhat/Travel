import React from 'react';
import CardNav from './CardNav';

const Navbar = () => {
  const navItems = [
    {
      label: "Tour",
      bgColor: "#1e293b",
      textColor: "#fff",
      links: [
        { label: "Popular Destinations", href: "/products", ariaLabel: "View Popular Destinations" },
        { label: "Adventure Tours", href: "/products?category=Adventure", ariaLabel: "Explore Adventure Tours" },
        { label: "Family Packages", href: "/products?category=Relaxation", ariaLabel: "Browse Family Packages" }
      ]
    },
    {
      label: "About Us",
      bgColor: "#334155",
      textColor: "#fff",
      links: [
        { label: "Our Story", href: "#", ariaLabel: "Learn Our Story" },
        { label: "Team", href: "#", ariaLabel: "Meet the Team" },
        { label: "Careers", href: "#", ariaLabel: "Join Our Team" }
      ]
    },
    {
      label: "Contact",
      bgColor: "#475569",
      textColor: "#fff",
      links: [
        { label: "Email Us", href: "#", ariaLabel: "Send us an Email" },
        { label: "Phone", href: "#", ariaLabel: "Call Us" },
        { label: "Support", href: "#", ariaLabel: "Get Support" }
      ]
    }
  ];

  return (
    <>
      {/* Card Navigation */}
      <CardNav
        logo="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 50'%3E%3Ctext x='10' y='35' font-family='Arial, sans-serif' font-size='28' font-weight='bold' fill='%231e293b'%3EWay.Farer%3C/text%3E%3C/svg%3E"
        logoAlt="Way.Farer Logo"
        items={navItems}
        baseColor="#fff"
        menuColor="#1e293b"
        ease="power3.out"
      />
    </>
  );
};

export default Navbar;
