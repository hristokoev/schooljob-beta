function convertFilesize(bytes: number): string {
    const sizes = ["Bytes", "KB", "MB", "GB", "TB"]
    if (bytes === 0) return "0 Byte"
    const i = parseInt(String(Math.floor(Math.log(bytes) / Math.log(1024))), 10)

    return Math.round(bytes / Math.pow(1024, i)) + " " + sizes[i]
}

export { convertFilesize }
