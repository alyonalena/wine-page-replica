import moment from 'moment'

// Manual Russian month names (genitive case) to avoid locale issues
const MONTHS_RU = [
  'Января',
  'Февраля',
  'Марта',
  'Апреля',
  'Мая',
  'Июня',
  'Июля',
  'Августа',
  'Сентября',
  'Октября',
  'Ноября',
  'Декабря',
]

/**
 * Format date and optional time using moment, with manual Russian month names.
 * Example output: "13 Марта 2026 13:00"
 */
export const formatDateTime = (date?: string, time?: string | null): string => {
  if (!date) return ''

  const value = [date, time || ''].join(' ').trim()
  const m = moment(value)

  if (!m.isValid()) {
    // Fallback to raw values if parsing fails
    return time ? `${date} • ${time}` : date
  }

  const day = m.date()
  const monthIndex = m.month() // 0-11
  const year = m.year()
  const monthName = MONTHS_RU[monthIndex] ?? ''
  const timeStr = m.format('HH:mm')

  return `${day} ${monthName} ${year} ${timeStr}`
}

