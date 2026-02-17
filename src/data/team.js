const teamData = {
  foundingTeam: [
    {
      name: 'Brett Bonthron',
      slug: 'brett',
      role: 'General Partner / Operating Partner',
      image: '/team/brett.jpeg',
      linkedin: '#',
      bio: `Brett Bonthron is a General Partner and Operating Partner at USF Ventures. He has served as Adjunct Faculty at the University of San Francisco School of Management for over 23 years, teaching entrepreneurship and venture strategy. Brett is a Partner at The Chasm Group alongside Geoffrey Moore and previously led technology industry practices at Deloitte and Capgemini.\n\nHe founded Salesforce Ventures' corporate venture function and later co-founded VIIZR, a strategic partnership between Salesforce and Ford. Throughout his academic and advisory work, Brett has guided eight student-led startups to four exits and one IPO (2027). He is based in San Francisco.`,
    },
    {
      name: 'John Gardner',
      slug: 'john',
      role: 'Investment Committee',
      image: '/team/john.jpeg',
      linkedin: '#',
      bio: `John Gardner is a founder and General Partner of the 1809 Fund at Miami University of Ohio and serves on the board of the Jesuit Retreat Center. He brings 27 years of venture capital experience, having previously been a GP at Nokia Growth Partners and Blue Run Ventures. Over the course of his career, he has invested across multiple technology cycles and supported companies from early growth through exit. Based in San Francisco, John provides deep institutional venture expertise and long-term GP experience.`,
    },
    {
      name: 'Shomit Ghose',
      slug: 'shomit',
      role: 'Advisor',
      image: '/team/shomit.jpeg',
      linkedin: '#',
      bio: `Shomit Ghose is a General Partner at Clearvision Ventures and Adjunct Faculty at the University of San Francisco. He has spent more than 20 years as a Silicon Valley venture capitalist. Prior to his VC career, he was a startup entrepreneur for 19 years, participating in three IPOs. He also served as CEO and board member of Truviso, leading the company to its acquisition by Cisco Systems.`,
    },
    {
      name: 'David Epstein',
      slug: 'dave',
      role: 'Advisor',
      image: '/team/dave.jpeg',
      linkedin: '#',
      bio: `David Epstein is Executive Director of Ethics at the Susilo Institute for Ethics at Boston University and serves as Adjunct Faculty at both USF School of Management and Hult International Business School. He is a General Partner at Crosslink Capital and has held multiple roles as founder, CEO, and board member across venture-backed companies. His career spans venture investing, executive leadership, and governance across technology and innovation sectors.`,
    },
    {
      name: 'Robert "Tre" Sayle',
      slug: 'robert',
      role: 'General Partner',
      image: '/team/robert.jpeg',
      linkedin: '#',
      bio: `Robert "Tre" Sayle has a 20-year investing career with Thoma Bravo, one of the world's leading private equity firms focused on software and technology. He has invested in 27 companies, including ServiceTitan, Project44, and Starburst. Tre currently serves on the boards of Imply, Personetics, and Paradox. A San Francisco native, he brings extensive experience in growth-stage investing, software scale-ups, and board governance.`,
    },
    {
      name: 'Samuel Atiye',
      slug: 'samuel',
      role: 'Associate',
      image: '/team/samuel.jpeg',
      linkedin: '#',
      bio: 'Bio coming soon.',
    },
  ],
  investmentCommittee: [
    {
      name: 'Tom Lonibos',
      slug: 'tom',
      role: 'Investment Committee',
      image: '/team/tom.jpeg',
      linkedin: '#',
      bio: `Tom Lonibos is a USF alumnus and member of the USF Athletic Hall of Fame. He has led five Silicon Valley exits, including two IPOs. Tom previously led Accenture Ventures and has extensive experience building and scaling venture-backed technology companies. His background spans venture investing, corporate innovation, and executive leadership within high-growth environments.`,
    },
    {
      name: 'Bob Ackerman',
      slug: 'bob',
      role: 'Investment Committee',
      image: '/team/bob.jpeg',
      linkedin: '#',
      bio: `Bob Ackerman is the founder of Allegis Capital, a venture firm that developed a focused cybersecurity investment strategy through Allegis Cyber. He later founded DataTribe, a cybersecurity incubator dedicated to building next-generation security companies. A USF alumnus, Bob has been an early and sustained investor in the cybersecurity sector and has played a key role in shaping the industry's venture ecosystem.`,
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
