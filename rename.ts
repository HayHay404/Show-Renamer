import * as path from "https://deno.land/std/path/mod.ts";


// Command to run: deno run --allow-read --allow-write rename.ts <directory>
void async function main() {
    const dir = Deno.args[0]; // Gets the directory to scan

    if (!dir) {
        console.log("Please specify a directory to scan");
        Deno.exit(1);
    }

    // Prmpt user to input the split operator
    const splitOperator = prompt("Enter the split operator: ") as string;
    // Prmpt user to input the index of the array to grab from the split file name
    const grabElem = prompt("Enter the index of the array to grab from the split file name (usually first or last): ") as string;
    // Prmpt user to input the string to prepend to the file name
    let prepend = prompt("Enter the string to prepend to the file name: ") as string;
    // Prmpt user to input the string to append to the file name, usually the file extension
    const append = prompt("Enter the string to append to the file name, usually the file extension: ") as string;

    if (dir === undefined || splitOperator === undefined || grabElem === undefined ) {
        console.error("Please specify a directory");
        Deno.exit(1);
    }

    if (append == null || append === undefined) {
        console.error("File extension cannot be null. Exiting..."); 
        Deno.exit(1);
    }

    if (prepend == null) prepend = ""

    if (!dir) {
        console.error("Please pass a directory as the first argument");
        Deno.exit(1);
    }

    for await (const entry of Deno.readDir(dir)) {
        const oldPath = path.join(dir, entry.name);
        // If the user wants to grab the last element of the array, then we need to subtract 1 from the length of the array
        let elem = 0;
        if (grabElem === "last") elem = parseInt((entry.name.split(`${splitOperator}`).length - 1).toString());
        else if (grabElem === "first") elem = 0;
        else elem = parseInt(grabElem);

        if (isNaN(elem)) {
            console.error("Cannot parse element value... Did you use a number?");
            Deno.exit(1)
        }
        
        const name = entry.name.split(`${splitOperator}`)[elem];
        // console.log("\nGrab element: " + grabElem);
        if (entry.isFile) {
            let newPath = ""
            newPath = path.join(dir, `${prepend}${name}${append}`);

            console.log("Old name: " + oldPath);
            console.log("New name: " + newPath + "\n");
            await Deno.rename(oldPath, newPath);
        }
    }

    console.log("Success! Renamed all files.");
    Deno.exit(0);
}();