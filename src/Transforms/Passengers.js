export const SplitPassengerName = data => {
  return data.map(d => {
    const splitArray = d.name.split(' ')
    return {
      title: splitArray[0],
      firstName: splitArray
        .filter((s, i) => i !== 0 && i !== splitArray.length - 1)
        .join(' '),
      lastName: splitArray[splitArray.length - 1]
    }
  })
}

export const ConcatPassengerName = data => {
  return `${data.title} ${data.firstName} ${data.lastName}`
}
