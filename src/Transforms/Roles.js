export const FormatforRoles = data => {
  return data.map(d => {
    return {
      value: d.id,
      displayName: d.name
    }
  })
}
