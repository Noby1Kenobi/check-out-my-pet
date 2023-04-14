import jwt from 'jsonwebtoken';

const auth = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const isCustomAuth = token.length < 500;

        let decodedData;

        if (token && isCustomAuth) {
            decodedData = jwt.verify(token, 'test');

            // pass user id to next middleware thru the req (specifically lcrud ops in post.js)
            req.userId = decodedData.id;    // can no longer use ?. but don't know why
        } else {
            // google token
            decodedData = jwt.decode(token);

            req.userId = decodedData.sub;   // can no longer use ?. but don't know why
        }

        next();
    } catch (error) {
        console.log(error);
    }
}

export default auth;