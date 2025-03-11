const repoOwner = "rommycom";
const repoName = "Nas-server";
const branch = "ccfiles";
const token = "YOUR_PERSONAL_ACCESS_TOKEN"; // Keep this safe!

async function fetchFiles() {
    const response = await fetch(`https://api.github.com/repos/${repoOwner}/${repoName}/contents/?ref=${branch}`, {
        headers: { "Authorization": `token ${token}` }
    });
    const files = await response.json();
    displayFiles(files);
}

function displayFiles(files) {
    let fileList = document.getElementById("fileList");
    fileList.innerHTML = "";

    files.forEach(file => {
        let fileItem = document.createElement("div");
        fileItem.classList.add("file-item");

        fileItem.innerHTML = `
            <p>${file.name}</p>
            <button onclick="downloadFile('${file.download_url}')">Download</button>
        `;

        fileList.appendChild(fileItem);
    });
}

function downloadFile(url) {
    window.open(url, "_blank");
}

async function uploadFile() {
    let fileInput = document.getElementById("fileInput").files[0];
    if (!fileInput) return alert("Select a file first!");

    let reader = new FileReader();
    reader.readAsDataURL(fileInput);
    reader.onload = async function () {
        let content = reader.result.split(",")[1]; // Remove base64 metadata

        await fetch(`https://api.github.com/repos/${repoOwner}/${repoName}/contents/${fileInput.name}`, {
            method: "PUT",
            headers: {
                "Authorization": `token ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                message: `Upload ${fileInput.name}`,
                content: content,
                branch: branch
            })
        });

        alert("File uploaded!");
        fetchFiles();
    };
}

fetchFiles();￼Enter
