// List of banned words in Spanish
const bannedWords = [
    "mmg",
    "puto",
    "azaroso",
    "rptm",
    "mamaguevaso",
    "mamasemilla",
    // Add more words as needed
  ]
  
  export function containsProfanity(text: string): boolean {
    const lowerText = text.toLowerCase()
  
    // Check for exact matches
    for (const word of bannedWords) {
      if (lowerText.includes(word)) {
        return true
      }
    }
  
    // Check for words with special characters or numbers replacing letters
    const normalizedText = lowerText
      .replace(/0/g, "o")
      .replace(/1/g, "i")
      .replace(/3/g, "e")
      .replace(/4/g, "a")
      .replace(/5/g, "s")
      .replace(/\$/g, "s")
      .replace(/@/g, "a")
  
    for (const word of bannedWords) {
      if (normalizedText.includes(word)) {
        return true
      }
    }
  
    return false
  }
  
  export function censorText(text: string): string {
    let censoredText = text
  
    for (const word of bannedWords) {
      const regex = new RegExp(word, "gi")
      censoredText = censoredText.replace(regex, "*".repeat(word.length))
    }
  
    return censoredText
  }
  
  