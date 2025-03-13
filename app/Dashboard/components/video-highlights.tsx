"use client"

import { Play } from "lucide-react"
import { Card, CardContent } from "../ui/card"
import { Button } from "../ui/button"

const highlights = [
  {
    id: 1,
    title: "Event Detection #1",
    timestamp: "2024-02-20 14:23",
    thumbnail: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 2,
    title: "Event Detection #2",
    timestamp: "2024-02-20 15:45",
    thumbnail: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 3,
    title: "Event Detection #3",
    timestamp: "2024-02-20 16:12",
    thumbnail: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 4,
    title: "Event Detection #4",
    timestamp: "2024-02-20 17:30",
    thumbnail: "/placeholder.svg?height=200&width=300",
  },
]

export function VideoHighlights() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {highlights.map((highlight) => (
        <Card key={highlight.id} className="overflow-hidden">
          <CardContent className="p-0">
            <div className="relative">
              <img
                src={highlight.thumbnail || "/placeholder.svg"}
                alt={highlight.title}
                className="aspect-video w-full object-cover"
              />
              <Button
                size="icon"
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-green-700/90 hover:bg-green-700"
              >
                <Play className="h-6 w-6" />
              </Button>
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-green-700">{highlight.title}</h3>
              <p className="text-sm text-muted-foreground">{highlight.timestamp}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

