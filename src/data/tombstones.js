/**
 * Tombstone display data for USF Ventures looping display.
 * Sections cycle sequentially: USF Founders Now → USF Founders (Historic) → USF Venture Professionals
 *
 * Reads from public/data/companies.json (177 companies).
 * "USF Founders Now" = foundedDate >= 2023-01-01
 * "USF Founders - (Historic)" = all companies
 * "USF Venture Professionals" = venture operators
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
  'Current Founders': {
    subtitle: 'Companies funded 2023 and beyond',
    entries: foundersNowEntries,
  },
  'Distinguished Founders': {
    subtitle: 'All USF alumni founders',
    entries: allEntries,
  },
  'Venture Leaders': {
    subtitle: 'Operators and advisors driving venture success',
    entries: [
      { founder: 'Monica Alvarez', company: 'Venture Analyst', photo: null, funding: null, location: 'Tampa, FL', year: null, industry: 'Venture Capital', linkedIn: '#', website: '#' },
      { founder: 'Kevin Tran', company: 'Portfolio Operations', photo: null, funding: null, location: 'Tampa, FL', year: null, industry: 'Operations', linkedIn: '#', website: '#' },
      { founder: 'Emily Watson', company: 'Due Diligence Lead', photo: null, funding: null, location: 'Tampa, FL', year: null, industry: 'Finance', linkedIn: '#', website: '#' },
      { founder: 'Marcus Johnson', company: 'Investment Associate', photo: null, funding: null, location: 'Tampa, FL', year: null, industry: 'Venture Capital', linkedIn: '#', website: '#' },
      { founder: 'Priya Sharma', company: 'Startup Relations', photo: null, funding: null, location: 'Tampa, FL', year: null, industry: 'Business Development', linkedIn: '#', website: '#' },
      { founder: 'Alex Rivera', company: 'Fund Operations Manager', photo: null, funding: null, location: 'Tampa, FL', year: null, industry: 'Operations', linkedIn: '#', website: '#' },
    ],
  },
}

export const sectionOrder = [
  'Current Founders',
  'Distinguished Founders',
  'Venture Leaders',
]

export default tombstoneData
