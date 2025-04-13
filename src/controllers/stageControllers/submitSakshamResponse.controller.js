import { SakshamResponse } from "../../models/sakshamResponse.model.js";
import { ApiError } from "../../utils/helper/ApiError.js";
import { ApiResponse } from "../../utils/helper/ApiResponse.js";
import { asyncHandler } from "../../utils/helper/AsyncHandler.js";
import fs from "fs/promises";

// Helper to delete uploaded files
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
const submitSakshamResponse = asyncHandler(async (req, res) => {
  try {
    const userId = req.user._id;

    // Parse array fields if sent as JSON strings
    // if (req.body.productsOrServices) {
    //   try {
    //     req.body.productsOrServices = JSON.parse(req.body.productsOrServices);
    //     if (!Array.isArray(req.body.productsOrServices)) {
    //       req.body.productsOrServices = [];
    //     }
    //   } catch (err) {
    //     await deleteUploadedFiles(req);
    //     return res
    //       .status(400)
    //       .json(
    //         new ApiResponse(400, {}, "Invalid format for productsOrServices.")
    //       );
    //   }
    // }

    // Parse nested objects (if sent as JSON strings)
    if (
      req.body.businessDetails &&
      typeof req.body.businessDetails === "string"
    ) {
      req.body.businessDetails = JSON.parse(req.body.businessDetails);
    }

    if (req.body.financials && typeof req.body.financials === "string") {
      req.body.financials = JSON.parse(req.body.financials);
    }

    if (req.body.sector && typeof req.body.sector === "string") {
      req.body.sector = JSON.parse(req.body.sector);
    }

    // Process media files
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

    // Create SakshamResponse
    const newResponse = await SakshamResponse.create({
      ...req.body,
      userId: userId,
      media: mediaArray,
    });

    if (!newResponse) {
      await deleteUploadedFiles(req);
      throw new ApiError(500, "Failed to submit response.");
    }

    return res
      .status(201)
      .json(
        new ApiResponse(201, {}, "Saksham response submitted successfully.")
      );
  } catch (err) {
    await deleteUploadedFiles(req);
    throw new ApiError(500, err.message || "Internal Server Error");
  }
});

export { submitSakshamResponse };
