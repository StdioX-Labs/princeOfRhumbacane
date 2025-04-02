"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { CalendarIcon, Loader2 } from "lucide-react"
import { format } from "date-fns"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Card, CardContent } from "@/components/ui/card"
import { toast } from "@/components/ui/use-toast"

// Kenyan phone number validation regex
// Accepts formats: +254XXXXXXXXX, 254XXXXXXXXX, 0XXXXXXXXX
const kenyanPhoneRegex = /^(?:\+254|254|0)[17]\d{8}$/

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  phone: z.string().refine((value) => kenyanPhoneRegex.test(value.replace(/\s+/g, "")), {
    message: "Please enter a valid Kenyan phone number (e.g., +254 7XX XXX XXX or 07XX XXX XXX).",
  }),
  requestType: z.enum(["booking", "songwriting", "special"]),

  // Booking specific fields
  eventDate: z.date().optional(),
  eventType: z.string().optional(),
  venueDetails: z.string().optional(),
  expectedAttendees: z.string().optional(),

  // Songwriting specific fields
  songGenre: z.string().optional(),
  collaborationType: z.enum(["remote", "in-person", "both"]).optional(),

  // Special request fields
  requestDetails: z.string().min(10, {
    message: "Please provide details about your request.",
  }),

  budget: z.string().optional(),
  hearAbout: z.string().optional(),
  newsletter: z.boolean().default(false),
})

export function BookingForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      requestType: "booking",
      requestDetails: "",
      venueDetails: "",
      newsletter: false,
    },
  })

  const requestType = form.watch("requestType")

  // Replace the onSubmit function with this enhanced version
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Validate phone number with regex
    const phoneValue = values.phone.replace(/\s+/g, "")
    if (!kenyanPhoneRegex.test(phoneValue)) {
      form.setError("phone", {
        type: "manual",
        message: "Please enter a valid Kenyan phone number (e.g., +254 7XX XXX XXX or 07XX XXX XXX).",
      })
      return
    }

    // Validate that requestDetails is provided
    if (!values.requestDetails || values.requestDetails.trim().length < 10) {
      form.setError("requestDetails", {
        type: "manual",
        message: "Please provide details about your request (minimum 10 characters).",
      })
      return
    }

    // For booking requests, validate additional fields
    if (values.requestType === "booking") {
      if (!values.eventDate) {
        form.setError("eventDate", {
          type: "manual",
          message: "Please select an event date.",
        })
        return
      }

      if (!values.eventType) {
        form.setError("eventType", {
          type: "manual",
          message: "Please select an event type.",
        })
        return
      }
    }

    // For songwriting requests, validate additional fields
    if (values.requestType === "songwriting") {
      if (!values.songGenre) {
        form.setError("songGenre", {
          type: "manual",
          message: "Please select a song genre.",
        })
        return
      }

      if (!values.collaborationType) {
        form.setError("collaborationType", {
          type: "manual",
          message: "Please select a collaboration type.",
        })
        return
      }
    }

    setIsSubmitting(true)

    // Simulate form submission
    setTimeout(() => {
      console.log(values)
      setIsSubmitting(false)
      setSubmitted(true)
      toast({
        title: "Request Submitted",
        description: "Thank you for your submission. We'll get back to you soon!",
      })
    }, 1500)
  }

  if (submitted) {
    return (
      <Card className="p-6">
        <CardContent className="pt-6 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="h-8 w-8 text-primary"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h3 className="mb-2 text-2xl font-bold">Thank You!</h3>
          <p className="mb-6 text-muted-foreground">
            Your request has been submitted successfully. We'll review your information and get back to you as soon as
            possible.
          </p>
          <Button onClick={() => setSubmitted(false)}>Submit Another Request</Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid gap-6 sm:grid-cols-2">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input placeholder="Your name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="your.email@example.com" type="email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone Number</FormLabel>
              <FormControl>
                <Input placeholder="+254 7XX XXX XXX or 07XX XXX XXX" {...field} />
              </FormControl>
              <FormDescription>Please enter a valid Kenyan phone number (mobile or landline).</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="requestType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Request Type</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select the type of request" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="booking">Performance Booking</SelectItem>
                  <SelectItem value="songwriting">Songwriting Proposal</SelectItem>
                  <SelectItem value="special">Special Request</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>Select the nature of your request so we can better assist you.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Booking specific fields */}
        {requestType === "booking" && (
          <div className="space-y-6 rounded-lg border p-6">
            <h3 className="text-lg font-medium">Booking Details</h3>

            <FormField
              control={form.control}
              name="eventDate"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Event Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={`w-full justify-start text-left font-normal ${
                            !field.value && "text-muted-foreground"
                          }`}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {field.value ? format(field.value, "PPP") : "Select date"}
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        initialFocus
                        disabled={(date) => date < new Date()}
                      />
                    </PopoverContent>
                  </Popover>
                  <FormDescription>When would you like to book YABA for your event?</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="eventType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Event Type</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select event type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="concert">Concert</SelectItem>
                      <SelectItem value="festival">Festival</SelectItem>
                      <SelectItem value="corporate">Corporate Event</SelectItem>
                      <SelectItem value="private">Private Party</SelectItem>
                      <SelectItem value="wedding">Wedding</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="venueDetails"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Venue Details</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Please provide details about the venue, location, and any technical specifications..."
                      className="min-h-[100px]"
                      value={field.value || ""}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="expectedAttendees"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Expected Attendees</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select approximate attendance" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="<50">Less than 50</SelectItem>
                      <SelectItem value="50-100">50-100</SelectItem>
                      <SelectItem value="100-250">100-250</SelectItem>
                      <SelectItem value="250-500">250-500</SelectItem>
                      <SelectItem value="500-1000">500-1,000</SelectItem>
                      <SelectItem value="1000+">1,000+</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        )}

        {/* Songwriting specific fields */}
        {requestType === "songwriting" && (
          <div className="space-y-6 rounded-lg border p-6">
            <h3 className="text-lg font-medium">Songwriting Proposal</h3>

            <FormField
              control={form.control}
              name="songGenre"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Song Genre</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select primary genre" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="pop">Pop</SelectItem>
                      <SelectItem value="rock">Rock</SelectItem>
                      <SelectItem value="rnb">R&B</SelectItem>
                      <SelectItem value="hiphop">Hip Hop</SelectItem>
                      <SelectItem value="electronic">Electronic</SelectItem>
                      <SelectItem value="folk">Folk</SelectItem>
                      <SelectItem value="jazz">Jazz</SelectItem>
                      <SelectItem value="classical">Classical</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="collaborationType"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Collaboration Type</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-1"
                    >
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="remote" />
                        </FormControl>
                        <FormLabel className="font-normal">Remote Collaboration</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="in-person" />
                        </FormControl>
                        <FormLabel className="font-normal">In-Person Sessions</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="both" />
                        </FormControl>
                        <FormLabel className="font-normal">Combination of Both</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        )}

        <FormField
          control={form.control}
          name="requestDetails"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Request Details</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Please provide detailed information about your request..."
                  className="min-h-[150px]"
                  value={field.value || ""}
                  onChange={field.onChange}
                />
              </FormControl>
              <FormDescription>The more details you provide, the better we can understand your needs.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="budget"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Budget Range (Optional)</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your budget range" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="<100000">Less than KES 100,000</SelectItem>
                  <SelectItem value="100000-500000">KES 100,000 - 500,000</SelectItem>
                  <SelectItem value="500000-1000000">KES 500,000 - 1,000,000</SelectItem>
                  <SelectItem value="1000000-2500000">KES 1,000,000 - 2,500,000</SelectItem>
                  <SelectItem value="2500000+">KES 2,500,000+</SelectItem>
                  <SelectItem value="flexible">Flexible/Negotiable</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>This helps us understand the scope of your request.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="hearAbout"
          render={({ field }) => (
            <FormItem>
              <FormLabel>How did you hear about YABA? (Optional)</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select an option" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="social">Social Media</SelectItem>
                  <SelectItem value="friend">Friend or Colleague</SelectItem>
                  <SelectItem value="event">Live Event</SelectItem>
                  <SelectItem value="press">Press or Media</SelectItem>
                  <SelectItem value="search">Search Engine</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="newsletter"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
              <FormControl>
                <Checkbox checked={field.value} onCheckedChange={field.onChange} />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>Subscribe to newsletter</FormLabel>
                <FormDescription>
                  Receive updates about new releases, upcoming shows, and exclusive content.
                </FormDescription>
              </div>
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Submitting...
            </>
          ) : (
            "Submit Request"
          )}
        </Button>
      </form>
    </Form>
  )
}

