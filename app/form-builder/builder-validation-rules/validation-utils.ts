export const getStringValue = (value: unknown) => String(value ?? '')

export const getNumberValue = (value: unknown) => Number(value)

export const getDateTimestamp = (value: unknown) => {
    const timestamp = new Date(String(value ?? '')).getTime()
    return Number.isNaN(timestamp) ? null : timestamp
}

export const getDelimitedValues = (value: unknown) => {
    return String(value ?? '')
        .split(',')
        .map((item) => item.trim())
        .filter(Boolean)
}

export const getCollectionLength = (value: unknown) => {
    if (typeof FileList !== 'undefined' && value instanceof FileList) {
        return value.length
    }

    if (Array.isArray(value)) {
        return value.length
    }

    if (typeof value === 'object' && value !== null && 'length' in value) {
        const length = value.length
        return typeof length === 'number' ? length : 0
    }

    return 0
}

export const getFiles = (value: unknown) => {
    return typeof FileList !== 'undefined' && value instanceof FileList
        ? Array.from(value)
        : []
}

export const matchesAllowedFileType = (file: File, allowedType: string) => {
    const normalizedType = allowedType.trim().toLowerCase()
    const fileName = file.name.toLowerCase()
    const mimeType = file.type.toLowerCase()

    if (normalizedType.startsWith('.')) {
        return fileName.endsWith(normalizedType)
    }

    if (normalizedType.endsWith('/*')) {
        return mimeType.startsWith(normalizedType.replace('*', ''))
    }

    return mimeType === normalizedType
}