import React from 'react';

const WaterHeatersPage = () => {
  return (
    <div className="water-heaters-service">
      {/* SEO Meta Data (to be placed in <Head> component) */}
      <meta name="description" content="Afternoon Plumbing provides expert water heater installation, repair, and replacement in Westminster MD 21157. Tank, tankless & heat pump water heaters. Emergency service available. Call today!" />
      <meta name="keywords" content="water heaters Westminster MD, water heater installation, water heater repair, tank water heaters, tankless water heaters, heat pump water heaters, Westminster 21157, emergency plumber, Carroll County" />
      
      {/* H1 - Primary Heading */}
      <header>
        <h1>Professional Water Heater Services in Westminster MD 21157</h1>
        <p className="intro">
          Afternoon Plumbing delivers reliable water heater installation, repair, and replacement 
          for homeowners and businesses throughout Westminster, Maryland and Carroll County. 
          Our licensed plumbers specialize in tank, tankless, and heat pump water heaters, 
          ensuring you have consistent hot water when you need it most.
        </p>
      </header>

      {/* Types of Water Heaters Section */}
      <section id="water-heater-types" className="services-section">
        <h2>Our Water Heater Expertise</h2>
        
        <div className="heater-type">
          <h3>Tank Water Heaters</h3>
          <p>
            Traditional tank water heaters remain the most popular choice for many Westminster homes. 
            We install and service all major brands, offering both gas and electric models with 
            capacities ranging from 40 to 80 gallons. Tank water heaters provide reliable hot water 
            storage for families of all sizes and are typically the most cost-effective option upfront.
          </p>
          <ul>
            <li>40-80 gallon capacities</li>
            <li>Gas and electric models</li>
            <li>Energy Star rated options available</li>
            <li>Affordable installation costs</li>
          </ul>
        </div>

        <div className="heater-type">
          <h3>Tankless Water Heaters</h3>
          <p>
            For Westminster homeowners seeking endless hot water and maximum energy efficiency, 
            tankless (on-demand) water heaters are an excellent solution. These compact units heat 
            water only when needed, reducing energy waste and providing unlimited hot water for 
            showers, laundry, and dishes—perfect for larger families or homes with simultaneous 
            hot water demands.
          </p>
          <ul>
            <li>Endless hot water supply</li>
            <li>Compact, space-saving design</li>
            <li>Up to 40% energy savings over traditional tanks</li>
            <li>Longer lifespan (20+ years)</li>
            <li>Ideal for homes in 21157 and surrounding areas</li>
          </ul>
        </div>

        <div className="heater-type">
          <h3>Heat Pump Water Heaters</h3>
          <p>
            For maximum efficiency and long-term savings, consider a heat pump water heater. 
            Using advanced technology that moves heat rather than generates it, these systems 
            can be up to 300% more efficient than standard electric water heaters. While 
            installation costs are higher, the energy savings and potential rebates make 
            heat pump water heaters a smart investment for environmentally conscious 
            Westminster residents.
          </p>
          <ul>
            <li>Extremely high efficiency (3x more efficient than standard electric)</li>
            <li>Significant reduction in energy bills</li>
            <li>Qualifies for utility rebates and tax credits</li>
            <li>Lower carbon footprint</li>
            <li>Perfect for year-round operation in Maryland's climate</li>
          </ul>
        </div>
      </section>

      {/* Installation & Repair Services Section */}
      <section id="installation-repair" className="services-section">
        <h2>Water Heater Installation & Repair Services</h2>
        
        <div className="service-grid">
          <div className="service-item">
            <h3>New Water Heater Installation</h3>
            <p>
              Whether you're building a new home in Westminster or replacing an old unit, 
              our experienced technicians ensure proper sizing, venting, and installation 
              according to local codes. We handle permits, safety checks, and thorough 
              testing so your new water heater performs optimally from day one.
            </p>
          </div>

          <div className="service-item">
            <h3>Water Heater Repair</h3>
            <p>
              Not every water heater problem requires replacement. Our expert诊断 can often 
              repair issues like faulty thermostats, heating elements, pilot lights, or 
              leaks, saving you money and extending your system's life. We service all 
              makes and models throughout Carroll County.
            </p>
          </div>

          <div className="service-item">
            <h3>Water Heater Replacement</h3>
            <p>
              When repair costs exceed 50% of a new unit's price, replacement makes sense. 
              We efficiently remove your old water heater and install a new, energy-efficient 
              model, upgrading your home's hot water performance and reliability. 
              Free estimates available.
            </p>
          </div>

          <div className="service-item">
            <h3>Annual Maintenance</h3>
            <p>
              Regular maintenance extends your water heater's lifespan and prevents costly 
              breakdowns. Our maintenance service includes tank flushing (for tank models), 
              anode rod inspection, valve testing, safety checks, and efficiency optimization. 
              Schedule annual service to keep your warranty valid and avoid unexpected failures.
            </p>
          </div>
        </div>
      </section>

      {/* Energy Efficiency Benefits Section */}
      <section id="energy-efficiency" className="services-section">
        <h2>Energy Efficiency Benefits & Savings</h2>
        <p>
          Water heating accounts for approximately 18% of your home's energy costs. 
          Upgrading to a modern, high-efficiency water heater can significantly reduce 
          your monthly utility bills while improving comfort. Here's why Westminster 
          homeowners choose energy-efficient water heaters:
        </p>
        
        <div className="benefits-grid">
          <div className="benefit-item">
            <h4>Lower Energy Bills</h4>
            <p>
              High-efficiency models use less energy to produce the same amount of hot water, 
              translating to immediate monthly savings. Tankless and heat pump systems offer 
              the greatest reductions, often cutting water heating costs by 30-50%.
            </p>
          </div>

          <div className="benefit-item">
            <h4>Long-Term Investment</h4>
            <p>
              While efficient water heaters may cost more upfront, the energy savings over 
              the system's lifetime typically exceed the initial investment. Many units last 
              10-20 years, providing decades of reduced operating costs.
            </p>
          </div>

          <div className="benefit-item">
            <h4>Environmental Impact</h4>
            <p>
              Reducing energy consumption means fewer emissions. By choosing a high-efficiency 
              water heater, you're contributing to a cleaner environment for Westminster and 
              the broader Carroll County community.
            </p>
          </div>

          <div className="benefit-item">
            <h4>Increased Home Value</h4>
            <p>
              Modern, efficient water heaters are attractive to homebuyers. An upgraded 
              water heating system can boost your property's appeal and market value, 
              especially in today's market where energy efficiency is a key selling point.
            </p>
          </div>
        </div>

        <p className="cta-note">
          <strong>Tip:</strong> Ask us about available rebates and tax incentives for 
          installing high-efficiency water heaters in your Westminster MD home. Many 
          utility programs offer significant discounts that reduce your upfront costs.
        </p>
      </section>

      {/* Emergency Water Heater Issues Section */}
      <section id="emergency-issues" className="services-section emergency">
        <h2>Emergency Water Heater Issues We Handle</h2>
        <p>
          Water heater emergencies don't wait for business hours. At Afternoon Plumbing, 
          we provide 24/7 emergency service for urgent water heater problems throughout 
          Westminster and Carroll County. If you experience any of these issues, call us immediately:
        </p>

        <div className="emergency-list">
          <div className="emergency-item">
            <h4>🚨 No Hot Water</h4>
            <p>
              Complete loss of hot water indicates a serious failure—often a faulty heating 
              element, broken thermostat, or gas supply issue. This requires immediate 
              attention, especially during winter months in Westminster MD.
            </p>
          </div>

          <div className="emergency-item">
            <h4>🚨 Water Heater Leaks</h4>
            <p>
              Leaking tank or connections can cause water damage, mold growth, and flooding. 
              A leaking tank usually means the unit needs replacement, while pipe or valve 
              leaks may be repairable. Shut off the water and power/gas, then call us.
            </p>
          </div>

          <div className="emergency-item">
            <h4>🚨 Strange Noises</h4>
            <p>
              Rumbling, popping, or banging sounds often indicate sediment buildup, which 
              can reduce efficiency and eventually cause tank failure. If noises are loud 
              or persistent, have your water heater inspected promptly.
            </p>
          </div>

          <div className="emergency-item">
            <h4>🚨 Gas Smell or Carbon Monoxide</h4>
            <p>
              A gas odor near your water heater indicates a leak—this is a serious safety 
              hazard. If you smell gas, evacuate, avoid flames, and call us immediately. 
              Similarly, if your carbon monoxide detector sounds, have your water heater 
              checked right away.
            </p>
          </div>

          <div className="emergency-item">
            <h4>🚨 Flooding from Tank Failure</h4>
            <p>
              A ruptured tank can release gallons of water in minutes, causing extensive 
              damage. If your tank is actively leaking, turn off the water supply and power, 
              then contact our emergency team for fast replacement.
            </p>
          </div>
        </div>

        <p className="emergency-cta">
          <strong>24/7 Emergency Service Available:</strong> Call <a href="tel:+14405551234">(443) 555-1234</a> anytime for urgent 
          water heater issues in Westminster MD 21157. Fast response, transparent pricing, 
          and no surprise fees.
        </p>
      </section>

      {/* FAQs Section with AEO-Optimized Answers */}
      <section id="faq" className="services-section">
        <h2>Frequently Asked Questions</h2>
        <p>
          Find answers to common questions about water heaters, installation, maintenance, 
          and costs for Westminster MD homeowners. All answers are optimized for voice search 
          and AI overviews, providing clear, helpful information.
        </p>

        <div className="faq-list" itemScope itemType="https://schema.org/FAQPage">
          <div className="faq-item" itemScope itemProp="mainEntity">
            <h3 itemScope itemProp="name">How long does a water heater typically last?</h3>
            <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
              <p itemProp="text">
                Most traditional tank water heaters last 10-15 years with proper maintenance, 
                while tankless models can last 20 years or more. Heat pump water heaters typically 
                have a lifespan of 10-15 years. Regular annual maintenance—including tank flushing 
                for tank models—can extend your water heater's life and maintain efficiency.
              </p>
            </div>
          </div>

          <div className="faq-item" itemScope itemProp="mainEntity">
            <h3 itemScope itemProp="name">What size water heater do I need for my Westminster home?</h3>
            <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
              <p itemProp="text">
                The right size depends on your household size, hot water usage patterns, and 
                number of bathrooms. As a general guideline: 40-50 gallon tanks work for 2-3 person 
                households; 50-80 gallon tanks for 4+ person households. Tankless units are sized by 
                flow rate (gallons per minute) and don't require storage capacity. Our Westminster 
                technicians can assess your needs and recommend the perfect size during a free consultation.
              </p>
            </div>
          </div>

          <div className="faq-item" itemScope itemProp="mainEntity">
            <h3 itemScope itemProp="name">How much does water heater installation cost in Westminster MD?</h3>
            <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
              <p itemProp="text">
                Installation costs vary by type and complexity: Tank water heaters range from $1,200-$3,500 
                installed; tankless units cost $2,500-$5,500; heat pump water heaters range from $3,000-$6,500. 
                Factors affecting price include unit size, venting requirements, electrical/gas upgrades, and 
                permits. Afternoon Plumbing provides free, no-obligation estimates for Westminster 21157 residents 
                with transparent pricing.
              </p>
            </div>
          </div>

          <div className="faq-item" itemScope itemProp="mainEntity">
            <h3 itemScope itemProp="name">Should I repair or replace my water heater?</h3>
            <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
              <p itemProp="text">
                Consider repair if your water heater is under 10 years old and the repair cost is less than 
                50% of a new unit's price. For units over 10-12 years old, replacement is often more cost-effective 
                long-term. Leaking tanks, repeated breakdowns, or significantly declining efficiency usually 
                warrant replacement. Our Westminster plumbers provide honest assessments to help you decide.
              </p>
            </div>
          </div>

          <div className="faq-item" itemScope itemProp="mainEntity">
            <h3 itemScope itemProp="name">Do tankless water heaters really save energy?</h3>
            <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
              <p itemProp="text">
                Yes—tankless water heaters can reduce energy consumption by up to 40% compared to traditional 
                tank models. Because they heat water on demand rather than storing and reheating 40-80 gallons 
                continuously, they eliminate standby heat loss. For Westminster families with moderate to high 
                hot water usage, the energy savings often justify the higher upfront cost within 5-10 years.
              </p>
            </div>
          </div>

          <div className="faq-item" itemScope itemProp="mainEntity">
            <h3 itemScope itemProp="name">What maintenance does a water heater need?</h3>
            <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
              <p itemProp="text">
                Tank water heaters should be flushed annually to remove sediment buildup, which improves 
                efficiency and extends tank life. The anode rod (sacrificial rod) should be inspected every 
                2-3 years and replaced if worn down to prevent corrosion. Check temperature/pressure relief 
                valves annually. Tankless models require descaling every 1-2 years in areas with hard water, 
                including many parts of Carroll County. Afternoon Plumbing offers comprehensive maintenance plans.
              </p>
            </div>
          </div>

          <div className="faq-item" itemScope itemProp="mainEntity">
            <h3 itemScope itemProp="name">Can I install a water heater myself?</h3>
            <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
              <p itemProp="text">
                Professional installation is strongly recommended and often required by code. Water heater 
                installation involves plumbing, electrical or gas work, venting, and safety considerations 
                that require licensed expertise. Improper installation can cause property damage, gas leaks, 
                carbon monoxide hazards, or void warranties. For Westminster homeowners, hiring a licensed 
                plumber ensures safety, compliance, and often protects manufacturer warranties.
              </p>
            </div>
          </div>

          <div className="faq-item" itemScope itemProp="mainEntity">
            <h3 itemScope itemProp="name">What are signs my water heater needs repair?</h3>
            <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
              <p itemProp="text">
                Warning signs include: no hot water, lukewarm water, water that's too hot, rumbling or popping 
                noises, water pooling around the base, rusty or discolored water, foul-smelling hot water, or 
                moisture on the tank. If you notice any of these issues with your Westminster water heater, 
                call Afternoon Plumbing promptly—addressing problems early can prevent costly emergencies.
              </p>
            </div>
          </div>

          <div className="faq-item" itemScope itemProp="mainEntity">
            <h3 itemScope itemProp="name">Are heat pump water heaters worth it in Maryland?</h3>
            <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
              <p itemProp="text">
                Yes, heat pump water heaters work well in Maryland's climate. While they operate most efficiently 
                in warm spaces (garages, basements), they still provide significant savings in typical Westminster 
                home environments. They qualify for federal tax credits and BGE or other utility rebates, reducing 
                net cost by $1,000-$2,000+. For homes planning to stay 10+ years, heat pump water heaters usually 
                offer the best long-term value.
              </p>
            </div>
          </div>

          <div className="faq-item" itemScope itemProp="mainEntity">
            <h3 itemScope itemProp="name">Do you offer warranties on water heater work?</h3>
            <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
              <p itemProp="text">
                Yes—Afternoon Plumbing stands behind our work with a comprehensive labor warranty. We also honor 
                all manufacturer warranties on parts and equipment. Typical warranties include 1-2 years on labor, 
                plus the manufacturer's warranty on the unit itself (often 6-12 years on tanks, 10+ years on tankless). 
                We register your water heater and provide all warranty documentation, giving Westminster homeowners 
                peace of mind.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Local Westminster, MD References */}
      <section id="local-westminster" className="services-section local">
        <h2>Serving Westminster, MD 21157 & Carroll County</h2>
        <p>
          Afternoon Plumbing is proud to serve the Westminster community and surrounding areas in 
          Carroll County, Maryland. We're your local water heater experts—trusted by homeowners in 
          21157 and nearby neighborhoods for reliable, affordable service. Our service area includes:
        </p>
        
        <div className="local-list">
          <ul>
            <li>Westminster, MD (21157)</li>
            <li>Manchester (21158)</li>
            <li>Hampstead (21074)</li>
            <li>Sykesville (21784)</li>
            <li>Finksburg (21048)</li>
            <li>Eldersburg (21784)</li>
            <li>Lineboro (21088)</li>
            <li>Union Bridge (21791)</li>
            <li>New Windsor (21776)</li>
            <li>Woodbine (21797)</li>
          </ul>
        </div>

        <p className="local-cta">
          Whether you need a water heater installed in a new home on Main Street, urgent repair in a 
          Westminster neighborhood, or a tankless upgrade for a Carroll County business, Afternoon 
          Plumbing delivers prompt, professional service. 
          <a href="tel:+14405551234">Call (443) 555-1234</a> today for a free estimate.
        </p>
      </section>

      {/* Final Call to Action */}
      <section className="cta-section">
        <h2>Ready for Reliable Hot Water?</h2>
        <p>
          Don't let water heater problems disrupt your day. Afternoon Plumbing provides 
          Westminster MD homeowners with expert installation, repair, and maintenance 
          services for all types of water heaters. With 24/7 emergency availability, 
          transparent pricing, and a commitment to quality, we're the water heater 
          experts Carroll County trusts.
        </p>
        <div className="cta-buttons">
          <a href="tel:+14405551234" className="cta-button primary">Call Now: (443) 555-1234</a>
          <a href="/contact" className="cta-button secondary">Request a Free Quote</a>
        </div>
      </section>

      <style jsx>{`
        .water-heaters-service {
          max-width: 1200px;
          margin: 0 auto;
          padding: 2rem;
          line-height: 1.7;
        }
        
        header {
          margin-bottom: 3rem;
        }

        h1 {
          font-size: 2.5rem;
          color: #1a1a1a;
          margin-bottom: 1rem;
          line-height: 1.2;
        }

        h2 {
          font-size: 2rem;
          color: #2c5aa0;
          margin-top: 3rem;
          margin-bottom: 1.5rem;
          padding-bottom: 0.5rem;
          border-bottom: 2px solid #e0e0e0;
        }

        h3 {
          font-size: 1.5rem;
          color: #333;
          margin-top: 1.5rem;
          margin-bottom: 1rem;
        }

        h4 {
          font-size: 1.25rem;
          color: #444;
          margin-top: 1rem;
          margin-bottom: 0.75rem;
        }

        .intro {
          font-size: 1.2rem;
          color: #444;
          max-width: 900px;
        }

        .services-section {
          margin-bottom: 3rem;
        }

        .heater-type, .service-item, .benefit-item, .emergency-item {
          background: #f9f9f9;
          padding: 1.5rem;
          margin: 1.5rem 0;
          border-radius: 8px;
          border-left: 4px solid #2c5aa0;
        }

        .service-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 1.5rem;
          margin-top: 1.5rem;
        }

        .benefits-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 1.5rem;
          margin: 1.5rem 0;
        }

        .emergency-list, .faq-list {
          margin-top: 2rem;
        }

        .emergency-item {
          border-left-color: #d32f2f;
        }

        .cta-note, .emergency-cta, .local-cta {
          background: #e8f4fd;
          padding: 1.5rem;
          border-radius: 8px;
          margin: 2rem 0;
          border-left: 4px solid #2c5aa0;
        }

        .faq-item {
          margin-bottom: 2rem;
          padding: 1.5rem;
          background: #fff;
          border: 1px solid #e0e0e0;
          border-radius: 8px;
        }

        .faq-item h3 {
          margin-top: 0;
          color: #2c5aa0;
        }

        .cta-section {
          text-align: center;
          background: linear-gradient(135deg, #2c5aa0, #1e3d6f);
          color: white;
          padding: 3rem 2rem;
          border-radius: 12px;
          margin-top: 3rem;
        }

        .cta-section h2 {
          color: white;
          border-bottom: none;
          margin-bottom: 1rem;
        }

        .cta-buttons {
          display: flex;
          gap: 1rem;
          justify-content: center;
          flex-wrap: wrap;
          margin-top: 2rem;
        }

        .cta-button {
          display: inline-block;
          padding: 1rem 2rem;
          border-radius: 8px;
          text-decoration: none;
          font-weight: bold;
          font-size: 1.1rem;
          transition: transform 0.2s, box-shadow 0.2s;
        }

        .cta-button.primary {
          background: #ff6b35;
          color: white;
        }

        .cta-button.secondary {
          background: white;
          color: #2c5aa0;
          border: 2px solid white;
        }

        .cta-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0,0,0,0.2);
        }

        .local-list ul {
          columns: 2;
          column-gap: 2rem;
          list-style-type: disc;
          padding-left: 1.5rem;
        }

        .local-list li {
          margin-bottom: 0.5rem;
        }

        a {
          color: #2c5aa0;
          text-decoration: underline;
        }

        a:hover {
          color: #1e3d6f;
        }

        /* Responsive adjustments */
        @media (max-width: 768px) {
          h1 {
            font-size: 2rem;
          }
          
          h2 {
            font-size: 1.75rem;
          }

          .local-list ul {
            columns: 1;
          }

          .cta-buttons {
            flex-direction: column;
            align-items: center;
          }

          .cta-button {
            width: 100%;
            max-width: 400px;
            text-align: center;
          }
        }
      `}</style>
    </div>
  );
};

export default WaterHeatersPage;
