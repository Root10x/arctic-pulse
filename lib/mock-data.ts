"use client";

// ===================== SITES =====================
export const sites = [
  { id: "gl", name: "Greenland Review", url: "greenlandreview.gl", status: "active", contentCount: 142, lastPublish: "2024-05-28T09:30:00", health: 98, logo: "GL" },
  { id: "is", name: "Nordic Current", url: "nordiccurrent.is", status: "active", contentCount: 203, lastPublish: "2024-05-29T14:15:00", health: 96, logo: "NC" },
  { id: "dk", name: "Denmark Review", url: "denmarkreview.dk", status: "active", contentCount: 315, lastPublish: "2024-05-29T11:00:00", health: 99, logo: "DK" },
  { id: "no", name: "Norway Review", url: "norwayreview.no", status: "active", contentCount: 267, lastPublish: "2024-05-28T16:45:00", health: 97, logo: "NO" },
  { id: "se", name: "Sweden Review", url: "swedenreview.se", status: "active", contentCount: 289, lastPublish: "2024-05-29T08:20:00", health: 95, logo: "SE" },
  { id: "fi", name: "Finland Review", url: "finlandreview.fi", status: "maintenance", contentCount: 178, lastPublish: "2024-05-27T10:00:00", health: 82, logo: "FI" },
  { id: "fo", name: "Faroe Islands Review", url: "faroereview.fo", status: "active", contentCount: 94, lastPublish: "2024-05-26T13:30:00", health: 94, logo: "FO" },
];

// ===================== USERS =====================
export const users = [
  { id: "u1", name: "Erik Lindqvist", role: "Publisher", avatar: "EL", email: "erik@arcticpulse.com" },
  { id: "u2", name: "Sigrid Jonsdottir", role: "Editor", avatar: "SJ", email: "sigrid@arcticpulse.com" },
  { id: "u3", name: "Mikael Nilsen", role: "Editor", avatar: "MN", email: "mikael@arcticpulse.com" },
  { id: "u4", name: "Astrid Karlsen", role: "Contributor", avatar: "AK", email: "astrid@arcticpulse.com" },
  { id: "u5", name: "Lars Olsen", role: "Contributor", avatar: "LO", email: "lars@arcticpulse.com" },
  { id: "u6", name: "Ingrid Halvorsen", role: "Contributor", avatar: "IH", email: "ingrid@arcticpulse.com" },
];

// ===================== ARTICLE BODIES =====================
const articleBodies = [
  "The Arctic Council convenes this week in Tromsø to discuss new shipping regulations as ice melt opens northern passages. Delegates from all eight member states will review environmental protocols...",
  "Iceland's tourism board reports a 23% increase in visitor numbers this quarter, driven by new direct flights from North America and Asia. The surge presents both economic opportunity and infrastructure challenges...",
  "Greenland's new mineral extraction policy aims to balance economic development with environmental protection. The framework introduces stricter oversight for rare earth mining operations in sensitive regions...",
  "Denmark commits to a 40% reduction in carbon emissions from maritime shipping by 2030. The ambitious target will require retrofitting the nation's ferry fleet and investing in alternative fuel infrastructure...",
  "Norway's sovereign wealth fund announces divestment from fossil fuel exploration in the Barents Sea. The move signals a strategic shift toward renewable energy investments in the Nordic region...",
  "Swedish researchers publish findings on permafrost thaw rates in Lapland, revealing acceleration beyond previous models. The study has implications for infrastructure planning across northern Scandinavia...",
  "Finland's education export initiative launches new partnerships with Arctic universities, creating exchange programs focused on cold climate engineering and sustainable resource management...",
  "The Faroe Islands implement comprehensive fisheries monitoring using AI-assisted tracking, setting a new standard for sustainable Atlantic fishing practices and marine conservation...",
  "Svalbard's seed vault receives its 1.2 millionth seed deposit this month, representing agricultural diversity from 87 nations. The facility continues its mission as humanity's backup for global crop security...",
  "Aurora tourism operators in Tromsø adopt new light pollution guidelines to preserve the natural darkness essential for optimal northern lights viewing experiences...",
  "Copenhagen's new Arctic research center opens with focus on climate adaptation strategies for coastal communities facing rising sea levels and changing weather patterns...",
  "Greenlandic designers showcase sustainable fashion at Paris exhibition, using traditional sealskin techniques combined with modern ethical sourcing standards...",
  "The Nordic Council approves unified digital identity framework for cross-border services, simplifying access to healthcare and government functions for regional citizens...",
  "Reykjavik's geothermal district heating system expands to suburban developments, reducing household energy costs by an average of 30% while cutting carbon emissions...",
  "Saami parliament representatives convene in Inari to discuss language preservation initiatives and digital resource development for indigenous communities across Fennoscandia...",
  "Arctic shipping insurance rates fluctuate as new ice-class vessel regulations take effect. Underwriters adjust premiums based on real-time ice thickness data and route risk assessments...",
  "Stockholm's archipelago communities pilot autonomous electric ferry service, connecting remote islands with zero-emission transportation for residents and visitors...",
  "New archaeological discoveries in northern Norway reveal 8,000-year-old coastal settlements, reshaping understanding of early human migration patterns along the Atlantic rim...",
  "Finnish forestry sector adopts precision harvesting techniques using drone mapping and AI optimization, increasing yield efficiency while preserving biodiversity corridors...",
  "The Greenland ice sheet monitoring network upgrades sensor arrays, providing real-time meltwater flow data to international climate research institutions...",
];

const titles = [
  "Arctic Council Convenes in Tromsø for Shipping Safety Summit",
  "Iceland Tourism Surges 23% with New International Routes",
  "Greenland Unveils Strict Mineral Extraction Policy Framework",
  "Denmark Targets 40% Maritime Emission Cut by 2030",
  "Norway Wealth Fund Divests from Barents Sea Oil Exploration",
  "Swedish Study Reveals Accelerating Permafrost Thaw in Lapland",
  "Finland Launches Arctic University Exchange Network",
  "Faroe Islands Deploy AI Fisheries Monitoring System",
  "Svalbard Seed Vault Reaches 1.2 Million Deposit Milestone",
  "Tromsø Aurora Operators Adopt Light Pollution Standards",
  "Copenhagen Arctic Research Center Opens Climate Lab",
  "Greenlandic Sustainable Fashion Debuts in Paris",
  "Nordic Council Approves Cross-Border Digital Identity",
  "Reykjavik Expands Geothermal Heating to Suburbs",
  "Saami Parliament Convenes on Language Preservation",
  "Arctic Shipping Insurance Rates Adjust to New Regulations",
  "Stockholm Archipelago Tests Autonomous Electric Ferries",
  "Norway Archaeological Find Rewrites Coastal Settlement History",
  "Finnish Precision Forestry Boosts Yield and Biodiversity",
  "Greenland Ice Sheet Sensors Provide Real-Time Climate Data",
  "New Polar Research Vessel Launches from Oslo Shipyard",
  "Icelandic Salmon Farming Embraces Closed-Containment Systems",
  "Denmark Invests in North Sea Wind Farm Expansion",
  "Swedish Arctic Towns Adapt Infrastructure for Thawing Ground",
  "Finnish Lapland Prepares for Winter Tourism Season",
  "Faroe Islands Develop Offshore Wind Potential Assessment",
  "Greenlandic Youth Launch Traditional Kayak Revival Project",
  "Norwegian Fjords Implement Electric Cruise Ship Mandate",
  "Arctic Circle Assembly Draws Record Delegation to Reykjavik",
  "Nordic Food Lab Explores Fermentation in Cold Climates",
  "Svalbard Tourism Operators Limit Daily Visitor Caps",
  "Icelandic Volcano Monitoring System Predicts Eruption Patterns",
  "Danish Arctic Command Strengthens Search and Rescue Capabilities",
  "Swedish Sami Herders Document Changing Migration Routes",
  "Finnish Design House Creates Arctic-Inspired Furniture Collection",
  "Greenland Opens New International Airport in Nuuk",
  "Norwegian Coastal Express Adds Hybrid Electric Vessels",
  "Arctic Data Center in Iceland Achieves Carbon Negative Status",
  "Denmark Funds Indigenous Archaeological Survey in Greenland",
  "Swedish Icehotel Opens 35th Season with New Art Suites",
  "Finnish Meteorological Institute Releases Winter Forecast",
  "Faroe Islands Host International Seabird Research Conference",
  "Arctic Council Youth Forum Proposes Education Initiative",
  "Icelandic Film Industry Expands Studio Infrastructure",
  "Greenlandic Music Festival Attracts International Artists",
  "Norwegian Polar Institute Documents Ice Shelf Changes",
  "Danish Design Museum Opens Arctic Cultures Exhibition",
  "Swedish Lapland Railway Upgrades for Winter Reliability",
  "Finnish Health Researchers Study Cold Climate Wellness",
  "Svalbard Community Celebrates Longyearbyen Centennial",
];

const categories = ["Policy", "Tourism", "Environment", "Infrastructure", "Culture", "Science", "Economy", "Technology"];
const statuses = ["published", "scheduled", "pending_review", "needs_changes", "approved", "draft"] as const;

export type ArticleStatus = typeof statuses[number];

export interface ContentLifecycle {
  stage: "draft" | "research" | "review" | "approved" | "scheduled" | "published";
  progress: number; // 0-100
  history: { stage: string; timestamp: string; note: string }[];
}

function randomDate(start: Date, end: Date) {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

// Generate lifecycle for each article
function generateLifecycle(status: ArticleStatus, createdAt: Date): ContentLifecycle {
  const history: { stage: string; timestamp: string; note: string }[] = [];
  let progress = 0;
  let stage: ContentLifecycle["stage"] = "draft";

  const steps = [
    { stage: "draft", note: "Draft created" },
    { stage: "research", note: "Research sources gathered" },
    { stage: "review", note: "Sent to review queue" },
    { stage: "approved", note: "Editorial approved" },
    { stage: "scheduled", note: "Scheduled for publishing" },
    { stage: "published", note: "Published to site" },
  ];

  const statusMap: Record<ArticleStatus, number> = {
    draft: 1,
    pending_review: 3,
    needs_changes: 2,
    approved: 4,
    scheduled: 5,
    published: 6,
  };

  const targetStep = statusMap[status];

  for (let i = 0; i < targetStep; i++) {
    const ts = new Date(createdAt.getTime() + i * 3600000 + Math.random() * 1800000);
    history.push({
      stage: steps[i].stage,
      timestamp: ts.toISOString(),
      note: steps[i].note,
    });
  }

  progress = Math.round((targetStep / 6) * 100);
  stage = steps[targetStep - 1].stage as ContentLifecycle["stage"];

  return { stage, progress, history };
}

export const articles = Array.from({ length: 52 }, (_, i) => {
  const site = sites[i % sites.length];
  const status = statuses[Math.floor(Math.random() * statuses.length)];
  const author = users[Math.floor(Math.random() * users.length)];
  const cat = categories[Math.floor(Math.random() * categories.length)];
  const created = randomDate(new Date(2024, 3, 1), new Date(2024, 5, 30));
  const updated = new Date(created.getTime() + Math.random() * 7 * 24 * 60 * 60 * 1000);
  const scheduled = status === "scheduled" ? randomDate(new Date(2024, 5, 25), new Date(2024, 6, 15)) : null;

  return {
    id: `art-${i + 1}`,
    title: titles[i % titles.length],
    excerpt: articleBodies[i % articleBodies.length].slice(0, 180) + "...",
    body: articleBodies[i % articleBodies.length] + "\n\n" + articleBodies[(i + 1) % articleBodies.length] + "\n\n" + articleBodies[(i + 2) % articleBodies.length],
    siteId: site.id,
    siteName: site.name,
    status,
    author: author.name,
    authorId: author.id,
    category: cat,
    tags: [cat.toLowerCase(), site.id, "arctic", "nordic"],
    createdAt: created.toISOString(),
    updatedAt: updated.toISOString(),
    scheduledAt: scheduled?.toISOString() || null,
    featuredImage: `https://picsum.photos/seed/${i + 100}/800/500`,
    wordCount: 800 + Math.floor(Math.random() * 1200),
    views: status === "published" ? Math.floor(Math.random() * 15000) : 0,
    engagement: status === "published" ? Math.floor(Math.random() * 85) : 0,
    lifecycle: generateLifecycle(status, created),
  };
});

export const reviewQueueArticles = articles.filter(a => ["pending_review", "needs_changes", "approved"].includes(a.status));

// ===================== MEDIA =====================
export const mediaItems = Array.from({ length: 32 }, (_, i) => ({
  id: `med-${i + 1}`,
  url: `https://picsum.photos/seed/${i + 200}/400/300`,
  title: `Arctic Image ${i + 1}`,
  alt: `Arctic landscape and culture photograph ${i + 1}`,
  credit: ["Erik Lindqvist", "Sigrid Jonsdottir", "Mikael Nilsen", "Astrid Karlsen"][i % 4],
  siteId: sites[i % sites.length].id,
  siteName: sites[i % sites.length].name,
  uploadedAt: randomDate(new Date(2024, 2, 1), new Date(2024, 5, 30)).toISOString(),
  usageCount: Math.floor(Math.random() * 8),
  fileSize: `${(0.5 + Math.random() * 4).toFixed(1)} MB`,
  dimensions: ["1920x1080", "1600x900", "2048x1365", "1200x800"][i % 4],
  source: ["uploaded", "free-stock", "ai-generated"][i % 3] as const,
}));

// ===================== ACTIVITY FEED =====================
export const activityFeed = [
  { id: 1, type: "publish", message: "Article published to Nordic Current", user: "Erik Lindqvist", time: "2 minutes ago", article: "Iceland Tourism Surges 23% with New International Routes" },
  { id: 2, type: "draft", message: "Draft created for Greenland Review", user: "Astrid Karlsen", time: "15 minutes ago", article: "Greenland Unveils Strict Mineral Extraction Policy Framework" },
  { id: 3, type: "schedule", message: "Content scheduled on Norway Review", user: "Sigrid Jonsdottir", time: "32 minutes ago", article: "Norway Wealth Fund Divests from Barents Sea Oil Exploration" },
  { id: 4, type: "review", message: "Article approved for Denmark Review", user: "Mikael Nilsen", time: "1 hour ago", article: "Denmark Targets 40% Maritime Emission Cut by 2030" },
  { id: 5, type: "publish", message: "Article published to Sweden Review", user: "Erik Lindqvist", time: "2 hours ago", article: "Swedish Study Reveals Accelerating Permafrost Thaw in Lapland" },
  { id: 6, type: "draft", message: "Draft created for Finland Review", user: "Lars Olsen", time: "3 hours ago", article: "Finland Launches Arctic University Exchange Network" },
  { id: 7, type: "schedule", message: "Content scheduled on Faroe Islands Review", user: "Ingrid Halvorsen", time: "4 hours ago", article: "Faroe Islands Deploy AI Fisheries Monitoring System" },
  { id: 8, type: "review", message: "Changes requested for Greenland Review", user: "Sigrid Jonsdottir", time: "5 hours ago", article: "Svalbard Seed Vault Reaches 1.2 Million Deposit Milestone" },
  { id: 9, type: "publish", message: "Article published to Norway Review", user: "Erik Lindqvist", time: "6 hours ago", article: "Tromsø Aurora Operators Adopt Light Pollution Standards" },
  { id: 10, type: "draft", message: "Draft created for Nordic Current", user: "Astrid Karlsen", time: "8 hours ago", article: "Copenhagen Arctic Research Center Opens Climate Lab" },
  { id: 11, type: "schedule", message: "Content scheduled on Sweden Review", user: "Mikael Nilsen", time: "10 hours ago", article: "Saami Parliament Convenes on Language Preservation" },
  { id: 12, type: "review", message: "Article approved for Finland Review", user: "Sigrid Jonsdottir", time: "12 hours ago", article: "Arctic Shipping Insurance Rates Adjust to New Regulations" },
  { id: 13, type: "publish", message: "Article published to Denmark Review", user: "Erik Lindqvist", time: "14 hours ago", article: "Stockholm Archipelago Tests Autonomous Electric Ferries" },
  { id: 14, type: "draft", message: "Draft created for Norway Review", user: "Lars Olsen", time: "16 hours ago", article: "Norway Archaeological Find Rewrites Coastal Settlement History" },
  { id: 15, type: "schedule", message: "Content scheduled on Nordic Current", user: "Ingrid Halvorsen", time: "18 hours ago", article: "Finnish Precision Forestry Boosts Yield and Biodiversity" },
  { id: 16, type: "review", message: "Changes requested for Denmark Review", user: "Mikael Nilsen", time: "20 hours ago", article: "Greenland Ice Sheet Sensors Provide Real-Time Climate Data" },
  { id: 17, type: "publish", message: "Article published to Greenland Review", user: "Erik Lindqvist", time: "1 day ago", article: "New Polar Research Vessel Launches from Oslo Shipyard" },
  { id: 18, type: "draft", message: "Draft created for Faroe Islands Review", user: "Astrid Karlsen", time: "1 day ago", article: "Icelandic Salmon Farming Embraces Closed-Containment Systems" },
  { id: 19, type: "schedule", message: "Content scheduled on Sweden Review", user: "Sigrid Jonsdottir", time: "2 days ago", article: "Denmark Invests in North Sea Wind Farm Expansion" },
  { id: 20, type: "review", message: "Article approved for Nordic Current", user: "Mikael Nilsen", time: "2 days ago", article: "Swedish Arctic Towns Adapt Infrastructure for Thawing Ground" },
  { id: 21, type: "publish", message: "Article published to Finland Review", user: "Erik Lindqvist", time: "3 days ago", article: "Finnish Lapland Prepares for Winter Tourism Season" },
  { id: 22, type: "draft", message: "Draft created for Denmark Review", user: "Lars Olsen", time: "3 days ago", article: "Faroe Islands Develop Offshore Wind Potential Assessment" },
  { id: 23, type: "schedule", message: "Content scheduled on Norway Review", user: "Ingrid Halvorsen", time: "4 days ago", article: "Greenlandic Youth Launch Traditional Kayak Revival Project" },
  { id: 24, type: "review", message: "Changes requested for Sweden Review", user: "Sigrid Jonsdottir", time: "4 days ago", article: "Norwegian Fjords Implement Electric Cruise Ship Mandate" },
  { id: 25, type: "publish", message: "Article published to Faroe Islands Review", user: "Erik Lindqvist", time: "5 days ago", article: "Arctic Circle Assembly Draws Record Delegation to Reykjavik" },
];

// ===================== CALENDAR =====================
export const calendarEvents = Array.from({ length: 28 }, (_, i) => {
  const day = 3 + (i % 28);
  const site = sites[i % sites.length];
  const article = articles[i % articles.length];
  const hour = 9 + (i % 8);
  return {
    id: `cal-${i + 1}`,
    title: article.title,
    siteId: site.id,
    siteName: site.name,
    date: `2024-06-${String(day).padStart(2, "0")}`,
    time: `${String(hour).padStart(2, "0")}:00`,
    status: ["scheduled", "published", "draft"][i % 3] as const,
    articleId: article.id,
  };
});

// ===================== ANALYTICS =====================
export const analyticsData = Array.from({ length: 30 }, (_, i) => {
  const date = new Date(2024, 4, 1 + i);
  return {
    date: date.toISOString().split("T")[0],
    views: 2000 + Math.floor(Math.random() * 8000) + i * 150,
    published: Math.floor(Math.random() * 5) + 1,
    engagement: 45 + Math.floor(Math.random() * 35),
    uniqueVisitors: 1200 + Math.floor(Math.random() * 4000) + i * 100,
  };
});

export const topContent = articles
  .filter(a => a.status === "published")
  .sort(() => Math.random() - 0.5)
  .slice(0, 8)
  .map((a, i) => ({ ...a, rank: i + 1, views: 5000 + Math.floor(Math.random() * 20000) * (8 - i) / 8 }));

export const siteComparison = sites.map(s => ({
  ...s,
  monthlyViews: 15000 + Math.floor(Math.random() * 85000),
  monthlyArticles: Math.floor(Math.random() * 40) + 5,
  avgEngagement: 40 + Math.floor(Math.random() * 45),
  growth: -10 + Math.floor(Math.random() * 35),
}));

export const topCategories = categories.map((c, i) => ({
  name: c,
  count: 20 + Math.floor(Math.random() * 80),
  percentage: 10 + Math.floor(Math.random() * 30),
  trend: Math.floor(Math.random() * 40) - 10,
}));

export const notifications = [
  { id: 1, title: "Article needs review", message: "Greenland mineral policy article pending approval", time: "5 min ago", read: false, type: "review" },
  { id: 2, title: "Publishing failed", message: "Faroe Islands server timeout during scheduled publish", time: "1 hour ago", read: false, type: "error" },
  { id: 3, title: "Schedule conflict", message: "Two articles scheduled for Denmark Review at 10:00", time: "2 hours ago", read: true, type: "warning" },
  { id: 4, title: "New contributor", message: "Lars Olsen submitted 3 drafts for review", time: "3 hours ago", read: true, type: "info" },
  { id: 5, title: "Site health alert", message: "Finland Review response time above threshold", time: "5 hours ago", read: false, type: "warning" },
  { id: 6, title: "Media upload complete", message: "12 new images added to media library", time: "8 hours ago", read: true, type: "info" },
];

// ===================== RESEARCH MODULE =====================
export interface ResearchTopic {
  id: string;
  title: string;
  angle: string;
  contextSummary: string;
  suggestedSite: string;
  confidence: number;
  sourceCount: number;
  sources: string[];
  category: string;
  estimatedReadTime: string;
  relatedTrends: string[];
}

export const researchTopics: ResearchTopic[] = [
  {
    id: "rt1",
    title: "Arctic Council Shipping Regulations: New Safety Protocols for Northern Passages",
    angle: "Policy Analysis",
    contextSummary: "Recent Arctic Council meetings in Tromsø have produced draft regulations for ice-class vessel certification. Norway and Denmark are pushing for stricter standards while Russia prefers voluntary compliance.",
    suggestedSite: "Norway Review",
    confidence: 94,
    sourceCount: 12,
    sources: ["Arctic Council Press Release", "Norwegian Maritime Authority", "Barents Observer", "High North News", "Reuters Arctic", "Polar Journal"],
    category: "Policy",
    estimatedReadTime: "6 min",
    relatedTrends: ["Ice melt acceleration", "Northern Sea Route traffic", "Polar Code amendments"],
  },
  {
    id: "rt2",
    title: "Nordic Current: Can Infrastructure Keep Pace with 23% Visitor Growth?",
    angle: "Economic Impact",
    contextSummary: "Nordic Current's tourism board reports unprecedented growth driven by new direct flights from Asia and North America. Local municipalities report strain on infrastructure.",
    suggestedSite: "Nordic Current",
    confidence: 91,
    sourceCount: 9,
    sources: ["Nordic Current Tourism Board", "Reykjavik City Council", "Icelandair Press", "Lonely Planet Nordic", "Nordic Business Report"],
    category: "Tourism",
    estimatedReadTime: "5 min",
    relatedTrends: ["Overtourism in small nations", "Sustainable aviation fuel", "Geothermal hospitality"],
  },
  {
    id: "rt3",
    title: "Greenland Mineral Policy: The Rare Earth Dilemma",
    angle: "Environmental vs Economic",
    contextSummary: "Greenland's new mineral extraction framework introduces environmental bonds and community consent requirements. Chinese and Australian mining firms are lobbying for exemptions.",
    suggestedSite: "Greenland Review",
    confidence: 89,
    sourceCount: 15,
    sources: ["Greenland Government Portal", "Mineral Resources Authority", "Inuit Ataqatigiit Party", "Mining Technology", "Arctic Today", "BBC Arctic"],
    category: "Environment",
    estimatedReadTime: "7 min",
    relatedTrends: ["Rare earth supply chains", "EU raw materials strategy", "Indigenous land rights"],
  },
  {
    id: "rt4",
    title: "Denmark's 40% Maritime Emission Target: Feasibility Study",
    angle: "Infrastructure Deep Dive",
    contextSummary: "Denmark's ambitious maritime emission reduction plan requires retrofitting the entire ferry fleet. Analysis suggests 60% of ships need replacement by 2028.",
    suggestedSite: "Denmark Review",
    confidence: 87,
    sourceCount: 8,
    sources: ["Danish Maritime Authority", "Maersk Sustainability Report", "Copenhagen Port Authority", "EU Green Deal Briefing"],
    category: "Infrastructure",
    estimatedReadTime: "6 min",
    relatedTrends: ["Green methanol shipping", "EU ETS maritime", "Danish wind-ship hybrids"],
  },
  {
    id: "rt5",
    title: "Norway Wealth Fund Divests Barents Sea Oil: Strategic Shift Explained",
    angle: "Financial Analysis",
    contextSummary: "The world's largest sovereign wealth fund announced complete divestment from Barents Sea exploration licenses. The move affects 14 active licenses.",
    suggestedSite: "Norway Review",
    confidence: 92,
    sourceCount: 11,
    sources: ["Norges Bank Investment Management", "Norwegian Oil & Gas Association", "Financial Times Nordic", "Bloomberg Green", "Arctic Economic Council"],
    category: "Economy",
    estimatedReadTime: "5 min",
    relatedTrends: ["Sovereign wealth fund ESG", "Arctic oil endgame", "North Sea wind investment"],
  },
  {
    id: "rt6",
    title: "Swedish Permafrost Study: Infrastructure at Risk in Lapland",
    angle: "Science Communication",
    contextSummary: "New research from Luleå University reveals permafrost thaw rates 40% faster than IPCC models predicted. The findings threaten 340km of roads and 12 bridges.",
    suggestedSite: "Sweden Review",
    confidence: 88,
    sourceCount: 7,
    sources: ["Luleå University Research", "Swedish Transport Administration", "Nature Geoscience", "SVT Nyheter Norrbotten"],
    category: "Science",
    estimatedReadTime: "6 min",
    relatedTrends: ["Permafrost carbon feedback", "Arctic infrastructure resilience", "Climate adaptation funding"],
  },
  {
    id: "rt7",
    title: "Finnish Arctic University Network: A New Knowledge Hub",
    angle: "Education Policy",
    contextSummary: "Finland's new Arctic university exchange program connects 14 institutions across the Nordics. Initial enrollment exceeds projections by 200%.",
    suggestedSite: "Finland Review",
    confidence: 85,
    sourceCount: 6,
    sources: ["University of Lapland", "Ministry of Education Finland", "NordForsk", "Arctic Council SDWG"],
    category: "Culture",
    estimatedReadTime: "4 min",
    relatedTrends: ["Arctic knowledge economy", "Indigenous education", "Nordic academic cooperation"],
  },
  {
    id: "rt8",
    title: "Faroe Islands AI Fisheries Monitoring: Setting the Atlantic Standard",
    angle: "Technology Innovation",
    contextSummary: "The Faroe Islands deployed an AI-assisted fisheries tracking system using satellite AIS and underwater acoustic sensors. Early results show 30% reduction in bycatch.",
    suggestedSite: "Faroe Islands Review",
    confidence: 90,
    sourceCount: 10,
    sources: ["Faroe Islands Fisheries Ministry", "Marine Research Institute", "NTS ASA", "FishPool", "Arctic Innovation Hub"],
    category: "Technology",
    estimatedReadTime: "5 min",
    relatedTrends: ["AI in marine conservation", "Sustainable fisheries tech", "North Atlantic cooperation"],
  },
];

export const monitoredSources = [
  { id: "ms1", name: "Arctic Council Official", type: "feed", status: "active", lastScan: "2 min ago", articlesFound: 142 },
  { id: "ms2", name: "Barents Observer", type: "feed", status: "active", lastScan: "5 min ago", articlesFound: 89 },
  { id: "ms3", name: "High North News", type: "feed", status: "active", lastScan: "8 min ago", articlesFound: 67 },
  { id: "ms4", name: "Reuters Arctic", type: "feed", status: "active", lastScan: "12 min ago", articlesFound: 54 },
  { id: "ms5", name: "Arctic Today", type: "feed", status: "active", lastScan: "15 min ago", articlesFound: 43 },
  { id: "ms6", name: "Nordic Council RSS", type: "feed", status: "active", lastScan: "18 min ago", articlesFound: 38 },
  { id: "ms7", name: "Greenland Government Portal", type: "site", status: "active", lastScan: "22 min ago", articlesFound: 31 },
  { id: "ms8", name: "Norwegian Polar Institute", type: "site", status: "active", lastScan: "25 min ago", articlesFound: 29 },
  { id: "ms9", name: "Nordic Current Tourism Board", type: "site", status: "active", lastScan: "30 min ago", articlesFound: 24 },
  { id: "ms10", name: "EU Arctic Policy Feed", type: "feed", status: "maintenance", lastScan: "1 hour ago", articlesFound: 18 },
];

// ===================== AI / STOCK IMAGES =====================
export const aiGeneratedImages = Array.from({ length: 16 }, (_, i) => ({
  id: `ai-img-${i + 1}`,
  url: `https://picsum.photos/seed/aigen${i + 300}/800/500`,
  thumbnail: `https://picsum.photos/seed/aigen${i + 300}/400/300`,
  prompt: [
    "A majestic icebreaker ship navigating through frozen Arctic waters at golden hour, editorial photography style, cinematic lighting",
    "Northern lights aurora borealis dancing over a snow-covered Norwegian fjord, long exposure, vivid green and purple colors",
    "Traditional Greenlandic fishing village with colorful houses against dramatic glacial backdrop, documentary style",
    "Close-up of reindeer herd migrating across vast Finnish Lapland tundra, misty morning atmosphere",
    "Modern sustainable wind turbines on Danish coastal cliffs at sunset, clean energy editorial",
    "Icelandic geothermal hot springs with steam rising at dawn, ethereal landscape photography",
    "Swedish Sami herder with traditional lavvu tent under starry Arctic sky, cultural documentary",
    "Faroe Islands dramatic sea cliffs with puffins nesting, stormy Atlantic ocean background",
    "Arctic research station with scientists in extreme cold weather gear, professional photojournalism",
    "Crystal clear ice cave interior with blue light filtering through glacier, wide angle",
    "Copenhagen harbor with modern architecture and historic warehouses, urban Nordic editorial",
    "Humpback whale breaching in Norwegian Arctic waters, wildlife photography, spray frozen in air",
    "Finnish sauna by frozen lake with smoke rising from chimney, authentic Nordic lifestyle",
    "Greenlandic children playing near icebergs in summer midnight sun, candid documentary",
    "Denmark's Møns Klint white chalk cliffs with Baltic Sea, dramatic coastal landscape",
    "Arctic fox in white winter coat camouflaged against snow, close-up wildlife portrait"
  ][i],
  articleTopic: [
    "Arctic Council Shipping Regulations",
    "Aurora Tourism in Norway",
    "Greenland Village Life",
    "Lapland Reindeer Migration",
    "Danish Wind Energy",
    "Iceland Geothermal",
    "Sami Culture Sweden",
    "Faroe Islands Wildlife",
    "Arctic Research",
    "Glacier Exploration",
    "Copenhagen Urban Development",
    "Arctic Marine Life",
    "Finnish Wellness Culture",
    "Greenland Youth",
    "Danish Coastal Conservation",
    "Arctic Wildlife Adaptation"
  ][i],
  source: "ai-generated" as const,
  createdAt: new Date(2024, 4, 1 + i * 2).toISOString(),
}));

export const freeStockImages = Array.from({ length: 20 }, (_, i) => ({
  id: `stock-${i + 1}`,
  url: `https://picsum.photos/seed/stock${i + 400}/800/500`,
  thumbnail: `https://picsum.photos/seed/stock${i + 400}/400/300`,
  title: [
    "Arctic landscape aerial view",
    "Nordic city skyline winter",
    "Traditional wooden church Norway",
    "Glacier calving event",
    "Snowmobile expedition Greenland",
    "Icelandic horse in snow",
    "Northern fishing harbor dawn",
    "Arctic tundra panoramic",
    "Ice hotel interior Sweden",
    "Danish bicycle culture",
    "Finnish forest winter path",
    "Faroe sheep on cliff edge",
    "Sami handicraft detail",
    "Arctic research drone",
    "Greenlandic kayak tradition",
    "Nordic design interior",
    "Polar bear distant shot",
    "Arctic shipping container port",
    "Icelandic waterfall long exposure",
    "Denmark wind farm aerial"
  ][i],
  credit: ["Unsplash", "Pexels", "Pixabay", "Unsplash", "Pexels"][i % 5],
  source: "free-stock" as const,
  tags: ["arctic", "nordic", "landscape", "editorial"],
}));

// ===================== RESEARCH SOURCES =====================
export const researchSources = [
  {
    id: "rs-1",
    type: "url" as const,
    title: "Arctic Council Shipping Safety Report 2024",
    url: "https://arctic-council.org/shipping-report-2024",
    siteName: "Arctic Council",
    dateAdded: "2024-05-28T10:00:00",
    status: "parsed",
    topicsExtracted: 4,
    summary: "Comprehensive review of new Polar Code amendments, ice-class certification requirements, and environmental protection protocols for increased Arctic shipping traffic.",
  },
  {
    id: "rs-2",
    type: "text" as const,
    title: "Greenland Mineral Policy Brief",
    url: null,
    siteName: "Internal Brief",
    dateAdded: "2024-05-27T14:30:00",
    status: "parsed",
    topicsExtracted: 3,
    summary: "Analysis of Greenland's new mineral extraction framework balancing economic development with environmental protection in sensitive Arctic regions.",
  },
  {
    id: "rs-3",
    type: "csv" as const,
    title: "Nordic Tourism Statistics Q2 2024",
    url: null,
    siteName: "Nordic Council",
    dateAdded: "2024-05-26T09:15:00",
    status: "parsed",
    topicsExtracted: 6,
    summary: "Quarterly tourism data across Denmark, Norway, Sweden, Finland, Nordic Current showing 23% increase in Arctic region visitors with infrastructure strain analysis.",
  },
  {
    id: "rs-4",
    type: "url" as const,
    title: "Svalbard Seed Vault Annual Report",
    url: "https://croptrust.org/svalbard-annual-2024",
    siteName: "Crop Trust",
    dateAdded: "2024-05-25T11:00:00",
    status: "parsed",
    topicsExtracted: 2,
    summary: "Annual deposit statistics reaching 1.2 million seed samples from 87 nations with new climate adaptation research partnerships.",
  },
  {
    id: "rs-5",
    type: "url" as const,
    title: "Norwegian Sovereign Wealth Fund Divestment Strategy",
    url: "https://nbim.no/divestment-barents-2024",
    siteName: "Norges Bank",
    dateAdded: "2024-05-24T08:45:00",
    status: "parsed",
    topicsExtracted: 3,
    summary: "Strategic shift from fossil fuel exploration to renewable energy investments in Nordic region with timeline and financial impact projections.",
  },
  {
    id: "rs-6",
    type: "text" as const,
    title: "Faroe Islands Fisheries Monitoring Whitepaper",
    url: null,
    siteName: "Faroe Marine Institute",
    dateAdded: "2024-05-23T16:20:00",
    status: "parsed",
    topicsExtracted: 5,
    summary: "Technical overview of AI-assisted fisheries tracking system implementation and sustainable Atlantic fishing practice standards.",
  },
];

export const monitoredArticles = [
  {
    id: "mon-1",
    title: "Arctic Shipping Routes Open Earlier Than Predicted",
    source: "Maritime Executive",
    url: "https://maritime-executive.com/arctic-routes-2024",
    lastChecked: "2024-05-30T08:00:00",
    changeDetected: true,
    changeType: "major_update",
    summary: "New satellite data shows Northwest Passage navigable 3 weeks earlier than 2023 baseline. Russian Northern Sea Route traffic up 40%.",
    topics: ["shipping", "climate", "trade_routes"],
  },
  {
    id: "mon-2",
    title: "Nordic Current Volcanic Activity Threatens Airport Operations",
    source: "Nordic Current",
    url: "https://nordiccurrent.com/volcano-2024",
    lastChecked: "2024-05-29T22:00:00",
    changeDetected: true,
    changeType: "new_development",
    summary: "Reykjanes Peninsula eruption enters week 3. Keflavik airport operating at 60% capacity. Alternative ferry routes to Europe being discussed.",
    topics: ["tourism", "infrastructure", "emergency"],
  },
  {
    id: "mon-3",
    title: "Swedish Sami Parliament Secures New Grazing Rights",
    source: "Sveriges Radio",
    url: "https://sverigesradio.se/sami-grazing-2024",
    lastChecked: "2024-05-29T14:00:00",
    changeDetected: false,
    changeType: null,
    summary: "Supreme Court ruling upholds traditional migration routes. Mining companies must consult herders before new extraction permits.",
    topics: ["indigenous_rights", "policy", "mining"],
  },
  {
    id: "mon-4",
    title: "Denmark Announces North Sea Wind Farm Expansion",
    source: "Politiken",
    url: "https://politiken.dk/wind-expansion-2024",
    lastChecked: "2024-05-28T10:30:00",
    changeDetected: true,
    changeType: "new_development",
    summary: "€4.2B investment in 3 new offshore wind parks. Combined capacity to power 2.5M homes. Construction begins Q3 2024.",
    topics: ["energy", "infrastructure", "climate"],
  },
  {
    id: "mon-5",
    title: "Finnish Education Export Reaches Arctic Universities",
    source: "Helsinki Times",
    url: "https://helsinkitimes.fi/education-arctic-2024",
    lastChecked: "2024-05-27T09:00:00",
    changeDetected: false,
    changeType: null,
    summary: "New exchange programs with Tromsø, Reykjavik, and Nuuk universities focused on cold climate engineering and sustainable resource management.",
    topics: ["education", "arctic", "partnerships"],
  },
  {
    id: "mon-6",
    title: "Greenland Ice Sheet Melt Accelerates Beyond Models",
    source: "Nature Climate Change",
    url: "https://nature.com/greenland-melt-2024",
    lastChecked: "2024-05-26T12:00:00",
    changeDetected: true,
    changeType: "major_update",
    summary: "Updated sensor network reveals meltwater discharge 15% higher than IPCC projections. Implications for global sea level rise recalculated.",
    topics: ["climate", "science", "sea_level"],
  },
  {
    id: "mon-7",
    title: "Arctic Circle Assembly Registration Opens",
    source: "Arctic Circle",
    url: "https://arcticcircle.org/assembly-2024",
    lastChecked: "2024-05-25T15:00:00",
    changeDetected: false,
    changeType: null,
    summary: "Record delegation expected in Reykjavik this October. Youth forum expanded to 500 participants. New corporate partnership tier introduced.",
    topics: ["diplomacy", "youth", "business"],
  },
  {
    id: "mon-8",
    title: "Faroe Islands Seabird Population Decline Study",
    source: "Faroe Review",
    url: "https://faroereview.fo/seabirds-2024",
    lastChecked: "2024-05-24T11:00:00",
    changeDetected: true,
    changeType: "new_development",
    summary: "Puffin populations down 12% year-over-year. Researchers link decline to warming Atlantic feeding grounds. Conservation measures proposed.",
    topics: ["wildlife", "climate", "conservation"],
  },
];

export const generatedTopics = [
  {
    id: "gt-1",
    title: "New Polar Code Amendments: What Arctic Shipping Operators Must Know for 2025",
    sourceIds: ["rs-1"],
    monitorIds: ["mon-1"],
    confidence: 92,
    category: "Policy",
    angle: "regulatory",
    suggestedSite: "Norway Review",
    wordCountEstimate: 1200,
    urgency: "high",
    excerpt: "With the Arctic Council's new shipping safety summit concluding in Tromsø, operators face updated ice-class certification requirements and mandatory satellite tracking protocols.",
    keywords: ["Polar Code", "ice-class certification", "Arctic shipping", "satellite tracking", "Northern Sea Route"],
    relatedImages: ["ai-img-1", "stock-18"],
  },
  {
    id: "gt-2",
    title: "Greenland's Mineral Dilemma: Economic Opportunity vs. Environmental Protection",
    sourceIds: ["rs-2"],
    monitorIds: [],
    confidence: 88,
    category: "Environment",
    angle: "analysis",
    suggestedSite: "Greenland Review",
    wordCountEstimate: 1500,
    urgency: "medium",
    excerpt: "Greenland's new mineral extraction policy introduces strict oversight for rare earth mining in sensitive regions. We examine the balance between economic sovereignty and environmental stewardship.",
    keywords: ["rare earth mining", "mineral extraction", "Greenland policy", "environmental protection", "economic development"],
    relatedImages: ["ai-img-3", "stock-5"],
  },
  {
    id: "gt-3",
    title: "Nordic Current Tourism Boom: Can Infrastructure Keep Pace with 23% Visitor Surge?",
    sourceIds: ["rs-3"],
    monitorIds: ["mon-2"],
    confidence: 95,
    category: "Tourism",
    angle: "investigative",
    suggestedSite: "Nordic Current",
    wordCountEstimate: 1800,
    urgency: "high",
    excerpt: "New direct flights from North America and Asia have driven unprecedented visitor numbers. But with Reykjavik hotels at 94% capacity, is the infrastructure approaching a breaking point?",
    keywords: ["Nordic Current tourism", "infrastructure strain", "Keflavik airport", "volcanic disruption", "visitor capacity"],
    relatedImages: ["ai-img-2", "stock-7"],
  },
  {
    id: "gt-4",
    title: "Denmark's €4.2B Wind Gamble: Betting the North Sea on Renewable Dominance",
    sourceIds: [],
    monitorIds: ["mon-4"],
    confidence: 90,
    category: "Infrastructure",
    angle: "feature",
    suggestedSite: "Denmark Review",
    wordCountEstimate: 1400,
    urgency: "medium",
    excerpt: "Three new offshore wind parks will add capacity for 2.5 million homes. We analyze the engineering challenges and what this means for Denmark's 2030 carbon neutrality pledge.",
    keywords: ["offshore wind", "North Sea energy", "carbon neutrality", "renewable infrastructure", "Danish energy policy"],
    relatedImages: ["ai-img-5", "stock-20"],
  },
  {
    id: "gt-5",
    title: "Svalbard Seed Vault at 1.2 Million: The World's Agricultural Insurance Policy",
    sourceIds: ["rs-4"],
    monitorIds: [],
    confidence: 85,
    category: "Science",
    angle: "human_interest",
    suggestedSite: "Norway Review",
    wordCountEstimate: 1100,
    urgency: "low",
    excerpt: "As the seed vault accepts its 1.2 millionth deposit from 87 nations, we explore the facility's role as humanity's backup plan.",
    keywords: ["seed vault", "crop diversity", "food security", "Svalbard", "agricultural research"],
    relatedImages: ["ai-img-9", "stock-14"],
  },
  {
    id: "gt-6",
    title: "Arctic Fox, Changing Coats: Wildlife Adapting to Unpredictable Winters",
    sourceIds: [],
    monitorIds: ["mon-8"],
    confidence: 78,
    category: "Environment",
    angle: "photo_essay",
    suggestedSite: "Faroe Islands Review",
    wordCountEstimate: 900,
    urgency: "medium",
    excerpt: "Warmer winters are disrupting the Arctic fox's seasonal camouflage. Combined with shifting seabird populations in the Faroes, the Arctic food web is undergoing rapid transformation.",
    keywords: ["Arctic fox", "wildlife adaptation", "seabird decline", "climate change", "Faroe Islands"],
    relatedImages: ["ai-img-16", "stock-17"],
  },
  {
    id: "gt-7",
    title: "Sami Grazing Rights Victory: How Sweden's Supreme Court Ruling Reshapes Arctic Mining",
    sourceIds: [],
    monitorIds: ["mon-3"],
    confidence: 91,
    category: "Policy",
    angle: "legal_analysis",
    suggestedSite: "Sweden Review",
    wordCountEstimate: 1300,
    urgency: "high",
    excerpt: "The Supreme Court's upholding of traditional Sami migration routes creates a new precedent for indigenous consultation. Mining companies must now navigate both geological surveys and cultural heritage assessments.",
    keywords: ["Sami rights", "indigenous consultation", "mining permits", "grazing routes", "Supreme Court"],
    relatedImages: ["ai-img-7", "stock-13"],
  },
  {
    id: "gt-8",
    title: "Greenland Ice Sheet Sensors: Real-Time Data Is Changing Climate Predictions",
    sourceIds: [],
    monitorIds: ["mon-6"],
    confidence: 94,
    category: "Science",
    angle: "breaking",
    suggestedSite: "Greenland Review",
    wordCountEstimate: 1600,
    urgency: "high",
    excerpt: "Updated sensor arrays reveal meltwater discharge 15% above IPCC models. We speak with the glaciologists deploying drone-mounted radar and the coastal communities recalculating sea-level adaptation plans.",
    keywords: ["ice sheet melt", "climate models", "glacier sensors", "sea level rise", "Greenland research"],
    relatedImages: ["ai-img-10", "stock-4"],
  },
  {
    id: "gt-9",
    title: "From Classroom to Tundra: Finnish Education Exports Reach Arctic Universities",
    sourceIds: ["rs-3"],
    monitorIds: ["mon-5"],
    confidence: 82,
    category: "Education",
    angle: "profile",
    suggestedSite: "Finland Review",
    wordCountEstimate: 1000,
    urgency: "low",
    excerpt: "New exchange programs with Tromsø, Reykjavik and Nuuk focus on cold climate engineering. Finnish pedagogical methods meet Arctic survival skills in a unique academic partnership.",
    keywords: ["education export", "Arctic universities", "cold climate engineering", "Finnish pedagogy", "academic exchange"],
    relatedImages: ["ai-img-12", "stock-11"],
  },
  {
    id: "gt-10",
    title: "Arctic Circle Assembly 2024: Why Record Corporate Presence Signals a Policy Shift",
    sourceIds: [],
    monitorIds: ["mon-7"],
    confidence: 87,
    category: "Diplomacy",
    angle: "analysis",
    suggestedSite: "Nordic Current",
    wordCountEstimate: 1200,
    urgency: "medium",
    excerpt: "With expanded youth forums and new corporate partnership tiers, this year's Reykjavik assembly reflects the Arctic's transition from scientific preserve to economic frontier.",
    keywords: ["Arctic Circle Assembly", "corporate Arctic", "youth forum", "Reykjavik diplomacy", "economic frontier"],
    relatedImages: ["ai-img-11", "stock-2"],
  },
];

// ===================== API CONFIGURATIONS =====================
export interface ApiConfig {
  id: string;
  name: string;
  provider: string;
  description: string;
  status: "connected" | "disconnected" | "error" | "pending";
  lastConnected?: string;
  apiKey?: string;
  endpoint?: string;
  features: string[];
  icon: string;
}

export const apiConfigs: ApiConfig[] = [
  {
    id: "ai-drafts",
    name: "Draft Assistant",
    provider: "OpenAI",
    description: "Powers content generation, tone analysis, and editorial suggestions",
    status: "connected",
    lastConnected: "2024-05-30T10:00:00",
    features: ["Draft generation", "Tone analysis", "Title suggestions", "Summarization"],
    icon: "brain",
  },
  {
    id: "ai-images",
    name: "Visual Assistant",
    provider: "Midjourney",
    description: "Generates custom featured images and visual assets for articles",
    status: "connected",
    lastConnected: "2024-05-29T14:30:00",
    features: ["Image generation", "Style matching", "Prompt optimization"],
    icon: "image",
  },
  {
    id: "ga4",
    name: "Google Analytics 4",
    provider: "Google",
    description: "Traffic data, engagement metrics, and audience insights from all connected sites",
    status: "disconnected",
    features: ["Page views", "Engagement rate", "Audience demographics", "Traffic sources"],
    icon: "bar-chart",
  },
  {
    id: "wordpress",
    name: "WordPress REST API",
    provider: "WordPress",
    description: "Publishing, media uploads, and content management for all connected WordPress sites",
    status: "connected",
    lastConnected: "2024-05-30T08:15:00",
    features: ["Publish articles", "Upload media", "Manage categories", "User sync"],
    icon: "globe",
  },
  {
    id: "search-console",
    name: "Google Search Console",
    provider: "Google",
    description: "Search performance, indexing status, and keyword rankings",
    status: "disconnected",
    features: ["Search queries", "Click-through rate", "Indexing status", "Core Web Vitals"],
    icon: "search",
  },
  {
    id: "slack",
    name: "Slack Notifications",
    provider: "Slack",
    description: "Team alerts for publishing events, review requests, and site health issues",
    status: "disconnected",
    features: ["Publishing alerts", "Review notifications", "Health alerts"],
    icon: "message-square",
  },
  {
    id: "unsplash",
    name: "Unsplash",
    provider: "Unsplash",
    description: "Free stock photo library for article featured images",
    status: "connected",
    lastConnected: "2024-05-28T11:00:00",
    features: ["Stock photo search", "Auto-attribution", "High-resolution downloads"],
    icon: "camera",
  },
  {
    id: "pexels",
    name: "Pexels",
    provider: "Pexels",
    description: "Additional free stock photo and video source",
    status: "disconnected",
    features: ["Stock photos", "Stock videos", "Auto-attribution"],
    icon: "video",
  },
];

// ===================== LIFECYCLE STAGE DEFINITIONS =====================
export const lifecycleStages = [
  { key: "draft", label: "Draft", description: "Content created and saved", icon: "file-text", color: "#64748b" },
  { key: "research", label: "Research", description: "Sources gathered and analyzed", icon: "search", color: "#6366f1" },
  { key: "review", label: "Review", description: "Editorial review in progress", icon: "clipboard-check", color: "#f59e0b" },
  { key: "approved", label: "Approved", description: "Ready for publishing", icon: "check-circle", color: "#10b981" },
  { key: "scheduled", label: "Scheduled", description: "Queued for automatic publishing", icon: "calendar", color: "#38bdf8" },
  { key: "published", label: "Published", description: "Live on site", icon: "globe", color: "#0f172a" },
];
