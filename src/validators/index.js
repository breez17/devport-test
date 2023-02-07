export const usernameRegex = (username) => {
  if (username === '') {
    return
  }

  return (/^[a-z+\-\s]{1,100}$/i.test(username) && !(/\s/.test(username)));
}

export const phoneNumberRegex = (phone) => {
  if (phone === '') {
    return
  }

  return /^\+?(\d{1,3})?[- .]?\(?(?:\d{2,3})\)?[- .]?\d\d\d[- .]?\d\d\d\d$/.test(phone);
}

export const onlyNumbersRegex = (value) => {
  if (value === '') {
    return
  }

  return /[^0-9]+/g.test(value);
}
