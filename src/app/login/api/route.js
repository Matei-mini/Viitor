import { promises as fs } from "fs";
import path from "path";

export async function POST(req) {
    try {
        const { name, password } = await req.json();

        const filePath = path.join(process.cwd(), "src", "app", "Account", "data.txt");

        const data = await fs.readFile(filePath, "utf8");
        const lines = data.split("\n").filter(Boolean);

        const found = lines.some(
            (line) => line === `Name: ${name}, Password: ${password}`
        );

        if (found) {
            return new Response(
                JSON.stringify({ success: true, message: "Login successful" }),
                { status: 200 }
            );
        } else {
            return new Response(
                JSON.stringify({ success: false, message: "Invalid credentials" }),
                { status: 401 }
            );
        }
    } catch (error) {
        return new Response(
            JSON.stringify({ success: false, error: error.message }),
            { status: 500 }
        );
    }
}
