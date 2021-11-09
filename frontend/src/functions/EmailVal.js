function EmailVal(email) {
    return /\S+@\S+\.\S+/.test(email)
  }

export default EmailVal;