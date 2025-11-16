"use client"

import type React from "react"
import { useState, useRef, useCallback, type DragEvent, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { UploadCloud, FileIcon, X } from "lucide-react"

type UploadStatus = "idle" | "dragging" | "success" | "error"

interface FileUploadProps {
  onUploadSuccess?: (file: File) => void
  onUploadError?: (error: string) => void
  onUploadCompleted?: (response: any) => void
  onUploadingChange?: (isUploading: boolean) => void
  maxFileSize?: number // in bytes
  currentFile?: File | null
  isLoadingUpload?: boolean
}

export default function FileUpload({
  onUploadSuccess,
  onUploadError,
  onUploadCompleted,
  onUploadingChange,
  maxFileSize = 10 * 1024 * 1024, // Default 10MB
  currentFile: initialFile = null,
  isLoadingUpload = false,
}: FileUploadProps) {
  const [file, setFile] = useState<File | null>(initialFile)
  const [status, setStatus] = useState<UploadStatus>("idle")
  const [error, setError] = useState<string | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Notify parent about uploading state
  useEffect(() => {
    if (onUploadingChange) onUploadingChange(uploadMediaMutation.isPending)
  }, [uploadMediaMutation.isPending, onUploadingChange])

  useEffect(() => {
    if (file?.type?.startsWith("image/")) {
      const url = URL.createObjectURL(file)
      setPreviewUrl(url)
      return () => URL.revokeObjectURL(url)
    }
    return () => setPreviewUrl(null)
  }, [file])

  const handleFileValidation = (selectedFile: File): boolean => {
    setError(null)
    // type validation: allow only images
    const isImage = selectedFile.type?.startsWith("image/")
    if (!isImage) {
      const err = "Only image files are allowed (PNG, JPG, JPEG, GIF, WEBP)."
      setError(err)
      setStatus("error")
      if (onUploadError) onUploadError(err)
      return false
    }
    if (maxFileSize && selectedFile.size > maxFileSize) {
      const err = `File size exceeds the limit of ${formatBytes(maxFileSize)}.`
      setError(err)
      setStatus("error")
      if (onUploadError) onUploadError(err)
      return false
    }
    return true
  }

  const handleFileSelect = (selectedFile: File | null) => {
    if (!selectedFile) return

    if (!handleFileValidation(selectedFile)) {
      setFile(null)
      return
    }

    setFile(selectedFile)
    setError(null)
    // auto-upload using the same API as avatar upload
    uploadAvatarMutation.mutate(selectedFile, {
      onSuccess: (resp: any) => {
        setStatus("success")
        try {
          onUploadSuccess && onUploadSuccess(selectedFile)
          onUploadCompleted && onUploadCompleted(resp?.data?.data ?? resp)
        } catch (e) {
          // no-op
        }
      },
      onError: (e: any) => {
        const message = e?.message || "Upload failed"
        setError(message)
        setStatus("error")
        onUploadError && onUploadError(message)
      },
    })
  }

  const handleDragOver = useCallback(
    (e: DragEvent<HTMLDivElement>) => {
      e.preventDefault()
      e.stopPropagation()
      if (status !== "success") {
        setStatus("dragging")
      }
    },
    [status],
  )

  const handleDragLeave = useCallback(
    (e: DragEvent<HTMLDivElement>) => {
      e.preventDefault()
      e.stopPropagation()
      if (status === "dragging") {
        setStatus("idle")
      }
    },
    [status],
  )

  const handleDrop = useCallback(
    (e: DragEvent<HTMLDivElement>) => {
      e.preventDefault()
      e.stopPropagation()
      if (status === "success") return

      setStatus("idle")
      const droppedFile = e.dataTransfer.files?.[0]
      if (droppedFile) {
        handleFileSelect(droppedFile)
      }
    },
    [status],
  )

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    handleFileSelect(selectedFile || null)
    if (e.target) e.target.value = ""
  }

  const triggerFileInput = () => {
    if (isLoadingUpload || uploadAvatarMutation.isPending || status === "success") return
    fileInputRef.current?.click()
  }


  const resetState = () => {
    setFile(null)
    setStatus("idle")
    setError(null)
    setPreviewUrl(null)
  }

  // remove manual remove controls in simplified success UI

  const formatBytes = (bytes: number, decimals = 2): string => {
    if (!+bytes) return "0 Bytes"

    const k = 1024
    const dm = decimals < 0 ? 0 : decimals
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"]

    const i = Math.floor(Math.log(bytes) / Math.log(k))
    const unit = sizes[i] || sizes[sizes.length - 1]

    return `${Number.parseFloat((bytes / k ** i).toFixed(dm))} ${unit}`
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardContent className="p-6">
        {(isLoadingUpload || uploadAvatarMutation.isPending) && file ? (
          <div className="flex flex-col items-center space-y-4">
            <div className="w-16 h-16 relative">
              <FileIcon className="w-8 h-8 absolute inset-0 m-auto text-primary" />
            </div>
            <div className="text-center">
              <p className="text-sm font-medium truncate max-w-[200px]" title={file.name}>
                {file.name}
              </p>
              <p className="text-xs text-muted-foreground">Uploading...</p>
            </div>
            <Button onClick={resetState} variant="outline" size="sm" disabled>
              Cancel
            </Button>
          </div>
        ) : file ? (
          <div className="space-y-3">
            {previewUrl && (
              <div className="w-32 h-32 rounded-lg overflow-hidden border">
                <img
                  src={previewUrl || "/placeholder.svg"}
                  alt={`Preview of ${file.name}`}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            {!previewUrl && <FileIcon className="w-16 h-16 text-muted-foreground" />}

            <div className="bg-muted rounded-lg p-3 space-y-2">
              <p className="text-sm font-medium truncate" title={file.name}>
                {file.name}
              </p>
              <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground">
                <div>
                  <span>Size: </span>
                  <span className="font-medium">{formatBytes(file.size)}</span>
                </div>
                <div>
                  <span>Type: </span>
                  <span className="font-medium">{file.type.split("/")[1]?.toUpperCase() || "Unknown"}</span>
                </div>
              </div>
            </div>
          </div>
        ) : status === "idle" || status === "dragging" ? (
          <div
            className={`flex flex-col items-center justify-center p-8 border-2 border-dashed rounded-lg cursor-pointer transition-colors ${
              status === "dragging"
                ? "border-primary bg-primary/5"
                : "border-muted-foreground/25 hover:border-primary hover:bg-primary/5"
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={triggerFileInput}
          >
            <UploadCloud className="w-12 h-12 mb-4 text-muted-foreground" />
            <p className="mb-2 text-sm text-muted-foreground">
              <span className="font-semibold">Click to upload</span> or drag and drop
            </p>
            <p className="text-xs text-muted-foreground">
              Images only (PNG, JPG, JPEG, GIF, WEBP){maxFileSize && ` • Max ${formatBytes(maxFileSize)}`}
            </p>
            <input ref={fileInputRef} type="file" accept="image/*" className="sr-only" onChange={handleFileInputChange} />
          </div>
        ) : status === "success" && file ? (
          (() => {
            const confirmedFile = file as File;
            return (
              <div className="space-y-3">
                <div className="bg-muted rounded-lg p-3 space-y-2">
                  <p className="text-sm font-medium truncate" title={confirmedFile.name}>
                    {confirmedFile.name}
                  </p>
                  <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground">
                    <div>
                      <span>Size: </span>
                      <span className="font-medium">{formatBytes(confirmedFile.size)}</span>
                    </div>
                    <div>
                      <span>Type: </span>
                      <span className="font-medium">{confirmedFile.type.split("/")[1]?.toUpperCase() || "Unknown"}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })()
        ) : status === "error" ? (
          <div className="flex flex-col items-center text-center space-y-4">
            <X className="w-12 h-12 text-destructive" />
            <div>
              <p className="font-medium text-destructive">Upload Failed</p>
              <p className="text-xs text-muted-foreground max-w-xs">{error || "An unknown error occurred."}</p>
            </div>
            <Button onClick={resetState} variant="outline">
              Try Again
            </Button>
          </div>
        ) : null}
      </CardContent>
    </Card>
  )
}