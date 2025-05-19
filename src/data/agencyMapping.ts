// Central mapping between complaint categories/subcategories and agencies in Rwanda
// This can be extended or edited as needed

// Central mapping between complaint categories/subcategories and government agencies in Rwanda
// Only government agencies (ministries, commissions, authorities, etc.) are included—no hospitals or similar entities.
// Multiple categories/subcategories can map to the same agency (overlap supported).

export const categoryToAgency: Record<string, string> = {
  // General Governance & Public Service
  'Governance': 'MINALOC',
  'Transparency': 'RGB',
  'Corruption': 'Office of the Ombudsman',
  'Public Service': 'PSC',
  'Security': 'RNP',
  'Defence': 'RDF',

  // Infrastructure, Transport & Urban Development
  'Roads': 'RTDA',
  'Transport': 'RTDA',
  'Utilities': 'RURA',
  'Infrastructure': 'MININFRA',
  'Urban': 'City of Kigali',
  'Environment': 'REMA',
  'District': 'Local District Offices',

  // Health & Social Protection
  'Health': 'MINISANTE',
  'Biomedical': 'RBC',
  'Social Security': 'RSSB',
  // (Removed: 'Insurance', 'Mutuelle de Santé', 'Hospital', 'CHUK', 'Military Hospital', 'Kanombe Military Hospital')

  // Education & Youth
  'Education': 'MINEDUC',
  'School': 'REB',
  'Higher Education': 'HEC',
  'Workforce': 'WDA',
  'Youth': 'NYC',

  // Utilities & Energy
  'Electricity': 'REG',
  'Water': 'WASAC',
  'Telecom': 'RURA',

  // ICT, Communication & Media
  'ICT': 'MINICT',
  'Information Society': 'RISA',
  'Broadcasting': 'RBA',

  // Justice & Legal Affairs
  'Justice': 'MINIJUST',
  'Court': 'Supreme Court of Rwanda',
  'Law Reform': 'Rwanda Law Reform Commission',
  'Legal Aid': 'MAJ',

  // Agriculture & Environment
  'Agriculture': 'MINAGRI',
  'Animal Resources': 'RAB',
  'Export': 'NAEB',

  // Finance, Business & Trade
  'Finance': 'MINECOFIN',
  'Revenue': 'RRA',
  'Banking': 'BNR',
  'Business': 'RDB',
  'Trade': 'MINICOM',
  'Industry': 'NIRDA',

  // Special Groups & Gender
  'Gender': 'MIGEPROF',
  'Disabilities': 'NCPD',
  'Early Childhood': 'NECDP'
};

// Export a sorted array of unique government agency names for use in UI filters (admin, etc.)
export const governmentAgencies: string[] = Array.from(new Set(Object.values(categoryToAgency))).sort();
