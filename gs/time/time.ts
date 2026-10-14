import * as $ from '../builtin/index.js'
import { makeChannel, ChannelRef, makeChannelRef } from '../builtin/channel.js'

// zeroTimeMillis is the Unix time in milliseconds of the zero Time,
// January 1, year 1, 00:00:00 UTC, as in Go.
const zeroTimeMillis = -62135596800000

// Time represents a time instant with nanosecond precision.
export class Time {
  // __typeInfo registers Time with the runtime type system (see below).
  static __typeInfo: $.StructTypeInfo

  private _date: globalThis.Date
  private _nsec: number // nanoseconds within the millisecond
  private _monotonic?: number // high-resolution monotonic timestamp in nanoseconds
  private _location: Location // timezone location

  constructor(_props?: {}) {
    // Default constructor creates the zero time, January 1, year 1, 00:00:00 UTC
    this._date = new globalThis.Date(zeroTimeMillis)
    this._nsec = 0
    this._monotonic = undefined
    this._location = UTC
  }

  // create adds submillisecond precision to a wall clock and normalizes carries.
  public static create(
    date: globalThis.Date,
    nsec: number = 0,
    monotonic?: number,
    location?: Location,
  ): Time {
    const time = new Time()
    const milliseconds = Math.floor(nsec / 1000000)
    time._date = new globalThis.Date(date.getTime() + milliseconds)
    time._nsec = nsec - milliseconds * 1000000
    time._monotonic = monotonic
    time._location = location || UTC
    return time
  }

  // clone returns a copy of this Time instance
  public clone(): Time {
    return Time.create(this._date, this._nsec, this._monotonic, this._location)
  }

  // Unix returns t as a Unix time, the number of seconds elapsed since January 1, 1970 UTC
  public Unix(): bigint {
    return BigInt(Math.floor(this._date.getTime() / 1000))
  }

  // UnixMilli returns t as a Unix time, the number of milliseconds elapsed since January 1, 1970 UTC
  public UnixMilli(): bigint {
    return BigInt(this._date.getTime())
  }

  // UnixMicro returns t as a Unix time, the number of microseconds elapsed since January 1, 1970 UTC
  public UnixMicro(): bigint {
    return (
      BigInt(this._date.getTime()) * 1000n +
      BigInt(Math.floor(this._nsec / 1000))
    )
  }

  // UnixNano returns t as a Unix time, the number of nanoseconds elapsed since January 1, 1970 UTC
  public UnixNano(): bigint {
    return BigInt(this._date.getTime()) * 1000000n + BigInt(this._nsec)
  }

  // Weekday returns the day of the week specified by t
  public Weekday(): Weekday {
    if (this._location.offsetSeconds !== undefined) {
      const offsetMs = this._location.offsetSeconds * 1000
      const adjustedTime = new globalThis.Date(this._date.getTime() + offsetMs)
      return adjustedTime.getUTCDay() as Weekday
    }
    return this._date.getDay() as Weekday
  }

  // Day returns the day of the month specified by t
  public Day(): number {
    if (this._location.offsetSeconds !== undefined) {
      const offsetMs = this._location.offsetSeconds * 1000
      const adjustedTime = new globalThis.Date(this._date.getTime() + offsetMs)
      return adjustedTime.getUTCDate()
    }
    return this._date.getDate()
  }

  // Month returns the month of the year specified by t
  public Month(): Month {
    if (this._location.offsetSeconds !== undefined) {
      const offsetMs = this._location.offsetSeconds * 1000
      const adjustedTime = new globalThis.Date(this._date.getTime() + offsetMs)
      return (adjustedTime.getUTCMonth() + 1) as Month
    }
    return (this._date.getMonth() + 1) as Month
  }

  // Year returns the year in which t occurs
  public Year(): number {
    if (this._location.offsetSeconds !== undefined) {
      const offsetMs = this._location.offsetSeconds * 1000
      const adjustedTime = new globalThis.Date(this._date.getTime() + offsetMs)
      return adjustedTime.getUTCFullYear()
    }
    return this._date.getFullYear()
  }

  // Hour returns the hour within the day specified by t, in the range [0, 23]
  public Hour(): number {
    if (this._location.offsetSeconds !== undefined) {
      const offsetMs = this._location.offsetSeconds * 1000
      const adjustedTime = new globalThis.Date(this._date.getTime() + offsetMs)
      return adjustedTime.getUTCHours()
    }
    return this._date.getHours()
  }

  // Minute returns the minute offset within the hour specified by t, in the range [0, 59]
  public Minute(): number {
    if (this._location.offsetSeconds !== undefined) {
      const offsetMs = this._location.offsetSeconds * 1000
      const adjustedTime = new globalThis.Date(this._date.getTime() + offsetMs)
      return adjustedTime.getUTCMinutes()
    }
    return this._date.getMinutes()
  }

  // Second returns the second offset within the minute specified by t, in the range [0, 59]
  public Second(): number {
    if (this._location.offsetSeconds !== undefined) {
      const offsetMs = this._location.offsetSeconds * 1000
      const adjustedTime = new globalThis.Date(this._date.getTime() + offsetMs)
      return adjustedTime.getUTCSeconds()
    }
    return this._date.getSeconds()
  }

  // Nanosecond returns the nanosecond offset within the second specified by t, in the range [0, 999999999]
  public Nanosecond(): number {
    return this._date.getUTCMilliseconds() * 1000000 + this._nsec
  }

  public Date(): [number, Month, number] {
    return [this.Year(), this.Month(), this.Day()]
  }

  public Clock(): [number, number, number] {
    return [this.Hour(), this.Minute(), this.Second()]
  }

  public Zone(): [string, number] {
    if (this._location.offsetSeconds !== undefined) {
      return [this._location.name, this._location.offsetSeconds]
    }
    const offset = -this._date.getTimezoneOffset() * 60
    return [localZoneAbbreviation(this._date, offset), offset]
  }

  // Location returns the time zone information associated with t
  public Location(): Location {
    return this._location
  }

  // Local returns t with the location set to local time.
  public Local(): Time {
    return Time.create(this._date, this._nsec, undefined, Local)
  }

  // UTC returns t with the location set to UTC.
  public UTC(): Time {
    return Time.create(this._date, this._nsec, undefined, UTC)
  }

  // In returns a copy of t representing the same instant in loc.
  public In(loc: Location | $.VarRef<Location> | null): Time {
    if (loc === null) {
      throw new Error('time: missing Location in call to Time.In')
    }
    return Time.create(this._date, this._nsec, undefined, $.pointerValue(loc))
  }

  public AppendFormat(b: $.Bytes | null, layout: string): $.Bytes {
    return $.appendSlice(b, $.stringToBytes(this.Format(layout))) as $.Bytes
  }

  // Format returns a textual representation of the time value formatted according to the layout
  public Format(layout: string): string {
    // Implementation of Go's time formatting based on reference time:
    // "Mon Jan 2 15:04:05 MST 2006" (Unix time 1136239445)

    // Calculate the time in the timezone of this Time object
    let year: number, month0: number, dayOfMonth: number, dayOfWeek: number
    let hour24: number, minute: number, second: number

    if (this._location.offsetSeconds !== undefined) {
      // For fixed timezone locations, adjust the UTC time by the offset
      const offsetMs = this._location.offsetSeconds * 1000
      const adjustedTime = new globalThis.Date(this._date.getTime() + offsetMs)

      year = adjustedTime.getUTCFullYear()
      month0 = adjustedTime.getUTCMonth() // 0-11 for array indexing
      dayOfMonth = adjustedTime.getUTCDate() // 1-31
      dayOfWeek = adjustedTime.getUTCDay() // 0 (Sun) - 6 (Sat)
      hour24 = adjustedTime.getUTCHours() // 0-23
      minute = adjustedTime.getUTCMinutes() // 0-59
      second = adjustedTime.getUTCSeconds() // 0-59
    } else {
      // For local time, use the local timezone methods
      year = this._date.getFullYear()
      month0 = this._date.getMonth() // 0-11 for array indexing
      dayOfMonth = this._date.getDate() // 1-31
      dayOfWeek = this._date.getDay() // 0 (Sun) - 6 (Sat)
      hour24 = this._date.getHours() // 0-23
      minute = this._date.getMinutes() // 0-59
      second = this._date.getSeconds() // 0-59
    }

    const nsec = this.Nanosecond()

    const shortMonthNames = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ]
    const longMonthNames = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ]
    const shortDayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    const longDayNames = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ]

    const hour12 = hour24 % 12 || 12 // 12 for 0h and 12h
    const ampmUpper = hour24 < 12 ? 'AM' : 'PM'
    const ampmLower = ampmUpper.toLowerCase()

    // Timezone offset calculation - use the location's offset if available
    let tzOffsetSeconds: number
    let tzName = this._location.name
    let isUTC: boolean

    if (this._location.offsetSeconds !== undefined) {
      // Use the fixed offset from the location
      tzOffsetSeconds = this._location.offsetSeconds
      // Go prints Z for any zero offset, not only for the UTC location.
      isUTC = tzOffsetSeconds === 0
    } else {
      // Fall back to JavaScript's timezone offset (for local time)
      const tzOffsetMinutesJS = this._date.getTimezoneOffset()
      tzOffsetSeconds = -tzOffsetMinutesJS * 60 // Convert to seconds, negate because JS offset is opposite
      isUTC = tzOffsetSeconds === 0
      tzName = localZoneAbbreviation(this._date, tzOffsetSeconds)
    }

    let tzSign = '+'
    if (tzOffsetSeconds < 0) {
      tzSign = '-'
    }
    const absTzOffsetSeconds = Math.abs(tzOffsetSeconds)
    const tzOffsetHours = Math.floor(absTzOffsetSeconds / 3600)
    const tzOffsetMins = Math.floor((absTzOffsetSeconds % 3600) / 60)

    // Helper function to format fractional seconds
    const formatFracSeconds = (n: number, trimZeros: boolean): string => {
      if (n === 0 && trimZeros) return ''
      let str = n.toString().padStart(9, '0')
      if (trimZeros) {
        str = str.replace(/0+$/, '')
      }
      return str.length > 0 ? '.' + str : ''
    }

    let result = ''
    let i = 0

    // Process layout character by character, matching Go's nextStdChunk logic
    while (i < layout.length) {
      let matched = false

      // Check for multi-character patterns first (longest matches first)
      const remaining = layout.slice(i)

      // Fractional seconds with comma/period
      if (remaining.match(/^[.,]999999999/)) {
        result += formatFracSeconds(nsec, true).replace('.', remaining[0])
        i += 10
        matched = true
      } else if (remaining.match(/^[.,]999999/)) {
        const microseconds = Math.floor(nsec / 1000)
        let str = microseconds.toString().padStart(6, '0')
        str = str.replace(/0+$/, '') // trim trailing zeros
        result += str.length > 0 ? remaining[0] + str : ''
        i += 7
        matched = true
      } else if (remaining.match(/^[.,]999/)) {
        const milliseconds = Math.floor(nsec / 1000000)
        let str = milliseconds.toString().padStart(3, '0')
        str = str.replace(/0+$/, '') // trim trailing zeros
        result += str.length > 0 ? remaining[0] + str : ''
        i += 4
        matched = true
      } else if (remaining.match(/^[.,]000000000/)) {
        result += remaining[0] + nsec.toString().padStart(9, '0')
        i += 10
        matched = true
      } else if (remaining.match(/^[.,]000000/)) {
        result +=
          remaining[0] +
          Math.floor(nsec / 1000)
            .toString()
            .padStart(6, '0')
        i += 7
        matched = true
      } else if (remaining.match(/^[.,]000/)) {
        result +=
          remaining[0] +
          Math.floor(nsec / 1000000)
            .toString()
            .padStart(3, '0')
        i += 4
        matched = true
      }
      // Full month/day names
      else if (remaining.startsWith('January')) {
        result += longMonthNames[month0]
        i += 7
        matched = true
      } else if (remaining.startsWith('Monday')) {
        result += longDayNames[dayOfWeek]
        i += 6
        matched = true
      }
      // Year patterns
      else if (remaining.startsWith('2006')) {
        result += String(year).padStart(4, '0')
        i += 4
        matched = true
      }
      // Timezone patterns (order matters - longer patterns first)
      else if (remaining.startsWith('Z070000')) {
        if (isUTC) {
          result += 'Z'
        } else {
          result += `${tzSign}${tzOffsetHours.toString().padStart(2, '0')}${tzOffsetMins.toString().padStart(2, '0')}00`
        }
        i += 7
        matched = true
      } else if (remaining.startsWith('Z07:00:00')) {
        if (isUTC) {
          result += 'Z'
        } else {
          result += `${tzSign}${tzOffsetHours.toString().padStart(2, '0')}:${tzOffsetMins.toString().padStart(2, '0')}:00`
        }
        i += 9
        matched = true
      } else if (remaining.startsWith('Z0700')) {
        if (isUTC) {
          result += 'Z'
        } else {
          result += `${tzSign}${tzOffsetHours.toString().padStart(2, '0')}${tzOffsetMins.toString().padStart(2, '0')}`
        }
        i += 5
        matched = true
      } else if (remaining.startsWith('Z07:00')) {
        if (isUTC) {
          result += 'Z'
        } else {
          result += `${tzSign}${tzOffsetHours.toString().padStart(2, '0')}:${tzOffsetMins.toString().padStart(2, '0')}`
        }
        i += 6
        matched = true
      } else if (remaining.startsWith('Z07')) {
        if (isUTC) {
          result += 'Z'
        } else {
          result += `${tzSign}${tzOffsetHours.toString().padStart(2, '0')}`
        }
        i += 3
        matched = true
      } else if (remaining.startsWith('-070000')) {
        result += `${tzSign}${tzOffsetHours.toString().padStart(2, '0')}${tzOffsetMins.toString().padStart(2, '0')}00`
        i += 7
        matched = true
      } else if (remaining.startsWith('-07:00:00')) {
        result += `${tzSign}${tzOffsetHours.toString().padStart(2, '0')}:${tzOffsetMins.toString().padStart(2, '0')}:00`
        i += 9
        matched = true
      } else if (remaining.startsWith('-0700')) {
        result += `${tzSign}${tzOffsetHours.toString().padStart(2, '0')}${tzOffsetMins.toString().padStart(2, '0')}`
        i += 5
        matched = true
      } else if (remaining.startsWith('-07:00')) {
        result += `${tzSign}${tzOffsetHours.toString().padStart(2, '0')}:${tzOffsetMins.toString().padStart(2, '0')}`
        i += 6
        matched = true
      } else if (remaining.startsWith('-07')) {
        result += `${tzSign}${tzOffsetHours.toString().padStart(2, '0')}`
        i += 3
        matched = true
      }
      // Hour patterns
      else if (remaining.startsWith('15')) {
        result += hour24.toString().padStart(2, '0')
        i += 2
        matched = true
      }
      // Month patterns
      else if (remaining.startsWith('Jan')) {
        result += shortMonthNames[month0]
        i += 3
        matched = true
      }
      // Day patterns
      else if (remaining.startsWith('Mon')) {
        result += shortDayNames[dayOfWeek]
        i += 3
        matched = true
      } else if (remaining.startsWith('MST')) {
        // Use the actual timezone name instead of literal "MST"
        result += tzName
        i += 3
        matched = true
      }
      // AM/PM patterns
      else if (remaining.startsWith('PM')) {
        result += ampmUpper
        i += 2
        matched = true
      } else if (remaining.startsWith('pm')) {
        result += ampmLower
        i += 2
        matched = true
      }
      // Two-digit patterns
      else if (remaining.startsWith('06')) {
        result += (year % 100).toString().padStart(2, '0')
        i += 2
        matched = true
      } else if (remaining.startsWith('_2')) {
        result +=
          dayOfMonth < 10 ? ' ' + dayOfMonth.toString() : dayOfMonth.toString()
        i += 2
        matched = true
      } else if (remaining.startsWith('03')) {
        result += hour12.toString().padStart(2, '0')
        i += 2
        matched = true
      } else if (remaining.startsWith('01')) {
        result += (month0 + 1).toString().padStart(2, '0')
        i += 2
        matched = true
      } else if (remaining.startsWith('02')) {
        result += dayOfMonth.toString().padStart(2, '0')
        i += 2
        matched = true
      } else if (remaining.startsWith('04')) {
        result += minute.toString().padStart(2, '0')
        i += 2
        matched = true
      } else if (remaining.startsWith('05')) {
        result += second.toString().padStart(2, '0')
        i += 2
        matched = true
      }
      // Single digit patterns (must come after two-digit patterns)
      else if (
        layout[i] === '3' &&
        (i === 0 || !'0123456789'.includes(layout[i - 1]))
      ) {
        result += hour12.toString()
        i += 1
        matched = true
      } else if (
        layout[i] === '2' &&
        (i === 0 || !'0123456789'.includes(layout[i - 1]))
      ) {
        result += dayOfMonth.toString()
        i += 1
        matched = true
      } else if (
        layout[i] === '1' &&
        (i === 0 || !'0123456789'.includes(layout[i - 1]))
      ) {
        result += (month0 + 1).toString()
        i += 1
        matched = true
      }
      // Special Z handling for standalone Z
      else if (layout[i] === 'Z' && !remaining.startsWith('Z0')) {
        result += 'Z'
        i += 1
        matched = true
      }

      // If no pattern matched, copy the character literally
      if (!matched) {
        result += layout[i]
        i += 1
      }
    }

    return result
  }

  public YearDay(): number {
    const [year, month0, day] = this.wallDateParts()
    const start = globalThis.Date.UTC(year, 0, 1)
    const current = globalThis.Date.UTC(year, month0, day)
    return Math.floor((current - start) / millisecondsPerDay) + 1
  }

  public ISOWeek(): [number, number] {
    const [year, month0, day] = this.wallDateParts()
    const date = new globalThis.Date(globalThis.Date.UTC(year, month0, day))
    const weekday = date.getUTCDay() || 7
    date.setUTCDate(date.getUTCDate() + 4 - weekday)

    const isoYear = date.getUTCFullYear()
    const yearStart = new globalThis.Date(globalThis.Date.UTC(isoYear, 0, 1))
    const week = Math.ceil(
      ((date.getTime() - yearStart.getTime()) / millisecondsPerDay + 1) / 7,
    )
    return [isoYear, week]
  }

  public AppendBinary(b: $.Bytes | null): [$.Bytes, $.GoError] {
    const [zoneName, zoneOffsetSeconds] = this.Zone()
    let offsetMinutes = -1
    let offsetSeconds = 0
    let version = timeBinaryVersionV1

    if (zoneName !== 'UTC' || zoneOffsetSeconds !== 0) {
      offsetSeconds = zoneOffsetSeconds % 60
      if (offsetSeconds !== 0) {
        version = timeBinaryVersionV2
      }

      offsetMinutes = Math.trunc(zoneOffsetSeconds / 60)
      if (
        offsetMinutes < -32768 ||
        offsetMinutes === -1 ||
        offsetMinutes > 32767
      ) {
        return [b, $.newError('Time.MarshalBinary: unexpected zone offset')]
      }
    }

    const seconds = this.Unix() + unixToInternalSeconds
    const nanos = this.Nanosecond()
    const bytes = new Uint8Array(version === timeBinaryVersionV2 ? 16 : 15)
    bytes[0] = version
    writeInt64BE(bytes, 1, seconds)
    writeInt32BE(bytes, 9, nanos)
    writeInt16BE(bytes, 13, offsetMinutes)
    if (version === timeBinaryVersionV2) {
      bytes[15] = offsetSeconds & 0xff
    }

    if (b == null) {
      return [bytes, null]
    }
    return [$.appendSlice(b, bytes) as $.Bytes, null]
  }

  public MarshalBinary(): [$.Bytes, $.GoError] {
    return this.AppendBinary(null)
  }

  // MarshalJSON implements json.Marshaler. The time is a quoted string in
  // RFC 3339 format with sub-second precision.
  public MarshalJSON(): [$.Bytes, $.GoError] {
    const [text, err] = this.formatRFC3339('Time.MarshalJSON')
    if (err !== null) {
      return [null, err]
    }
    return [$.stringToBytes('"' + text + '"'), null]
  }

  // UnmarshalJSON implements json.Unmarshaler. The time must be a quoted
  // string in RFC 3339 format; null is a no-op.
  public UnmarshalJSON(data: $.Bytes): $.GoError {
    const text = $.bytesToString(data)
    if (text === 'null') {
      return null
    }
    if (text.length < 2 || text[0] !== '"' || text[text.length - 1] !== '"') {
      return $.newError('Time.UnmarshalJSON: input is not a JSON string')
    }
    return this.setFromRFC3339(text.slice(1, -1))
  }

  // MarshalText implements encoding.TextMarshaler. The time is formatted
  // in RFC 3339 format with sub-second precision.
  public MarshalText(): [$.Bytes, $.GoError] {
    const [text, err] = this.formatRFC3339('Time.MarshalText')
    if (err !== null) {
      return [null, err]
    }
    return [$.stringToBytes(text), null]
  }

  // UnmarshalText implements encoding.TextUnmarshaler. The time must be in
  // RFC 3339 format.
  public UnmarshalText(data: $.Bytes): $.GoError {
    return this.setFromRFC3339($.bytesToString(data))
  }

  // formatRFC3339 formats t in RFC 3339 format with sub-second precision,
  // which has a four-digit year. method prefixes the error for a year outside
  // that range.
  private formatRFC3339(method: string): [string, $.GoError] {
    const year = this.Year()
    if (year < 0 || year > 9999) {
      return ['', $.newError(method + ': year outside of range [0,9999]')]
    }
    return [this.Format(RFC3339Nano), null]
  }

  // setFromRFC3339 parses value in RFC 3339 format and sets t to the result,
  // which is the zero Time if value does not parse.
  private setFromRFC3339(value: string): $.GoError {
    const [parsed, err] = Parse(RFC3339, value)
    this._date = parsed._date
    this._nsec = parsed._nsec
    this._monotonic = undefined
    this._location = parsed._location
    return err
  }

  // Sub returns the duration t-u
  // If both times have monotonic readings, use them for accurate duration calculation
  public Sub(u: Time): Duration {
    // If both times have monotonic readings, use them for more accurate duration calculation
    if (this._monotonic !== undefined && u._monotonic !== undefined) {
      // Duration is int64 nanoseconds. Truncate defensively: BigInt() throws a
      // RangeError on any fractional input, and this Sub/Since path is a hard
      // crash boundary the browser asset reader hits during startup.
      const diffNs = this._monotonic - u._monotonic
      return BigInt(Math.trunc(diffNs))
    }

    // Fallback to Date-based calculation
    const diffMs = this._date.getTime() - u._date.getTime()
    const diffNs = this._nsec - u._nsec
    return BigInt(diffMs) * 1000000n + BigInt(diffNs)
  }

  // Add adds the duration d to t, returning the sum
  // Preserves monotonic reading if present
  public Add(d: Duration): Time {
    const duration = BigInt(d)
    const durationNs = Number(duration)
    const newDate = new globalThis.Date(
      this._date.getTime() + Number(duration / 1000000n),
    )
    const newNsec = this._nsec + Number(duration % 1000000n)
    const newMonotonic =
      this._monotonic !== undefined ? this._monotonic + durationNs : undefined
    return Time.create(newDate, newNsec, newMonotonic, this._location)
  }

  public AddDate(years: number, months: number, days: number): Time {
    if (this._location.offsetSeconds !== undefined) {
      const offsetMs = this._location.offsetSeconds * 1000
      const local = new globalThis.Date(this._date.getTime() + offsetMs)
      const shifted = globalThis.Date.UTC(
        local.getUTCFullYear() + years,
        local.getUTCMonth() + months,
        local.getUTCDate() + days,
        local.getUTCHours(),
        local.getUTCMinutes(),
        local.getUTCSeconds(),
        local.getUTCMilliseconds(),
      )
      return Time.create(
        new globalThis.Date(shifted - offsetMs),
        this._nsec,
        undefined,
        this._location,
      )
    }
    const shifted = new globalThis.Date(this._date.getTime())
    shifted.setFullYear(shifted.getFullYear() + years)
    shifted.setMonth(shifted.getMonth() + months)
    shifted.setDate(shifted.getDate() + days)
    return Time.create(shifted, this._nsec, undefined, this._location)
  }

  // Equal reports whether t and u represent the same time instant
  // Uses monotonic clock if both times have it
  public Equal(u: Time): boolean {
    if (this._monotonic !== undefined && u._monotonic !== undefined) {
      return this._monotonic === u._monotonic
    }
    return this._date.getTime() === u._date.getTime() && this._nsec === u._nsec
  }

  public IsZero(): boolean {
    return this.Equal(new Time())
  }

  // Before reports whether the time instant t is before u
  // Uses monotonic clock if both times have it
  public Before(u: Time): boolean {
    if (this._monotonic !== undefined && u._monotonic !== undefined) {
      return this._monotonic < u._monotonic
    }
    const thisMs = this._date.getTime()
    const uMs = u._date.getTime()
    return thisMs < uMs || (thisMs === uMs && this._nsec < u._nsec)
  }

  // After reports whether the time instant t is after u
  // Uses monotonic clock if both times have it
  public After(u: Time): boolean {
    if (this._monotonic !== undefined && u._monotonic !== undefined) {
      return this._monotonic > u._monotonic
    }
    const thisMs = this._date.getTime()
    const uMs = u._date.getTime()
    return thisMs > uMs || (thisMs === uMs && this._nsec > u._nsec)
  }

  // Compare returns -1 if t is before u, +1 if t is after u, and 0 if they are
  // the same instant. Uses monotonic clock if both times have it
  public Compare(u: Time): number {
    if (this.Before(u)) {
      return -1
    }
    if (this.After(u)) {
      return 1
    }
    return 0
  }

  // Round returns the result of rounding t to the nearest multiple of d
  // Strips monotonic reading as per Go specification
  public Round(_d: Duration): Time {
    // Implementation would round to nearest duration
    // For now, simplified version that strips monotonic reading
    return Time.create(this._date, this._nsec, undefined, this._location)
  }

  // Truncate returns the result of rounding t down to a multiple of d
  // Strips monotonic reading as per Go specification
  public Truncate(_d: Duration): Time {
    // Implementation would truncate to duration
    // For now, simplified version that strips monotonic reading
    return Time.create(this._date, this._nsec, undefined, this._location)
  }

  // String returns the time formatted as a string
  public String(): string {
    // Format as "YYYY-MM-DD HH:MM:SS +0000 UTC" to match Go's format
    const year = String(this._date.getUTCFullYear()).padStart(4, '0')
    const month = String(this._date.getUTCMonth() + 1).padStart(2, '0')
    const day = String(this._date.getUTCDate()).padStart(2, '0')
    const hour = String(this._date.getUTCHours()).padStart(2, '0')
    const minute = String(this._date.getUTCMinutes()).padStart(2, '0')
    const second = String(this._date.getUTCSeconds()).padStart(2, '0')

    let result = `${year}-${month}-${day} ${hour}:${minute}:${second} +0000 UTC`

    // Include monotonic reading in debug output as per Go specification
    if (this._monotonic !== undefined) {
      result += ` m=${this._monotonic}`
    }

    return result
  }

  private wallDateParts(): [number, number, number] {
    if (this._location.offsetSeconds !== undefined) {
      const adjustedTime = new globalThis.Date(
        this._date.getTime() + this._location.offsetSeconds * 1000,
      )
      return [
        adjustedTime.getUTCFullYear(),
        adjustedTime.getUTCMonth(),
        adjustedTime.getUTCDate(),
      ]
    }
    return [
      this._date.getFullYear(),
      this._date.getMonth(),
      this._date.getDate(),
    ]
  }
}

// Duration represents a span of time (nanoseconds).
export type Duration = bigint

const maxDuration = Number(9223372036854775807n)
const minDuration = Number(-9223372036854775808n)
const maxDurationBig = 9223372036854775807n
const minDurationBig = -9223372036854775808n
const maxTimerDelayMilliseconds = 0x7fffffff
const millisecondsPerDay = 24 * 60 * 60 * 1000
const unixToInternalSeconds = 62135596800n
const timeBinaryVersionV1 = 1
const timeBinaryVersionV2 = 2

function writeInt64BE(bytes: Uint8Array, offset: number, value: bigint): void {
  let encoded = BigInt.asUintN(64, value)
  for (let idx = 7; idx >= 0; idx--) {
    bytes[offset + idx] = Number(encoded & 0xffn)
    encoded >>= 8n
  }
}

function writeInt32BE(bytes: Uint8Array, offset: number, value: number): void {
  const encoded = value >>> 0
  bytes[offset] = (encoded >>> 24) & 0xff
  bytes[offset + 1] = (encoded >>> 16) & 0xff
  bytes[offset + 2] = (encoded >>> 8) & 0xff
  bytes[offset + 3] = encoded & 0xff
}

function writeInt16BE(bytes: Uint8Array, offset: number, value: number): void {
  const encoded = value & 0xffff
  bytes[offset] = (encoded >>> 8) & 0xff
  bytes[offset + 1] = encoded & 0xff
}

function durationNumber(d: Duration): number {
  return Number(d)
}

function timeoutMilliseconds(d: Duration): number {
  const ms = durationNumber(d) / 1000000
  if (!Number.isFinite(ms) || ms > maxTimerDelayMilliseconds) {
    return maxTimerDelayMilliseconds
  }
  if (ms <= 0) {
    return 0
  }
  return ms
}

// monotonicMilliseconds reads the host's monotonic clock in milliseconds, the
// clock behind the monotonic reading of Now.
function monotonicMilliseconds(): number {
  if (typeof performance !== 'undefined' && performance.now) {
    return performance.now()
  }
  return globalThis.Date.now()
}

// startTimer calls f once d has elapsed on the monotonic clock and returns a
// function that cancels the call. Hosts may run a setTimeout callback a
// fraction of a millisecond early, so an early callback waits out the rest:
// a Go timer never fires before its duration.
function startTimer(d: Duration, f: () => void): () => void {
  const ms = timeoutMilliseconds(d)
  const deadline = monotonicMilliseconds() + ms
  const fire = () => {
    const remaining = deadline - monotonicMilliseconds()
    if (remaining > 0) {
      handle = setTimeout(fire, remaining)
      return
    }
    f()
  }
  let handle = setTimeout(fire, ms)
  return () => clearTimeout(handle)
}

// Duration_lt Duration comparison function.
export function Duration_lt(receiver: Duration, other: Duration): boolean {
  return receiver < other
}

// Duration_multiply Duration multiplication function.
export function Duration_multiply(
  receiver: Duration,
  multiplier: number,
): Duration {
  return BigInt(Math.trunc(durationNumber(receiver) * multiplier))
}

export function Duration_Abs(receiver: Duration): Duration {
  if (receiver >= 0n) {
    return receiver
  }
  if (receiver === minDurationBig) {
    return maxDurationBig
  }
  return -receiver
}

export function Duration_Hours(receiver: Duration): number {
  return durationNumber(receiver) / 3.6e12
}

export function Duration_Microseconds(receiver: Duration): bigint {
  return receiver / 1000n
}

export function Duration_Milliseconds(receiver: Duration): bigint {
  return receiver / 1000000n
}

export function Duration_Minutes(receiver: Duration): number {
  return durationNumber(receiver) / 6e10
}

export function Duration_Nanoseconds(receiver: Duration): bigint {
  return receiver
}

export function Duration_Round(
  receiver: Duration,
  multiple: Duration,
): Duration {
  const value = durationNumber(receiver)
  const unit = durationNumber(multiple)
  if (unit <= 0) {
    return receiver
  }
  const rounded =
    value >= 0 ?
      Math.floor(value / unit + 0.5) * unit
    : Math.ceil(value / unit - 0.5) * unit
  return BigInt(Math.max(minDuration, Math.min(maxDuration, rounded)))
}

// Duration_Seconds returns the duration as a floating point number of seconds.
export function Duration_Seconds(receiver: Duration): number {
  return durationNumber(receiver) / 1e9
}

export function Duration_Truncate(
  receiver: Duration,
  multiple: Duration,
): Duration {
  if (multiple <= 0n) {
    return receiver
  }
  return receiver - (receiver % multiple)
}

export function Duration_String(receiver: Duration): string {
  const value = durationNumber(receiver)
  if (value === 0) {
    return '0s'
  }
  const sign = value < 0 ? '-' : ''
  let remaining = Math.abs(value)
  if (remaining < 1e9) {
    return sign + formatSubsecond(remaining)
  }
  const hours = Math.floor(remaining / 3.6e12)
  remaining -= hours * 3.6e12
  const minutes = Math.floor(remaining / 6e10)
  remaining -= minutes * 6e10
  const seconds = Math.floor(remaining / 1e9)
  remaining -= seconds * 1e9

  // As in Go, seconds are always shown, and minutes whenever there are hours.
  let out = sign
  if (hours !== 0) {
    out += `${hours}h${minutes}m`
  } else if (minutes !== 0) {
    out += `${minutes}m`
  }
  return out + formatSeconds(seconds, remaining)
}

export function Duration_format(
  receiver: Duration,
  buf: $.VarRef<number[]>,
): number {
  const text = Duration_String(receiver)
  const bytes = Array.from(new TextEncoder().encode(text))
  const start = Math.max(0, buf.value.length - bytes.length)
  for (
    let idx = 0;
    idx < bytes.length && start + idx < buf.value.length;
    idx++
  ) {
    buf.value[start + idx] = bytes[idx]!
  }
  return start
}

function formatSeconds(seconds: number, nanos: number): string {
  if (nanos === 0) {
    return `${seconds}s`
  }
  const fraction = String(nanos).padStart(9, '0').replace(/0+$/, '')
  return `${seconds}.${fraction}s`
}

function formatSubsecond(nanos: number): string {
  if (nanos >= 1e6) {
    return formatUnit(nanos, 1e6, 'ms')
  }
  if (nanos >= 1e3) {
    return formatUnit(nanos, 1e3, '\u00b5s')
  }
  return `${nanos}ns`
}

function formatUnit(nanos: number, unit: number, suffix: string): string {
  const whole = Math.floor(nanos / unit)
  const rem = nanos % unit
  if (rem === 0) {
    return `${whole}${suffix}`
  }
  const scale = Math.log10(unit)
  const fraction = String(rem).padStart(scale, '0').replace(/0+$/, '')
  return `${whole}.${fraction}${suffix}`
}

// Location represents a time zone.
export class Location {
  private _name: string
  private _offsetSeconds?: number

  constructor(name: string, offsetSeconds?: number) {
    this._name = name
    this._offsetSeconds = offsetSeconds
  }

  public get name(): string {
    return this._name
  }

  public get offsetSeconds(): number | undefined {
    return this._offsetSeconds
  }

  // String returns a descriptive name for the time zone information
  public String(): string {
    return this._name
  }
}

// Month represents a month of the year.
export type Month = number

// Weekday represents a day of the week.
export enum Weekday {
  Sunday = 0,
  Monday = 1,
  Tuesday = 2,
  Wednesday = 3,
  Thursday = 4,
  Friday = 5,
  Saturday = 6,
}

// WeekdayString returns the string representation of a Weekday.
export function WeekdayString(w: Weekday): string {
  const names = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ]
  return names[w] || 'Unknown'
}

export function Month_String(m: Month): string {
  const names = [
    '',
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ]
  return names[m] || `%!Month(${m})`
}

// Weekday_String returns the string representation of a Weekday (wrapper function naming).
export function Weekday_String(w: Weekday): string {
  return WeekdayString(w)
}

// ParseError describes a problem parsing a time string.
export class ParseError extends Error {
  public layout: string
  public value: string
  public layoutElem: string
  public valueElem: string
  public message: string

  constructor(
    layout: string,
    value: string,
    layoutElem: string,
    valueElem: string,
    message: string,
  ) {
    super(message)
    this.layout = layout
    this.value = value
    this.layoutElem = layoutElem
    this.valueElem = valueElem
    this.message = message
    this.name = 'ParseError'
  }
}

// Timer represents a single event timer. A Timer made without a duration is
// the zero Timer, which does not run until it is Reset.
export class Timer {
  // _cancel stops the running timer, and is undefined while none runs.
  private _cancel?: () => void
  private _callback?: () => void
  private _channel = makeChannel(1, new Time(), 'both')
  public C: ChannelRef<Time> = makeChannelRef(this._channel, 'receive')

  constructor(duration?: Duration, callback?: () => void) {
    this._callback = callback
    if (duration !== undefined) {
      this._cancel = this.start(duration)
    }
  }

  // Stop prevents the Timer from firing. It reports whether the call stopped
  // a running timer.
  public Stop(): boolean {
    const cancel = this._cancel
    this._cancel = undefined
    cancel?.()
    return cancel !== undefined
  }

  // Reset changes the timer to expire after duration d. It reports whether
  // the timer was running.
  public Reset(d: Duration): boolean {
    const running = this.Stop()
    this._cancel = this.start(d)
    return running
  }

  private start(d: Duration): () => void {
    const fire =
      this._callback ??
      (() => {
        this._channel.send(Now()).catch(() => {})
      })
    return startTimer(d, () => {
      this._cancel = undefined
      fire()
    })
  }
}

// Ticker holds a channel that delivers ticks at intervals.
export class Ticker {
  private _interval?: ReturnType<typeof setInterval>
  private _stopped: boolean = false
  private _channel = makeChannel(1, new Time(), 'both')
  public C: ChannelRef<Time> = makeChannelRef(this._channel, 'receive')

  // A Ticker made without a duration is the zero Ticker, which does not tick
  // until it is Reset.
  constructor(duration?: Duration) {
    if (duration !== undefined) {
      this._interval = this.start(duration)
    }
  }

  // Stop turns off a ticker
  public Stop(): void {
    this._stopped = true
    clearInterval(this._interval)
  }

  // Reset stops a ticker and resets its period to the specified duration
  public Reset(d: Duration): void {
    this.Stop()
    this._stopped = false
    this._interval = this.start(d)
  }

  // Channel returns an async iterator that yields time values
  public async *Channel(): AsyncIterableIterator<Time> {
    while (!this._stopped) {
      yield await this.C.receive()
    }
  }

  private start(d: Duration): ReturnType<typeof setInterval> {
    const ms = timeoutMilliseconds(d)
    return setInterval(() => {
      this._channel.send(Now()).catch(() => {})
    }, ms)
  }
}

// Now returns the current local time with monotonic clock reading.
export function Now(): Time {
  const date = new globalThis.Date()
  let monotonic: number | undefined

  // Use performance.now() for high-resolution monotonic timing if available
  if (typeof performance !== 'undefined' && performance.now) {
    // performance.now() returns milliseconds with sub-millisecond precision.
    // Convert to nanoseconds and floor: the monotonic field is integer
    // nanoseconds, matching Go's int64 monotonic clock. A fractional value here
    // reaches Sub/BigInt and throws a RangeError ("not an integer").
    monotonic = Math.floor(performance.now() * 1000000)
  }

  return Time.create(date, 0, monotonic, Local)
}

// Date returns the Time corresponding to
// yyyy-mm-dd hh:mm:ss + nsec nanoseconds
// in the appropriate zone for that time in the given location
// Does not include monotonic reading as per Go specification.
export function Date(
  year: number,
  month: Month,
  day: number,
  hour: number,
  min: number,
  sec: number,
  nsec: number,
  loc: Location | $.VarRef<Location> | null,
): Time {
  if (loc === null) {
    throw new Error('time: missing Location in call to Date')
  }
  loc = $.pointerValue(loc)
  // setFullYear/setUTCFullYear are used instead of the Date constructors,
  // which map years 0-99 to 1900-1999, and they normalize overflowing fields.
  const ms = Math.floor(nsec / 1000000)
  const date = new globalThis.Date(0)
  if (loc.offsetSeconds !== undefined) {
    // For fixed zones, build the wall clock as UTC and subtract the offset.
    date.setUTCFullYear(year, month - 1, day)
    date.setUTCHours(hour, min, sec, ms)
    date.setTime(date.getTime() - loc.offsetSeconds * 1000)
  } else {
    // For local time, use the host's local time zone.
    date.setFullYear(year, month - 1, day)
    date.setHours(hour, min, sec, ms)
  }
  return Time.create(
    date,
    nsec - Math.floor(nsec / 1000000) * 1000000,
    undefined,
    loc,
  )
}

// UTC Common locations.
export const UTC = new Location('UTC', 0)

// Time is registered after UTC is defined, since its zero value uses UTC.
Time.__typeInfo = $.registerStructType('time.Time', new Time(), [], Time)
export const Local = new Location('Local')

// localZoneAbbreviation returns the abbreviated name of the host's local time
// zone at date, such as "CEST" or "EDT", as Go's Time.Zone does. Intl names
// many zones only by offset, as "GMT+9", in which case the name is the offset
// in Go's form for zones without an abbreviation, such as "+09" or "+0530".
function localZoneAbbreviation(
  date: globalThis.Date,
  offsetSeconds: number,
): string {
  // The short name is used when the locale has a real abbreviation for the zone.
  for (const locale of ['en-US', 'en-GB']) {
    try {
      const name = new Intl.DateTimeFormat(locale, { timeZoneName: 'short' })
        .formatToParts(date)
        .find((part) => part.type === 'timeZoneName')?.value
      if (name !== undefined && !/^(GMT|UTC)[+-]/.test(name)) {
        return name
      }
    } catch {
      break
    }
  }

  // Otherwise the abbreviation is the offset, as Go prints it.
  const sign = offsetSeconds < 0 ? '-' : '+'
  const abs = Math.abs(offsetSeconds)
  const hours = String(Math.floor(abs / 3600)).padStart(2, '0')
  const minutes = Math.floor((abs % 3600) / 60)
  return sign + hours + (minutes === 0 ? '' : String(minutes).padStart(2, '0'))
}

// FixedZone returns a Location that always uses the given zone name and offset (seconds east of UTC).
export function FixedZone(name: string, offset: number): Location {
  return new Location(name, offset)
}

// Nanosecond Common durations (matching Go's time package constants).
export const Nanosecond: Duration = 1n
export const Microsecond: Duration = 1000n
export const Millisecond: Duration = 1000000n
export const Second: Duration = 1000000000n
export const Minute: Duration = 60000000000n
export const Hour: Duration = 3600000000000n

// Since returns the time elapsed since t
// Uses monotonic clock if available for accurate measurement.
export function Since(t: Time): Duration {
  return Now().Sub(t)
}

// Until returns the duration until t
// Uses monotonic clock if available for accurate measurement.
export function Until(t: Time): Duration {
  return t.Sub(Now())
}

// Sleep pauses the current execution for at least the duration d
export async function Sleep(d: Duration): Promise<void> {
  return new Promise((resolve) => startTimer(d, resolve))
}

// January Export month constants.
export const January: Month = 1
export const February: Month = 2
export const March: Month = 3
export const April: Month = 4
export const May: Month = 5
export const June: Month = 6
export const July: Month = 7
export const August: Month = 8
export const September: Month = 9
export const October: Month = 10
export const November: Month = 11
export const December: Month = 12

// Sunday Export weekday constants.
export const Sunday = Weekday.Sunday
export const Monday = Weekday.Monday
export const Tuesday = Weekday.Tuesday
export const Wednesday = Weekday.Wednesday
export const Thursday = Weekday.Thursday
export const Friday = Weekday.Friday
export const Saturday = Weekday.Saturday

// Layout Time layout constants (matching Go's time package).
export const Layout = "01/02 03:04:05PM '06 -0700"
export const ANSIC = 'Mon Jan _2 15:04:05 2006'
export const UnixDate = 'Mon Jan _2 15:04:05 MST 2006'
export const RubyDate = 'Mon Jan 02 15:04:05 -0700 2006'
export const RFC822 = '02 Jan 06 15:04 MST'
export const RFC822Z = '02 Jan 06 15:04 -0700'
export const RFC850 = 'Monday, 02-Jan-06 15:04:05 MST'
export const RFC1123 = 'Mon, 02 Jan 2006 15:04:05 MST'
export const RFC1123Z = 'Mon, 02 Jan 2006 15:04:05 -0700'
export const RFC3339 = '2006-01-02T15:04:05Z07:00'
export const RFC3339Nano = '2006-01-02T15:04:05.999999999Z07:00'
export const Kitchen = '3:04PM'
export const Stamp = 'Jan _2 15:04:05'
export const StampMilli = 'Jan _2 15:04:05.000'
export const StampMicro = 'Jan _2 15:04:05.000000'
export const StampNano = 'Jan _2 15:04:05.000000000'
export const DateTime = '2006-01-02 15:04:05'
export const DateOnly = '2006-01-02'
export const TimeOnly = '15:04:05'

// Unix returns the local Time corresponding to the given Unix time,
// sec seconds and nsec nanoseconds since January 1, 1970 UTC.
export function Unix(sec: bigint, nsec: bigint = 0n): Time {
  const ms = Number(sec * 1000n + nsec / 1000000n)
  const remainingNsec = Number(nsec % 1000000n)
  return Time.create(new globalThis.Date(ms), remainingNsec, undefined, Local)
}

// UnixMilli returns the local Time corresponding to the given Unix time,
// msec milliseconds since January 1, 1970 UTC.
export function UnixMilli(msec: bigint): Time {
  return Time.create(new globalThis.Date(Number(msec)), 0, undefined, Local)
}

// UnixMicro returns the local Time corresponding to the given Unix time,
// usec microseconds since January 1, 1970 UTC.
export function UnixMicro(usec: bigint): Time {
  const ms = Number(usec / 1000n)
  const nsec = Number(usec % 1000n) * 1000
  return Time.create(new globalThis.Date(ms), nsec, undefined, Local)
}

// UnixNano returns the local Time corresponding to the given Unix time,
// nsec nanoseconds since January 1, 1970 UTC.
export function UnixNano(nsec: bigint): Time {
  return Unix(0n, nsec)
}

// ParseDuration parses a duration string
// A duration string is a possibly signed sequence of decimal numbers,
// each with optional fraction and a unit suffix.
export function ParseDuration(s: string): [Duration, $.GoError] {
  // [-+]?([0-9]*(\.[0-9]*)?[a-z]+)+
  const orig = s
  const invalid = (message = 'invalid duration'): [Duration, $.GoError] => [
    0n,
    $.newError('time: ' + message + ' ' + quoteParseValue(orig)),
  ]
  const limit = 1n << 63n
  let d = 0n

  // Consume the sign.
  let neg = false
  if (s !== '' && (s[0] === '-' || s[0] === '+')) {
    neg = s[0] === '-'
    s = s.slice(1)
  }

  // Special case: if all that is left is "0", this is zero.
  if (s === '0') {
    return [0n, null]
  }
  if (s === '') {
    return invalid()
  }
  while (s !== '') {
    // The next character must be [0-9.].
    if (!(s[0] === '.' || isDigitAt(s, 0))) {
      return invalid()
    }
    // Consume [0-9]*.
    const intDigits = /^[0-9]*/.exec(s)![0]
    s = s.slice(intDigits.length)
    let v = intDigits === '' ? 0n : BigInt(intDigits)
    if (v >= limit) {
      return invalid()
    }
    const pre = intDigits !== ''

    // Consume (\.[0-9]*)?.
    let post = false
    let f = 0n
    let scale = 1
    if (s !== '' && s[0] === '.') {
      s = s.slice(1)
      const fracDigits = /^[0-9]*/.exec(s)![0]
      s = s.slice(fracDigits.length)
      post = fracDigits !== ''
      // Keep only the digits that fit, as Go's leadingFraction does.
      for (const c of fracDigits) {
        const y = f * 10n + BigInt(c.charCodeAt(0) - 48)
        if (f > (limit - 1n) / 10n || y > limit) {
          break
        }
        f = y
        scale *= 10
      }
    }
    if (!pre && !post) {
      // No digits (e.g. ".s" or "-.s").
      return invalid()
    }

    // Consume unit.
    const unitText = /^[^0-9.]*/.exec(s)![0]
    if (unitText === '') {
      return invalid('missing unit in duration')
    }
    s = s.slice(unitText.length)
    const unit = durationUnits.get(unitText)
    if (unit === undefined) {
      return invalid(
        'unknown unit ' + quoteParseValue(unitText) + ' in duration',
      )
    }
    if (v > limit / unit) {
      return invalid()
    }
    v *= unit
    if (f > 0n) {
      // float64 is needed to be nanosecond accurate for fractions of hours.
      v += BigInt(Math.trunc(Number(f) * (Number(unit) / scale)))
      if (v > limit) {
        return invalid()
      }
    }
    d += v
    if (d > limit) {
      return invalid()
    }
  }
  if (neg) {
    return [-d, null]
  }
  if (d > limit - 1n) {
    return invalid()
  }
  return [d, null]
}

const durationUnits = new Map<string, bigint>([
  ['ns', 1n],
  ['us', 1000n],
  ['\u00b5s', 1000n], // U+00B5 = micro symbol
  ['\u03bcs', 1000n], // U+03BC = Greek letter mu
  ['ms', 1000000n],
  ['s', 1000000000n],
  ['m', 60000000000n],
  ['h', 3600000000000n],
])

// Parse parses a formatted string and returns the time value it represents.
// In the absence of a time zone indicator, Parse returns a time in UTC.
export function Parse(layout: string, value: string): [Time, $.GoError] {
  return parseTime(layout, value, UTC, Local)
}

// ParseInLocation is like Parse but differs in two important ways.
// First, in the absence of time zone information, Parse interprets a time as UTC;
// ParseInLocation interprets the time as in the given location.
// Second, when given a zone offset or abbreviation, Parse tries to match it
// against the Local location; ParseInLocation uses the given location.
export function ParseInLocation(
  layout: string,
  value: string,
  loc: Location | $.VarRef<Location> | null,
): [Time, $.GoError] {
  if (loc === null) {
    throw new Error('time: missing Location in call to ParseInLocation')
  }
  const location = $.pointerValue(loc)
  return parseTime(layout, value, location, location)
}

// Layout chunk codes, matching Go's std* constants in time/format.go.
const stdLongMonth = 1 // "January"
const stdMonth = 2 // "Jan"
const stdNumMonth = 3 // "1"
const stdZeroMonth = 4 // "01"
const stdLongWeekDay = 5 // "Monday"
const stdWeekDay = 6 // "Mon"
const stdDay = 7 // "2"
const stdUnderDay = 8 // "_2"
const stdZeroDay = 9 // "02"
const stdUnderYearDay = 10 // "__2"
const stdZeroYearDay = 11 // "002"
const stdHour = 12 // "15"
const stdHour12 = 13 // "3"
const stdZeroHour12 = 14 // "03"
const stdMinute = 15 // "4"
const stdZeroMinute = 16 // "04"
const stdSecond = 17 // "5"
const stdZeroSecond = 18 // "05"
const stdLongYear = 19 // "2006"
const stdYear = 20 // "06"
const stdPM = 21 // "PM"
const stdpm = 22 // "pm"
const stdTZ = 23 // "MST"
const stdISO8601TZ = 24 // "Z0700"
const stdISO8601SecondsTZ = 25 // "Z070000"
const stdISO8601ShortTZ = 26 // "Z07"
const stdISO8601ColonTZ = 27 // "Z07:00"
const stdISO8601ColonSecondsTZ = 28 // "Z07:00:00"
const stdNumTZ = 29 // "-0700"
const stdNumSecondsTz = 30 // "-070000"
const stdNumShortTZ = 31 // "-07"
const stdNumColonTZ = 32 // "-07:00"
const stdNumColonSecondsTZ = 33 // "-07:00:00"
const stdFracSecond0 = 34 // ".0", ".00", ... trailing zeros included
const stdFracSecond9 = 35 // ".9", ".99", ... trailing zeros omitted

const std0x = [
  stdZeroMonth,
  stdZeroDay,
  stdZeroHour12,
  stdZeroMinute,
  stdZeroSecond,
  stdYear,
]

// LayoutChunk is one std element found in a layout by nextStdChunk.
interface LayoutChunk {
  prefix: string
  std: number
  // digits is the number of fractional second digits for stdFracSecond*.
  digits: number
  suffix: string
}

function isDigitAt(s: string, i: number): boolean {
  if (s.length <= i) {
    return false
  }
  const c = s.charCodeAt(i)
  return c >= 48 && c <= 57
}

function startsWithLowerCase(s: string): boolean {
  if (s.length === 0) {
    return false
  }
  const c = s[0]
  return c >= 'a' && c <= 'z'
}

// nextStdChunk finds the first occurrence of a std string in layout and
// returns the text before, the std code, and the text after, as in Go.
function nextStdChunk(layout: string): LayoutChunk {
  const chunk = (i: number, std: number, n: number, digits = 0) => ({
    prefix: layout.slice(0, i),
    std,
    digits,
    suffix: layout.slice(i + n),
  })
  for (let i = 0; i < layout.length; i++) {
    const c = layout[i]
    const rest = layout.slice(i)
    switch (c) {
      case 'J':
        if (rest.startsWith('Jan')) {
          if (rest.startsWith('January')) {
            return chunk(i, stdLongMonth, 7)
          }
          if (!startsWithLowerCase(rest.slice(3))) {
            return chunk(i, stdMonth, 3)
          }
        }
        break
      case 'M':
        if (rest.startsWith('Mon')) {
          if (rest.startsWith('Monday')) {
            return chunk(i, stdLongWeekDay, 6)
          }
          if (!startsWithLowerCase(rest.slice(3))) {
            return chunk(i, stdWeekDay, 3)
          }
        }
        if (rest.startsWith('MST')) {
          return chunk(i, stdTZ, 3)
        }
        break
      case '0':
        if (rest.length >= 2 && rest[1] >= '1' && rest[1] <= '6') {
          return chunk(i, std0x[rest.charCodeAt(1) - 49], 2)
        }
        if (rest.startsWith('002')) {
          return chunk(i, stdZeroYearDay, 3)
        }
        break
      case '1':
        if (rest.startsWith('15')) {
          return chunk(i, stdHour, 2)
        }
        return chunk(i, stdNumMonth, 1)
      case '2':
        if (rest.startsWith('2006')) {
          return chunk(i, stdLongYear, 4)
        }
        return chunk(i, stdDay, 1)
      case '_':
        if (rest.length >= 2 && rest[1] === '2') {
          // _2006 is really a literal _, followed by stdLongYear.
          if (rest.startsWith('_2006')) {
            return chunk(i + 1, stdLongYear, 4)
          }
          return chunk(i, stdUnderDay, 2)
        }
        if (rest.startsWith('__2')) {
          return chunk(i, stdUnderYearDay, 3)
        }
        break
      case '3':
        return chunk(i, stdHour12, 1)
      case '4':
        return chunk(i, stdMinute, 1)
      case '5':
        return chunk(i, stdSecond, 1)
      case 'P':
        if (rest.startsWith('PM')) {
          return chunk(i, stdPM, 2)
        }
        break
      case 'p':
        if (rest.startsWith('pm')) {
          return chunk(i, stdpm, 2)
        }
        break
      case '-':
        if (rest.startsWith('-070000')) {
          return chunk(i, stdNumSecondsTz, 7)
        }
        if (rest.startsWith('-07:00:00')) {
          return chunk(i, stdNumColonSecondsTZ, 9)
        }
        if (rest.startsWith('-0700')) {
          return chunk(i, stdNumTZ, 5)
        }
        if (rest.startsWith('-07:00')) {
          return chunk(i, stdNumColonTZ, 6)
        }
        if (rest.startsWith('-07')) {
          return chunk(i, stdNumShortTZ, 3)
        }
        break
      case 'Z':
        if (rest.startsWith('Z070000')) {
          return chunk(i, stdISO8601SecondsTZ, 7)
        }
        if (rest.startsWith('Z07:00:00')) {
          return chunk(i, stdISO8601ColonSecondsTZ, 9)
        }
        if (rest.startsWith('Z0700')) {
          return chunk(i, stdISO8601TZ, 5)
        }
        if (rest.startsWith('Z07:00')) {
          return chunk(i, stdISO8601ColonTZ, 6)
        }
        if (rest.startsWith('Z07')) {
          return chunk(i, stdISO8601ShortTZ, 3)
        }
        break
      case '.':
      case ',':
        if (rest.length >= 2 && (rest[1] === '0' || rest[1] === '9')) {
          const ch = rest[1]
          let j = 1
          while (j < rest.length && rest[j] === ch) {
            j++
          }
          // String of digits must end here; only fractional second is all digits.
          if (!isDigitAt(rest, j)) {
            const code = ch === '9' ? stdFracSecond9 : stdFracSecond0
            return chunk(i, code, j, j - 1)
          }
        }
        break
    }
  }
  return { prefix: layout, std: 0, digits: 0, suffix: '' }
}

const shortMonthNames = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
]
const longMonthNames = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]
const shortDayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const longDayNames = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
]

// ParseBad is thrown by the parse helpers and caught by parseTime.
class ParseBad extends Error {}

// lookupName matches a case-insensitive name prefix of val from tab.
function lookupName(tab: string[], val: string): [number, string] {
  for (let i = 0; i < tab.length; i++) {
    const v = tab[i]
    if (
      val.length >= v.length &&
      val.slice(0, v.length).toLowerCase() === v.toLowerCase()
    ) {
      return [i, val.slice(v.length)]
    }
  }
  throw new ParseBad()
}

// getnum parses s[0:1] or s[0:2] (fixed forces s[0:2]) as a decimal integer.
function getnum(s: string, fixed: boolean): [number, string] {
  if (!isDigitAt(s, 0)) {
    throw new ParseBad()
  }
  if (!isDigitAt(s, 1)) {
    if (fixed) {
      throw new ParseBad()
    }
    return [s.charCodeAt(0) - 48, s.slice(1)]
  }
  return [(s.charCodeAt(0) - 48) * 10 + (s.charCodeAt(1) - 48), s.slice(2)]
}

// getnum3 parses s[0:1], s[0:2], or s[0:3] (fixed forces s[0:3]).
function getnum3(s: string, fixed: boolean): [number, string] {
  // Accumulate up to three leading digits.
  let n = 0
  let i = 0
  for (; i < 3 && isDigitAt(s, i); i++) {
    n = n * 10 + (s.charCodeAt(i) - 48)
  }
  if (i === 0 || (fixed && i !== 3)) {
    throw new ParseBad()
  }
  return [n, s.slice(i)]
}

// atoiStrict parses an optionally signed decimal integer occupying all of s.
function atoiStrict(s: string): number {
  if (!/^[+-]?[0-9]+$/.test(s)) {
    throw new ParseBad()
  }
  return Number(s)
}

function cutspace(s: string): string {
  let i = 0
  while (i < s.length && s[i] === ' ') {
    i++
  }
  return s.slice(i)
}

// skip removes the given prefix from value, treating runs of spaces as
// equivalent. It returns null if the prefix does not match.
function skip(value: string, prefix: string): string | null {
  while (prefix.length > 0) {
    if (prefix[0] === ' ') {
      if (value.length > 0 && value[0] !== ' ') {
        return null
      }
      prefix = cutspace(prefix)
      value = cutspace(value)
      continue
    }
    if (value.length === 0 || value[0] !== prefix[0]) {
      return null
    }
    prefix = prefix.slice(1)
    value = value.slice(1)
  }
  return value
}

function commaOrPeriod(c: string | undefined): boolean {
  return c === '.' || c === ','
}

// parseNanoseconds parses value[0:nbytes], a separator and digits, as
// nanoseconds.
function parseNanoseconds(value: string, nbytes: number): number {
  // Validate the separator and keep at most nine digits.
  if (!commaOrPeriod(value[0])) {
    throw new ParseBad()
  }
  if (nbytes > 10) {
    nbytes = 10
  }
  let ns = atoiStrict(value.slice(1, nbytes))
  for (let i = 0; i < 10 - nbytes; i++) {
    ns *= 10
  }
  return ns
}

// parseSignedOffset parses a signed timezone offset like "+03" or "-04",
// returning its length or 0.
function parseSignedOffset(value: string): number {
  if (value[0] !== '-' && value[0] !== '+') {
    return 0
  }
  const m = /^[0-9]+/.exec(value.slice(1))
  if (m === null || Number(m[0]) > 23) {
    return 0
  }
  return 1 + m[0].length
}

// parseTimeZone parses a time zone abbreviation, returning its length or -1.
function parseTimeZone(value: string): number {
  // Match the special cases, as in Go.
  if (value.length < 3) {
    return -1
  }
  if (value.startsWith('ChST') || value.startsWith('MeST')) {
    return 4
  }
  if (value.startsWith('GMT')) {
    return value.length === 3 ? 3 : 3 + parseSignedOffset(value.slice(3))
  }
  if (value[0] === '+' || value[0] === '-') {
    const n = parseSignedOffset(value)
    return n > 0 ? n : -1
  }
  let nUpper = 0
  for (; nUpper < 6 && nUpper < value.length; nUpper++) {
    const c = value[nUpper]
    if (c < 'A' || c > 'Z') {
      break
    }
  }
  switch (nUpper) {
    case 3:
      return 3
    case 4:
      return value[3] === 'T' || value.startsWith('WITA') ? 4 : -1
    case 5:
      return value[4] === 'T' ? 5 : -1
  }
  return -1
}

// utf8Encoder encodes the runes that quoteParseValue escapes.
const utf8Encoder = new TextEncoder()

// quoteParseValue quotes s as Go's time package does in ParseError messages.
function quoteParseValue(s: string): string {
  let out = '"'
  for (const c of s) {
    const code = c.codePointAt(0)!
    if (code >= 0x80 || code < 0x20) {
      for (const b of utf8Encoder.encode(c)) {
        out += '\\x' + b.toString(16).padStart(2, '0')
      }
    } else {
      if (c === '"' || c === '\\') {
        out += '\\'
      }
      out += c
    }
  }
  return out + '"'
}

function newParseError(
  layout: string,
  value: string,
  layoutElem: string,
  valueElem: string,
  message: string,
): $.GoError {
  const text =
    message === '' ?
      'parsing time ' +
      quoteParseValue(value) +
      ' as ' +
      quoteParseValue(layout) +
      ': cannot parse ' +
      quoteParseValue(valueElem) +
      ' as ' +
      quoteParseValue(layoutElem)
    : 'parsing time ' + quoteParseValue(value) + message
  return $.toGoError(new ParseError(layout, value, layoutElem, valueElem, text))
}

function isLeap(year: number): boolean {
  return year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0)
}

// daysBefore[m] counts the days in a non-leap year before month m begins.
const daysBefore = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334, 365]

function daysIn(month: number, year: number): number {
  if (month === 2 && isLeap(year)) {
    return 29
  }
  return daysBefore[month] - daysBefore[month - 1]
}

// zoneOffsetAt returns loc's offset in seconds east of UTC at the instant ms.
function zoneOffsetAt(loc: Location, ms: number): number {
  if (loc.offsetSeconds !== undefined) {
    return loc.offsetSeconds
  }
  return -new globalThis.Date(ms).getTimezoneOffset() * 60
}

// parseTime is Go's time.parse: it parses value according to layout, using
// defaultLocation when value has no zone and matching zone offsets and
// names against local.
function parseTime(
  layout: string,
  value: string,
  defaultLocation: Location,
  local: Location,
): [Time, $.GoError] {
  // fail reports that value does not match layout.
  const alayout = layout
  const avalue = value
  const fail = (
    layoutElem: string,
    valueElem: string,
    message = '',
  ): [Time, $.GoError] => [
    new Time(),
    newParseError(alayout, avalue, layoutElem, valueElem, message),
  ]

  // rangeErrString names a field that parsed out of range.
  let rangeErrString = ''

  // The parsed date fields, with -1 for a field the layout did not set.
  let year = 0
  let month = -1
  let day = -1
  let yday = -1

  // The parsed clock fields and the AM or PM marker.
  let hour = 0
  let min = 0
  let sec = 0
  let nsec = 0
  let amSet = false
  let pmSet = false

  // The parsed zone: a location, an offset, or a name.
  let z: Location | null = null
  let zoneOffset = -1
  let zoneName = ''

  // Match each layout chunk, a literal prefix and a std element, in turn.
  for (;;) {
    const { prefix, std, digits, suffix } = nextStdChunk(layout)
    const stdstr = layout.slice(prefix.length, layout.length - suffix.length)
    const skipped = skip(value, prefix)
    if (skipped === null) {
      return fail(prefix, value)
    }
    value = skipped
    if (std === 0) {
      if (value.length !== 0) {
        return fail('', value, ': extra text: ' + quoteParseValue(value))
      }
      break
    }
    layout = suffix
    const hold = value
    try {
      switch (std) {
        case stdYear: {
          if (value.length < 2) {
            throw new ParseBad()
          }
          year = atoiStrict(value.slice(0, 2))
          value = value.slice(2)
          year += year >= 69 ? 1900 : 2000
          break
        }
        case stdLongYear:
          if (value.length < 4 || !isDigitAt(value, 0)) {
            throw new ParseBad()
          }
          year = atoiStrict(value.slice(0, 4))
          value = value.slice(4)
          break
        case stdMonth:
          ;[month, value] = lookupName(shortMonthNames, value)
          month++
          break
        case stdLongMonth:
          ;[month, value] = lookupName(longMonthNames, value)
          month++
          break
        case stdNumMonth:
        case stdZeroMonth:
          ;[month, value] = getnum(value, std === stdZeroMonth)
          if (month <= 0 || month > 12) {
            rangeErrString = 'month'
          }
          break
        case stdWeekDay:
          value = lookupName(shortDayNames, value)[1]
          break
        case stdLongWeekDay:
          value = lookupName(longDayNames, value)[1]
          break
        case stdDay:
        case stdUnderDay:
        case stdZeroDay:
          if (std === stdUnderDay && value[0] === ' ') {
            value = value.slice(1)
          }
          ;[day, value] = getnum(value, std === stdZeroDay)
          break
        case stdUnderYearDay:
        case stdZeroYearDay:
          for (let i = 0; i < 2; i++) {
            if (std === stdUnderYearDay && value[0] === ' ') {
              value = value.slice(1)
            }
          }
          ;[yday, value] = getnum3(value, std === stdZeroYearDay)
          break
        case stdHour:
          ;[hour, value] = getnum(value, false)
          if (hour < 0 || hour >= 24) {
            rangeErrString = 'hour'
          }
          break
        case stdHour12:
        case stdZeroHour12:
          ;[hour, value] = getnum(value, std === stdZeroHour12)
          if (hour < 0 || hour > 12) {
            rangeErrString = 'hour'
          }
          break
        case stdMinute:
        case stdZeroMinute:
          ;[min, value] = getnum(value, std === stdZeroMinute)
          if (min < 0 || min >= 60) {
            rangeErrString = 'minute'
          }
          break
        case stdSecond:
        case stdZeroSecond: {
          ;[sec, value] = getnum(value, std === stdZeroSecond)
          if (sec < 0 || sec >= 60) {
            rangeErrString = 'second'
            break
          }
          // A fractional second in the value but not in the layout.
          if (
            value.length >= 2 &&
            commaOrPeriod(value[0]) &&
            isDigitAt(value, 1)
          ) {
            const next = nextStdChunk(layout).std
            if (next === stdFracSecond0 || next === stdFracSecond9) {
              break
            }
            let n = 2
            while (n < value.length && isDigitAt(value, n)) {
              n++
            }
            nsec = parseNanoseconds(value, n)
            value = value.slice(n)
          }
          break
        }
        case stdPM:
        case stdpm: {
          if (value.length < 2) {
            throw new ParseBad()
          }
          const p = value.slice(0, 2)
          value = value.slice(2)
          const upper = std === stdPM
          if (p === (upper ? 'PM' : 'pm')) {
            pmSet = true
          } else if (p === (upper ? 'AM' : 'am')) {
            amSet = true
          } else {
            throw new ParseBad()
          }
          break
        }
        case stdISO8601TZ:
        case stdISO8601ShortTZ:
        case stdISO8601ColonTZ:
        case stdISO8601SecondsTZ:
        case stdISO8601ColonSecondsTZ:
        case stdNumTZ:
        case stdNumShortTZ:
        case stdNumColonTZ:
        case stdNumSecondsTz:
        case stdNumColonSecondsTZ: {
          if (std <= stdISO8601ColonSecondsTZ && value[0] === 'Z') {
            value = value.slice(1)
            z = UTC
            break
          }
          let sign: string, hh: string, mm: string, ss: string
          if (std === stdISO8601ColonTZ || std === stdNumColonTZ) {
            if (value.length < 6 || value[3] !== ':') {
              throw new ParseBad()
            }
            ;[sign, hh, mm, ss] = [
              value[0],
              value.slice(1, 3),
              value.slice(4, 6),
              '00',
            ]
            value = value.slice(6)
          } else if (std === stdNumShortTZ || std === stdISO8601ShortTZ) {
            if (value.length < 3) {
              throw new ParseBad()
            }
            ;[sign, hh, mm, ss] = [value[0], value.slice(1, 3), '00', '00']
            value = value.slice(3)
          } else if (
            std === stdISO8601ColonSecondsTZ ||
            std === stdNumColonSecondsTZ
          ) {
            if (value.length < 9 || value[3] !== ':' || value[6] !== ':') {
              throw new ParseBad()
            }
            ;[sign, hh, mm, ss] = [
              value[0],
              value.slice(1, 3),
              value.slice(4, 6),
              value.slice(7, 9),
            ]
            value = value.slice(9)
          } else if (std === stdISO8601SecondsTZ || std === stdNumSecondsTz) {
            if (value.length < 7) {
              throw new ParseBad()
            }
            ;[sign, hh, mm, ss] = [
              value[0],
              value.slice(1, 3),
              value.slice(3, 5),
              value.slice(5, 7),
            ]
            value = value.slice(7)
          } else {
            if (value.length < 5) {
              throw new ParseBad()
            }
            ;[sign, hh, mm, ss] = [
              value[0],
              value.slice(1, 3),
              value.slice(3, 5),
              '00',
            ]
            value = value.slice(5)
          }
          const hr = getnum(hh, true)[0]
          const mn = getnum(mm, true)[0]
          const sc = getnum(ss, true)[0]
          // The range tests use > rather than >=, as in Go.
          if (hr > 24) {
            rangeErrString = 'time zone offset hour'
          }
          if (mn > 60) {
            rangeErrString = 'time zone offset minute'
          }
          if (sc > 60) {
            rangeErrString = 'time zone offset second'
          }
          zoneOffset = (hr * 60 + mn) * 60 + sc
          if (sign === '-') {
            zoneOffset = -zoneOffset
          } else if (sign !== '+') {
            throw new ParseBad()
          }
          break
        }
        case stdTZ: {
          if (value.startsWith('UTC')) {
            z = UTC
            value = value.slice(3)
            break
          }
          const n = parseTimeZone(value)
          if (n < 0) {
            throw new ParseBad()
          }
          zoneName = value.slice(0, n)
          value = value.slice(n)
          break
        }
        case stdFracSecond0: {
          // stdFracSecond0 requires the exact number of digits in the layout.
          const ndigit = 1 + digits
          if (value.length < ndigit) {
            throw new ParseBad()
          }
          nsec = parseNanoseconds(value, ndigit)
          value = value.slice(ndigit)
          break
        }
        case stdFracSecond9: {
          if (
            value.length < 2 ||
            !commaOrPeriod(value[0]) ||
            !isDigitAt(value, 1)
          ) {
            // Fractional second omitted.
            break
          }
          // Take any number of digits, even more than asked for.
          let i = 0
          while (i + 1 < value.length && isDigitAt(value, i + 1)) {
            i++
          }
          nsec = parseNanoseconds(value, 1 + i)
          value = value.slice(1 + i)
          break
        }
      }
    } catch (e) {
      if (!(e instanceof ParseBad)) {
        throw e
      }
      return fail(stdstr, hold)
    }
    if (rangeErrString !== '') {
      return fail(stdstr, value, ': ' + rangeErrString + ' out of range')
    }
  }
  if (pmSet && hour < 12) {
    hour += 12
  } else if (amSet && hour === 12) {
    hour = 0
  }

  // Convert yday to day, month.
  if (yday >= 0) {
    let d = 0
    let m = 0
    if (isLeap(year)) {
      if (yday === 31 + 29) {
        m = 2
        d = 29
      } else if (yday > 31 + 29) {
        yday--
      }
    }
    if (yday < 1 || yday > 365) {
      return fail('', value, ': day-of-year out of range')
    }
    if (m === 0) {
      m = Math.floor((yday - 1) / 31) + 1
      if (daysBefore[m] < yday) {
        m++
      }
      d = yday - daysBefore[m - 1]
    }
    if (month >= 0 && month !== m) {
      return fail('', value, ': day-of-year does not match month')
    }
    month = m
    if (day >= 0 && day !== d) {
      return fail('', value, ': day-of-year does not match day')
    }
    day = d
  } else {
    if (month < 0) {
      month = January
    }
    if (day < 0) {
      day = 1
    }
  }

  // Validate the day of the month.
  if (day < 1 || day > daysIn(month, year)) {
    return fail('', value, ': day out of range')
  }

  // Build the time in the parsed location.
  if (z !== null) {
    return [Date(year, month, day, hour, min, sec, nsec, z), null]
  }

  // Build the time at the parsed offset, in local if its zone has that
  // offset at that instant.
  if (zoneOffset !== -1) {
    const t = Date(year, month, day, hour, min, sec, nsec, UTC).Add(
      BigInt(-zoneOffset) * Second,
    )
    const localName = local.offsetSeconds !== undefined ? local.name : ''
    if (
      zoneOffsetAt(local, Number(t.UnixMilli())) === zoneOffset &&
      (zoneName === '' || localName === zoneName)
    ) {
      return [t.In(local), null]
    }
    return [t.In(FixedZone(zoneName, zoneOffset)), null]
  }

  // Build the time in the named zone, local if it is a fixed zone with that
  // name.
  if (zoneName !== '') {
    const utc = Date(year, month, day, hour, min, sec, nsec, UTC)
    if (local.offsetSeconds !== undefined && local.name === zoneName) {
      return [utc.Add(BigInt(-local.offsetSeconds) * Second).In(local), null]
    }
    // Otherwise, create a fake zone with an unknown (zero) offset.
    let offset = 0
    if (zoneName.length > 3 && zoneName.startsWith('GMT')) {
      offset = Number(zoneName.slice(3)) * 3600
    }
    return [
      utc.Add(BigInt(-offset) * Second).In(FixedZone(zoneName, offset)),
      null,
    ]
  }

  // Without a zone, the time is in the default location.
  return [Date(year, month, day, hour, min, sec, nsec, defaultLocation), null]
}

// After waits for the duration to elapse and then sends the current time on the returned channel.
export function After(d: Duration): ChannelRef<Time> {
  // Create a buffered channel with capacity 1
  const channel = makeChannel(1, new Time(), 'both')

  // Start a timer that will send the current time after the duration
  startTimer(d, () => {
    channel.send(Now()).catch(() => {})
  })

  return makeChannelRef(channel, 'receive')
}

// AfterFunc waits for the duration to elapse and then calls f.
export function AfterFunc(d: Duration, f: () => void): Timer {
  return new Timer(d, f)
}

// NewTimer creates a new Timer that will fire after the given duration.
export function NewTimer(d: Duration): Timer {
  return new Timer(d)
}

// NewTicker returns a new Ticker containing a channel that will send the current time.
export function NewTicker(d: Duration): Ticker {
  return new Ticker(d)
}

// Tick is a convenience wrapper for NewTicker providing access to the ticking channel only.
export function Tick(d: Duration): ChannelRef<Time> {
  return new Ticker(d).C
}

// LoadLocation returns the Location with the given name
// This is a simplified implementation that only supports UTC and Local.
export function LoadLocation(name: string): [Location | null, $.GoError] {
  switch (name) {
    case '':
    case 'UTC':
      return [UTC, null]
    case 'Local':
      return [Local, null]
    default:
      return [null, $.newError(`time: unknown time zone ${name}`)]
  }
}

// LoadLocationFromTZData returns a Location with the given name
// This is a simplified implementation.
export function LoadLocationFromTZData(
  name: string,
  _data: Uint8Array,
): [Location | null, $.GoError] {
  // TODO: parse the timezone data
  return [new Location(name), null]
}
