import { promises as fs } from "fs";
import path from "path";

export async function POST(req) {
    try {
        const { name, password } = await req.json();

        const filePath = path.join(process.cwd(), "src", "app", "Account", "data.txt");

        let existingData = "";
        try {
            existingData = await fs.readFile(filePath, "utf8");
        } catch {

            await fs.writeFile(filePath, "", "utf8");
        }

        const lines = existingData.split("\n").filter(Boolean);
        const nameExists = lines.some(line => line.startsWith(`Name: ${name},`));

        if (nameExists) {
            return new Response(
                JSON.stringify({ success: false, message: "Name already taken ❌" }),
                { status: 400 }
            );
        }

        const line = `Name: ${name}, Password: ${password}\n`;
        await fs.appendFile(filePath, line, "utf8");

        return new Response(
            JSON.stringify({ success: true, message: "Saved to file ✅" }),
            { status: 200 }
        );
    } catch (error) {
        return new Response(JSON.stringify({ success: false, error: error.message }), {
            status: 500,
        });
    }
}
