'use client'

import { SubmittedFile } from "@/app/form-builder/builder-types/form-types"

const isSubmittedFile = (value: unknown): value is SubmittedFile => {
    return typeof value === 'object'
        && value !== null
        && 'name' in value
        && 'size' in value
        && 'type' in value
        && 'dataUrl' in value
}

const isSubmittedFileList = (value: unknown): value is SubmittedFile[] => {
    return Array.isArray(value) && value.every(isSubmittedFile)
}

const formatFileSize = (bytes: number) => {
    if (bytes < 1024) {
        return `${bytes} B`
    }

    if (bytes < 1024 * 1024) {
        return `${(bytes / 1024).toFixed(1)} KB`
    }

    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

const downloadFile = (file: SubmittedFile) => {
    const link = document.createElement('a')
    link.href = file.dataUrl
    link.download = file.name
    link.click()
}

const EmptyValue = () => <span className="text-muted-foreground/40">—</span>

const FileSubmissionValue = ({ files }: { files: SubmittedFile[] }) => (
    files.length > 0 ? (
        <div className="flex flex-col gap-2">
            {files.map((file) => (
                <div key={`${file.name}-${file.size}`} className="flex items-center justify-between gap-3 rounded-lg border border-border bg-muted/40 px-3 py-2">
                    <div className="min-w-0 flex flex-col">
                        <span className="truncate font-medium text-foreground">{file.name}</span>
                        <span className="text-xs text-muted-foreground">{formatFileSize(file.size)}{file.type ? ` • ${file.type}` : ''}</span>
                    </div>
                    <button
                        type="button"
                        onClick={() => downloadFile(file)}
                        className="inline-flex items-center justify-center rounded-md border border-border bg-background px-2.5 py-1.5 text-xs font-medium text-foreground transition-colors hover:border-primary hover:bg-primary hover:text-primary-foreground"
                    >
                        Download
                    </button>
                </div>
            ))}
        </div>
    ) : <EmptyValue />
)

export const SubmissionValue = ({ value }: { value: unknown }) => {
    if (isSubmittedFileList(value)) {
        return <FileSubmissionValue files={value} />
    }

    const hasValue = value !== undefined && value !== null && value !== ''
    return hasValue ? <>{String(value)}</> : <EmptyValue />
}