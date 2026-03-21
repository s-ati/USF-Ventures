/**
 * Tombstone display data for USF Ventures looping display.
 * Sections: USF Founders Now, USF Founders, USF Venture Partners, USF Venture Professionals
 *
 * Reads from public/data/companies.json (177 companies).
 * "USF Founders Now" = foundedDate >= 2023-01-01 (14 companies)
 * "USF Founders" = all 177 companies
 * "USF Venture Partners" / "USF Venture Professionals" = Coming Soon
 */

import companiesRaw from '../../public/data/companies.json'

function formatFunding(amount) {
  if (!amount || amount === 0) return null
  if (amount >= 1_000_000_000) return `$${(amount / 1_000_000_000).toFixed(1).replace(/\.0$/, '')}B`
  if (amount >= 1_000_000) return `$${(amount / 1_000_000).toFixed(1).replace(/\.0$/, '')}M`
  if (amount >= 1_000) return `$${(amount / 1_000).toFixed(0)}K`
  return `$${amount.toLocaleString()}`
}

function extractYear(dateStr) {
  if (!dateStr) return null
  const year = parseInt(dateStr.split('-')[0], 10)
  return isNaN(year) ? null : year
}

function primaryIndustry(industries) {
  if (!industries) return ''
  return industries.split(',')[0].trim()
}

function toEntry(company) {
  return {
    founder: (company.founders || '').trim(),
    company: company.name,
    photo: null,
    funding: formatFunding(company.totalFunding),
    location: company.location || '',
    year: extractYear(company.lastFundingDate),
    industry: primaryIndustry(company.industries),
    linkedIn: company.linkedin || '#',
    website: company.website || '#',
  }
}

const allEntries = companiesRaw.map(toEntry)
const foundersNowEntries = companiesRaw
  .filter((c) => c.foundedDate && c.foundedDate >= '2023-01-01')
  .map(toEntry)

const tombstoneData = {
  'USF Founders Now': {
    subtitle: 'Companies funded 2023 and beyond',
    entries: foundersNowEntries,
  },
  'USF Founders': {
    subtitle: 'All USF alumni founders',
    entries: allEntries,
  },
  'USF Venture Partners': {
    subtitle: 'Coming Soon',
    entries: [],
  },
  'USF Venture Professionals': {
    subtitle: 'Coming Soon',
    entries: [],
  },
}

export const sectionOrder = [
  'USF Founders Now',
  'USF Founders',
  'USF Venture Partners',
  'USF Venture Professionals',
]

export default tombstoneData
