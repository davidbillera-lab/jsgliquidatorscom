export interface CityLandingContent {
  title: string;
  description: string;
  introduction: string;
  sections: { heading: string; paragraphs: string[] }[];
  preparation: string;
}

// These city hubs keep their established URLs; local notes come from the site's
// city profiles and service guidance, not invented results or local offices.
export const cityLandingContent: Record<string, CityLandingContent> = {
  "highlands-ranch": {
    title: "Estate Sales & Cleanouts in Highlands Ranch",
    description: "Highlands Ranch estate sales, cleanouts and consignment. 35% sale commission; cleanouts quoted separately. Arrange a free walk-through with JSG.",
    introduction: "Estate sales and estate cleanouts in Highlands Ranch start with a plan for your home, your belongings and your deadline. JSG Liquidators helps families choose online auctions, e-commerce consignment, removal services or a combination, with separate written terms for sales and cleanout work.",
    sections: [
      { heading: "Downsizing a Highlands Ranch family home", paragraphs: [
        "Moving from a multi-room home can mean deciding what to do with furniture, basement storage, garage contents and recreational equipment at the same time. Start with the belongings you want to take with you. Set aside family documents and keepsakes before deciding what should be evaluated for sale or included in a cleanout.",
        "For homes in Northridge, Eastridge, Southridge and Westridge, the walk-through helps establish which rooms are included and how items can be carried out. If you are keeping part of a bedroom or dining set, tell us before listing decisions are made. Only the items you approve belong in the sale plan.",
      ] },
      { heading: "Access planning for Backcountry and nearby communities", paragraphs: [
        "Gated access, neighborhood parking rules and container restrictions can change the practical work plan. Share any instructions from your HOA or property manager before scheduling removal. We discuss truck placement, stairs and loading access during the consultation rather than assuming every property has the same requirements.",
        "If your move or property handover has a fixed date, bring it to the first conversation. Sale timing and cleanout timing are separate decisions. An online auction is not a promise that everything will sell or that the property will be cleared by a particular date without an agreed scope.",
      ] },
      { heading: "Household and commercial liquidation options", paragraphs: [
        "Approved furniture, tools, décor and collections can be considered for auction or e-commerce consignment. Condition, completeness and suitability for listing matter more than the size of the house. Items that are not selected for sale can be discussed separately for donation, recycling or removal under the cleanout quote.",
        "JSG also offers business liquidation for Highlands Ranch offices and commercial spaces. The owner-confirmed project history includes Hilton Home2 Suites in Highlands Ranch. Each new engagement still needs its own inventory review, access arrangements and written approval; past work does not guarantee a particular sale result.",
      ] },
    ],
    preparation: "For your Highlands Ranch walk-through, gather your move date, HOA access instructions and a list of rooms or items that must stay. Photos of basement and garage contents can help explain the scope before the visit.",
  },
  denver: {
    title: "Estate Sales & Cleanouts in Denver",
    description: "Denver estate sales, online auctions and estate cleanouts. Compare 35% consignment commission with separate upfront cleanout quotes. Free consultation.",
    introduction: "Estate sales Denver families need often begin with a bigger question: what should be kept, sold or removed? JSG Liquidators provides estate liquidation, online auctions, e-commerce consignment and estate cleanouts in Denver with a property-specific plan and clear, separate charges.",
    sections: [
      { heading: "Estate liquidation for Denver homes and condos", paragraphs: [
        "A Capitol Hill home with several floors presents a different project from a Central Park house or a condo near Cherry Creek. The first walk-through identifies the rooms involved, items to preserve and practical access issues. Let us know about basements, detached garages and storage areas so the written scope reflects the actual work.",
        "For families managing a loved one's estate, the first decision is not a sale price. Identify personal papers, photographs, keepsakes and any belongings reserved for family members. JSG reviews the remaining approved contents with you and discusses which services fit the property and your priorities.",
      ] },
      { heading: "Parking, elevators and property handover", paragraphs: [
        "Denver loading plans may involve alley access, restricted street parking or building-managed elevators. If your building requires a loading reservation or has work-hour rules, share them before a date is agreed. Stairs and carry distances also affect the labor needed for a cleanout.",
        "Tell us whether you are preparing for a sale, ending a lease or moving to a smaller home. A written cleanout scope establishes what is removed and what remains. Selling approved contents is a separate service, and its outcome should not be treated as a guaranteed source of money for the upfront cleanout invoice.",
      ] },
      { heading: "Selling estate items or closing a Denver business", paragraphs: [
        "Online auctions and e-commerce consignment can offer a selling route for suitable furniture, collectibles, artwork and equipment without requiring every item to go through the same channel. The review considers condition and listing suitability. You decide which items JSG is authorized to sell.",
        "Denver business liquidation can include office furniture, commercial equipment and approved inventory. Businesses along South Broadway, downtown or other commercial corridors need a plan that accounts for property access and lease obligations. Start with an inventory and the date the premises must be handed back; the consultation establishes the next steps.",
      ] },
    ],
    preparation: "For your Denver consultation, have the property deadline, building access rules and a room-by-room outline ready. Keep documents and family-reserved belongings separate from anything you want evaluated for sale.",
  },
  "castle-rock": {
    title: "Estate Sales & Cleanouts in Castle Rock",
    description: "Castle Rock estate sales, property cleanouts and business liquidation. 35% auction or consignment commission; separate cleanout quotes after a walk-through.",
    introduction: "Estate sales and property cleanouts in Castle Rock need to account for both the contents and the property layout. JSG Liquidators offers online auctions, e-commerce consignment, estate cleanouts and business liquidation with free consultations and separate written pricing for each service.",
    sections: [
      { heading: "From Castle Rock neighborhoods to acreage properties", paragraphs: [
        "A home in The Meadows or Crystal Valley can involve several rooms, a garage and basement storage. A property outside town may also have a workshop, shed or outbuilding. Include every area you want reviewed in the initial conversation so the scope is not based only on the main house.",
        "Set aside family belongings and decide what should remain on the property before a sale plan is prepared. Tools, furnishings and approved collections can be reviewed for auction or consignment. Having an item evaluated does not commit you to selling it, and not every item will be suitable for a listing.",
      ] },
      { heading: "Planning removal around driveways and deadlines", paragraphs: [
        "Long driveways, stairs, uneven loading areas and neighborhood rules can affect the work involved. Share access details and any HOA requirements during the walk-through. For rural parcels, identify which outbuildings are included and whether the route to them is usable for removal work.",
        "Douglas County winter conditions can affect access, so timing should be discussed rather than assumed. Bring your move date, closing date or lease deadline to the consultation. The agreed cleanout scope and the sale plan are distinct; neither should be based on an expectation that all contents will sell.",
      ] },
      { heading: "Auction, consignment and business asset decisions", paragraphs: [
        "Castle Rock households may have furniture, shop tools, Western décor or recreational equipment to consider. A review looks at the actual condition and the fit for online sale rather than promising a value based on the item category. Sale proceeds vary and are never guaranteed to cover removal costs.",
        "For a shop, office or other commercial property, list the equipment and furnishings you own and want liquidated. Flag leased assets or items belonging to someone else. JSG can discuss a business liquidation plan separately from the work required to clear the premises under your approved instructions.",
      ] },
    ],
    preparation: "For a Castle Rock walk-through, include garage, shed and workshop contents in your outline. Gather access instructions, the property handover date and details of any items that are not yours to sell.",
  },
  englewood: {
    title: "Estate Sales & Cleanouts in Englewood",
    description: "Englewood estate sales, cleanouts and e-commerce consignment. Review your options, the 35% sale commission and separate upfront quotes. Free walk-through.",
    introduction: "Estate sales and estate cleanouts in Englewood can be arranged together or separately. JSG Liquidators helps households and businesses review approved belongings, choose suitable online selling options and define any removal work before agreeing to a written plan.",
    sections: [
      { heading: "Sorting Englewood basements, garages and homes", paragraphs: [
        "Established bungalows and ranch homes can hold a substantial amount of contents in relatively compact spaces. A walk-through looks beyond the main rooms to basement storage, garages and any furniture that will require careful access planning. Start by identifying family papers and belongings you want to keep.",
        "For a move from a home near downtown Englewood or a transition involving a newer townhome, tell us what is staying and where you are moving next. That helps distinguish a selective sale from a full cleanout. You do not need to authorize removal of everything simply to explore auction or consignment options.",
      ] },
      { heading: "Mid-century pieces and other approved contents", paragraphs: [
        "Furniture, lighting, tools and collections can be considered for online auction or e-commerce consignment based on their condition and suitability. Mid-century pieces are one category to discuss, not a guarantee of value. Share damage, missing components or other known details so the review is grounded in the actual item.",
        "Selling services carry the same commission whether an approved item is sold through auction or e-commerce consignment. A cleanout is a separate job with a separate upfront quote. If sale proceeds later help you recover part of that expense, that is an opportunity rather than a promised outcome.",
      ] },
      { heading: "Loading access and Englewood business liquidation", paragraphs: [
        "Narrow lots, alley-loaded garages and limited street parking can change how removal work is planned. Building managers may also have loading or work-hour requirements. Bring those instructions to the consultation along with your lease or property handover deadline.",
        "JSG provides business liquidation for offices, shops and other commercial spaces in Englewood. An inventory of owned assets helps separate items approved for sale from fixtures, leased equipment or belongings that must remain. The plan can include selling suitable assets and separately quoting the work to remove remaining approved contents.",
      ] },
    ],
    preparation: "For your Englewood consultation, note basement stairs, alley access and parking restrictions. Make a keep-or-sell outline and identify any furniture or equipment that belongs to a landlord or another owner.",
  },
  littleton: {
    title: "Estate Sales & Cleanouts in Littleton",
    description: "Littleton estate sales, downsizing and cleanouts. 35% auction and e-commerce commission; cleanouts paid upfront under a separate quote. Free consultation.",
    introduction: "Estate sales and estate cleanouts in Littleton start with your priorities: preserving family belongings, selling approved items and deciding what needs to leave the property. JSG Liquidators offers online auctions, e-commerce consignment and separately quoted cleanout work for local households and businesses.",
    sections: [
      { heading: "Littleton downsizing and family estate transitions", paragraphs: [
        "A historic home near downtown Littleton can have different storage and access needs from a larger suburban property in the surrounding service area. During a walk-through, identify the rooms included, belongings reserved for family and any basement or garage contents that need attention.",
        "If you are downsizing, decide what fits the next home before approving items for sale. Photographs, documents and sentimental pieces should be separated first. JSG then discusses suitable auction or consignment options for the remaining approved belongings and any removal work you want included in a quote.",
      ] },
      { heading: "A property-specific plan for Littleton and nearby areas", paragraphs: [
        "Littleton and nearby communities such as Ken Caryl and Columbine have varied home layouts and access conditions. Stairs, carry distances, steep drives and neighborhood restrictions can all affect a cleanout. Tell us about property manager or HOA instructions before a work date is agreed.",
        "Your closing, moving or lease deadline should be part of the first discussion. The written scope identifies the work selected rather than relying on a general promise to clear everything. Auction outcomes remain separate from the upfront cleanout charge, even when both services are part of the same property plan.",
      ] },
      { heading: "Choosing a sale route for Littleton belongings", paragraphs: [
        "Furniture, antiques, tools, recreational gear and collections can be reviewed for online sale. Condition and listing suitability guide the discussion; a family history or an original purchase price alone does not establish what an item will sell for. You approve the items and terms before anything is listed.",
        "Littleton businesses can also discuss liquidation of owned furniture, equipment and approved assets. Bring an inventory and explain what must stay in the premises. For household and commercial projects alike, cleanout labor and removal are quoted separately from the commission charged on completed sales.",
      ] },
    ],
    preparation: "For your Littleton walk-through, list family-reserved items, the spaces to review and the date the property needs to be ready. Share access restrictions and explain whether you need selling services, removal work or both.",
  },
};