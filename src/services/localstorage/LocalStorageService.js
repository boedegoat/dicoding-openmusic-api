const fs = require("fs");
const path = require("path");

const rootSrc = path.join(path.resolve(), "src");
const folderPath = path.join(rootSrc, "api/uploads/file/images");

if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath, { recursive: true });
}

module.exports.writeFile = ({ file, meta }) => {
    // create filename with timestamp
    const fileName = `${Date.now()}-${meta.filename.replace(/ /g, "-")}`;

    // create filepath from folderpath + filename
    const filePath = path.join(folderPath, fileName);

    const fileStream = fs.createWriteStream(filePath);

    return new Promise((resolve, reject) => {
        fileStream.on("error", (error) => reject(error));

        // write to filestream chunk-by-chunk
        file.pipe(fileStream);

        file.on("end", () => {
            const rootUrl = `http://${global.host}:${global.port}`;
            const fileLocation = `${rootUrl}/upload/images/${fileName}`;

            resolve(fileLocation);
        });
    });
};
