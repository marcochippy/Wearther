const errorHandler = (err: any, req: any, res: any, next: any) => {
  process.env.NODE_ENV !== 'production' && console.error(err.stack);
  res.status(err.cause || 500).json({ error: err.message });
};

export default errorHandler;
