// City-specific local notes used to make every /areas/{city}/{service} page distinct.
// Only well-known, publicly verifiable facts about each place. No JSG results,
// job counts or performance claims belong here.

export interface CityLocalProfile {
  slug: string;
  neighborhoods: string[];
  /** Typical housing stock and what that means for contents. */
  homes: string;
  /** Parking, stairs, HOA, weather, road or loading considerations. */
  access: string;
  /** Commercial areas relevant to business liquidation. */
  commerce: string;
  /** What kinds of items commonly turn up / buyer interest notes. */
  market: string;
}

export const cityLocalProfiles: CityLocalProfile[] = [
  {
    slug: "denver",
    neighborhoods: ["Capitol Hill", "Washington Park", "Park Hill", "Highland", "Central Park", "University", "Cherry Creek"],
    homes: "Denver mixes early-1900s Denver Squares and Victorians in Capitol Hill and Highland with mid-century ranches in Harvey Park and newer homes in Central Park. Older homes often have full basements and detached garages that hold decades of stored belongings.",
    access: "Many central Denver streets have permit or limited parking, alleys behind homes, and multi-story condo buildings with elevator reservations. We plan truck placement, loading windows and building rules before the work day.",
    commerce: "Denver's commercial activity spans downtown and LoDo offices, the restaurant and retail corridors along South Broadway, Colfax and Tennyson Street, and industrial space in RiNo and along I-70.",
    market: "Denver homes regularly turn up mid-century furniture, Western and Southwestern art, vintage sports items and quality tools that can draw interest from online buyers beyond the metro.",
  },
  {
    slug: "aurora",
    neighborhoods: ["Original Aurora", "Heather Gardens", "Saddle Rock", "Southlands", "Murphy Creek", "Tallyn's Reach", "Hoffman Heights"],
    homes: "Aurora ranges from 1950s ranches in Hoffman Heights and Original Aurora to the Heather Gardens active-adult community and large 2000s-era homes in Saddle Rock and Tallyn's Reach, so jobs run from compact condos to big suburban houses.",
    access: "Many Aurora neighborhoods have HOA rules about trucks, dumpsters and work hours, and condo communities such as Heather Gardens have their own building procedures. We confirm those rules during the consultation.",
    commerce: "Aurora businesses cluster along East Colfax and Havana Street, around the Anschutz Medical Campus and Fitzsimons, and in newer retail centers near Southlands and the E-470 corridor.",
    market: "With Buckley Space Force Base nearby, Aurora estates sometimes include military memorabilia and collections gathered over many moves, along with furniture and household goods suited to online sale.",
  },
  {
    slug: "lakewood",
    neighborhoods: ["Belmar", "Green Mountain", "Bear Creek", "Applewood", "Lakewood Heights", "Bonnie Brae", "Union Square"],
    homes: "Lakewood is largely post-war ranches and split-levels, with Green Mountain and Bear Creek homes backing onto open space. Many long-time owners have basements, workshops and garages that need careful sorting before a sale or move.",
    access: "Hillside lots near Green Mountain can mean steep driveways and stairs, while apartments and townhomes around Belmar often have limited loading space. We factor those details into labor and scheduling.",
    commerce: "Lakewood's business areas include the Belmar district, the West Colfax corridor, the Denver Federal Center area and office parks along Union Boulevard and Sixth Avenue.",
    market: "Lakewood homes often hold woodworking and mechanical tools, mid-century furnishings and outdoor gear, which can be well suited to online auction listings.",
  },
  {
    slug: "highlands-ranch",
    neighborhoods: ["Northridge", "Eastridge", "Southridge", "Westridge", "Backcountry", "Highlands Ranch Town Center", "Wildcat Mountain"],
    homes: "Highlands Ranch is a master-planned community built mostly from the 1980s onward, with two-story family homes, finished basements and three-car garages. Downsizing households often have several rooms of furniture and sporting goods to place.",
    access: "The Highlands Ranch Community Association and many sub-HOAs set rules on parking, storage containers and exterior work. Gated sections such as Backcountry require advance access arrangements.",
    commerce: "Business activity centers on Highlands Ranch Town Center, the medical and office buildings along Lucent Boulevard and University Boulevard, and retail along C-470.",
    market: "Typical contents include quality bedroom and dining sets, exercise equipment, bicycles and recreational gear, plus home décor that can be grouped into online lots.",
  },
  {
    slug: "castle-rock",
    neighborhoods: ["The Meadows", "Crystal Valley Ranch", "Downtown Castle Rock", "Founders Village", "Terrain", "Plum Creek"],
    homes: "Castle Rock combines a historic downtown with large newer communities such as The Meadows and Crystal Valley Ranch, plus acreage properties outside town that may include barns, shops and outbuildings.",
    access: "Rural parcels can mean long gravel drives and outbuildings to clear, while planned neighborhoods often have HOA rules. Douglas County winter weather can also affect scheduling on the hilly roads.",
    commerce: "Commercial activity includes downtown shops along Wilcox and Perry Streets, the Promenade and Outlets at Castle Rock, and businesses along the I-25 corridor.",
    market: "Castle Rock properties may include ranch and farm equipment, Western décor, saddles and tack, and shop tools alongside everyday household furnishings.",
  },
  {
    slug: "englewood",
    neighborhoods: ["Downtown Englewood", "Cherry Hills Village area", "Bates-Logan", "Hampden", "Romans Park", "Arapahoe Acres"],
    homes: "Englewood has compact post-war bungalows and ranches, the mid-century modern Arapahoe Acres historic district, and newer townhomes near CityCenter. Smaller homes often hold dense contents in basements and garages.",
    access: "Narrow lots and alley-loaded garages are common, and properties near Swedish and Craig Hospital have tighter street parking. We plan the loading area before arrival.",
    commerce: "Englewood businesses line South Broadway, CityCenter Englewood, the medical district around Swedish Medical Center and the light-industrial areas west of Santa Fe Drive.",
    market: "Englewood homes, particularly in and around Arapahoe Acres, can contain mid-century modern furniture and lighting that online buyers actively search for.",
  },
  {
    slug: "littleton",
    neighborhoods: ["Historic Downtown Littleton", "Columbine Valley", "Ken Caryl", "Roxborough", "Southwest Plaza area", "Aspen Grove area"],
    homes: "Littleton includes century-old homes near Main Street, 1960s–1980s suburbs west toward Ken Caryl and Columbine, and foothill properties in Roxborough, so contents range widely from small cottages to large basements.",
    access: "Foothill and Roxborough roads can be winding with steep driveways, and many western subdivisions have HOA rules. We account for travel and carry distance in the plan.",
    commerce: "Littleton's commercial areas include Main Street's shops, the Aspen Grove and Southwest Plaza areas, and offices and industrial space along Santa Fe Drive and C-470.",
    market: "Littleton estates often include antiques and collectibles, camping and fishing gear, and furniture from long-held family homes.",
  },
  {
    slug: "centennial",
    neighborhoods: ["Willow Creek", "Southglenn", "Homestead", "Piney Creek", "Walnut Hills", "Smoky Hill"],
    homes: "Centennial is mostly 1970s–1990s suburban subdivisions such as Willow Creek, Homestead and Piney Creek, with two-story homes and finished basements that families have filled over decades.",
    access: "Nearly every Centennial subdivision has an HOA with rules on trucks and containers. Homes near the Denver Tech Center and Arapahoe Road can have busy-street parking limitations.",
    commerce: "Centennial includes the southern Denver Tech Center, Centennial Airport, The Streets at SouthGlenn and office and flex space along the Arapahoe Road and I-25 corridors.",
    market: "Common items include furniture sets, office furniture, electronics, golf and fitness equipment, and household goods that suit online marketplaces.",
  },
  {
    slug: "parker",
    neighborhoods: ["Stonegate", "Pinery", "Idyllwilde", "Clarke Farms", "Downtown Parker / Mainstreet", "Canterberry Crossing"],
    homes: "Parker grew quickly from the 1990s on, with family subdivisions like Stonegate and Clarke Farms and larger wooded lots in The Pinery. Many homes have three-car garages, finished basements and storage-heavy layouts.",
    access: "HOA rules are common in Parker neighborhoods, and The Pinery's hilly, tree-covered lots can mean longer carry distances. Winter conditions on south-metro roads can shift schedules.",
    commerce: "Parker businesses gather along Mainstreet, Parker Road and the E-470 corridor, including retail centers, restaurants and medical offices around Parker Adventist Hospital.",
    market: "Parker homes frequently include outdoor and recreational equipment, quality furniture and home décor, and shop tools that can be listed online.",
  },
  {
    slug: "arvada",
    neighborhoods: ["Olde Town Arvada", "Ralston Creek", "Candelas", "Leyden Rock", "West Woods", "Lake Arbor"],
    homes: "Arvada spans historic houses near Olde Town, post-war ranches in Lake Arbor and central Arvada, and newer master-planned homes in Candelas and Leyden Rock toward the foothills.",
    access: "Older central streets are narrow with alley access, while foothill neighborhoods may have HOA rules and steeper driveways. We plan truck access for each.",
    commerce: "Arvada's commercial areas include Olde Town's storefronts, the Ralston Road and Wadsworth Boulevard corridors, and light-industrial space near I-70 and Ward Road.",
    market: "Arvada estates commonly turn up vintage tools, antiques and collectibles from long-time family homes, along with mid-century furniture.",
  },
  {
    slug: "westminster",
    neighborhoods: ["Downtown Westminster", "Hyland Hills", "Legacy Ridge", "Countryside", "Bradburn", "Sheridan Green"],
    homes: "Westminster includes 1960s–1970s neighborhoods near Hyland Hills, golf-course homes in Legacy Ridge and newer urban-style homes in Bradburn and Downtown Westminster.",
    access: "Townhome and condo communities often limit parking and container placement, and Legacy Ridge and Bradburn have HOA requirements. We confirm the rules before scheduling.",
    commerce: "Westminster businesses sit along the US-36 corridor, around The Orchard Town Center and the new Downtown Westminster, and in office parks near Church Ranch.",
    market: "Westminster homes often have furniture, golf equipment, electronics and collectibles suitable for online auction or marketplace listings.",
  },
  {
    slug: "thornton",
    neighborhoods: ["Original Thornton", "Eastlake", "Riverdale", "Thorncreek", "Hunters Glen", "Todd Creek area"],
    homes: "Thornton grew from 1950s starter ranches in Original Thornton to large subdivisions north of 120th Avenue and semi-rural lots toward Todd Creek, giving a wide mix of property sizes.",
    access: "Northern subdivisions often have HOAs, and semi-rural parcels can include sheds and outbuildings. Wind and winter weather on the plains can affect outdoor work days.",
    commerce: "Thornton's business areas include retail along I-25 and 104th Avenue, the Thornton Town Center redevelopment, and industrial and warehouse space near E-470.",
    market: "Thornton properties commonly include tools, automotive and garage items, furniture and household goods, plus occasional collectibles.",
  },
  {
    slug: "wheat-ridge",
    neighborhoods: ["Applewood (Wheat Ridge side)", "Paramount Heights", "Fruitdale", "Clear Creek", "Bel Aire", "Kipling corridor"],
    homes: "Wheat Ridge is known for mid-century ranches on generous lots, many owned by the same family for decades, with workshops, sheds and large garages that hold substantial collections.",
    access: "Larger lots usually give good truck access, but older homes can have narrow basement stairs and detached outbuildings. We plan labor and carry routes for these features.",
    commerce: "Wheat Ridge businesses line 38th Avenue, Kipling Street and Wadsworth Boulevard, with medical offices around Lutheran Medical Center and light-industrial space near I-70.",
    market: "Long-held Wheat Ridge homes often include vintage tools, garden and shop equipment, mid-century furniture and family collections.",
  },
  {
    slug: "golden",
    neighborhoods: ["Downtown Golden", "Mesa Meadows", "Golden Gate Canyon area", "Village at Mountain Ridge", "Applewood (Golden side)", "Canyon Point"],
    homes: "Golden has historic homes near Washington Avenue and the Colorado School of Mines, foothill properties on hillsides and canyon roads, and newer neighborhoods on its edges.",
    access: "Hillside lots, canyon roads and steep driveways are common around Golden, and downtown streets have limited parking. Mountain weather can also affect access to properties up the canyons.",
    commerce: "Golden's business areas include Washington Avenue's shops and restaurants, the Coors brewery area, and office and research space near Colorado School of Mines and the Denver West area.",
    market: "Golden properties can include outdoor and mountaineering gear, mineral and rock collections, scientific instruments, Western art and antiques.",
  },
  {
    slug: "boulder",
    neighborhoods: ["Mapleton Hill", "Whittier", "Table Mesa", "Gunbarrel", "North Boulder", "Martin Acres"],
    homes: "Boulder's housing ranges from historic Mapleton Hill and Whittier homes to 1960s neighborhoods like Table Mesa and Martin Acres and mountain properties west of town.",
    access: "Many central Boulder streets have neighborhood parking permits and tight alleys, while mountain homes can have steep, narrow drives. We plan around those limits.",
    commerce: "Boulder businesses concentrate around Pearl Street, the Twenty Ninth Street area, the University of Colorado and technology and office parks in Gunbarrel and East Boulder.",
    market: "Boulder homes often include outdoor and cycling gear, books, art, mid-century furniture and specialty electronics.",
  },
  {
    slug: "fort-collins",
    neighborhoods: ["Old Town", "Midtown", "Harmony corridor", "Rigden Farm", "Southridge", "Campus West"],
    homes: "Fort Collins has historic homes around Old Town, student-area rentals near Colorado State University, mid-century neighborhoods in Midtown and newer subdivisions to the southeast.",
    access: "Old Town streets and rentals near campus can have tight parking, and newer subdivisions often have HOA rules. Longer travel from the Denver metro is built into the schedule and quote.",
    commerce: "Fort Collins' business areas include Old Town, the College Avenue and Harmony Road corridors and technology and manufacturing employers on the city's east side.",
    market: "Fort Collins properties can include agricultural and ranch items, outdoor gear, brewing equipment, books and furniture.",
  },
  {
    slug: "colorado-springs",
    neighborhoods: ["Old Colorado City", "Broadmoor", "Briargate", "Rockrimmon", "Northgate", "Downtown Colorado Springs"],
    homes: "Colorado Springs ranges from Victorian homes in Old Colorado City and near downtown to estates around the Broadmoor and large newer subdivisions in Briargate and Northgate.",
    access: "Hillside homes in Rockrimmon and near the Broadmoor can have steep drives, and northern subdivisions often have HOA rules. Travel time from the Denver metro is reflected in the plan and quote.",
    commerce: "Colorado Springs businesses include downtown offices, retail along Academy Boulevard and the Powers corridor, and companies supporting its several military installations.",
    market: "With multiple military bases nearby, Colorado Springs estates may include military memorabilia, along with Western art, antiques and outdoor equipment.",
  },
];

export const getCityLocalProfile = (slug: string): CityLocalProfile | undefined =>
  cityLocalProfiles.find((profile) => profile.slug === slug);
