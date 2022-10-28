# anime_rename
Renames Anime using a Deno script.

## Usage
deno run --allow-read --allow-write rename.ts <directory>

## Prompt args

**splitOperator**
  - Operator used to split file name into an array. Generally a `.` or `-`

**grabElem**
  - Grabs the specific element of the array
  - Valid input includes: "first", "last", or any integer

**prepend**
  - Prepends a string to the file path
  - If empty, defaults to ""

**append**
  - Appends a string to the file path
  - Generally a file extension, so it's required for the program to run.


> Only the prepend operator is allowed to be null. All others must be included. 
