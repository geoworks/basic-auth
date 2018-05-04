import session from 'express-session';

export default function (options) {
  const defaultOptions = {
    secret: 'some secret',
    resave: true,
    saveUninitialized: true,
  };
  return [session({
    ...defaultOptions,
    ...options,
  })];
}
