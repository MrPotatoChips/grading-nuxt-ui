import moment from "moment"

const toDate = value => {
  if (value) {
    return moment(value).format('Y-MM-DD')
  }

  return ''
}

const toDateLong =  value => {
  if (value) {
    return moment(value).format('MMMM DD, YYYY')
  }

  return ''
}

const toDateDot = value => {
  if (value) {
    return moment(value).format('MM.DD.YYYY')
  }

  return ''
}

const toDateShort = value => {
  if (value) {
    return moment(value).format('MMM DD, YYYY')
  }

  return ''
}

const toDateTime = value => {
  if (value) {
    return moment(value).format('Y-MM-DD HH:mm:ss')
  }

  return ''
}

const toDateTimeShort = value => {
  if (value) {
    return moment(value).format('MMM DD, YYYY @ LT')
  }

  return ''
}

const toDateTimeShortMilitary = value => {
  if (value) {
    return moment(value).format('MMM DD, YYYY @ HH:mm')
  }

  return ''
}

const toDateTimeLong = value => {
  if (value) {
    return moment(value).format('MMMM DD, YYYY @ LT')
  }

  return ''
}

const toDateTimeLocal = value => {
  if (value) {
    return moment(value).format('YYYY-MM-DDTHH:mm')
  }

  return ''
}

const toMonth = value => {
  if (value) {
    return moment(value).format('YYYY-MM')
  }

  return ''
}

const toMonthShort = value => {
  if (value) {
    return moment(value).format('MMM YYYY')
  }

  return ''
}

const toMonthLong = value => {
  if (value) {
    return moment(value).format('MMMM YYYY')
  }

  return ''
}

export const dateFormatters = {
  toDate,
  toDateDot,
  toDateLong,
  toDateShort,
  toDateTime,
  toDateTimeLocal,
  toDateTimeLong,
  toDateTimeShort,
  toDateTimeShortMilitary,
  toMonth,
  toMonthShort,
  toMonthLong
}
