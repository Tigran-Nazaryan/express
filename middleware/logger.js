function requestLogger(req, res, next) {
    const start = Date.now();
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;

    res.on('finish', () => {
        const duration = Date.now() - start;
        const { method, originalUrl } = req;
        const { statusCode } = res;

        const logMessage = `[${new Date().toISOString()}] - ${method} ${originalUrl} ${statusCode} - ${duration}ms (IP: ${ip})`;
        console.log(logMessage);
    });

    next();
}