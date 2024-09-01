import { formatDistanceToNow, parseISO } from "date-fns"
import { enGB } from "date-fns/locale"

export const DateFormatter = (time) => {
  if (!time) {
    console.log("no time found")
    return
  }

  let timeAgo = formatDistanceToNow(parseISO(time), {
    addSuffix: true,
    locale: enGB,
  })

  // Remove 'about' from the timeAgo string
  timeAgo = timeAgo.replace(" about ", "")
  timeAgo = timeAgo.replace(" minutes ago", " minutes ago")
  timeAgo = timeAgo.replace(" hours ago", " hours ago")

  return timeAgo
}

export function formatDate(dateString) {
  const date = new Date(dateString)

  const options = { year: "numeric", month: "short", day: "numeric" }
  return date.toLocaleDateString("en-US", options)
}
