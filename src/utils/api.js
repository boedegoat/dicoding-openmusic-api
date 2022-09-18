const sendResponse = (
    h,
    { status = "success", message = undefined, data = undefined, code = 200 }
) => {
    const response = h.response({
        status,
        message,
        data,
    });
    response.code(code);
    return response;
};

module.exports = { sendResponse };
