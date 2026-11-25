import { useState } from "react";
import { motion } from "framer-motion";
import { CalendarCheck, Clock, CheckCircle2, Send, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Layout } from "@/components/layout/Layout";
import { SEOHead } from "@/components/seo/SEOHead";
import { z } from "zod";
import { requestWalkthrough, TIME_WINDOWS } from "@/lib/requestWalkthrough.functions";

const walkthroughSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100, "Name must be less than 100 characters"),
  email: z.string().trim().email("Please enter a valid email").max(255, "Email must be less than 255 characters"),
  phone: z.string().trim().min(7, "Please enter a phone number").max(20, "Phone must be less than 20 characters"),
  propertyCity: z.string().trim().min(1, "Property city is required").max(100, "City must be less than 100 characters"),
  propertyAddress: z.string().trim().max(200, "Address must be less than 200 characters").optional(),
  serviceInterest: z.string().max(100).optional(),
  preferredDate: z
    .string()
    .min(1, "Please pick a date")
    .refine((d) => {
      const day = new Date(`${d}T12:00:00`).getDay();
      return day >= 1 && day <= 5;
    }, "Walk-throughs are scheduled Monday through Friday"),
  preferredTimeWindow: z.string().min(1, "Please pick a time window"),
  notes: z.string().trim().max(2000, "Notes must be less than 2000 characters").optional(),
});

const services = [
  "Estate Sale Auction",
  "E-Commerce Consignment",
  "Business Liquidation",
  "Estate Cleanout",
  "Junk Removal",
  "Not Sure - Need Consultation",
];

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const Walkthrough = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    propertyCity: "",
    propertyAddress: "",
    serviceInterest: "",
    preferredDate: "",
    preferredTimeWindow: "",
    notes: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors({});

    try {
      const validatedData = walkthroughSchema.parse(formData);
      await requestWalkthrough({
        data: {
          ...validatedData,
          propertyAddress: validatedData.propertyAddress ?? "",
          serviceInterest: validatedData.serviceInterest ?? "",
          notes: validatedData.notes ?? "",
          preferredTimeWindow: validatedData.preferredTimeWindow as (typeof TIME_WINDOWS)[number],
        },
      });

      setIsSubmitted(true);
      window.__lovableEvents?.track?.("project.walkthrough_requested", {
        service_interest: formData.serviceInterest || "unspecified",
      });
      setFormData({
        name: "",
        email: "",
        phone: "",
        propertyCity: "",
        propertyAddress: "",
        serviceInterest: "",
        preferredDate: "",
        preferredTimeWindow: "",
        notes: "",
      });
      toast({
        title: "Request Received!",
        description: "We'll confirm your walk-through time within 24 hours.",
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors: Record<string, string> = {};
        error.issues.forEach((err) => {
          if (err.path[0]) {
            fieldErrors[err.path[0] as string] = err.message;
          }
        });
        setErrors(fieldErrors);
      } else {
        toast({
          title: "Error",
          description: "Something went wrong. Please try again or call us directly.",
          variant: "destructive",
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout>
      <SEOHead
        title="Free Walk-Through Estimate | Denver Estate Liquidation"
        description="Request a free 1-hour on-site walk-through with JSG Liquidators. Weekday appointments across the Denver metro. Call (805) 444-4069."
        canonical="/walkthrough"
        keywords="free estate walkthrough Denver, estate liquidation estimate, on-site estate consultation Colorado, cleanout quote walkthrough"
        breadcrumbs={[
          { name: "Home", url: "/" },
          { name: "Free Walk-Through", url: "/walkthrough" },
        ]}
      />

      {/* Hero */}
      <section className="py-20 lg:py-28 bg-gradient-hero">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-primary-foreground mb-6">
              Request Your Free 1-Hour Walk-Through
            </h1>
            <p className="text-xl text-primary-foreground/80">
              We visit your property, walk through every room with you, and give you a clear,
              written plan and quote — free, with no obligation. Walk-throughs are scheduled
              Monday through Friday, 8am to 6pm Mountain Time.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Form & What to Expect */}
      <section className="py-20 lg:py-28 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Form */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-6">
                Pick a Day and Time
              </h2>

              {isSubmitted ? (
                <div className="bg-primary/10 rounded-xl p-8 text-center">
                  <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 className="w-8 h-8 text-primary-foreground" />
                  </div>
                  <h3 className="text-xl font-display font-semibold text-foreground mb-2">
                    Request Received!
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    We'll confirm your walk-through time within 24 hours. Need to reach us sooner?
                    Call David at <a href="tel:805-444-4069" className="text-primary font-medium">(805) 444-4069</a>.
                  </p>
                  <Button onClick={() => setIsSubmitted(false)}>Request Another Walk-Through</Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">Name *</Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Your full name"
                        className={errors.name ? "border-destructive" : ""}
                      />
                      {errors.name && <p className="text-sm text-destructive">{errors.name}</p>}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="your@email.com"
                        className={errors.email ? "border-destructive" : ""}
                      />
                      {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone *</Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="(720) 555-0123"
                        className={errors.phone ? "border-destructive" : ""}
                      />
                      {errors.phone && <p className="text-sm text-destructive">{errors.phone}</p>}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="serviceInterest">Service You're Considering</Label>
                      <select
                        id="serviceInterest"
                        name="serviceInterest"
                        value={formData.serviceInterest}
                        onChange={handleChange}
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                      >
                        <option value="">Select a service</option>
                        {services.map((service) => (
                          <option key={service} value={service}>
                            {service}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="propertyCity">Property City *</Label>
                      <Input
                        id="propertyCity"
                        name="propertyCity"
                        value={formData.propertyCity}
                        onChange={handleChange}
                        placeholder="e.g. Highlands Ranch"
                        className={errors.propertyCity ? "border-destructive" : ""}
                      />
                      {errors.propertyCity && <p className="text-sm text-destructive">{errors.propertyCity}</p>}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="propertyAddress">Property Address (optional)</Label>
                      <Input
                        id="propertyAddress"
                        name="propertyAddress"
                        value={formData.propertyAddress}
                        onChange={handleChange}
                        placeholder="Street address"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="preferredDate">Preferred Weekday *</Label>
                      <Input
                        id="preferredDate"
                        name="preferredDate"
                        type="date"
                        value={formData.preferredDate}
                        onChange={handleChange}
                        className={errors.preferredDate ? "border-destructive" : ""}
                      />
                      {errors.preferredDate && <p className="text-sm text-destructive">{errors.preferredDate}</p>}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="preferredTimeWindow">Preferred Time *</Label>
                      <select
                        id="preferredTimeWindow"
                        name="preferredTimeWindow"
                        value={formData.preferredTimeWindow}
                        onChange={handleChange}
                        className={`flex h-10 w-full rounded-md border bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${errors.preferredTimeWindow ? "border-destructive" : "border-input"}`}
                      >
                        <option value="">Select a time window</option>
                        {TIME_WINDOWS.map((window) => (
                          <option key={window} value={window}>
                            {window}
                          </option>
                        ))}
                      </select>
                      {errors.preferredTimeWindow && <p className="text-sm text-destructive">{errors.preferredTimeWindow}</p>}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="notes">Anything We Should Know? (optional)</Label>
                    <Textarea
                      id="notes"
                      name="notes"
                      value={formData.notes}
                      onChange={handleChange}
                      placeholder="Tell us about the property, timeline, or anything else..."
                      rows={4}
                      className={errors.notes ? "border-destructive" : ""}
                    />
                    {errors.notes && <p className="text-sm text-destructive">{errors.notes}</p>}
                  </div>

                  <Button type="submit" variant="accent" size="lg" disabled={isSubmitting} className="w-full sm:w-auto">
                    {isSubmitting ? (
                      "Sending..."
                    ) : (
                      <>
                        Request My Walk-Through
                        <Send className="w-4 h-4" />
                      </>
                    )}
                  </Button>
                </form>
              )}
            </motion.div>

            {/* What to Expect */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-8"
            >
              <div>
                <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-6">
                  What Happens at a Walk-Through
                </h2>
                <p className="text-muted-foreground mb-8">
                  A walk-through is the first step for every estate sale, cleanout, or liquidation
                  project. It takes about an hour, and it's always free.
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-start gap-4 p-4 bg-card rounded-xl border border-border">
                  <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                    <CalendarCheck className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">We walk the property together</h3>
                    <p className="text-muted-foreground text-sm mt-1">
                      We look at every room, identify items with resale value, and note what needs
                      to be hauled, donated, or recycled.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-card rounded-xl border border-border">
                  <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                    <CheckCircle2 className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">You get a written plan and quote</h3>
                    <p className="text-muted-foreground text-sm mt-1">
                      Cleanout work is quoted per job and paid upfront. Auction and consignment
                      sales carry a 35% commission — you keep 65% of each sale. Sale proceeds may
                      help recoup some or all of the cleanout cost, but that's never guaranteed.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-card rounded-xl border border-border">
                  <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                    <Clock className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Weekday appointments</h3>
                    <p className="text-muted-foreground text-sm mt-1">
                      Walk-throughs are scheduled Monday through Friday, 8am to 6pm Mountain Time,
                      across the Denver metro and Front Range.
                    </p>
                  </div>
                </div>

                <a
                  href="tel:805-444-4069"
                  className="flex items-start gap-4 p-4 bg-card rounded-xl border border-border hover:border-primary/30 hover:shadow-md transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Rather talk it through?</h3>
                    <p className="text-lg text-primary font-medium">Call David at (805) 444-4069</p>
                    <p className="text-sm text-muted-foreground">Call or text anytime</p>
                  </div>
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Walkthrough;
