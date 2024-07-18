import axios from 'axios';
import * as fs from 'fs';
import { uuid } from 'uuidv4';
import { NextResponse } from 'next/server';
import JSZip from 'jszip';

// Ensure NETLIFY_ACCESS_TOKEN is available
const NETLIFY_ACCESS_TOKEN = process.env.NETLIFY_ACCESS_TOKEN;

if (!NETLIFY_ACCESS_TOKEN) {
    throw new Error('NETLIFY_ACCESS_TOKEN is not defined. Please set it as an environment variable.');
}

// Function to create a new site
const createSite = async (): Promise<string> => {
    const response = await axios.post(
        'https://api.netlify.com/api/v1/sites',
        {},
        {
            headers: {
                Authorization: `Bearer ${NETLIFY_ACCESS_TOKEN}`
            }
        }
    );
    return response.data.id;
};


// Function to deploy the site
const deploySite = async (siteId: string, code: string) => {

    const url = `https://api.netlify.com/api/v1/sites/${siteId}/deploys`;
    const headers = {
        'Authorization': `Bearer ${NETLIFY_ACCESS_TOKEN}`,
        'Content-Type': 'application/zip'
    };

    try {
        const currentUUID = uuid();
        const filePath = `templates/${currentUUID}.html`;
        fs.writeFileSync(filePath, code);

        const zip = new JSZip();
        zip.file(`${currentUUID}/index.html`, code);

        zip
            .generateNodeStream({ type: 'nodebuffer', streamFiles: true })
            .pipe(fs.createWriteStream(`templates/${currentUUID}.zip`))
            .on('finish', async function () {
                // JSZip generates a readable stream with a "end" event,
                // but is piped here in a writable stream which emits a "finish" event.
                console.log(`${currentUUID}.zip written.`);

                const zippedFile = fs.readFileSync(`templates/${currentUUID}.zip`);
                const response = await axios.post(url, zippedFile, {
                    headers: headers
                });

                console.log(response.data.url);
            });

    } catch (error) {
        console.error('Error deploying to Netlify:', error);
    }
};

export async function POST(req: Request) {
    try {
        const { code } = await req.json();
        const siteId = await createSite();
        await deploySite(siteId, decodeURIComponent(code));
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
