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
    subtitle: 'Industry mentors guiding the next generation',
    entries: [
      { founder: 'Sarah Mitchell', company: 'VP, Growth Equity', photo: null, funding: null, location: 'San Francisco, CA', year: null, industry: 'Venture Capital', linkedIn: '#', website: '#' },
      { founder: 'David Chen', company: 'Managing Director, Tech Fund', photo: null, funding: null, location: 'New York, NY', year: null, industry: 'Venture Capital', linkedIn: '#', website: '#' },
      { founder: 'Rachel Torres', company: 'Partner, Innovation Capital', photo: null, funding: null, location: 'Tampa, FL', year: null, industry: 'Venture Capital', linkedIn: '#', website: '#' },
      { founder: 'James Okafor', company: 'Senior Partner, Horizon VC', photo: null, funding: null, location: 'Miami, FL', year: null, industry: 'Venture Capital', linkedIn: '#', website: '#' },
      { founder: 'Amanda Liu', company: 'GP, Catalyst Ventures', photo: null, funding: null, location: 'Austin, TX', year: null, industry: 'Venture Capital', linkedIn: '#', website: '#' },
      { founder: 'Brian Kessler', company: 'Principal, SeedStage Fund', photo: null, funding: null, location: 'Boston, MA', year: null, industry: 'Venture Capital', linkedIn: '#', website: '#' },
    ],
  },
  'USF Venture Professionals': {
    subtitle: 'Operators and advisors driving venture success',
    entries: [
      { founder: 'Charles de C. du Mée', company: 'Accelerated Venture Partners', title: 'Partner', photo: null, funding: null, location: '', linkedIn: '#', website: '#' },
      { founder: 'Mariia Eroshin', company: 'Certuity', title: 'Partner', photo: null, funding: null, location: '', linkedIn: '#', website: '#' },
      { founder: 'Richard Wallace Baker, Jr.', company: 'Stifel Nicolaus', title: 'Managing Director', photo: null, funding: null, location: '', linkedIn: '#', website: '#' },
      { founder: 'Gus Laredo', company: 'Condor Equity Partners', title: 'Managing Partner', photo: null, funding: null, location: '', linkedIn: '#', website: '#' },
      { founder: 'Thomas Rose', company: 'Rock Lake', title: 'Strategic Advisor', photo: null, funding: null, location: '', linkedIn: '#', website: '#' },
      { founder: 'Suzanne Passalacqua', company: 'Carrick Capital Partners', title: 'Managing Director', photo: null, funding: null, location: '', linkedIn: '#', website: '#' },
      { founder: 'Maximillian Diez', company: '25 Ventures', title: 'General Partner', photo: null, funding: null, location: '', linkedIn: '#', website: '#' },
      { founder: 'Andrew Karsh', company: 'Bay Bridge Ventures', title: 'General Partner', photo: null, funding: null, location: '', linkedIn: '#', website: '#' },
      { founder: 'Alfred Chuang', company: 'Race Capital', title: 'General Partner', photo: null, funding: null, location: '', linkedIn: '#', website: '#' },
      { founder: 'Ni Yan', company: 'Amador Capital', title: 'Partner', photo: null, funding: null, location: '', linkedIn: '#', website: '#' },
      { founder: 'Fay Yang', company: 'ZenStone Venture Capital', title: 'Managing Director', photo: null, funding: null, location: '', linkedIn: '#', website: '#' },
      { founder: 'Saydeah Howard', company: 'Cherryrock Capital', title: 'Managing Partner', photo: null, funding: null, location: '', linkedIn: '#', website: '#' },
      { founder: 'Mike Ryan', company: 'MRG Capital', title: 'Managing Partner', photo: null, funding: null, location: '', linkedIn: '#', website: '#' },
      { founder: 'Michael Fordyce', company: 'Angel Investor', title: 'Independent', photo: null, funding: null, location: '', linkedIn: '#', website: '#' },
      { founder: 'Ozan Isinak', company: 'Trendwell Ventures', title: 'Partner', photo: null, funding: null, location: '', linkedIn: '#', website: '#' },
      { founder: 'Nora AlKadi', company: 'SNB Capital', title: 'Head of Venture Capital', photo: null, funding: null, location: '', linkedIn: '#', website: '#' },
      { founder: 'Morgan Berman', company: 'Alloy Capitals', title: 'Senior Vice President of Partnerships', photo: null, funding: null, location: '', linkedIn: '#', website: '#' },
      { founder: 'Fabrizio Natale', company: 'Washington State Investment Board', title: 'Global Head of Private Equity', photo: null, funding: null, location: '', linkedIn: '#', website: '#' },
      { founder: 'Alexander Fries', company: 'Ecosystem Ventures', title: 'Partner', photo: null, funding: null, location: '', linkedIn: '#', website: '#' },
      { founder: 'Eugene Malobrodsky', company: 'One Way Ventures', title: 'Managing Partner', photo: null, funding: null, location: '', linkedIn: '#', website: '#' },
      { founder: 'Kurt Keilhacker', company: 'Elementum Ventures', title: 'General Partner', photo: null, funding: null, location: '', linkedIn: '#', website: '#' },
      { founder: 'Shomit Ghose', company: 'Clearvison Ventures', title: 'Partner', photo: null, funding: null, location: '', linkedIn: '#', website: '#' },
      { founder: 'Tripp Doll', company: 'Untapped Venture', title: 'Associate', photo: null, funding: null, location: '', linkedIn: '#', website: '#' },
      { founder: 'Carlos Baradello', company: 'Alaya Capital', title: 'Co-Founder General Partner', photo: null, funding: null, location: '', linkedIn: '#', website: '#' },
      { founder: 'SooMan Wolffs', company: 'Manhatten Ventures Partner', title: 'General Partner', photo: null, funding: null, location: '', linkedIn: '#', website: '#' },
      { founder: 'Kevin Zeidan', company: 'Trinity Capital', title: 'Managing Director', photo: null, funding: null, location: '', linkedIn: '#', website: '#' },
      { founder: 'Gabor Szecsi', company: 'Asia Alternatives', title: 'Venture Legal Counsel', photo: null, funding: null, location: '', linkedIn: '#', website: '#' },
      { founder: 'Nick Dane', company: 'Lucas Venture Group & Race Capital', title: 'Partner & Head of Capital Formation', photo: null, funding: null, location: '', linkedIn: '#', website: '#' },
      { founder: 'Richard Van Doren, Jr.', company: 'Versant Ventures', title: 'Chief Financial Officer', photo: null, funding: null, location: '', linkedIn: '#', website: '#' },
      { founder: 'Soji Fanoiki', company: 'Boinu Capital', title: 'Managing Partner', photo: null, funding: null, location: '', linkedIn: '#', website: '#' },
      { founder: 'Sophia Browne', company: 'Citizens Private Bank', title: 'Vice President', photo: null, funding: null, location: '', linkedIn: '#', website: '#' },
      { founder: 'Alexander Creasey', company: 'Snowpint Ventures', title: 'Managing Partner', photo: null, funding: null, location: '', linkedIn: '#', website: '#' },
      { founder: 'Hans Nehme', company: 'Foresight Intelligence Ventures', title: 'Founder & Managing Director', photo: null, funding: null, location: '', linkedIn: '#', website: '#' },
      { founder: 'Steve Yarrow', company: 'Bloom Venture Partners', title: 'Managing Partner', photo: null, funding: null, location: '', linkedIn: '#', website: '#' },
      { founder: 'John Andreini', company: 'Ethos VC', title: 'Founding Partner', photo: null, funding: null, location: '', linkedIn: '#', website: '#' },
      { founder: 'Hungwei (Teddy) Chen', company: 'Angel Investments', title: 'Angel Investor', photo: null, funding: null, location: '', linkedIn: '#', website: '#' },
      { founder: 'Bob Ackerman', company: 'AllegisCyber Capital', title: 'Founding Partner', photo: null, funding: null, location: '', linkedIn: '#', website: '#' },
      { founder: 'Raul Pomares', company: 'Sonen Capital LLC', title: 'Founder', photo: null, funding: null, location: '', linkedIn: '#', website: '#' },
      { founder: 'Paul Grewal', company: 'SIC Venture Studio', title: 'General Partner', photo: null, funding: null, location: '', linkedIn: '#', website: '#' },
      { founder: 'Jake Cabala', company: 'Patient Square Capital', title: 'Partner', photo: null, funding: null, location: '', linkedIn: '#', website: '#' },
      { founder: 'Shirley Lee', company: 'Champlain Capital', title: 'Chief Financial Officer', photo: null, funding: null, location: '', linkedIn: '#', website: '#' },
      { founder: 'Robert Lindsey', company: 'Initialized Capital', title: 'Head of Finance Operations', photo: null, funding: null, location: '', linkedIn: '#', website: '#' },
      { founder: 'Carmen Palafox', company: '2045 Capital', title: 'Founding Partner', photo: null, funding: null, location: '', linkedIn: '#', website: '#' },
      { founder: 'Markus Frank', company: 'New Age Venture', title: 'EVP/ Partner', photo: null, funding: null, location: '', linkedIn: '#', website: '#' },
      { founder: 'Kevin Salquist', company: 'Big 7 Ventures LLC', title: 'Partner', photo: null, funding: null, location: '', linkedIn: '#', website: '#' },
      { founder: 'Chris Stenzel', company: 'Kaiser Permanente Ventures', title: 'Former Managing Director', photo: null, funding: null, location: '', linkedIn: '#', website: '#' },
      { founder: 'Linda K Glisson', company: 'Glisson Capital LLC', title: 'Chief Executive Officer', photo: null, funding: null, location: '', linkedIn: '#', website: '#' },
      { founder: 'Michael Minto', company: '38 North Ventures', title: 'General Partner', photo: null, funding: null, location: '', linkedIn: '#', website: '#' },
      { founder: 'Caitlin Glazebrook', company: 'Andreessen Horowitz', title: 'Partner', photo: null, funding: null, location: '', linkedIn: '#', website: '#' },
      { founder: 'Michael Shneyderman', company: 'Terra Fortuna Ventures', title: 'Chief Executive Officer', photo: null, funding: null, location: '', linkedIn: '#', website: '#' },
      { founder: 'Peter Volz', company: 'Munich Re Ventures', title: 'General Counsel & Corporate Secretary', photo: null, funding: null, location: '', linkedIn: '#', website: '#' },
      { founder: 'Manuel Bernal', company: 'Greylock Ventures', title: 'Chief Information Officer', photo: null, funding: null, location: '', linkedIn: '#', website: '#' },
      { founder: 'Tom Lounibos', company: 'Accenture Ventures', title: 'Former Global Head', photo: null, funding: null, location: '', linkedIn: '#', website: '#' },
      { founder: 'Benjamin Bimanywaruhanga', company: 'Hustle Fund', title: 'Venture Fellow', photo: null, funding: null, location: '', linkedIn: '#', website: '#' },
      { founder: 'Alberto Yepez', company: 'Forge Captial', title: 'Co-Founder and Managing Director', photo: null, funding: null, location: '', linkedIn: '#', website: '#' },
      { founder: 'Arjun Arora', company: 'Format One', title: 'Managing Director', photo: null, funding: null, location: '', linkedIn: '#', website: '#' },
      { founder: 'Barmak Meftah', company: 'Ballistic Ventures', title: 'Co-Founder and General Partner', photo: null, funding: null, location: '', linkedIn: '#', website: '#' },
      { founder: 'Ken Kruszka', company: 'Something Finteresting', title: 'Managing Director', photo: null, funding: null, location: '', linkedIn: '#', website: '#' },
    ],
  },
}

export const sectionOrder = [
  'USF Founders Now',
  'USF Founders',
  'USF Venture Partners',
  'USF Venture Professionals',
]

export default tombstoneData
