import { promises as fs } from "fs";
import path from "path";

export async function POST(req) {
    try {
        const { name, password } = await req.json();

        // save file at project root: ./data.txt
        const filePath = path.join(process.cwd(), "src" , "app" , "Account" , "data.txt");
        const line = `Name: ${name}, Password: ${password}\n`;

        await fs.appendFile(filePath, line, "utf8");

        return new Response(
            JSON.stringify({ success: true, message: "Saved to file" }),
            { status: 200 }
        );
    } catch (error) {
        return new Response(JSON.stringify({ success: false, error: error.message }), {
            status: 500,
        });
    }
}
