"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { Play, Pause, Volume2, Lock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"

interface AudioPlayerProps {
  src: string
  trackTitle?: string
  trackNumber?: number
}

export function AudioPlayer({ src, trackTitle, trackNumber }: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [previewCompleted, setPreviewCompleted] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)
  const PREVIEW_DURATION = 30 // 30 seconds preview limit

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const updateTime = () => {
      const time = audio.currentTime
      setCurrentTime(time)

      // Stop playback at 30 seconds
      if (time >= PREVIEW_DURATION) {
        audio.pause()
        audio.currentTime = PREVIEW_DURATION
        setIsPlaying(false)
        setPreviewCompleted(true) // Mark preview as completed
      }
    }

    const updateDuration = () => setDuration(audio.duration)
    const handleEnded = () => setIsPlaying(false)

    audio.addEventListener("timeupdate", updateTime)
    audio.addEventListener("loadedmetadata", updateDuration)
    audio.addEventListener("ended", handleEnded)

    return () => {
      audio.removeEventListener("timeupdate", updateTime)
      audio.removeEventListener("loadedmetadata", updateDuration)
      audio.removeEventListener("ended", handleEnded)
    }
  }, [])

  const togglePlay = () => {
    const audio = audioRef.current
    if (!audio) return

    // Prevent playing if preview has been completed
    if (previewCompleted) return

    if (isPlaying) {
      audio.pause()
    } else {
      audio.play()
    }
    setIsPlaying(!isPlaying)
  }

  const handleSeek = (value: number[]) => {
    const audio = audioRef.current
    if (!audio) return

    // Restrict seeking to preview duration only
    const seekTime = Math.min(value[0], PREVIEW_DURATION)
    audio.currentTime = seekTime
    setCurrentTime(seekTime)
  }

  const formatTime = (time: number) => {
    if (isNaN(time)) return "0:00"
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, "0")}`
  }

  return (
    <div className="flex items-center gap-2 w-full">
      <audio ref={audioRef} src={src} preload="metadata" />

      <Button
        variant="ghost"
        size="icon"
        onClick={togglePlay}
        className="h-8 w-8 flex-shrink-0"
        aria-label={previewCompleted ? "Preview completed" : isPlaying ? "Pause" : "Play"}
        disabled={previewCompleted}
      >
        {previewCompleted ? (
          <Lock className="h-4 w-4 text-muted-foreground" />
        ) : isPlaying ? (
          <Pause className="h-4 w-4" />
        ) : (
          <Play className="h-4 w-4" />
        )}
      </Button>

      <div className="flex-1 flex items-center gap-2">
        <span className="text-xs text-muted-foreground min-w-[35px]">
          {formatTime(currentTime)}
        </span>
        <Slider
          value={[currentTime]}
          max={PREVIEW_DURATION}
          step={0.1}
          onValueChange={handleSeek}
          className="flex-1"
          disabled={previewCompleted}
        />
        <span className="text-xs text-muted-foreground min-w-[35px]">
          {formatTime(PREVIEW_DURATION)}
        </span>
      </div>

      <Volume2 className="h-4 w-4 text-muted-foreground flex-shrink-0" />

      {previewCompleted ? (
        <Link
          href={`/checkout/track?title=${encodeURIComponent(trackTitle || '')}&number=${trackNumber || 0}`}
          className="text-xs text-primary hover:underline italic ml-2 font-medium"
        >
          Purchase to unlock full track
        </Link>
      ) : duration > PREVIEW_DURATION ? (
        <span className="text-xs text-muted-foreground italic ml-2">
          30s preview
        </span>
      ) : null}
    </div>
  )
}
