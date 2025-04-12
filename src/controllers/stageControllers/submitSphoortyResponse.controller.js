import { SphoortyResponse } from "../../models/sphoortyResponse.model.js";
import { ApiError } from "../../utils/helper/ApiError.js";
import { ApiResponse } from "../../utils/helper/ApiResponse.js";
import { asyncHandler } from "../../utils/helper/AsyncHandler.js";
import fs from "fs/promises";

// Delete uploaded files helper
const deleteFileIfExists = async (filePath) => {
  try {
    await fs.access(filePath);
    await fs.unlink(filePath);
  } catch (error) {
    if (error.code !== "ENOENT") {
      console.error(`Error deleting file: ${filePath}`, error.message);
    }
  }
};

const deleteUploadedFiles = async (req) => {
  if (req.files && Array.isArray(req.files)) {
    for (const file of req.files) {
      const filePath = `./public/uploads/document/${file.mimetype.startsWith("image/") ? "images" : "pdfs"}/${file.filename}`;
      await deleteFileIfExists(filePath);
    }
  }
};

// Main controller
const submitSphoortyResponse = asyncHandler(async (req, res) => {
  try {
    const userId = req.user._id;

    // Parse array field
    if (req.body.businessProductsOrServices) {
      try {
        req.body.businessProductsOrServices = JSON.parse(
          req.body.businessProductsOrServices
        );
        if (!Array.isArray(req.body.businessProductsOrServices)) {
          req.body.businessProductsOrServices = [];
        }
      } catch (err) {
        await deleteUploadedFiles(req);
        return res
          .status(400)
          .json(
            new ApiResponse(
              400,
              {},
              "Invalid format for businessProductsOrServices."
            )
          );
      }
    }

    // Parse nested fields
    const nestedFields = ["loanStatus", "sector"];
    nestedFields.forEach((field) => {
      if (req.body[field] && typeof req.body[field] === "string") {
        try {
          req.body[field] = JSON.parse(req.body[field]);
        } catch (err) {
          req.body[field] = {};
        }
      }
    });

    // Media array
    const mediaArray = [];
    if (req.files) {
      req.files.forEach((file) => {
        mediaArray.push({
          url: file.mimetype.startsWith("image/")
            ? `/uploads/document/images/${file.filename}`
            : `/uploads/document/pdfs/${file.filename}`,
          type: file.mimetype.startsWith("image/") ? "image" : "pdf",
        });
      });
    }

    // Create document
    const newResponse = await SphoortyResponse.create({
      ...req.body,
      userId,
      media: mediaArray,
    });

    if (!newResponse) {
      await deleteUploadedFiles(req);
      throw new ApiError(500, "Failed to submit response.");
    }

    return res
      .status(201)
      .json(
        new ApiResponse(201, {}, "Sphoorty response submitted successfully.")
      );
  } catch (err) {
    await deleteUploadedFiles(req);
    throw new ApiError(500, err.message || "Internal Server Error");
  }
});

export { submitSphoortyResponse };
