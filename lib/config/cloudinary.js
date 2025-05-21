// Cloud name	dw9xukulc
// API key	793248979176422
// API secret	pkEe5njeoWCyBsW0GUv2gjBFxnA

// API environment variable	CLOUDINARY_URL=cloudinary://793248979176422:pkEe5njeoWCyBsW0GUv2gjBFxnA@dw9xukulc


import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: "dw9xukulc",
  api_key: "793248979176422",
  api_secret: "pkEe5njeoWCyBsW0GUv2gjBFxnA",
});

export default cloudinary;
