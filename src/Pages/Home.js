import { useState } from "react";

import HeroSection from "../Components/HeroSection";
import SalonCard from "../Components/SalonCard";

import { categories, salons } from "../Data/mockData";

import "./Home.scss";

function Home() {
  const [search, setSearch] = useState("");

  const filteredSalons = salons.filter((salon) =>
    salon.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="home-page">

      <HeroSection />

      {/* Categories */}
      <section className="section categories-section">
        <div className="container">

          <div className="section-header">
            <span className="section-label">
              EXPLORE
            </span>

            <h2 className="section-title">
              Everything you need to feel your best
            </h2>

            <p className="section-description">
              Discover professional beauty services from
              trusted salons near you.
            </p>
          </div>

          <div className="categories-grid">
            {categories.map((category) => (
              <div
                className="category-card"
                key={category.id}
              >

                <div className="category-image">
                  <img
                    src={category.image}
                    alt={category.name}
                  />
                </div>

                <div className="category-content">
                  <h3>{category.name}</h3>

                  <p>
                    {category.description}
                  </p>

                  <span className="category-link">
                    Explore services →
                  </span>
                </div>

              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Search Salons */}
      <section className="section salons-section">
        <div className="container">

          <div className="section-header">
            <span className="section-label">
              DISCOVER
            </span>

            <h2 className="section-title">
              Find your next beauty destination
            </h2>

            <p className="section-description">
              Explore highly rated salons and find the
              right service for you.
            </p>
          </div>

          <div className="salon-search">
            <span className="search-symbol">⌕</span>

            <input
              type="text"
              placeholder="Search salons..."
              value={search}
              onChange={(event) =>
                setSearch(event.target.value)
              }
            />
          </div>

          {filteredSalons.length > 0 ? (
            <div className="salons-grid">
              {filteredSalons.map((salon) => (
                <SalonCard
                  key={salon.id}
                  salon={salon}
                />
              ))}
            </div>
          ) : (
            <div className="empty-state">

              <div className="empty-search">
                ⌕
              </div>

              <h3>
                No salons found
              </h3>

              <p>
                Try searching with another salon name.
              </p>

            </div>
          )}

        </div>
      </section>

      {/* CTA */}
      <section className="cta-section">
        <div className="container cta-container">

          <div>
            <span className="section-label">
              FOR SALON OWNERS
            </span>

            <h2>
              Grow your salon with Glōvia.
            </h2>

            <p>
              Manage appointments, services, staff and
              customers from one simple dashboard.
            </p>
          </div>

          <a
            href="http://localhost:3002"
            className="primary-btn"
          >
            Salon Dashboard
          </a>

        </div>
      </section>

    </div>
  );
}

export default Home;