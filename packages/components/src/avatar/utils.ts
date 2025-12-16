export const getInitialsFromText = (text: string, limit = 2): string => {
  const initials =
    text
      ?.trim()
      .split(/[\s\-_.]+/)
      .filter(Boolean)
      .map((word) => word.charAt(0).toUpperCase())
      .join("") || ""

  return initials.slice(0, limit)
}
