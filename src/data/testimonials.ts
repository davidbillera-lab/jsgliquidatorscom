// Verbatim Google reviews for JSG Liquidators, used as the fallback when the
// live Google feed is unavailable.
export interface Testimonial {
  id: number;
  name: string;
  location: string;
  rating: number;
  text: string;
}

export const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Harriet Ivker",
    location: "Denver, CO",
    rating: 5,
    text: "I highly recommend JSG liquidators. They were professional, honest, easy to work with and I received more than expected from the estate sale. You won't be sorry.",
  },
  {
    id: 2,
    name: "Brandon Johnson",
    location: "Denver, CO",
    rating: 5,
    text: "If you're looking for a good auction to auction off your items, look no further! JSG Estate will take care of you. Fast and easy service, they can get you a return on your investment. The items you think are not worth anything, they have an eye for value. Professional and driven. Easy to work with and down to earth.",
  },
  {
    id: 3,
    name: "Sarah Booras",
    location: "Denver, CO",
    rating: 5,
    text: "I have known the Billera Brothers for a while now, I have used their help more than once! They are hard working, honest, professional and a great choice to help with estate liquidations, junk removal, whatever you need. They get it done! Highly recommend!",
  },
  {
    id: 4,
    name: "Mary Brs",
    location: "Denver, CO",
    rating: 5,
    text: "David and Vincent with JSG Liquidators run smooth, well organized auctions. They offer a great mix of new items, vintage finds, and quality antiques. I love shopping their auctions! Pickup is straightforward and well managed, and communication is solid from start to finish. They're dependable, professional, and a welcome part of the Denver Online Auctions community.",
  },
  {
    id: 5,
    name: "Erin H",
    location: "Denver, CO",
    rating: 5,
    text: "David has been a dream come true. He carries himself with integrity, and the way he has helped me reflects his strong character. My life feels back in order again and I truly appreciate you! I will recommend David any chance I get!",
  },
  {
    id: 6,
    name: "John Krueger",
    location: "Denver, CO",
    rating: 5,
    text: "Dave and Vince were very professional in going over what could be used for the estate auction and what they have to move to our new residence.",
  },
];
