import Link from "next/link"
import { Calendar, ArrowLeft } from "lucide-react"

import { Button } from "@/components/ui/button"

export default function EventNotFound() {
  return (
    <div className="container py-24 flex flex-col items-center justify-center text-center">
      <div className="rounded-full bg-muted p-6 mb-6">
        <Calendar className="h-12 w-12 text-muted-foreground" />
      </div>
      <h1 className="text-3xl font-bold mb-2">Event Not Found</h1>
      <p className="text-muted-foreground max-w-md mb-8">
        The event you're looking for doesn't exist or has been removed.
      </p>
      <Button asChild>
        <Link href="/#shows" className="flex items-center gap-2">
          <ArrowLeft className="h-4 w-4" />
          Back to Events
        </Link>
      </Button>
    </div>
  )
}

