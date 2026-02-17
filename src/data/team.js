const teamData = {
  foundingTeam: [
    {
      name: 'Brett',
      slug: 'brett',
      role: 'General Partner / Operating Partner',
      image: '/team/brett.jpg',
      linkedin: '#',
      bio: `Brett brings over two decades of experience in venture capital, private equity, and operational leadership. As General Partner and Operating Partner of USF Ventures, he leads the fund's investment strategy and portfolio operations. Brett has a proven track record of building and scaling companies from early-stage through growth, with deep expertise in enterprise technology, fintech, and healthcare. Prior to USF Ventures, Brett held senior leadership positions at multiple technology companies and investment firms across the San Francisco Bay Area. He is a proud alumnus of the University of San Francisco, where he earned his MBA, and remains deeply committed to the USF community and its mission of educating minds and hearts to change the world.`,
    },
    {
      name: 'John',
      slug: 'john',
      role: 'Investment Committee',
      image: '/team/john.jpg',
      linkedin: '#',
      bio: `John serves on the Investment Committee of USF Ventures, where he brings decades of experience in finance, investment banking, and venture capital. His career spans leadership roles at major financial institutions and advisory firms, where he specialized in evaluating high-growth technology companies and structuring complex transactions. John's deep expertise in due diligence, valuation, and capital markets strategy provides USF Ventures with critical oversight on investment decisions. A dedicated member of the USF community, John is passionate about leveraging the alumni network to create meaningful investment opportunities and drive value for both founders and investors.`,
    },
    {
      name: 'Shomit',
      slug: 'shomit',
      role: 'Advisor',
      image: '/team/shomit.jpg',
      linkedin: '#',
      bio: `Shomit is a seasoned technology executive and entrepreneur who serves as an Advisor to USF Ventures. With extensive experience in product development, growth strategy, and technology innovation, Shomit has held senior roles at leading Silicon Valley companies and has founded multiple successful ventures. His expertise spans artificial intelligence, consumer technology, and enterprise SaaS platforms. Shomit brings a unique blend of technical depth and business acumen to the USF Ventures advisory team, helping portfolio companies navigate critical growth inflection points and build sustainable competitive advantages. He is a strong advocate for the USF entrepreneurial ecosystem.`,
    },
    {
      name: 'Dave',
      slug: 'dave',
      role: 'Advisor',
      image: '/team/dave.jpg',
      linkedin: '#',
      bio: `Dave is an experienced investor and business leader who serves as an Advisor to USF Ventures. His career encompasses senior positions in private equity, venture capital, and corporate development, with a focus on technology and healthcare sectors. Dave has been instrumental in sourcing, evaluating, and managing investments across multiple fund cycles, and has served on the boards of numerous portfolio companies. His strategic insight and operational expertise help USF Ventures identify high-potential opportunities and support founders in scaling their businesses. Dave is a committed member of the USF alumni community and actively mentors the next generation of entrepreneurs.`,
    },
    {
      name: 'Robert',
      slug: 'robert',
      role: 'General Partner',
      image: '/team/robert.jpg',
      linkedin: '#',
      bio: `Robert serves as General Partner of USF Ventures, bringing a wealth of experience in venture capital, corporate strategy, and entrepreneurship. Over his career, Robert has invested in and advised dozens of early-stage and growth-stage companies across technology, consumer, and impact sectors. He is known for his hands-on approach to portfolio management and his ability to connect founders with the resources, talent, and networks they need to succeed. Prior to USF Ventures, Robert held leadership roles at several prominent investment firms and technology companies. A proud USF alumnus, Robert is deeply committed to building a world-class venture platform rooted in the university's values.`,
    },
    {
      name: 'Samuel',
      slug: 'samuel',
      role: 'Associate',
      image: '/team/samuel.jpg',
      linkedin: '#',
      bio: 'Bio coming soon.',
    },
  ],
  investmentCommittee: [
    {
      name: 'Tom',
      slug: 'tom',
      role: 'Investment Committee',
      image: '/team/tom.jpg',
      linkedin: '#',
      bio: `Tom is a distinguished member of the USF Ventures Investment Committee, bringing deep expertise in financial analysis, portfolio management, and institutional investing. With a career spanning leadership roles at top-tier asset management firms and financial institutions, Tom has overseen billions of dollars in investment capital across diverse asset classes. His rigorous approach to risk assessment and return optimization provides USF Ventures with invaluable governance and strategic direction. Tom is dedicated to the USF mission and plays a key role in ensuring the fund's investment decisions align with both fiduciary standards and the university's commitment to positive impact.`,
    },
    {
      name: 'Bob',
      slug: 'bob',
      role: 'Investment Committee',
      image: '/team/bob.jpg',
      linkedin: '#',
      bio: `Bob brings extensive experience in venture capital, corporate finance, and strategic advisory to the USF Ventures Investment Committee. Throughout his career, Bob has been at the forefront of technology investing, having evaluated and supported hundreds of startups from seed stage through successful exits. His expertise in market analysis, competitive positioning, and growth strategy is invaluable to the fund's investment process. Bob has held senior positions at leading venture firms and Fortune 500 companies, and brings a unique perspective that bridges institutional investing with entrepreneurial innovation. He is a passionate supporter of the USF community and its mission.`,
    },
  ],
}

export function getAllMembers() {
  return [...teamData.foundingTeam, ...teamData.investmentCommittee]
}

export function getMemberBySlug(slug) {
  return getAllMembers().find((m) => m.slug === slug)
}

export default teamData
