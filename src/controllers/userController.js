async function signUp(req, res, next) {
  try {
    return res.status(201).json({
      success: true,
      message: 'User Created Successfully.',
    })
  } catch (err) {
    return next(err)
  }
}

export { signUp }
