// Seed Profiles
export const DEFAULT_PROFILES = [
  {
    id: "author-101",
    full_name: "Dr. Albert Stern",
    institution: "University of Zambia",
    specialty: "Theoretical Relativity & Physics",
    about_author: "Dr. Albert Stern is a senior researcher specialized in advanced gravitational mechanics and quantum coordinate equations.",
    avatar_url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200",
    role: "researcher",
    metadata: ["email:albert.stern@unza.edu.zm", "show_email_true"],
    created_at: "2024-01-15T12:00:00Z"
  },
  {
    id: "author-102",
    full_name: "Prof. Chanda Mwansa",
    institution: "Copperbelt University",
    specialty: "Fluid Mechanics & Hydro-Structures",
    about_author: "Professor Mwansa conducts intensive design research on high-flow hydroelectric dam gates and hydraulic sediment models.",
    avatar_url: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200",
    role: "researcher",
    metadata: ["email:chanda.mwansa@cbu.edu.zm", "show_email_true"],
    created_at: "2023-11-22T10:00:00Z"
  },
  {
    id: "author-103",
    full_name: "Dr. Brenda Mulenga",
    institution: "Lusaka University",
    specialty: "Epidemiological Vectors & Public Health",
    about_author: "Dr. Mulenga holds a PhD in Tropical Health Sciences and conducts field investigations on aquatic pathogens in regional wetlands.",
    avatar_url: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200",
    role: "researcher",
    metadata: ["email:brenda.mulenga@lu.edu.zm", "show_email_true"],
    created_at: "2025-02-10T08:30:00Z"
  },
  {
    id: "author-104",
    full_name: "Dr. Kelvin Phiri",
    institution: "Chalimbana University",
    specialty: "Distributed Systems & Logistics Tech",
    about_author: "Dr. Phiri leads the Distributed Systems Lab, engineering decentralised networks adapted for severe communication dropouts.",
    avatar_url: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=200",
    role: "researcher",
    metadata: ["email:kelvin.phiri@cu.edu.zm", "show_email_true"],
    created_at: "2024-08-02T15:45:00Z"
  },
  {
    id: "author-105",
    full_name: "Prof. Grace Banda",
    institution: "Cavendish University Zambia",
    specialty: "Microeconomics & Rural Cooperatives",
    about_author: "Professor Banda is an expert in development finance, assessing structural micro-loan safety frameworks across multiple districts.",
    avatar_url: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200",
    role: "researcher",
    metadata: ["email:grace.banda@cavendish.edu.zm", "show_email_true"],
    created_at: "2022-05-14T09:12:00Z"
  }
];

// Seed Papers
export const DEFAULT_PAPERS = [
  {
    id: 101,
    title: "On the Electrodynamics of Moving Bodies & Spacetime Metric Distortions",
    abstract: "A comprehensive restructuring of coordinate relativity under Lorentzian invariant schemas, mapping local spatial tensors and resolving time dilation discrepancies in gravitational wells.",
    introduction: "In modern astrophysical study, the interaction of high-mass bodies creates local metric shear. This study attempts to unify field theories under dynamic coordinate frames.",
    conclusion: "Through our multi-state metric models, we established that dilations correlate perfectly with the localized stress-energy tensor representations.",
    category: "Physics",
    cover_image: "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&q=80&w=600",
    file_url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    citations: 142,
    downloads: 308,
    status: "approved",
    year: 2024,
    date_posted: "Jan 15, 2024",
    author_id: "author-101",
    created_at: "2024-01-15T12:00:00Z",
    updated_at: "2024-01-15T12:00:00Z"
  },
  {
    id: 102,
    title: "Optimal Multi-Stage Hydrodynamic Balancing in Reservoir Gates",
    abstract: "This paper presents a numerical framework for managing shear turbulence in high-velocity release channels of reservoirs, demonstrating optimized sediment transport and lower gate strain.",
    introduction: "Hydrodynamic pressure distributions in gate channels are subject to severe transient fluctuations. This paper outlines stabilizing balancing techniques.",
    conclusion: "Implementing multi-stage flow separators resulted in a 42% decrease in shear stress metrics monitored at regional check-gates.",
    category: "Engineering",
    cover_image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&q=80&w=600",
    file_url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    citations: 33,
    downloads: 109,
    status: "approved",
    year: 2023,
    date_posted: "Nov 22, 2023",
    author_id: "author-102",
    created_at: "2023-11-22T10:00:00Z",
    updated_at: "2023-11-22T10:00:00Z"
  },
  {
    id: 103,
    title: "Epidemiological Mapping of Vector Pathogens in Sub-Saharan Lakes",
    abstract: "Using spatial kriging and remote-sensing analytical models to pinpoint high-probability water habitats of pathogenic vectors, facilitating targeted public health interventions.",
    introduction: "Inland water systems present localized hotspots for pathogen transmission. Identifying seasonal breeding models is critical for preventative control.",
    conclusion: "By deploying proactive containment measures in detected hotspots, high-infection rates dropped significantly during peak seasonal cycles.",
    category: "Medicine",
    cover_image: "https://images.unsplash.com/photo-1532187863486-abf9d39d66e8?auto=format&fit=crop&q=80&w=600",
    file_url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    citations: 57,
    downloads: 254,
    status: "approved",
    year: 2025,
    date_posted: "Feb 10, 2025",
    author_id: "author-103",
    created_at: "2025-02-10T08:30:00Z",
    updated_at: "2025-02-10T08:30:00Z"
  },
  {
    id: 104,
    title: "Fault-Tolerant Decentralized Ledgers for Rural Supply Chains",
    abstract: "We introduce a lightweight, latency-tolerant state replication consensus mechanism tailored specifically for tracking agricultural assets over intermittent rural networks.",
    introduction: "Rural logistics infrastructure suffers from frequent network splits. Legacy blockchain solutions fail due to extreme block finalization latency.",
    conclusion: "Our protocol allows active transactions to settle with high confidence even during partition periods, synchronizing status upon state merge.",
    category: "Computer Science",
    cover_image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=600",
    file_url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    citations: 21,
    downloads: 198,
    status: "approved",
    year: 2024,
    date_posted: "Aug 02, 2024",
    author_id: "author-104",
    created_at: "2024-08-02T15:45:00Z",
    updated_at: "2024-08-02T15:45:00Z"
  },
  {
    id: 105,
    title: "Socio-Economic Impacts of Micro-Credit Cooperatives in Rural Districts",
    abstract: "An empirical tracing study evaluating micro-credit access across central districts, modeling micro-economic outputs, wealth accumulation ratios, and community repayment behavior.",
    introduction: "Financial inclusion remains a core target for sustainable development. This study tracks peer-structured loan networks in rural districts.",
    conclusion: "The long-term assessment shows cooperatives with high self-organization metrics correlated directly with robust wealth resilience.",
    category: "Social Sciences",
    cover_image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=600",
    file_url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    citations: 89,
    downloads: 412,
    status: "approved",
    year: 2022,
    date_posted: "May 14, 2022",
    author_id: "author-105",
    created_at: "2022-05-14T09:12:00Z",
    updated_at: "2022-05-14T09:12:00Z"
  }
];

// Seed Collaborators
export const DEFAULT_COLLABORATORS = [];
