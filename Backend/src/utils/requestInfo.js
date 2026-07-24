import UAParser from "ua-parser-js";

export const getRequestInfo = (req) => {
    const parser = new UAParser(req.headers["user-agent"]);
    const result = parser.getResult();

    return {
        ip: req.headers["x-forwarded-for"]?.split(",")[0]?.trim() || req.ip,
        browser: result.browser.name || "Unknown",
        os: result.os.name || "Unknown",
        deviceType: result.device.type || "Desktop",
        userAgent: req.headers["user-agent"],
    }
}