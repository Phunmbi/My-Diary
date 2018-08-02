const validateSignUp = (req, res, next) => {
  if (!req.value) { req.value = {}; }

  if (!req.body.firstName || req.body.firstName.trim().length < 1) {
    res.status(400).json({ Error: 'Please enter your First Name' });
  }

  if (req.body.firstName === 'true' || req.body.firstName === 'false') {
    res.status(400).json({ Error: 'Please enter an acceptable First Name' });
  }

  if (!req.body.lastName || req.body.lastName.trim().length < 1) {
    res.status(400).json({ Error: 'Please enter your Last Name' });
  }

  if (req.body.lastName === 'true' || req.body.lastName === 'false') {
    res.status(400).json({ Error: 'Please enter an acceptable Last Name' });
  }

  if (req.body.email.search('.com') === -1 || req.body.email.search('@') === -1) {
    res.status(400).json({ Error: 'Please enter an accurate email' });
  }

  if (!req.body.password || req.body.password.trim().length < 1) {
    res.status(400).json({ Error: 'Please enter your password' });
  }

  if (!req.body.password || req.body.password.trim().length < 8) {
    res.status(400).json({ Error: 'Your password should be at least 8 characters long' });
  }

  if (req.body.firstName && req.body.firstName !== 'true' && req.body.firstName !== 'false') {
    req.body.firstName = req.body.firstName.toLowerCase().trim();
    if (req.body.lastName && req.body.lastName !== 'true' && req.body.lastName !== 'false') {
      req.body.lastName = req.body.lastName.toLowerCase().trim();
      if (req.body.email && req.body.email.search('.com') !== -1 && req.body.email.search('@') !== -1) {
        req.body.email = req.body.email.toLowerCase().trim();
        if (req.body.password && req.body.password.trim().length >= 8) {
          req.body.password = req.body.password.trim();
          next();
        }
      }
    }
  }
};

const validateLogIn = (req, res, next) => {
  if (!req.value) { req.value = {}; }

  if (req.body.email.search('.com') === -1 || req.body.email.search('@') === -1) {
    res.status(400).json({ Error: 'Please enter an accurate email' });
  }

  if (!req.body.password || req.body.password.trim().length < 1) {
    res.status(400).json({ Error: 'Please enter your password' });
  }

  if (!req.body.password || req.body.password.trim().length < 8) {
    res.status(400).json({ Error: 'Your password should be at least 8 characters long' });
  }

  if (req.body.email && req.body.email.search('.com') !== -1 && req.body.email.search('@') !== -1) {
    req.body.email = req.body.email.toLowerCase().trim();
    if (req.body.password && req.body.password.trim().length >= 8) {
      req.body.password = req.body.password.trim();
      next();
    }
  }
};

export { validateSignUp, validateLogIn };
