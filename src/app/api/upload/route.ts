import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
export async function POST(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    cloudinary.config({
      cloud_name: "dzlca45bc",
      api_key: "888118347153862",
      api_secret: process.env.NEXT_PUBLIC_CLOUDINARY_URL, // Click 'View Credentials' below to copy your API secret
    });

    // Upload an image
    const uploadResult = await cloudinary.uploader
      .upload(
        "https://res.cloudinary.com/demo/image/upload/getting-started/shoes.jpg",
        {
          public_id: "landifAiTT",
        }
      )
      .catch((error) => {
        console.log(error);
      });

    console.log(uploadResult);

    // // Optimize delivery by resizing and applying auto-format and auto-quality
    // const optimizeUrl = cloudinary.url("shoes", {
    //   fetch_format: "auto",
    //   quality: "auto",
    // });

    // console.log(optimizeUrl);

    // // Transform the image: auto-crop to square aspect_ratio
    // const autoCropUrl = cloudinary.url("shoes", {
    //   crop: "auto",
    //   gravity: "auto",
    //   width: 500,
    //   height: 500,
    // });

    //   console.log(autoCropUrl);
    return NextResponse.json(
      { message: "GET request successful" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error processing GET request:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
  try {
    // Extract query parameters if needed
    const { searchParams } = new URL(req.url);
    // Example: const param = searchParams.get('param')

    // Process the GET request
    // Add your logic here

    // Return a response
    return NextResponse.json(
      { message: "GET request successful" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error processing GET request:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
