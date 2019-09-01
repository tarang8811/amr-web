export const FormatforAllUsers = data => {
  return data.map((d, i) => {
    return {
      id: d.id,
      slno: i + 1,
      Company: d.companyName,
      Name: d.fullName,
      Username: d.username,
      'Phone Number': d.phone,
      Balance: `Rs. ${d.balance}`,
      'Alt. Phone Number': d.altPhoneNumber
    }
  })
}
