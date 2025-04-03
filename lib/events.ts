export type EventImage = {
  id: string
  url: string
  alt?: string
  category?: string
}

export type TicketType = {
  id: number
  eventId: number
  name: string
  price: number
  description: string
  available?: boolean
}

export type EventVenue = {
  id: string
  name: string
  address: string
  city: string
  country: string
  capacity: number
  mapUrl?: string
}

export type EventPerformer = {
  id: string
  name: string
  role?: string
  imageUrl?: string
}

export type Event = {
  id: string
  title: string
  slug: string
  date: string
  time: string
  endTime?: string
  description: string
  longDescription?: string
  isSoldOut: boolean
  isFeatured: boolean
  isPublished: boolean
  venue: EventVenue
  performers: EventPerformer[]
  images: EventImage[]
  ticketTypes: TicketType[]
  tags: string[]
  category: string
}

export type TicketPurchase = {
  id: string
  eventId: string
  ticketTypeId: string
  quantity: number
  customerName: string
  customerEmail: string
  customerPhone: string
  totalAmount: number
  paymentMethod: "mpesa" | "card"
  paymentStatus: "pending" | "completed" | "failed"
  purchaseDate: string
  confirmationCode: string
}

export type PurchaseTicketRequest = {
  eventId: string
  ticketTypeId: string
  quantity: number
  customerName: string
  customerEmail: string
  customerPhone: string
  paymentMethod: "mpesa" | "card"
  paymentDetails: any
}

export type PurchaseTicketResponse = {
  success: boolean
  message: string
  purchase?: TicketPurchase
  error?: string
}

// Mock data
const mockVenues: EventVenue[] = [
  {
    id: "venue-1",
    name: "Central Park Amphitheater",
    address: "Central Park, Park Road",
    city: "Nairobi",
    country: "Kenya",
    capacity: 2500,
    mapUrl: "https://maps.google.com/?q=Central+Park+Nairobi",
  },
  {
    id: "venue-2",
    name: "Riverside Theater",
    address: "45 Riverside Drive",
    city: "Mombasa",
    country: "Kenya",
    capacity: 1200,
    mapUrl: "https://maps.google.com/?q=Riverside+Mombasa",
  },
  {
    id: "venue-3",
    name: "Grand Concert Hall",
    address: "15 Victoria Avenue",
    city: "Kisumu",
    country: "Kenya",
    capacity: 1800,
    mapUrl: "https://maps.google.com/?q=Concert+Hall+Kisumu",
  },
  {
    id: "venue-4",
    name: "Symphony Hall",
    address: "22 Harmony Street",
    city: "Nakuru",
    country: "Kenya",
    capacity: 1500,
    mapUrl: "https://maps.google.com/?q=Symphony+Hall+Nakuru",
  },
]

const mockPerformers: EventPerformer[] = [
  {
    id: "performer-1",
    name: "YABA",
    role: "Main Artist",
    imageUrl: "/images/shows/artist/1.JPG",
  },
  {
    id: "performer-2",
    name: "The Rhumbacane Band",
    role: "Supporting Band",
    imageUrl: "/images/shows/artist/2.JPG",
  },
  {
    id: "performer-3",
    name: "DJ Afrobeats",
    role: "Opening Act",
    imageUrl: "/images/shows/artist/3.JPG",
  },
  {
    id: "performer-4",
    name: "Nairobi Symphony Orchestra",
    role: "Special Guest",
    imageUrl: "/images/shows/artist/4.JPG",
  },
]

const mockEvents: Event[] = [
  {
    id: "event-1",
    title: "Summer Solstice Festival",
    slug: "summer-solstice-festival-2025",
    date: "June 21, 2025",
    time: "8:00 PM",
    endTime: "11:30 PM",
    description: "A magical evening performance celebrating the summer solstice with special guest artists.",
    longDescription: `
      Join us for an unforgettable evening under the stars as YABA celebrates the summer solstice with a special performance.
      
      This annual event brings together the best of Kenyan music and international sounds, creating a magical atmosphere that celebrates the longest day of the year.
      
      Special guest artists will join YABA on stage for unique collaborations you won't hear anywhere else. The evening will feature both acoustic and full band performances, with a spectacular light show designed specifically for this event.
      
      Food and drinks will be available for purchase, with local vendors offering a variety of cuisines.
      
      Don't miss this highlight of the summer music calendar!
    `,
    isSoldOut: false,
    isFeatured: true,
    isPublished: true,
    venue: mockVenues[0],
    performers: [mockPerformers[0], mockPerformers[2], mockPerformers[3]],
    images: [
      {
        id: "event-1-img-1",
        url: "/images/shows/event/1.JPG",
        alt: "Summer Solstice Festival",
      },
      {
        id: "event-1-img-2",
        url: "/images/shows/event/2.JPG",
        alt: "Summer Festival Stage Setup",
      },
    ],
    ticketTypes: [
      {
        id: 1,
        eventId: 1,
        name: "VIP",
        price: 7500,
        description: "Premium seating, meet & greet, and exclusive merchandise",
        available: true,
      },
      {
        id: 2,
        eventId: 1,
        name: "Regular",
        price: 3500,
        description: "Standard admission with good views",
        available: true,
      },
      {
        id: 3,
        eventId: 1,
        name: "Early Bird",
        price: 2500,
        description: "Limited availability, standard admission",
        available: false,
      },
    ],
    tags: ["festival", "summer", "live music", "orchestra"],
    category: "Festival",
  },
  {
    id: "event-2",
    title: "Moonlight Sonata",
    slug: "moonlight-sonata-2025",
    date: "July 15, 2025",
    time: "9:30 PM",
    endTime: "11:30 PM",
    description: "An intimate acoustic performance under the stars with a full orchestra accompaniment.",
    longDescription: `
      Experience the magic of YABA's music in its purest form with this special acoustic performance under the moonlight.
      
      For one night only, YABA will perform alongside a full orchestra, reimagining favorite songs and premiering new material in this intimate setting.
      
      The Riverside Theater provides the perfect backdrop for this unique musical experience, with its open-air design allowing the music to blend with the sounds of nature.
      
      This performance is part of YABA's "Intimate Evenings" series, which focuses on creating close connections between the artist and audience through stripped-back performances in special venues.
      
      Seating is limited to ensure the best possible experience for all attendees.
    `,
    isSoldOut: false,
    isFeatured: true,
    isPublished: true,
    venue: mockVenues[1],
    performers: [mockPerformers[0], mockPerformers[3]],
    images: [
      {
        id: "event-2-img-1",
        url: "/images/shows/event/3.JPG",
        alt: "Moonlight Sonata",
      },
    ],
    ticketTypes: [
      {
        id: 4,
        eventId: 2,
        name: "Premium",
        price: 6500,
        description: "Front row seating with complimentary drinks",
      },
      {
        id: 5,
        eventId: 2,
        name: "Standard",
        price: 4500,
        description: "General admission seating",
      },
    ],
    tags: ["acoustic", "orchestra", "intimate", "night"],
    category: "Concert",
  },
  {
    id: "event-3",
    title: "Autumn Rhythms Tour",
    slug: "autumn-rhythms-tour-2025",
    date: "September 5, 2025",
    time: "7:00 PM",
    endTime: "10:00 PM",
    description: "The opening night of the nationwide Autumn Rhythms tour featuring new material.",
    longDescription: `
      Be among the first to experience YABA's new album live as the nationwide Autumn Rhythms Tour kicks off in Kisumu.
      
      This highly anticipated tour follows the release of YABA's latest album and will feature both new material and fan favorites reimagined for the stage.
      
      The Grand Concert Hall in Kisumu provides state-of-the-art acoustics and visuals, ensuring an unforgettable opening night for this landmark tour.
      
      The full band will be accompanied by special production elements created specifically for this tour, including custom lighting design and visual projections that complement the music.
      
      This performance is expected to sell out quickly, so early booking is recommended.
    `,
    isSoldOut: true,
    isFeatured: false,
    isPublished: true,
    venue: mockVenues[2],
    performers: [mockPerformers[0], mockPerformers[1]],
    images: [
      {
        id: "event-3-img-1",
        url: "/images/shows/event/1.JPG",
        alt: "Autumn Rhythms Tour",
      },
    ],
    ticketTypes: [],
    tags: ["tour", "album launch", "autumn", "new music"],
    category: "Tour",
  },
  {
    id: "event-4",
    title: "Winter Wonderland",
    slug: "winter-wonderland-2025",
    date: "December 12, 2025",
    time: "6:30 PM",
    endTime: "9:30 PM",
    description: "A festive celebration with holiday classics reimagined in a unique artistic style.",
    longDescription: `
      Celebrate the holiday season with YABA's annual Winter Wonderland concert, a festive musical journey that has become a beloved tradition.
      
      This special performance features holiday classics reimagined through YABA's unique artistic lens, creating a fresh take on familiar favorites while maintaining the warmth and joy of the season.
      
      The Symphony Hall will be transformed into a winter wonderland, with seasonal decorations and a magical atmosphere that complements the music.
      
      This family-friendly event includes special activities for children before the show, making it the perfect holiday outing for music lovers of all ages.
      
      A portion of proceeds from this event will be donated to local charities supporting children in need during the holiday season.
    `,
    isSoldOut: false,
    isFeatured: true,
    isPublished: true,
    venue: mockVenues[3],
    performers: [mockPerformers[0], mockPerformers[1], mockPerformers[3]],
    images: [
      {
        id: "event-4-img-1",
        url: "/images/shows/event/2.JPG",
        alt: "Winter Wonderland",
      },
      {
        id: "event-4-img-2",
        url: "/images/shows/event/3.JPG",
        alt: "Holiday Concert",
      },
    ],
    ticketTypes: [
      {
        id: 6,
        eventId: 4,
        name: "VIP Experience",
        price: 8000,
        description: "Premium seating, backstage tour, and holiday gift package",
      },
      {
        id: 7,
        eventId: 4,
        name: "Regular",
        price: 3800,
        description: "Standard admission",
      },
      {
        id: 8,
        eventId: 4,
        name: "Family Package",
        price: 12000,
        description: "Admission for 4 people with special family activities",
      },
    ],
    tags: ["holiday", "winter", "family", "charity"],
    category: "Special Event",
  },
  {
    id: "event-5",
    title: "Rhumbacane Unplugged",
    slug: "rhumbacane-unplugged-2025",
    date: "August 8, 2025",
    time: "8:00 PM",
    endTime: "10:00 PM",
    description: "An intimate acoustic evening showcasing the raw essence of YABA's music.",
    longDescription: `
      Experience YABA's music stripped down to its purest form in this special acoustic performance.
      
      Rhumbacane Unplugged presents a rare opportunity to hear YABA's songs in their most intimate arrangement, highlighting the vocal prowess and musical craftsmanship that form the foundation of the artist's sound.
      
      The small venue setting creates an atmosphere of connection between performer and audience, with stories behind the songs shared throughout the evening.
      
      This performance will feature deep cuts and rarities not often performed at larger shows, making it a must-attend event for dedicated fans.
      
      Limited seating ensures an exclusive experience for all attendees.
    `,
    isSoldOut: false,
    isFeatured: false,
    isPublished: true,
    venue: {
      id: "venue-5",
      name: "The Acoustic Lounge",
      address: "78 Harmony Lane",
      city: "Nairobi",
      country: "Kenya",
      capacity: 200,
      mapUrl: "https://maps.google.com/?q=Acoustic+Lounge+Nairobi",
    },
    performers: [mockPerformers[0]],
    images: [
      {
        id: "event-5-img-1",
        url: "/images/shows/event/1.JPG",
        alt: "Rhumbacane Unplugged",
      },
    ],
    ticketTypes: [
      {
        id: 9,
        eventId: 5,
        name: "Premium Seating",
        price: 5500,
        description: "Front rows with complimentary drink",
      },
      {
        id: 10,
        eventId: 5,
        name: "General Admission",
        price: 3000,
        description: "Standard seating",
      },
    ],
    tags: ["acoustic", "intimate", "unplugged"],
    category: "Acoustic",
  },
]

// Add these 4 new events to the mockEvents array
const additionalEvents = [
  {
    id: "event-6",
    title: "Nairobi Jazz Festival",
    slug: "nairobi-jazz-festival-2025",
    date: "May 15, 2025",
    time: "4:00 PM",
    endTime: "10:00 PM",
    description: "A full day of jazz performances featuring YABA and other renowned jazz artists from across Africa.",
    longDescription: `
      The Nairobi Jazz Festival returns for its 10th anniversary with an incredible lineup of artists, including YABA as one of the headliners.
      
      This all-day event celebrates the rich jazz heritage of Kenya and the broader African continent, bringing together traditional and contemporary jazz styles in a unique fusion of sounds.
      
      The festival features multiple stages, food vendors offering local cuisine, and craft markets showcasing Kenyan artisans. Bring blankets or folding chairs to enjoy the performances in comfort.
      
      The event is family-friendly, with a dedicated kids' area featuring music workshops and activities for younger jazz enthusiasts.
      
      Don't miss this opportunity to experience the vibrant jazz scene of Nairobi in a beautiful outdoor setting!
    `,
    isSoldOut: false,
    isFeatured: true,
    isPublished: true,
    venue: {
      id: "venue-6",
      name: "Uhuru Gardens",
      address: "Langata Road",
      city: "Nairobi",
      country: "Kenya",
      capacity: 5000,
      mapUrl: "https://maps.google.com/?q=Uhuru+Gardens+Nairobi",
    },
    performers: [
      mockPerformers[0],
      mockPerformers[3],
      {
        id: "performer-5",
        name: "The Nairobi Jazz Collective",
        role: "Supporting Act",
        imageUrl: "/images/shows/event/1.JPG",
      },
    ],
    images: [
      {
        id: "event-6-img-1",
        url: "/images/shows/event/1.JPG",
        alt: "Nairobi Jazz Festival",
      },
      {
        id: "event-6-img-2",
        url: "/images/shows/event/2.JPG",
        alt: "Jazz Festival Stage",
      },
    ],
    ticketTypes: [
      {
        id: 11,
        eventId: 6,
        name: "VIP Pass",
        price: 8500,
        description: "Access to VIP lounge, premium viewing area, and complimentary food and drinks",
      },
      {
        id: 12,
        eventId: 6,
        name: "General Admission",
        price: 3000,
        description: "Full day access to all stages and performances",
      },
      {
        id: 13,
        eventId: 6,
        name: "Family Pack",
        price: 9000,
        description: "Admission for 2 adults and 2 children (under 12)",
      },
    ],
    tags: ["jazz", "festival", "outdoor", "family-friendly"],
    category: "Festival",
  },
  {
    id: "event-7",
    title: "Album Launch Party",
    slug: "album-launch-party-2025",
    date: "April 3, 2025",
    time: "7:30 PM",
    endTime: "11:00 PM",
    description:
      "Exclusive launch party for YABA's new album 'Rhumbacane Dreams' with special performances and guest appearances.",
    longDescription: `
      Be among the first to experience YABA's highly anticipated new album 'Rhumbacane Dreams' at this exclusive launch party.
      
      The evening will feature a complete live performance of the new album from start to finish, followed by a selection of fan favorites and surprise collaborations with guest artists.
      
      All attendees will receive a signed copy of the album on vinyl or CD (your choice), and VIP ticket holders will have the opportunity to meet YABA and the production team at a post-show reception.
      
      The intimate venue provides the perfect acoustic setting to appreciate the nuances of the new material, with state-of-the-art sound engineering ensuring an immersive listening experience.
      
      This is more than just a concert - it's a celebration of a creative milestone and a chance to be part of YABA's musical journey.
    `,
    isSoldOut: false,
    isFeatured: true,
    isPublished: true,
    venue: {
      id: "venue-7",
      name: "The Alchemist Bar",
      address: "Parklands Road",
      city: "Nairobi",
      country: "Kenya",
      capacity: 300,
      mapUrl: "https://maps.google.com/?q=Alchemist+Bar+Nairobi",
    },
    performers: [mockPerformers[0], mockPerformers[1]],
    images: [
      {
        id: "event-7-img-1",
        url: "/images/shows/event/1.JPG",
        alt: "Album Launch Party",
      },
    ],
    ticketTypes: [
      {
        id: 14,
        eventId: 7,
        name: "VIP Experience",
        price: 7000,
        description: "Includes signed album, meet & greet, and post-show reception",
      },
      {
        id: 15,
        eventId: 7,
        name: "Standard Ticket",
        price: 4000,
        description: "Includes signed album and performance",
      },
    ],
    tags: ["album launch", "exclusive", "intimate"],
    category: "Special Event",
  },
  {
    id: "event-8",
    title: "Cultural Fusion Workshop",
    slug: "cultural-fusion-workshop-2025",
    date: "March 12, 2025",
    time: "10:00 AM",
    endTime: "4:00 PM",
    description:
      "An interactive workshop led by YABA exploring the fusion of traditional Kenyan music with contemporary styles.",
    longDescription: `
      Join YABA for a full-day immersive workshop exploring the rich intersection of traditional Kenyan musical traditions and contemporary global styles.
      
      This hands-on workshop is designed for musicians, music students, and enthusiasts interested in understanding the creative process behind cultural fusion in music.
      
      The day will be divided into sessions covering:
      - Traditional Kenyan instruments and rhythms
      - Adapting traditional melodies for modern arrangements
      - Collaborative composition techniques
      - Recording and production considerations for fusion music
      
      Participants are encouraged to bring their own instruments if they wish to actively participate in the jam sessions, though this is not required.
      
      The workshop includes lunch and refreshments, as well as a resource pack with notation, recordings, and further reading materials.
      
      Limited to 50 participants to ensure a personalized experience with plenty of interaction.
    `,
    isSoldOut: false,
    isFeatured: false,
    isPublished: true,
    venue: {
      id: "venue-8",
      name: "Kenya Cultural Centre",
      address: "Harry Thuku Road",
      city: "Nairobi",
      country: "Kenya",
      capacity: 50,
      mapUrl: "https://maps.google.com/?q=Kenya+Cultural+Centre+Nairobi",
    },
    performers: [
      mockPerformers[0],
      {
        id: "performer-6",
        name: "Mzee Wanjiku",
        role: "Traditional Music Expert",
        imageUrl: "/images/shows/event/3.JPG",
      },
    ],
    images: [
      {
        id: "event-8-img-1",
        url: "/images/shows/event/1.JPG",
        alt: "Cultural Fusion Workshop",
      },
    ],
    ticketTypes: [
      {
        id: 16,
        eventId: 8,
        name: "Workshop Pass",
        price: 5000,
        description: "Full day workshop including lunch and resource materials",
      },
      {
        id: 17,
        eventId: 8,
        name: "Student Pass",
        price: 2500,
        description: "Discounted rate for students with valid ID",
      },
    ],
    tags: ["workshop", "educational", "cultural", "interactive"],
    category: "Workshop",
  },
  {
    id: "event-9",
    title: "Charity Gala Concert",
    slug: "charity-gala-concert-2025",
    date: "November 28, 2025",
    time: "7:00 PM",
    endTime: "10:30 PM",
    description:
      "A special gala concert to raise funds for music education programs in underserved communities across Kenya.",
    longDescription: `
      Join YABA and special guests for an elegant evening of music and philanthropy at the annual Charity Gala Concert.
      
      This year's event aims to raise funds for the "Music for All" initiative, which provides instruments, lessons, and mentorship to young musicians in underserved communities across Kenya.
      
      The concert will feature YABA performing alongside the young beneficiaries of last year's program, showcasing the impact of music education on their lives and development.
      
      The evening includes a pre-concert reception with canapés and drinks, a silent auction featuring unique music memorabilia and experiences, and the opportunity to meet the performers at a post-concert gathering.
      
      100% of proceeds from ticket sales and auction items will go directly to the "Music for All" program, with all artists and venue donating their time and resources.
      
      Formal attire is requested for this special evening of music and giving.
    `,
    isSoldOut: false,
    isFeatured: false,
    isPublished: true,
    venue: {
      id: "venue-9",
      name: "Kenyatta International Convention Centre",
      address: "City Square",
      city: "Nairobi",
      country: "Kenya",
      capacity: 800,
      mapUrl: "https://maps.google.com/?q=KICC+Nairobi",
    },
    performers: [
      mockPerformers[0],
      mockPerformers[3],
      {
        id: "performer-7",
        name: "Music for All Youth Ensemble",
        role: "Special Guests",
        imageUrl: "/images/shows/event/1.JPG",
      },
    ],
    images: [
      {
        id: "event-9-img-1",
        url: "/images/shows/event/1.JPG",
        alt: "Charity Gala Concert",
      },
      {
        id: "event-9-img-2",
        url: "/images/shows/event/1.JPG",
        alt: "Gala Performance",
      },
    ],
    ticketTypes: [
      {
        id: 18,
        eventId: 9,
        name: "Platinum Table",
        price: 100000,
        description: "Table for 8 guests with premium seating, full dinner service, and VIP reception",
      },
      {
        id: 19,
        eventId: 9,
        name: "Gold Seat",
        price: 15000,
        description: "Premium individual seating with dinner and reception access",
      },
      {
        id: 20,
        eventId: 9,
        name: "Silver Seat",
        price: 8000,
        description: "Standard seating with reception access",
      },
    ],
    tags: ["charity", "gala", "formal", "philanthropy"],
    category: "Charity",
  },
]

// Add the new events to the mockEvents array
mockEvents.push(...additionalEvents)

// Mock API functions
export async function getEvents(): Promise<Event[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500))
  return mockEvents.filter((event) => event.isPublished)
}

export async function getFeaturedEvents(limit = 3): Promise<Event[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 300))
  return mockEvents.filter((event) => event.isPublished && event.isFeatured).slice(0, limit)
}

export async function getUpcomingEvents(limit = 10): Promise<Event[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 400))

  // In a real API, you would sort by date and filter future events
  return mockEvents.filter((event) => event.isPublished).slice(0, limit)
}

export async function getEvent(idOrSlug: string): Promise<Event | null> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 300))

  return mockEvents.find((event) => event.id === idOrSlug || event.slug === idOrSlug) || null
}

export async function getEventTickets(eventId: string): Promise<TicketType[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 200))

  const event = mockEvents.find((event) => event.id === eventId)
  if (!event) {
    throw new Error(`Event with ID ${eventId} not found`)
  }

  return event.ticketTypes
}

export async function searchEvents(query: string): Promise<Event[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 400))

  const lowercaseQuery = query.toLowerCase()

  return mockEvents.filter(
    (event) =>
      event.isPublished &&
      (event.title.toLowerCase().includes(lowercaseQuery) ||
        event.description.toLowerCase().includes(lowercaseQuery) ||
        event.venue.name.toLowerCase().includes(lowercaseQuery) ||
        event.venue.city.toLowerCase().includes(lowercaseQuery) ||
        event.category.toLowerCase().includes(lowercaseQuery) ||
        event.tags.some((tag) => tag.toLowerCase().includes(lowercaseQuery))),
  )
}

export async function getEventsByCategory(category: string): Promise<Event[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 350))

  return mockEvents.filter((event) => event.isPublished && event.category.toLowerCase() === category.toLowerCase())
}

export async function getEventsByTag(tag: string): Promise<Event[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 350))

  return mockEvents.filter(
    (event) => event.isPublished && event.tags.some((t) => t.toLowerCase() === tag.toLowerCase()),
  )
}

export async function getEventsByVenue(venueId: string): Promise<Event[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 300))

  return mockEvents.filter((event) => event.isPublished && event.venue.id === venueId)
}

export async function getEventsByPerformer(performerId: string): Promise<Event[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 300))

  return mockEvents.filter((event) => event.isPublished && event.performers.some((p) => p.id === performerId))
}

export async function getAllCategories(): Promise<string[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 150))

  const categories = new Set<string>()
  mockEvents.forEach((event) => {
    if (event.isPublished) {
      categories.add(event.category)
    }
  })

  return Array.from(categories)
}

export async function getAllTags(): Promise<string[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 150))

  const tags = new Set<string>()
  mockEvents.forEach((event) => {
    if (event.isPublished) {
      event.tags.forEach((tag) => tags.add(tag))
    }
  })

  return Array.from(tags)
}

